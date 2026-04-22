"use client"

import * as React from "react"
import { motion } from "framer-motion"

export interface OrderTrackingProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    name: string
    timestamp: string
    isCompleted: boolean
  }[]
}

const OrderTracking = React.forwardRef<HTMLDivElement, OrderTrackingProps>(
  ({ steps = [], className, ...props }, ref) => {
    return (
      <div ref={ref} className={`w-full ${className || ''}`} {...props}>
        {steps.length > 0 ? (
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex relative"
              >
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-bg transition-colors duration-500 ${step.isCompleted ? 'border-green-500 text-green-500' : 'border-border text-muted'}`}>
                    {step.isCompleted ? (
                      <i className="fas fa-check text-[14px]"></i>
                    ) : (
                      <i className="fas fa-circle text-[8px] opacity-50"></i>
                    )}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div
                      className={`w-[2px] h-full absolute top-8 bottom-[-8px] transition-colors duration-500 ${
                        steps[index + 1].isCompleted ? 'bg-green-500/50' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
                <div className="pb-8 pt-1">
                  <p className={`text-sm font-bold tracking-wide uppercase ${step.isCompleted ? 'text-warm' : 'text-muted'}`}>{step.name}</p>
                  <p className="text-[11px] text-muted tracking-wider mt-1">
                    {step.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-[12px] text-muted tracking-[2px] uppercase">
            This order has no tracking information.
          </p>
        )}
      </div>
    )
  }
)
OrderTracking.displayName = "OrderTracking"

export { OrderTracking }
