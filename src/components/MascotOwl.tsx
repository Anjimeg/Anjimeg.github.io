import React from 'react';

interface MascotOwlProps {
  mood?: 'happy' | 'cheer' | 'thinking' | 'sad' | 'talking';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  outfit?: string;
  bubbleText?: string;
  className?: string;
}

export const MascotOwl: React.FC<MascotOwlProps> = ({
  mood = 'happy',
  size = 'md',
  outfit = 'classic',
  bubbleText,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
    xl: 'w-56 h-56'
  };

  const getBlangkonColor = () => {
    if (outfit === 'blangkon_emas') return { base: '#b45309', accent: '#f59e0b', fold: '#78350f' };
    if (outfit === 'batik_keraton') return { base: '#3b0764', accent: '#a855f7', fold: '#1e1b4b' };
    return { base: '#78350f', accent: '#b45309', fold: '#451a03' }; // Classic batik brown
  };

  const blangkon = getBlangkonColor();

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Optional Speech Bubble */}
      {bubbleText && (
        <div className="absolute -top-12 z-20 bg-white border-2 border-slate-200 px-3.5 py-1.5 rounded-2xl shadow-sm text-xs md:text-sm font-bold text-slate-700 whitespace-nowrap animate-bounce duration-700">
          {bubbleText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
        </div>
      )}

      <div className={`${sizeMap[size]} transition-transform duration-300 transform hover:scale-105`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Owl Body (Duolingo Green #58cc02) */}
          <path
            d="M40 115 C40 65, 160 65, 160 115 C160 165, 130 185, 100 185 C70 185, 40 165, 40 115 Z"
            fill="#58cc02"
          />

          {/* Owl Belly (Lighter Green) */}
          <ellipse
            cx="100"
            cy="138"
            rx="40"
            ry="38"
            fill="#8ee000"
          />

          {/* Traditional Javanese Surjan Collar / Neck accent */}
          <path
            d="M80 120 Q100 135 120 120"
            stroke="#46a302"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Feet (Orange) */}
          <ellipse cx="78" cy="186" rx="14" ry="7" fill="#ff9600" />
          <ellipse cx="122" cy="186" rx="14" ry="7" fill="#ff9600" />

          {/* Wings */}
          {mood === 'cheer' ? (
            <>
              {/* Wings up cheering */}
              <path
                d="M45 110 C20 70, 15 40, 40 50 C55 60, 52 95, 45 110 Z"
                fill="#46a302"
                className="animate-pulse"
              />
              <path
                d="M155 110 C180 70, 185 40, 160 50 C145 60, 148 95, 155 110 Z"
                fill="#46a302"
                className="animate-pulse"
              />
            </>
          ) : mood === 'thinking' ? (
            <>
              {/* Left wing scratching chin */}
              <path
                d="M42 120 C25 110, 35 80, 58 90 C50 110, 45 118, 42 120 Z"
                fill="#46a302"
              />
              <path
                d="M158 118 C175 110, 165 80, 142 90 C150 110, 155 118, 158 118 Z"
                fill="#46a302"
              />
            </>
          ) : (
            <>
              {/* Normal Wings */}
              <path
                d="M42 105 C26 120, 26 150, 48 152 C50 135, 48 115, 42 105 Z"
                fill="#46a302"
              />
              <path
                d="M158 105 C174 120, 174 150, 152 152 C150 135, 152 115, 158 105 Z"
                fill="#46a302"
              />
            </>
          )}

          {/* Big White Eyes */}
          <circle cx="76" cy="100" r="23" fill="#ffffff" />
          <circle cx="124" cy="100" r="23" fill="#ffffff" />

          {/* Eye Pupils based on Mood */}
          {mood === 'happy' || mood === 'cheer' ? (
            <>
              <circle cx="78" cy="98" r="11" fill="#4b4b4b" />
              <circle cx="122" cy="98" r="11" fill="#4b4b4b" />
              {/* Sparkle highlights */}
              <circle cx="75" cy="94" r="4" fill="#ffffff" />
              <circle cx="119" cy="94" r="4" fill="#ffffff" />
            </>
          ) : mood === 'thinking' ? (
            <>
              {/* Looking up right */}
              <circle cx="83" cy="93" r="11" fill="#4b4b4b" />
              <circle cx="129" cy="93" r="11" fill="#4b4b4b" />
              <circle cx="81" cy="90" r="4" fill="#ffffff" />
              <circle cx="127" cy="90" r="4" fill="#ffffff" />
            </>
          ) : mood === 'sad' ? (
            <>
              {/* Droopy sad eyes */}
              <path
                d="M66 102 C66 93, 86 93, 86 102 Z"
                fill="#4b4b4b"
              />
              <path
                d="M114 102 C114 93, 134 93, 134 102 Z"
                fill="#4b4b4b"
              />
            </>
          ) : (
            <>
              <circle cx="76" cy="98" r="11" fill="#4b4b4b" />
              <circle cx="124" cy="98" r="11" fill="#4b4b4b" />
              <circle cx="74" cy="94" r="4" fill="#ffffff" />
              <circle cx="122" cy="94" r="4" fill="#ffffff" />
            </>
          )}

          {/* Beak (Orange) */}
          {mood === 'sad' ? (
            <path
              d="M93 116 Q100 110 107 116 Q100 125 93 116 Z"
              fill="#ff9600"
            />
          ) : mood === 'talking' ? (
            <path
              d="M92 110 Q100 128 108 110 Q100 120 92 110 Z"
              fill="#ff9600"
            />
          ) : (
            <path
              d="M91 108 Q100 104 109 108 L100 124 Z"
              fill="#ff9600"
            />
          )}

          {/* JAVANESE BLANGKON (TRADITIONAL HEADGEAR) */}
          <g>
            {/* Blangkon Crown / Base */}
            <path
              d="M48 76 C52 46, 148 46, 152 76 C145 84, 55 84, 48 76 Z"
              fill={blangkon.base}
            />
            {/* Mondholan (Bulatan khas blangkon di bagian belakang/samping) */}
            <circle cx="152" cy="68" r="10" fill={blangkon.fold} />
            <circle cx="154" cy="68" r="6" fill={blangkon.accent} />

            {/* Blangkon Front Brim & Batik Pleats (Wiron) */}
            <path
              d="M46 76 Q100 68 154 76 Q100 75 46 76"
              fill={blangkon.accent}
              stroke={blangkon.fold}
              strokeWidth="2"
            />
            <path
              d="M60 74 C75 60, 125 60, 140 74"
              stroke={blangkon.accent}
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M72 65 C85 54, 115 54, 128 65"
              stroke={blangkon.accent}
              strokeWidth="2"
              fill="none"
            />

            {/* Little batik motif dot */}
            <circle cx="100" cy="56" r="3" fill="#fbbf24" />
          </g>
        </svg>
      </div>
    </div>
  );
};
