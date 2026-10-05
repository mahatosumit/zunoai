"use client";

import { ArrowUpRight } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer id="products" className="relative border-t border-white/8 pb-10 pt-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/8 bg-[#0c0c0c] p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <p className="eyebrow">Field notes / Autonomous intelligence</p>
            <h2 className="mt-4 max-w-[16ch] text-4xl font-semibold tracking-[-0.04em]">
              Meet the agent that works with you.
            </h2>
          </div>
          <a href="#meet" className="btn-metal">
            Meet your agent
            <span className="knob">
              <ArrowUpRight size={12} weight="bold" />
            </span>
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative grid size-7 place-items-center">
              <span className="absolute left-0.5 top-0.5 size-3.5 rounded-full bg-[#e8dcc8]" />
              <span className="absolute right-0.5 bottom-0.5 size-3.5 rounded-full bg-ember" />
            </span>
            <span className="font-semibold">Agent AI</span>
          </a>
          <p className="text-[12px] text-faint">© 2026 Agent AI. Intelligence, with initiative.</p>
        </div>
      </div>
    </footer>
  );
}
