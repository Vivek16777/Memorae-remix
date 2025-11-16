import React from "react";
import { motion } from "framer-motion";

export default function DeviceShowcase() {
  return (
    <section
      id="device"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold">
            Your head can't take it any more. Luckily, now you have help.
          </h3>
          <p className="mt-4 text-gray-600">
            Memorae helps you capture scattered thoughts and turns them into
            actionable memories that free your mind.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center relative">
          <motion.div
            initial={{ scale: 0.95, opacity: 0.9 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-72 rounded-3xl shadow-2xl p-6 flex items-center justify-center"
          >
            <div className="w-56 h-96 bg-gradient-to-b from-blue-100 to-white rounded-2xl flex items-center justify-center text-center">
              Phone Mockup
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
