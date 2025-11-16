import React, { useState } from "react";

const faqs = [
  {
    q: "What is Memorae and how can it help me?",
    a: "Memorae helps you capture and remember things so you don’t have to keep everything in your head. It organizes tasks, reminders, and notes automatically.",
  },
  {
    q: "Can I sync calendars?",
    a: "Yes. Memorae integrates with Google, Outlook, and iCloud calendars to keep your schedule unified in one place.",
  },
  {
    q: "Does Memorae work on mobile phones?",
    a: "Absolutely. Memorae works on iOS, Android, and desktop — your data stays synced everywhere instantly.",
  },
  {
    q: "Can I use voice notes?",
    a: "Yes. You can speak naturally and Memorae converts voice notes into organized tasks using AI.",
  },
  {
    q: "Does Memorae send reminders automatically?",
    a: "Yes. You can create one-time or repeating reminders. Memorae also sends smart reminders based on your habits.",
  },
  {
    q: "Is my data private and secure?",
    a: "Your data is encrypted, never sold, and only used to provide features you enable. You control your information at all times.",
  },
  {
    q: "Can I collaborate with friends or coworkers?",
    a: "Yes. You can share reminders, lists, and events with others — perfect for teams, households, and group projects.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. You can capture notes and reminders offline, and they will sync automatically when you're back online.",
  },
  {
    q: "What if I forget something I told Memorae earlier?",
    a: "Just search using natural language. Memorae understands queries like “that number I saved yesterday” or “birthday reminder for mom”.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. You can try the Pro or Supernova plan for free with no credit card required.",
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
