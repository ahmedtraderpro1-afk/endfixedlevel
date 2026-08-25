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
      {/* One known-good approved hero asset for every breakpoint.
          This avoids mobile <picture>/<source> failures and keeps the image
          available even when AI Studio imports only the desktop asset. */}
      <div className="hero-reference__media" aria-hidden="true">
        <img
          id="hero-jewelry-image"
          src={HERO_DESKTOP_SRC}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Left-side readability gradient; image itself is untouched. */}
      <div className="hero-reference__shade" aria-hidden="true" />

      <div className="hero-reference__inner">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="hero-reference__copy"
        >
          <div className="hero-reference__eyebrow">
            <span />
            <p>The Signature Collection</p>
            <span />
          </div>

          <h1 className="hero-reference__title">
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
          </h1>

          <div className="hero-reference__ornament" aria-hidden="true">
            <span />
            <b>◆</b>
            <span />
          </div>

          <p className="hero-reference__description">
            Elegant statement pieces for weddings, celebrations and unforgettable evenings.
          </p>

          <div className="hero-reference__actions">
            <a
              href="#signature-collection"
              onClick={onShopClick}
              className="hero-reference__button hero-reference__button--primary"
            >
              Shop The Collection
            </a>
            <a
              href="#the-bridal-edit"
              onClick={onBridalClick}
              className="hero-reference__button hero-reference__button--secondary"
            >
              Explore Bridal
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
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
