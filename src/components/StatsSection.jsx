import React, { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1500, start = 0, enabled = true) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startTimeRef.current = null;
    };
  }, [target, duration, start, enabled]);

  return value;
}

const formatNumber = (n) => {
  if (n >= 1e6) return `${(n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1)}M`;
  if (n >= 1e3) return n.toLocaleString();
  return `${n}`;
};

export default function StatsSection({
  items = [
    {
      value: 60000,
      prefix: "+",
      label: "people already living with a peaceful mind",
    },
    { value: 45, prefix: "+", label: "countries" },
    { value: 5000000, prefix: "+", label: "reminders sent" },
    { value: 100, prefix: "+", label: "languages" },
  ],
  duration = 1500,
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [prefersReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8">
          Your head can't take it any more. Luckily, now you have help.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-start">
          {items.map((it, idx) => {
            const count = useCountUp(
              it.value,
              duration,
              0,
              visible && !prefersReduced
            );
            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#8b5cf6,#ec4899)",
                  }}
                  aria-hidden
                >
                  <span className="mr-1">{it.prefix || ""}</span>
                  <span aria-live="polite">
                    {formatNumber(
                      prefersReduced || !visible
                        ? it.prefix
                          ? it.value
                          : it.value
                        : count
                    )}
                  </span>
                </div>

                <div className="mt-3 text-sm md:text-base text-slate-500 max-w-xs">
                  {it.label.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
