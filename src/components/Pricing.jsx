import React from "react";

const plans = [
  { name: "Pro", price: "2.99", bullets: ["Basic reminders", "1 device"] },
  {
    name: "Supernova",
    price: "8.99",
    bullets: ["Unlimited", "Priority support"],
  },
  { name: "Lifetime", price: "199", bullets: ["One time", "All features"] },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold">Your chaos, your plan</h3>
        <p className="text-gray-600 mt-2">
          Choose how you want Memorae to help you don't lose your head.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center">
          {plans.map((p, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow-md w-72">
              <div className="text-sm text-gray-500">{p.name}</div>
              <div className="text-3xl font-bold mt-2">${p.price}</div>
              <ul className="mt-4 text-gray-600 space-y-2">
                {p.bullets.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
              <button className="mt-6 w-full px-4 py-2 rounded-full bg-gradient-to-r from-purpleA to-pinkA text-white">
                Try for Free
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
