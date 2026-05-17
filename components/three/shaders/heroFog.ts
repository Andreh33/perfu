// GLSL shaders for the Hero fog plane.
//
// The fragment shader composes a slow, gold-tinted volumetric haze using
// fractional brownian motion (fBM) on top of Ashima Arts' simplex 2D noise
// (snoise). Three FBM layers at different scales + time speeds mix into a
// single density field that is then mapped to the maison palette (obsidian
// → deep gold → highlight gold) and finished with a radial vignette.
//
// The vertex shader is a fullscreen pass-through — we render a 2-unit plane
// at z = 0 with an orthographic-ish setup; vUv carries the screen UV.
//
// snoise(vec2) is Ashima Arts' GLSL implementation, MIT/Apache 2.0:
//   https://github.com/ashima/webgl-noise
//   Copyright (C) 2011 Ashima Arts (Stefan Gustavson).
//   Distributed under the MIT license. See LICENSE in the upstream repo.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uResolution;
  uniform float uIntensity;

  // ── Ashima Arts simplex noise 2D (snoise) ──────────────────────────
  // Source: https://github.com/ashima/webgl-noise (MIT)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
     -0.577350269189626,
      0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0)
    );
    vec3 m = max(
      0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
      0.0
    );
    m = m * m; m = m * m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // ── Fractional Brownian Motion ─────────────────────────────────────
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;

    // ── Radial distortion from mouse ─────────────────────────────────
    vec2 toMouse = uv - (uMouse * 0.5 + 0.5);
    float mouseDist = length(toMouse);
    vec2 mouseOffset = toMouse * exp(-mouseDist * 4.0) * 0.08 * uIntensity;
    uv += mouseOffset;

    // ── Three layered fBM bands at different scales & speeds ────────
    float t = uTime * 0.05;
    float n1 = fbm(uv * 3.0  + vec2( t * 0.6,  t * 0.4));
    float n2 = fbm(uv * 6.0  + vec2(-t * 0.8,  t * 0.3));
    float n3 = fbm(uv * 1.5  + vec2( t * 0.2, -t * 0.5));

    float smoke = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    smoke = smoothstep(0.2, 0.8, smoke);

    // ── Vertical gradient — heavier at the top, lighter at the bottom
    float vertical = smoothstep(0.0, 1.0, vUv.y);

    // ── Maison palette ───────────────────────────────────────────────
    const vec3 obsidian = vec3(0.031, 0.031, 0.039); // --obsidian-400
    const vec3 deepGold = vec3(0.557, 0.431, 0.247); // --gold-300
    const vec3 gold     = vec3(0.722, 0.576, 0.353); // --gold-200

    vec3 color = mix(obsidian, deepGold, smoke * vertical * 0.6);
    color = mix(color, gold, smoke * smoke * vertical * 0.4);

    // ── Radial vignette ──────────────────────────────────────────────
    float vig = 1.0 - smoothstep(0.4, 1.2, length(vUv - 0.5));
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`;
