"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Play, Pause } from "@phosphor-icons/react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Showreel() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // gentle parallax: the frame drifts up slightly as you scroll through
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 26, reduced ? 0 : -26]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="reel" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
          >
            ZUNOBOT, on film.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-4 text-lg text-muted"
          >
            Our product vision: mornings at home, wards at the hospital, quiet
            check-ins at night. Rendered end to end from the actual hardware
            design.
          </motion.p>
        </div>

        <motion.div ref={wrapRef} style={{ y }} className="relative mt-14">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.11] bg-[#0b0805] shadow-[0_50px_120px_rgba(0,0,0,0.6)]"
          >
            {/* ambient glow behind the frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -bottom-16 h-40 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(255,116,22,0.18),transparent_75%)]"
            />
            <button
              onClick={toggle}
              aria-label={playing ? "Pause the film" : "Play the film"}
              className="relative block aspect-video w-full cursor-pointer"
            >
              <video
                ref={videoRef}
                src="/videos/product-film.mp4"
                poster="/videos/product-film-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* play/pause affordance, prominent when paused */}
              <span
                className={`absolute inset-0 grid place-items-center bg-[#070503]/45 transition-opacity duration-300 ${
                  playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <span className="grid size-18 place-items-center rounded-full border border-white/20 bg-[#140f09]/85 text-cream shadow-[0_0_40px_rgba(255,116,22,0.35)] backdrop-blur">
                  {playing ? (
                    <Pause size={26} weight="fill" />
                  ) : (
                    <Play size={26} weight="fill" className="translate-x-0.5" />
                  )}
                </span>
              </span>
            </button>

            {/* chrome strip */}
            <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] px-5 py-3.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                Product vision film, 10s, loops
              </p>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-faint sm:block">
                {playing ? "Playing" : "Paused"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
