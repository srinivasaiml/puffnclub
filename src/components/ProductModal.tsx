"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreProvider';
import { Product } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore();
  const [activeImg, setActiveImg] = useState(selectedProduct?.images[0] || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImg(selectedProduct.images[0]);
      setSelectedSize(selectedProduct.sizes[1] || selectedProduct.sizes[0]);
      setSelectedColor(selectedProduct.colors[0]);
      setQty(1);
    }
  }, [selectedProduct]);

  // Lock body scroll when open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, selectedSize, selectedColor, qty);
    }
    setSelectedProduct(null);
  };

  const p = selectedProduct;

  return (
    <AnimatePresence>
      {p && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000]"
            onClick={() => setSelectedProduct(null)}
          />

          {/* DESKTOP: centered modal */}
          <motion.div
            key="modal-desktop"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="hidden md:flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1100px,96vw)] max-h-[92vh] bg-bg z-[2001] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.6)] flex-row"
          >
            {/* Left: Images */}
            <div className="w-1/2 bg-bg2 p-8 flex flex-col justify-center border-r border-border">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-card border border-border mb-4">
                <img
                  src={activeImg || p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=90&w=1000";
                  }}
                />
                {p.discount && (
                  <div className="absolute top-4 left-4 bg-discount text-white text-[10px] font-black p-[4px_10px] rounded-lg tracking-[1px] uppercase">
                    {p.discount}
                  </div>
                )}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
                {p.images.map((img, i) => (
                  <button
                    key={i}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === img ? 'border-accent scale-105' : 'border-border opacity-50 hover:opacity-100'}`}
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-1/2 p-10 overflow-y-auto custom-scroll">
              <ModalDetails p={p} selectedSize={selectedSize} setSelectedSize={setSelectedSize} qty={qty} setQty={setQty} handleAddToCart={handleAddToCart} onClose={() => setSelectedProduct(null)} />
            </div>
          </motion.div>

          {/* MOBILE: full-screen bottom sheet */}
          <motion.div
            key="modal-mobile"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed inset-0 bg-bg z-[2001] flex flex-col h-[100dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky top bar with close */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-border bg-bg z-10">
              <div>
                <p className="text-accent text-[9px] tracking-[3px] uppercase font-bold">{p.category}</p>
                <h2 className="font-bebas text-2xl tracking-[1px] text-warm leading-tight">{p.name}</h2>
              </div>
              <button
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-warm hover:border-white/30 transition-all"
                onClick={() => setSelectedProduct(null)}
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Image */}
              <div className="relative w-full aspect-[4/3] bg-card overflow-hidden">
                <img
                  src={activeImg || p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=90&w=1000";
                  }}
                />
                {p.discount && (
                  <span className="absolute top-3 left-3 bg-discount text-white text-[9px] font-black p-[3px_8px] rounded-md tracking-[1px] uppercase">
                    {p.discount}
                  </span>
                )}
              </div>

              {/* Thumbnail strip */}
              {p.images.length > 1 && (
                <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-border">
                  {p.images.map((img, i) => (
                    <button
                      key={i}
                      className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === img ? 'border-accent' : 'border-border opacity-50'}`}
                      onClick={() => setActiveImg(img)}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Price row */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                <span className="text-2xl font-black text-warm">{p.price}</span>
                {p.oldPrice && <span className="text-base text-muted line-through">{p.oldPrice}</span>}
                <span className="ml-auto text-green-400 text-[11px] font-bold border border-green-400/30 px-2 py-0.5 rounded-full bg-green-400/5">In Stock</span>
              </div>

              {/* Size */}
              <div className="px-4 py-4 border-b border-border">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-warm text-[12px] tracking-[1px] uppercase">Select Size</span>
                  <span className="text-accent text-[10px] uppercase font-bold tracking-[1px]">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`h-11 px-4 min-w-[50px] rounded-xl border-2 font-bold text-sm transition-all active:scale-90 ${selectedSize === size ? 'bg-accent border-accent text-bg shadow-lg' : 'bg-card border-border text-muted hover:border-accent'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty + Add to Cart */}
              <div className="px-4 py-4 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-bold text-warm text-[12px] tracking-[1px] uppercase">Quantity</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-card border-2 border-border rounded-xl overflow-hidden">
                    <button className="w-12 h-12 text-warm hover:bg-border transition-colors text-lg font-bold" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span className="w-10 text-center font-bold text-warm">{qty}</span>
                    <button className="w-12 h-12 text-warm hover:bg-border transition-colors text-lg font-bold" onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
                  </div>
                  <span className="text-muted text-[11px]">Max 10 per order</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-3 gap-3 mx-4 my-4 bg-bg2/50 p-4 rounded-2xl border border-border">
                <div className="text-center">
                  <i className="fas fa-undo text-accent text-base mb-1.5 block"></i>
                  <p className="text-[9px] font-bold text-warm uppercase tracking-[0.5px]">7 Days Returns</p>
                </div>
                <div className="text-center border-x border-border/50">
                  <i className="fas fa-truck text-accent text-base mb-1.5 block"></i>
                  <p className="text-[9px] font-bold text-warm uppercase tracking-[0.5px]">COD Available</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-box-open text-accent text-base mb-1.5 block"></i>
                  <p className="text-[9px] font-bold text-warm uppercase tracking-[0.5px]">Express Delivery</p>
                </div>
              </div>

              {/* Description */}
              <div className="px-4 pb-4">
                <h4 className="font-bebas text-xl tracking-[2px] text-warm mb-2">The Story</h4>
                <p className="text-[13px] text-muted leading-relaxed italic">"{p.desc}"</p>
              </div>

              {/* Product Info Table */}
              <div className="px-4 pb-4">
                <h4 className="font-bebas text-xl tracking-[2px] text-warm mb-3">Product Specifications</h4>
                <div className="border border-border rounded-xl overflow-hidden text-[12px]">
                  {p.details.map(([label, val], i, arr) => (
                    <div key={label} className={`grid grid-cols-2 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                      <div className="p-3 bg-bg2 font-bold text-muted uppercase">{label}</div>
                      <div className="p-3 text-warm">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              {p.reviewList && p.reviewList.length > 0 && (
                <div className="px-4 pb-4">
                  <h4 className="font-bebas text-xl tracking-[2px] text-warm mb-3">Customer Feedback</h4>
                  <div className="space-y-3">
                    {p.reviewList.map((rev, i) => (
                      <div key={i} className="bg-bg2/30 border border-border p-3 rounded-xl">
                        <div className="flex justify-between mb-1">
                          <span className="font-bold text-[11px] text-warm">{rev.name}</span>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, idx) => (
                              <i key={idx} className={`fas fa-star text-[8px] ${idx < rev.stars ? 'text-accent' : 'text-muted'}`}></i>
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] text-muted leading-tight">{rev.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom spacer so content not hidden behind sticky button */}
              <div className="h-24" />
            </div>

            {/* Sticky Add to Cart button at bottom */}
            <div className="flex-shrink-0 px-4 py-4 border-t border-border bg-bg shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
              <button
                className="w-full bg-accent text-bg rounded-xl font-black tracking-[2px] uppercase text-[13px] py-4 hover:bg-accent2 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(196,154,108,0.3)]"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-bag"></i> Add to Bag — {p.price}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Reusable details block for desktop
const ModalDetails = ({
  p, selectedSize, setSelectedSize, qty, setQty, handleAddToCart, onClose
}: {
  p: Product;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  qty: number;
  setQty: (q: any) => void;
  handleAddToCart: () => void;
  onClose: () => void;
}) => (
  <div>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-accent text-[11px] tracking-[4px] uppercase font-bold mb-1">{p.category}</p>
        <h2 className="font-bebas text-4xl tracking-[2px] text-warm">{p.name}</h2>
      </div>
      <button className="text-muted hover:text-warm text-xl" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
    </div>

    <div className="flex items-center gap-4 mb-6">
      <span className="text-3xl font-black text-warm">{p.price}</span>
      {p.oldPrice && <span className="text-xl text-muted line-through">{p.oldPrice}</span>}
      <span className="text-green-400 text-[12px] font-bold border border-green-400/30 px-2 py-0.5 rounded-full bg-green-400/5">In Stock</span>
    </div>

    <hr className="border-border opacity-30 mb-8" />

    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-warm text-[13px] tracking-[1px] uppercase">Select Size</span>
        <span className="text-accent text-[11px] underline cursor-pointer uppercase font-bold tracking-[1px]">Size Guide</span>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {p.sizes.map((size: string) => (
          <button
            key={size}
            className={`h-12 rounded-xl border-2 font-bold transition-all ${selectedSize === size ? 'bg-accent border-accent text-bg shadow-lg scale-105' : 'bg-card border-border text-muted hover:border-accent'}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>

    <div className="flex gap-4 mb-10">
      <div className="flex items-center bg-card border-2 border-border rounded-xl overflow-hidden">
        <button className="w-12 h-14 text-warm hover:bg-border transition-colors" onClick={() => setQty((q: number) => Math.max(1, q - 1))}>−</button>
        <span className="w-8 text-center font-bold text-warm">{qty}</span>
        <button className="w-12 h-14 text-warm hover:bg-border transition-colors" onClick={() => setQty((q: number) => Math.min(10, q + 1))}>+</button>
      </div>
      <button
        className="flex-1 bg-accent text-bg rounded-xl font-bold tracking-[2px] uppercase text-sm hover:bg-accent2 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3 shadow-xl"
        onClick={handleAddToCart}
      >
        <i className="fas fa-shopping-bag"></i> Add To Bag
      </button>
    </div>

    <div className="grid grid-cols-3 gap-6 mb-10 bg-bg2/50 p-6 rounded-2xl border border-border">
      <div className="text-center">
        <i className="fas fa-undo text-accent text-xl mb-3 block"></i>
        <p className="text-[10px] font-bold text-warm uppercase tracking-[1px]">7 Days Returns</p>
      </div>
      <div className="text-center border-x border-border/50">
        <i className="fas fa-truck text-accent text-xl mb-3 block"></i>
        <p className="text-[10px] font-bold text-warm uppercase tracking-[1px]">Cash On Delivery</p>
      </div>
      <div className="text-center">
        <i className="fas fa-box-open text-accent text-xl mb-3 block"></i>
        <p className="text-[10px] font-bold text-warm uppercase tracking-[1px]">Express Delivery</p>
      </div>
    </div>

    <div className="mb-10">
      <h4 className="font-bebas text-2xl tracking-[2px] text-warm mb-4">The Story</h4>
      <p className="text-muted italic leading-relaxed mb-6">"{p.desc}"</p>
      
      <h4 className="font-bebas text-2xl tracking-[2px] text-warm mb-4">Product Information</h4>
      <div className="border border-border rounded-xl overflow-hidden">
        {p.details.map(([label, val], i, arr) => (
          <div key={label} className={`grid grid-cols-2 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
            <div className="p-4 bg-bg2 text-[12px] font-bold text-muted uppercase">{label}</div>
            <div className="p-4 text-[12px] text-warm">{val}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProductModal;
