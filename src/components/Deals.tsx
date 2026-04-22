"use client";

import { motion } from "framer-motion";
import { FireIcon } from "@heroicons/react/24/solid";

export default function Deals() {
  const timeLeft = [
    { label: "Days", value: "05" },
    { label: "Hours", value: "12" },
    { label: "Mins", value: "48" },
    { label: "Secs", value: "15" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden rounded-[2.5rem] glass-dark border border-white/10 p-12 md:p-20 text-center"
        >
          {/* Animated Background Gradients */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-accent/30 text-accent font-bold mb-8"
            >
              <FireIcon className="w-5 h-5 animate-pulse" />
              LIMITED TIME OFFER
            </motion.div>

            <h3 className="text-4xl md:text-6xl font-extrabold mb-6">
              Season Sale is <span className="text-gradient">LIVE!</span>
            </h3>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              Unlock up to 50% off on our flagship products. Don't miss out on the best audio experience of your life.
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 md:gap-8 mb-12">
              {timeLeft.map((time, i) => (
                <motion.div
                  key={time.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 glass-card rounded-2xl md:rounded-3xl flex items-center justify-center border border-white/20 mb-3 backdrop-blur-3xl shadow-xl">
                    <span className="text-2xl md:text-4xl font-bold">{time.value}</span>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-white/50 uppercase tracking-widest">{time.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full bg-white text-black font-extrabold text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all"
            >
              Shop the Collection
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
