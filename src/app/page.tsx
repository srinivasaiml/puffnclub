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


export default function Home() {
  return (
    <main className="relative bg-bg min-h-screen">
      <Hero />
      
      <Marquee items={["Premium Cotton", "Reasonable Prices", "Sustainable Fabric", "Modern Fit", "Handcrafted"]} />
      
      <GapSection 
        text="Why Puffnclub" 
        images={[]}
      />
      
      <Values />
      
      <GapSection 
        text="The Lineup" 
        lineWidth="70%"
        images={[]}
      />
      
      <QueueScroll />
      
      <Marquee 
        reverse 
        items={["New Arrivals", "Best Sellers", "Limited Edition", "Signature Fits", "Free Shipping"]} 
      />
      
      <ExecutiveImpactCarousel />

      
      <GapSection 
        text="Real Talk" 
        lineWidth="60%"
        images={[]}
      />
      
      <Testimonials />
      
      <SocialGallery />
      
      <GapSection 
        text="Don't Miss Out" 
        lineWidth="65%"
        images={[]}
      />
      
      <Offers />
    </main>
  );
}
