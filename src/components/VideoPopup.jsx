import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoPopup({
  src = "/assets/sample-1.mp4",
  poster = "",
}) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (open) {
      v.currentTime = 0;
      v.muted = false;
      const p = v.play();
      if (p?.catch) p.catch(() => {});
    } else {
      v.pause();
      try {
        v.currentTime = 0;
      } catch {}
    }
  }, [open]);

  return (
    <section
      id="video"
      aria-labelledby="video-title"
      className="w-full min-h-screen flex items-center justify-center px-6 py-12 bg-white"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h3
          id="video-title"
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center"
        >
          See Memorae in Action
        </h3>

        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-10">
          Watch a short walkthrough that shows how Memorae captures, organizes,
          and reminds you of the things you need at the right time.
        </p>

        <div className="flex justify-center">
          <button
            aria-label="Open video demo"
            onClick={() => setOpen(true)}
            className="relative group inline-block rounded-2xl overflow-hidden shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200"
          >
            <div className="w-[350px] h-[200px] md:w-[420px] md:h-[240px] bg-gray-200 flex items-center justify-center">
              {poster ? (
                <img
                  src={poster}
                  alt="poster"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-50 to-pink-50">
                  <div className="text-center">
                    <div className="text-sm text-slate-500 mb-1">Preview</div>
                    <div className="text-xs text-slate-400">sample-1.mp4</div>
                  </div>
                </div>
              )}
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xl transform transition-transform duration-200 group-hover:scale-110">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 3v18l15-9L5 3z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <motion.div
              className="relative z-60 w-[90%] sm:w-[75%] md:w-[65%] lg:w-[55%] max-w-4xl"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center">
                      ▶
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Demo — sample-1.mp4
                      </div>
                      <div className="text-xs text-slate-500">
                        Short walkthrough
                      </div>
                    </div>
                  </div>

                  <button
                    className="p-2 rounded-md hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Video */}
                <div className="bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={src}
                    controls
                    playsInline
                    className="w-full max-h-[75vh] object-contain"
                    poster={poster}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
