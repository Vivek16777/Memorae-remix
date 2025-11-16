import React from "react";

export default function FeatureCard({ title, desc, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transform transition hover:-translate-y-2">
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-gray-500">{desc}</p>
    </div>
  );
}
