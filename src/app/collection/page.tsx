"use client";

import React, { useEffect, useRef, useState } from 'react';
import { products, Product } from '@/lib/data';
import { useStore } from '@/context/StoreProvider';

const CollectionPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setSelectedProduct, showToast } = useStore();

  // States for filters
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availability, setAvailability] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([200, 1999]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

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
  }, [categoryFilter, availability, selectedSizes, priceRange]);

  const categories = ["All", "Oversized Fit", "Regular Fit", "Street Fit", "Vintage Fit", "Slim Fit", "Graphic Fit"];
  const sizes = ["Extra Small", "Small", "Medium", "Large", "Extra Large", "Double XL"];
  const sizeMap: Record<string, string> = {
    "Extra Small": "XS",
    "Small": "S",
    "Medium": "M",
    "Large": "L",
    "Extra Large": "XL",
    "Double XL": "XXL"
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleAvailability = (status: string) => {
    setAvailability(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const filteredProducts = products.filter(p => {
    // Category Filter
    if (categoryFilter !== "All" && p.category !== categoryFilter) return false;

    // Price Filter
    if (p.priceNum < priceRange[0] || p.priceNum > priceRange[1]) return false;

    // Size Filter (If any selected)
    if (selectedSizes.length > 0) {
      const mappedSelected = selectedSizes.map(s => sizeMap[s]);
      if (!p.sizes.some(size => mappedSelected.includes(size))) return false;
    }

    // Availability Filter
    if (availability.length > 0) {
      // Mocking availability: IDs divisible by 5 are "Out of Stock" for demo
      const isOut = p.id % 5 === 0;
      if (availability.includes("In Stock") && isOut) return false;
      if (availability.includes("Out of Stock") && !isOut) return false;
    }

    return true;
  });

  return (
    <main className="pt-[100px] md:pt-[140px] pb-[100px] min-h-screen bg-bg" ref={containerRef}>
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto">
        <div className="mb-10 reveal">
          <p className="text-accent text-[11px] tracking-[5px] uppercase mb-3">Our Entire Flock</p>
          <h1 className="font-bebas text-[clamp(40px,8vw,80px)] tracking-[4px] text-warm leading-none">The Full Collection<span className="text-accent">.</span></h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filter */}
          <aside className={`lg:w-[280px] flex-shrink-0 space-y-8 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
            {/* Availability */}
            <div className="reveal">
              <h4 className="font-bold text-warm mb-4 tracking-wide">Availability</h4>
              <div className="space-y-3">
                {["In Stock", "Out of Stock"].map(status => (
                  <label key={status} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${availability.includes(status) ? 'bg-accent border-accent' : 'border-border group-hover:border-accent'}`}
                      onClick={() => toggleAvailability(status)}
                    >
                      {availability.includes(status) && <i className="fas fa-check text-[10px] text-bg"></i>}
                    </div>
                    <span className="text-[13px] text-text/80 group-hover:text-warm transition-colors">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-border opacity-30" />

            {/* Size */}
            <div className="reveal">
              <h4 className="font-bold text-warm mb-4 tracking-wide">Size</h4>
              <div className="space-y-3">
                {sizes.map(size => (
                  <label key={size} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${selectedSizes.includes(size) ? 'bg-accent border-accent' : 'border-border group-hover:border-accent'}`}
                      onClick={() => toggleSize(size)}
                    >
                      {selectedSizes.includes(size) && <i className="fas fa-check text-[10px] text-bg"></i>}
                    </div>
                    <span className="text-[13px] text-text/80 group-hover:text-warm transition-colors">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-border opacity-30" />

            {/* Colour */}
            <div className="reveal">
              <h4 className="font-bold text-warm mb-4 tracking-wide">Colour</h4>
              <div className="flex flex-wrap gap-3">
                {["#7A1C1C", "#1C3D7A", "#1C7A4D", "#7A7A1C", "#1A1A1A", "#EDE8E0"].map(color => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-accent transition-all hover:scale-110"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            <hr className="border-border opacity-30" />

            {/* Price */}
            <div className="reveal">
              <h4 className="font-bold text-warm mb-4 tracking-wide">Price</h4>
              <div className="flex justify-between text-[12px] text-muted mb-4">
                <span>Min ₹200</span>
                <span>Max ₹1999</span>
              </div>
              <input
                type="range"
                min="200"
                max="1999"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-accent h-1 bg-border rounded-lg appearance-none cursor-pointer mb-4"
              />
              <div className="font-bold text-warm text-lg">
                ₹ {priceRange[0]} - ₹ {priceRange[1]}
              </div>

              <button
                className="w-full mt-6 py-3 bg-card border border-border text-warm font-bold text-[13px] tracking-[1px] rounded-lg hover:bg-accent hover:text-bg transition-all"
                onClick={() => {
                  // In a real app this would trigger the filter, here we already state-manage
                  showToast("Filters Applied");
                }}
              >
                Apply
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-10 reveal">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`p-[8px_20px] rounded-full font-space text-[12px] font-bold tracking-[1px] transition-all duration-300 border ${categoryFilter === cat ? 'bg-accent text-bg border-accent' : 'bg-transparent text-muted border-border hover:border-accent hover:text-accent'}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((p, i) => (
                <div
                  key={p.id}
                  className="reveal group cursor-pointer"
                  onClick={() => setSelectedProduct(p)}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border mb-4 bg-card">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=90&w=1000";
                      }}
                    />

                    {p.id % 5 === 0 && (
                      <span className="absolute top-3 right-3 bg-bg/80 backdrop-blur-md text-muted p-[4px_10px] rounded-md text-[9px] font-bold tracking-[1px] uppercase">
                        Out of Stock
                      </span>
                    )}

                    {p.discount && (
                      <span className="absolute top-3 left-3 bg-discount text-white p-[4px_10px] rounded-md text-[10px] font-bold tracking-[1px]">
                        {p.discount}
                      </span>
                    )}

                    <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 hidden md:flex items-center justify-center group-hover:opacity-100">
                      <span className="bg-warm text-bg p-[12px_28px] rounded-xl text-[12px] font-bold tracking-[2px] uppercase translate-y-5 transition-transform duration-300 group-hover:translate-y-0">Quick View</span>
                    </div>
                  </div>

                  <div className="px-1">
                    <p className="text-[10px] tracking-[2px] uppercase text-accent2 mb-1.5 font-bold">{p.category}</p>
                    <h3 className="font-bebas text-xl tracking-[1.5px] text-warm mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{p.price}</span>
                      {p.oldPrice && <span className="text-muted line-through text-xs">{p.oldPrice}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-[100px] text-center">
                <i className="fas fa-search text-5xl text-muted mb-4 opacity-20"></i>
                <p className="text-muted">No products match your filters.</p>
                <button
                  className="mt-4 text-accent underline text-sm"
                  onClick={() => {
                    setCategoryFilter("All");
                    setAvailability([]);
                    setSelectedSizes([]);
                    setPriceRange([200, 1999]);
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CollectionPage;
