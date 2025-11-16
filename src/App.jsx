import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import FaqAccordion from "./components/FaqAccordion";
import Footer from "./components/Footer";
import IntroRobot from "./components/IntroRobot";
import VideoPopup from "./components/VideoPopup";
import DeviceShow from "./components/DeviceShow";
import StatsSection from "./components/StatsSection";
import ChatScrollWithRobot from "./components/ChatScrollWithRobot";
import SuperpowersSection from "./components/SuperpowersSection";
import ReviewsPage from "./components/ReviewsPage";
import PricingSection from "./components/PricingSection";

const SECTION_MAP = [
  { id: "hero", label: "Hero" },
  { id: "intro", label: "Intro" },
  { id: "video", label: "Video" },
  { id: "device", label: "Device" },
  { id: "stats", label: "Statistics" },
  { id: "chat", label: "Conversations" },
  { id: "super", label: "Superpowers" },
  { id: "reviews", label: "Reviews" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function App() {
  const mainRef = useRef(null);
  const roadRef = useRef(null);
  const comboRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("Hero");

  // motion value for X position
  const xMotion = useMotionValue(0);
  const springX = useSpring(xMotion, { stiffness: 120, damping: 22 });

  const lean = useTransform(springX, (v) => Math.min(8, v / 80));
  useEffect(() => {
    const observers = [];

    SECTION_MAP.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
              setCurrentSection(section.label);
            }
          });
        },
        { threshold: 0.35 }
      );

      obs.observe(element);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    function handleScroll() {
      const main = mainRef.current;
      if (!main) return;

      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const top = main.offsetTop;
      const height = main.offsetHeight;

      const rel = (scrollY + viewport / 2 - top) / (height + viewport);
      setProgress(Math.max(0, Math.min(1, rel)));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const road = roadRef.current;
    const combo = comboRef.current;
    if (!road || !combo) return;

    const travel = road.offsetWidth - combo.offsetWidth - 8;
    xMotion.set(progress * travel);
  }, [progress, xMotion]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <main ref={mainRef} className="flex-1 relative">
        <div id="hero">
          <Hero />
        </div>
        <div id="intro">
          <IntroRobot />
        </div>
        <div id="video">
          <VideoPopup />
        </div>
        <div id="device">
          <DeviceShow />
        </div>
        <div id="stats">
          <StatsSection />
        </div>
        <div id="chat">
          <ChatScrollWithRobot />
        </div>
        <div id="super">
          <SuperpowersSection />
        </div>
        <div id="reviews">
          <ReviewsPage />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="faq">
          <FaqAccordion />
        </div>
        <div id="footer">
          <Footer />
        </div>
      </main>

      <div className="pointer-events-none fixed left-0 right-0 bottom-6 z-50 flex justify-center">
        <div className="w-[90%] max-w-5xl relative">
          <div
            ref={roadRef}
            className="h-16 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 shadow-inner"
          />

          <motion.div
            ref={comboRef}
            style={{ x: springX }}
            className="absolute bottom-7 flex items-end"
          >
            <motion.div style={{ rotate: lean }} className="relative mr-[-6px]">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="w-16 h-20 bg-gradient-to-br from-sky-300 to-purple-300 rounded-2xl shadow-xl flex flex-col items-center justify-center"
              >
                <div className="w-10 h-5 bg-white rounded-full mb-1" />
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg">
                  🤖
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: [10, -10, 10] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute right-[-14px] bottom-6 w-8 h-3 bg-slate-300 rounded-full shadow"
              />
            </motion.div>

            <div className="w-52 md:w-60 bg-white shadow-2xl rounded-xl p-4 flex flex-col">
              <div className="text-sm font-semibold text-slate-700">
                You are in:
              </div>
              <div className="text-base md:text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-1">
                {currentSection}
              </div>

              <div className="flex items-center gap-3 mt-3">
                <svg width="24" height="24" className="opacity-60">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="gray"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <svg width="24" height="24" className="opacity-60">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="gray"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
