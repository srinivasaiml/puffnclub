"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1600&q=80",
    title: "URBAN",
    subtitle: "ESSENTIALS"
  },
  {
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80",
    title: "MODERN",
    subtitle: "STREETWEAR"
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
    title: "LUXURY",
    subtitle: "COLLECTION"
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={HERO_IMAGES[index].url} 
              alt="Hero" 
              className="h-full w-full object-cover scale-105 animate-slow-zoom"
            />
            {/* Adjusted Gradient: Lighter transition to keep images visible but text readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Content Wrapper */}
          <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-4xl pt-20">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="h-[2px] w-12 bg-white" />
                <span className="text-white text-[11px] tracking-[5px] uppercase font-bold">
                  Est. 2026 — Premium Quality
                </span>
              </motion.div>

              <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="font-bebas text-[clamp(60px,12vw,150px)] leading-[0.85] text-white tracking-tighter"
              >
                {HERO_IMAGES[index].title} <br />
                {/* Changed text-accent (black) to a visible light color */}
                <span className="text-white/90">{HERO_IMAGES[index].subtitle}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-white/60 text-lg md:text-xl max-w-xl mt-8 font-light tracking-wide leading-relaxed"
              >
                Redefining the modern wardrobe with pieces that blend street culture and high-end luxury.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="flex flex-wrap gap-6 mt-12"
              >
                <button 
                  onClick={() => scroll('collection')}
                  className="px-10 py-5 bg-white text-black font-bold text-[12px] tracking-[3px] uppercase hover:bg-zinc-200 transition-all duration-500 shadow-2xl"
                >
                  Shop Now
                </button>
                <button 
                  onClick={() => scroll('values')}
                  className="px-10 py-5 border border-white/20 text-white font-bold text-[12px] tracking-[3px] uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
                >
                  Our Story
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <style jsx>{`
        @keyframes slow-zoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 8s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}

