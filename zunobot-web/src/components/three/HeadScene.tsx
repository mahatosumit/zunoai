"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AgentBot, EmberField } from "./AgentBot";

export default function HeadScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.1, 3.2], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 2, 3]} intensity={1.4} color="#ffe7c4" />
      <pointLight position={[0, 0, 2]} intensity={6} color="#ff8a2a" />
      <Environment preset="warehouse" />
      <AgentBot variant="head" />
      <EmberField count={50} />
    </Canvas>
  );
}
