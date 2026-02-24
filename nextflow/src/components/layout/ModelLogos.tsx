"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MODELS = [
  { name: "Krea 1", icon: "✦" },
  { name: "Veo 3.1", icon: "◎" },
  { name: "Ideogram", icon: "◈" },
  { name: "Runway", icon: "R" },
  { name: "Luma", icon: "L" },
  { name: "Flux", icon: "△" },
  { name: "Gemini", icon: "✦" },
];

const WORDS = ["3D", "AI", "Video", "Creative", "Studio"];

export const ModelLogos = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 space-y-20">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[1.1] md:leading-[1] flex flex-wrap items-center">
            The industry's best 
            <span className="relative inline-flex items-center mx-3 md:mx-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[index]}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="text-black inline-block"
                >
                  {WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            models.
          </h2>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-400 leading-[1.1] md:leading-[1]">
            In one subscription.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-x-12 gap-y-8 pt-8 border-t border-zinc-100">
          {MODELS.map((model) => (
            <div key={model.name} className="flex items-center gap-3 group cursor-pointer">
              <span className="text-2xl text-zinc-400 group-hover:text-black transition-all duration-300">
                {model.icon}
              </span>
              <span className="text-xl font-bold text-zinc-400 group-hover:text-black transition-all duration-300 tracking-tight">
                {model.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
