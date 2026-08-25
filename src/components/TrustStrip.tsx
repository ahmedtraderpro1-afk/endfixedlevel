import React from 'react';
import { Gem, Sparkles, CircleCheckBig } from 'lucide-react';

const items = [
  { label: 'Curated Designs', Icon: Gem },
  { label: 'Fine Craftsmanship', Icon: Sparkles },
  { label: 'Timeless Elegance', Icon: CircleCheckBig },
];

export const TrustStrip: React.FC = () => {
  return (
    <section id="trust-strip" aria-label="Brand Commitments" className="trust-reference">
      <div className="trust-reference__inner">
        {items.map(({ label, Icon }, index) => (
          <React.Fragment key={label}>
            <div className="trust-reference__item">
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </div>
            {index < items.length - 1 && <span className="trust-reference__divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
