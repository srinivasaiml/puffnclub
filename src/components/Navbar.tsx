"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useStore } from '@/context/StoreProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, setIsCartOpen, setIsSearchOpen, wishlist, showToast, user } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'COLLECTION', href: '/collection' },
    { name: 'REVIEW', href: '/#testimonials' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${(isScrolled || isMenuOpen) ? 'bg-[#ffffff] py-4 border-b border-black/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-[1100] group flex items-center gap-4">
          <img src="/kite-logo.png" alt="" className="w-9 h-9 brightness-0" />
          <span className="font-bebas text-2xl md:text-3xl tracking-[3px] text-accent2 group-hover:text-warm transition-colors uppercase">VORTEX</span>
        </Link>


        {/* Desktop Links - Adjusted for visibility */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[12px] font-black tracking-[2px] uppercase text-text/80 hover:text-accent2 transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-7 relative z-[1100]">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-warm text-xl hover:text-accent transition-colors hidden sm:block p-2"
            suppressHydrationWarning
          >
            <i className="fas fa-search"></i>
          </button>

          <Link
            href={user ? "/profile" : "/auth"}
            className="text-warm text-xl hover:text-accent transition-colors p-2 hidden sm:block"
            suppressHydrationWarning
          >
            <i className={user ? "fas fa-user-check" : "far fa-user"}></i>
            {user && <span className="ml-2 text-[10px] font-bold tracking-widest hidden lg:inline">{user.username}</span>}
          </Link>

          <button
            onClick={() => showToast("Wishlist coming soon!")}
            className="text-warm text-xl relative hover:text-accent transition-colors p-2 hidden sm:block"
            suppressHydrationWarning
          >
            <i className="far fa-heart"></i>
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-bg text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-bg">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="text-warm text-xl relative hover:text-accent transition-colors p-2"
            suppressHydrationWarning
          >
            <i className="fas fa-shopping-bag"></i>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-bg text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse border border-bg">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-warm text-2xl w-10 h-10 flex items-center justify-center hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            suppressHydrationWarning
          >
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars-staggered"}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#f5f0e8] z-[1050] transition-all duration-700 cubic-bezier(0.85, 0, 0.15, 1) ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="h-full flex flex-col justify-center items-center p-10 gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`font-bebas text-5xl md:text-7xl tracking-[4px] text-warm hover:text-accent transition-all ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${i * 0.1 + 0.3}s` }}
            >
              {link.name}
            </Link>
          ))}

          <div className={`mt-12 flex gap-10 items-center ${isMenuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-800`}>
            <a href="https://www.instagram.com/vortex_official?igsh=MTZmdDZybzJxaWRpaQ==" target="_blank" rel="noopener noreferrer" className="text-muted text-2xl hover:text-accent"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-muted text-2xl hover:text-accent"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-muted text-2xl hover:text-accent"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
