"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { STORIES } from "@/lib/content";
import Reveal from "./Reveal";

const StoryScene = dynamic(() => import("@/components/three/StoryScene"), { ssr: false });

export default function Stories() {
  const [i, setI] = useState(0);
  const visible = [0, 1, 2].map((n) => STORIES[(i + n) % STORIES.length]);

  return (
    <section id="stories" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-12 flex items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">
              Stories <span className="text-ember">●</span>
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              From intent
              <br />
              to impact.
            </h2>
          </Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              From the collective / {String(i + 1).padStart(2, "0")} / 06
            </span>
            <button
              onClick={() => setI((v) => (v + STORIES.length - 1) % STORIES.length)}
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-white/12"
              aria-label="Previous"
            >
              <CaretLeft size={14} />
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % STORIES.length)}
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-white/12"
              aria-label="Next"
            >
              <CaretRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {visible.map((s) => (
            <article
              key={s.title}
              className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#0c0c0c]"
            >
              <div className="relative h-56 bg-[#080808]">
                <StoryScene kind={s.kind} />
              </div>
              <div className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {s.kicker}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
