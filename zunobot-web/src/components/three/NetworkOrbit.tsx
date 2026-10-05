"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------
   The care network, as a live 3D orbit: ZUNOBOT at the center,
   family, caregivers, doctors, and neighbors circling around it.
------------------------------------------------------------------ */

const EMBER = "#ff7a1c";
const CREAM = "#efe8da";

function Orbiters() {
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const whole = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!reduced) {
      if (ring1.current) ring1.current.rotation.y = t * 0.3;
      if (ring2.current) ring2.current.rotation.y = -t * 0.18;
      if (whole.current) whole.current.position.y = Math.sin(t * 0.7) * 0.06;
    }
  });

  const outer = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return [Math.cos(a) * 1.3, 0, Math.sin(a) * 1.3];
      }),
    []
  );
  const inner = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: 3 }, (_, i) => {
        const a = (i / 3) * Math.PI * 2 + 0.5;
        return [Math.cos(a) * 0.78, 0.35, Math.sin(a) * 0.78];
      }),
    []
  );

  return (
    <group ref={whole}>
      {/* center: ZUNOBOT core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={EMBER}
          emissive={EMBER}
          emissiveIntensity={2.2}
          roughness={0.3}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial color={EMBER} transparent opacity={0.12} />
      </mesh>
      <pointLight intensity={5} color={EMBER} distance={6} />

      {/* inner circle: household */}
      <group ref={ring2}>
        {inner.map((p, i) => (
          <mesh key={i} position={[p[0], p[1], p[2]]}>
            <sphereGeometry args={[0.06, 20, 20]} />
            <meshStandardMaterial
              color={CREAM}
              emissive={CREAM}
              emissiveIntensity={1.4}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>

      {/* outer circle: the care network */}
      <group ref={ring1}>
        {outer.map((p, i) => (
          <group key={i} position={[p[0], p[1], p[2]]}>
            <mesh>
              <sphereGeometry args={[0.1, 24, 24]} />
              <meshStandardMaterial
                color={CREAM}
                emissive="#ffd9ae"
                emissiveIntensity={1.1}
                roughness={0.35}
                metalness={0.2}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshBasicMaterial color="#ffb066" transparent opacity={0.1} />
            </mesh>
          </group>
        ))}
      </group>

      {/* orbit rings */}
      <mesh rotation={[Math.PI / 2.15, 0, 0.2]}>
        <torusGeometry args={[1.3, 0.006, 8, 96]} />
        <meshBasicMaterial color={EMBER} transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 1.85, 0, -0.35]}>
        <torusGeometry args={[0.78, 0.005, 8, 96]} />
        <meshBasicMaterial color={CREAM} transparent opacity={0.22} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.05, 2.06, 64]} />
        <meshBasicMaterial color={EMBER} transparent opacity={0.14} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function NetworkOrbit() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0.4, 1.15, 3.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
      aria-hidden
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 2.5, 2]} intensity={3} color="#ffb066" />
      <pointLight position={[-3, -1, 1]} intensity={2} color={EMBER} />
      <Orbiters />
    </Canvas>
  );
}
