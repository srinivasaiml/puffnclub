"use client";

import { motion } from "framer-motion";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const products = [
  {
    id: 1,
    name: "Aura Studio Pods",
    category: "True Wireless",
    price: "$199",
    rating: 4.8,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Aura Pro Max",
    category: "Over-Ear ANC",
    price: "$349",
    rating: 4.9,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    name: "Aura Sport X",
    category: "Bone Conduction",
    price: "$149",
    rating: 4.7,
    color: "from-rose-500 to-orange-400",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2">Featured Collection</h2>
            <h3 className="text-3xl md:text-5xl font-bold">New Arrivals</h3>
          </div>
          <button className="text-sm font-medium hover:text-indigo-400 transition-colors mt-4 md:mt-0 flex items-center gap-1 group">
            View All Products 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative h-[450px] glass-card overflow-hidden flex flex-col"
            >
              {/* Card Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Top Icons */}
              <div className="flex justify-between items-start p-6 z-10 relative">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-md border border-white/10">
                  {product.category}
                </span>
                <button className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors text-white hover:text-accent">
                  <HeartIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Product Image Placeholder */}
              <div className="flex-1 flex items-center justify-center relative z-10">
                <motion.div 
                  className={`w-40 h-40 rounded-full bg-gradient-to-tr ${product.color} shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500`}
                >
                  {/* Mock Product Details */}
                  <div className="w-20 h-24 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 transform -rotate-12 shadow-inner"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-white/30 blur-sm rounded-full transform rotate-45"></div>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-6 relative z-10 bg-black/20 backdrop-blur-md border-t border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xl font-bold">{product.name}</h4>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    {product.rating}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-white">{product.price}</span>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform">
                    <ShoppingCartIcon className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
