import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function ChatScrollWithRobot() {
  const containerRef = useRef(null);
  const messagesRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  const messages = [
    {
      id: 1,
      type: "incoming",
      text: "I've grouped everything under Q4 Campaigns. It's now next to your Black Friday notes 😉",
      time: "11:20 AM",
    },
    {
      id: 2,
      type: "outgoing",
      text: "What was the link to the meeting with the design team?",
      time: "11:20 AM",
    },
    {
      id: 3,
      type: "incoming",
      text: "Here it is: meet.google.com/design. Remember, the meeting is next Monday at 10:30.",
      time: "11:20 AM",
    },
    {
      id: 4,
      type: "incoming",
      text: "Would you like me to send George a reminder 30 minutes before the meeting so he can send you the graphics?",
      time: "11:21 AM",
    },
    {
      id: 5,
      type: "outgoing",
      text: "Yes please, that would be great — thank you!",
      time: "11:22 AM",
    },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;

    setPlaying(true);

    const el = messagesRef.current;
    if (!el) return;

    const steps = [
      { delay: 600, to: 0 },
      { delay: 1400, to: el.scrollHeight * 0.25 },
      { delay: 2400, to: el.scrollHeight * 0.55 },
      { delay: 3200, to: el.scrollHeight * 0.95 },
    ];

    const timers = steps.map((s) =>
      setTimeout(() => {
        el.scrollTo({ top: s.to, behavior: "smooth" });
      }, s.delay)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [inView, prefersReducedMotion]);

  const robotVariants = {
    idle: { x: 0, rotate: 0 },
    active: {
      x: [0, 6, -6, 0],
      rotate: [0, -4, 4, 0],
      transition: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
    },
    enter: {
      x: -6,
      opacity: 1,
      transition: { type: "spring", stiffness: 220, damping: 20 },
    },
  };

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 220 / 1000, delayChildren: 0.2 } },
  };
  const messageVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.99 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.48, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-white py-16 md:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col gap-6">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Capture instantly
            </h3>
            <p className="text-lg text-slate-600 max-w-xl">
              Send a message, a voice note, or a screenshot. Memorae remembers
              it for you — and brings it back at the right time.
            </p>

            <div className="mt-6 flex items-center gap-5">
              <motion.div
                aria-hidden
                initial="idle"
                animate={inView && !prefersReducedMotion ? "active" : "idle"}
                variants={robotVariants}
                className="w-28 h-28 flex items-center justify-center"
                style={{ originX: "50%", originY: "50%" }}
                title="Helper robot"
              >
                <svg
                  viewBox="0 0 120 120"
                  width="112"
                  height="112"
                  className="drop-shadow-lg"
                >
                  <defs>
                    <linearGradient id="rGrad" x1="0" x2="1">
                      <stop offset="0" stopColor="#7c3aed" />
                      <stop offset="1" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>

                  <rect
                    x="20"
                    y="36"
                    width="80"
                    height="56"
                    rx="12"
                    fill="#f8fafc"
                    stroke="#e6eef8"
                  />

                  <rect
                    x="34"
                    y="10"
                    rx="10"
                    width="52"
                    height="32"
                    fill="#fff"
                    stroke="#e6eef8"
                  />

                  <circle cx="52" cy="26" r="4.5" fill="#0b1220" />
                  <circle cx="68" cy="26" r="4.5" fill="#0b1220" />

                  <path
                    d="M52 34c2 1.8 6 1.8 8 0"
                    stroke="#0b1220"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <rect
                    x="6"
                    y="58"
                    width="22"
                    height="8"
                    rx="3"
                    fill="#f1f5f9"
                  />

                  <g transform="translate(82,66)">
                    <motion.circle
                      cx="8"
                      cy="0"
                      r="8"
                      fill="url(#rGrad)"
                      initial={{ y: 0 }}
                      animate={
                        inView && !prefersReducedMotion
                          ? { y: [-2, 6, -2] }
                          : { y: 0 }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 1.6,
                        ease: "easeInOut",
                      }}
                    />
                    <circle cx="8" cy="0" r="3" fill="#fff" />
                  </g>
                </svg>
              </motion.div>

              <div>
                <div className="text-sm font-medium text-slate-800">
                  Your assistant
                </div>
                <div className="text-sm text-slate-500">
                  Robot helps scroll and highlight info
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-60 blur-3xl pointer-events-none" />

              <div className="w-[320px] md:w-[340px] lg:w-[360px] rounded-[30px] bg-[#f7fbff] border border-gray-100 shadow-2xl overflow-hidden">
                <div className="h-12 flex items-center justify-center">
                  <div className="w-[120px] h-6 rounded-full bg-[#e9f1f6]" />
                </div>

                <div
                  ref={messagesRef}
                  className="h-[460px] md:h-[520px] overflow-hidden overscroll-contain"
                  aria-live="polite"
                  aria-label="Chat preview"
                >
                  <div className="px-4 pb-6 pt-2 min-h-full">
                    <motion.div
                      initial="hidden"
                      animate={
                        inView && !prefersReducedMotion ? "show" : "hidden"
                      }
                      variants={listVariants}
                      className="flex flex-col gap-4"
                    >
                      {messages.map((m, idx) => (
                        <AnimatePresence key={m.id}>
                          <motion.div
                            variants={messageVariants}
                            className={`max-w-[86%] ${m.type === "incoming" ? "self-start bg-white text-slate-800 rounded-xl px-4 py-3 shadow-sm border" : "self-end bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl px-4 py-3 shadow-lg"} `}
                          >
                            <div className="text-sm leading-relaxed">
                              {m.text}
                            </div>
                            <div
                              className={`mt-2 text-[11px] ${m.type === "incoming" ? "text-slate-400" : "text-white/90"} text-right`}
                            >
                              {m.time}
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      ))}

                      <div className="mt-6 h-24" />
                    </motion.div>
                  </div>
                </div>

                <div className="h-20 bg-[#f1f5f9] flex items-center px-4">
                  <div className="w-full h-10 rounded-full bg-white border border-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </section>
  );
}
