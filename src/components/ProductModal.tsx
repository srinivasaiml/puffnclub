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
      setSelectedSize(selectedProduct.sizes[1] || selectedProduct.sizes[0] || "");
      setSelectedColor(selectedProduct.colors[0] || "");
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

  const handleBuyNow = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, selectedSize, selectedColor, qty);
    }
    // In a real app, this would route directly to checkout
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

          {/* DESKTOP: Advanced E-commerce Layout (Amazon style) */}
          <motion.div
            key="modal-desktop"
            initial={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="hidden lg:flex fixed top-1/2 left-1/2 w-[min(1250px,96vw)] h-[min(850px,94vh)] bg-bg z-[2001] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex-row border border-border"
          >
            <button className="absolute top-4 right-6 text-muted hover:text-warm text-2xl z-[2002] transition-colors" onClick={() => setSelectedProduct(null)}>
              <i className="fas fa-times"></i>
            </button>

            {/* Left: Image Gallery */}
            <div className="w-[45%] bg-card p-6 flex gap-4 border-r border-border h-full relative">
              {/* Vertical Thumbnails */}
              <div className="w-20 flex flex-col gap-3 overflow-y-auto custom-scroll pr-2">
                {p.images.map((img, i) => (
                  <button
                    key={i}
                    className={`w-full aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === img ? 'border-accent shadow-[0_0_10px_rgba(196,154,108,0.3)] scale-105' : 'border-border/50 opacity-60 hover:opacity-100 hover:border-border'}`}
                    onMouseEnter={() => setActiveImg(img)}
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative rounded-xl overflow-hidden bg-bg2 flex items-center justify-center border border-border/50 group cursor-crosshair">
                <img
                  src={activeImg || p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=90&w=1000";
                  }}
                />
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-[55%] p-8 overflow-y-auto custom-scroll bg-bg relative">
              <DesktopDetails p={p} selectedSize={selectedSize} setSelectedSize={setSelectedSize} selectedColor={selectedColor} setSelectedColor={setSelectedColor} qty={qty} setQty={setQty} handleAddToCart={handleAddToCart} handleBuyNow={handleBuyNow} />
            </div>
          </motion.div>

          {/* MOBILE: full-screen bottom sheet */}
          <motion.div
            key="modal-mobile"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed inset-0 bg-bg z-[2001] flex flex-col h-[100dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky top bar with close */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-border bg-bg z-10 shadow-sm">
              <div className="flex items-center gap-2 text-[10px] text-muted font-bold tracking-widest uppercase">
                <span>VORTEX</span>
                <i className="fas fa-chevron-right text-[8px]"></i>
                <span className="text-accent">{p.category}</span>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-warm transition-all"
                onClick={() => setSelectedProduct(null)}
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto pb-32">
              <MobileDetails p={p} activeImg={activeImg} setActiveImg={setActiveImg} selectedSize={selectedSize} setSelectedSize={setSelectedSize} selectedColor={selectedColor} setSelectedColor={setSelectedColor} qty={qty} setQty={setQty} />
            </div>

            {/* Sticky Action buttons at bottom */}
            <div className="fixed bottom-0 left-0 right-0 px-4 py-3 border-t border-border bg-bg shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-20 flex gap-3">
              <button
                className="flex-1 bg-card border border-border text-warm rounded-xl font-bold tracking-[1px] uppercase text-[12px] h-12 hover:bg-border transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button
                className="flex-1 bg-accent text-bg rounded-xl font-bold tracking-[1px] uppercase text-[12px] h-12 hover:bg-accent2 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_5px_20px_rgba(196,154,108,0.2)]"
                onClick={handleBuyNow}
              >
                <i className="fas fa-bolt"></i> Buy Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DesktopDetails = ({ p, selectedSize, setSelectedSize, selectedColor, setSelectedColor, qty, setQty, handleAddToCart, handleBuyNow }: any) => {
  const discountPercent = p.oldPriceNum ? Math.round(((p.oldPriceNum - p.priceNum) / p.oldPriceNum) * 100) : 0;

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="text-[11px] text-muted font-bold tracking-[2px] uppercase mb-3 flex items-center gap-2">
        <span className="hover:text-warm cursor-pointer">Home</span>
        <i className="fas fa-chevron-right text-[8px]"></i>
        <span className="hover:text-warm cursor-pointer">{p.category}</span>
        <i className="fas fa-chevron-right text-[8px]"></i>
        <span className="text-accent truncate">{p.name}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-warm leading-tight mb-2 font-bebas tracking-[1px]">{p.name}</h1>
      
      {/* Rating */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
             <i key={i} className={`fas fa-star text-[13px] ${i < Math.floor(p.rating) ? 'text-[#f5c518]' : 'text-border'}`}></i>
          ))}
        </div>
        <span className="text-accent text-[13px] hover:underline cursor-pointer">{p.rating} out of 5</span>
        <span className="text-muted text-[13px] border-l border-border pl-3 hover:text-accent cursor-pointer">{p.reviews} ratings</span>
      </div>

      <hr className="border-border/60 my-4" />

      {/* Price Block */}
      <div className="mb-6">
        {discountPercent > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">Deal of the Day</span>
          </div>
        )}
        <div className="flex items-baseline gap-4 mb-1">
          {discountPercent > 0 && <span className="text-3xl font-light text-[#cc0c39]">-{discountPercent}%</span>}
          <span className="text-4xl font-bold text-warm">{p.price}</span>
        </div>
        {p.oldPrice && (
          <div className="text-muted text-[13px]">
            M.R.P.: <span className="line-through">{p.oldPrice}</span>
          </div>
        )}
        <div className="text-muted text-[12px] mt-1">Inclusive of all taxes</div>
      </div>

      <hr className="border-border/60 my-5" />

      {/* Service Icons */}
      <div className="flex justify-between gap-2 mb-6 text-center max-w-lg">
        {[
          { icon: 'fa-undo', text: '7 Days Replacement' },
          { icon: 'fa-truck', text: 'Free Delivery' },
          { icon: 'fa-money-bill-wave', text: 'Pay on Delivery' },
          { icon: 'fa-shield-alt', text: 'Secure Transaction' },
          { icon: 'fa-medal', text: 'Top Brand' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center w-20">
             <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center mb-2">
               <i className={`fas ${item.icon} text-accent text-sm`}></i>
             </div>
             <span className="text-accent text-[10px] leading-tight hover:underline cursor-pointer">{item.text}</span>
          </div>
        ))}
      </div>

      <hr className="border-border/60 my-5" />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Selections */}
          <div className="space-y-5 mb-8">
            {/* Colors */}
            {p.colors && p.colors.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warm font-bold text-[13px]">Color: <span className="text-muted font-normal">{selectedColor || p.colors[0]}</span></span>
                </div>
                <div className="flex gap-3">
                  {p.colors.map((color: string, i: number) => (
                    <button
                      key={i}
                      className={`w-10 h-10 rounded-full border-[3px] transition-all ${selectedColor === color ? 'border-accent scale-110 shadow-[0_0_10px_rgba(196,154,108,0.5)]' : 'border-card hover:border-border'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {p.sizes && p.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-warm font-bold text-[13px]">Size: <span className="text-muted font-normal">{selectedSize}</span></span>
                  <span className="text-accent text-[11px] hover:underline cursor-pointer"><i className="fas fa-ruler mr-1"></i>Size Chart</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {p.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`min-w-[3rem] h-10 px-3 rounded-lg border flex items-center justify-center font-bold text-[13px] transition-all ${selectedSize === size ? 'bg-accent/10 border-accent text-accent shadow-sm' : 'bg-card border-border text-warm hover:border-muted hover:bg-border/30'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <span className="text-warm font-bold text-[13px] block mb-2">Quantity:</span>
              <div className="inline-flex items-center bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                <button className="w-10 h-10 text-warm hover:bg-border transition-colors flex items-center justify-center" onClick={() => setQty((q: number) => Math.max(1, q - 1))}><i className="fas fa-minus text-[10px]"></i></button>
                <span className="w-12 text-center font-bold text-warm text-[14px] bg-bg">{qty}</span>
                <button className="w-10 h-10 text-warm hover:bg-border transition-colors flex items-center justify-center" onClick={() => setQty((q: number) => Math.min(10, q + 1))}><i className="fas fa-plus text-[10px]"></i></button>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mb-6">
            <h3 className="font-bold text-warm text-lg mb-3 border-b border-border pb-2">Product Details</h3>
            <div className="grid grid-cols-1 gap-2 text-[13px]">
              {p.details.map(([label, val]: any, i: number) => (
                <div key={i} className="flex pb-1">
                  <span className="w-1/3 text-muted font-bold">{label}</span>
                  <span className="w-2/3 text-warm">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About this item */}
          <div>
            <h3 className="font-bold text-warm text-lg mb-2 border-b border-border pb-2">About this item</h3>
            <ul className="list-disc pl-5 text-warm text-[13px] space-y-2 leading-relaxed">
              <li>{p.desc}</li>
              <li>Designed for the modern lifestyle with premium materials and exquisite craftsmanship.</li>
              <li>Care Instructions: Machine wash cold with like colors, tumble dry low.</li>
              <li>Fit Type: {p.details.find((d: any) => d[0] === 'Fit')?.[1] || 'Regular'}</li>
            </ul>
          </div>
        </div>

        {/* Buttons (Amazon style sticky-like sidebar container on large screens) */}
        <div className="w-[280px] flex-shrink-0">
          <div className="border border-border/60 rounded-xl p-5 bg-card/50 shadow-sm sticky top-0">
            <div className="text-2xl font-bold text-warm mb-3">{p.price}</div>
            <div className="text-[#007600] text-[13px] font-bold mb-4">In stock</div>
            
            <div className="flex flex-col gap-3 mb-4">
              <button
                className="w-full bg-[#ffd814] text-black rounded-full font-bold text-[14px] py-3.5 hover:bg-[#f7ca00] transition-colors shadow-sm flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="w-full bg-[#ffa41c] text-black rounded-full font-bold text-[14px] py-3.5 hover:bg-[#fa8900] transition-colors shadow-sm flex items-center justify-center gap-2"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
            
            <div className="text-[12px] flex items-center gap-2 text-muted mb-2">
              <i className="fas fa-lock text-accent"></i> Secure transaction
            </div>
            <div className="text-[12px] flex justify-between mb-1">
              <span className="text-muted">Ships from</span>
              <span className="text-warm">VORTEX</span>
            </div>
            <div className="text-[12px] flex justify-between">
              <span className="text-muted">Sold by</span>
              <span className="text-warm">VORTEX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileDetails = ({ p, activeImg, setActiveImg, selectedSize, setSelectedSize, selectedColor, setSelectedColor, qty, setQty }: any) => {
  const discountPercent = p.oldPriceNum ? Math.round(((p.oldPriceNum - p.priceNum) / p.oldPriceNum) * 100) : 0;

  return (
    <div>
      {/* Image Gallery */}
      <div className="relative w-full aspect-[4/5] bg-card overflow-hidden">
        <img
          src={activeImg || p.images[0]}
          alt={p.name}
          className="w-full h-full object-cover"
        />
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-md">
            -{discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {p.images.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto border-b border-border hide-scrollbar bg-card">
          {p.images.map((img: string, i: number) => (
            <button
              key={i}
              className={`w-14 aspect-[3/4] rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === img ? 'border-accent shadow-sm' : 'border-border/50 opacity-70'}`}
              onClick={() => setActiveImg(img)}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="p-4">
        {/* Title & Rating */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <span className="text-accent text-[11px] tracking-[2px] uppercase font-bold">Brand</span>
        </div>
        <h2 className="text-xl font-bold text-warm leading-tight mb-2">{p.name}</h2>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fas fa-star text-[11px] ${i < Math.floor(p.rating) ? 'text-[#f5c518]' : 'text-border'}`}></i>
            ))}
          </div>
          <span className="text-accent text-[12px]">{p.rating}</span>
          <span className="text-muted text-[12px]">({p.reviews})</span>
        </div>

        {/* Price Block */}
        <div className="mb-5 bg-card/30 p-3 rounded-lg border border-border/50">
          <div className="flex items-baseline gap-3 mb-1">
            {discountPercent > 0 && <span className="text-2xl font-light text-[#cc0c39]">-{discountPercent}%</span>}
            <span className="text-3xl font-bold text-warm">{p.price}</span>
          </div>
          {p.oldPrice && (
            <div className="text-muted text-[12px]">
              M.R.P.: <span className="line-through">{p.oldPrice}</span>
            </div>
          )}
          <div className="text-muted text-[11px] mt-1">Inclusive of all taxes</div>
        </div>

        {/* Service Icons */}
        <div className="flex justify-between gap-1 mb-6 text-center border-y border-border/50 py-4">
          {[
            { icon: 'fa-undo', text: '7 Days Return' },
            { icon: 'fa-truck', text: 'Free Delivery' },
            { icon: 'fa-money-bill-wave', text: 'Pay on Delivery' },
            { icon: 'fa-shield-alt', text: 'Secure' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
               <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center mb-1.5">
                 <i className={`fas ${item.icon} text-accent text-[11px]`}></i>
               </div>
               <span className="text-accent text-[9px] leading-tight">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="space-y-5 mb-6">
          {/* Colors */}
          {p.colors && p.colors.length > 0 && (
            <div>
              <span className="text-warm font-bold text-[12px] block mb-2">Color: <span className="text-muted font-normal">{selectedColor || p.colors[0]}</span></span>
              <div className="flex gap-2">
                {p.colors.map((color: string, i: number) => (
                  <button
                    key={i}
                    className={`w-8 h-8 rounded-full border-[2px] ${selectedColor === color ? 'border-accent' : 'border-card'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {p.sizes && p.sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                 <span className="text-warm font-bold text-[12px]">Size: <span className="text-muted font-normal">{selectedSize}</span></span>
                 <span className="text-accent text-[10px]">Size Chart</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((size: string) => (
                  <button
                    key={size}
                    className={`h-9 px-3 rounded-md border text-[12px] font-bold ${selectedSize === size ? 'bg-accent/10 border-accent text-accent' : 'bg-card border-border text-warm'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4">
             <span className="text-warm font-bold text-[12px]">Qty:</span>
             <div className="flex items-center bg-card border border-border rounded-md h-9">
               <button className="w-9 h-full flex items-center justify-center text-warm" onClick={() => setQty((q: number) => Math.max(1, q - 1))}><i className="fas fa-minus text-[10px]"></i></button>
               <span className="w-8 text-center font-bold text-[13px]">{qty}</span>
               <button className="w-9 h-full flex items-center justify-center text-warm" onClick={() => setQty((q: number) => Math.min(10, q + 1))}><i className="fas fa-plus text-[10px]"></i></button>
             </div>
          </div>
        </div>

        {/* Details */}
        <div className="mb-4">
          <h3 className="font-bold text-warm text-[14px] mb-2 border-b border-border pb-1">Product Details</h3>
          <div className="overflow-hidden text-[12px]">
            {p.details.map(([label, val]: any, i: number) => (
              <div key={i} className="flex border-b border-border/50 last:border-0 py-1.5">
                <span className="w-2/5 text-muted font-bold">{label}</span>
                <span className="w-3/5 text-warm">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-bold text-warm text-[14px] mb-2 border-b border-border pb-1">About this item</h3>
          <p className="text-warm text-[12px] leading-relaxed mt-2">{p.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

