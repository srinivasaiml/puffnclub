"use client";

import React, { useState, useMemo } from 'react';
import { Product, products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

interface CategoryListingProps {
  title: string;
  description: string;
  categoryKeys: string[];
}

const CategoryListing: React.FC<CategoryListingProps> = ({ title, description, categoryKeys }) => {
  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [availability, setAvailability] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(3499); // Max price in mock data is ~3499
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const sizes = [
    { label: "Extra Small", value: "XS" },
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
    { label: "Extra Large", value: "XL" },
    { label: "Double XL", value: "XXL" }
  ];

  const colors = [
    { name: "Ink", value: "#1a1714" },
    { name: "Gold", value: "#c49a6c" },
    { name: "Sage", value: "#8fbc8f" },
    { name: "Cloud", value: "#dcdcdc" },
    { name: "Charcoal", value: "#3d3d3d" }
  ];

  const [dynamicProducts, setDynamicProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setDynamicProducts(data))
      .catch(err => console.error("Failed to fetch dynamic products:", err));
  }, []);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    const allAvailableProducts = [...products, ...dynamicProducts];
    return allAvailableProducts.filter(p => {
      // 1. Category check
      if (!categoryKeys.includes(p.category)) return false;

      // 2. Availability check
      if (availability.length > 0) {
        const isOut = p.id % 5 === 0; // Mock logic from previous code
        if (availability.includes("In Stock") && isOut) return false;
        if (availability.includes("Out of Stock") && !isOut) return false;
      }

      // 3. Size check
      if (selectedSizes.length > 0) {
        if (!p.sizes.some(size => selectedSizes.includes(size))) return false;
      }

      // 4. Price check
      if (p.priceNum > priceRange) return false;

      // 5. Color check
      if (selectedColors.length > 0) {
        if (!p.colors.some(color => selectedColors.includes(color))) return false;
      }

      return true;
    });
  }, [categoryKeys, availability, selectedSizes, priceRange, selectedColors]);

  const toggleAvailability = (val: string) => {
    setAvailability(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const toggleSize = (val: string) => {
    setSelectedSizes(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const toggleColor = (val: string) => {
    setSelectedColors(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  return (
    <main className="pt-[100px] md:pt-[140px] pb-[100px] min-h-screen bg-bg">
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto">
        
        {/* Header & Filter Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="reveal visible">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent text-[11px] tracking-[5px] uppercase mb-3">
              VORTEX COLLECTION
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-bebas text-[clamp(40px,6vw,70px)] tracking-[4px] text-warm leading-none">
              {title}<span className="text-accent">.</span>
            </motion.h1>
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-3 bg-white border border-border px-6 py-3 rounded-xl text-[10px] font-bold tracking-[2px] uppercase hover:border-accent transition-colors self-start"
          >
            <SlidersHorizontal size={14} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <AnimatePresence>
            {showFilters && (
              <>
                {/* Mobile Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000] lg:hidden"
                />
                
                <motion.aside 
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="fixed lg:relative inset-y-0 left-0 w-[85vw] lg:w-[280px] bg-bg lg:bg-transparent z-[2001] lg:z-0 flex-shrink-0 p-8 lg:p-0 overflow-y-auto lg:overflow-visible shadow-2xl lg:shadow-none space-y-10"
                >
                  <div className="flex items-center justify-between lg:hidden mb-10">
                    <h3 className="font-bebas text-3xl tracking-[2px] text-warm">Filter Pieces</h3>
                    <button onClick={() => setShowFilters(false)} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                      <X size={20} />
                    </button>
                  </div>

                  {/* Availability */}
                  <div className="space-y-5">
                    <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-warm">Availability</h4>
                    <div className="space-y-3">
                      {["In Stock", "Out of Stock"].map(status => (
                        <label key={status} className="flex items-center gap-3 cursor-pointer group">
                          <div 
                            onClick={() => toggleAvailability(status)}
                            className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${availability.includes(status) ? 'bg-accent border-accent' : 'border-border group-hover:border-accent'}`}
                          >
                            {availability.includes(status) && <i className="fas fa-check text-[10px] text-bg"></i>}
                          </div>
                          <span className="text-[12px] text-text/70 group-hover:text-warm transition-colors">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-border opacity-50" />

                  {/* Size */}
                  <div className="space-y-5">
                    <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-warm">Size</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                      {sizes.map(size => (
                        <label key={size.value} className="flex items-center gap-3 cursor-pointer group">
                          <div 
                            onClick={() => toggleSize(size.value)}
                            className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${selectedSizes.includes(size.value) ? 'bg-accent border-accent' : 'border-border group-hover:border-accent'}`}
                          >
                            {selectedSizes.includes(size.value) && <i className="fas fa-check text-[10px] text-bg"></i>}
                          </div>
                          <span className="text-[12px] text-text/70 group-hover:text-warm transition-colors">{size.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-border opacity-50" />

                  {/* Colour */}
                  <div className="space-y-5">
                    <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-warm">Colour</h4>
                    <div className="flex flex-wrap gap-3">
                      {colors.map(color => (
                        <button
                          key={color.value}
                          onClick={() => toggleColor(color.value)}
                          className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${selectedColors.includes(color.value) ? 'border-accent p-1' : 'border-transparent'}`}
                          title={color.name}
                        >
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: color.value }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-border opacity-50" />

                  {/* Price */}
                  <div className="space-y-5">
                    <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-warm">Price Range</h4>
                    <div className="flex justify-between text-[11px] font-bold text-muted">
                      <span>₹200</span>
                      <span>₹3,499</span>
                    </div>
                    <input 
                      type="range" 
                      min="200" 
                      max="3499" 
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <p className="text-xl font-bold text-warm font-sans">
                      Under ₹{priceRange.toLocaleString()}
                    </p>
                  </div>

                  {/* Reset Button */}
                  <div className="pt-4 pb-10 lg:pb-0">
                    <button 
                      onClick={() => {
                        setAvailability([]);
                        setSelectedSizes([]);
                        setPriceRange(3499);
                        setSelectedColors([]);
                      }}
                      className="w-full py-5 bg-[#1a1714] text-white rounded-xl text-[10px] font-bold tracking-[3px] uppercase hover:bg-accent transition-colors shadow-lg"
                    >
                      Clear All
                    </button>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${showFilters ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-x-8 gap-y-12`}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-32 text-center border-2 border-dashed border-border rounded-3xl">
                  <p className="font-bebas text-2xl text-muted tracking-widest uppercase mb-4">No pieces match your search.</p>
                  <button 
                    onClick={() => {
                      setAvailability([]);
                      setSelectedSizes([]);
                      setPriceRange(3499);
                      setSelectedColors([]);
                    }}
                    className="text-accent underline text-[10px] font-bold tracking-[2px] uppercase"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryListing;
