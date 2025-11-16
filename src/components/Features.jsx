import React from "react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Capture instantly",
    desc: "Save notes, voice memos, or screenshots — captured intelligently.",
  },
  {
    title: "Auto organization",
    desc: "Smart grouping so you find things without searching.",
  },
  {
    title: "Smart reminders",
    desc: "Reminders that understand context and timing.",
  },
  {
    title: "Calendar sync",
    desc: "Works with your calendar to prevent missed events.",
  },
];

export default function Features() {
  return (
    <section id="features" className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center">
        Superpowers for people who can’t do it all
      </h2>
      <p className="text-center text-gray-500 mt-3 max-w-2xl mx-auto">
        Small features that combine into one calm, focused experience.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, idx) => (
          <FeatureCard
            key={idx}
            title={f.title}
            desc={f.desc}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
              </svg>
            }
          />
        ))}
      </div>
    </section>
  );
}
