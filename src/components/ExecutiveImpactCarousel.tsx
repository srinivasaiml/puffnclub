"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/data";
import { useStore } from "@/context/StoreProvider";

gsap.registerPlugin(ScrollTrigger);

interface ProductData {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  prodImg: string;
  modelImg: string;
  originalId: number;
}

// Map real products to the carousel structure
const carouselProducts: ProductData[] = products.slice(0, 15).map((p, idx) => ({
  id: String(p.id),
  title: p.name,
  price: p.price,
  oldPrice: p.oldPrice,
  prodImg: p.images[0] || "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=90&w=1000",
  modelImg: p.images[1] || p.images[0],
  originalId: p.id,
}));

// Fill up to 15
while (carouselProducts.length < 15) {
  const p = products[carouselProducts.length % products.length];
  carouselProducts.push({
    id: `dup-${carouselProducts.length}`,
    title: p.name,
    price: p.price,
    oldPrice: p.oldPrice,
    prodImg: p.images[0],
    modelImg: p.images[1] || p.images[0],
    originalId: p.id,
  });
}

const COL_1_PRODUCTS = carouselProducts.slice(0, 5);
const COL_2_PRODUCTS = carouselProducts.slice(5, 10);
const COL_3_PRODUCTS = carouselProducts.slice(10, 15);

const styles = `
  .executive-carousel {
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font-space), sans-serif;
    margin: 0;
    overflow: hidden;
    position: relative;
    width: 100vw;
  }
  
  .col-scroll-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .col-scroll-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    width: 90vw;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
  }

  @media (max-width: 768px) {
    .col-scroll-container {
      height: auto;
      overflow: visible;
    }
    .col-scroll-grid {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0;
      gap: 5vh;
      align-items: center;
    }
  }

  .col-scroll-column {
    display: flex;
    flex-direction: column;
    gap: 10vw;
    will-change: transform;
    padding: 10vh 0 15vh;
  }

  /* Odd columns (1 and 3) are reverse-scrolled by default in structure */
  .col-scroll-column--odd {
    flex-direction: column-reverse;
  }

  @media (max-width: 768px) {
    .col-scroll-column {
      padding: 2rem 0;
      gap: 5vh;
      transform: none !important;
    }
    .col-scroll-column--odd {
      flex-direction: column;
    }
  }

  .product-card-exec {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20vw;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    margin: 0;
  }

  @media (max-width: 768px) {
    .product-card-exec {
      width: 90vw;
      margin-bottom: 10vh;
    }
  }

  .col-scroll__img-wrapper {
    position: relative;
    aspect-ratio: 0.8;
    width: 100%;
    overflow: hidden;
    border: 1px solid var(--border);
    padding: 1rem;
    background: var(--card);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .col-scroll__img-wrapper img {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
  }

  .product-img { z-index: 1; opacity: 1; filter: saturate(0.8); }
  .model-img { z-index: 2; opacity: 0; }

  .product-card-exec:hover .product-img { opacity: 0; }
  .product-card-exec:hover .model-img { opacity: 1; }

  .product-card__info {
    position: absolute;
    bottom: 2rem;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 3;
    padding: 0 1.5rem;
    transition: all 0.4s ease;
  }
  
  .product-card-exec:hover .product-card__info {
    opacity: 0;
    transform: translateY(10px);
  }

  .product-card__title {
    margin: 0 0 0.5rem;
    font-family: var(--font-bebas);
    font-size: clamp(1.1rem, 1.5vw, 1.6rem);
    color: var(--warm);
    line-height: 1.1;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  }
  
  .product-card__price-wrapper {
    font-family: var(--font-space);
    font-size: 1rem;
    color: var(--accent);
  }

  .product-card__btn {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    z-index: 4;
    opacity: 0;
    background: var(--accent);
    color: var(--bg);
    border: none;
    padding: 0.8rem 1.5rem;
    font-family: var(--font-bebas);
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.4s ease;
  }
  
  .product-card-exec:hover .product-card__btn {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .carousel-header {
    text-align: center;
    padding: 80px 20px 40px;
    z-index: 10;
    position: relative;
    background: var(--bg);
  }

  .carousel-title {
    font-family: var(--font-bebas);
    font-size: clamp(40px, 8vw, 90px);
    color: var(--warm);
    line-height: 1;
  }
`;

export default function ExecutiveImpactCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          }
        }
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        // Pin section and animate columns
        // We use a timeline for precise parallax control matching original speeds
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%", // Increased for better feel
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          }
        });

        // Column 1 and 3 move up
        tl.to([col1Ref.current, col3Ref.current], {
          y: "-40%",
          ease: "none"
        }, 0);

        // Column 2 moves down
        tl.fromTo(col2Ref.current, 
          { y: "-20%" },
          { y: "20%", ease: "none" }, 
        0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section ref={sectionRef} id="featured-drops" className="executive-carousel">
        <div className="carousel-header" ref={headerRef}>
          <p className="section-label">Curated Selection</p>
          <h2 className="carousel-title">Featured Drops<span className="text-accent">.</span></h2>
        </div>

        <div className="col-scroll-container">
          <div className="col-scroll-grid">
            {/* Column 1 (Odd) */}
            <div ref={col1Ref} className="col-scroll-column col-scroll-column--odd">
              {COL_1_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
              {COL_1_PRODUCTS.map((prod) => (
                <ProductCard key={`${prod.id}-clone`} product={prod} />
              ))}
            </div>

            {/* Column 2 (Even) */}
            <div ref={col2Ref} className="col-scroll-column">
              {COL_2_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
              {COL_2_PRODUCTS.map((prod) => (
                <ProductCard key={`${prod.id}-clone`} product={prod} />
              ))}
            </div>

            {/* Column 3 (Odd) */}
            <div ref={col3Ref} className="col-scroll-column col-scroll-column--odd">
              {COL_3_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
              {COL_3_PRODUCTS.map((prod) => (
                <ProductCard key={`${prod.id}-clone`} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }: { product: ProductData }) {
  const { setSelectedProduct } = useStore();
  
  const handleClick = () => {
    const originalProduct = products.find(p => p.id === product.originalId);
    if (originalProduct) setSelectedProduct(originalProduct);
  };

  return (
    <figure className="product-card-exec" onClick={handleClick}>
      <div className="col-scroll__img-wrapper">
        <img className="product-img" src={product.prodImg} alt={product.title} />
        <img className="model-img" src={product.modelImg} alt={`Model wearing ${product.title}`} />
        
        <div className="product-card__info">
          <h3 className="product-card__title">{product.title}</h3>
          <div className="product-card__price-wrapper">
            <span className="product-card__price">{product.price}</span>
          </div>
        </div>

        <button className="product-card__btn">View Details +</button>
      </div>
    </figure>
  );
}
