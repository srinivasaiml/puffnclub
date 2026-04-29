"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Hoodies", icon: "fas fa-hoodie", href: "/collection/hoodies" },
  { name: "T-Shirts", icon: "fas fa-tshirt", href: "/collection/tshirts" },
  { name: "Jackets", icon: "fas fa-vest", href: "/collection/jackets" },
  { name: "Shirts", icon: "fas fa-shirt", href: "/collection/shirts" },
  { name: "Printed", icon: "fas fa-palette", href: "/collection/printed-tshirts" },
  { name: "Shop All", icon: "fas fa-shopping-bag", href: "/collection/all" },
];

export default function Categories() {
  return (
    <section className="py-20 bg-black/20 backdrop-blur-sm border-y border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <Link key={cat.name} href={cat.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center justify-center p-6 glass-card cursor-pointer hover:border-accent transition-colors group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <i className={`${cat.icon} text-2xl text-warm group-hover:text-accent transition-colors`}></i>
                </div>
                <span className="font-medium text-sm text-warm group-hover:text-accent transition-colors">{cat.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
