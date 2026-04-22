"use client";

import React, { useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreProvider';
import { products } from '@/lib/data';

const QueueScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setSelectedProduct } = useStore();

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

  // Map products to queue items
  const queueData = products.map(p => ({
    img: p.images[0],
    tag: p.category.split(' ')[0],
    price: p.price,
    pid: p.id
  }));

  const Row = ({ reverse = false, data }: { reverse?: boolean, data: typeof queueData }) => (
    <div className={`flex gap-6 mb-6 w-max ${reverse ? 'animate-queue-rev' : 'animate-queue'}`}>
      {[...data, ...data].map((item, i) => (
        <div 
          key={i} 
          className="queue-item w-[240px] h-[320px] rounded-xl overflow-hidden relative cursor-pointer flex-shrink-0 border border-border transition-all duration-400 bg-card hover:border-accent hover:scale-105 hover:translate-y-[-8px] hover:shadow-[0_20px_50px_rgba(196,154,108,0.2)] hover:z-10 group"
          onClick={() => setSelectedProduct(products.find(p => p.id === item.pid) || products[0])}
        >
          <img 
            src={item.img} 
            alt={item.tag} 
            className="w-full h-full object-cover transition-transform duration-600 saturate-[0.8] group-hover:scale-110 group-hover:saturate-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=90&w=1000";
            }}

          />
          <span className="absolute bottom-3 left-3 bg-bg/90 backdrop-blur-[10px] p-[6px_14px] rounded-md text-[11px] tracking-[1px] text-text border border-border">{item.tag}</span>
          <span className="absolute top-3 right-3 bg-accent text-bg p-[4px_12px] rounded-md text-[13px] font-bold">{item.price}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="collection" className="py-20 overflow-hidden relative" ref={containerRef}>
      <div className="absolute left-0 right-0 top-0 h-[60px] bg-gradient-to-b from-bg to-transparent z-[2] pointer-events-none"></div>
      <div className="absolute left-0 right-0 bottom-0 h-[60px] bg-gradient-to-t from-bg to-transparent z-[2] pointer-events-none"></div>
      
      <div className="text-center mb-[50px] px-10 reveal">
        <p className="queue-label text-[11px] tracking-[5px] uppercase text-accent mb-2">Scroll Through</p>
        <h2 className="queue-title font-bebas text-[clamp(32px,5vw,56px)] tracking-[4px] text-warm">The Collection<span className="text-accent">.</span></h2>
      </div>

      <div className="flex flex-col">
        <Row data={queueData.slice(0, Math.ceil(queueData.length / 2))} />
        <Row reverse data={queueData.slice(Math.ceil(queueData.length / 2))} />
      </div>
    </section>
  );
};

export default QueueScroll;
