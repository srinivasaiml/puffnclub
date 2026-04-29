import React from 'react';

const Footer = () => {
  const socialLinks = [
    { name: 'instagram', url: 'https://www.instagram.com/vortex_official?igsh=MTZmdDZybzJxaWRpaQ==' },
    { name: 'twitter', url: '#' },
    { name: 'youtube', url: '#' },
    { name: 'pinterest', url: '#' }
  ];

  return (
    <footer className="border-t border-border p-[60px_40px_30px] max-w-[1200px] mx-auto mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-[50px]">
        <div className="footer-brand">
          <div className="flex items-center gap-2 font-bebas text-[32px] tracking-[3px] text-accent mb-3">
            <img src="/kite-logo.png" alt="" className="w-10 h-10 object-contain brightness-0" />
            <span>VORTEX</span>


          </div>

          <p className="text-muted text-[13px] leading-[1.8] max-w-[300px]">Redefining men's basics with premium fabric, modern design, and honest pricing. Born from street culture, built for everyday.</p>
          <div className="flex gap-3 mt-5">
            {socialLinks.map(social => (
              <a
                key={social.name}
                href={social.url}
                target={social.url !== '#' ? "_blank" : undefined}
                rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted no-underline transition-all duration-300 text-sm hover:border-accent hover:text-accent"
              >
                <i className={`fab fa-${social.name}`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4 className="text-[11px] tracking-[3px] uppercase text-text mb-4">Shop</h4>
          <div className="flex flex-col gap-2.5">
            {['All T-Shirts', 'Oversized Fit', 'Regular Fit', 'New Arrivals', 'Best Sellers'].map(link => (
              <a key={link} href="#" className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-accent">{link}</a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4 className="text-[11px] tracking-[3px] uppercase text-text mb-4">Help</h4>
          <div className="flex flex-col gap-2.5">
            {['Size Guide', 'Shipping Info', 'Returns & Exchange', 'Track Order', 'FAQ'].map(link => (
              <a key={link} href="#" className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-accent">{link}</a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4 className="text-[11px] tracking-[3px] uppercase text-text mb-4">Company</h4>
          <div className="flex flex-col gap-2.5">
            <a href="/#values" className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-accent">Our Story</a>
            <a href="#" className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-accent">Sustainability</a>
            <a href="#" className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-accent">Careers</a>
            <a href="/contact" className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-accent">Contact Us</a>
            <a href="#" className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-accent">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <span className="text-muted text-[12px]">© 2026 VORTEX. All rights reserved.</span>
        <span className="text-muted text-[12px]">Designed with <i className="fas fa-heart text-accent text-[10px]"></i> for men who care about what they wear.</span>
      </div>
    </footer>
  );
};

export default Footer;
