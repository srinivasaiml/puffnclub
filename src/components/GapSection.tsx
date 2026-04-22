"use client";

import React, { useEffect, useRef, useState } from 'react';

interface GapSectionProps {
  text: string;
  images: string[];
  lineWidth?: string;
}

const GapSection: React.FC<GapSectionProps> = ({ text, images, lineWidth = "80%" }) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative h-[200px] flex items-center justify-center overflow-hidden"
    >
      <div 
        className={`absolute h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-[1200ms] cubic-bezier(0.22,1,0.36,1) ${isInView ? 'scale-x-100' : 'scale-x-0'}`}
        style={{ width: lineWidth }}
      />
      
      {images.map((src, i) => (
        <img 
          key={i}
          src={src} 
          alt="" 
          className={`absolute w-[80px] h-[100px] rounded-lg overflow-hidden border border-border grayscale-[0.6] transition-all duration-800 cubic-bezier(0.22,1,0.36,1)
            ${isInView ? 'opacity-25 scale-100 rotate-[-3deg]' : 'opacity-0 scale-50 rotate-[10deg]'}
            ${i === 0 ? 'left-[10%] top-[20%] delay-100' : i === 1 ? 'right-[15%] top-[30%] delay-300' : 'left-[40%] bottom-[10%] delay-500'}`}
        />
      ))}

      <span className={`font-bebas text-[clamp(24px,4vw,48px)] tracking-[6px] text-accent transition-all duration-800 delay-200 relative z-[2]
        ${isInView ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        {text}
      </span>
    </div>
  );
};

export default GapSection;
