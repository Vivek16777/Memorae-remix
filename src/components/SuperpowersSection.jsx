import React, { useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUPERPOWERS = [
  {
    id: "notes",
    title: "Notes that never get lost",
    desc: "Shopping lists, ideas, or whatever. Just say it, type it, or drop it in and your list is saved.",
    bubbleColor: "from-cyan-400 to-blue-500",
    bubbleMessages: [
      {
        text: "Memorae, add Stranger Things to my watch list!",
        incoming: false,
      },
      { text: "Added 'Stranger Things' to your watch list.", incoming: true },
    ],
  },
  {
    id: "calendars",
    title: "All your calendars in one chat",
    desc: "Google, Outlook. Your appointments, events, and tasks together. You won't miss a thing.",
    bubbleColor: "from-pink-400 to-rose-500",
    bubbleMessages: [
      {
        text: "Memorae, cancel all events after Thursday at 6PM.",
        incoming: false,
      },
      {
        text: "Cancelled all your events after Thursday at 6pm.",
        incoming: true,
      },
    ],
  },
  {
    id: "voice",
    title: "Voice notes that become tasks",
    desc: "Memorae listens, transcribes, and organizes what you say. That easy.",
    bubbleColor: "from-violet-500 to-indigo-500",
    bubbleMessages: [
      {
        text: "Created reminder: family lunch at Aunt Luisa's Sunday at 1:00 PM.",
        incoming: true,
      },
    ],
  },
  {
    id: "reminders",
    title: "Unlimited automatic reminders",
    desc: "Unique or repeating reminders. Scheduled or spontaneous — Memorae reminds you whenever needed!",
    bubbleColor: "from-blue-400 to-cyan-500",
    bubbleMessages: [
      { text: "Remind me to meditate tomorrow at 8AM!", incoming: false },
      {
        text: "I've set your reminder for tomorrow at 8:00 to meditate.",
        incoming: true,
      },
    ],
  },
  {
    id: "image",
    title: "Image analysis & OCR",
    desc: "Snap receipts, whiteboard photos or screenshots — Memorae reads them and extracts actions for you.",
    bubbleColor: "from-emerald-400 to-teal-500",
    bubbleMessages: [
      { text: "Scan this receipt and add to expenses", incoming: false },
      { text: "Added receipt to Expenses (₹1,240).", incoming: true },
    ],
  },
  {
    id: "contacts",
    title: "Reminders among friends",
    desc: "Share reminders, send someone a nudge or coordinate with friends through quick messages.",
    bubbleColor: "from-yellow-400 to-orange-500",
    bubbleMessages: [
      { text: "Remind Rhea to bring the slides tomorrow", incoming: false },
      {
        text: "Reminder scheduled for Rhea — she'll be notified.",
        incoming: true,
      },
    ],
  },
  {
    id: "auto-organize",
    title: "Organize automatically",
    desc: "Your ideas, links and conversations are grouped by context, people, and intent.",
    bubbleColor: "from-sky-300 to-blue-500",
    bubbleMessages: [
      { text: "Group my Black Friday notes under Campaigns", incoming: false },
      { text: "Notes grouped under: Campaigns.", incoming: true },
    ],
  },
  {
    id: "search",
    title: "Search without remembering keywords",
    desc: "Find what you want by typing partial phrases, or ask Memorae 'where did I say...' and it finds it.",
    bubbleColor: "from-purple-400 to-pink-400",
    bubbleMessages: [
      { text: "Find the meeting link I mentioned last week", incoming: false },
      {
        text: "Found: meet.google.com/design — added to Meeting notes.",
        incoming: true,
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy-first by design",
    desc: "Your data stays private. Local-first design with optional encrypted sync.",
    bubbleColor: "from-stone-400 to-stone-600",
    bubbleMessages: [
      { text: "Are my reminders stored safely?", incoming: false },
      {
        text: "Yes — data is encrypted and accessible only to you.",
        incoming: true,
      },
    ],
  },
  {
    id: "integrations",
    title: "Calendar & chat integrations",
    desc: "Connect Google, Outlook, WhatsApp and more — messages become organized, actionable reminders.",
    bubbleColor: "from-indigo-400 to-violet-500",
    bubbleMessages: [
      { text: "Connect my Google Calendar to Memorae", incoming: false },
      { text: "Google Calendar connected successfully.", incoming: true },
    ],
  },
  {
    id: "smart-actions",
    title: "Smart follow-ups",
    desc: "Memorae suggests the next action and can schedule follow-ups for you automatically.",
    bubbleColor: "from-rose-400 to-red-500",
    bubbleMessages: [
      { text: "Suggest next steps for the marketing plan", incoming: false },
      {
        text: "Suggested: draft timeline, assign creative, schedule review.",
        incoming: true,
      },
    ],
  },
  {
    id: "localization",
    title: "Multi-language support",
    desc: "Reminders and suggestions in many languages — so Memorae works across your teams.",
    bubbleColor: "from-pink-300 to-purple-400",
    bubbleMessages: [
      { text: "Translate this note to Spanish", incoming: false },
      { text: "Traducción: 'Reunión el lunes a las 10:30'.", incoming: true },
    ],
  },
];

const PAGE_SIZE = 4;

const cardEnter = { opacity: 0, y: 12 };
const cardCenter = { opacity: 1, y: 0 };
const cardExit = { opacity: 0, y: -8 };

export default function SuperpowersPaged() {
  const total = SUPERPOWERS.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const scrollerRef = useRef(null);

  const [page, setPage] = React.useState(1);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return SUPERPOWERS.slice(start, start + PAGE_SIZE);
  }, [page]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, pages));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages]);

  const goTo = (p) => {
    setPage(p);
    if (scrollerRef.current) scrollerRef.current.focus();
  };

  return (
    <section className="w-full bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Superpowers for people who can't do it all
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(Math.max(1, page - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className={`w-10 h-10 rounded-full ${page === 1 ? "bg-white/6 text-white/40 cursor-not-allowed" : "bg-white/10 hover:bg-white/20"} flex items-center justify-center`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <nav
              aria-label="Pages"
              className="hidden sm:flex items-center gap-2"
            >
              {Array.from({ length: pages }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => goTo(p)}
                    aria-current={page === p ? "page" : undefined}
                    className={`px-3 py-1 rounded-md ${page === p ? "bg-white text-slate-900 font-semibold" : "bg-white/6 text-white/90 hover:bg-white/12"}`}
                    aria-label={`Go to page ${p}`}
                  >
                    {p}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => goTo(Math.min(pages, page + 1))}
              disabled={page === pages}
              aria-label="Next page"
              className={`w-10 h-10 rounded-full ${page === pages ? "bg-white/6 text-white/40 cursor-not-allowed" : "bg-white/10 hover:bg-white/20"} flex items-center justify-center`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M9 6l6 6-6 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div ref={scrollerRef} tabIndex={-1} className="outline-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={cardEnter}
              animate={cardCenter}
              exit={cardExit}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {pageItems.map((s) => (
                  <article
                    key={s.id}
                    className="rounded-2xl bg-slate-800/50 p-6 min-h-[300px] flex flex-col justify-between"
                    aria-labelledby={`p-${s.id}`}
                  >
                    <div>
                      <h3
                        id={`p-${s.id}`}
                        className="text-lg font-semibold mb-2"
                      >
                        {s.title}
                      </h3>
                      <p className="text-sm text-slate-300 mb-4">{s.desc}</p>

                      <div
                        className="rounded-xl p-3"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))",
                        }}
                      >
                        <div
                          className="rounded-lg p-2"
                          style={{ background: "rgba(255,255,255,0.02)" }}
                        >
                          <div
                            className={`rounded-md p-3 mb-3 bg-gradient-to-r ${s.bubbleColor} text-slate-900`}
                            style={{ minHeight: 48 }}
                          >
                            <div className="text-sm leading-tight">
                              {s.bubbleMessages[0].text}
                            </div>
                          </div>

                          <div className="rounded-md p-3 bg-white/90 text-slate-900 text-sm shadow-sm">
                            {s.bubbleMessages[1]
                              ? s.bubbleMessages[1].text
                              : "Confirmation message"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <a
                        href={`#${s.id}`}
                        className="inline-flex items-center gap-2 text-sm text-white/90 px-3 py-2 rounded-md hover:bg-white/5"
                      >
                        Learn more →
                      </a>

                      <div className="text-xs text-slate-400 hidden sm:block"></div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Page <span className="text-white font-medium">{page}</span> of{" "}
            <span>{pages}</span>
          </div>

          <div>
            <a
              href="#all-superpowers"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
            >
              Discover all the superpowers →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
