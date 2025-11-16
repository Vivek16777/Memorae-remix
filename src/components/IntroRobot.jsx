import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function IntroRobot() {
  const prefersReduced = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.18 },
    },
  };
  const line = {
    hidden: { y: 18, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const robotVariants = {
    hidden: { x: -220, opacity: 0, rotate: -6 },
    show: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 140, damping: 20 },
    },
  };

  const handWave = !prefersReduced
    ? {
        rotate: [0, 12, -6, 6, 0],
        transition: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
      }
    : {};

  return (
    <section aria-label="Intro" className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 py-10 md:py-14 lg:py-16 flex flex-col md:flex-row items-center gap-8">
        <motion.div
          className="md:w-4/12 flex justify-center md:justify-start items-start"
          initial="hidden"
          animate="show"
          variants={robotVariants}
        >
          <div className="relative">
            <svg
              width="180"
              height="180"
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Friendly robot"
              className="drop-shadow-lg"
            >
              <rect
                x="34"
                y="40"
                width="112"
                height="96"
                rx="18"
                fill="url(#bodyGrad)"
              />

              <rect
                x="52"
                y="10"
                width="76"
                height="48"
                rx="12"
                fill="url(#headGrad)"
              />

              <circle cx="78" cy="34" r="6" fill="#0b1220" />
              <circle cx="102" cy="34" r="6" fill="#0b1220" />

              <path
                d="M78 46c4 3 10 3 14 0"
                stroke="#0b1220"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <rect
                x="16"
                y="64"
                width="18"
                height="8"
                rx="4"
                fill="#F8FAFF"
                transform="rotate(-12 16 64)"
              />

              <g id="rightArm" transform="translate(130,88)">
                <rect
                  x="-2"
                  y="-6"
                  width="50"
                  height="10"
                  rx="5"
                  fill="#F8FAFF"
                />
                <circle cx="46" cy="-1" r="8" fill="#fff6ea" stroke="#e6e6ea" />
              </g>

              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#eef2ff" />
                  <stop offset="1" stopColor="#fef0ff" />
                </linearGradient>
                <linearGradient id="headGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="1" stopColor="#f2faff" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              className="absolute -right-1 top-24"
              style={{ originX: "10px", originY: "10px" }}
              animate={handWave}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 text-white flex items-center justify-center text-xs font-bold shadow">
                !
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          className="md:w-8/12"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 max-w-3xl">
            <motion.h2
              variants={line}
              className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight"
            >
              You normalized living with your head <span aria-hidden>🧠</span>{" "}
              about
              <br />
              to explode. And you don't even notice anymore.
            </motion.h2>

            <motion.p
              variants={line}
              className="mt-6 text-lg md:text-xl text-slate-700 leading-relaxed"
            >
              There's always something pending. Something you forget. Something
              you should be doing right now
              <span className="text-slate-900 font-semibold">
                {" "}
                ...but you don't know what.
              </span>
            </motion.p>

            <motion.p
              variants={line}
              className="mt-6 text-lg text-slate-700 leading-relaxed"
            >
              You jot down{" "}
              <span className="inline-block bg-yellow-100 px-2 py-0.5 rounded">
                🗒️
              </span>{" "}
              things so you won't forget them. But you end up forgetting why you
              wrote ✍️ them. And you start again. Over and over. As if
              <span className="ml-1 inline-block rounded-full px-2 py-0.5 border-2 border-pink-300 text-pink-600 font-medium">
                solution
              </span>
              .
            </motion.p>

            <motion.div
              variants={line}
              className="mt-4 h-1"
              style={{
                background: "linear-gradient(90deg,#7c3aed,#ff66b2)",
                borderRadius: 9999,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
