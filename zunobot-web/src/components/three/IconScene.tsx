"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { AgentBot, GOLD } from "./AgentBot";
import type { AgentId } from "@/lib/content";

function Spin({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.45;
  });
  return <group ref={ref}>{children}</group>;
}

function Gold() {
  return <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.22} />;
}
function Shell() {
  return <meshStandardMaterial color="#f4f0e8" metalness={0.2} roughness={0.3} />;
}

function IconMesh({ id }: { id: AgentId | string }) {
  if (id === "personal") {
    return (
      <group scale={1.15}>
        <AgentBot variant="head" followPointer={false} />
      </group>
    );
  }
  if (id === "operations") {
    return (
      <group>
        <RoundedBox args={[1.7, 2.05, 0.28]} radius={0.16} smoothness={4}>
          <Shell />
        </RoundedBox>
        <RoundedBox args={[1.82, 2.17, 0.12]} radius={0.18} smoothness={4} position={[0, 0, -0.08]}>
          <Gold />
        </RoundedBox>
        <mesh position={[0, 0.12, 0.16]}>
          <torusGeometry args={[0.42, 0.07, 12, 40]} />
          <Gold />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.42, 0.12 + Math.sin(a) * 0.42, 0.16]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.08, 0.28, 0.08]} />
              <Gold />
            </mesh>
          );
        })}
        <mesh position={[0, 0.12, 0.2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.08, 24]} />
          <Gold />
        </mesh>
        {[-0.28, 0.28].map((x) => (
          <RoundedBox key={x} args={[0.38, 0.12, 0.06]} radius={0.03} position={[x, -0.78, 0.16]}>
            <meshStandardMaterial color="#1a140e" roughness={0.4} />
          </RoundedBox>
        ))}
      </group>
    );
  }
  if (id === "guardian" || id === "review") {
    return (
      <group>
        <RoundedBox args={[1.1, 1.1, 0.28]} radius={0.22}>
          <Shell />
        </RoundedBox>
        <mesh position={[0, 0.05, 0.2]}>
          <torusGeometry args={[0.28, 0.08, 12, 28, Math.PI]} />
          <Gold />
        </mesh>
        <mesh position={[0, -0.02, 0.2]}>
          <boxGeometry args={[0.22, 0.28, 0.1]} />
          <Gold />
        </mesh>
      </group>
    );
  }
  if (id === "code") {
    return (
      <group>
        <RoundedBox args={[1.2, 1.2, 0.28]} radius={0.28}>
          <Shell />
        </RoundedBox>
        {[
          [-0.22, 0.18, 0.35],
          [0.22, -0.12, -0.35],
        ].map(([x, y, r], i) => (
          <mesh key={i} position={[x, y, 0.2]} rotation={[0, 0, r]}>
            <boxGeometry args={[0.12, 0.42, 0.1]} />
            <Gold />
          </mesh>
        ))}
      </group>
    );
  }
  if (id === "planning") {
    return (
      <group>
        <RoundedBox args={[1.2, 1.2, 0.28]} radius={0.28}>
          <Shell />
        </RoundedBox>
        {[0.22, 0, -0.22].map((y) => (
          <mesh key={y} position={[0, y, 0.2]}>
            <boxGeometry args={[0.55, 0.08, 0.08]} />
            <Gold />
          </mesh>
        ))}
      </group>
    );
  }
  if (id === "design") {
    return (
      <group>
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <Gold />
        </mesh>
        <mesh rotation={[0.6, 0.4, 0.2]}>
          <octahedronGeometry args={[0.42, 0]} />
          <Shell />
        </mesh>
      </group>
    );
  }
  if (id === "research" || id === "knowledge") {
    return (
      <group>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#f4f0e8" metalness={0.25} roughness={0.28} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.72, 0.03, 8, 48]} />
          <Gold />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.025, 8, 48]} />
          <Gold />
        </mesh>
      </group>
    );
  }
  if (id === "data") {
    return (
      <group>
        {[0.35, 0, -0.35].map((y, i) => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[0.55 - i * 0.08, 0.55 - i * 0.08, 0.22, 28]} />
            {i === 1 ? <Gold /> : <Shell />}
          </mesh>
        ))}
      </group>
    );
  }
  if (id === "router") {
    return (
      <group>
        <mesh>
          <torusGeometry args={[0.55, 0.05, 10, 40]} />
          <Gold />
        </mesh>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <Shell />
            </mesh>
          );
        })}
      </group>
    );
  }
  return (
    <mesh>
      <icosahedronGeometry args={[0.7, 0]} />
      <Gold />
    </mesh>
  );
}

function Scene({ id }: { id: AgentId | string }) {
  const key = id;
  const mesh = useMemo(() => <IconMesh id={id} />, [id]);
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2.4, 2.6, 3]} intensity={1.5} color="#ffe7c4" />
      <pointLight position={[0, -0.4, 2]} intensity={5} color="#ff8a2a" />
      <Environment preset="warehouse" />
      <Spin key={key}>{mesh}</Spin>
    </>
  );
}

export default function IconScene({ id }: { id: AgentId | string }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.1, 4.1], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
      aria-hidden
    >
      <Scene id={id} />
    </Canvas>
  );
}
