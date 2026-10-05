"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion, useScroll, useTransform } from "motion/react";

/* ------------------------------------------------------------------
   ZUNOBOT, built from the paper: squircle chassis (200x180mm,
   35mm fillets), shell enclosure, cylindrical neck, hexagonal
   head unit, appliance-like cream finish with ember accents.
------------------------------------------------------------------ */

const WHITE = "#f3f1ea";
const WHITE_DARK = "#e2dfd6";
const INK = "#161009";
const PLATE = "#1d150c";
const EMBER = "#ff7a1c";
const TEAL = "#3ee6cf";
const BLUE = "#3b7be8";
const YELLOW = "#f2c744";

function Eye({ x }: { x: number }) {
  // local +Y points out of the face after the group's X rotation
  return (
    <group position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.115, 0.115, 0.05, 32]} />
        <meshStandardMaterial color="#0d0906" roughness={0.35} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.024, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.045, 32]} />
        <meshStandardMaterial
          color={TEAL}
          emissive={TEAL}
          emissiveIntensity={2.2}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 0.052, 0]}>
        <sphereGeometry args={[0.042, 24, 24]} />
        <meshStandardMaterial color="#050302" roughness={0.15} metalness={0.6} />
      </mesh>
    </group>
  );
}

function HeadUnit() {
  const head = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame(({ clock }) => {
    if (!head.current || reduced) return;
    // the head leads the body by a beat, like it is looking around
    head.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.2;
    head.current.rotation.z = Math.sin(clock.elapsedTime * 0.55) * 0.03;
  });

  return (
    <group ref={head} position={[0, 1.0, 0]}>
      {/* hexagonal head shell, flat side facing camera */}
      <mesh rotation={[0, Math.PI / 6, 0]}>
        <cylinderGeometry args={[0.44, 0.47, 0.44, 6, 1]} />
        <meshStandardMaterial color={WHITE} roughness={0.32} metalness={0.12} />
      </mesh>
      {/* dark face plate, proud of the flat front */}
      <mesh position={[0, -0.01, 0.13]} rotation={[0, Math.PI / 6, 0]}>
        <cylinderGeometry args={[0.335, 0.355, 0.36, 6, 1]} />
        <meshStandardMaterial color={PLATE} roughness={0.28} metalness={0.35} />
      </mesh>
      <group position={[0, 0, 0.41]}>
        <Eye x={-0.15} />
        <Eye x={0.15} />
      </group>
      {/* ear pods */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.085, 0.085, 0.06, 24]} />
            <meshStandardMaterial color={WHITE_DARK} roughness={0.4} metalness={0.2} />
          </mesh>
          <mesh position={[0, s * 0.04, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.02, 16]} />
            <meshStandardMaterial
              color={TEAL}
              emissive={TEAL}
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}
      {/* antenna */}
      <group position={[0, 0.26, -0.04]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.012, 0.14, 10]} />
          <meshStandardMaterial color={INK} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.034, 16, 16]} />
          <meshStandardMaterial
            color={TEAL}
            emissive={TEAL}
            emissiveIntensity={2.4}
          />
        </mesh>
      </group>
    </group>
  );
}

function RobotBody() {
  const robot = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  // the robot turns and sinks away as the visitor scrolls past the hero
  const { scrollY } = useScroll();
  const heroProgress = useTransform(scrollY, [0, 900], [0, 1]);

  useFrame(({ pointer, clock }) => {
    if (!robot.current) return;
    if (reduced) {
      robot.current.rotation.y = 0.3;
      return;
    }
    const s = heroProgress.get();
    // gentle idle turn + pointer parallax + scroll-driven quarter turn
    const target =
      0.15 + Math.sin(clock.elapsedTime * 0.18) * 0.18 + pointer.x * 0.4 + s * 1.1;
    robot.current.rotation.y = THREE.MathUtils.lerp(
      robot.current.rotation.y,
      target,
      0.05
    );
    robot.current.rotation.x = THREE.MathUtils.lerp(
      robot.current.rotation.x,
      pointer.y * -0.05,
      0.05
    );
    const sink = 1 - s * 0.1;
    robot.current.position.y = THREE.MathUtils.lerp(
      robot.current.position.y,
      -0.84 * sink - s * 0.55,
      0.08
    );
  });

  return (
    <group ref={robot} position={[0, -0.84, 0]}>
      {/* dark base skirt */}
      <RoundedBox
        args={[1.14, 0.16, 0.94]}
        radius={0.07}
        smoothness={6}
        position={[0, 0.09, 0]}
      >
        <meshStandardMaterial color={INK} roughness={0.45} metalness={0.4} />
      </RoundedBox>
      {/* squircle chassis */}
      <RoundedBox
        args={[1.3, 0.46, 1.06]}
        radius={0.19}
        smoothness={8}
        position={[0, 0.36, 0]}
        castShadow
      >
        <meshStandardMaterial color={WHITE} roughness={0.3} metalness={0.12} />
      </RoundedBox>
      {/* chest panel, matching the product's yellow display */}
      <RoundedBox
        args={[0.34, 0.26, 0.03]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.4, 0.525]}
      >
        <meshStandardMaterial
          color={YELLOW}
          emissive={YELLOW}
          emissiveIntensity={0.55}
          roughness={0.35}
        />
      </RoundedBox>
      {/* blue service stripe down the chassis */}
      <RoundedBox
        args={[0.3, 0.4, 0.02]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.12, 0.475]}
      >
        <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.15} />
      </RoundedBox>
      {/* cylindrical neck */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 0.26, 20]} />
        <meshStandardMaterial color={INK} roughness={0.4} metalness={0.5} />
      </mesh>
      <HeadUnit />
    </group>
  );
}

function Platform() {
  return (
    <group position={[0, -0.85, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.05, 48]} />
        <meshStandardMaterial color="#0c0906" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 0.98, 64]} />
        <meshBasicMaterial color={EMBER} toneMapped={false} opacity={0.9} transparent />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.31, 64]} />
        <meshBasicMaterial color={EMBER} toneMapped={false} opacity={0.32} transparent />
      </mesh>
    </group>
  );
}

function Embers({ count = 130 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = Math.random() * 5 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 0.5;
      speeds[i] = 0.12 + Math.random() * 0.3;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -1.2;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color="#ff9a44"
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function RobotScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0.5, 0.5, 4.3], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute !inset-0"
      aria-hidden
    >
      <fog attach="fog" args={["#070503", 7, 13]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 2]} intensity={1.15} color="#ffe3c2" />
      <pointLight position={[-2.6, 1.4, -2]} intensity={9} color={EMBER} />
      <pointLight position={[2.4, 0.6, 1.6]} intensity={3.5} color="#ffb066" />
      <spotLight
        position={[0, 5.4, 0.5]}
        angle={0.5}
        penumbra={1}
        intensity={1.6}
        color="#fff2e0"
      />

      <RobotBody />
      <Platform />
      <ContactShadows
        position={[0, -0.845, 0]}
        opacity={0.65}
        scale={5}
        blur={2.6}
        far={2.2}
        color="#000000"
      />
      <Embers />
    </Canvas>
  );
}
