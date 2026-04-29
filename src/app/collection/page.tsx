"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/data";

const CollectionPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setDynamicProducts(data))
      .catch(err => console.error("Failed to fetch dynamic products:", err));
  }, []);

  const categories = useMemo(() => {
    const allProducts = [...products, ...dynamicProducts];
    
    const getCount = (keys: string[]) => {
      return allProducts.filter(p => keys.includes(p.category)).length;
    };

    const getCategoryImages = (keys: string[], defaultImg: string) => {
      const prods = allProducts.filter(p => keys.includes(p.category));
      const imgs = prods.flatMap(p => p.images);
      return imgs.length > 0 ? imgs : [defaultImg];
    };

    return [
      {
        title: "T-Shirts",
        subtitle: "Everyday Essentials",
        images: getCategoryImages(["Oversized Fit", "Regular Fit", "Slim Fit", "Vintage Fit"], "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000"),
        href: "/collection/tshirts",
        count: getCount(["Oversized Fit", "Regular Fit", "Slim Fit", "Vintage Fit"]),
        featured: true
      },
      {
        title: "Printed",
        subtitle: "Wearable Art",
        images: getCategoryImages(["Graphic Fit"], "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000"),
        href: "/collection/printed-tshirts",
        count: getCount(["Graphic Fit"]),
        featured: false
      },
      {
        title: "Shirts",
        subtitle: "Smart Casuals",
        images: getCategoryImages(["Shirts"], "https://images.unsplash.com/photo-1596755094514-f87034a26cc1?auto=format&fit=crop&q=80&w=1000"),
        href: "/collection/shirts",
        count: getCount(["Shirts"]),
        featured: false
      },
      {
        title: "Jackets",
        subtitle: "Outer Layer",
        images: getCategoryImages(["Jackets"], "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000"),
        href: "/collection/jackets",
        count: getCount(["Jackets"]),
        featured: false
      },
      {
        title: "Hoodies",
        subtitle: "Stay Cozy",
        images: getCategoryImages(["Hoodies"], "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000"),
        href: "/collection/hoodies",
        count: getCount(["Hoodies"]),
        featured: true
      }
    ];
  }, [dynamicProducts]);

  const letterVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.04,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const titleText = "COLLECTIONS";
  const subtitleText = "Curated categories for every occasion";

  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#1a1714] overflow-hidden">

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16 md:pb-24 overflow-hidden">
        {/* Background Grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10">
          <svg width="100%" height="100%">
            <filter id="grain"><feTurbulence baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0e8] via-transparent to-[#f5f0e8]/60 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8]/80 via-transparent to-transparent z-[2]" />

        {/* Faint Grid Lines */}
        <div className="absolute inset-0 z-[1] opacity-[0.08]">
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-black" />
          <div className="absolute top-0 bottom-0 left-2/4 w-px bg-black" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-black" />
          <div className="absolute left-0 right-0 top-1/3 h-px bg-black" />
          <div className="absolute left-0 right-0 top-2/3 h-px bg-black" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 md:px-16 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            <motion.span
              variants={{
                hidden: { width: 0 },
                visible: { width: 60, transition: { duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } }
              }}
              className="block h-[2px] bg-[#c49a6c]"
            />
          </motion.div>

          <div className="overflow-hidden" style={{ perspective: "600px" }}>
            <h1 className="font-bebas text-[clamp(50px,12vw,160px)] leading-[0.85] tracking-[2px]">
              {titleText.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-[#6b6b6b] text-sm md:text-base tracking-[3px] uppercase mt-6 font-sans"
          >
            {subtitleText}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 right-6 md:right-16 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] tracking-[4px] uppercase text-[#4a4a4a] rotate-90 origin-center translate-y-6">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-[#c49a6c] to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORY COUNT BAR ===== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-b border-black/[0.06] py-5 px-6 md:px-16"
      >
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <span className="text-[10px] tracking-[4px] uppercase text-[#7a7168]">
            {categories.length} Categories
          </span>
          <span className="text-[10px] tracking-[4px] uppercase text-[#7a7168]">
            {categories.reduce((a, c) => a + c.count, 0)} Products
          </span>
        </div>
      </motion.section>

      {/* ===== BENTO GRID ===== */}
      <section className="px-6 md:px-16 py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[340px]">

            {/* Card 1 — Featured (spans 7 cols, 2 rows) */}
            <BentoCard
              category={categories[0]}
              index={0}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              className="md:col-span-7 md:row-span-2"
            />

            {/* Card 2 — Small (spans 5 cols) */}
            <BentoCard
              category={categories[1]}
              index={1}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              className="md:col-span-5"
            />

            {/* Card 3 — Small (spans 5 cols) */}
            <BentoCard
              category={categories[2]}
              index={2}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              className="md:col-span-5"
            />

            {/* Card 4 — Medium (spans 5 cols) */}
            <BentoCard
              category={categories[3]}
              index={3}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              className="md:col-span-5"
            />

            {/* Card 5 — Featured (spans 7 cols) */}
            <BentoCard
              category={categories[4]}
              index={4}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              className="md:col-span-7"
            />

          </div>
        </div>
      </section>

      {/* ===== BOTTOM EDITORIAL BANNER ===== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 md:px-16 pb-20 md:pb-32"
      >
        <div className="max-w-[1400px] mx-auto border-t border-black/[0.06] pt-16 md:pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <p className="text-[#c49a6c] text-[10px] tracking-[5px] uppercase mb-4">New Drops Weekly</p>
              <h2 className="font-bebas text-[clamp(32px,5vw,64px)] leading-[0.9] tracking-[1px] text-[#1a1714]">
                Can&apos;t find<br />what you need?
              </h2>
            </div>
            <div className="md:text-right">
              <p className="text-[#7a7168] text-sm leading-relaxed mb-8 max-w-sm md:ml-auto">
                We release new styles every week. Join the list to get early access to limited drops and exclusive pieces.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-black/[0.15] px-8 py-4 text-[10px] tracking-[4px] uppercase hover:bg-[#1a1714] hover:text-[#f5f0e8] transition-all duration-500 group text-[#1a1714]"
              >
                Get in Touch
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

    </main>
  );
};


/* ===== BENTO CARD COMPONENT ===== */
interface BentoCardProps {
  category: {
    title: string;
    subtitle: string;
    images: string[];
    href: string;
    count: number;
    featured: boolean;
  };
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  className: string;
}

function BentoCard({ category, index, hoveredIndex, setHoveredIndex, className }: BentoCardProps) {
  const isHovered = hoveredIndex === index;
  const anyHovered = hoveredIndex !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`relative overflow-hidden group cursor-pointer rounded-sm border border-white/[0.04] ${className}`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <Link href={category.href} className="absolute inset-0 z-20" />

      {/* Image */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1,
          filter: anyHovered && !isHovered ? "brightness(0.5)" : "brightness(0.7)"
        }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <img
          src={category.images[0]}
          alt={category.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1]" />

      {/* Corner Accent Line */}
      <motion.div
        animate={{
          width: isHovered ? 60 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 h-[1px] bg-[#c49a6c] z-[3]"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[3]">
        {/* Index Number */}
        <motion.span
          animate={{ opacity: isHovered ? 1 : 0.15 }}
          transition={{ duration: 0.4 }}
          className="block font-bebas text-[48px] md:text-[64px] leading-none -mb-2 text-white/20"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Title */}
        <motion.h3
          animate={{
            y: isHovered ? -4 : 0,
            letterSpacing: isHovered ? "6px" : "3px"
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-bebas text-[28px] md:text-[40px] leading-none tracking-[3px] uppercase text-white"
        >
          {category.title}
        </motion.h3>

        {/* Subtitle + Count */}
        <div className="flex items-center justify-between mt-3">
          <motion.span
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] tracking-[3px] uppercase text-white/70"
          >
            {category.subtitle}
          </motion.span>

          <motion.span
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-[10px] tracking-[3px] uppercase text-white flex items-center gap-2"
          >
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.span>
        </div>

        {/* Product Count Pill */}
        <motion.div
          animate={{
            scale: isHovered ? 1 : 0.9,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
          className="absolute top-6 right-6 z-[3] border border-white/20 px-3 py-1 rounded-full"
        >
          <span className="text-[9px] tracking-[3px] uppercase text-white/80">{category.count} items</span>
        </motion.div>
      </div>

      {/* Hover Border Glow */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-sm border border-[#c49a6c]/30 pointer-events-none z-[4]"
      />
    </motion.div>
  );
}

export default CollectionPage;