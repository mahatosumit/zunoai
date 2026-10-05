"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Eye,
  Database,
  ChatCircleText,
  Lock,
  Cpu,
  BatteryHigh,
  Pulse,
  Timer,
} from "@phosphor-icons/react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Scenario = { state: string; q: string; a: string };

const SCENARIOS: Scenario[] = [
  {
    state: "Processing",
    q: "Why did you stop?",
    a: "I stopped because my sensors detected an object on the floor. My camera identified it as a slipper, so I halted to avoid tripping.",
  },
  {
    state: "Listening",
    q: "Why are you going to the kitchen?",
    a: "You asked for water at 10:32. My vision module shows your bottle is empty, so I am fetching a refill from the kitchen.",
  },
  {
    state: "Explaining",
    q: "Who did you see today?",
    a: "At 14:05 I saw your daughter Anna in the living room and logged a 12 minute visit. Your morning exercise routine was completed successfully.",
  },
  {
    state: "Ready",
    q: "Why did you take the long way around?",
    a: "The hallway was blocked by a chair at 09:14. I replanned around it. The longer route was the only safe path to the bedroom.",
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Msg = { id: number; role: "user" | "bot"; text: string };

export default function ExplainConsole() {
  const reduced = useReducedMotion();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: "Explainability console online. Ask me why I do anything.",
    },
  ]);
  const [state, setState] = useState("Ready");
  const [typing, setTyping] = useState(false);
  const [cpu, setCpu] = useState(40);
  const [battery, setBattery] = useState(74);
  const [uptime, setUptime] = useState(4 * 3600 + 12 * 60 + 36);
  const chatRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  // typewriter loop
  useEffect(() => {
    if (reduced) {
      // static transcript for reduced motion
      setMsgs([
        { id: 0, role: "bot", text: "Explainability console online. Ask me why I do anything." },
        { id: 1, role: "user", text: SCENARIOS[0].q },
        { id: 2, role: "bot", text: SCENARIOS[0].a },
      ]);
      return;
    }
    let cancelled = false;
    (async () => {
      await sleep(1600);
      let s = 0;
      while (!cancelled) {
        const sc = SCENARIOS[s % SCENARIOS.length];
        setState("Listening");
        await sleep(900);
        if (cancelled) return;
        setMsgs((m) => [...m.slice(-3), { id: idRef.current++, role: "user", text: sc.q }]);
        setState(sc.state);
        await sleep(1100);
        if (cancelled) return;

        setTyping(true);
        const id = idRef.current++;
        setMsgs((m) => [...m.slice(-3), { id, role: "bot", text: "" }]);
        for (let i = 1; i <= sc.a.length; i++) {
          if (cancelled) return;
          setMsgs((m) =>
            m.map((msg) => (msg.id === id ? { ...msg, text: sc.a.slice(0, i) } : msg))
          );
          await sleep(9 + (Math.random() > 0.85 ? 22 : 0));
        }
        setTyping(false);
        setState("Ready");
        await sleep(2800);
        s++;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  // autoscroll
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  // diagnostics tickers
  useEffect(() => {
    const up = setInterval(() => setUptime((u) => u + 1), 1000);
    const cp = setInterval(
      () => setCpu(34 + Math.round(Math.random() * 16)),
      3400
    );
    const bat = setInterval(() => setBattery((b) => Math.max(58, b - 1)), 15000);
    return () => {
      clearInterval(up);
      clearInterval(cp);
      clearInterval(bat);
    };
  }, []);

  const fmt = (s: number) =>
    [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
      .map((n) => String(n).padStart(2, "0"))
      .join(":");

  return (
    <section id="console" className="relative border-y border-white/[0.06] bg-ink-2 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-10 h-[380px] w-[640px] bg-[radial-gradient(55%_55%_at_20%_20%,rgba(255,116,22,0.07),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            Ask why. Get answers.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-4 text-lg text-muted"
          >
            This is the interface that runs on the robot itself. Every action is
            logged, and every log can become language.
          </motion.p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease, delay: 0.12 }}
          className="relative mt-14 overflow-hidden rounded-3xl border border-white/[0.11] bg-[linear-gradient(180deg,#0f0c08,#0a0705)] shadow-[0_40px_90px_rgba(0,0,0,0.55)]"
        >
          <div aria-hidden className="scanline z-10" />
          {/* title bar */}
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            <span className="flex gap-1.5">
              <i className="size-2 rounded-full bg-ember shadow-[0_0_8px_rgba(255,122,28,0.8)]" />
              <i className="size-2 rounded-full bg-[#2c241c]" />
              <i className="size-2 rounded-full bg-[#2c241c]" />
            </span>
            ZUNOBOT HMI, explainability console
            <span className="ml-auto hidden items-center gap-2 text-[#9fd8a8] sm:flex">
              <i className="size-1.5 animate-[blink_1.6s_infinite] rounded-full bg-[#52c268] shadow-[0_0_8px_rgba(82,194,104,0.8)]" />
              Running on-device
            </span>
          </div>

          {/* diagnostics */}
          <div className="grid grid-cols-2 border-b border-white/[0.07] md:grid-cols-4">
            <div className="border-b border-white/[0.07] p-4.5 px-5 py-4 md:border-b-0 md:border-r">
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                <Cpu size={11} weight="duotone" /> CPU load
              </p>
              <p className="mt-1.5 text-lg font-bold">
                {cpu}
                <span className="text-xs font-medium text-faint">%</span>
              </p>
              <div className="console-meter mt-2">
                <i style={{ width: `${cpu}%` }} />
              </div>
            </div>
            <div className="border-white/[0.07] p-4.5 px-5 py-4 md:border-r">
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                <BatteryHigh size={11} weight="duotone" /> Battery
              </p>
              <p className="mt-1.5 text-lg font-bold">
                {battery}
                <span className="text-xs font-medium text-faint">%</span>
              </p>
              <div className="console-meter mt-2">
                <i style={{ width: `${battery}%` }} />
              </div>
            </div>
            <div className="border-t border-white/[0.07] p-4.5 px-5 py-4 md:border-t-0 md:border-r">
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                <Pulse size={11} weight="duotone" /> State
              </p>
              <p className="mt-1.5 text-lg font-bold">{state}</p>
            </div>
            <div className="p-4.5 px-5 py-4">
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                <Timer size={11} weight="duotone" /> Uptime
              </p>
              <p className="mt-1.5 font-mono text-lg font-bold tabular-nums">{fmt(uptime)}</p>
            </div>
          </div>

          {/* main: state ring + chat */}
          <div className="grid lg:grid-cols-[36fr_64fr]">
            <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden border-b border-white/[0.07] p-9 lg:border-b-0 lg:border-r">
              <div className="relative grid size-36 place-items-center">
                <span aria-hidden className="absolute inset-0 rounded-full border border-ember/30" />
                <span
                  aria-hidden
                  className="absolute -inset-3.5 rounded-full border border-ember/15"
                  style={{
                    transform: state === "Ready" ? "scale(1)" : "scale(1.06)",
                    transition: "transform 1s ease",
                  }}
                />
                <span className="grid size-20 place-items-center rounded-full border border-ember/40 bg-[radial-gradient(circle_at_38%_32%,#33200e,#150c05_70%)] text-ember-2 shadow-[0_0_34px_rgba(255,116,22,0.3)]">
                  <Eye size={30} weight="duotone" />
                </span>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.42em] text-ember-2 [text-shadow:0_0_18px_rgba(255,122,28,0.45)]">
                {state}
              </p>
            </div>

            <div
              ref={chatRef}
              className="flex h-[400px] flex-col justify-end gap-4 overflow-y-auto p-6 sm:p-7"
              aria-live="polite"
            >
              {msgs.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex max-w-[85%] flex-row-reverse gap-3 self-end">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/15 bg-[#14100b] font-mono text-[9px] text-muted">
                      YOU
                    </span>
                    <p className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[14.5px] text-muted">
                      {m.text}
                    </p>
                  </div>
                ) : (
                  <div key={m.id} className="flex max-w-[88%] gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-ember/40 bg-gradient-to-b from-[#2b1a0b] to-[#170e06] text-ember-2 shadow-[0_0_14px_rgba(255,116,22,0.2)]">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <rect x="5" y="6" width="14" height="12" rx="4" />
                        <circle cx="9.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
                        <circle cx="14.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
                      </svg>
                    </span>
                    <p className="rounded-2xl border border-ember/25 bg-gradient-to-b from-[#2b1a0b]/50 to-[#170e06]/50 px-4 py-3 text-[14.5px] leading-relaxed text-cream">
                      {m.text}
                      {typing && m.id === msgs[msgs.length - 1]?.id && (
                        <span className="chat-cursor" />
                      )}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* pills */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {[
            { icon: Eye, label: "VLM scene descriptions" },
            { icon: Database, label: "Vector-log retrieval" },
            { icon: ChatCircleText, label: "Plain-language answers" },
            { icon: Lock, label: "100% local and private" },
          ].map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-panel px-4.5 py-2.5 text-sm text-muted transition-colors hover:border-ember/40 hover:text-cream"
            >
              <p.icon size={14} weight="duotone" className="text-ember" />
              {p.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
