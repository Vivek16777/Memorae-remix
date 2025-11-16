import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.12 },
  },
};
const rise = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const LeftBlob = useMemo(
    () => (
      <svg
        viewBox="0 0 300 300"
        className="absolute left-0 top-8 -z-10 w-64 opacity-36"
        aria-hidden
      >
        <defs>
          <linearGradient id="gL" x1="0" x2="1">
            <stop offset="0" stopColor="#ede9fe" />
            <stop offset="1" stopColor="#cffafe" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gL)"
          d="M75,10 C120,-10 210,0 260,60 C310,120 300,210 230,245 C160,280 65,260 30,200 C-5,140 25,30 75,10Z"
        />
      </svg>
    ),
    []
  );

  const RightBlob = useMemo(
    () => (
      <svg
        viewBox="0 0 300 300"
        className="absolute right-6 top-20 -z-10 w-52 opacity-30"
        aria-hidden
      >
        <defs>
          <linearGradient id="gR" x1="0" x2="1">
            <stop offset="0" stopColor="#cffafe" />
            <stop offset="1" stopColor="#ffd7f0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gR)"
          d="M60,20 C110,-10 210,0 260,60 C300,110 260,190 190,220 C120,250 40,235 20,170 C0,105 10,50 60,20Z"
        />
      </svg>
    ),
    []
  );

  const handlePointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x: px * 10, y: py * 6 });
  };
  const resetPointer = () => setPointer({ x: 0, y: 0 });

  const ribbonAnim = prefersReduced
    ? {}
    : {
        animate: { x: ["-30%", "30%", "-30%"] },
        transition: { duration: 12, repeat: Infinity, ease: "linear" },
      };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white"
    >
      {LeftBlob}
      {RightBlob}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-8 left-0 right-0 flex justify-center -z-20"
        {...ribbonAnim}
      >
        <div className="w-[120%] max-w-7xl px-4">
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(123,64,255,0.12) 0%, rgba(255,102,178,0.08) 40%, rgba(123,64,255,0.12) 100%)",
              transform: "skewX(-12deg)",
            }}
            className="h-8 rounded-full blur-sm shadow-xl"
          />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 pt-10 md:pt-14 lg:pt-16 pb-24 md:pb-32 lg:pb-40">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-7">
            <motion.h1
              id="hero-title"
              variants={rise}
              className="h1-clamp font-extrabold text-slate-900 leading-tight max-w-3xl"
            >
              You are not designed to remember everything.
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-5 text-lg text-slate-600 max-w-2xl"
            >
              Let Memorae help you capture, organize and remember what matters —
              with gentle reminders, automatic organization, and a calm UI that
              frees your headspace.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#signup"
                role="button"
                aria-label="Try Memorae for free"
                whileHover={!prefersReduced ? { scale: 1.03 } : {}}
                whileTap={!prefersReduced ? { scale: 0.98 } : {}}
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium shadow-xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-purple-200"
                style={{ background: "linear-gradient(90deg,#6b46ff,#ff66b2)" }}
              >
                <span className="relative z-10">Try for Free →</span>
                {!prefersReduced && (
                  <motion.span
                    aria-hidden
                    initial={{ x: "-120%" }}
                    whileHover={{ x: "10%" }}
                    transition={{ type: "tween", duration: 0.7 }}
                    className="absolute left-0 top-0 h-full w-2/3 bg-white opacity-10 blur-sm pointer-events-none"
                  />
                )}
              </motion.a>

              <motion.a
                href="#features"
                className="inline-flex items-center px-5 py-3 rounded-full bg-white border border-gray-200 text-sm font-medium shadow-sm text-slate-700"
                whileHover={!prefersReduced ? { y: -3 } : {}}
                transition={{ duration: 0.2 }}
              >
                Learn More
              </motion.a>

              <div className="w-full sm:w-auto text-sm text-slate-500 mt-2 sm:mt-0">
                <span className="font-medium text-slate-700">
                  Free — no credit card.
                </span>{" "}
                Cancel anytime.
              </div>
            </motion.div>

            <motion.div
              variants={rise}
              className="mt-6 flex items-center gap-4 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="ml-1 text-slate-800 font-medium">4.8</span>
              </div>
              <div className="text-slate-500">•</div>
              <div>60k+ users worldwide</div>
            </motion.div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <motion.div
              onMouseMove={handlePointer}
              onMouseLeave={resetPointer}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ perspective: 900 }}
              className="relative w-[320px] sm:w-[360px] lg:w-[420px] h-[420px] rounded-3xl shadow-2xl bg-gradient-to-b from-white to-slate-50 overflow-hidden border border-white/30"
              aria-hidden="true"
            >
              <motion.div
                style={{
                  transform: `rotateX(${pointer.y}deg) rotateY(${pointer.x}deg) translateZ(0)`,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="absolute inset-5 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-white/40 p-5 flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-3 rounded-md bg-white/75" />
                  <div className="text-xs text-slate-400">Now</div>
                </div>

                <div className="mt-5 flex-1 flex items-center justify-center">
                  <motion.div
                    aria-hidden
                    animate={!prefersReduced ? { y: [-8, 8, -8] } : {}}
                    transition={
                      !prefersReduced
                        ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        : {}
                    }
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-300 to-sky-300 flex items-center justify-center text-white text-3xl shadow-2xl"
                  >
                    😊
                  </motion.div>
                </div>

                <div className="mt-5 text-center text-xs text-slate-400">
                  Mockup — capture ideas fast
                </div>
              </motion.div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-white/10 opacity-30" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
