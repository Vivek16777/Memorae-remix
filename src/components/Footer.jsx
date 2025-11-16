import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <div className="font-bold text-xl">Memorae Remix</div>
            <div className="text-gray-400 mt-2">
              You just live. Memorae remembers for you.
            </div>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Memorae Remix. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
