"use client";

import dynamic from "next/dynamic";
import {
  CirclesFour,
  Database,
  GitFork,
  ShieldCheck,
  SquaresFour,
  Target,
  ArrowUpRight,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";

const TogetherScene = dynamic(() => import("@/components/three/TogetherScene"), {
  ssr: false,
});

const FEATURES = [
  { icon: CirclesFour, label: "Coordinated autonomy" },
  { icon: Database, label: "Shared context & memory" },
  { icon: GitFork, label: "Specialist agent routing" },
  { icon: ShieldCheck, label: "Human approval controls" },
  { icon: SquaresFour, label: "Parallel task execution" },
  { icon: Target, label: "One clear result" },
];

const PARTNERS = ["vertex", "OpenRelay", "PRISM", "CONNECT", "auric"];

export default function Together() {
  return (
    <section id="network" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.3fr_0.7fr]">
          <Reveal>
            <p className="eyebrow">
              Many agents, one shared intent. <span className="text-ember">●</span>
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              BETTER.
              <br />
              <span className="text-ember">TOGETHER.</span>
            </h2>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-muted">
              Research. Design. Code. Data. Operations. Specialists that think and act together.
            </p>
            <a href="#agents" className="mt-6 inline-flex items-center gap-2 text-sm text-cream">
              Discover the network
              <ArrowUpRight size={14} />
            </a>
          </Reveal>

          <div className="relative h-[380px] sm:h-[460px]">
            <TogetherScene />
          </div>

          <div className="space-y-2 rounded-[1.4rem] border border-white/8 p-2">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                <span className="grid size-8 place-items-center rounded-lg border border-white/10 text-gold">
                  <f.icon size={15} weight="light" />
                </span>
                <span className="text-[13px]">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-full border border-white/8">
          <div className="flex items-center gap-10 px-8 py-5">
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
              Explore with
            </span>
            {PARTNERS.map((p) => (
              <span key={p} className="text-[15px] font-medium tracking-wide text-muted">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
