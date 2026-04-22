import React from 'react';

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ items, reverse = false }) => {
  return (
    <div className="overflow-hidden py-5 border-y border-border bg-bg2">
      <div className={`marquee-track animate-marquee ${reverse ? 'flex-row-reverse' : ''}`} style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
        {[...items, ...items].map((item, index) => (
          <React.Fragment key={index}>
            <span className="font-bebas text-xl tracking-[4px] text-muted whitespace-nowrap uppercase">
              {item}
            </span>
            <span className="text-accent text-[8px] flex items-center">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
