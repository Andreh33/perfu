"use client";
// Client component: mounts a React Three Fiber <Canvas> with a fullscreen
// shader plane and the post-processing stack. Needs window/WebGL access
// and consumes browser pointer events — none of this can run on the server.

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./shaders/heroFog";
import { HeroPostprocessing } from "./HeroPostprocessing";

interface MouseRef {
  current: { x: number; y: number };
}

interface FogPlaneProps {
  mouseRef: MouseRef;
}

/**
 * The fullscreen plane carrying the FBM gold-smoke shader. Drives `uTime`
 * every frame and lerps `uMouse` toward the parent-managed pointer ref to
 * keep distortion buttery rather than snappy.
 */
function FogPlane({ mouseRef }: FogPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uIntensity: { value: 1.0 },
  });

  useEffect(() => {
    uniforms.current.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height]);

  useFrame((_state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    uniforms.current.uTime.value += delta;
    const target = mouseRef.current;
    const mouseVec = uniforms.current.uMouse.value;
    mouseVec.x += (target.x - mouseVec.x) * 0.05;
    mouseVec.y += (target.y - mouseVec.y) * 0.05;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}

interface Hero3DProps {
  /** Optional: pass an active flag so we can pause the render loop. */
  active?: boolean;
}

export default function Hero3D({ active = true }: Hero3DProps) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5];

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
        depth: false,
      }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <FogPlane mouseRef={mouseRef} />
      <HeroPostprocessing />
    </Canvas>
  );
}
