"use client";

import React, { useEffect, useRef } from 'react';

const Values = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = containerRef.current?.querySelectorAll('.reveal');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const data = [
    {
      icon: "fas fa-gem",
      title: "Premium Cloth",
      desc: "100% combed cotton with 220 GSM weight. Pre-shrunk, bio-washed fabric that feels softer with every wash. No compromise on material."
    },
    {
      icon: "fas fa-tags",
      title: "Reasonable Price",
      desc: "Luxury quality doesn't need luxury pricing. We cut middlemen and deliver directly to you at honest, transparent prices."
    },
    {
      icon: "fas fa-crown",
      title: "Modern Branding",
      desc: "Minimalist designs that speak louder than logos. Each piece is a statement of refined street culture and self-expression."
    }
  ];

  return (
    <section id="values" className="py-[80px] md:py-[120px] px-6 md:px-10 max-w-[1200px] mx-auto" ref={containerRef}>

      <p className="section-label reveal">About PuffinClub</p>
      <h2 className="section-title reveal">Built Different<span className="text-accent">.</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
        {data.map((item, i) => (
          <div key={i} className="value-card reveal group relative bg-card border border-border rounded-2xl p-[40px_30px] overflow-hidden transition-all duration-400 hover:border-accent hover:translate-y-[-6px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-[22px] text-bg mb-6">
              <i className={item.icon}></i>
            </div>
            <h3 className="font-bebas text-[26px] tracking-[2px] mb-2.5 text-warm">{item.title}</h3>
            <p className="text-text/80 text-sm leading-[1.7]">{item.desc}</p>
            <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)] opacity-0 transition-opacity duration-400 group-hover:opacity-[0.06]"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
