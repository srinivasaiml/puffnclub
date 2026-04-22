"use client";

import React from 'react';
import { useStore } from '@/context/StoreProvider';

const Toast = () => {
  const { toast } = useStore();

  return (
    <div className={`fixed bottom-[30px] left-1/2 -translate-x-1/2 bg-card border border-accent text-text p-[14px_28px] rounded-xl text-sm z-[5000] transition-transform duration-400 cubic-bezier(0.22,1,0.36,1) flex items-center gap-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] whitespace-nowrap ${toast.show ? 'translate-y-0' : 'translate-y-[100px]'}`}>
      <i className="fas fa-check-circle text-accent"></i>
      <span>{toast.msg}</span>
    </div>
  );
};

export default Toast;
