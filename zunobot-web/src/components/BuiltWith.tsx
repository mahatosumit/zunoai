"use client";

import {
  Cpu,
  Circuitry,
  Graph,
  Stack,
  Database,
  WaveSine,
  Cube,
  Brain,
} from "@phosphor-icons/react";

const ITEMS = [
  { icon: Cpu, label: "Raspberry Pi 5" },
  { icon: Circuitry, label: "STM32 real-time nodes" },
  { icon: Graph, label: "ROS 2" },
  { icon: Stack, label: "CAN bus backbone" },
  { icon: Database, label: "ChromaDB vector store" },
  { icon: WaveSine, label: "Vosk speech pipeline" },
  { icon: Cube, label: "Fusion 360 prototyping" },
  { icon: Brain, label: "RAG explainability" },
];

export default function BuiltWith() {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex w-max items-center gap-14 pr-14"
    >
      {ITEMS.map((it) => (
        <span
          key={it.label}
          className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold text-[#cfc4b4]"
        >
          <it.icon size={15} weight="duotone" className="text-ember/80" />
          {it.label}
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Technology stack" className="border-y border-white/[0.06] bg-ink-2 py-7">
      <div className="mx-auto flex max-w-[1400px] items-center gap-8 px-5 sm:px-8">
        <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.26em] text-faint md:block">
          Built with
        </p>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
