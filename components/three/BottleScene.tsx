"use client";
// Client component: mounts the R3F Canvas for the product hero, lights it,
// adds drei-powered orbit + studio environment + contact shadows, and wires
// the post-processing chain. Needs WebGL and pointer events, so it cannot
// render on the server.

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import type { Perfume } from "@/lib/products";
import { BottleModel } from "./BottleModel";

interface BottleSceneProps {
  product: Perfume;
}

const CHROMA_OFFSET = new Vector2(0.0004, 0.0004);

export function BottleScene({ product }: BottleSceneProps) {
  // Pause auto-rotate on hover so the visitor can examine the flacon
  // without fighting the camera. Re-enables the moment the pointer leaves.
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="relative h-full min-h-[80vh] w-full"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      data-bottle-scene
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 2.4], fov: 35 }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ position: "absolute", inset: 0, background: "transparent" }}
      >
        <Suspense fallback={null}>
        {/* lights: three-point, warm-key + cool-fill + warm-rim */}
        <ambientLight intensity={0.25} color="#fff6e0" />
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.4}
          color="#fff1d4"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-3, 2, 2]}
          intensity={0.6}
          color="#cfd9e8"
        />
        <directionalLight
          position={[0, 2, -3]}
          intensity={1.0}
          color="#ffd9a0"
        />

        {/* In-scene environment — assembled from <Lightformer> primitives
            so we do not depend on a remote HDR file. Gives the glass a clean
            three-quarter reflection without a network fetch. */}
        <Environment background={false} resolution={256}>
          <Lightformer
            form="rect"
            intensity={4}
            position={[3, 3, 2]}
            scale={[3, 3, 1]}
            color="#fff1d4"
          />
          <Lightformer
            form="rect"
            intensity={2}
            position={[-3, 2, 1]}
            scale={[2.5, 2.5, 1]}
            color="#cfd9e8"
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[0, 2, -3]}
            scale={[3, 1.5, 1]}
            color="#ffd9a0"
          />
          <Lightformer
            form="ring"
            intensity={1.2}
            position={[0, -1, 3]}
            scale={[2, 2, 1]}
            color="#d4b677"
          />
        </Environment>

        <BottleModel product={product} />

        <ContactShadows
          position={[0, -0.62, 0]}
          opacity={0.4}
          scale={4}
          blur={2.5}
          far={1.5}
          color="#000000"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 2.4}
          autoRotate={!hovering}
          autoRotateSpeed={0.5}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.85}
            intensity={0.5}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
          <ChromaticAberration
            offset={CHROMA_OFFSET}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={0.03} blendFunction={BlendFunction.OVERLAY} />
        </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default BottleScene;
