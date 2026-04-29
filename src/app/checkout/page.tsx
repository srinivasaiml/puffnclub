"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import Link from "next/link";

const PROJECT_STYLES = `
.output {
  align-self: center;
  background: inherit;
  border-radius: 100px;
  padding: 0 12px 0 10px;
  height: 36px;
  width: 100%;
  max-width: 350px;
  position: relative;
  top: -140px;
}

.output .cover {
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  border-radius: 100px;
  clip-path: inset(0 0 0 0 round 100px);
  background: #f5f0e8;
  transition: filter 1000ms cubic-bezier(0, 0, 0, 1);
  filter: blur(5px);
}

.output .cover::after {
  content: "";
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
  border-radius: 100px;
  position: absolute;
  background: inherit;
  opacity: 0.5;
}

.output .wrap-colors-1,
.output .wrap-colors-2 {
  overflow: hidden;
  border-radius: 100px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.output .wrap-colors-1 {
  opacity: 0.5;
  filter: blur(3px);
}

.output .bg-colors {
  background: conic-gradient(
    transparent 0deg,
    #c49a6c 65deg,
    #e8c8a0 144deg,
    #1a1714 180deg,
    transparent 324deg,
    transparent 360deg
  );
  position: absolute;
  width: 400px;
  height: 400px;
  margin: auto;
  inset: 0;
  left: 50%;
  transform: translateX(-50%) rotate(220deg);
  border-radius: 50%;
  animation: cycle-rotate 3s ease-in-out infinite;
}

.output::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: inherit;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #00000005;
  opacity: 0.4;
  transition: opacity 400ms linear, background-color 400ms linear;
}

.output::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  top: 14px;
  background: linear-gradient(0deg, transparent, rgba(0,0,0,0.2));
  height: 9px;
  mix-blend-mode: multiply;
  border-radius: 100px;
}

@keyframes cycle-rotate {
  from { transform: translateX(-50%) rotate(0deg); }
  to { transform: translateX(-50%) rotate(360deg); }
}

.area {
  --ease-elastic: cubic-bezier(0.5, 2, 0.3, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
}

.area::after {
  pointer-events: none;
  content: "";
  position: absolute;
  top: 66%;
  left: 0;
  right: 0;
  height: 100px;
  width: 30%;
  margin: auto;
  background-color: #c49a6c40;
  filter: blur(2em);
  opacity: 0.7;
  transform: perspective(10px) rotateX(5deg) scale(1, 0.5);
  z-index: 0;
}

.ticket-mask {
  position: absolute;
  overflow: hidden;
  display: flex;
  justify-content: center;
  mask-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, white 20px);
  perspective: 1000px;
  top: calc(50% - 142px);
  left: 0;
  right: 0;
  height: 100%;
  min-height: 1500px;
}

.ticket {
  float: left;
  animation: ticket-move 11s ease-in-out infinite;
  transform: translateY(50px);
  perspective: 3000px;
}

@keyframes ticket-move {
  0% { transform: translateY(-300px); }
  7% { transform: translateY(-250px); }
  12% { transform: translateY(-200px); }
  16% { transform: translateY(-170px); }
  22% { transform: translateY(-100px); }
  27% { transform: translateY(-40px); }
  34%, 88% { transform: translateY(45px); }
  100% { transform: translateY(100%) rotateX(160deg) scale(5); }
}

.ticket:hover .ticket-flip-container {
  transform: rotateY(180deg);
}

.ticket-flip-container {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.float {
  transform-style: preserve-3d;
  pointer-events: none;
  animation: float 3s ease-in-out infinite;
}

.front, .back {
  display: inline-block;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(-180deg);
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}

.icon-cube {
  position: absolute;
  height: 110%;
  z-index: 1;
  top: -3px;
  left: 0;
  right: 0;
  margin: auto;
  mix-blend-mode: overlay;
  opacity: 0.2;
}

.icon-cube path {
  animation-delay: calc(var(--i) * 100ms) !important;
  transform-origin: center;
}

.icon-cube .path-center {
  animation: path-center 3s ease-in-out infinite;
}
@keyframes path-center { 50% { transform: scale(1.3); } }

.icon-cube path:not(.path-center) {
  animation: path-others 1.6s ease-in-out infinite;
}
@keyframes path-others { 50% { transform: translate(1px, 1px); } }

.ticket-body {
  display: block;
  position: relative;
  width: 320px;
  max-width: calc(100vw - 80px);
  margin-bottom: 20px;
  padding: 0;
  border-radius: 7px 7px 0px 0px;
  background-color: white;
  text-align: center;
  background: linear-gradient(to bottom, white, #fdfbfa);
  color: #1a1714;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.ticket-body .bold { font-weight: 800; }

.ticket-body header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 15px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
  text-align: left;
  height: 54px;
}

.ticket-body header .ticket-name {
  font-family: var(--font-bebas);
  font-size: 1.4em;
  line-height: normal;
  align-items: center;
  display: flex;
  gap: 4px;
  letter-spacing: 1px;
}

.ticket-body header span { display: inline-block; }
.ticket-body header time { display: flex; font-size: 12px; }
.ticket-body header .slash { padding: 0 1px; color: rgba(0, 0, 0, 0.4); }

.ticket-body header::after, .ticket-body header::before {
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  background-color: #f5f0e8;
  position: absolute;
  right: -8px;
  border-radius: 50%;
  z-index: 11;
  bottom: -7px;
  border: 1px solid rgba(0,0,0,0.05);
}
.ticket-body header:after { left: -8px; }

.ticket-body .contents {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 180px;
  position: relative;
  pointer-events: all;
}

.ticket-body .contents .event {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  margin-top: -30px;
  font-weight: 600;
}

.ticket-body .contents .event span { display: inline-block; height: 15px; font-family: var(--font-bebas); font-size: 3rem; line-height: 1; color: #1a1714; }
.ticket-body .contents .event span.bold { font-size: 2.18rem; margin-right: -3px; color: #c49a6c; }
.ticket-body .contents .event div:nth-child(2) { font-size: 10px; letter-spacing: 0.3em; margin-left: 6px; color: #7a7168; margin-top: 15px; }

.ticket-body .contents .number { position: absolute; left: 15px; bottom: -6px; font-size: 1.2em; color: #c49a6c; font-weight: bolder; }

.ticket-body:after {
  content: "";
  display: block;
  position: absolute;
  bottom: -16px;
  left: 0;
  background:
    -webkit-linear-gradient(-135deg, #fdfbfa 50%, transparent 50%) 0 50%,
    -webkit-linear-gradient(-45deg, #fdfbfa 50%, transparent 50%) 0 50%,
    transparent;
  background-repeat: repeat-x;
  background-size: 16px 16px, 16px 16px, cover, cover;
  height: 16px;
  width: 100%;
  pointer-events: none;
}

.barcode {
  box-shadow: 1px 0 0 1px, 5px 0 0 1px, 10px 0 0 1px, 11px 0 0 1px, 15px 0 0 1px, 18px 0 0 1px, 22px 0 0 1px, 23px 0 0 1px, 26px 0 0 1px, 30px 0 0 1px, 35px 0 0 1px, 37px 0 0 1px, 41px 0 0 1px, 44px 0 0 1px, 47px 0 0 1px;
  display: inline-block;
  height: 25px;
  width: 0;
  left: 70%;
  position: absolute;
  top: 14px;
}

@keyframes appear { 0% { opacity: 0; transform: translateX(100%); } 100% { opacity: 1; transform: translateY(0); } }

.front header span, .back header span {
  opacity: 0;
  animation: appear 0.5s cubic-bezier(0.5, 2, 0.3, 0.8) forwards calc(var(--i) * 20ms + 400ms);
}

.qrcode { position: absolute; z-index: 1; opacity: 0.8; }
.qrcode img { display: block; height: 140px; mix-blend-mode: multiply; }
.front .qrcode { right: 15px; bottom: 5px; }
.front .qrcode img { height: 60px; }

.reflex { pointer-events: none; position: absolute; inset: 0; bottom: -5px; z-index: 10; overflow: hidden; border-radius: 7px 7px 0 0; }
.reflex::before {
  content: "";
  position: absolute;
  width: 300px;
  background: linear-gradient(to right, rgba(255,255,255,0.4) 10%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.4) 90%);
  top: -10%; bottom: -10%; left: -132%;
  transform: translateX(0) skew(-30deg);
  transition: all 0.7s ease;
}
.float:hover .reflex::before { transform: translate(280%, 0) skew(-30deg); }

.ticket-body::before {
  content: "";
  position: absolute;
  inset: 0;
  mask-image: linear-gradient(white 50%, transparent 100%);
  border-radius: 7px 7px 0px 0px;
  background: radial-gradient(at 30% -5%, #ffffff, #f5f0e8, rgba(255, 255, 255, 0) 25%),
    radial-gradient(at 30% 40%, #ffffff, rgba(255, 255, 255, 0) 20%),
    radial-gradient(at 50% 70%, #ffffff, rgba(255, 255, 255, 0) 30%),
    linear-gradient(75deg, #ffffff 5%, rgba(255, 255, 255, 0), #f5f0e8, rgba(255, 255, 255, 0) 90%);
  opacity: 0.5;
}

.noise {
  position: absolute;
  top: -25px; bottom: -20px; left: 0; right: 0;
  opacity: 0.04;
  mask-image: linear-gradient(transparent 5%, white 30%, white 70%, transparent 95%);
  pointer-events: none;
  z-index: 1;
}
`;

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { cart } = useStore();

  const total = React.useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.priceNum * item.qty), 0);
  }, [cart]);

  const orderId = React.useMemo(() => Math.floor(100000 + Math.random() * 900000), []);

  const formattedDate = React.useMemo(() => {
    const d = new Date();
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString();
    return { day, month, year };
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f0e8] pt-32 pb-24 text-[#1a1714]">
      <style dangerouslySetInnerHTML={{ __html: PROJECT_STYLES }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 shadow-sm border border-[#d6d0c4]">
              {/* Stepper */}
              <div className="flex items-center justify-between mb-12">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-sans tracking-widest ${step >= s ? "bg-[#1a1714] text-white" : "bg-[#f5f0e8] text-[#7a7168]"
                      }`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`w-12 h-[1px] mx-4 ${step > s ? "bg-[#1a1714]" : "bg-[#d6d0c4]"}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <h2 className="text-2xl font-bebas tracking-[3px] text-[#1a1714] mb-8">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="FIRST NAME" className="w-full border border-[#d6d0c4] px-6 py-4 text-[10px] tracking-widest uppercase focus:border-[#c49a6c] outline-none bg-transparent" />
                    <input type="text" placeholder="LAST NAME" className="w-full border border-[#d6d0c4] px-6 py-4 text-[10px] tracking-widest uppercase focus:border-[#c49a6c] outline-none bg-transparent" />
                    <input type="text" placeholder="ADDRESS" className="w-full border border-[#d6d0c4] px-6 py-4 text-[10px] tracking-widest uppercase focus:border-[#c49a6c] outline-none bg-transparent md:col-span-2" />
                    <input type="text" placeholder="CITY" className="w-full border border-[#d6d0c4] px-6 py-4 text-[10px] tracking-widest uppercase focus:border-[#c49a6c] outline-none bg-transparent" />
                    <input type="text" placeholder="POSTAL CODE" className="w-full border border-[#d6d0c4] px-6 py-4 text-[10px] tracking-widest uppercase focus:border-[#c49a6c] outline-none bg-transparent" />
                  </div>
                  <button onClick={() => setStep(2)} className="w-full bg-[#1a1714] text-white text-[10px] font-sans tracking-[0.2em] uppercase py-5 hover:bg-[#c49a6c] transition-colors">
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bebas tracking-[3px] text-[#1a1714]">Payment Method</h2>
                    <div className="flex gap-5 items-center">
                      {/* Visa SVG */}
                      <svg className="h-4 w-auto opacity-40 hover:opacity-100 transition-all cursor-help" viewBox="0 0 500 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M192.41 155.432H156.417L178.932 15.4316H214.925L192.41 155.432ZM360.334 18.0674C351.996 14.7773 340.643 12.1406 327.351 12.1406C291.681 12.1406 266.452 31.0664 266.195 58.2617C265.945 78.3301 284.053 89.5078 297.777 96.2227C311.859 103.113 316.611 107.41 316.551 113.488C316.453 122.785 305.418 126.969 295.148 126.969C279.797 126.969 270.926 124.672 263.156 121.285L256.32 153.227C265.082 157.262 278.43 160.551 292.293 160.551C330.402 160.551 355.223 141.715 355.594 112.566C355.77 80.0352 312.152 77.2969 312.441 60.1016C312.551 54.8945 317.652 49.3086 328.613 47.8867C334.051 47.1953 348.91 46.5117 367.012 54.8633L373.812 23.3438L360.334 18.0674ZM477.586 15.4316H449.695C441.117 15.4316 433.898 20.4102 430.566 28.3242L378.117 155.432H415.867L423.375 134.402H469.375L473.715 155.432H506.43L477.586 15.4316ZM433.375 106.398L452.922 51.5234L464.086 106.398H433.375ZM131.785 15.4316L96.2344 111.453L91.9336 89.2812C84.3438 63.457 60.375 36.7852 34.0469 22.8438L66.7148 155.432H105.152L162.336 15.4316H131.785ZM53.6484 15.4316L0 15.4316L0.746094 18.9375C41.6797 29.3906 68.8047 62.6172 80.0078 92.9375L68.8125 36.0039C66.8633 22.332 57.8594 16.0352 53.6484 15.4316Z" fill="#1a1714"/>
                      </svg>
                      {/* Mastercard SVG */}
                      <svg className="h-7 w-auto opacity-40 hover:opacity-100 transition-all cursor-help" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="12" r="7" fill="#EB001B" />
                        <circle cx="16" cy="12" r="7" fill="#F79E1B" opacity="0.8" />
                      </svg>
                      <span className="text-[10px] font-sans tracking-[3px] text-[#1a1714]/30 uppercase font-bold">SECURE PAYMENT</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-[#c49a6c] p-6 bg-[#c49a6c]/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CreditCard size={100} />
                      </div>
                      
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-4 h-4 rounded-full border-2 border-[#c49a6c] bg-[#c49a6c] flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                          <span className="text-[10px] font-sans tracking-widest uppercase font-bold text-[#1a1714]">Credit / Debit Card</span>
                        </div>

                        <div className="space-y-4">
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="CARD NUMBER" 
                              className="w-full border-b border-[#d6d0c4] py-3 text-[11px] tracking-[3px] uppercase focus:border-[#c49a6c] outline-none bg-transparent placeholder:text-[#d6d0c4]" 
                            />
                            <CreditCard className="absolute right-0 top-3 text-[#d6d0c4]" size={16} />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <input 
                              type="text" 
                              placeholder="MM / YY" 
                              className="w-full border-b border-[#d6d0c4] py-3 text-[11px] tracking-[3px] uppercase focus:border-[#c49a6c] outline-none bg-transparent placeholder:text-[#d6d0c4]" 
                            />
                            <input 
                              type="text" 
                              placeholder="CVV" 
                              className="w-full border-b border-[#d6d0c4] py-3 text-[11px] tracking-[3px] uppercase focus:border-[#c49a6c] outline-none bg-transparent placeholder:text-[#d6d0c4]" 
                            />
                          </div>

                          <input 
                            type="text" 
                            placeholder="CARDHOLDER NAME" 
                            className="w-full border-b border-[#d6d0c4] py-3 text-[11px] tracking-[3px] uppercase focus:border-[#c49a6c] outline-none bg-transparent placeholder:text-[#d6d0c4]" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-[#f5f0e8] border border-[#d6d0c4]">
                      <ShieldCheck size={16} className="text-[#c49a6c]" />
                      <p className="text-[9px] tracking-widest uppercase text-[#7a7168]">
                        Your payment is secured with 256-bit SSL encryption
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <button onClick={() => setStep(3)} className="w-full bg-[#1a1714] text-white text-[10px] font-sans tracking-[0.2em] uppercase py-5 hover:bg-[#c49a6c] transition-colors shadow-lg">
                      Confirm & Pay ₹{total.toLocaleString()}
                    </button>
                    <button onClick={() => setStep(1)} className="w-full text-center text-[10px] font-sans tracking-widest uppercase text-[#7a7168] hover:text-[#1a1714] transition-colors">
                      ← Back to Shipping
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                  <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden bg-[#f5f0e8] border border-[#d6d0c4]">
                    <div className="output">
                      <div className="wrap-colors-1"><div className="bg-colors"></div></div>
                      <div className="wrap-colors-2"><div className="bg-colors"></div></div>
                      <div className="cover"></div>
                    </div>

                    <div className="area">
                      <div className="area-wrapper">
                        <div className="ticket-mask">
                          <div className="ticket">
                            <div className="ticket-flip-container">
                              <div className="float">
                                <div className="front">
                                  <div className="ticket-body">
                                    <div className="reflex"></div>
                                    <svg className="icon-cube" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path style={{ "--i": 1 } as any} className="path-center" d="M12 12.75L14.25 11.437M12 12.75L9.75 11.437M12 12.75V15" stroke="#1a1714" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path style={{ "--i": 2 } as any} className="path-t" d="M9.75 3.562L12 2.25L14.25 3.563" stroke="#1a1714" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path style={{ "--i": 3 } as any} className="path-tr" d="M21 7.5L18.75 6.187M21 7.5V9.75M21 7.5L18.75 8.813" stroke="#1a1714" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path style={{ "--i": 4 } as any} className="path-br" d="M21 14.25V16.5L18.75 17.813" stroke="#1a1714" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path style={{ "--i": 5 } as any} className="path-b" d="M12 21.75L14.25 20.437M12 21.75V19.5M12 21.75L9.75 20.437" stroke="#1a1714" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path style={{ "--i": 6 } as any} className="path-bl" d="M5.25 17.813L3 16.5V14.25" stroke="#1a1714" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path style={{ "--i": 7 } as any} className="path-tl" d="M3 7.5L5.25 6.187M3 7.5L5.25 8.813M3 7.5V9.75" stroke="#1a1714" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <header>
                                      <div className="ticket-name">
                                        <div>
                                          <span style={{ "--i": 1 } as any}>V</span>
                                          <span style={{ "--i": 2 } as any}>O</span>
                                          <span style={{ "--i": 3 } as any}>R</span>
                                          <span style={{ "--i": 4 } as any}>T</span>
                                          <span style={{ "--i": 5 } as any}>E</span>
                                          <span style={{ "--i": 6 } as any}>X</span>
                                        </div>
                                        <div className="opacity-40">
                                          <span className="bold" style={{ "--i": 10 } as any}>P</span>
                                          <span className="bold" style={{ "--i": 11 } as any}>A</span>
                                          <span className="bold" style={{ "--i": 12 } as any}>S</span>
                                          <span className="bold" style={{ "--i": 13 } as any}>S</span>
                                        </div>
                                      </div>
                                      <div className="barcode"></div>
                                    </header>
                                    <div className="contents">
                                      <div className="event">
                                        <div><span className="bold text-[#c49a6c]">₹</span><span>{total.toLocaleString()}</span></div>
                                        <div>ORDER TOTAL</div>
                                      </div>
                                      <div className="number">#VTX-{orderId}</div>
                                      <div className="qrcode">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VORTEX-ORDER-SUCCESS" alt="QR" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="back">
                                  <div className="ticket-body">
                                    <div className="reflex"></div>
                                    <header>
                                      <div className="ticket-name">
                                        <div className="text-[#c49a6c]">
                                          <span style={{ "--i": 1 } as any}>C</span>
                                          <span style={{ "--i": 2 } as any}>O</span>
                                          <span style={{ "--i": 3 } as any}>N</span>
                                          <span style={{ "--i": 4 } as any}>F</span>
                                          <span style={{ "--i": 5 } as any}>I</span>
                                          <span style={{ "--i": 6 } as any}>R</span>
                                          <span style={{ "--i": 7 } as any}>M</span>
                                          <span style={{ "--i": 8 } as any}>E</span>
                                          <span style={{ "--i": 9 } as any}>D</span>
                                        </div>
                                      </div>
                                      <time className="text-[#1a1714]">
                                        <span style={{ "--i": 11 } as any} className="bold">{formattedDate.day[0]}</span>
                                        <span style={{ "--i": 12 } as any} className="bold">{formattedDate.day[1]}</span>
                                        <span style={{ "--i": 13 } as any} className="slash">/</span>
                                        <span style={{ "--i": 14 } as any}>{formattedDate.month[0]}</span>
                                        <span style={{ "--i": 15 } as any}>{formattedDate.month[1]}</span>
                                        <span style={{ "--i": 16 } as any} className="slash">/</span>
                                        <span style={{ "--i": 17 } as any}>{formattedDate.year[0]}</span>
                                        <span style={{ "--i": 18 } as any}>{formattedDate.year[1]}</span>
                                        <span style={{ "--i": 19 } as any}>{formattedDate.year[2]}</span>
                                        <span style={{ "--i": 20 } as any}>{formattedDate.year[3]}</span>
                                      </time>
                                    </header>
                                    <div className="contents flex-col">
                                      <ShieldCheck size={40} className="mx-auto text-[#c49a6c] mb-4" />
                                      <p className="text-[12px] font-bold uppercase tracking-widest text-[#1a1714]">Thank You</p>
                                      <p className="text-[9px] uppercase tracking-wider text-[#7a7168] mt-2 max-w-[200px] mx-auto">
                                        Your premium order is being processed for shipping.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="noise">
                      <svg height="100%" width="100%">
                        <defs>
                          <pattern height="500" width="500" patternUnits="userSpaceOnUse" id="noise-pattern">
                            <filter y="0" x="0" id="noise-filter">
                              <feTurbulence stitchTiles="stitch" numOctaves="3" baseFrequency="0.65" type="fractalNoise"></feTurbulence>
                              <feBlend mode="screen"></feBlend>
                            </filter>
                            <rect filter="url(#noise-filter)" height="500" width="500"></rect>
                          </pattern>
                        </defs>
                        <rect fill="url(#noise-pattern)" height="100%" width="100%"></rect>
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-4xl font-bebas tracking-[4px] text-[#1a1714] mb-4">Order Successful</h2>
                    <p className="text-sm font-sans text-[#7a7168] max-w-sm mx-auto leading-relaxed uppercase tracking-wider mb-8">
                      Your premium bill has been generated. <br /> Hover the ticket to see details.
                    </p>
                    <Link
                      href="/"
                      className="inline-block bg-[#1a1714] text-white text-[10px] font-sans tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#c49a6c] transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 shadow-sm border border-[#d6d0c4] sticky top-32">
              <h3 className="text-sm font-sans tracking-[0.2em] uppercase text-[#1a1714] mb-8">Order Summary</h3>
              <div className="space-y-6 mb-8 pb-8 border-b border-[#d6d0c4] max-h-[400px] overflow-y-auto">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex space-x-4">
                    <div className="w-16 aspect-[3/4] bg-[#f5f0e8] overflow-hidden rounded-md border border-black/5">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase text-[#1a1714] truncate max-w-[150px]">
                        {item.name}
                      </p>
                      <p className="text-[9px] text-[#7a7168] uppercase tracking-widest">
                        Size: {item.size} | Qty: {item.qty}
                      </p>
                      <p className="text-xs font-sans mt-2 font-bold text-[#1a1714]">
                        ₹{(item.priceNum * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {cart.length === 0 && (
                  <p className="text-[10px] text-[#7a7168] uppercase tracking-widest text-center py-4">
                    Your cart is empty
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-sans tracking-widest uppercase text-[#7a7168]">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-sans tracking-widest uppercase text-[#7a7168]">
                  <span>Shipping</span>
                  <span className="text-[#c49a6c]">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bebas text-[#1a1714] pt-4 border-t border-[#d6d0c4] tracking-[2px]">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-8 flex items-center space-x-3 text-[9px] font-sans tracking-[0.2em] uppercase text-[#7a7168] bg-[#f5f0e8] p-4">
                <Truck size={14} />
                <span>Estimated Delivery: 3-5 Business Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
