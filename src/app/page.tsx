"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import GapSection from "@/components/GapSection";
import Values from "@/components/Values";
import QueueScroll from "@/components/QueueScroll";
import Collection from "@/components/Collection";
import Testimonials from "@/components/Testimonials";
import SocialGallery from "@/components/SocialGallery";
import Offers from "@/components/Offers";
import ExecutiveImpactCarousel from "@/components/ExecutiveImpactCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";

const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-150px" },
  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
};

export default function Home() {
  return (
    <main className="relative bg-bg min-h-screen">
      <Hero />
      
      <div className="bg-black py-4">
        <Marquee items={["Premium Cotton", "Reasonable Prices", "Sustainable Fabric", "Modern Fit", "Handcrafted"]} />
      </div>

      <motion.div {...fadeInUp} className="py-20 bg-bg">
        <FeaturedProducts />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <GapSection 
          text="VORTEX ORIGINS" 
          lineWidth="50%"
          images={[]}
        />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <Values />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <GapSection 
          text="LATEST DROPS" 
          lineWidth="70%"
          images={[]}
        />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <Collection />
      </motion.div>
      
      <div className="bg-black/5 py-4">
        <Marquee 
          reverse 
          items={["New Arrivals", "Best Sellers", "Limited Edition", "Signature Fits", "Free Shipping"]} 
        />
      </div>

      <motion.div {...fadeInUp}>
        <QueueScroll />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <ExecutiveImpactCarousel />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <GapSection 
          text="COMMUNITY" 
          lineWidth="60%"
          images={[]}
        />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <Testimonials />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <SocialGallery />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <GapSection 
          text="JOIN THE VORTEX" 
          lineWidth="65%"
          images={[]}
        />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <Offers />
      </motion.div>
    </main>
  );
}
