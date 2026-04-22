"use client";

import React, { useState, useEffect } from 'react';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-6 left-6 z-[2000] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <a 
        href="https://wa.me/918331915339" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative flex items-center"
      >
        <div className="absolute left-14 bg-bg2 border border-border text-warm p-[8px_16px] rounded-lg text-[12px] font-bold tracking-[1px] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
          Need help? Chat with us!
        </div>
        
        <div className="w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center text-white text-2xl shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-110 hover:rotate-12">
          <i className="fab fa-whatsapp"></i>
          
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-discount rounded-full border-2 border-bg animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-discount rounded-full border-2 border-bg"></span>
        </div>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
