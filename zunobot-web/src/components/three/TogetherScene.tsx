"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { AgentBot } from "./AgentBot";
import { useReducedMotion } from "motion/react";

function Cluster() {
  const ring = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  useFrame((_, dt) => {
    if (ring.current && !reduced) ring.current.rotation.y += dt * 0.18;
  });

  const spots = Array.from({ length: 4 }, (_, i) => {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    return [Math.cos(a) * 1.55, 0, Math.sin(a) * 1.55] as const;
  });

  return (
    <group ref={ring}>
      <group position={[0, 0.05, 0]} scale={0.92}>
        <AgentBot variant="mini" followPointer={false} />
      </group>
      {spots.map((p, i) => (
        <group key={i} position={[p[0], 0.15, p[2]]} rotation={[0, -Math.atan2(p[0], p[2]), 0]}>
          <AgentBot variant="mini" followPointer={false} />
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
        <torusGeometry args={[1.55, 0.012, 10, 80]} />
        <meshBasicMaterial color="#ffb066" transparent opacity={0.7} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function TogetherScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 5.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
      aria-hidden
    >
      <ambientLight intensity={0.32} />
      <directionalLight position={[2, 4, 3]} intensity={1.3} color="#ffe7c4" />
      <pointLight position={[0, 0, 0]} intensity={7} color="#ff8a2a" />
      <Environment preset="warehouse" />
      <Cluster />
      <ContactShadows position={[0, -0.7, 0]} opacity={0.55} scale={8} blur={2.6} color="#000" />
    </Canvas>
  );
}
