"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Database,
  Briefcase,
  Brain,
  ShieldCheck,
} from "@phosphor-icons/react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const STEPS = ["Meet", "Understand", "Think", "Act", "Connect"];
const ease: [number, number, number, number] = [0.32, 0.72, 0, 1];

const HUD = [
  { icon: Database, k: "Memory", v: "Persistent", pos: "left-[6%] top-[28%]" },
  { icon: Briefcase, k: "Tools", v: "12 connected", pos: "left-[8%] bottom-[30%]" },
  { icon: Brain, k: "Reasoning", v: "Online", pos: "right-[6%] top-[32%]" },
  { icon: ShieldCheck, k: "Confidence", v: "97.4%", pos: "right-[8%] bottom-[28%]" },
];

export default function Hero() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  // Keep a real image fallback for browsers that block WebGL. The check runs
  // after paint so the hero never delays its first meaningful content.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
      } catch {
        setWebgl(false);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4500);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-clip pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(255,122,28,0.16),transparent_42%)]" />

      <div className="mx-auto grid min-h-[calc(100dvh-8rem)] max-w-[1280px] items-center gap-4 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 py-8">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="eyebrow"
          >
            Autonomous intelligence <span className="text-ember">●</span>
          </motion.p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="mt-5 text-[3.4rem] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-7xl"
          >
            Think.
            <br />
            Decide.
            <br />
            <span className="text-ember">Act.</span>
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.42 }}
            className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-muted"
          >
            An intelligent agent that understands context, connects your tools,
            and turns intent into action.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.52 }}
            className="mt-8 flex flex-wrap items-center gap-3"
            id="meet"
          >
            <a href="#agents" className="btn-metal">
              Sign up
              <span className="knob">
                <ArrowUpRight size={12} weight="bold" />
              </span>
            </a>
            <a href="#how" className="btn-ghost">
              See how it works
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
          className="relative h-[420px] sm:h-[540px] lg:h-[calc(100dvh-10rem)]"
        >
          {webgl === false ? (
            <div className="absolute inset-0">
              <Image
                src="/images/hero-robot.png"
                alt="Agent AI robot visualization"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain object-center"
                priority
              />
            </div>
          ) : (
            <HeroScene />
          )}
          {HUD.map((h, i) => (
            <motion.div
              key={h.k}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.9 + i * 0.08 }}
              className={`absolute z-10 hidden sm:block ${h.pos}`}
            >
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/55 p-2.5 pr-3.5 backdrop-blur-xl">
                <span className="grid size-8 place-items-center rounded-xl border border-white/10 text-ember-2">
                  <h.icon size={15} weight="light" />
                </span>
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                    {h.k}
                  </span>
                  <span className="block text-[13px] font-medium">{h.v}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-6 sm:px-8">
        <div className="overflow-hidden rounded-full border border-white/10 bg-black/40">
          <div className="grid grid-cols-5">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`relative cursor-pointer py-4 text-center text-[13px] transition-colors duration-500 ${
                  i === step ? "text-cream" : "text-faint"
                }`}
              >
                <span className={`mr-2 font-mono text-[11px] ${i === step ? "text-ember" : ""}`}>
                  0{i + 1}
                </span>
                {s}
                <span className="step-bar" aria-hidden>
                  {i === step && <i key={step} />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
