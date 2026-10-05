"use client";

import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

export const GOLD = "#c9a36a";
export const GOLD_HI = "#f0d7a2";
export const WHITE = "#f6f3ec";
export const WHITE_D = "#e4dfd4";

// A stable sequence keeps the particle field identical across React renders.
// That avoids hydration surprises and lets the scene remain fully deterministic.
function sample(index: number, channel: number) {
  return ((index * 137 + channel * 59 + 17) % 997) / 997;
}

export function useEyeTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(256, 230, 18, 256, 256, 250);
    g.addColorStop(0, "#fff6d0");
    g.addColorStop(0.1, "#ffc56a");
    g.addColorStop(0.28, "#ff7a1c");
    g.addColorStop(0.55, "#e24a08");
    g.addColorStop(0.82, "#6a1c06");
    g.addColorStop(1, "#1a0804");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    ctx.beginPath();
    ctx.arc(256, 268, 78, 0, Math.PI * 2);
    ctx.fillStyle = "#120804";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(210, 200, 38, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

function GoldMat() {
  return (
    <meshStandardMaterial
      color={GOLD}
      metalness={0.92}
      roughness={0.22}
      envMapIntensity={1.4}
    />
  );
}
function ShellMat({ color = WHITE }: { color?: string }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.28}
      metalness={0.18}
      envMapIntensity={0.9}
    />
  );
}

function Eye({
  x,
  texture,
  track,
}: {
  x: number;
  texture: THREE.Texture;
  track: React.MutableRefObject<THREE.Vector2>;
}) {
  const iris = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!iris.current) return;
    iris.current.position.x = x + track.current.x * 0.045;
    iris.current.position.y = 0.02 + track.current.y * 0.03;
  });
  return (
    <group position={[x, 0.04, 0.42]}>
      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ff6a12"
          emissiveIntensity={0.55}
          emissiveMap={texture}
          roughness={0.18}
          metalness={0.05}
        />
      </mesh>
      <mesh ref={iris} position={[x > 0 ? 0.02 : -0.02, 0.02, 0.18]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#080403" roughness={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.02]}>
        <torusGeometry args={[0.345, 0.028, 12, 40]} />
        <GoldMat />
      </mesh>
    </group>
  );
}

export function AgentBot({
  variant = "hero",
  followPointer = true,
}: {
  variant?: "hero" | "mini" | "head";
  followPointer?: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const look = useRef(new THREE.Vector2());
  const reduced = useReducedMotion();
  const eyeTex = useEyeTexture();
  const s = variant === "mini" ? 0.42 : 1;

  useFrame(({ pointer, clock }) => {
    if (!root.current) return;
    const t = clock.elapsedTime;
    if (reduced) {
      root.current.rotation.y = variant === "hero" ? 0.18 : 0;
      return;
    }
    if (followPointer) {
      look.current.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.06);
    }
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(
        head.current.rotation.y,
        (followPointer ? look.current.x : Math.sin(t * 0.4)) * 0.28,
        0.08
      );
      head.current.rotation.x = THREE.MathUtils.lerp(
        head.current.rotation.x,
        (followPointer ? -look.current.y : 0) * 0.12,
        0.08
      );
    }
    root.current.position.y = Math.sin(t * 0.9) * (variant === "mini" ? 0.03 : 0.06);
    if (variant === "hero") {
      root.current.rotation.y = THREE.MathUtils.lerp(
        root.current.rotation.y,
        0.12 + look.current.x * 0.35,
        0.045
      );
    }
  });

  const segs = variant === "mini" ? 12 : 28;

  return (
    <group ref={root} scale={s}>
      <group ref={head} position={[0, variant === "head" ? 0 : 1.05, 0]}>
        <mesh scale={[1.55, 1.08, 1.12]} castShadow>
          <sphereGeometry args={[0.62, segs, segs]} />
          <ShellMat />
        </mesh>
        {/* gold visor frame */}
        <RoundedBox
          args={[1.52, 0.78, 0.16]}
          radius={0.28}
          smoothness={4}
          position={[0, 0.04, 0.46]}
        >
          <GoldMat />
        </RoundedBox>
        <Eye x={-0.36} texture={eyeTex} track={look} />
        <Eye x={0.36} texture={eyeTex} track={look} />
        {/* smile */}
        <mesh position={[0, -0.22, 0.58]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.08, 0.012, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#c4b8a8" roughness={0.4} />
        </mesh>
        {/* ears */}
        {([-1, 1] as const).map((side) => (
          <group key={side} position={[side * 0.92, 0.02, 0.08]} rotation={[0, 0, side * 0.12]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.16, 0.16, 0.22, segs]} />
              <GoldMat />
            </mesh>
            <mesh position={[side * 0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.11, 0.11, 0.08, segs]} />
              <ShellMat color={WHITE_D} />
            </mesh>
          </group>
        ))}
      </group>

      {variant !== "head" && (
        <>
          <mesh position={[0, 0.62, 0]}>
            <cylinderGeometry args={[0.16, 0.18, 0.16, segs]} />
            <GoldMat />
          </mesh>
          <RoundedBox
            args={[0.92, 1.05, 0.72]}
            radius={0.28}
            smoothness={4}
            position={[0, 0.05, 0]}
            castShadow
          >
            <ShellMat />
          </RoundedBox>
          <mesh position={[0, 0.18, 0.38]}>
            <sphereGeometry args={[0.16, segs, segs]} />
            <meshStandardMaterial
              color={GOLD_HI}
              emissive="#ffb066"
              emissiveIntensity={1.4}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
          {([-1, 1] as const).map((side) => (
            <group key={side} position={[side * 0.58, 0.28, 0]}>
              <mesh>
                <sphereGeometry args={[0.13, segs, segs]} />
                <GoldMat />
              </mesh>
              <mesh position={[side * 0.02, -0.32, 0.04]} rotation={[0.15, 0, side * 0.12]}>
                <capsuleGeometry args={[0.09, 0.28, 6, segs]} />
                <ShellMat />
              </mesh>
              <mesh position={[side * 0.04, -0.52, 0.08]}>
                <sphereGeometry args={[0.1, segs, segs]} />
                <GoldMat />
              </mesh>
            </group>
          ))}
          {([-1, 1] as const).map((side) => (
            <group key={`leg-${side}`} position={[side * 0.2, -0.55, 0.02]}>
              <mesh>
                <sphereGeometry args={[0.12, segs, segs]} />
                <GoldMat />
              </mesh>
              <mesh position={[0, -0.22, 0]}>
                <capsuleGeometry args={[0.1, 0.16, 6, segs]} />
                <ShellMat />
              </mesh>
              <mesh position={[0, -0.34, 0.02]}>
                <sphereGeometry args={[0.11, segs, segs]} />
                <GoldMat />
              </mesh>
            </group>
          ))}
        </>
      )}
    </group>
  );
}

export function GoldPlatform({ radius = 1.55 }: { radius?: number }) {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  const c = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((_, dt) => {
    if (reduced) return;
    if (a.current) a.current.rotation.z += dt * 0.35;
    if (b.current) b.current.rotation.z -= dt * 0.22;
    if (c.current) c.current.rotation.z += dt * 0.12;
  });

  return (
    <group position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <circleGeometry args={[radius + 0.15, 64]} />
        <meshStandardMaterial
          color="#100c08"
          metalness={0.6}
          roughness={0.4}
          emissive="#3a220c"
          emissiveIntensity={0.4}
        />
      </mesh>
      <group ref={a}>
        <mesh>
          <torusGeometry args={[radius * 0.62, 0.018, 12, 80]} />
          <meshBasicMaterial color="#ffb066" toneMapped={false} />
        </mesh>
      </group>
      <group ref={b} position={[0, 0, 0.02]}>
        <mesh>
          <torusGeometry args={[radius * 0.86, 0.01, 10, 80]} />
          <meshBasicMaterial color="#c9a36a" transparent opacity={0.7} toneMapped={false} />
        </mesh>
      </group>
      <group ref={c} position={[0, 0, 0.04]}>
        <mesh>
          <ringGeometry args={[radius * 1.02, radius * 1.04, 80]} />
          <meshBasicMaterial
            color="#ff7a1c"
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>
      <mesh position={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.22, 0.55, 0.9, 24, 1, true]} />
        <meshBasicMaterial
          color="#ff8a2a"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function EmberField({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (sample(i, 0) - 0.5) * 8;
      positions[i * 3 + 1] = sample(i, 1) * 5 - 1;
      positions[i * 3 + 2] = (sample(i, 2) - 0.5) * 5;
      speeds[i] = 0.08 + sample(i, 3) * 0.22;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 4.2) arr[i * 3 + 1] = -1.1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#ffb066"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
