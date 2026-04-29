"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreProvider';

const ScratchCard = () => {
  const [scratched, setScratched] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useStore();

  useEffect(() => {
    // Show after 5 seconds of browsing
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && canvasRef.current && !scratched) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Fill with scratchable color (Grey/Gold)
      ctx.fillStyle = '#2e2923';
      ctx.fillRect(0, 0, width, height);
      
      // Add text on top
      ctx.fillStyle = '#c49a6c';
      ctx.font = 'bold 20px font-space';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 + 7);

      // Scratching logic
      let isDrawing = false;

      const scratch = (x: number, y: number) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        
        checkScratched();
      };

      const checkScratched = () => {
        const imageData = ctx.getImageData(0, 0, width, height);
        let pixels = imageData.data;
        let count = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i + 3] === 0) count++;
        }
        
        if (count > (width * height) * 0.5) { // 50% scratched
          setScratched(true);
          showToast("Coupon Revealed: VORTEX25");
        }
      };

      const handleStart = (e: any) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        scratch(x, y);
      };

      const handleMove = (e: any) => {
        if (!isDrawing) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
        scratch(x, y);
      };

      const handleEnd = () => isDrawing = false;

      canvas.addEventListener('mousedown', handleStart);
      canvas.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      canvas.addEventListener('touchstart', handleStart);
      canvas.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);

      return () => {
        canvas.removeEventListener('mousedown', handleStart);
        canvas.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
        canvas.removeEventListener('touchstart', handleStart);
        canvas.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isVisible, scratched]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-bg/80 backdrop-blur-md animate-fade-in">
      <div className="relative bg-card border border-border p-8 rounded-3xl max-w-[400px] w-full text-center shadow-2xl">
        <button 
          className="absolute -top-4 -right-4 w-10 h-10 bg-bg border border-border rounded-full flex items-center justify-center text-muted hover:text-warm transition-colors"
          onClick={() => setIsVisible(false)}
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="mb-6">
          <p className="text-accent text-[11px] tracking-[4px] uppercase mb-2">Lucky Draw</p>
          <h3 className="font-bebas text-3xl tracking-[2px] text-warm">Your Secret Discount<span className="text-accent">.</span></h3>
        </div>

        <div className="relative mx-auto w-[240px] h-[240px] rounded-2xl overflow-hidden bg-bg border-4 border-accent/20">
          {/* Revealed Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
             <div className="text-4xl font-black text-accent mb-2">25% OFF</div>
             <div className="text-[10px] text-muted tracking-[2px] uppercase mb-4">On your first order</div>
             <div className="p-3 bg-accent/10 border border-dashed border-accent rounded-lg font-mono text-accent text-sm select-all">
                VORTEX25
             </div>
             {scratched && (
               <button 
                className="mt-4 text-[11px] text-accent font-bold underline cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText("VORTEX25");
                  showToast("Code Copied!");
                }}
               >
                 Copy Code
               </button>
             )}
          </div>

          {/* Scratch Layer */}
          {!scratched && (
            <canvas 
              ref={canvasRef}
              width={240}
              height={240}
              className="absolute inset-0 cursor-crosshair touch-none"
            />
          )}
        </div>

        <p className="mt-8 text-[13px] text-muted italic">
          "Scratch the card to reveal your custom discount code!"
        </p>
      </div>
    </div>
  );
};

export default ScratchCard;
