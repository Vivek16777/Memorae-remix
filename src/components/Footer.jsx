import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative h-screen w-full bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute top-32 left-20 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl"
        animate={{ y: [-30, 20, -30], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-32 right-24 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl"
        animate={{ y: [20, -20, 20], x: [-20, 0, -20] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-[45%] left-[45%] w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-16 right-1/4 flex flex-col items-center"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-7xl">🤖</div>

        <motion.div
          className="mt-2 w-16 h-3 bg-white/20 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <div className="relative z-10 text-center px-8">
        <motion.h2
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Memorae Remix
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-3xl mx-auto mt-6 text-xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          A smarter way to remember your thoughts, manage your reminders, and
          keep your life beautifully organized — without the stress.
        </motion.p>

        <motion.div
          className="w-40 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-10 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 160 }}
          transition={{ duration: 1.3 }}
        />

        <motion.div
          className="text-gray-500 mt-10 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          © {new Date().getFullYear()} Memorae Remix — All Rights Reserved.
        </motion.div>
      </div>
    </footer>
  );
}
