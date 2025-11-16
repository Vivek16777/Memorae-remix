import React, { useState } from "react";

const faqs = [
  {
    q: "What is Memorae and how can it help me?",
    a: "Memorae helps you capture and remember things so you don't have to keep them in your head.",
  },
  {
    q: "Can I sync calendars?",
    a: "Yes, the app can integrate with your calendar for reminders.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="py-20 container mx-auto px-6">
      <h3 className="text-2xl font-bold text-center">
        Frequently Asked Questions
      </h3>
      <div className="mt-8 max-w-2xl mx-auto space-y-4">
        {faqs.map((f, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
              className="w-full text-left px-6 py-4 flex justify-between items-center"
            >
              <span>{f.q}</span>
              <span className="text-gray-400">{open === idx ? "-" : "+"}</span>
            </button>
            {open === idx && (
              <div className="px-6 pb-6 text-gray-600">{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
