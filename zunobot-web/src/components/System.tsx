"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Camera,
  Microphone,
  Crosshair,
  Cpu,
  Circuitry,
  Brain,
  Database,
  Eye,
  ChatCircleText,
  Graph,
  type IconProps,
} from "@phosphor-icons/react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type LayerKey = "l1" | "l2" | "l3" | "l4";
type NodeKey = "camera" | "mic" | "lidar" | "stm32" | "can" | "brain" | "graph" | "db" | "eye" | "chat";

const LAYERS: Record<
  LayerKey,
  { label: string; desc: string; nodes: NodeKey[] }
> = {
  l1: {
    label: "Sensing and actuation",
    desc: "Distributed STM32 microcontrollers poll every sensor and drive every motor with hard real-time precision. Camera, microphone array, LiDAR, ultrasonic, IMU.",
    nodes: ["camera", "mic", "lidar", "stm32"],
  },
  l2: {
    label: "Control and communication",
    desc: "Subsystems talk over CAN bus, the industrial protocol trusted in automotive robotics. Fault-tolerant, upgradeable, and safe by construction.",
    nodes: ["stm32", "can"],
  },
  l3: {
    label: "Cognition and interaction",
    desc: "A Raspberry Pi 5 runs ROS 2: perception fusion, dialogue management, and task planning turn a spoken request into a planned action sequence.",
    nodes: ["brain", "graph", "camera", "mic"],
  },
  l4: {
    label: "Explainability engine",
    desc: "Vision-language scene descriptions and system logs are embedded into a local vector database. Ask why, and a language model answers in plain language.",
    nodes: ["db", "eye", "chat"],
  },
};

const NODES: {
  key: NodeKey;
  icon: React.ComponentType<IconProps>;
  label: string;
  x: string;
  y: string;
  layer: LayerKey;
  hub?: boolean;
}[] = [
  { key: "camera", icon: Camera, label: "HD camera", x: "17%", y: "16%", layer: "l1" },
  { key: "mic", icon: Microphone, label: "Mic array", x: "50%", y: "16%", layer: "l1" },
  { key: "lidar", icon: Crosshair, label: "LiDAR", x: "83%", y: "16%", layer: "l1" },
  { key: "stm32", icon: Cpu, label: "STM32 nodes", x: "12%", y: "51%", layer: "l2" },
  { key: "can", icon: Circuitry, label: "CAN bus", x: "30%", y: "51%", layer: "l2" },
  { key: "brain", icon: Brain, label: "Raspberry Pi 5", x: "50%", y: "51%", layer: "l3", hub: true },
  { key: "db", icon: Database, label: "Vector store", x: "70%", y: "51%", layer: "l4" },
  { key: "eye", icon: Eye, label: "VLM vision", x: "88%", y: "51%", layer: "l4" },
  { key: "chat", icon: ChatCircleText, label: "LLM reasoner", x: "33%", y: "86%", layer: "l4" },
  { key: "graph", icon: Graph, label: "ROS 2 mesh", x: "66%", y: "86%", layer: "l3" },
];

const ORDER: LayerKey[] = ["l1", "l2", "l3", "l4"];

export default function System() {
  const reduced = useReducedMotion();
  const [layer, setLayer] = useState<LayerKey>("l1");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (reduced || !auto) return;
    const t = setInterval(() => {
      setLayer((l) => ORDER[(ORDER.indexOf(l) + 1) % ORDER.length]);
    }, 4200);
    return () => clearInterval(t);
  }, [reduced, auto]);

  const pick = (k: LayerKey) => {
    setAuto(false);
    setLayer(k);
  };

  const activeNodes = LAYERS[layer].nodes;

  return (
    <section id="system" className="relative border-y border-white/[0.06] bg-ink-2 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[720px] bg-[radial-gradient(60%_60%_at_80%_20%,rgba(255,116,22,0.06),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.32em] text-muted"
          >
            <span className="size-1.5 rotate-45 bg-ember shadow-[0_0_8px_rgba(255,122,28,0.8)]" />
            Open architecture
          </motion.p>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-5 text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            Inside the system.
            <br />
            <span className="text-faint">Behind every action.</span>
          </motion.h2>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[34fr_66fr]">
          {/* layer selector */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="relative flex flex-col items-start gap-3.5">
              <span
                aria-hidden
                className="absolute bottom-5 left-[7px] top-5 w-px bg-gradient-to-b from-ember/60 to-ember/5"
              />
              {(Object.keys(LAYERS) as LayerKey[]).map((k, i) => {
                const active = k === layer;
                return (
                  <button
                    key={k}
                    onClick={() => pick(k)}
                    className={`relative z-10 flex cursor-pointer items-center gap-3 rounded-full border py-3 pl-4 pr-6 text-left text-sm transition-all duration-300 ${
                      active
                        ? "border-ember/50 bg-gradient-to-b from-[#1d130a] to-[#140d07] text-cream shadow-[0_0_0_1px_rgba(255,122,28,0.18),0_10px_30px_rgba(255,116,22,0.12)]"
                        : "border-white/[0.08] bg-panel text-muted hover:border-white/20 hover:text-cream"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full border transition-all duration-300 ${
                        active
                          ? "border-ember bg-ember shadow-[0_0_10px_rgba(255,122,28,0.8)]"
                          : "border-faint bg-transparent"
                      }`}
                    />
                    <span className={`font-mono text-[11px] ${active ? "text-ember" : "text-faint"}`}>
                      L{i + 1}
                    </span>
                    {LAYERS[k].label}
                  </button>
                );
              })}
            </div>
            <p className="mt-7 min-h-24 max-w-[42ch] text-[15px] leading-relaxed text-muted">
              {LAYERS[layer].desc}
            </p>
          </motion.div>

          {/* node map */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="node-map relative aspect-[640/470] overflow-hidden rounded-3xl border border-white/[0.08]"
            data-focused="true"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_46%,rgba(255,116,22,0.07),transparent_70%)]"
            />
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 640 460"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="wire-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ff7a1c" stopOpacity="0.1" />
                  <stop offset="0.5" stopColor="#ff9a44" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#ff7a1c" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path className="wire" d="M109 74 V150 H320 V197" />
              <path className="wire" d="M320 74 V197" />
              <path className="wire" d="M531 74 V150 H320 V197" />
              <path className="wire" d="M77 236 H130" />
              <path className="wire" d="M192 236 H282" />
              <path className="wire" d="M358 236 H448" />
              <path className="wire" d="M563 236 H500" />
              <path className="wire" d="M211 391 V330 H320 V275" />
              <path className="wire" d="M422 391 V330 H320 V275" />
              {/* live pulses */}
              <path className="wire wire-hot" d="M109 74 V150 H320 V197" style={{ animationDelay: "0s" }} />
              <path className="wire wire-hot" d="M320 74 V197" style={{ animationDelay: "-1s" }} />
              <path className="wire wire-hot" d="M531 74 V150 H320 V197" style={{ animationDelay: "-2s" }} />
              <path className="wire wire-hot" d="M77 236 H130" style={{ animationDelay: "-0.5s" }} />
              <path className="wire wire-hot" d="M192 236 H282" style={{ animationDelay: "-1.5s" }} />
              <path className="wire wire-hot" d="M358 236 H448" style={{ animationDelay: "-0.8s" }} />
              <path className="wire wire-hot" d="M563 236 H500" style={{ animationDelay: "-2.4s" }} />
              <path className="wire wire-hot" d="M211 391 V330 H320 V275" style={{ animationDelay: "-0.3s" }} />
              <path className="wire wire-hot" d="M422 391 V330 H320 V275" style={{ animationDelay: "-1.8s" }} />
            </svg>

            {NODES.map((n, i) => {
              const Icon = n.icon;
              const lit = activeNodes.includes(n.key);
              return (
                <div
                  key={n.key}
                  className={`node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-all duration-500 ${
                    n.hub ? "node-hub" : lit ? "node-lit" : ""
                  }`}
                  style={{ left: n.x, top: n.y }}
                >
                  <span
                    className={`node-box ${n.hub ? "" : "animate-float-soft"}`}
                    style={n.hub ? undefined : { animationDelay: `${i * 0.45}s` }}
                  >
                    <Icon
                      weight="duotone"
                      className={n.hub ? "size-8" : "size-6"}
                    />
                  </span>
                  <span
                    className={`whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                      n.hub ? "text-ember-2" : lit ? "text-[#d9c5ae]" : "text-faint"
                    }`}
                  >
                    {n.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
