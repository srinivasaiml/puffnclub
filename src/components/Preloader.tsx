"use client";

import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const fullText = "VORTEX";



  useEffect(() => {
    let currentIdx = 0;

    const typing = setInterval(() => {
      if (currentIdx <= fullText.length) {
        setText(fullText.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(typing);
      }
    }, 150);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      clearInterval(typing);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#ffffff] flex flex-col items-center justify-center transition-opacity duration-1000 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative mb-6">
        <div className="absolute inset-[-30px] bg-accent/10 blur-[60px] rounded-full animate-pulse"></div>
        <img
          src="/kite-logo.png"
          alt="VORTEX Logo"
          className="w-[100px] h-[100px] relative z-10 brightness-200"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="font-bebas text-5xl md:text-8xl tracking-[8px] text-accent mb-2 h-[100px] flex items-center">
          {text}<span className="animate-pulse text-warm">_</span>
        </h1>

        <p className="text-accent text-[10px] tracking-[5px] uppercase opacity-0 animate-fade-in [animation-delay:1s]">
          Redefining Basics
        </p>
      </div>

      <div className="absolute bottom-12 w-[200px] h-[2px] bg-card overflow-hidden">
        <div className="w-full h-full bg-accent origin-left animate-loader-progress"></div>
      </div>

      <style jsx>{`
        @keyframes loader-progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-loader-progress {
          animation: loader-progress 4s linear forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
