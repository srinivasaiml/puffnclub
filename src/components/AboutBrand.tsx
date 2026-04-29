"use client";

import { motion } from "framer-motion";
import { CheckBadgeIcon, RocketLaunchIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function AboutBrand() {
  const features = [
    {
      title: "Premium Quality",
      description: "Crafted with the finest materials and cutting-edge technology for an unmatched experience.",
      icon: SparklesIcon,
    },
    {
      title: "Fast Delivery",
      description: "Our global logistics network ensures your products arrive at your doorstep in record time.",
      icon: RocketLaunchIcon,
    },
    {
      title: "Sustainability",
      description: "Committed to eco-friendly practices and ethical sourcing in every step of our process.",
      icon: CheckBadgeIcon,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2">Our Vision</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Crafting the Future of <br />
              <span className="text-gradient">Digital Lifestyle.</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
              At VORTEX, we believe that style should be an extension of yourself. We're dedicated to pushing the boundaries of design and innovation.
            </p>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]"></div>
            
            <div className="relative w-full h-full glass-card overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"></div>
              
              {/* Product Visual Simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-72 h-72 rounded-[40px] glass-dark border border-white/20 p-8 flex flex-col justify-between shadow-2xl relative z-10"
                 >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <SparklesIcon className="w-6 h-6 text-indigo-300" />
                    </div>
                    <div className="space-y-2">
                       <div className="w-32 h-2 bg-white/20 rounded-full"></div>
                       <div className="w-24 h-2 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="w-full h-32 bg-gradient-to-t from-indigo-500/30 to-transparent rounded-2xl border border-white/5 flex items-end p-4">
                        <div className="w-full h-8 bg-white/10 rounded-lg"></div>
                    </div>
                 </motion.div>

                 {/* Decorators */}
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 m-auto w-96 h-96 border border-white/5 rounded-full border-dashed"
                 />
                 <div className="absolute top-1/4 right-1/4 w-12 h-12 glass rounded-lg rotate-12 flex items-center justify-center border border-white/10">
                    <div className="w-4 h-4 bg-indigo-400 rounded-full"></div>
                 </div>
                 <div className="absolute bottom-1/3 left-1/4 w-16 h-16 glass rounded-full -rotate-12 flex items-center justify-center border border-white/10">
                    <div className="w-6 h-6 bg-purple-400 rounded-full blur-[2px]"></div>
                 </div>
              </div>

              {/* Glass Overlay with Stats */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 right-8 p-6 glass rounded-2xl border border-white/20 z-20 backdrop-blur-2xl"
              >
                <p className="text-3xl font-bold text-gradient">98%</p>
                <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mt-1">Customer Satisfaction</p>
              </motion.div>

              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute top-8 left-8 p-6 glass rounded-2xl border border-white/20 z-20 backdrop-blur-2xl"
              >
                <p className="text-3xl font-bold text-indigo-300">50+</p>
                <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mt-1">Global Awards</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
