"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X, ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { NAV } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center pt-3">
        <div className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 text-[12px] text-muted backdrop-blur-xl">
          Introducing Agent OS — Intelligence, with initiative
          <ArrowUpRight size={12} />
        </div>
      </div>

      <header className="fixed inset-x-0 top-12 z-50">
        <div className="mx-auto flex h-[4.25rem] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative grid size-8 place-items-center">
              <span className="absolute left-1 top-1 size-4 rounded-full bg-[#e8dcc8]" />
              <span className="absolute right-1 bottom-1 size-4 rounded-full bg-ember" />
            </span>
            <span className="text-[17px] font-semibold tracking-tight">Agent AI</span>
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
            {NAV.map((l) =>
              l.menu ? (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => setProducts(true)}
                  onMouseLeave={() => setProducts(false)}
                >
                  <button
                    className="flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 text-[13px] text-muted transition-colors duration-500 hover:text-cream"
                    aria-haspopup="menu"
                    aria-expanded={products}
                    onFocus={() => setProducts(true)}
                  >
                    {l.label}
                    <CaretDown size={11} />
                  </button>
                  <AnimatePresence>
                    {products && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute left-1/2 top-full z-20 w-48 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0c0c0c] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                      >
                        {[
                          ["All products", "#products"],
                          ["Personal Agent", "#agents"],
                          ["Code Agent", "#agents"],
                          ["Design Agent", "#agents"],
                          ["Explore pricing", "#pricing"],
                        ].map(([label, href]) => (
                          <a
                            key={label}
                            href={href}
                            className="block rounded-xl px-3 py-2 text-[13px] text-muted hover:bg-white/5 hover:text-cream"
                          >
                            {label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[13px] text-muted transition-colors duration-500 hover:text-cream"
                >
                  {l.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#meet" className="btn-metal !py-2 !text-[0.62rem]">
              Meet your agent
              <span className="knob">
                <ArrowUpRight size={11} weight="bold" />
              </span>
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/12 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-1 bg-black/90 backdrop-blur-3xl transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-5 top-6 grid size-11 cursor-pointer place-items-center rounded-full border border-white/12"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        {NAV.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="px-4 py-2.5 text-3xl font-semibold"
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
