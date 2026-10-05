"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { AgentBot, EmberField, GoldPlatform } from "./AgentBot";
import { useReducedMotion } from "motion/react";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[3.2, 4.2, 2.4]} intensity={1.35} color="#ffe8c8" />
      <pointLight position={[0, -0.4, 1.2]} intensity={8} color="#ff8a2a" distance={8} />
      <pointLight position={[-2.8, 1.6, -1.4]} intensity={4} color="#ffb066" />
      <spotLight
        position={[0, 5.2, 1.2]}
        angle={0.48}
        penumbra={1}
        intensity={1.5}
        color="#fff6ea"
      />
    </>
  );
}

export default function HeroScene() {
  const reduced = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0.15, 0.55, 4.6], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
      aria-hidden
    >
      <fog attach="fog" args={["#050505", 7, 14]} />
      <Lights />
      <Environment preset="warehouse" />
      <group position={[0, -0.15, 0]}>
        <AgentBot variant="hero" />
        <GoldPlatform />
      </group>
      <ContactShadows
        position={[0, -1.06, 0]}
        opacity={0.7}
        scale={6}
        blur={2.4}
        far={2.4}
        color="#000"
      />
      {!reduced && <EmberField />}
    </Canvas>
  );
}
