import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeviceShowcase({
  phoneImg = "",
  leftItems = [
    "No more mental lists",
    "No more post-its on the mirror",
    "No more missed deadlines",
  ],
  rightItems = [
    "No more missed appointments",
    "No more dead plants",
    "No more reminders on napkins",
  ],
}) {
  const [active, setActive] = useState(false);

  const containerVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 220, damping: 18 },
    },
  };

  const bubbleParent = {
    rest: {},
    hover: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  const bubbleLeft = {
    rest: { opacity: 0, x: 20, scale: 0.98 },
    hover: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
  };

  const bubbleRight = {
    rest: { opacity: 0, x: -20, scale: 0.98 },
    hover: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-pink-50">
      <div
        className="container mx-auto px-6 flex items-center justify-center"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-6xl"
          initial="rest"
          animate={active ? "hover" : "rest"}
          variants={containerVariants}
          tabIndex={0}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        >
          <div className="hidden md:flex md:flex-col md:items-end md:gap-6 md:mr-8">
            <motion.div className="flex flex-col gap-4" variants={bubbleParent}>
              {leftItems.map((text, i) => (
                <AnimatePresence key={`left-${i}`}>
                  <motion.div
                    variants={bubbleLeft}
                    initial="rest"
                    animate={active ? "hover" : "rest"}
                    exit="rest"
                    className="bg-white rounded-full px-4 py-3 shadow-md max-w-xs text-sm text-slate-800"
                  >
                    {text}
                  </motion.div>
                </AnimatePresence>
              ))}
            </motion.div>
          </div>

          <div className="relative z-10">
            <motion.div
              className="relative bg-black rounded-[40px] shadow-2xl overflow-hidden border-[3px] border-[#1b1b1b]"
              style={{ width: 320, height: 700 }}
            >
              {phoneImg ? (
                <img
                  src={phoneImg}
                  alt="phone dark"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#0e0e0f] flex flex-col items-center justify-center relative">
                  <div className="absolute top-0 w-full h-10 bg-[#141414]" />

                  <div className="flex flex-col items-center mt-16 px-4 text-center">
                    <p className="text-white text-lg font-medium opacity-90 mb-6">
                      You're not making a mess of yourself — you're trying to do
                      it all yourself.
                    </p>

                    <motion.div
                      initial={{ y: -8 }}
                      animate={{ y: [-8, 8, -8] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                      className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-400 to-sky-300 shadow-xl flex items-center justify-center text-white text-4xl"
                    >
                      😊
                    </motion.div>

                    <div className="w-full h-20 mt-6 bg-gradient-to-t from-slate-900 to-transparent rounded-t-xl" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="hidden md:flex md:flex-col md:items-start md:gap-6 md:ml-8">
            <motion.div className="flex flex-col gap-4" variants={bubbleParent}>
              {rightItems.map((text, i) => (
                <AnimatePresence key={`right-${i}`}>
                  <motion.div
                    variants={bubbleRight}
                    initial="rest"
                    animate={active ? "hover" : "rest"}
                    exit="rest"
                    className="bg-white rounded-full px-4 py-3 shadow-md max-w-xs text-sm text-slate-800"
                  >
                    {text}
                  </motion.div>
                </AnimatePresence>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="md:hidden mt-8 flex flex-col items-center gap-3 px-4">
        {leftItems.concat(rightItems).map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-full px-4 py-2 shadow-sm text-sm text-slate-800 w-full max-w-md text-center"
          >
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
