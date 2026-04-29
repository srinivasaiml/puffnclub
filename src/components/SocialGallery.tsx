"use client";

import React, { useEffect, useRef } from 'react';

const SocialGallery = () => {
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
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.reveal');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const feed = [
    "https://images.unsplash.com/photo-1529139572177-39a497fd2c00?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop"
  ];

  return (
    <section id="social" className="py-[100px] px-6 md:px-10 overflow-hidden" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="section-label">Follow The Culture</p>
          <h2 className="section-title">As Seen On Instagram<span className="text-accent">.</span></h2>
          <p className="text-muted max-w-[600px] mx-auto -mt-6">Tag <span className="text-accent font-bold">@vortex_official</span> to get featured on our official store wall.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {feed.map((img, i) => (
            <div 
              key={i} 
              className="reveal relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <img 
                src={img} 
                alt="Social feed" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent/40 opacity-0 transition-opacity duration-300 flex items-center justify-center group-hover:opacity-100">
                <i className="fab fa-instagram text-white text-3xl"></i>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center reveal">
          <a 
            href="https://www.instagram.com/vortex_official?igsh=MTZmdDZybzJxaWRpaQ==" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-3"
          >
            <i className="fab fa-instagram"></i> View Official Page
          </a>

        </div>
      </div>
    </section>
  );
};

export default SocialGallery;
