import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: "Christopher Fox",
    role: "Founder",
    rating: 5,
    title: "Tool of the year",
    text: "Without a doubt, it's the best tool I've subscribed to this year. Keep up the good work!",
    avatar: "",
  },
  {
    id: 2,
    name: "Robbie Lockie",
    role: "Founder",
    rating: 5,
    title: "Game-changer",
    text: "I have ADHD and this tool has completely changed my life. It's like having a second brain!",
    avatar: "",
  },
  {
    id: 3,
    name: "Yukari Aotani",
    role: "Violinist",
    rating: 5,
    title: "It's a lifesaver",
    text: "Thanks to Memorae! I discovered the friend reminders feature and it was incredible.",
    avatar: "",
  },
  {
    id: 4,
    name: "Rhea Mathews",
    role: "Marketing Lead",
    rating: 5,
    title: "A miracle!",
    text: "Now my memory has a name, and it's called Memorae.",
    avatar: "",
  },
  {
    id: 5,
    name: "Priya Shah",
    role: "Product Manager",
    rating: 5,
    title: "The best invention of the century",
    text: "Memorae helps me keep track of everything - saves my time and mental energy.",
    avatar: "",
  },
  {
    id: 6,
    name: "Arjun Patel",
    role: "Student",
    rating: 5,
    title: "The best thing that ever happened to me",
    text: "I've never missed an assignment since I started using this app.",
    avatar: "",
  },
];

function Stars({ value = 5, size = 5 }) {
  const stars = new Array(5).fill(0);
  return (
    <div className="flex items-center" aria-hidden>
      {stars.map((_, i) => (
        <svg
          key={i}
          className={`w-${size} h-${size} ${i < value ? "text-yellow-400" : "text-white/30"} mr-1`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.286 3.959c.3.922-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.784.57-1.84-.196-1.54-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.063 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortBy, setSortBy] = useState("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_REVIEWS.filter((r) => {
      if (minRating && r.rating < minRating) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q)
      );
    });
  }, [query, minRating]);

  const visible = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  return (
    <main className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            What people say
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Real feedback from users who rely on Memorae to remember what
            matters.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-2/3">
            <label htmlFor="search" className="sr-only">
              Search reviews
            </label>
            <div className="relative flex-1">
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, title or text..."
                className="w-full rounded-full border border-slate-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                aria-label="Search reviews"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Min rating</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="rounded-full border border-slate-200 px-3 py-2 bg-white"
                aria-label="Minimum rating"
              >
                <option value={0}>Any</option>
                <option value={5}>5 ⭐</option>
                <option value={4}>4 ⭐ & up</option>
                <option value={3}>3 ⭐ & up</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-sm text-slate-600 hidden md:block"
            >
              Sort
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-slate-200 px-3 py-2 bg-white"
              aria-label="Sort reviews"
            >
              <option value="recent">Most recent</option>
              <option value="top">Top rated</option>
            </select>
          </div>
        </div>

        <section aria-labelledby="reviews-heading" className="mb-8">
          <h2 id="reviews-heading" className="sr-only">
            User reviews
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((r) => (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* avatar */}
                    {r.avatar ? (
                      <img
                        src={r.avatar}
                        alt={`${r.name} avatar`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                        {r.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {r.title}
                        </h3>
                      </div>
                      <div className="text-sm text-slate-500">
                        {r.name} — {r.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Stars value={r.rating} size={5} />
                  </div>
                </div>

                <p className="mt-4 text-slate-700 leading-relaxed">{r.text}</p>
              </motion.article>
            ))}

            {visible.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500">
                No reviews found — try a different search or filter.
              </div>
            )}
          </div>
        </section>

        <div className="flex items-center justify-center gap-4">
          {canLoadMore ? (
            <button
              onClick={() => setVisibleCount((v) => v + 6)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:scale-[1.02] transition"
            >
              Load more
            </button>
          ) : (
            <div className="text-sm text-slate-500">
              You have seen all reviews.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
