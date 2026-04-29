"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
  count?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, href, count }) => {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-2xl bg-card border border-border aspect-[4/5]">
      <motion.div 
        className="h-full w-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000";
          }}
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
        <p className="text-accent text-[10px] tracking-[3px] uppercase mb-2 font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          Explore Collection
        </p>
        <h3 className="font-bebas text-3xl md:text-4xl tracking-[2px] text-white leading-none mb-1">
          {title}
        </h3>
        {count && (
          <p className="text-white/60 text-[11px] tracking-[1px] uppercase">
            {count} Items Available
          </p>
        )}
      </div>
      
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <i className="fas fa-arrow-right text-white text-xs"></i>
      </div>
    </Link>
  );
};

export default CategoryCard;
