"use client";

import { useState } from "react";
import {
  Robot,
  Eye,
  Plug,
  PaperPlaneTilt,
  ShieldCheck,
  CirclesFour,
  BookOpen,
  Sparkle,
  Cpu,
} from "@phosphor-icons/react";
import { LAYERS, NODES } from "@/lib/content";
import Reveal from "./Reveal";

const ICONS: Record<string, React.ComponentType<{ size?: number; weight?: "light" }>> = {
  personal: Robot,
  observation: Eye,
  tools: Plug,
  intent: PaperPlaneTilt,
  permissions: ShieldCheck,
  context: CirclesFour,
  knowledge: BookOpen,
  perception: Sparkle,
  memory: Cpu,
};

export default function Ecosystem() {
  const [layer, setLayer] = useState(0);
  const active = LAYERS[layer];

  return (
    <section id="builders" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">
              Ecosystem <span className="text-ember">●</span>
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Inside the system.
              <br />
              Behind every action.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="text-sm leading-relaxed text-muted">
            Context, reasoning, tools, and memory. One architecture. Coordinated action.
          </Reveal>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.4fr]">
          <div className="relative space-y-2 pl-4">
            <span className="absolute bottom-4 left-0 top-4 w-px bg-white/10" />
            {LAYERS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setLayer(i)}
                className={`relative flex w-full cursor-pointer items-center gap-3 rounded-full border px-5 py-3 text-left text-[14px] transition-colors duration-500 ${
                  i === layer
                    ? "border-ember/40 bg-[#16120c] text-cream"
                    : "border-white/8 text-muted hover:text-cream"
                }`}
              >
                <span
                  className={`absolute -left-4 size-2.5 rounded-full ${
                    i === layer ? "bg-ember shadow-[0_0_10px_#ff7a1c]" : "bg-white/20"
                  }`}
                />
                {l.label}
              </button>
            ))}
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#0a0a0a] p-6 sm:p-10">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ff7a1c" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#c9a36a" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path d="M18 16 C 34 16, 40 16, 50 16" stroke="url(#g)" fill="none" strokeWidth="0.4" />
              <path d="M50 16 C 66 16, 70 16, 82 16" stroke="url(#g)" fill="none" strokeWidth="0.4" />
              <path d="M50 16 C 54 32, 56 40, 58 50" stroke="url(#g)" fill="none" strokeWidth="0.4" />
              <path d="M10 50 C 20 50, 26 50, 32 50" stroke="rgba(255,255,255,.12)" fill="none" strokeWidth="0.35" />
              <path d="M32 50 C 44 50, 50 50, 58 50" stroke="rgba(255,255,255,.12)" fill="none" strokeWidth="0.35" />
              <path d="M58 50 C 70 50, 78 50, 86 50" stroke="rgba(255,255,255,.12)" fill="none" strokeWidth="0.35" />
              <path d="M28 84 C 40 70, 50 58, 58 50" stroke="rgba(255,255,255,.12)" fill="none" strokeWidth="0.35" />
              <path d="M58 50 C 64 64, 68 76, 72 84" stroke="rgba(255,255,255,.12)" fill="none" strokeWidth="0.35" />
            </svg>
            {NODES.map((n) => {
              const Icon = ICONS[n.id];
              const lit = (active.nodes as readonly string[]).includes(n.id);
              return (
                <div
                  key={n.id}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 text-center ${lit ? "node-lit" : "opacity-50"}`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="node-tile mx-auto">
                    {Icon && <Icon size={22} weight="light" />}
                  </div>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                    {n.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
