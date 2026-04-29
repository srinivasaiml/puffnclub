"use client";

import React from 'react';
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

export default function Home() {
  return (
    <main className="relative bg-bg min-h-screen">
      <Hero />
      
      <div className="bg-black py-4">
        <Marquee items={["Premium Cotton", "Reasonable Prices", "Sustainable Fabric", "Modern Fit", "Handcrafted"]} />
      </div>

      <div className="py-20 bg-bg">
        <FeaturedProducts />
      </div>
      
      <GapSection 
        text="VORTEX ORIGINS" 
        lineWidth="50%"
        images={[]}
      />
      
      <Values />
      
      <GapSection 
        text="LATEST DROPS" 
        lineWidth="70%"
        images={[]}
      />
      
      <Collection />
      
      <div className="bg-black/5 py-4">
        <Marquee 
          reverse 
          items={["New Arrivals", "Best Sellers", "Limited Edition", "Signature Fits", "Free Shipping"]} 
        />
      </div>

      <QueueScroll />
      
      <ExecutiveImpactCarousel />
      
      <GapSection 
        text="COMMUNITY" 
        lineWidth="60%"
        images={[]}
      />
      
      <Testimonials />
      
      <SocialGallery />
      
      <GapSection 
        text="JOIN THE VORTEX" 
        lineWidth="65%"
        images={[]}
      />
      
      <Offers />
    </main>
  );
}
