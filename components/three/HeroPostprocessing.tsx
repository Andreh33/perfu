"use client";
// Client component: post-processing composer for the Hero scene. Must mount
// inside the R3F <Canvas> tree because it consumes the WebGLRenderer + scene
// from R3F context.

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

const CHROMATIC_OFFSET = new Vector2(0.0008, 0.0008);

export function HeroPostprocessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.85}
        intensity={0.8}
        radius={0.6}
        mipmapBlur
      />
      <ChromaticAberration offset={CHROMATIC_OFFSET} radialModulation={false} modulationOffset={0} />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} premultiply />
      <Vignette darkness={0.45} offset={0.5} />
    </EffectComposer>
  );
}
