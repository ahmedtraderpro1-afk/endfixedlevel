import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showImage?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showImage = false,
}) => {
  if (showImage) {
    return (
      <img
        src="/jewelry-by-nadia-logo.png"
        alt="Jewelry By Nadia"
        className={`object-contain ${
          size === 'sm'
            ? 'h-10 sm:h-12 w-auto'
            : size === 'lg'
            ? 'h-20 sm:h-24 w-auto'
            : 'h-14 sm:h-16 w-auto'
        } ${className}`}
      />
    );
  }

  const titleSizes = {
    sm: 'text-[18px] sm:text-[20px]',
    md: 'text-[22px] sm:text-[26px] lg:text-[28px]',
    lg: 'text-[32px] sm:text-[38px]',
  };

  const subtitleSizes = {
    sm: 'text-[9px] sm:text-[10px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-[12px] sm:text-[13px]',
  };

  const flourishWidths = {
    sm: 'w-24',
    md: 'w-28 sm:w-32',
    lg: 'w-36 sm:w-44',
  };

  return (
    <div className={`flex flex-col items-center leading-none select-none ${className}`}>
      {/* Top Text: Jewelry By */}
      <span
        className={`${subtitleSizes[size]} font-sans tracking-[0.24em] uppercase font-light text-[#f5f0eb]/90 antialiased`}
      >
        Jewelry By
      </span>

      {/* Main Heading: NADIA */}
      <span
        className={`${titleSizes[size]} font-serif tracking-[0.14em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fff5dc] via-[#c5a059] to-[#8c6724] antialiased mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
      >
        NADIA
      </span>

      {/* Luxury Gold Flourish Underline */}
      <div className={`${flourishWidths[size]} mt-1 text-[#c5a059] flex items-center justify-center pointer-events-none`}>
        <svg
          viewBox="0 0 240 18"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoFlourishGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9C7730" />
              <stop offset="30%" stopColor="#EED5A1" />
              <stop offset="50%" stopColor="#FFF5DC" />
              <stop offset="70%" stopColor="#EED5A1" />
              <stop offset="100%" stopColor="#9C7730" />
            </linearGradient>
          </defs>

          {/* Left horizontal line */}
          <line x1="2" y1="9" x2="72" y2="9" stroke="url(#logoFlourishGold)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Symmetrical filigree scrolls */}
          <path
            d="M 72 9 C 80 1, 94 1, 104 9 C 112 16, 120 16, 120 9 C 120 16, 128 16, 136 9 C 146 1, 160 1, 168 9"
            stroke="url(#logoFlourishGold)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M 78 9 C 88 17, 98 17, 108 9 C 114 4, 118 4, 120 9 C 122 4, 126 4, 132 9 C 142 17, 152 17, 162 9"
            stroke="url(#logoFlourishGold)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Center drop jewel */}
          <path
            d="M 120 6 C 118 10, 120 13, 120 13 C 120 13, 122 10, 120 6 Z"
            fill="url(#logoFlourishGold)"
          />

          {/* Right horizontal line */}
          <line x1="168" y1="9" x2="238" y2="9" stroke="url(#logoFlourishGold)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
