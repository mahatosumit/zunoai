"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* number that counts up when it scrolls into view; rendered through a
   motion value so React never re-renders per frame */
function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <span ref={ref}>
      <motion.span>{text}</motion.span>
    </span>
  );
}

const ROWS = [
  ["Pepper", "Social interaction", "Very high, over $20k", "Limited", "Limited or none", "High cost, little physical assistance"],
  ["Care-O-bot", "Physical assistance", "Very high, over $50k", "Low", "Limited or none", "High cost, proprietary system"],
  ["Paro", "Emotional support", "High, around $5k", "None", "Not applicable", "Single-purpose, passive"],
] as const;

const STATS = [
  { label: "Target cost", prefix: "<$", to: 2, suffix: "k", body: "Off-the-shelf parts keep the bill of materials in reach of families and small care centers." },
  { label: "Task accuracy", prefix: "", to: 96, suffix: "%", body: "Navigation and manipulation reliability, benchmarked against Care-O-bot standards." },
  { label: "Voice latency", prefix: "", to: 365, suffix: "ms", body: "Response target with over 92% recognition accuracy, even in noisy rooms. Floor: 320 ms." },
];

export default function Compare() {
  const reduced = useReducedMotion();

  return (
    <section id="compare" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            The honest table.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-4 text-lg text-muted"
          >
            Feature for feature against today&rsquo;s leading assistive robots,
            including the parts we have not finished yet.
          </motion.p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="card mt-14 overflow-x-auto"
        >
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint">
                <th className="px-6 py-4 font-medium">Robot</th>
                <th className="px-6 py-4 font-medium">Primary function</th>
                <th className="px-6 py-4 font-medium">Cost</th>
                <th className="px-6 py-4 font-medium">Modularity</th>
                <th className="px-6 py-4 font-medium">Explainability</th>
                <th className="px-6 py-4 font-medium">Key limitation</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              {ROWS.map((r) => (
                <tr key={r[0]} className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-bold text-cream">{r[0]}</td>
                  <td className="px-6 py-4">{r[1]}</td>
                  <td className="px-6 py-4">{r[2]}</td>
                  <td className="px-6 py-4">{r[3]}</td>
                  <td className="px-6 py-4">{r[4]}</td>
                  <td className="px-6 py-4">{r[5]}</td>
                </tr>
              ))}
              <tr className="compare-row-zuno compare-row-shimmer">
                <td className="px-6 py-5 font-bold text-ember-2">
                  ZUNOBOT
                  <span className="ml-2.5 whitespace-nowrap rounded-full bg-ember px-2.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#1b0d02] shadow-[0_0_14px_rgba(255,116,22,0.45)]">
                    Prototype
                  </span>
                </td>
                <td className="px-6 py-5 font-semibold text-cream">Holistic personal care</td>
                <td className="px-6 py-5 font-semibold text-cream">Low, under $2k target</td>
                <td className="px-6 py-5 font-semibold text-cream">High, modular hardware and software</td>
                <td className="px-6 py-5 font-semibold text-cream">High, integrated XAI engine</td>
                <td className="px-6 py-5">Prototype stage, validation ongoing</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease, delay: 0.08 * i }}
              className="card relative overflow-hidden p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(circle,rgba(255,116,22,0.13),transparent_70%)]"
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                {s.label}
              </p>
              <p className="mt-3 text-4xl font-bold tracking-tighter text-ember">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
