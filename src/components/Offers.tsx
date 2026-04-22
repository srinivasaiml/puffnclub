"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '@/context/StoreProvider';

const Offers = () => {
  const [timeLeft, setTimeLeft] = useState(7 * 86400 + 14 * 3600 + 32 * 60 + 48);
  const containerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const d = Math.floor(timeLeft / 86400);
  const h = Math.floor((timeLeft % 86400) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("You're on the list! We'll notify you.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="offers" className="py-[100px] px-10 relative overflow-hidden" ref={containerRef}>
      <div className="absolute rounded-full blur-[100px] opacity-[0.1] pointer-events-none w-[400px] h-[400px] bg-discount top-[-20%] right-[-10%]"></div>
      <div className="absolute rounded-full blur-[100px] opacity-[0.1] pointer-events-none w-[300px] h-[300px] bg-accent bottom-[-10%] left-[-5%]"></div>
      
      <div className="max-w-[900px] mx-auto text-center relative z-[2]">
        <span className="inline-block bg-discount text-white p-[6px_20px] rounded-full text-[12px] font-semibold tracking-[2px] uppercase mb-6 animate-pulse-slow reveal">Exclusive Offers</span>

        <h2 className="font-bebas text-[clamp(40px,7vw,80px)] tracking-[4px] text-warm mb-4 leading-tight reveal">Mega Sale<br />Is Almost Here<span className="text-accent">.</span></h2>
        <p className="text-muted text-base max-w-[500px] mx-auto mb-10 reveal">Get ready for our biggest drop of the year. Exclusive early access for subscribers to the entire upcoming collection.</p>
        
        <div className="flex gap-2 md:gap-4 justify-center mb-10 reveal">
          {[
            { n: d, l: "Days" },
            { n: h, l: "Hours" },
            { n: m, l: "Mins" },
            { n: s, l: "Secs" }
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-3 md:p-[20px_24px] min-w-[60px] md:min-w-[80px] text-center">
              <span className="font-bebas text-2xl md:text-4xl text-accent block">{String(item.n).padStart(2, '0')}</span>
              <span className="text-[10px] text-muted tracking-[2px] uppercase">{item.l}</span>
            </div>
          ))}
        </div>

        <form className="flex flex-col md:flex-row gap-2 md:gap-0 max-w-[440px] mx-auto reveal" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            placeholder="Enter your email for early access" 
            required 
            className="flex-1 bg-card border border-border md:border-r-0 rounded-xl md:rounded-l-xl md:rounded-r-none p-[14px_20px] text-text font-space text-sm outline-none transition-colors duration-300 focus:border-accent"
            suppressHydrationWarning
          />
          <button type="submit" className="bg-accent text-bg border-none p-[14px_28px] rounded-xl md:rounded-l-none md:rounded-r-xl font-space font-semibold text-[13px] tracking-[1px] cursor-pointer transition-colors duration-300 hover:bg-accent2" suppressHydrationWarning>
            Notify Me
          </button>
        </form>
      </div>
    </section>
  );
};

export default Offers;
