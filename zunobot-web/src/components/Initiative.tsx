"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Brain, ShieldCheck } from "@phosphor-icons/react";
import Reveal from "./Reveal";

const HeadScene = dynamic(() => import("@/components/three/HeadScene"), { ssr: false });

const POINTS = [
  { icon: Brain, title: "An agent that remembers." },
  { icon: Brain, title: "A system that reasons." },
  { icon: ShieldCheck, title: "A partner that acts." },
];

export default function Initiative() {
  const [tab, setTab] = useState(0);
  const tabs = ["Discover & understand", "Build & create", "Connect & scale"];

  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-10 flex items-center justify-center gap-8 text-[13px] text-faint">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`relative cursor-pointer pb-2 transition-colors duration-500 ${
                i === tab ? "text-cream" : ""
              }`}
            >
              <span className="mr-2 font-mono text-[11px] text-ember">A{i + 1}</span>
              {t}
              {i === tab && (
                <span className="absolute inset-x-0 -bottom-px h-px bg-ember" />
              )}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr_0.9fr]">
          <Reveal>
            <h2 className="max-w-[12ch] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              A little initiative. A lot more possible.
            </h2>
          </Reveal>
          <div className="relative h-[340px] sm:h-[420px]">
            <HeadScene />
          </div>
          <Reveal delay={0.1} className="space-y-5">
            {POINTS.map((p) => (
              <div key={p.title} className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl border border-white/10 text-ember-2">
                  <p.icon size={16} weight="light" />
                </span>
                <p className="text-[15px]">{p.title}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-[1.4rem] border border-white/8 sm:grid-cols-4">
          <div className="flex items-center px-6 py-5 text-[11px] uppercase tracking-[0.22em] text-faint">
            Recognized by
          </div>
          {[
            ["Nova Network", "Ecosystem innovation honors"],
            ["frontier", "Builders choice · intelligence"],
            ["design futures.", "Digital experience selection"],
          ].map(([n, s]) => (
            <div key={n} className="border-t border-white/8 px-6 py-5 sm:border-l sm:border-t-0">
              <p className="text-[15px] font-medium">{n}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {s}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
