import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purpleA to-pinkA flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="font-semibold">Memorae Remix</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#features" className="hover:underline">
            Features
          </a>
          <a href="#device" className="hover:underline">
            Device
          </a>
          <a href="#pricing" className="hover:underline">
            Pricing
          </a>
          <a href="#faq" className="hover:underline">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden md:inline-block px-4 py-2 rounded-full bg-white border shadow-sm">
            Login
          </button>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purpleA to-pinkA text-white shadow-md">
            Try for Free
          </button>
        </div>
      </div>
    </header>
  );
}
