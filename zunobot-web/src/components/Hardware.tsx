"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VIEWS = [
  {
    key: "front",
    src: "/images/robot-front.jpg",
    tab: "Front",
    title: "The face.",
    body: "A hexagonal LED display keeps expressions pixel-simple: readable from across the room, and impossible to mistake for human. No uncanny valley by design.",
  },
  {
    key: "side",
    src: "/images/robot-side.jpg",
    tab: "Side",
    title: "The stance.",
    body: "A compact wheeled base turns on the spot for tight hallways, while articulated arms are rated for trays and door handles, not handshakes.",
  },
  {
    key: "rear",
    src: "/images/robot-rear.jpg",
    tab: "Rear",
    title: "The spine.",
    body: "A blue service spine hides the battery bay, and the red emergency stop sits within arm's reach of the person beside it.",
  },
];

const CHIPS = [
  "Wheeled differential drive",
  "Zero-radius turn",
  "E-stop within reach",
  "Swappable battery",
];

export default function Hardware() {
  const reduced = useReducedMotion();
  const [view, setView] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (reduced || !auto) return;
    const t = setInterval(() => setView((v) => (v + 1) % VIEWS.length), 4500);
    return () => clearInterval(t);
  }, [reduced, auto]);

  const pick = (i: number) => {
    setAuto(false);
    setView(i);
  };

  const active = VIEWS[view];

  return (
    <section id="machine" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            The body, in three views.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-4 text-lg text-muted"
          >
            Concept renders of the full-scale unit: appliance-like, wheeled,
            and deliberately not humanoid.
          </motion.p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[56fr_44fr]">
          {/* render stage */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-[36px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(255,200,120,0.10),transparent_70%)]"
            />
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/[0.11] bg-[#12100a] shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active.key}
                  initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.55, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.src}
                    alt={`ZUNOBOT full-scale concept, ${active.tab} view`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-cover"
                    priority={view === 0}
                  />
                </motion.div>
              </AnimatePresence>
              {/* view badge */}
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#0b0805]/75 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur">
                {active.tab} view
              </span>
            </div>
          </motion.div>

          {/* view switcher */}
          <div>
            <div className="flex flex-col gap-3">
              {VIEWS.map((v, i) => {
                const on = i === view;
                return (
                  <button
                    key={v.key}
                    onClick={() => pick(i)}
                    className={`cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                      on
                        ? "border-ember/45 bg-gradient-to-b from-[#1d130a] to-[#140d07] shadow-[0_0_0_1px_rgba(255,122,28,0.15),0_14px_36px_rgba(255,116,22,0.1)]"
                        : "border-white/[0.08] bg-panel hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[11px] ${on ? "text-ember" : "text-faint"}`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                          on ? "text-ember-2" : "text-faint"
                        }`}
                      >
                        {v.tab}
                      </span>
                      <span className={`text-lg font-bold tracking-tight ${on ? "text-cream" : "text-muted"}`}>
                        {v.title}
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                          className="overflow-hidden text-[14.5px] leading-relaxed text-muted"
                        >
                          <span className="block pt-3">{v.body}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              className="mt-7 flex flex-wrap gap-2.5"
            >
              {CHIPS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/[0.09] bg-panel px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                >
                  {c}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
