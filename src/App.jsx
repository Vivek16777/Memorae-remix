import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import DeviceShowcase from "./components/DeviceShowcase";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FaqAccordion from "./components/FaqAccordion";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <DeviceShowcase />
        <Testimonials />
        <Pricing />
        <FaqAccordion />
      </main>
      <Footer />
    </div>
  );
}
