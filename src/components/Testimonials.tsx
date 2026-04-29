import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/Marquee';

const testimonials = [
  {
    name: 'Ava Green',
    username: '@ava',
    body: 'VORTEX clothes made my wardrobe 10x better! The oversized fit is just incredible.',
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
    country: '🇦🇺 Australia',
  },
  {
    name: 'Ana Miller',
    username: '@ana',
    body: 'The quality is unmatched! Super comfortable for everyday wear.',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    country: '🇩🇪 Germany',
  },
  {
    name: 'Mateo Rossi',
    username: '@mat',
    body: 'Fit and finish are buttery smooth! Definitely recommend.',
    img: 'https://randomuser.me/api/portraits/men/51.jpg',
    country: '🇮🇹 Italy',
  },
  {
    name: 'Maya Patel',
    username: '@maya',
    body: 'Setup was a breeze! Delivery was super fast and packaging was premium.',
    img: 'https://randomuser.me/api/portraits/women/53.jpg',
    country: '🇮🇳 India',
  },
  {
    name: 'Noah Smith',
    username: '@noah',
    body: 'Best brand ever! The midnight black doesnt fade at all after multiple washes.',
    img: 'https://randomuser.me/api/portraits/men/33.jpg',
    country: '🇺🇸 USA',
  },
  {
    name: 'Lucas Stone',
    username: '@luc',
    body: 'Very customizable and smooth. Love the streetwear vibe.',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    country: '🇫🇷 France',
  },
  {
    name: 'Haruto Sato',
    username: '@haru',
    body: 'Impressive aesthetic! The vintage wash feels authentic.',
    img: 'https://randomuser.me/api/portraits/men/85.jpg',
    country: '🇯🇵 Japan',
  },
  {
    name: 'Emma Lee',
    username: '@emma',
    body: 'Love the premium feel! The fabric weight is insane.',
    img: 'https://randomuser.me/api/portraits/women/45.jpg',
    country: '🇨🇦 Canada',
  },
  {
    name: 'Carlos Ray',
    username: '@carl',
    body: 'Great for streetwear lovers. A very unique style.',
    img: 'https://randomuser.me/api/portraits/men/61.jpg',
    country: '🇪🇸 Spain',
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-[260px] bg-card border-border border rounded-xl overflow-hidden hover:border-accent transition-colors duration-300">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-border">
            <AvatarImage src={img} alt={username} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-warm flex items-center gap-1">
              {name} <span className="text-xs opacity-70">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-accent2">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-text leading-relaxed">{body}</blockquote>
      </CardContent>
    </Card>
  );
}

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = containerRef.current?.querySelectorAll('.reveal');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-[100px] overflow-hidden relative bg-bg2 border-y border-border" ref={containerRef}>
      <div className="absolute left-0 right-0 top-0 h-[50px] bg-gradient-to-b from-bg2 to-transparent z-[2] pointer-events-none"></div>
      <div className="absolute left-0 right-0 bottom-0 h-[50px] bg-gradient-to-t from-bg2 to-transparent z-[2] pointer-events-none"></div>
      
      <div className="text-center mb-[60px] px-10 reveal">
        <p className="text-[11px] tracking-[5px] uppercase text-accent mb-2">Customer Reviews</p>
        <h2 className="font-bebas text-[clamp(32px,5vw,52px)] tracking-[4px] text-warm">Real Talk<span className="text-accent">.</span></h2>
      </div>

      <div className="flex justify-center w-full px-4 reveal">
        <div className="relative flex h-[500px] md:h-[600px] w-full max-w-[1000px] flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px]">
          <div
            className="flex flex-row items-stretch gap-4 h-[150%]"
            style={{
              transform:
                'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
            }}
          >
            {/* Vertical Marquee (downwards) */}
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s] h-full">
              {testimonials.map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (upwards) */}
            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s] h-full">
              {testimonials.map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (downwards) */}
            <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s] h-full hidden sm:flex">
              {testimonials.map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (upwards) */}
            <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s] h-full hidden lg:flex">
              {testimonials.map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>
          {/* Gradient overlays for vertical marquee */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-bg2 z-10"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg2 z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg2 z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg2 z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
