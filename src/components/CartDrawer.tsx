"use client";

import React, { useState } from 'react';
import { useStore } from '@/context/StoreProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const TICKET_STYLES = `
.ticket-mask{position:absolute;overflow:hidden;display:flex;justify-content:center;mask-image:linear-gradient(rgba(0,0,0,0.1) 0%,white 20px);perspective:1000px;top:0;left:0;right:0;height:100%;pointer-events:none}
.ticket{animation:ticket-move 3s ease-out forwards;perspective:3000px}
@keyframes ticket-move{0%{transform:translateY(-120px)}60%{transform:translateY(30px)}80%{transform:translateY(10px)}100%{transform:translateY(20px)}}
.ticket-flip-container{transition:.6s;transform-style:preserve-3d;position:relative}
.ticket:hover .ticket-flip-container{transform:rotateY(180deg)}
.float{transform-style:preserve-3d;pointer-events:none;animation:float 3s ease-in-out infinite}
@keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-12px)}100%{transform:translateY(0)}}
.front,.back{display:inline-block;backface-visibility:hidden;transform-style:preserve-3d}
.back{position:absolute;top:0;left:0;transform:rotateY(-180deg)}
.vortex-ticket{display:block;position:relative;width:260px;border-radius:10px 10px 0 0;background:linear-gradient(to bottom,white,#dcfffd);color:#000;text-align:center;box-shadow:0 30px 60px rgba(0,0,0,0.5)}
.vortex-ticket::before{content:"";position:absolute;inset:0;border-radius:10px 10px 0 0;background:radial-gradient(at 30% -5%,#90f1f1,#d3ccf0,rgba(255,255,255,0) 25%),radial-gradient(at 70% 0%,#d3ccf0,rgba(255,255,255,0) 20%),linear-gradient(75deg,#90f1f1 5%,rgba(255,255,255,0),#aad1f0,rgba(255,255,255,0),#e9d0ed,rgba(255,255,255,0),#d3ccf0,rgba(255,255,255,0),#c4f2e5 90%)}
.vortex-ticket-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px dashed rgba(0,0,0,0.3);position:relative;height:50px}
.vortex-ticket-header::before,.vortex-ticket-header::after{content:"";display:block;width:12px;height:12px;background:#f5f0e8;position:absolute;right:-7px;border-radius:50%;bottom:-6px;z-index:11}
.vortex-ticket-header::after{left:-7px}
.ticket-brand{font-weight:800;font-size:13px;letter-spacing:2px;color:#1a1a2e}
.ticket-sub{font-size:9px;letter-spacing:3px;color:rgba(0,0,0,0.4);font-weight:400}
.vortex-barcode{box-shadow:1px 0 0 1px,5px 0 0 1px,10px 0 0 1px,11px 0 0 1px,15px 0 0 1px,18px 0 0 1px,22px 0 0 1px,23px 0 0 1px,26px 0 0 1px,30px 0 0 1px,35px 0 0 1px,37px 0 0 1px,41px 0 0 1px,44px 0 0 1px,47px 0 0 1px,51px 0 0 1px,56px 0 0 1px,59px 0 0 1px,64px 0 0 1px,68px 0 0 1px,72px 0 0 1px,74px 0 0 1px,77px 0 0 1px;display:inline-block;height:26px;width:0}
.vortex-ticket-body{padding:16px;min-height:140px;position:relative}
.vortex-ticket::after{content:"";display:block;position:absolute;bottom:-14px;left:0;background:-webkit-linear-gradient(-135deg,#dcfffd 50%,transparent 50%) 0 50%,-webkit-linear-gradient(-45deg,#dcfffd 50%,transparent 50%) 0 50%,transparent;background-repeat:repeat-x;background-size:14px 14px,14px 14px;height:14px;width:100%}
.vortex-reflex{pointer-events:none;position:absolute;inset:0;bottom:-5px;z-index:10;overflow:hidden}
.vortex-reflex::before{content:"";position:absolute;width:260px;background:linear-gradient(to right,rgba(221,249,255,.4) 10%,rgba(221,245,255,.7) 60%,rgba(221,246,255,.6) 60%,rgba(221,255,254,.4) 90%);top:-10%;bottom:-10%;left:-130%;transform:translateX(0) skew(-30deg);transition:all .7s ease}
.float:hover .vortex-reflex::before{transform:translate(280%,0) skew(-30deg)}
`;

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQty, showToast, user } = useStore();
  const router = useRouter();
  const [step, setStep] = useState<'cart' | 'confirm' | 'success'>('cart');
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [billCart, setBillCart] = useState<typeof cart>([]);
  const [billTotal, setBillTotal] = useState(0);

  const handleCheckout = (path: string | null = null, action: (() => void) | null = null) => {
    if (!user) {
      showToast("Please login to proceed with checkout");
      setIsCartOpen(false);
      router.push('/auth');
      return;
    }
    if (path) {
      setIsCartOpen(false);
      router.push(path);
    } else if (action) {
      action();
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const total = cart.reduce((acc, item) => acc + (item.priceNum * item.qty), 0);

  const sendToWhatsApp = () => {
    if (!user) {
      handleCheckout(null, null);
      return;
    }
    if (!cart.length) return;
    let msg = "🛒 *VORTEX — ORDER*\n━━━━━━━━━━━━━━━\n\n";
    cart.forEach((item, i) => {
      msg += `📦 *${i + 1}. ${item.name}*\n   Size: ${item.size} | Qty: ${item.qty}\n   ₹${(item.priceNum * item.qty).toLocaleString()}\n\n`;
    });
    msg += `━━━━━━━━━━━━━━━\n*TOTAL: ₹${total.toLocaleString()}* (Shipping FREE)\n✅ Please confirm!`;
    window.open(`https://wa.me/917901014143?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCODConfirm = () => {
    setBillCart([...cart]);
    setBillTotal(total);
    setStep('success');
    showToast("🎉 Order Placed via COD!");
  };

  const sendBillToWhatsApp = () => {
    let msg = "🧾 *VORTEX — NEW COD ORDER*\n";
    msg += "━━━━━━━━━━━━━━━\n\n";
    msg += `*Order ID:* #VTX${orderId}\n`;
    msg += `*Payment Mode:* Cash on Delivery (COD)\n`;
    msg += `*Expected Delivery:* 3-5 Business Days\n\n`;
    
    billCart.forEach((item, i) => {
      msg += `📦 *ITEM ${i + 1}*\n`;
      msg += `   *ID:* ${item.id}\n`;
      msg += `   *Name:* ${item.name}\n`;
      msg += `   *Size:* ${item.size}\n`;
      msg += `   *Color:* ${item.color}\n`;
      msg += `   *Qty:* ${item.qty}\n`;
      msg += `   *Amount:* ₹${(item.priceNum * item.qty).toLocaleString()}\n\n`;
    });
    
    msg += "━━━━━━━━━━━━━━━\n";
    msg += `*Subtotal:* ₹${billTotal.toLocaleString()}\n`;
    msg += `*Shipping:* FREE\n`;
    msg += `*GRAND TOTAL: ₹${billTotal.toLocaleString()}*\n`;
    msg += "━━━━━━━━━━━━━━━\n";
    
    window.open(`https://wa.me/917901014143?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const close = () => { setIsCartOpen(false); setStep('cart'); };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <style dangerouslySetInnerHTML={{ __html: TICKET_STYLES }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[4000]" onClick={close} />

          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-[min(420px,94vw)] bg-[#f5f0e8] z-[4001] flex flex-col border-l border-black/10 overflow-hidden shadow-[-30px_0_80px_rgba(0,0,0,0.1)]">

            <AnimatePresence mode="wait">

              {/* CART VIEW */}
              {step === 'cart' && (
                <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
                    <div>
                      <h3 className="font-bebas text-2xl tracking-[3px] text-[#1a1714]">Your Basket</h3>
                      <p className="text-[10px] text-[#c49a6c] uppercase tracking-[3px]">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={close} className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-[#7a7168] hover:text-[#1a1714] transition-all">
                      <i className="fas fa-times text-sm"></i>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                        <i className="fas fa-shopping-bag text-6xl text-white/10"></i>
                        <p className="text-[11px] uppercase tracking-[4px] text-[#7a7168]">Your basket is empty</p>
                      </div>
                    ) : cart.map((item, idx) => (
                      <motion.div layout key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 group">
                        <div className="w-20 h-24 rounded-xl overflow-hidden border border-black/10 bg-black/5 flex-shrink-0">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div>
                            <h4 className="font-bold text-[13px] text-[#1a1714] uppercase tracking-wide truncate">{item.name}</h4>
                            <p className="text-[9px] text-[#7a7168] uppercase tracking-[2px] mt-1">Size: {item.size}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-black text-[#c49a6c] text-base">₹{item.priceNum.toLocaleString()}</span>
                            <div className="flex items-center bg-black/5 rounded-lg border border-black/10 overflow-hidden">
                              <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-black/10 transition-colors" onClick={(e) => { e.stopPropagation(); updateCartQty(idx, -1); }}>−</button>
                              <span className="w-8 text-center text-xs font-bold text-[#1a1714]">{item.qty}</span>
                              <button type="button" className="w-8 h-8 flex items-center justify-center hover:bg-black/10 transition-colors" onClick={(e) => { e.stopPropagation(); updateCartQty(idx, 1); }}>+</button>
                            </div>
                          </div>
                          <button className="text-[9px] text-red-400/40 font-black uppercase tracking-[2px] flex items-center gap-1.5 hover:text-red-400 transition-colors w-fit mt-1" onClick={() => removeFromCart(idx)}>
                            <i className="fas fa-trash-alt"></i> Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {cart.length > 0 && (
                    <div className="px-6 py-6 border-t border-black/10 bg-black/5 space-y-5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] text-[#7a7168] uppercase tracking-widest"><span>Subtotal</span><span className="text-[#1a1714]">₹{total.toLocaleString()}</span></div>
                        <div className="flex justify-between text-[11px] text-[#7a7168] uppercase tracking-widest"><span>Shipping</span><span className="text-green-600 font-black">FREE</span></div>
                        <div className="flex justify-between pt-3 border-t border-black/10">
                          <span className="font-bebas text-xl tracking-[2px] text-[#1a1714]">Grand Total</span>
                          <span className="font-bebas text-xl tracking-[2px] text-[#c49a6c]">₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <button onClick={sendToWhatsApp} className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-[12px] tracking-[2px] uppercase flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all">
                          <i className="fab fa-whatsapp text-lg"></i> Checkout WhatsApp
                        </button>
                        <button onClick={() => handleCheckout(null, () => setStep('confirm'))} className="w-full py-4 bg-[#c49a6c] text-[#f5f0e8] rounded-xl font-bold text-[12px] tracking-[2px] uppercase flex items-center justify-center gap-3 hover:bg-[#8b6e4e] active:scale-[0.98] transition-all">
                          <i className="fas fa-hand-holding-usd text-lg"></i> Cash on Delivery (COD)
                        </button>
                        <button onClick={() => handleCheckout('/checkout')} className="w-full py-4 bg-[#1a1714] text-white rounded-xl font-bold text-[12px] tracking-[2px] uppercase flex items-center justify-center gap-3 hover:bg-black active:scale-[0.98] transition-all">
                          <i className="fas fa-credit-card text-lg"></i> Online Payment
                        </button>
                        <button onClick={close} className="w-full py-3 text-[10px] text-[#7a7168] font-bold uppercase tracking-[3px] hover:text-[#1a1714] transition-colors">
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* CONFIRM VIEW */}
              {step === 'confirm' && (
                <motion.div key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col h-full items-center justify-center p-10 text-center">
                  <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-20 h-20 bg-[#c49a6c]/10 border-2 border-[#c49a6c]/30 rounded-full flex items-center justify-center text-[#c49a6c] text-3xl mb-8">
                    <i className="fas fa-truck"></i>
                  </motion.div>
                  <h2 className="font-bebas text-3xl text-[#1a1714] tracking-[4px] mb-3">Confirm COD Order</h2>
                  <p className="text-[#7a7168] text-[12px] leading-relaxed mb-10 max-w-[280px]">
                    Placing a <strong className="text-[#c49a6c]">Cash on Delivery</strong> order for{' '}
                    <strong className="text-[#1a1714]">₹{total.toLocaleString()}</strong>. Payment at doorstep.
                  </p>
                  <div className="w-full space-y-3">
                    <button onClick={handleCODConfirm} className="w-full py-4 bg-[#c49a6c] text-[#f5f0e8] rounded-xl font-black text-[13px] tracking-[3px] uppercase hover:bg-[#8b6e4e] active:scale-[0.97] transition-all">
                      ✓ Confirm & Place Order
                    </button>
                    <button onClick={() => setStep('cart')} className="w-full py-4 border border-black/10 text-[#7a7168] rounded-xl font-bold text-[11px] tracking-[3px] uppercase hover:border-black/30 hover:text-[#1a1714] transition-all">
                      ← Go Back
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SUCCESS VIEW WITH TICKET ANIMATION */}
              {step === 'success' && (
                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full overflow-y-auto">
                  <div className="flex-1 flex flex-col items-center pt-10 pb-6 px-6 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                      <i className="fas fa-check"></i>
                    </motion.div>
                    <h2 className="font-bebas text-3xl text-[#1a1714] tracking-[4px]">Order Placed!</h2>
                    
                    <div 
                      className="flex items-center gap-3 mt-3 mb-8 bg-black/5 border border-black/10 px-4 py-2 rounded-lg cursor-pointer hover:bg-black/10 transition-colors shadow-lg active:scale-95" 
                      onClick={() => {
                        navigator.clipboard.writeText(`VTX${orderId}`);
                        showToast("📋 Order ID copied!");
                      }}
                      title="Copy Order ID"
                    >
                      <p className="text-[12px] text-[#c49a6c] font-black uppercase tracking-[3px]">#VTX{orderId}</p>
                      <div className="w-[1px] h-4 bg-black/10"></div>
                      <i className="fas fa-copy text-[#7a7168] text-sm"></i>
                    </div>

                    {/* HOLOGRAPHIC TICKET */}
                    <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, type: 'spring', damping: 18 }}
                      className="relative w-full flex justify-center" style={{ minHeight: 320 }}>
                      <div className="ticket-mask" style={{ position: 'relative', height: 320 }}>
                        <div className="ticket">
                          <div className="ticket-flip-container">
                            <div className="float">
                              {/* FRONT */}
                              <div className="front">
                                <div className="vortex-ticket">
                                  <div className="vortex-reflex"></div>
                                  <div className="vortex-ticket-header">
                                    <div className="text-left">
                                      <div className="ticket-brand">VORTEX</div>
                                      <div className="ticket-sub">ORDER PASS</div>
                                    </div>
                                    <div className="vortex-barcode"></div>
                                  </div>
                                  <div className="vortex-ticket-body">
                                    <div className="text-left mb-3 z-10 relative">
                                      <div className="text-[10px] tracking-[2px] text-gray-400 uppercase">Items</div>
                                      <div className="space-y-1 mt-1 max-h-[80px] overflow-hidden">
                                        {billCart.map((item, i) => (
                                          <div key={i} className="flex justify-between text-[11px]">
                                            <span className="text-gray-700 truncate max-w-[140px]">{item.qty}x {item.name}</span>
                                            <span className="font-bold text-gray-900">₹{(item.priceNum * item.qty).toLocaleString()}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between items-center z-10 relative">
                                      <span className="text-[10px] text-gray-400 uppercase tracking-[2px]">COD Total</span>
                                      <span className="font-black text-gray-900 text-lg">₹{billTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="absolute bottom-3 left-3 text-[9px] text-blue-300 font-bold">#{orderId}</div>
                                  </div>
                                </div>
                              </div>

                              {/* BACK */}
                              <div className="back">
                                <div className="vortex-ticket">
                                  <div className="vortex-reflex"></div>
                                  <div className="vortex-ticket-header">
                                    <div className="ticket-brand">VORTEX</div>
                                    <div className="text-[9px] text-gray-400">THANK YOU</div>
                                  </div>
                                  <div className="vortex-ticket-body flex flex-col items-center justify-center gap-3">
                                    <div className="text-center">
                                      <div className="text-[10px] tracking-[3px] text-gray-400 uppercase mb-1">Payment Mode</div>
                                      <div className="font-black text-xl text-gray-900">CASH ON DELIVERY</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-[9px] tracking-[2px] text-gray-400 uppercase">Delivery</div>
                                      <div className="font-bold text-gray-700 text-sm">3–5 Business Days</div>
                                    </div>
                                    <div className="text-[9px] text-gray-400 text-center mt-2">Flip to see your order →</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <p className="mt-6 text-[10px] text-[#7a7168] leading-loose uppercase tracking-[2px] opacity-60 text-center">
                      Hover the ticket to flip it ✨<br />Our team will call you to confirm.
                    </p>
                  </div>

                  <div className="px-6 pb-8 space-y-3">
                    <button onClick={sendBillToWhatsApp} className="w-full py-4 bg-[#25D366] text-white rounded-xl font-black text-[12px] tracking-[3px] uppercase hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20">
                      <i className="fab fa-whatsapp text-xl"></i> Send Bill to Admin
                    </button>
                    <button onClick={close} className="w-full py-3 bg-transparent border border-black/10 text-[#7a7168] rounded-xl font-bold text-[11px] tracking-[3px] uppercase hover:border-black/30 hover:text-[#1a1714] active:scale-[0.97] transition-all">
                      Close & Continue Shopping
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
