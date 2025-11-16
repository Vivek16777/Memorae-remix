import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "features", label: "Features" },
  { id: "device", label: "Device" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const SUPERPOWER_ITEMS = [
  { id: "reminders", title: "Unlimited reminders", desc: "Never miss a thing" },
  { id: "calendar", title: "Your calendars", desc: "All in one place" },
  { id: "lists", title: "Your lists", desc: "Organized automatically" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [superOpen, setSuperOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSuperOpen, setMobileSuperOpen] = useState(false);
  const superRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onDoc(e) {
      if (superRef.current && !superRef.current.contains(e.target)) {
        setSuperOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const floatVariant = { initial: { y: 0 }, animate: { y: [-4, 4, -4] } };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } },
  };

  const mobileCardVariants = {
    hidden: { opacity: 0, y: -6, scale: 0.99 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 28 },
    },
    exit: { opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.12 } },
  };

  const mobileVariants = {
    hidden: { x: "100%" },
    show: { x: 0, transition: { type: "tween", duration: 0.35 } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.25 } },
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${isScrolled ? "bg-white/85 backdrop-blur-lg shadow-xl" : "bg-white/60 backdrop-blur-md"}`}
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="/"
            className="flex items-center gap-3 select-none group"
            aria-label="Memorae homepage"
            title="Memorae"
          >
            <motion.div
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)" }}
              whileHover={{ scale: 1.08, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.15 }}
                aria-hidden
              >
                M
              </motion.span>

              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.12 }}
                transition={{ duration: 0.25 }}
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.25), transparent)",
                }}
              />
            </motion.div>

            <span className="font-semibold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              Memorae Remix
            </span>
          </a>

          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            <div className="relative" ref={superRef}>
              <button
                onClick={() => setSuperOpen((s) => !s)}
                aria-haspopup="menu"
                aria-expanded={superOpen}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 flex items-center gap-2"
              >
                <span className="underline decoration-dashed decoration-1 decoration-slate-300">
                  Superpowers
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${superOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {superOpen && (
                  <motion.div
                    key="super-menu"
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 w-[320px] rounded-2xl bg-sky-50/90 shadow-2xl p-5 ring-1 ring-slate-200"
                    role="menu"
                    aria-label="Superpowers menu"
                  >
                    <ul className="space-y-4">
                      {SUPERPOWER_ITEMS.map((s) => (
                        <li
                          key={s.id}
                          className="flex items-center gap-3 text-slate-700"
                        >
                          <span className="w-9 h-9 rounded-lg bg-white/60 flex items-center justify-center shadow-sm">
                            🔔
                          </span>
                          <div>
                            <div className="font-medium">{s.title}</div>
                            <div className="text-xs text-slate-500">
                              {s.desc}
                            </div>
                          </div>
                        </li>
                      ))}
                      <li className="pt-2">
                        <a
                          href="#features"
                          onClick={() => setSuperOpen(false)}
                          className="inline-block px-3 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm shadow"
                        >
                          Explore all superpowers →
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveLink(item.id)}
                className="relative px-2 py-1 text-sm text-slate-700 hover:text-purple-600 focus:outline-none"
                aria-current={activeLink === item.id ? "page" : undefined}
              >
                <span className="capitalize">{item.label}</span>
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${activeLink === item.id ? "w-full" : "w-0 group-hover:w-full"}`}
                  aria-hidden
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-slate-700 hover:shadow-md">
              Login
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg text-sm"
              aria-label="Try for free"
            >
              <span>Try for Free</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 shadow hover:scale-105 focus:outline-none"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-slate-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        style={{ opacity: isScrolled ? 0.25 : 0 }}
        className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-opacity duration-500"
      />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-white z-40"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-xs bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold">
                    M
                  </div>
                  <div className="font-medium text-slate-900">
                    Memorae Remix
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md hover:bg-slate-100"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="p-4 space-y-4 bg-white" aria-label="Mobile nav">
                <div>
                  <button
                    onClick={() => setMobileSuperOpen((s) => !s)}
                    aria-expanded={mobileSuperOpen}
                    className="w-full text-left px-3 py-2 rounded-md bg-white hover:bg-slate-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center text-purple-600">
                        ★
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Superpowers
                        </div>
                        <div className="text-xs text-slate-500">
                          Quick actions & helpers
                        </div>
                      </div>
                    </div>

                    <svg
                      className={`w-4 h-4 transition-transform ${
                        mobileSuperOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {mobileSuperOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="mt-3 w-full rounded-2xl bg-white shadow-xl p-4 ring-1 ring-slate-200"
                      >
                        <ul className="space-y-3">
                          {SUPERPOWER_ITEMS.map((s) => (
                            <li key={s.id} className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                🔔
                              </div>
                              <div>
                                <div className="font-medium text-slate-800">
                                  {s.title}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {s.desc}
                                </div>
                              </div>
                            </li>
                          ))}

                          <li className="pt-2">
                            <a
                              href="#features"
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileSuperOpen(false);
                              }}
                              className="inline-block px-3 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm shadow"
                            >
                              Explore all superpowers →
                            </a>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {NAV_ITEMS.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => {
                      setActiveLink(n.id);
                      setMobileOpen(false);
                      setMobileSuperOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md hover:bg-slate-100"
                  >
                    {n.label}
                  </a>
                ))}

                <div className="pt-4 border-t">
                  <a
                    className="inline-block w-full text-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow"
                    href="#signup"
                  >
                    Try for Free
                  </a>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        variants={floatVariant}
        initial="initial"
        animate="animate"
        transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
        className="pointer-events-none fixed right-8 top-20 hidden lg:block"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-sky-300 opacity-90 shadow-xl flex items-center justify-center text-white">
          ✨
        </div>
      </motion.div>
    </header>
  );
}
