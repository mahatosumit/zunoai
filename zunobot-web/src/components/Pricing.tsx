"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { PRICING } from "@/lib/content";
import Reveal from "./Reveal";

const GLYPH: Record<string, string> = {
  personal: "◎",
  code: "⌘",
  review: "✓",
  planning: "☰",
  design: "✶",
  knowledge: "◎",
  research: "◯",
  guardian: "▣",
};

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">
            Pricing <span className="text-ember">●</span>
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Start with an intention.
            <br />
            Let your agent work.
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-sm text-muted">
            Try the essentials on us. Add credits when you need more.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((p) => (
            <article
              key={p.id}
              className={`rounded-[1.4rem] border p-5 text-left ${
                p.featured
                  ? "border-ember/50 bg-[#12100c] shadow-[0_0_0_1px_rgba(255,122,28,0.15),0_20px_50px_rgba(255,122,28,0.08)]"
                  : "border-white/8 bg-[#0c0c0c]"
              }`}
            >
              {p.featured && (
                <span className="mb-3 inline-flex rounded-full border border-ember/40 bg-ember/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ember-2">
                  Most used
                </span>
              )}
              <div className="grid h-20 place-items-center text-3xl text-gold">{GLYPH[p.id]}</div>
              <h3 className="mt-2 text-[16px] font-medium">{p.name}</h3>
              <div className="mt-4 flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                <span>
                  Included each day
                  <br />
                  Additional use
                </span>
                <span className="text-right text-cream">
                  {p.included}
                  <br />
                  <span className="text-ember-2">{p.extra}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <a href="#meet" className="btn-ghost mx-auto mt-10">
          Explore all plans
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
