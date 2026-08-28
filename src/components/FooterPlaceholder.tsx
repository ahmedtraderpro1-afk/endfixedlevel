import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const FooterPlaceholder: React.FC = () => {
  return (
    <footer
      id="main-footer"
      aria-label="Footer"
      className="w-full bg-[#090909] border-t border-[#c5a059]/12 pt-10 pb-7 text-[#f9f6f0]/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-8 border-b border-[#c5a059]/10 pb-8">
          <div>
            <div className="mb-4">
              <BrandLogo size="md" className="!items-start text-left" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-[#f9f6f0]/65">
              Luxury jewelry for life&apos;s most beautiful moments.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#c5a059] mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-[#c5a059] transition-colors">All Jewelry</Link></li>
              <li><Link to="/category/bridal-sets" className="hover:text-[#c5a059] transition-colors">Bridal Suites</Link></li>
              <li><Link to="/category/necklaces" className="hover:text-[#c5a059] transition-colors">Necklaces</Link></li>
              <li><Link to="/category/earrings" className="hover:text-[#c5a059] transition-colors">Earrings</Link></li>
              <li><Link to="/category/pearl-collections" className="hover:text-[#c5a059] transition-colors">Pearl Collections</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#c5a059] mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#crafted-to-perfection" className="hover:text-[#c5a059] transition-colors">Our Story</a></li>
              <li><a href="/#crafted-to-perfection" className="hover:text-[#c5a059] transition-colors">Craftsmanship</a></li>
              <li><a href="/#newsletter" className="hover:text-[#c5a059] transition-colors">Journal</a></li>
              <li><a href="/#crafted-to-perfection" className="hover:text-[#c5a059] transition-colors">Care Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#c5a059] mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#private-styling" className="hover:text-[#c5a059] transition-colors">FAQ</a></li>
              <li><a href="/#private-styling" className="hover:text-[#c5a059] transition-colors">Shipping &amp; Returns</a></li>
              <li><a href="/#private-styling" className="hover:text-[#c5a059] transition-colors">Size Guide</a></li>
              <li><a href="/#private-styling" className="hover:text-[#c5a059] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#c5a059] mb-4">Follow Us</h3>
            <div className="flex items-center gap-3 text-[#c5a059] mb-5">
              <a href="/#home" aria-label="Instagram" className="hover:text-[#d4af37]"><Instagram className="w-4 h-4" /></a>
              <a href="/#home" aria-label="Facebook" className="hover:text-[#d4af37]"><Facebook className="w-4 h-4" /></a>
              <a href="/#home" aria-label="YouTube" className="hover:text-[#d4af37]"><Youtube className="w-4 h-4" /></a>
            </div>
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-[#c5a059] mb-2">Secure Payments</h4>
            <p className="text-sm text-[#f9f6f0]/65">VISA • Mastercard • AMEX • Apple Pay</p>
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#f9f6f0]/45">
          <p>© {new Date().getFullYear()} Jewelry By Nadia. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="/#home" className="hover:text-[#c5a059] transition-colors">Privacy Policy</a>
            <a href="/#home" className="hover:text-[#c5a059] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
