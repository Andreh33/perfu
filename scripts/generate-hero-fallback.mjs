// Generate /public/hero-fallback.jpg — a 1600x900 atmospheric still:
// warm gold haze on the upper-left over deep cocoa, slight noise, vignette.
// Becomes the Hero base layer before the WebGL canvas mounts.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const W = 1600;
const H = 900;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Three radial gradients layered: cocoa base, gold halo upper-left, dark vignette -->
    <radialGradient id="base" cx="50%" cy="55%" r="120%">
      <stop offset="0%" stop-color="#1c1308"/>
      <stop offset="55%" stop-color="#140d07"/>
      <stop offset="100%" stop-color="#0a0704"/>
    </radialGradient>
    <radialGradient id="halo" cx="22%" cy="18%" r="55%">
      <stop offset="0%" stop-color="#d4b677" stop-opacity="0.35"/>
      <stop offset="35%" stop-color="#8e6e3f" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="warmCore" cx="42%" cy="48%" r="40%">
      <stop offset="0%" stop-color="#b8935a" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#5c4628" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="55%" r="80%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" stitchTiles="stitch" seed="11"/>
      <feColorMatrix values="0 0 0 0 0.96  0 0 0 0 0.85  0 0 0 0 0.62  0 0 0 0.18 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#base)"/>
  <rect width="100%" height="100%" fill="url(#warmCore)"/>
  <rect width="100%" height="100%" fill="url(#halo)"/>
  <rect width="100%" height="100%" fill="url(#vignette)"/>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.5"/>
</svg>
`;

const buffer = await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();

writeFileSync("public/hero-fallback.jpg", buffer);
const kb = (buffer.byteLength / 1024).toFixed(1);
console.log(`Wrote public/hero-fallback.jpg · ${kb} KB · ${W}x${H}`);
