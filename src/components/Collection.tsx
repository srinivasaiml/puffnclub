"use client";

import React, { useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreProvider';
import { products } from '@/lib/data';

const Collection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setSelectedProduct, wishlist, toggleWishlist } = useStore();


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.reveal');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Show first 6 products on homepage
  const featured = products.slice(0, 6);

  return (
    <section id="collection" className="py-[80px] md:py-[120px] px-6 md:px-10 max-w-[1400px] mx-auto" ref={containerRef}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 reveal">
        <div className="mb-6 md:mb-0">
          <p className="section-label">Curated Selection</p>
          <h2 className="section-title mb-0">Featured Drops<span className="text-accent">.</span></h2>
        </div>
        <button 
          className="w-fit text-[11px] font-bold tracking-[3px] uppercase text-accent border-b-2 border-accent pb-1 hover:text-accent2 hover:border-accent2 transition-all"
          onClick={() => window.location.href = '/collection'}
        >
          Explore Full Catalog
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {featured.map((p, i) => (
          <div 
            key={p.id}
            className="reveal group cursor-pointer"
            onClick={() => setSelectedProduct(p)}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-card mb-5">
              <img 
                src={p.images[0]} 
                alt={p.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=90&w=1000";
                }}
              />
              
              <button 
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 ${wishlist.includes(p.id) ? 'bg-accent text-bg' : 'bg-black/10 text-warm backdrop-blur-md hover:bg-warm hover:text-bg'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(p.id);
                }}
              >
                <i className={wishlist.includes(p.id) ? "fas fa-heart" : "far fa-heart"}></i>
              </button>

              
              {p.discount && (
                <span className="absolute top-4 left-4 bg-discount text-white p-[5px_12px] rounded-lg text-[10px] font-black tracking-[1px] uppercase">
                  {p.discount}
                </span>
              )}
              
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 hidden md:flex items-center justify-center group-hover:opacity-100">
                <span className="bg-warm text-bg p-[14px_32px] rounded-xl text-[12px] font-black tracking-[2px] uppercase translate-y-5 transition-transform duration-300 group-hover:translate-y-0">Quick View</span>
              </div>
            </div>
            
            <div className="px-1">
              <p className="text-[11px] tracking-[3px] uppercase text-accent mb-2 font-bold">{p.category}</p>
              <h3 className="font-bebas text-2xl tracking-[2px] text-warm mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
              <div className="flex items-center gap-3">
                <span className="font-black text-xl text-warm">{p.price}</span>
                {p.oldPrice && <span className="text-muted line-through text-sm">{p.oldPrice}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
