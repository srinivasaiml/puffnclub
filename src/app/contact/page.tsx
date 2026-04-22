"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderTracking } from '@/components/OrderTracking';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'contact' | 'tracking'>('contact');

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: [] as string[],
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Tracking State
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string) => {
    setFormData((prev) => {
      const currentTypes = prev.projectType;
      if (currentTypes.includes(type)) {
        return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
      } else {
        return { ...prev, projectType: [...currentTypes, type] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    setIsTracking(true);
    
    // Simulate API call to fetch tracking info
    setTimeout(() => {
      // Fake tracking data based on ID input
      setTrackingResult([
        { name: "Order Placed", timestamp: "April 18, 2026 - 10:30 AM", isCompleted: true },
        { name: "Order Processed", timestamp: "April 19, 2026 - 02:15 PM", isCompleted: true },
        { name: "Shipped", timestamp: "April 20, 2026 - 09:00 AM", isCompleted: true },
        { name: "Out for Delivery", timestamp: "April 22, 2026 - 08:45 AM", isCompleted: false },
        { name: "Delivered", timestamp: "Expected by April 23, 2026", isCompleted: false }
      ]);
      setIsTracking(false);
    }, 1000);
  };

  const projectTypeOptions = [
    'Order Status', 'Tracking Inquiry', 'Return & Exchange', 'Size Guide',
    'Product Quality', 'Bulk / Wholesale', 'Payment Issue',
    'General Feedback', 'Other'
  ];

  return (
    <main className="min-h-screen bg-bg pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: '110vh', x: `${Math.random() * 100}vw`, scale: Math.random() * 0.5 + 0.5 }}
            animate={{ opacity: [0, 0.2, 0.2, 0], y: '-10vh', x: `${Math.random() * 100}vw` }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
            className="absolute bg-accent/20 rounded-full"
            style={{ width: `${Math.random() * 40 + 10}px`, height: `${Math.random() * 40 + 10}px` }}
          />
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="text-accent tracking-[5px] uppercase text-[10px] md:text-[11px] mb-4">Support & Feedback</p>
            <h1 className="font-bebas text-[clamp(36px,12vw,80px)] leading-[0.9] text-warm mb-6 md:mb-8">
              We're here to <span className="text-accent">help you</span> style better
            </h1>
            
            <p className="text-text/60 text-base md:text-lg mb-10 md:mb-12 max-w-md">
              Need help with an order? Want to share feedback about our products? Drop us a message below or reach out via our social channels.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-bg transition-all duration-500">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-1">Mail us at</p>
                  <a href="mailto:hello@puffnclub.com" className="text-warm font-medium hover:text-accent transition-colors">hello@puffnclub.com</a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-bg transition-all duration-500">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-1">WhatsApp</p>
                  <a href="https://wa.me/918331915339" target="_blank" className="text-warm font-medium hover:text-accent transition-colors">+91 83319 15339</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Panel (Tabs) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-xl p-5 md:p-10 rounded-3xl border border-border shadow-2xl flex flex-col"
          >
            {/* Segmented Control Tabs */}
            <div className="flex bg-bg/50 border border-border p-1.5 rounded-xl mb-6 md:mb-8">
              <div className="relative flex-1">
                <button 
                  type="button"
                  className={`w-full py-3.5 text-[11px] uppercase tracking-[3px] font-bold rounded-lg transition-colors relative z-10 ${activeTab === 'contact' ? 'text-bg' : 'text-muted hover:text-warm'}`}
                  onClick={() => setActiveTab('contact')}
                >
                  Let's Talk
                </button>
                {activeTab === 'contact' && (
                  <motion.div layoutId="tabBg" className="absolute inset-0 bg-accent rounded-lg shadow-[0_0_20px_rgba(196,154,108,0.3)] z-0" />
                )}
              </div>
              <div className="relative flex-1">
                <button 
                  type="button"
                  className={`w-full py-3.5 text-[11px] uppercase tracking-[3px] font-bold rounded-lg transition-colors relative z-10 ${activeTab === 'tracking' ? 'text-bg' : 'text-muted hover:text-warm'}`}
                  onClick={() => setActiveTab('tracking')}
                >
                  Track Order
                </button>
                {activeTab === 'tracking' && (
                  <motion.div layoutId="tabBg" className="absolute inset-0 bg-accent rounded-lg shadow-[0_0_20px_rgba(196,154,108,0.3)] z-0" />
                )}
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {activeTab === 'contact' ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted ml-1">Your Name</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full bg-bg border border-border focus:border-accent outline-none rounded-xl p-3.5 md:p-4 text-warm transition-all placeholder:text-muted/50 text-[14px]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted ml-1">Email Address</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full bg-bg border border-border focus:border-accent outline-none rounded-xl p-3.5 md:p-4 text-warm transition-all placeholder:text-muted/50 text-[14px]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted ml-1">Your Message</label>
                    <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="How can we help? Please include order number if applicable..." rows={4} className="w-full bg-bg border border-border focus:border-accent outline-none rounded-xl p-3.5 md:p-4 text-warm transition-all placeholder:text-muted/50 resize-none text-[14px]" />
                  </div>

                  <div className="space-y-4 pt-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted ml-1">What can we help you with?</p>
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 xl:grid-cols-3 gap-2">
                      {projectTypeOptions.map((option) => (
                        <div key={option} onClick={() => handleCheckboxChange(option)} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${formData.projectType.includes(option) ? 'border-accent bg-accent/5 text-accent' : 'border-border bg-bg/50 text-text/60 hover:border-accent/30'}`}>
                          <div className={`w-3 h-3 rounded-sm border flex items-center justify-center transition-all ${formData.projectType.includes(option) ? 'bg-accent border-accent' : 'border-muted'}`}>
                            {formData.projectType.includes(option) && <i className="fas fa-check text-[6px] text-bg"></i>}
                          </div>
                          <span className="text-[10px] uppercase tracking-widest font-medium whitespace-nowrap overflow-hidden text-ellipsis">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'sending'} className="w-full bg-accent hover:bg-accent2 text-bg font-bold py-4 md:py-5 rounded-xl transition-all shadow-[0_10px_30px_rgba(196,154,108,0.2)] disabled:opacity-50 mt-4 group">
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-2"><i className="fas fa-circle-notch animate-spin"></i> Sending...</span>
                    ) : status === 'success' ? (
                      <span className="flex items-center justify-center gap-2"><i className="fas fa-check"></i> Message Sent!</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 uppercase tracking-[2px] text-[12px]">Send Message <i className="fas fa-paper-plane group-hover:translate-x-1 transition-transform"></i></span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="tracking-view"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col h-full space-y-6"
                >
                  <p className="text-text/60 text-sm mb-2">
                    Enter your Order ID below to view the current status of your shipment.
                  </p>
                  
                  <form onSubmit={handleTrackSubmit} className="flex flex-col min-[450px]:flex-row gap-3">
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                        <i className="fas fa-hashtag"></i>
                      </div>
                      <input 
                        type="text" 
                        required
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                        placeholder="PFC123456"
                        className="w-full bg-bg border border-border focus:border-accent outline-none rounded-xl py-3.5 md:py-4 pl-10 pr-4 text-warm font-bold tracking-widest uppercase transition-all placeholder:text-muted/50 placeholder:font-normal text-[14px]"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isTracking || !trackingId}
                      className="bg-accent hover:bg-accent2 text-bg font-black py-4 min-[450px]:py-0 px-6 rounded-xl transition-all disabled:opacity-50 uppercase tracking-[2px] text-[11px]"
                    >
                      {isTracking ? <i className="fas fa-circle-notch animate-spin"></i> : "Track"}
                    </button>
                  </form>

                  {trackingResult && !isTracking && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-6 bg-bg/50 border border-border rounded-2xl flex-1"
                    >
                      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted">Order Tracking</p>
                          <h4 className="font-bebas text-xl text-accent tracking-[2px] mt-1">{trackingId}</h4>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-warm">
                          <i className="fas fa-box-open"></i>
                        </div>
                      </div>
                      
                      <div className="pl-2">
                        <OrderTracking steps={trackingResult} />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
