import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onShopClick?: () => void;
  onBridalClick?: () => void;
}

const HERO_DESKTOP_SRC = '/assets/jewelry/hero-approved.jpeg';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onBridalClick,
}) => {
  return (
    <section
      id="home"
      aria-label="Hero - The Signature Collection"
      className="hero-reference"
    >
      <div className="hero-reference__inner">
        {/* Contained hero media inside the centered max-width container */}
        <div className="hero-reference__media" aria-hidden="true">
          <motion.img
            id="hero-jewelry-image"
            src={HERO_DESKTOP_SRC}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            initial={{ scale: 1.04, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Left-side readability gradient; image itself is untouched */}
        <div className="hero-reference__shade" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hero-reference__copy"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hero-reference__eyebrow"
          >
            <span />
            <p>The Signature Collection</p>
            <span />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hero-reference__title"
          >
            <span className="sm:hidden">
              Jewelry Made
              <br />
              for Your Most
              <br />
              Beautiful
              <br />
              Moments
            </span>
            <span className="hidden sm:inline">
              Jewelry Made for
              <br />
              Your Most Beautiful
              <br />
              Moments
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hero-reference__ornament"
            aria-hidden="true"
          >
            <span />
            <b>◆</b>
            <span />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hero-reference__description"
          >
            Elegant statement pieces for weddings, celebrations and unforgettable evenings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="hero-reference__actions"
          >
            <a
              href="#signature-collection"
              onClick={onShopClick}
              className="hero-reference__button hero-reference__button--primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            >
              Shop The Collection
            </a>
            <a
              href="#the-bridal-edit"
              onClick={onBridalClick}
              className="hero-reference__button hero-reference__button--secondary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            >
              Explore Bridal
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="hero-reference__desktop-badge"
        >
          <ShieldCheck aria-hidden="true" />
          <span>
            Trusted by<br />
            <strong>Our Global Clients</strong>
          </span>
        </motion.div>
      </div>
    </section>
  );
};
