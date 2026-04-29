"use client";

import React from 'react';
import { motion } from "framer-motion";

const Values = () => {
  const data = [
    {
      icon: "fas fa-gem",
      title: "PREMIUM FABRICS",
      desc: "We source only the finest 220 GSM combed cotton for a superior feel that lasts."
    },
    {
      icon: "fas fa-tags",
      title: "HONEST LUXURY",
      desc: "High-end quality shouldn't come with high-end markups. Direct to you."
    },
    {
      icon: "fas fa-crown",
      title: "MODERN VISION",
      desc: "Each piece is designed to be a timeless statement in the evolving street culture."
    }
  ];

  return (
    <section id="values" className="py-24 bg-bg overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80" 
                className="w-full h-full object-cover" 
                alt="Brand Identity" 
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-2xl flex items-center justify-center p-8 text-white shadow-2xl hidden md:flex">
              <p className="font-bebas text-3xl leading-tight tracking-wider">REDEFINING STREET CULTURE</p>
            </div>
          </motion.div>

          <div className="space-y-12">
            <div>
              <h2 className="text-[10px] font-bold text-accent uppercase tracking-[5px] mb-6">Our DNA</h2>
              <h3 className="text-5xl md:text-7xl font-bebas tracking-tighter text-warm leading-none">Built For The <br /> Bold & Different</h3>
            </div>

            <div className="space-y-10">
              {data.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-full border border-warm/10 flex items-center justify-center flex-shrink-0 text-accent">
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl tracking-[2px] text-warm mb-2">{item.title}</h4>
                    <p className="text-muted text-sm leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
