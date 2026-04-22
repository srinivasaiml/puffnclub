"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreProvider';
import { products, Product } from '@/lib/data';

const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct } = useStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.keywords.some(k => k.includes(q))
    );
    setResults(matches);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className={`fixed inset-0 bg-[#f5f0e8]/95 backdrop-blur-[30px] z-[3000] flex items-start justify-center pt-[15vh] transition-opacity duration-300`}>
      <div className="w-[min(600px,90vw)] relative animate-[fadeUp_0.4s_forwards]">
        <input 
          type="text" 
          autoFocus
          placeholder="Search t-shirts, styles, fits..." 
          className="w-full bg-card border-2 border-border rounded-2xl p-[20px_60px_20px_24px] text-text font-space text-lg outline-none transition-colors duration-300 focus:border-accent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-none border-none text-muted text-xl cursor-pointer transition-colors duration-300 hover:text-text"
          onClick={() => setIsSearchOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>

        {results.length > 0 && (
          <div className="mt-3 bg-card border border-border rounded-xl overflow-hidden max-h-[400px] overflow-y-auto">
            {results.map(p => (
              <div 
                key={p.id} 
                className="flex items-center gap-4 p-[14px_18px] cursor-pointer transition-colors duration-200 border-b border-border last:border-none hover:bg-bg2"
                onClick={() => {
                  setSelectedProduct(p);
                  setIsSearchOpen(false);
                }}
              >
                <img src={p.images[0]} alt={p.name} className="w-[50px] h-[65px] object-cover rounded-lg border border-border" />
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-0.5">{p.name}</div>
                  <div className="text-[11px] text-muted tracking-[1px] uppercase">{p.category}</div>
                </div>
                <div className="text-accent font-bold text-[15px]">{p.price}</div>
              </div>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-[30px] text-center text-muted text-sm">
            No t-shirts found. Try different keywords.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
