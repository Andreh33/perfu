"use client";
// Global liquid gold background — WebGL fragment shader (FBM noise +
// caustics + mouse-tracked ripple). Direct port of the user's reference
// shader (webgl_shader_liquid_gold_oud_field.html). Runs as a fixed
// full-viewport <canvas> behind every page; mouse position is tracked
// globally on window.

import { useEffect, useRef } from "react";

const VERTEX_SRC = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SRC = `precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv;
  p.x *= uResolution.x / uResolution.y;
  float t = uTime * 0.08;

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) + t * 0.7));
  vec2 r = vec2(
    fbm(p + 2.5 * q + vec2(1.7, 9.2) + t * 0.5),
    fbm(p + 2.5 * q + vec2(8.3, 2.8) + t * 0.4)
  );
  float n = fbm(p + 3.0 * r);

  vec2 m = uMouse / uResolution.xy;
  m.x *= uResolution.x / uResolution.y;
  float d = distance(p, m);
  float light = exp(-d * 2.2);
  float lightFar = exp(-d * 0.8) * 0.4;

  vec3 deep      = vec3(0.045, 0.020, 0.008);
  vec3 amber     = vec3(0.42,  0.22,  0.075);
  vec3 gold      = vec3(0.86,  0.69,  0.22);
  vec3 champagne = vec3(0.98,  0.91,  0.74);

  vec3 col = deep;
  col = mix(col, amber,     smoothstep(0.28, 0.62, n));
  col = mix(col, gold,      smoothstep(0.55, 0.78, n) * 0.85);
  col = mix(col, champagne, smoothstep(0.68, 0.88, n) * (0.45 + light * 1.4 + lightFar));

  float caustic = sin(n * 16.0 + uTime * 0.35) * 0.5 + 0.5;
  caustic = pow(caustic, 12.0);
  col += champagne * caustic * 0.22 * n;

  float ripple = sin(d * 40.0 - uTime * 1.5) * 0.5 + 0.5;
  ripple = pow(ripple, 8.0) * exp(-d * 4.0);
  col += champagne * ripple * 0.15;

  float vig = smoothstep(1.05, 0.3, length(uv - 0.5));
  col *= vig * 0.88 + 0.18;

  float grain = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.035;
  col += grain;

  col = pow(col, vec3(0.93));
  col *= vec3(1.02, 1.0, 0.97);

  gl_FragColor = vec4(col, 1.0);
}`;

interface Props {
  intensity?: "subtle" | "balanced" | "opulent";
}

export function GlobalLiquidGoldBackground(_props: Props = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    function compile(type: number, src: string): WebGLShader | null {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error("Shader compile error:", gl!.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Fullscreen quad as 2 triangles.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    let mouse: [number, number] = [0, 0];
    let mouseTarget: [number, number] = [0, 0];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas!.height = Math.max(1, Math.floor(rect.height * dpr));
      if (mouseTarget[0] === 0 && mouseTarget[1] === 0) {
        mouseTarget = [canvas!.width / 2, canvas!.height / 2];
        mouse = [...mouseTarget];
      }
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Track mouse GLOBALLY on window — the canvas is pointer-events-none
    // (so clicks pass through to the content), so we listen on window.
    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = canvas!.width / rect.width;
      mouseTarget = [
        (e.clientX - rect.left) * dpr,
        (rect.height - (e.clientY - rect.top)) * dpr,
      ];
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    let running = true;
    function onVis() {
      running = !document.hidden;
      if (running) render();
    }
    document.addEventListener("visibilitychange", onVis);

    let raf = 0;
    const start = performance.now();
    function render() {
      if (!running) return;
      const t = (performance.now() - start) / 1000;
      mouse[0] += (mouseTarget[0] - mouse[0]) * 0.04;
      mouse[1] += (mouseTarget[1] - mouse[1]) * 0.04;
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uMouse, mouse[0], mouse[1]);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buf);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      data-global-bg
      style={{ background: "#050201" }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ display: "block" }}
      />
      {/* 65% black overlay — tames the shader so content reads cleanly. */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0, 0, 0, 0.65)" }}
      />
    </div>
  );
}
