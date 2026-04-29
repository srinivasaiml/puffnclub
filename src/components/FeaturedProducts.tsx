"use client";

import { motion } from "framer-motion";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { products } from "@/lib/data";
import { useStore } from "@/context/StoreProvider";

export default function FeaturedProducts() {
  const { setSelectedProduct } = useStore();
  
  // Select 3 specific apparel items for the featured section
  const featured = [
    products.find(p => p.id === 101), // Classic Black Hoodie
    products.find(p => p.id === 201), // Stealth Bomber Jacket
    products.find(p => p.id === 401), // Midnight Oversized Tee
  ].filter(Boolean) as any[];

  return (
    <section className="py-24 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <h2 className="text-[10px] font-bold text-accent uppercase tracking-[5px] mb-4">The Selection</h2>
            <h3 className="text-5xl md:text-7xl font-bebas tracking-tighter text-warm">Season Highlights</h3>
          </div>
          <button 
            onClick={() => window.location.href = '/collection'}
            className="text-[10px] font-bold tracking-[3px] uppercase hover:text-accent transition-colors mt-8 md:mt-0 flex items-center gap-2 group border-b border-warm/20 pb-2"
          >
            Explore All 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-card rounded-2xl mb-6">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=90&w=1000";
                  }}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-lg">
                    <ShoppingCartIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl flex justify-between items-center shadow-xl">
                      <span className="text-[10px] font-black uppercase tracking-[2px] text-black">Quick View</span>
                      <div className="flex gap-1">
                        <StarIcon className="w-3 h-3 text-black" />
                        <span className="text-[10px] font-bold text-black">{product.rating}</span>
                      </div>
                   </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-[2px] mb-1">{product.category}</p>
                    <h4 className="text-2xl font-bebas tracking-wide text-warm">{product.name}</h4>
                  </div>
                  <span className="text-xl font-bold text-warm">{product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
