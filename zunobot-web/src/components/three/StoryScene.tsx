"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { GOLD } from "./AgentBot";

function Piece({ kind }: { kind: "mask" | "gyro" | "disc" }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={ref}>
      {kind === "mask" && (
        <>
          <mesh>
            <sphereGeometry args={[0.7, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
            <meshStandardMaterial color="#3a2a78" metalness={0.7} roughness={0.18} />
          </mesh>
          {[-0.22, 0.22].map((x) => (
            <mesh key={x} position={[x, 0.12, 0.5]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#0b0814" roughness={0.3} />
            </mesh>
          ))}
        </>
      )}
      {kind === "gyro" && (
        <>
          <mesh>
            <sphereGeometry args={[0.42, 24, 24]} />
            <meshStandardMaterial
              color="#7ec8ff"
              emissive="#4aa7e8"
              emissiveIntensity={0.8}
              metalness={0.4}
              roughness={0.2}
            />
          </mesh>
          <mesh rotation={[0.4, 0, 0.3]}>
            <torusGeometry args={[0.7, 0.035, 10, 48]} />
            <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh rotation={[1.2, 0.4, 0]}>
            <torusGeometry args={[0.85, 0.03, 10, 48]} />
            <meshStandardMaterial color="#d8dde8" metalness={0.85} roughness={0.2} />
          </mesh>
        </>
      )}
      {kind === "disc" && (
        <>
          <mesh rotation={[0.5, 0, 0.2]}>
            <cylinderGeometry args={[0.85, 0.85, 0.08, 48]} />
            <meshStandardMaterial color="#16120e" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh rotation={[0.5, 0, 0.2]} position={[0, 0.02, 0]}>
            <torusGeometry args={[0.55, 0.025, 10, 48]} />
            <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
          </mesh>
        </>
      )}
    </group>
  );
}

export default function StoryScene({ kind }: { kind: "mask" | "gyro" | "disc" }) {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0.1, 3.2], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
      aria-hidden
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 2, 3]} intensity={1.4} color="#ffe7c4" />
      <Environment preset="warehouse" />
      <Piece kind={kind} />
    </Canvas>
  );
}
