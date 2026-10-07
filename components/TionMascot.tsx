import React from 'react';
import { useGame } from '../context/GameContext';
import { HeadwearType, OutfitType, AccessoryType, HandheldType } from '../types';

interface TionMascotProps {
  mood?: 'happy' | 'cheer' | 'thinking' | 'sad' | 'talking';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bubbleText?: string;
  className?: string;
  // Optional explicit overrides for shop preview or fitting room
  headwear?: HeadwearType | string;
  outfit?: OutfitType | string;
  accessory?: AccessoryType | string;
  handheld?: HandheldType | string;
}

export const TionMascot: React.FC<TionMascotProps> = ({
  mood = 'happy',
  size = 'md',
  bubbleText,
  className = '',
  headwear,
  outfit,
  accessory,
  handheld
}) => {
  // Read current equipped gear from user stats if not explicitly passed
  let currentHeadwear = headwear;
  let currentOutfit = outfit;
  let currentAccessory = accessory;
  let currentHandheld = handheld;

  try {
    const { stats } = useGame();
    if (!currentHeadwear) currentHeadwear = stats.activeHeadwear || 'blangkon_klasik';
    if (!currentOutfit) currentOutfit = stats.activeOutfit || 'surjan_biru';
    if (!currentAccessory) currentAccessory = stats.activeAccessory || 'none';
    if (!currentHandheld) currentHandheld = stats.activeHandheld || 'none';
  } catch {
    // Fallbacks if rendered outside provider
    if (!currentHeadwear) currentHeadwear = 'blangkon_klasik';
    if (!currentOutfit) currentOutfit = 'surjan_biru';
    if (!currentAccessory) currentAccessory = 'none';
    if (!currentHandheld) currentHandheld = 'none';
  }

  // Normalize legacy outfit ids
  if (currentOutfit === 'classic') currentOutfit = 'surjan_biru';
  if (currentOutfit === 'blangkon_emas') {
    currentOutfit = 'surjan_biru';
    currentHeadwear = 'blangkon_emas';
  }
  if (currentOutfit === 'batik_keraton') {
    currentOutfit = 'beskap_keraton';
  }

  const sizeMap = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-40 h-40 sm:w-44 sm:h-44',
    xl: 'w-52 h-52 sm:w-60 sm:h-60'
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Dynamic Speech Bubble */}
      {bubbleText && (
        <div className="absolute -top-12 z-30 bg-white border-2 border-[#1e88e5]/50 px-3.5 py-1.5 rounded-2xl shadow-lg text-xs md:text-sm font-black text-[#1565c0] whitespace-nowrap animate-bounce duration-700">
          {bubbleText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
        </div>
      )}

      <div className={`${sizeMap[size]} transition-all duration-300 transform hover:scale-105 relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 260 290"
          className="w-full h-full drop-shadow-md overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tionSkinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe7cc" />
              <stop offset="100%" stopColor="#fed2a4" />
            </linearGradient>
            <linearGradient id="ugmJasGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bf9b6b" />
              <stop offset="50%" stopColor="#ab8351" />
              <stop offset="100%" stopColor="#966e3b" />
            </linearGradient>
            <linearGradient id="surjanBlueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e88e5" />
            </linearGradient>
            <linearGradient id="hoodieGrayGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="batikParangGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="goldBlangkonGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="cumlaudeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="teaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* ========================================================
              LAYER 0: BACKPACK / REAR HANDHELD (e.g. Gitar di Punggung)
              ======================================================== */}
          {currentHandheld === 'gitar_burjo' && (
            <g id="rear-gitar-burjo">
              {/* Guitar body angled behind shoulder */}
              <ellipse cx="62" cy="190" rx="20" ry="26" fill="#b45309" stroke="#451a03" strokeWidth="3" transform="rotate(-25 62 190)" />
              <ellipse cx="50" cy="165" rx="14" ry="18" fill="#d97706" stroke="#451a03" strokeWidth="2.5" transform="rotate(-25 50 165)" />
              {/* Soundhole */}
              <circle cx="56" cy="178" r="6" fill="#451a03" />
              {/* Guitar Neck */}
              <rect x="22" y="112" width="8" height="42" fill="#78350f" stroke="#451a03" strokeWidth="2" transform="rotate(-25 26 133)" />
              {/* Headstock */}
              <rect x="14" y="96" width="12" height="18" rx="2" fill="#b45309" stroke="#451a03" strokeWidth="2" transform="rotate(-25 20 105)" />
              {/* Guitar strap across chest */}
              <path d="M48 150 C76 172 136 210 160 236" stroke="#1e293b" strokeWidth="4" fill="none" opacity="0.9" />
            </g>
          )}

          {/* ========================================================
              LAYER 1: REAR HEADWEAR (e.g. Mondholan behind head)
              ======================================================== */}
          {currentHeadwear === 'blangkon_klasik' && (
            <g id="rear-mondholan-klasik">
              <circle cx="202" cy="74" r="16" fill="#4a2511" stroke="#2c1a0e" strokeWidth="3.5" />
              <circle cx="203" cy="74" r="10" fill="#78350f" />
              <path d="M195 70 Q203 76 211 70" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.8" />
            </g>
          )}

          {currentHeadwear === 'blangkon_emas' && (
            <g id="rear-mondholan-emas">
              <circle cx="202" cy="74" r="16" fill="url(#goldBlangkonGrad)" stroke="#78350f" strokeWidth="3.5" />
              <circle cx="203" cy="74" r="9" fill="#fef08a" />
            </g>
          )}

          {currentHeadwear === 'headband_ppsmb' && (
            <g id="headband-ribbon-tails">
              <path d="M206 96 C220 102 232 118 226 130 C220 120 212 110 204 105 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2.5" />
              <path d="M202 100 C216 112 222 134 212 144 C210 130 204 118 198 108 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            </g>
          )}

          {/* ========================================================
              LAYER 2: EARS & HEAD BASE
              ======================================================== */}
          {/* Soft Ears */}
          <circle cx="52" cy="136" r="14" fill="#fed2a4" stroke="#2c2016" strokeWidth="3.5" />
          <circle cx="208" cy="136" r="14" fill="#fed2a4" stroke="#2c2016" strokeWidth="3.5" />
          <circle cx="52" cy="136" r="6" fill="#fca5a5" opacity="0.6" />
          <circle cx="208" cy="136" r="6" fill="#fca5a5" opacity="0.6" />

          {/* Chibi Head */}
          <rect x="54" y="70" width="152" height="132" rx="46" fill="url(#tionSkinGrad)" stroke="#2c2016" strokeWidth="4" />

          {/* Hair strands on sides & under forehead */}
          <path
                d="M 56 96 C 53.11 33.67 206.51 35.16 204 96 L 203.91 106.28 C 186 74 175.61 115.59 128.7 85.05 C 101.89 88.41 74 74 56.84 109.26 Z"
                fill="#2c2016"
                stroke="#1a120b"
                strokeWidth="3.5"/>
          <path d="M 54 96 C 46 128 48 150 56 156 C 58 132 62 110 66 96 Z" fill="#2c2016" />
          <path d="M 206 96 C 214 128 212 150 204 156 C 202 132 198 110 194 96 Z" fill="#2c2016" />

          {/* Full Hair / Bangs when no full hat is worn */}
          {(currentHeadwear === 'none' || currentHeadwear === 'headband_ppsmb' ) && (
            <g id="tion-full-hair">
              {/* Top Hair Volume */}
              <path
                d="M56 86 C54 36 206 36 204 86 C186 64 160 60 130 62 C100 60 74 64 56 86 Z"
                fill="#2c2016"
                stroke="#1a120b"
                strokeWidth="3.5"
              />
              {/* Cute Bangs overlapping forehead */}
              <path d="M72 82 C82 98 94 104 102 86 C110 102 124 106 132 86 C140 102 154 104 164 86 C174 98 184 98 188 84" fill="#2c2016" />
              {/* Playful Anime Ahoge Cowlick */}
              <path d="M130 42 C125 24 140 18 145 28 C140 28 133 34 130 42 Z" fill="#2c2016" />
            </g>
          )}

          {/* ========================================================
              LAYER 3: LEGS & SHOES
              ======================================================== */}
          {/* Little Shoes */}
          <ellipse cx="106" cy="272" rx="16" ry="8" fill="#1e293b" stroke="#2c2016" strokeWidth="3" />
          <ellipse cx="154" cy="272" rx="16" ry="8" fill="#1e293b" stroke="#2c2016" strokeWidth="3" />
          {/* Shoe highlights */}
          <ellipse cx="104" cy="270" rx="8" ry="3" fill="#64748b" opacity="0.6" />
          <ellipse cx="152" cy="270" rx="8" ry="3" fill="#64748b" opacity="0.6" />

          {/* ========================================================
              LAYER 4: BODY / OUTFIT (TORSO)
              ======================================================== */}
          {/* 1. JAS ALMAMATER UGM (The Iconic Khaki "Jas Karung Goni") */}
          {currentOutfit === 'jas_almamater' && (
            <g id="outfit-jas-almamater">
              {/* Base Blazer Torso */}
              <path d="M68 184 C68 242 74 266 130 266 C186 266 192 242 192 184 Z" fill="url(#ugmJasGrad)" stroke="#2c2016" strokeWidth="4" />
              {/* White Collared Shirt V-Neck & Dark Tie */}
              <polygon points="110,184 130,222 150,184" fill="#ffffff" stroke="#2c2016" strokeWidth="2.5" />
              <polygon points="126,182 134,182 136,224 130,230 124,224" fill="#0f172a" stroke="#2c2016" strokeWidth="1.5" />
              {/* Lapels of Blazer */}
              <path d="M96 184 L120 236 L130 236 L130 266" stroke="#2c2016" strokeWidth="3.5" fill="none" />
              <path d="M164 184 L140 236 L130 236" stroke="#2c2016" strokeWidth="3.5" fill="none" />
              {/* Golden Blazer Buttons */}
              <circle cx="130" cy="242" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              <circle cx="130" cy="254" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              {/* Pocket with Official UGM Crest Badge on Left Chest */}
              <rect x="84" y="212" width="22" height="18" rx="3" fill="#966e3b" stroke="#2c2016" strokeWidth="2" />
              <circle cx="95" cy="220" r="5" fill="#feffdb" stroke="#f59e0b" strokeWidth="1.2" />
              <path d="M93 220 L97 220 M95 218 L95 222" stroke="#ffffff" strokeWidth="1.2" />
            </g>
          )}

          {/* 2. KAOS PPSMB GAMADA (White T-Shirt with PPSMB Lanyard) */}
          {currentOutfit === 'kaos_ppsmb' && (
            <g id="outfit-kaos-ppsmb">
              {/* White T-Shirt */}
              <path d="M68 184 C68 242 74 266 130 266 C186 266 192 242 192 184 Z" fill="#f8fafc" stroke="#2c2016" strokeWidth="4" />
              {/* Blue Ribbed Crewneck Collar */}
              <path d="M102 184 Q130 200 158 184" fill="none" stroke="#1e88e5" strokeWidth="6" />
              {/* PPSMB PALAPA Logo on Chest */}
              <rect x="108" y="206" width="44" height="20" rx="5" fill="#1e88e5" stroke="#2c2016" strokeWidth="1.8" />
              <text x="130" y="220" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="900" fontFamily="sans-serif">
                PPSMB
              </text>
              {/* Lanyard Strap hanging down */}
              <path d="M116 186 C120 220 126 236 128 244" stroke="#f59e0b" strokeWidth="3" fill="none" />
              <path d="M144 186 C140 220 134 236 132 244" stroke="#f59e0b" strokeWidth="3" fill="none" />
              {/* ID Card Badge */}
              <rect x="122" y="242" width="16" height="20" rx="2" fill="#ffffff" stroke="#2c2016" strokeWidth="1.5" />
              <rect x="124" y="244" width="12" height="6" fill="#1e88e5" />
              <circle cx="130" cy="254" r="2.5" fill="#ef4444" />
            </g>
          )}

          {/* 3. BESKAP KERATON (Black Ceremonial Beskap with Gold Piping) */}
          {currentOutfit === 'beskap_keraton' && (
            <g id="outfit-beskap-keraton">
              {/* Black Jacket */}
              <path d="M68 184 C68 242 74 266 130 266 C186 266 192 242 192 184 Z" fill="#1e293b" stroke="#2c2016" strokeWidth="4" />
              {/* High Stand Collar with Gold Border */}
              <path d="M104 184 Q130 196 156 184" fill="#ffffff" stroke="#f59e0b" strokeWidth="4" />
              {/* Asymmetrical Traditional Front Fold */}
              <path d="M136 184 L148 266" stroke="#f59e0b" strokeWidth="3.5" />
              {/* Gold Button Row */}
              {[196, 210, 224, 238, 252].map(btnY => (
                <circle key={btnY} cx="134" cy={btnY} r="3" fill="#fbbf24" stroke="#78350f" strokeWidth="1.2" />
              ))}
            </g>
          )}

          {/* 4. BATIK PARANG (Elegant Javanese Batik Parang Rusak Shirt) */}
          {currentOutfit === 'batik_parang' && (
            <g id="outfit-batik-parang">
              <path d="M68 184 C68 242 74 266 130 266 C186 266 192 242 192 184 Z" fill="url(#batikParangGrad)" stroke="#2c2016" strokeWidth="4" />
              {/* Diagonal Batik Parang Motifs */}
              <path d="M78 194 L110 264" stroke="#fef3c7" strokeWidth="3" strokeDasharray="5 3" opacity="0.8" />
              <path d="M98 188 L130 264" stroke="#fef3c7" strokeWidth="3" strokeDasharray="5 3" opacity="0.8" />
              <path d="M118 184 L150 264" stroke="#fef3c7" strokeWidth="3" strokeDasharray="5 3" opacity="0.8" />
              <path d="M138 188 L170 264" stroke="#fef3c7" strokeWidth="3" strokeDasharray="5 3" opacity="0.8" />
              {/* Collar & Buttons */}
              <polygon points="112,184 130,208 148,184" fill="#58240c" stroke="#2c2016" strokeWidth="2" />
              <circle cx="130" cy="220" r="3" fill="#fef3c7" />
              <circle cx="130" cy="238" r="3" fill="#fef3c7" />
              <circle cx="130" cy="254" r="3" fill="#fef3c7" />
            </g>
          )}

          {/* 5. HOODIE BULAKSUMUR UGM (Cozy Gray College Hoodie) */}
          {currentOutfit === 'hoodie_ugm' && (
            <g id="outfit-hoodie-ugm">
              <path d="M68 184 C68 242 74 266 130 266 C186 266 192 242 192 184 Z" fill="url(#hoodieGrayGrad)" stroke="#2c2016" strokeWidth="4" />
              {/* Thick Hood Collar Rim */}
              <path d="M96 182 C108 200 152 200 164 182" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" fill="none" />
              {/* White Drawstrings */}
              <path d="M118 196 L118 226" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M142 196 L142 226" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              {/* Kangaroo Pocket */}
              <path d="M94 234 L166 234 L160 264 L100 264 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
              {/* UGM 1949 Text on Chest */}
              <text x="130" y="218" textAnchor="middle" fill="#1565c0" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
                UGM 1949
              </text>
            </g>
          )}

          {/* 6. SURJAN BIRU (Default: Cerulean Blue Traditional Javanese Surjan) */}
          {(currentOutfit === 'surjan_biru' || (!['jas_almamater', 'kaos_ppsmb', 'beskap_keraton', 'batik_parang', 'hoodie_ugm'].includes(currentOutfit))) && (
            <g id="outfit-surjan-biru">
              {/* Cerulean Blue Surjan Torso */}
              <path d="M68 184 C68 242 74 266 130 266 C186 266 192 242 192 184 Z" fill="url(#surjanBlueGrad)" stroke="#2c2016" strokeWidth="4" />
              {/* Diagonal Traditional Surjan Lapel Fold & Gold Buttons */}
              <path d="M100 182 L146 260" stroke="#f59e0b" strokeWidth="4" />
              <circle cx="118" cy="206" r="4" fill="#f59e0b" stroke="#2c2016" strokeWidth="2" />
              <circle cx="132" cy="232" r="4" fill="#f59e0b" stroke="#2c2016" strokeWidth="2" />
              {/* Soft Cream Inner Collar */}
              <path d="M104 182 Q130 198 156 182" fill="#fef3c7" stroke="#2c2016" strokeWidth="3" />
              {/* Gold Floral Dots */}
              <circle cx="88" cy="226" r="3.5" fill="#fbbf24" opacity="0.8" />
              <circle cx="172" cy="226" r="3.5" fill="#fbbf24" opacity="0.8" />
              <circle cx="150" cy="248" r="3" fill="#fbbf24" opacity="0.8" />
            </g>
          )}

          {/* ========================================================
              LAYER 5: ARMS (MOOD-BASED) & HANDHELD ITEMS
              ======================================================== */}
          {/* Arm Sleeve Fill Color based on outfit */}
          {(() => {
            const sleeveColor =
              currentOutfit === 'jas_almamater'
                ? '#ab8351'
                : currentOutfit === 'beskap_keraton'
                ? '#1e293b'
                : currentOutfit === 'batik_parang'
                ? '#78350f'
                : currentOutfit === 'hoodie_ugm'
                ? '#cbd5e1'
                : currentOutfit === 'kaos_ppsmb'
                ? '#fed2a4' // short sleeve shows skin
                : '#1e88e5'; // surjan blue

            if (mood === 'cheer') {
              return (
                <g id="arms-cheer">
                  <path d="M56 184 C32 152 20 120 44 98 C58 112 66 146 70 182 Z" fill="#fed2a4" stroke="#2c2016" strokeWidth="4" />
                  <path d="M204 184 C228 152 240 120 216 98 C202 112 194 146 190 182 Z" fill="#fed2a4" stroke="#2c2016" strokeWidth="4" />
                  {/* Cuffs */}
                  <path d="M38 120 L50 112" stroke={sleeveColor} strokeWidth="10" strokeLinecap="round" />
                  <path d="M222 120 L210 112" stroke={sleeveColor} strokeWidth="10" strokeLinecap="round" />
                </g>
              );
            }

            if (mood === 'thinking') {
              return (
                <g id="arms-thinking">
                  <path d="M58 186 C38 200 28 222 54 232 C66 222 70 204 72 188 Z" fill="#fed2a4" stroke="#2c2016" strokeWidth="4" />
                  <path d="M202 186 C236 180 228 150 196 154 C190 168 195 182 202 186 Z" fill="#fed2a4" stroke="#2c2016" strokeWidth="4" />
                  <circle cx="196" cy="152" r="10" fill="#fed2a4" stroke="#2c2016" strokeWidth="3" />
                </g>
              );
            }

            // Default: Waving right hand, relaxed left hand
            return (
              <g id="arms-friendly">
                <path d="M58 186 C36 198 26 220 52 232 C64 222 70 204 72 188 Z" fill="#fed2a4" stroke="#2c2016" strokeWidth="4" />
                <path d="M202 186 C234 167 240 144 222 136 C208 150 200 174 196 188 Z" fill="#fed2a4" stroke="#2c2016" strokeWidth="4" />
                <circle cx="225" cy="137" r="9" fill="#fed2a4" stroke="#2c2016" strokeWidth="3" />
              </g>
            );
          })()}

          {/* ========================================================
              LAYER 6: SPECIAL ACCESSORIES (CHEST / SHOULDER LEVEL)
              ======================================================== */}
          {/* 1. SELEMPANG MAHASISWA CUMLAUDE UGM */}
          {currentAccessory === 'selempang_cumlaude' && (
            <g id="accessory-selempang-cumlaude">
              <path
                d="M74 190 L166 264 L180 264 L90 184 Z"
                fill="url(#cumlaudeGrad)"
                stroke="#b45309"
                strokeWidth="2.5"
              />
              <line x1="166" y1="264" x2="180" y2="264" stroke="#78350f" strokeWidth="3" />
              <text
                x="132"
                y="232"
                transform="rotate(38 132 232)"
                fontSize="7.5"
                fontWeight="900"
                fill="#002244"
                textAnchor="middle"
                fontFamily="sans-serif"
                letterSpacing="0.8"
              >
                CUM LAUDE
              </text>
            </g>
          )}

          {/* 2. HASDUK / SLAYER PPSMB PALAPA */}
          {currentAccessory === 'hasduk_palapa' && (
            <g id="accessory-hasduk-palapa">
              <path d="M96 182 C112 198 126 210 130 216 C134 210 148 198 164 182" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M98 184 C112 198 126 208 130 214 C134 208 148 198 162 184" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="130" cy="216" r="4.5" fill="#f59e0b" stroke="#2c2016" strokeWidth="1.8" />
              <path d="M128 220 L124 246 L130 244 L136 246 L132 220 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
            </g>
          )}

          {/* 3. TOTEBAG KANVAS & BUKU UGM */}
          {currentAccessory === 'totebag_ugm' && (
            <g id="accessory-totebag-ugm">
              <path d="M80 186 C64 216 56 244 54 260" stroke="#cbd5e1" strokeWidth="4" fill="none" />
              <rect x="34" y="226" width="36" height="44" rx="4" fill="#f8fafc" stroke="#2c2016" strokeWidth="2.5" />
              <circle cx="52" cy="248" r="8" fill="#1e88e5" />
              <text x="52" y="251" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="900">
                UGM
              </text>
            </g>
          )}

          {/* ========================================================
              LAYER 7: FACIAL FEATURES (EYES, NOSE, MOUTH, CHEEKS)
              ======================================================== */}
          {/* Big Sparkly Anime Eyes */}
          <circle cx="96" cy="130" r="22" fill="#ffffff" stroke="#2c2016" strokeWidth="3.5" />
          <circle cx="164" cy="130" r="22" fill="#ffffff" stroke="#2c2016" strokeWidth="3.5" />

          {/* Iris & Pupils */}
          {mood === 'sad' ? (
            <>
              <ellipse cx="96" cy="134" rx="12" ry="11" fill="#451a03" />
              <ellipse cx="164" cy="134" rx="12" ry="11" fill="#451a03" />
              <circle cx="93" cy="130" r="4" fill="#ffffff" />
              <circle cx="161" cy="130" r="4" fill="#ffffff" />
            </>
          ) : mood === 'thinking' ? (
            <>
              <ellipse cx="101" cy="124" rx="12" ry="13" fill="#451a03" />
              <ellipse cx="169" cy="124" rx="12" ry="13" fill="#451a03" />
              <circle cx="98" cy="120" r="4" fill="#ffffff" />
              <circle cx="166" cy="120" r="4" fill="#ffffff" />
            </>
          ) : (
            <>
              <ellipse cx="96" cy="130" rx="13" ry="14" fill="#451a03" />
              <ellipse cx="164" cy="130" rx="13" ry="14" fill="#451a03" />
              {/* Sweet Dual Catchlights */}
              <circle cx="92" cy="124" r="5" fill="#ffffff" />
              <circle cx="160" cy="124" r="5" fill="#ffffff" />
              <circle cx="101" cy="136" r="2.5" fill="#fbbf24" />
              <circle cx="169" cy="136" r="2.5" fill="#fbbf24" />
            </>
          )}

          {/* Eyebrows */}
          {mood === 'sad' ? (
            <>
              <path d="M84 106 Q96 112 108 104" stroke="#2c2016" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M152 104 Q164 112 176 106" stroke="#2c2016" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <path d="M84 104 Q96 97 108 104" stroke="#2c2016" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M152 104 Q164 97 176 104" stroke="#2c2016" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Cute Button Nose */}
          <ellipse cx="130" cy="142" rx="4.5" ry="3.5" fill="#e29578" />

          {/* Mouth (unless covered by mask) */}
          {currentAccessory !== 'masker_santun' && (
            <>
              {mood === 'sad' ? (
                <path d="M120 162 Q130 154 140 162" stroke="#2c2016" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              ) : mood === 'talking' || mood === 'cheer' ? (
                <path d="M116 154 Q130 172 144 154 Z" fill="#dc2626" stroke="#2c2016" strokeWidth="3" />
              ) : (
                <path d="M118 152 Q130 164 142 152" stroke="#2c2016" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              )}
            </>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="76" cy="146" rx="8" ry="5" fill="#fca5a5" opacity="0.8" />
          <ellipse cx="184" cy="146" rx="8" ry="5" fill="#fca5a5" opacity="0.8" />

          {/* ========================================================
              LAYER 8: FACE ACCESSORIES (GLASSES / SUNGLASSES / MASK)
              ======================================================== */}
          {/* 1. MASKER MEDIS SANTUN */}
          {currentAccessory === 'masker_santun' && (
            <g id="accessory-masker-santun">
              {/* Ear loop straps */}
              <path d="M64 148 C56 142 54 136 60 134" stroke="#bae6fd" strokeWidth="2.5" fill="none" />
              <path d="M196 148 C204 142 206 136 200 134" stroke="#bae6fd" strokeWidth="2.5" fill="none" />
              {/* Mask Body */}
              <rect x="86" y="142" width="88" height="38" rx="10" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5" />
              {/* Pleats on mask */}
              <line x1="94" y1="152" x2="166" y2="152" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
              <line x1="94" y1="162" x2="166" y2="162" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
              {/* Small UGM blue dot */}
              <circle cx="160" cy="170" r="3" fill="#1e88e5" />
            </g>
          )}

          {/* 2. KACAMATA CERDAS (Round retro gold spectacles) */}
          {currentAccessory === 'kacamata_cerdas' && (
            <g id="accessory-kacamata-cerdas">
              <circle cx="96" cy="130" r="21" stroke="#b45309" strokeWidth="3.5" fill="#e0f2fe" fillOpacity="0.25" />
              <circle cx="164" cy="130" r="21" stroke="#b45309" strokeWidth="3.5" fill="#e0f2fe" fillOpacity="0.25" />
              <path d="M117 128 Q130 124 143 128" stroke="#b45309" strokeWidth="3.5" fill="none" />
              <path d="M75 128 L56 126" stroke="#b45309" strokeWidth="3" />
              <path d="M185 128 L204 126" stroke="#b45309" strokeWidth="3" />
              <line x1="86" y1="118" x2="94" y2="114" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <line x1="154" y1="118" x2="162" y2="114" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            </g>
          )}

          {/* 3. KACAMATA HITAM SUNMOR (Cool dark shades) */}
          {currentAccessory === 'kacamata_hitam' && (
            <g id="accessory-kacamata-hitam">
              {/* Left Lens Frame */}
              <path d="M74 120 L118 120 C118 138 110 148 96 148 C82 148 74 138 74 120 Z" fill="#0f172a" stroke="#334155" strokeWidth="3" />
              {/* Right Lens Frame */}
              <path d="M142 120 L186 120 C186 138 178 148 164 148 C150 148 142 138 142 120 Z" fill="#0f172a" stroke="#334155" strokeWidth="3" />
              {/* Bridge */}
              <line x1="118" y1="123" x2="142" y2="123" stroke="#334155" strokeWidth="3.5" />
              {/* Glare Reflection lines */}
              <line x1="84" y1="124" x2="108" y2="140" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <line x1="152" y1="124" x2="176" y2="140" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            </g>
          )}

          {/* ========================================================
              LAYER 9: HEADWEAR (FOREHEAD / TOP OF HEAD)
              ======================================================== */}
          {/* 1. BLANGKON YOGYAKARTA KLASIK */}
          {currentHeadwear === 'blangkon_klasik' && (
            <g id="headwear-blangkon-klasik">
              <path
                d="M52 76 C56 26 202 26 206 76 C180 86 80 86 52 76 Z"
                fill="#5c2d11"
                stroke="#2c2016"
                strokeWidth="4"
              />
              <path
                d="M50 78 Q128 66 208 78 Q128 74 50 78"
                fill="#8b4513"
                stroke="#2c2016"
                strokeWidth="3"
              />
              <path d="M66 74 C82 58 136 58 156 74" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" fill="none" />
              <path d="M78 64 C96 50 144 50 168 64" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="4 2" fill="none" />
              <path d="M92 54 C108 44 148 44 174 54" stroke="#f59e0b" strokeWidth="2" fill="none" />
              <circle cx="128" cy="50" r="5" fill="#f59e0b" stroke="#2c2016" strokeWidth="1.8" />
              <circle cx="128" cy="50" r="2.5" fill="#ffffff" />
            </g>
          )}

          {/* 2. TOPI MAHASISWA UGM (Blue Baseball Cap with UGM Crest) */}
          {currentHeadwear === 'topi_ugm' && (
            <g id="headwear-topi-ugm">
              <path
                d="M56 78 C56 22 202 22 202 78 C176 84 84 84 56 78 Z"
                fill="#1e88e5"
                stroke="#0f172a"
                strokeWidth="4"
              />
              <path d="M129 24 L129 76" stroke="#1565c0" strokeWidth="2" />
              <path d="M88 36 C102 52 114 66 122 76" stroke="#1565c0" strokeWidth="1.5" />
              <path d="M170 36 C156 52 144 66 136 76" stroke="#1565c0" strokeWidth="1.5" />
              <circle cx="129" cy="24" r="4.5" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.8" />
              <path
                d="M44 76 C54 68 128 66 214 76 C224 88 190 98 128 98 C66 98 34 88 44 76 Z"
                fill="#1565c0"
                stroke="#0f172a"
                strokeWidth="3.5"
              />
              <path d="M60 84 Q128 92 198 84" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              <circle cx="129" cy="52" r="10" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="129" cy="52" r="7" fill="#1e88e5" />
              <polygon points="129,48 131,52 135,52 132,54 133,58 129,55 125,58 126,54 123,52 127,52" fill="#fbbf24" />
            </g>
          )}

          {/* 3. BLANGKON KENCANA EMAS (Prada Gold Luxury Blangkon) */}
          {currentHeadwear === 'blangkon_emas' && (
            <g id="headwear-blangkon-emas">
              <path
                d="M52 76 C56 26 202 26 206 76 C180 86 80 86 52 76 Z"
                fill="url(#goldBlangkonGrad)"
                stroke="#78350f"
                strokeWidth="4"
              />
              <path
                d="M50 78 Q128 66 208 78 Q128 74 50 78"
                fill="#fef08a"
                stroke="#78350f"
                strokeWidth="3"
              />
              <path d="M66 74 C82 58 136 58 156 74" stroke="#ffffff" strokeWidth="2.5" fill="none" />
              <path d="M78 64 C96 50 144 50 168 64" stroke="#fef08a" strokeWidth="2.5" fill="none" />
              <circle cx="128" cy="50" r="6" fill="#dc2626" stroke="#78350f" strokeWidth="2" />
              <circle cx="126" cy="48" r="2" fill="#ffffff" />
            </g>
          )}

          {/* 4. HEADBAND PPSMB (Red-and-White Tied Band) */}
          {currentHeadwear === 'headband_ppsmb' && (
            <g id="headwear-headband-ppsmb">
              <path
                d="M52 86 C80 80 180 80 206 86 C180 96 80 96 52 86 Z"
                fill="#ef4444"
                stroke="#991b1b"
                strokeWidth="3"
              />
              <path
                d="M53 91 C80 86 180 86 205 91 C180 96 80 96 53 91 Z"
                fill="#ffffff"
              />
              <text x="129" y="90" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="900" fontFamily="sans-serif">
                GAMADA
              </text>
            </g>
          )}

          {/* 5. CAPING MABA PPSMB PALAPA (Conical Bamboo Sun Hat) */}
          {currentHeadwear === 'caping_ppsmb' && (
            <g id="headwear-caping-ppsmb">
              {/* Conical Brim Base */}
              <polygon points="130,12 28,86 232,86" fill="#fde047" stroke="#854d0e" strokeWidth="3.5" />
              {/* Red-White-Blue Painted Concentric Bands */}
              <polygon points="130,12 76,86 184,86" fill="#ef4444" opacity="0.85" />
              <polygon points="130,12 100,86 160,86" fill="#ffffff" />
              <polygon points="130,12 115,86 145,86" fill="#1e88e5" />
              {/* Bamboo weave texture rings */}
              <path d="M50 72 Q130 54 210 72" stroke="#a16207" strokeWidth="2" fill="none" />
              <path d="M74 52 Q130 40 186 52" stroke="#a16207" strokeWidth="1.8" fill="none" />
              {/* Top tip knot */}
              <circle cx="130" cy="12" r="4" fill="#a16207" />
              {/* Chin strap tied under ears */}
              <path d="M60 86 C60 148 130 168 130 168" stroke="#ef4444" strokeWidth="2.5" fill="none" />
              <path d="M200 86 C200 148 130 168 130 168" stroke="#ef4444" strokeWidth="2.5" fill="none" />
            </g>
          )}

          {/* 6. TOGA WISUDA SARJANA UGM (Graduation Mortarboard) */}
          {currentHeadwear === 'toga_ugm' && (
            <g id="headwear-toga-ugm">
              {/* Skull Cap Base */}
              <path d="M80 62 C80 40 180 40 180 62 Z" fill="#0f172a" stroke="#020617" strokeWidth="2.5" />
              {/* Diamond Mortarboard Top */}
              <polygon points="130,22 236,50 130,78 24,50" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
              {/* Golden Center Button */}
              <circle cx="130" cy="50" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              {/* Dangling Golden Tassel */}
              <path d="M130 50 Q160 54 186 76" stroke="#f59e0b" strokeWidth="3" fill="none" />
              <rect x="182" y="74" width="8" height="18" rx="2" fill="#fbbf24" stroke="#78350f" strokeWidth="1.2" />
            </g>
          )}

          {/* ========================================================
              LAYER 10: FOREGROUND HANDHELD ITEMS (IN RIGHT / LEFT HAND)
              ======================================================== */}
          {/* 1. ES TEH JUMBO SUNMOR */}
          {currentHandheld === 'es_teh_jumbo' && (
            <g id="handheld-es-teh">
              {/* Plastic Cup Body */}
              <polygon points="214,142 244,142 240,186 218,186" fill="url(#teaGradient)" stroke="#0f172a" strokeWidth="2" />
              {/* Ice cubes floating inside */}
              <rect x="222" y="146" width="7" height="7" rx="1.5" fill="#ffffff" fillOpacity="0.75" />
              <rect x="231" y="152" width="6" height="6" rx="1.5" fill="#ffffff" fillOpacity="0.75" />
              {/* Red Straw sticking out */}
              <line x1="228" y1="124" x2="232" y2="178" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
              {/* Clear Lid */}
              <ellipse cx="229" cy="142" rx="15" ry="3.5" fill="#e0f2fe" stroke="#0f172a" strokeWidth="2" />
              {/* Hand holding the cup */}
              <ellipse cx="228" cy="160" rx="6" ry="7" fill="#fed2a4" stroke="#2c2016" strokeWidth="2" />
            </g>
          )}

          {/* 2. MODUL DIKTAT & BUKU KULIAH TEBAL */}
          {currentHandheld === 'modul_diktat' && (
            <g id="handheld-modul-diktat">
              {/* Book Spine & Cover */}
              <rect x="210" y="140" width="34" height="46" rx="3" fill="#1e88e5" stroke="#0f172a" strokeWidth="2.5" transform="rotate(10 227 163)" />
              {/* White Pages Edge */}
              <rect x="214" y="143" width="28" height="40" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" transform="rotate(10 227 163)" />
              {/* UGM Logo on book cover */}
              <circle cx="226" cy="162" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <text x="226" y="164" textAnchor="middle" fill="#1e88e5" fontSize="4" fontWeight="900">
                UGM
              </text>
              {/* Hand gripping the book */}
              <circle cx="216" cy="162" r="7" fill="#fed2a4" stroke="#2c2016" strokeWidth="2" />
            </g>
          )}

          {/* 3. BENDERA MINI UGM PPSMB */}
          {currentHandheld === 'bendera_ugm' && (
            <g id="handheld-bendera-ugm">
              {/* Wooden flag pole held up */}
              <line x1="226" y1="110" x2="226" y2="188" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
              {/* Golden spear tip top */}
              <polygon points="226,104 229,110 223,110" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
              {/* Pennant Flag */}
              <path d="M226 112 L178 128 L226 144 Z" fill="#1e88e5" stroke="#0f172a" strokeWidth="2" />
              {/* Golden Yellow Sunburst in Flag */}
              <circle cx="210" cy="128" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
