"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  UsersThree,
  EyeSlash,
  Cpu,
  Path,
  Quotes,
  HandHeart,
  type IconProps,
} from "@phosphor-icons/react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* pointer-tracking 3D tilt with a soft glare, spring-smoothed */
function Tilt({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4.5, -4.5]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5.5, 5.5]), {
    stiffness: 140,
    damping: 18,
  });
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const gx = useTransform(mx, (v) => v * 100);
  const gy = useTransform(my, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(460px circle at ${gx}% ${gy}%, rgba(255,170,90,0.09), transparent 62%)`;

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      style={{ transform }}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="relative [transform-style:preserve-3d]"
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: glare }}
      />
    </motion.div>
  );
}

type Chapter = {
  no: string;
  icon: React.ComponentType<IconProps>;
  title: string;
  headline: string;
  body: string;
  visual: React.ReactNode;
};

function VisualStat({ big, label }: { big: string; label: string }) {
  return (
    <div className="relative flex h-full min-h-[260px] flex-col items-start justify-end overflow-hidden rounded-xl border border-white/[0.07] bg-[radial-gradient(140%_120%_at_85%_0%,rgba(255,116,22,0.14),transparent_55%),linear-gradient(180deg,#151009,#0d0a06)] p-7">
      <span className="font-display text-7xl font-bold tracking-tighter text-ember">
        {big}
      </span>
      <span className="mt-2 max-w-[24ch] text-sm text-muted">{label}</span>
    </div>
  );
}

function VisualSteps() {
  const steps = ["Log", "Embed", "Retrieve", "Answer"];
  return (
    <div className="flex h-full min-h-[260px] flex-col justify-center gap-3 rounded-xl border border-white/[0.07] bg-[linear-gradient(180deg,#151009,#0d0a06)] p-7">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-ember">0{i + 1}</span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-cream/90">
            {s}
          </span>
          <span className="h-px flex-1 bg-white/[0.07]" />
          {i < steps.length - 1 && (
            <span aria-hidden className="font-mono text-[10px] text-faint">
              ↓
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function VisualQuote() {
  return (
    <figure className="flex h-full min-h-[260px] flex-col justify-center rounded-xl border border-white/[0.07] bg-[linear-gradient(180deg,#151009,#0d0a06)] p-7">
      <Quotes size={22} weight="fill" className="text-ember" />
      <blockquote className="mt-4 text-[15px] leading-relaxed text-cream/90">
        &ldquo;Dad finished his morning exercise routine and found his keys on
        the first try today.&rdquo;
      </blockquote>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
        The only update a family needs
      </figcaption>
    </figure>
  );
}

const CHAPTERS: Chapter[] = [
  {
    no: "01",
    icon: UsersThree,
    title: "The care gap",
    headline: "Living longer, cared for by fewer.",
    body: "Populations are aging while care workforces shrink. Families need help that keeps dignity and independence at the center, and paid care alone cannot scale to meet them.",
    visual: <VisualStat big="30" label="peer-reviewed studies synthesized to define what a care robot must be" />,
  },
  {
    no: "02",
    icon: EyeSlash,
    title: "The black box",
    headline: "Powerful robots, silent decisions.",
    body: "Today's platforms perform well yet cost more than a car, run proprietary software, and rarely explain their choices. Trust stalls exactly where transparency is missing.",
    visual: (
      <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl border border-white/[0.07]">
        <Image
          src="/images/hero-side.png"
          alt="ZUNOBOT seen from behind, mid-turn"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0805] via-transparent to-transparent" />
      </div>
    ),
  },
  {
    no: "03",
    icon: Cpu,
    title: "Open by design",
    headline: "Affordable by architecture.",
    body: "A Raspberry Pi 5 handles cognition, STM32 microcontrollers drive real-time motion, and a CAN bus keeps every module talking. Everything is off-the-shelf, inspectable, and built to be repaired.",
    visual: (
      <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl border border-white/[0.07]">
        <Image
          src="/images/story-2.png"
          alt="Precision glass component from the ZUNOBOT design study"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0805] via-transparent to-transparent" />
      </div>
    ),
  },
  {
    no: "04",
    icon: Path,
    title: "The explainability engine",
    headline: "Every action leaves a paper trail.",
    body: "Vision-language models describe what the camera sees, embeddings index the robot's history, and a local language model turns it into answers a grandparent can actually trust.",
    visual: <VisualSteps />,
  },
  {
    no: "05",
    icon: HandHeart,
    title: "Complement, not replace",
    headline: "A tool for the care network.",
    body: "ZUNOBOT takes routine monitoring and reminders so caregivers spend their time on empathy. Families receive plain-language summaries, never camera feeds.",
    visual: <VisualQuote />,
  },
];

export default function Chapters() {
  const reduced = useReducedMotion();

  return (
    <section id="chapters" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            Five chapters, one thesis.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-4 text-lg text-muted"
          >
            Why a small team is building an explainable care robot, and what it
            takes to make people actually trust one.
          </motion.p>
        </div>

        <div className="mt-14">
          {CHAPTERS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.no}
                className="sticky mb-8"
                style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}
              >
                <Tilt>
                  <motion.article
                    initial={reduced ? false : { opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.75, ease }}
                    className="card grid gap-7 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-10 md:grid-cols-[1.15fr_1fr] md:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-ember">{c.no}</span>
                        {Icon && (
                          <Icon size={17} weight="duotone" className="text-muted" />
                        )}
                        <span className="text-sm font-semibold text-muted">{c.title}</span>
                      </div>
                      <h3 className="mt-5 text-3xl font-bold tracking-tighter sm:text-4xl">
                        {c.headline}
                      </h3>
                      <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
                        {c.body}
                      </p>
                    </div>
                    {c.visual}
                  </motion.article>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
