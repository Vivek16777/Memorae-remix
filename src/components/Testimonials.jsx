import React from "react";

const items = new Array(6).fill(0).map((_, i) => ({
  title: "Tool of the year",
  text: "Memorae has changed how I manage my day — I recommend it to everyone.",
}));

export default function Testimonials() {
  return (
    <section className="py-20 container mx-auto px-6">
      <h3 className="text-center text-2xl font-bold">
        60k+ people they have forgotten to forget
      </h3>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <div key={idx} className="p-6 bg-white rounded-xl shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100" />
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-xs text-gray-400">User</div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
