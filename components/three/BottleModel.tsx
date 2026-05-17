"use client";
// Client component: builds the procedural perfume bottle inside an R3F
// scene graph. Pure presentation — no GSAP, no DOM access — but it lives
// under the <Canvas> root and consumes Three.js JSX intrinsics that only
// resolve in the client bundle.

import { useMemo } from "react";
import * as THREE from "three";
import { Text as DreiText } from "@react-three/drei";
import type { Perfume } from "@/lib/products";

interface BottleModelProps {
  product: Perfume;
}

/**
 * Compose the perfume bottle from four meshes:
 *   1. Glass body  — LatheGeometry with physical transmission.
 *   2. Liquid       — slightly shorter lathe with tinted attenuation.
 *   3. Cap          — short brass cylinder, anisotropic and clear-coated.
 *   4. Paper label  — flat plane with drei <Text> baked into the surface.
 *
 * The silhouette comes from a 12-point profile that traces a soft-shouldered
 * hexagonal flacon (modern, not Victorian). We extract the Y-bounds of the
 * profile so liquid + cap snap to the body without magic numbers leaking
 * into the JSX.
 */
export function BottleModel({ product }: BottleModelProps) {
  // Profile of the bottle, X = radius, Y = height. Read from base to neck;
  // LatheGeometry sweeps the line 360° around the Y axis.
  const bodyProfile = useMemo<ReadonlyArray<[number, number]>>(
    () => [
      [0, -0.6],
      [0.35, -0.6],
      [0.5, -0.55],
      [0.55, -0.4],
      [0.55, 0.2],
      [0.5, 0.35],
      [0.35, 0.45],
      [0.2, 0.5],
      [0.2, 0.55],
      [0.18, 0.6],
      [0.15, 0.7],
      [0, 0.7],
    ],
    [],
  );

  const bodyPoints = useMemo(
    () => bodyProfile.map(([x, y]) => new THREE.Vector2(x, y)),
    [bodyProfile],
  );

  // Liquid profile: stop short of the neck so the surface sits below the
  // shoulder, then close the meniscus with a flat point at the top.
  const liquidPoints = useMemo(() => {
    const fillRatio = 0.78;
    const minY = -0.6;
    const maxY = 0.45;
    const surfaceY = minY + (maxY - minY) * fillRatio;
    const inset = 0.03;
    const pts: Array<THREE.Vector2> = [];
    pts.push(new THREE.Vector2(0, minY + 0.005));
    for (const entry of bodyProfile) {
      const x = entry[0];
      const y = entry[1];
      if (y > surfaceY) break;
      const tipRadius = Math.max(0, x - inset);
      pts.push(new THREE.Vector2(tipRadius, y));
    }
    // Close the meniscus.
    pts.push(new THREE.Vector2(0, surfaceY));
    return pts;
  }, [bodyProfile]);

  // Attenuation colour: desaturate the liquid colour halfway toward white
  // so the glass body does not look stained — we still want a hint.
  const attenuation = useMemo(() => {
    const c = new THREE.Color(product.liquid_color_hex);
    return c.lerp(new THREE.Color("#ffffff"), 0.6);
  }, [product.liquid_color_hex]);

  const liquidColor = useMemo(
    () => new THREE.Color(product.liquid_color_hex),
    [product.liquid_color_hex],
  );

  // Short label string: take the English name (the etiquette is editorial,
  // not localised) and the edition number when limited.
  const labelLine = product.names.en.toUpperCase();
  const editionLine =
    product.edition.type === "limited" && product.edition.number
      ? `Nº ${product.edition.number}`
      : "MAISON · DUBAI";

  return (
    <group>
      {/* GLASS BODY ─────────────────────────────────────────────── */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[bodyPoints, 64]} />
        <meshPhysicalMaterial
          transmission={0.92}
          thickness={1.0}
          ior={1.45}
          roughness={0.06}
          metalness={0}
          attenuationColor={attenuation}
          attenuationDistance={0.4}
          envMapIntensity={1.2}
          clearcoat={0.4}
          clearcoatRoughness={0.05}
          iridescence={0.08}
          iridescenceIOR={1.3}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* LIQUID INSIDE ──────────────────────────────────────────── */}
      <mesh>
        <latheGeometry args={[liquidPoints, 64]} />
        <meshPhysicalMaterial
          color={liquidColor}
          transmission={0.4}
          thickness={0.6}
          roughness={0.15}
          ior={1.33}
          envMapIntensity={0.7}
          attenuationColor={liquidColor}
          attenuationDistance={0.6}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* CAP — brass cylinder ──────────────────────────────────── */}
      <mesh castShadow position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.18, 32]} />
        <meshPhysicalMaterial
          color="#b8935a"
          metalness={0.9}
          roughness={0.25}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
          anisotropy={0.4}
          envMapIntensity={1.3}
        />
      </mesh>

      {/* CAP COLLAR — slim disc that joins cap to neck ─────────── */}
      <mesh position={[0, 0.685, 0]}>
        <cylinderGeometry args={[0.155, 0.155, 0.04, 32]} />
        <meshPhysicalMaterial
          color="#8a6f43"
          metalness={0.95}
          roughness={0.35}
        />
      </mesh>

      {/* PAPER LABEL — flat plane on front face ─────────────────── */}
      <group position={[0, -0.05, 0.555]}>
        <mesh>
          <planeGeometry args={[0.6, 0.4]} />
          <meshStandardMaterial
            color="#f0e8d8"
            roughness={0.95}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Text rendered via drei <Text> using the default SDF font so we
            don't depend on a typeface JSON or ttf shipping with the bundle. */}
        <DreiText
          position={[0, 0.07, 0.001]}
          fontSize={0.046}
          color="#1a1a1a"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
          maxWidth={0.55}
          textAlign="center"
        >
          {labelLine}
        </DreiText>
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[0.18, 0.005]} />
          <meshBasicMaterial color="#8a6f43" />
        </mesh>
        <DreiText
          position={[0, -0.08, 0.001]}
          fontSize={0.028}
          color="#5a4d36"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.16}
          maxWidth={0.55}
          textAlign="center"
        >
          {editionLine}
        </DreiText>
      </group>
    </group>
  );
}

export default BottleModel;
