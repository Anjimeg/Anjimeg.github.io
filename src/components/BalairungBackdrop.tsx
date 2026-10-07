import React, { useState } from 'react';
import balairungLineArt from '../assets/images/balairung_lineart_1791357248684.jpg';

export const BalairungBackdrop: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft Academic White-Gray Canvas Wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#ffffff]" />

      {/* Balairung UGM Gedung Pusat Architectural Sketch / Line Art at Very Low Opacity (3.5%) */}
      {!imgError ? (
        <div className="absolute bottom-0 left-0 right-0 h-[600px] flex items-end justify-center opacity-[0.035] mix-blend-multiply pointer-events-none">
          <img
            src={balairungLineArt}
            alt="Balairung UGM Gedung Pusat"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      ) : null}

      {/* Balairung UGM Gedung Pusat Silhouette at Low Opacity (3%) */}
      <div className="absolute bottom-0 left-0 right-0 h-[480px] flex items-end justify-center opacity-[0.03] text-[#1e88e5] mix-blend-multiply">
        <svg
          viewBox="0 0 1200 450"
          className="w-full h-full max-w-7xl object-contain"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Roof (Gedung Pusat UGM Central Joglo Tiered Roof) */}
          <polygon points="600,20 540,80 660,80" />
          <polygon points="600,60 480,140 720,140" />
          <polygon points="600,110 380,200 820,200" />

          {/* Pediment / Front Entablature */}
          <rect x="360" y="200" width="480" height="25" rx="3" />

          {/* The Iconic Classical Pillars of Balairung UGM (Colonnade) */}
          {[
            390, 430, 470, 510, 550, 590, 610, 650, 690, 730, 770, 810
          ].map((x, idx) => (
            <rect key={idx} x={x - 6} y="225" width="12" height="150" rx="2" />
          ))}

          {/* Central Entrance Doors */}
          <rect x="575" y="295" width="50" height="80" rx="4" />

          {/* East and West Wings (Sayap Kanan & Sayap Kiri Balairung) */}
          <rect x="120" y="235" width="240" height="140" />
          <rect x="840" y="235" width="240" height="140" />

          {/* Wing Roofs */}
          <polygon points="240,195 100,235 380,235" />
          <polygon points="960,195 820,235 1100,235" />

          {/* Monumental Staircase & Plinth Base */}
          <rect x="80" y="375" width="1040" height="15" />
          <rect x="50" y="390" width="1100" height="18" />
          <rect x="20" y="408" width="1160" height="22" />
          <rect x="0" y="430" width="1200" height="20" />
        </svg>
      </div>

      {/* Subtle Batik Kawung/Parang Geometric Ambient Pattern in upper corners */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.02] text-[#1e88e5] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor">
          <circle cx="50" cy="50" r="30" />
          <circle cx="150" cy="50" r="30" />
          <circle cx="50" cy="150" r="30" />
          <circle cx="150" cy="150" r="30" />
          <circle cx="100" cy="100" r="25" />
        </svg>
      </div>
    </div>
  );
};
