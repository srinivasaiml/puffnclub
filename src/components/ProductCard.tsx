"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/lib/data';
import { useStore } from '@/context/StoreProvider';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, setIsCartOpen } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#fdfbfa] border border-[#d6d0c4] mb-4">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 left-4 z-10 bg-[#c49a6c] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
            {product.discount}
          </div>
        )}

        {/* Product Image */}
        <div 
          className="h-full w-full cursor-pointer"
          onClick={() => setSelectedProduct(product)}
        >
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.sizes[0], product.colors[0], 1);
              setIsCartOpen(true);
            }}
            className="w-full bg-[#1a1714] text-white py-4 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold tracking-[2px] uppercase hover:bg-[#c49a6c] transition-colors shadow-xl"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[2px] uppercase text-[#7a7168] font-bold">
            {product.category}
          </p>
          <div className="flex items-center gap-1">
            <Star size={10} className="fill-[#c49a6c] text-[#c49a6c]" />
            <span className="text-[10px] font-bold text-[#1a1714]">{product.rating}</span>
          </div>
        </div>
        
        <h3 
          className="font-bebas text-xl tracking-[1.5px] text-[#1a1714] transition-colors group-hover:text-[#c49a6c] cursor-pointer"
          onClick={() => setSelectedProduct(product)}
        >
          {product.name}
        </h3>
        
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-[#1a1714] font-sans">
            {product.price}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-[#7a7168] line-through font-sans opacity-50">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
