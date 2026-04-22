"use client";

import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Newsletter() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="glass-card p-12 md:p-24 relative overflow-hidden border border-white/10 text-center">
          {/* Background Highlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Stay in the <span className="text-gradient">Loop.</span></h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-12">
              Subscribe to our newsletter to receive updates on new arrivals, exclusive offers, and digital tech insights.
            </p>

            <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-4 p-2 glass rounded-[2rem] border border-white/10 focus-within:border-indigo-500/50 transition-all">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-transparent border-none outline-none px-6 py-3 text-white placeholder:text-white/30"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
                >
                  Subscribe <PaperAirplaneIcon className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="mt-4 text-xs text-white/30">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
