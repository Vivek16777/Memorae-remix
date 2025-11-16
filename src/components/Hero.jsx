import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-7/12">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h1-clamp font-extrabold text-gray-900 leading-tight"
          >
            You are not designed to remember everything.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-gray-600 max-w-xl"
          >
            Let Memorae help you capture, organize and remember what matters —
            with gentle reminders and smart organization.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purpleA to-pinkA text-white shadow-lg transform transition hover:scale-105">
              Try for Free →
            </button>
            <button className="px-6 py-3 rounded-full border bg-white shadow-sm">
              Learn More
            </button>
          </motion.div>
        </div>

        <div className="md:w-5/12 flex justify-center relative">
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-56 h-56 rounded-full bg-gradient-to-br from-purple-300 to-sky-300 flex items-center justify-center text-white text-2xl shadow-2xl"
          >
            😊
          </motion.div>
        </div>
      </div>
    </section>
  );
}
