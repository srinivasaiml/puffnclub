"use client";

import React, { useEffect, useRef, useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');

#pn-hero {
  --parchment : #f5f0e8;
  --ink       : #1a1510;
  --accent    : #c8460d;
  --gold      : #c9a84c;
  --muted     : #8a7e72;
  --stroke    : rgba(26,21,16,0.12);
}

/* ── shell ── */
#pn-hero {
  position        : relative;
  height          : 90vh;
  min-height      : 580px;
  background      : var(--parchment);
  overflow        : hidden;
  display         : flex;
  flex-direction  : column;
  align-items     : center;
  justify-content : center;
  font-family     : 'DM Sans', sans-serif;
  box-sizing      : border-box;
}
#pn-hero *, #pn-hero *::before, #pn-hero *::after { box-sizing: border-box; }

/* ── grain ── */
#pn-hero::before {
  content         : '';
  position        : absolute;
  inset           : 0;
  z-index         : 4;
  pointer-events  : none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
}

/* ── top stripe ── */
#pn-hero .stripe {
  position   : absolute;
  top: 0; left: 0; right: 0;
  height     : 3px;
  z-index    : 20;
  background : repeating-linear-gradient(
    90deg,
    var(--accent) 0 38px, transparent 38px 56px,
    var(--gold) 56px 76px, transparent 76px 96px
  );
}

/* ══ BG SLIDESHOW ══ */
#pn-hero .bg-wrap { position:absolute; inset:0; z-index:1; }
#pn-hero .bg-slide {
  position:absolute; inset:0;
  background-size:cover; background-position:center;
  opacity:0; transition:opacity 1.6s ease;
}
#pn-hero .bg-slide.active { opacity:1; animation:kbZoom 9s ease forwards; }
#pn-hero .bg-slide::after {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse at 50% 40%,
    rgba(245,240,232,0.92) 0%,
    rgba(245,240,232,0.80) 45%,
    rgba(245,240,232,0.52) 100%
  );
}

/* ══ ORBS ══ */
#pn-hero .orb {
  position:absolute; border-radius:50%;
  filter:blur(100px); pointer-events:none; z-index:2;
  animation:orbPulse 10s ease-in-out infinite alternate;
}
#pn-hero .orb-1 { width:min(600px,80vw); height:min(600px,80vw); background:rgba(200,70,13,0.13); top:-15%; left:-10%; }
#pn-hero .orb-2 { width:min(500px,70vw); height:min(500px,70vw); background:rgba(201,168,76,0.10); bottom:-15%; right:-10%; animation-delay:-5s; }

/* ══ FLOATING SIDE CARDS — desktop only ══ */
#pn-hero .float-cards {
  position:absolute; inset:0; z-index:2; pointer-events:none;
}
#pn-hero .fcard {
  position:absolute; overflow:hidden;
  border:3px solid rgba(245,240,232,0.92);
  box-shadow:0 16px 50px rgba(26,21,16,0.24);
  border-radius:2px; opacity:0;
}
#pn-hero .fcard img { width:100%; height:100%; object-fit:cover; filter:saturate(0.85) contrast(1.05); display:block; }

/* Desktop card positions */
#pn-hero .fcard-0 {
  width:148px; height:196px; top:8%; left:3%;
  animation: fcIn 1s cubic-bezier(.22,1,.36,1) .8s forwards, floatA 7s ease-in-out 1.8s infinite alternate;
}
#pn-hero .fcard-1 {
  width:122px; height:164px; top:52%; left:5%;
  animation: fcIn 1s cubic-bezier(.22,1,.36,1) 1s forwards, floatB 9s ease-in-out 2s infinite alternate;
}
#pn-hero .fcard-2 {
  width:144px; height:192px; top:6%; right:3%;
  animation: fcIn 1s cubic-bezier(.22,1,.36,1) 1.1s forwards, floatA 8s ease-in-out 2.1s infinite alternate;
}
#pn-hero .fcard-3 {
  width:114px; height:152px; top:54%; right:4%;
  animation: fcIn 1s cubic-bezier(.22,1,.36,1) 1.3s forwards, floatB 10s ease-in-out 2.3s infinite alternate;
}

/* ── Hide side cards on mobile, show bottom strip instead ── */
@media (max-width: 640px) {
  #pn-hero .float-cards { display:none; }
}

/* ══ MOBILE IMAGE STRIP ══ */
#pn-hero .mobile-strip {
  display: none;
  position: absolute;
  bottom: 52px; /* above slide dots */
  left: 0; right: 0;
  z-index: 8;
  gap: 8px;
  padding: 0 16px;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
  opacity: 0;
  animation: fadeIn .8s ease 1.2s forwards;
}
@media (max-width: 640px) {
  #pn-hero .mobile-strip { display:flex; }
}
#pn-hero .ms-card {
  overflow:hidden;
  border:2.5px solid rgba(245,240,232,0.9);
  box-shadow:0 8px 24px rgba(26,21,16,0.2);
  border-radius:2px;
  flex-shrink:0;
}
#pn-hero .ms-card img { width:100%; height:100%; object-fit:cover; display:block; filter:saturate(0.85); }
#pn-hero .ms-card:nth-child(1) { width:72px; height:96px;  transform:rotate(-4deg); }
#pn-hero .ms-card:nth-child(2) { width:80px; height:108px; transform:rotate(1deg); margin-bottom:6px; }
#pn-hero .ms-card:nth-child(3) { width:72px; height:96px;  transform:rotate(4deg); }

/* ══ DISCOUNT BADGE — FIXED: ring + text are siblings inside one wrapper that DOESN'T spin ══ */
#pn-hero .disc-badge {
  position  : absolute;
  top       : 52px;
  right     : 20px;
  z-index   : 15;
  width     : 88px;
  height    : 88px;
  opacity   : 0;
  animation : fadeIn .6s ease 2s forwards;
  /* The wrapper itself does NOT spin */
}
@media (min-width: 768px) {
  #pn-hero .disc-badge { width:108px; height:108px; top:48px; right:48px; }
}
/* The ring BEHIND spins */
#pn-hero .disc-badge .ring {
  position        : absolute;
  inset           : 0;
  border-radius   : 50%;
  border          : 2px dashed rgba(245,240,232,0.5);
  background      : var(--accent);
  box-shadow      : 0 10px 40px rgba(200,70,13,0.55);
  animation       : spinSlow 12s linear infinite;
}
/* The text is centered absolutely and does NOT spin */
#pn-hero .disc-badge .badge-text {
  position        : absolute;
  inset           : 0;
  display         : flex;
  flex-direction  : column;
  align-items     : center;
  justify-content : center;
  color           : #fff;
  line-height     : 1.1;
  pointer-events  : none;
}
#pn-hero .disc-badge .pct {
  font-family     : 'Bebas Neue', sans-serif;
  font-size       : 32px;
  display         : block;
  line-height     : 1;
}
@media (min-width: 768px) {
  #pn-hero .disc-badge .pct { font-size: 38px; }
}
#pn-hero .disc-badge .off {
  font-size       : 8px;
  letter-spacing  : 2.5px;
  text-transform  : uppercase;
  opacity         : 0.88;
  margin-top      : 2px;
}

/* ══ CENTRE CONTENT ══ */
#pn-hero .center {
  position   : relative;
  z-index    : 10;
  text-align : center;
  width      : 100%;
  max-width  : 1000px;
  padding    : 0 20px;
  /* on mobile push up a bit to leave room for bottom image strip */
}
@media (max-width: 640px) {
  #pn-hero .center { margin-bottom: 148px; padding: 0 14px; }
}

/* eyebrow */
#pn-hero .eyebrow {
  display:flex; align-items:center; justify-content:center; gap:12px;
  margin-bottom:18px;
  opacity:0; animation:fadeUp .7s cubic-bezier(.22,1,.36,1) .35s forwards;
}
#pn-hero .eyebrow .bar { width:28px; height:2px; background:var(--accent); flex-shrink:0; }
#pn-hero .eyebrow span {
  font-size:10px; letter-spacing:5px; text-transform:uppercase; color:var(--accent); font-weight:600;
}
@media (max-width:640px) {
  #pn-hero .eyebrow span { font-size:8px; letter-spacing:4px; }
  #pn-hero .eyebrow .bar { width:20px; }
}

/* ── TITLE ── */
#pn-hero .title-wrap { position:relative; display:inline-block; margin-bottom:18px; }
#pn-hero .title-wrap .bg-logo {
  position:absolute; inset:-20% -5%; width:110%; height:140%;
  object-fit:contain; opacity:0.05; filter:grayscale(1);
  pointer-events:none; user-select:none;
}
#pn-hero .hero-title {
  font-family   : 'Bebas Neue', sans-serif;
  font-size     : clamp(64px, 16vw, 180px);
  line-height   : 0.88;
  letter-spacing: 4px;
  color         : var(--ink);
  text-shadow   :
    3px 3px 0   rgba(200,70,13,0.15),
    7px 7px 0   rgba(200,70,13,0.07),
    0  20px 55px rgba(200,70,13,0.13);
  -webkit-text-stroke: 1px rgba(26,21,16,0.06);
  display       : block;
  position      : relative;
  z-index       : 1;
}
@keyframes letterUp {
  from { opacity:0; transform:translateY(26px) scaleY(1.08); }
  to   { opacity:1; transform:translateY(0) scaleY(1); }
}

/* accent underline */
#pn-hero .title-underline {
  display:block; height:3px;
  background:linear-gradient(90deg, transparent, var(--accent), var(--gold), transparent);
  transform-origin:left; transform:scaleX(0);
  animation:lineGrow .8s cubic-bezier(.22,1,.36,1) 1.4s forwards;
  margin-top:6px;
}

/* sub */
#pn-hero .sub {
  font-size:clamp(13px,2vw,17px); color:var(--muted); font-weight:300;
  letter-spacing:2px; max-width:520px; margin:0 auto 30px; line-height:1.7;
  opacity:0; animation:fadeUp .7s cubic-bezier(.22,1,.36,1) 1.6s forwards;
}

/* CTA */
#pn-hero .cta-row {
  display:flex; flex-direction:column; gap:12px;
  align-items:center; justify-content:center;
  opacity:0; animation:fadeUp .7s cubic-bezier(.22,1,.36,1) 1.9s forwards;
}
@media (min-width:480px) { #pn-hero .cta-row { flex-direction:row; } }

#pn-hero .btn-primary {
  background:var(--ink); color:var(--parchment); border:none; cursor:pointer;
  font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:4px;
  text-transform:uppercase; font-weight:600; padding:16px 38px;
  transition:background .25s, transform .2s, box-shadow .2s;
  box-shadow:0 6px 24px rgba(26,21,16,0.18);
}
#pn-hero .btn-primary:hover { background:var(--accent); transform:translateY(-3px); box-shadow:0 12px 36px rgba(200,70,13,0.35); }

#pn-hero .btn-outline {
  background:transparent; border:1px solid rgba(26,21,16,0.35); cursor:pointer;
  font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:4px;
  text-transform:uppercase; font-weight:400; color:var(--ink); padding:16px 38px;
  transition:border-color .2s, transform .2s, color .2s;
}
#pn-hero .btn-outline:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-3px); }

/* ── Slide dots ── */
#pn-hero .slide-dots {
  position:absolute; bottom:16px; left:50%; transform:translateX(-50%);
  z-index:16; display:flex; gap:8px;
  opacity:0; animation:fadeIn .5s ease 2.5s forwards;
}
#pn-hero .sdot {
  width:26px; height:3px; background:rgba(26,21,16,0.2);
  border:none; cursor:pointer; padding:0;
  transition:background .3s, width .3s;
}
#pn-hero .sdot.act { background:var(--accent); width:38px; }

/* ── Scroll hint (hidden mobile) ── */
#pn-hero .scroll-hint {
  position:absolute; bottom:20px; right:22px; z-index:16;
  display:flex; flex-direction:column; align-items:center; gap:5px;
  opacity:0; animation:fadeIn .5s ease 2.8s forwards;
}
@media (max-width:640px) { #pn-hero .scroll-hint { display:none; } }
#pn-hero .scroll-hint span { font-size:7px; letter-spacing:3px; text-transform:uppercase; color:var(--muted); writing-mode:vertical-rl; }
#pn-hero .scroll-hint .arrow { width:1px; height:36px; background:linear-gradient(to bottom, var(--accent), transparent); animation:arrowDrop 1.4s ease-in-out 3s infinite; }

/* ══ KEYFRAMES ══ */
@keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes fcIn     { from{opacity:0;transform:scale(.86)} to{opacity:1;transform:scale(1)} }
@keyframes kbZoom   { from{transform:scale(1.08)} to{transform:scale(1)} }
@keyframes spinSlow { to{transform:rotate(360deg)} }
@keyframes orbPulse { from{transform:translate(0,0) scale(1)} to{transform:translate(24px,30px) scale(1.06)} }
@keyframes floatA   { from{transform:rotate(-6deg) translateY(0)} to{transform:rotate(-6deg) translateY(-16px)} }
@keyframes floatB   { from{transform:rotate(5deg) translateY(0)}  to{transform:rotate(5deg)  translateY(-13px)} }
@keyframes lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes arrowDrop{ 0%,100%{opacity:.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(8px)} }
`;

function useStyle(id: string, css: string) {
  useEffect(() => {
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, []);
}

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1400&q=80",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1400&q=80",
  "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1400&q=80",
];

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
  "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
];

const MOBILE_CARDS = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80",
  "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=300&q=80",
];

const TITLE = "PUFFNCLUB";

export default function Hero() {
  useStyle("pn-css", CSS);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [slide, setSlide] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!titleRef.current) return;
    titleRef.current.innerHTML = "";
    TITLE.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.style.cssText = "display:inline-block;opacity:0;";
      span.style.animation = `letterUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards ${0.5 + i * 0.075}s`;
      span.textContent = char;
      titleRef.current!.appendChild(span);
    });
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => setSlide(p => (p + 1) % BG_IMAGES.length), 5500);
    return () => clearInterval(timer.current);
  }, []);

  const goSlide = (i: number) => {
    setSlide(i);
    clearInterval(timer.current);
    timer.current = setInterval(() => setSlide(p => (p + 1) % BG_IMAGES.length), 5500);
  };

  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pn-hero">
      <div className="stripe" />

      {/* BG slideshow */}
      <div className="bg-wrap">
        {BG_IMAGES.map((src, i) => (
          <div key={i} className={`bg-slide${i === slide ? " active" : ""}`}
            style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>

      {/* Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Desktop floating cards */}
      <div className="float-cards">
        {CARD_IMAGES.map((src, i) => (
          <div key={i} className={`fcard fcard-${i}`}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      {/* ── DISCOUNT BADGE (fixed: ring spins, text stays still) ── */}
      <div className="disc-badge">
        <div className="ring" />
        <div className="badge-text">
          <span className="pct">15%</span>
          <span className="off">Flat Off</span>
        </div>
      </div>

      {/* Centre content */}
      <div className="center">
        <div className="eyebrow">
          <div className="bar" />
          <span>Premium Men's T-Shirts</span>
          <div className="bar" />
        </div>

        <div className="title-wrap">
          <img src="/puffn-logo.svg" className="bg-logo" alt="" aria-hidden />
          <h1 ref={titleRef} className="hero-title" suppressHydrationWarning>
            {TITLE}
          </h1>
          <span className="title-underline" />
        </div>

        <p className="sub">Where Comfort Meets Street Culture</p>

        <div className="cta-row">
          <button className="btn-primary" onClick={() => scroll("collection")} suppressHydrationWarning>Shop Now</button>
          <button className="btn-outline" onClick={() => scroll("values")} suppressHydrationWarning>Our Story</button>
        </div>
      </div>

      {/* Mobile-only bottom image strip */}
      <div className="mobile-strip">
        {MOBILE_CARDS.map((src, i) => (
          <div key={i} className="ms-card">
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Slide dots */}
      <div className="slide-dots">
        {BG_IMAGES.map((_, i) => (
          <button key={i} className={`sdot${i === slide ? " act" : ""}`}
            onClick={() => goSlide(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="arrow" />
      </div>
    </section>
  );
}