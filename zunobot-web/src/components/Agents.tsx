"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { AGENTS, type AgentId } from "@/lib/content";
import Reveal from "./Reveal";

const IconScene = dynamic(() => import("@/components/three/IconScene"), { ssr: false });

const ICONS: Record<string, string> = {
  personal: "◎",
  research: "⌕",
  code: "</>",
  design: "✶",
  data: "▦",
  planning: "☰",
  router: "⬡",
  operations: "☼",
  guardian: "◈",
};

export default function Agents() {
  const [id, setId] = useState<AgentId>("personal");
  const agent = AGENTS.find((a) => a.id === id) ?? AGENTS[0];

  return (
    <section id="agents" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">
              Products <span className="text-ember">●</span> 09 Agents
            </p>
            <h2 className="mt-4 max-w-[14ch] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Specialized agents. Shared intelligence.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-[36ch] text-sm leading-relaxed text-muted">
            A specialist for every task. A coordinated system for every ambition.
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.2fr]">
          <div className="space-y-1.5">
            {AGENTS.map((a) => {
              const on = a.id === id;
              return (
                <button
                  key={a.id}
                  onClick={() => setId(a.id)}
                  className={`w-full cursor-pointer rounded-2xl border px-4 py-3.5 text-left transition-colors duration-500 ${
                    on
                      ? "border-white/12 bg-[#12110f]"
                      : "border-transparent bg-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3 text-[15px]">
                      <span className="grid size-8 place-items-center rounded-lg border border-white/10 text-[12px] text-gold">
                        {ICONS[a.id]}
                      </span>
                      {a.name}
                    </span>
                    <span className="font-mono text-[11px] text-faint">{a.code}</span>
                  </div>
                  {on && (
                    <div className="mt-3 pl-11">
                      <p className="text-[13px] leading-relaxed text-muted">{a.blurb}</p>
                      <a
                        href="#meet"
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-ember px-3.5 py-1.5 text-[12px] font-medium text-black"
                      >
                        Meet your personal agent
                        <ArrowUpRight size={12} />
                      </a>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.6rem] border border-white/8 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,122,28,0.16),transparent_55%),#080808]">
            <span className="absolute left-5 top-5 z-10 font-mono text-[11px] text-faint">
              {agent.code} / 09
            </span>
            <IconScene id={agent.id} />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-5 gap-y-2 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              {agent.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
