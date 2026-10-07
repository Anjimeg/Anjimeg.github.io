import React, { useState } from 'react';
import { Gem, Heart, Shield, Sparkles, Check, Shirt, GraduationCap, Glasses, Briefcase, Lightbulb, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { TionMascot } from './TionMascot';
import { HeadwearType, OutfitType, AccessoryType, HandheldType, ShopItem } from '../types';
import { soundEffects } from '../utils/sound';

export const ShopView: React.FC = () => {
  const {
    stats,
    refillHearts,
    buyStreakFreeze,
    buyHints,
    equipItem,
    buyAndEquipItem,
    isItemOwned
  } = useGame();

  const [activeShopTab, setActiveShopTab] = useState<'outfit' | 'headwear' | 'accessory' | 'handheld' | 'utility'>('outfit');
  const [notification, setNotification] = useState<string | null>(null);

  // Preview gear in the fitting room / kamar pas
  const [previewHeadwear, setPreviewHeadwear] = useState<HeadwearType | string>(stats.activeHeadwear || 'blangkon_klasik');
  const [previewOutfit, setPreviewOutfit] = useState<OutfitType | string>(stats.activeOutfit || 'surjan_biru');
  const [previewAccessory, setPreviewAccessory] = useState<AccessoryType | string>(stats.activeAccessory || 'none');
  const [previewHandheld, setPreviewHandheld] = useState<HandheldType | string>(stats.activeHandheld || 'none');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3200);
  };

  const shopItems: ShopItem[] = [
    // --- OUTFITS (PAKAIAN & ATASAN) ---
    {
      id: 'jas_almamater',
      name: 'Jas Almamater UGM "Karung Goni"',
      description: 'Jas almamater kebanggaan mahasiswa Gadjah Mada warna khaki cokelat dengan emblem resmi UGM di saku dada.',
      category: 'outfit',
      cost: 0,
      icon: '🧥',
      mabaTip: 'Wajib dipakai saat Pionir!',
      rarity: 'Legendaris'
    },
    {
      id: 'surjan_biru',
      name: 'Surjan Biru Muda Gamavation',
      description: 'Busana tradisional surjan lurik khas Yogyakarta dengan warna biru muda cerah beraksen kancing emas.',
      category: 'outfit',
      cost: 0,
      icon: '👘',
      mabaTip: 'Busana santun saat sowan ke Keraton, pentas seni budaya, atau hari Kamis Pahing di UGM.',
      rarity: 'Umum'
    },
    {
      id: 'kaos_ppsmb',
      name: 'Kaos PPSMB Gamada + Lanyard ID Card',
      description: 'Kaos putih resmi orientasi maba UGM lengkap dengan kalung lanyard peserta dan kartu nama maba.',
      category: 'outfit',
      cost: 95,
      icon: '👕',
      mabaTip: 'Seragam hari pertama ospek kampus yang bikin kamu berbaur akrab dengan kawan se-nusantara!',
      rarity: 'Umum'
    },
    {
      id: 'batik_parang',
      name: 'Kemeja Batik Parang Rusak Maba',
      description: 'Kemeja batik motif Parang Rusak Barong khas Keraton Jogja bernuansa cokelat sogan yang rapi dan elegan.',
      category: 'outfit',
      cost: 110,
      icon: '👔',
      mabaTip: 'Pilihan paling aman dan sopan saat pertama kali masuk kelas kuliah atau bimbingan dosen.',
      rarity: 'Langka'
    },
    {
      id: 'hoodie_ugm',
      name: 'Hoodie Kampus Bulaksumur UGM',
      description: 'Jaket hoodie abu-abu hangat dengan sablon huruf atletik navy "UGM 1949" dan saku kanguru.',
      category: 'outfit',
      cost: 125,
      icon: '🧥',
      mabaTip: 'Pas banget buat belajar kelompok sampai malam di selasar perpustakaan atau GIK UGM!',
      rarity: 'Langka'
    },
    {
      id: 'beskap_keraton',
      name: 'Beskap Ageng Keraton Yogyakarta',
      description: 'Busana resmi keraton warna hitam arang dengan piping sulaman benang emas berkilau dan kancing deret.',
      category: 'outfit',
      cost: 180,
      icon: '👑',
      mabaTip: 'Paling gagah dan berwibawa untuk menghadiri wisuda akbar di Grha Sabha Pramana (GSP).',
      rarity: 'Legendaris'
    },

    // --- HEADWEAR (PENUTUP KEPALA) ---
    {
      id: 'blangkon_klasik',
      name: 'Blangkon Yogya Mondholan Klasik',
      description: 'Tutup kepala tradisional gaya Mataraman Yogyakarta dengan bulatan mondholan di belakang.',
      category: 'headwear',
      cost: 0,
      icon: '🪖',
      mabaTip: 'Simbol budi pekerti luhur, ketenangan batin, dan kesantunan mahasiswa di kota pelajar.',
      rarity: 'Umum'
    },
    {
      id: 'topi_ugm',
      name: 'Topi Mahasiswa UGM Biru',
      description: 'Topi baseball kampus warna biru muda dengan bordir lambang resmi Universitas Gadjah Mada.',
      category: 'headwear',
      cost: 85,
      icon: '🧢',
      mabaTip: 'Sangat berguna saat jalan kaki menyeberangi jembatan kampus atau naik sepeda kampus Bulaksumur.',
      rarity: 'Umum'
    },
    {
      id: 'caping_ppsmb',
      name: 'Caping Bambu Formasi PPSMB Palapa',
      description: 'Topi caping anyaman bambu dengan cat konsentris merah-putih-biru yang dipakai saat formasi akbar di lapangan.',
      category: 'headwear',
      cost: 95,
      icon: '👒',
      mabaTip: 'Ikon selebrasi formasi mozaik akbar mahasiswa baru UGM yang viral tiap tahun di seluruh dunia!',
      rarity: 'Langka'
    },
    {
      id: 'headband_ppsmb',
      name: 'Ikat Kepala Merah Putih GAMADA',
      description: 'Ikat kepala semangat mahasiswa baru bertuliskan "GAMADA" (Gadjah Mada Muda) dengan pita berkibar.',
      category: 'headwear',
      cost: 75,
      icon: '🎀',
      mabaTip: 'Membangkitkan daya juang maba rantau saat masa-masa adaptasi awal di perantauan.',
      rarity: 'Umum'
    },
    {
      id: 'toga_ugm',
      name: 'Toga Wisuda Sarjana Gadjah Mada',
      description: 'Topi toga segi lima wisudawan UGM dengan kuncir emas dan pita kebanggaan.',
      category: 'headwear',
      cost: 0,
      icon: '🎓',
      mabaTip: 'Tujuan akhir setiap maba: pindah kuncir toga dari kiri ke kanan di Grha Sabha Pramana!',
      rarity: 'Legendaris'
    },
    {
      id: 'blangkon_emas',
      name: 'Blangkon Kencana Prada Emas',
      description: 'Blangkon mewah bersepuh prada emas mengilap dengan sematan permata mirah delima merah.',
      category: 'headwear',
      cost: 160,
      icon: '✨',
      mabaTip: 'Mahakarya budaya yang melambangkan kemuliaan ilmu pengetahuan dan keluhuran budi.',
      rarity: 'Legendaris'
    },

    // --- ACCESSORIES (AKSESORIS WAJAH & DADA) ---
    {
      id: 'kacamata_cerdas',
      name: 'Kacamata Bulat Mahasiswa Ambis',
      description: 'Kacamata bulat retro bernuansa cerdas untuk maba yang rajin nongkrong di Perpus Pusat UGM.',
      category: 'accessory',
      cost: 70,
      icon: '👓',
      mabaTip: 'Bikin Tion kelihatan makin wasis (pintar) saat belajar undha-usuk basa Jawa!',
      rarity: 'Umum'
    },
    {
      id: 'kacamata_hitam',
      name: 'Kacamata Hitam Trendy Sunmor',
      description: 'Kacamata hitam keren anti-silau untuk jalan santai mingguan di kawasan Lembah UGM.',
      category: 'accessory',
      cost: 80,
      icon: '🕶️',
      mabaTip: 'Gaya maksimal saat jalan-jalan cari sarapan gudeg atau es kelapa di Sunday Morning UGM.',
      rarity: 'Umum'
    },
    {
      id: 'hasduk_palapa',
      name: 'Hasduk / Slayer PPSMB Palapa',
      description: 'Slayer merah-putih Gugus Palapa UGM yang dikalungkan di leher dengan ring woggle kencana.',
      category: 'accessory',
      cost: 65,
      icon: '🧣',
      mabaTip: 'Aksesoris pemersatu seluruh mahasiswa baru dari Sabang sampai Merauke.',
      rarity: 'Umum'
    },
    {
      id: 'masker_santun',
      name: 'Masker Medis Pelindung Maba',
      description: 'Masker kesehatan warna biru muda higienis untuk menjaga kesehatan selama kegiatan kampus.',
      category: 'accessory',
      cost: 45,
      icon: '😷',
      mabaTip: 'Bagus untuk melindungi diri dari debu jalanan saat naik ojek online di Jalan Kaliurang.',
      rarity: 'Umum'
    },
    {
      id: 'selempang_cumlaude',
      name: 'Selempang Wisudawan Cum Laude',
      description: 'Selempang satin emas bersulam huruf navy "UGM · CUM LAUDE" melintang gagah di dada.',
      category: 'accessory',
      cost: 155,
      icon: '🎖️',
      mabaTip: 'Target impian setiap maba: lulus tepat waktu dengan IPK tinggi predikat pujian!',
      rarity: 'Legendaris'
    },
    {
      id: 'totebag_ugm',
      name: 'Totebag Kanvas & Buku Materi UGM',
      description: 'Totebag kanvas kasual berlogo UGM lengkap dengan modul diktat catatan kuliah.',
      category: 'accessory',
      cost: 75,
      icon: '👜',
      mabaTip: 'Gaya mahasiswa estetik saat kuliah santai di Fakultas Filsafat atau FIB!',
      rarity: 'Umum'
    },

    // --- HANDHELD ITEMS (BARANG JINJINGAN / TANGAN) ---
    {
      id: 'es_teh_jumbo',
      name: 'Cup Es Teh Manis Jumbo Sunmor',
      description: 'Segelas es teh manis jumbo porsi mahasiswa dengan sedotan merah dan es batu segar pelepas dahaga.',
      category: 'handheld',
      cost: 60,
      icon: '🧋',
      mabaTip: 'Minuman penyelamat maba nomor satu di tengah teriknya matahari Jogja seharga tiga ribuan!',
      rarity: 'Umum'
    },
    {
      id: 'modul_diktat',
      name: 'Diktat Kuliah & Buku Dosen Tebal',
      description: 'Buku catatan kuliah bersampul biru tua dengan logo UGM dan pembatas pita kuning.',
      category: 'handheld',
      cost: 75,
      icon: '📚',
      mabaTip: 'Bawaan wajib maba rajin saat menghadiri kuliah pengantar di semester pertama.',
      rarity: 'Langka'
    },
    {
      id: 'bendera_ugm',
      name: 'Bendera Mini Panji Almamater UGM',
      description: 'Bendera kecil kebanggaan Universitas Gadjah Mada dengan tiang kayu yang dikibarkan saat perayaan.',
      category: 'handheld',
      cost: 85,
      icon: '🚩',
      mabaTip: 'Dikibarkan penuh suka cita saat upacara penutupan PPSMB di hadapan 10.000 mahasiswa!',
      rarity: 'Langka'
    },
    {
      id: 'gitar_burjo',
      name: 'Gitar Akustik Nongkrong Warmindo',
      description: 'Gitar kayu mini untuk santai bernyanyi bareng kawan satu kosan di warung burjo sampai malam.',
      category: 'handheld',
      cost: 130,
      icon: '🎸',
      mabaTip: 'Kunci mengakrabkan diri dengan sesama anak kos perantau sambil nunggu mie dok-dok matang!',
      rarity: 'Legendaris'
    }
  ];

  const handleEquipOrBuy = (item: ShopItem) => {
    const owned = isItemOwned(item.id);

    if (owned) {
      // Equip directly
      equipItem(item.category as any, item.id);
      if (item.category === 'headwear') setPreviewHeadwear(item.id);
      if (item.category === 'outfit') setPreviewOutfit(item.id);
      if (item.category === 'accessory') setPreviewAccessory(item.id);
      if (item.category === 'handheld') setPreviewHandheld(item.id);
      showToast(`${item.name} berhasil dipakai Tion! ✨`);
    } else {
      // Buy and equip
      if (stats.gems < item.cost) {
        showToast(`Intanmu belum cukup (butuh ${item.cost} intan). Selesaikan latihan bahasa Jawa untuk mengumpulkan intan! 💎`);
        return;
      }

      const success = buyAndEquipItem(item.category as any, item.id, item.cost);
      if (success) {
        if (item.category === 'headwear') setPreviewHeadwear(item.id);
        if (item.category === 'outfit') setPreviewOutfit(item.id);
        if (item.category === 'accessory') setPreviewAccessory(item.id);
        if (item.category === 'handheld') setPreviewHandheld(item.id);
        showToast(`Selamat! Berhasil membeli & memakai ${item.name}! 🎉`);
      }
    }
  };

  const handleUnequipItem = (category: 'headwear' | 'accessory' | 'handheld') => {
    if (category === 'headwear') {
      equipItem('headwear', 'blangkon_klasik');
      setPreviewHeadwear('blangkon_klasik');
      showToast('Kembali ke Blangkon Klasik.');
    } else if (category === 'accessory') {
      equipItem('accessory', 'none');
      setPreviewAccessory('none');
      showToast('Aksesoris wajah/dada dilepas.');
    } else if (category === 'handheld') {
      equipItem('handheld', 'none');
      setPreviewHandheld('none');
      showToast('Barang bawaan tangan dilepas.');
    }
  };

  const handleBuyHearts = () => {
    if (stats.hearts >= stats.maxHearts) {
      showToast('Nyawa kamu sudah penuh (5 nyawa)! ❤️');
      return;
    }
    if (refillHearts(false)) {
      showToast('Nyawa berhasil diisi penuh 5! ❤️');
    } else {
      showToast('Intan kamu tidak cukup (butuh 50 intan). Selesaikan kuis untuk dapat intan! 💎');
    }
  };

  const handleBuyFreeze = () => {
    if (buyStreakFreeze()) {
      showToast('Berhasil membeli 1 Pelindung Streak Harian! 🛡️');
    } else {
      showToast('Intan kamu tidak cukup (butuh 80 intan).');
    }
  };

  const handleBuyHints = (amount: number, cost: number, title: string) => {
    if (stats.gems < cost) {
      showToast(`Intanmu tidak cukup (butuh ${cost} intan). Jawab kuis untuk kumpulkan intan! 💎`);
      return;
    }
    if (buyHints(amount, cost)) {
      showToast(`Berhasil membeli ${title}! Sekarang kamu punya ${stats.hintCount + amount} petunjuk. 💡`);
    }
  };

  const currentCategoryItems = shopItems.filter(i => i.category === activeShopTab);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-28 md:pb-14">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#1565c0] text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-xl animate-bounce border-2 border-amber-300">
          {notification}
        </div>
      )}

      {/* Header Banner - Ramah Indonesia & Maba UGM */}
      <div className="text-center mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-[#1565c0] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Pasar Gamavation & Sunmor Bulaksumur UGM
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1565c0] mt-2">
          Pasar Aksesoris & Lemari Tion
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 max-w-xl mx-auto">
          Dapatkan intan dari setiap soal bahasa Jawa yang kamu jawab, lalu belanjakan untuk mendandani Maskot Tion dengan jas almamater UGM, blangkon, caping ospek, hingga es teh jumbo!
        </p>
      </div>

      {/* ========================================================
          FITTING ROOM / WARDROBE PREVIEW (KAMAR PAS MASKOT TION)
          ======================================================== */}
      <div className="bg-gradient-to-br from-white via-blue-50/70 to-amber-50/60 rounded-3xl p-4 sm:p-6 border-2 border-blue-200 shadow-sm mb-6 sm:mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Interactive Tion Preview in Fitting Room */}
          <div className="flex flex-col items-center">
            <div className="relative p-3 rounded-3xl bg-white/95 border-2 border-amber-300/80 shadow-md">
              <TionMascot
                size="lg"
                mood="cheer"
                headwear={previewHeadwear}
                outfit={previewOutfit}
                accessory={previewAccessory}
                handheld={previewHandheld}
                bubbleText="Keren kan penampilanku?"
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#1565c0] text-white text-[10px] font-black px-3 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                Kamar Pas Tion
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-500 mt-2">
              Pratinjau kostum saat dipakai Tion
            </span>
          </div>

          {/* Right: Wardrobe Status & Balance */}
          <div className="flex-1 w-full text-center sm:text-left">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#d97706] block">
                  Tabungan Intan Mahasiswa
                </span>
                <div className="text-2xl sm:text-3xl font-black flex items-center justify-center sm:justify-start gap-1.5 text-[#1565c0]">
                  <Gem className="w-6 h-6 sm:w-7 sm:h-7 fill-[#f59e0b] text-[#f59e0b]" /> {stats.gems} Intan
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-end">
                <div className="text-right bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-800 block">Petunjuk Belajar</span>
                  <span className="text-xs sm:text-sm font-black text-[#b45309]">
                    💡 {stats.hintCount} Tersedia
                  </span>
                </div>

                <div className="text-right bg-blue-50 px-3 py-1.5 rounded-2xl border border-blue-200">
                  <span className="text-[10px] font-bold text-slate-500 block">Pelindung Streak</span>
                  <span className="text-xs sm:text-sm font-black text-[#1565c0]">
                    🛡️ {stats.streakFreezeCount} Aktif
                  </span>
                </div>
              </div>
            </div>

            {/* Currently Equipped Summary */}
            <div className="mt-2 pt-3 border-t border-slate-200/90 space-y-2 text-xs">
              {/* Outfit */}
              <div className="flex items-center justify-between bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5 text-[#1e88e5]" /> Pakaian:
                </span>
                <span className="font-black text-[#1565c0] text-right truncate max-w-[180px]">
                  {shopItems.find(i => i.id === stats.activeOutfit)?.name || 'Surjan Biru'}
                </span>
              </div>

              {/* Headwear */}
              <div className="flex items-center justify-between bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#d97706]" /> Kepala:
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#1565c0] text-right truncate max-w-[150px]">
                    {shopItems.find(i => i.id === stats.activeHeadwear)?.name || 'Blangkon Klasik'}
                  </span>
                  {stats.activeHeadwear !== 'blangkon_klasik' && (
                    <button
                      onClick={() => handleUnequipItem('headwear')}
                      className="text-[10px] font-bold text-slate-500 hover:text-red-500 underline cursor-pointer"
                      title="Kembali ke blangkon klasik"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Accessory */}
              <div className="flex items-center justify-between bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                  <Glasses className="w-3.5 h-3.5 text-purple-600" /> Aksesoris:
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#1565c0]">
                    {stats.activeAccessory === 'none' ? 'Tidak Ada' : shopItems.find(i => i.id === stats.activeAccessory)?.name}
                  </span>
                  {stats.activeAccessory !== 'none' && (
                    <button
                      onClick={() => handleUnequipItem('accessory')}
                      className="text-[10px] font-bold text-red-500 hover:text-red-700 underline cursor-pointer"
                    >
                      Lepas
                    </button>
                  )}
                </div>
              </div>

              {/* Handheld */}
              <div className="flex items-center justify-between bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Bawaan Tangan:
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#1565c0]">
                    {stats.activeHandheld === 'none' ? 'Tidak Ada' : shopItems.find(i => i.id === stats.activeHandheld)?.name}
                  </span>
                  {stats.activeHandheld !== 'none' && (
                    <button
                      onClick={() => handleUnequipItem('handheld')}
                      className="text-[10px] font-bold text-red-500 hover:text-red-700 underline cursor-pointer"
                    >
                      Lepas
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs - Ramah Indonesia & Berwarna */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-2xl mx-auto mb-6 border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveShopTab('outfit')}
          className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeShopTab === 'outfit'
              ? 'bg-[#1e88e5] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>Pakaian</span>
        </button>

        <button
          onClick={() => setActiveShopTab('headwear')}
          className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeShopTab === 'headwear'
              ? 'bg-[#1e88e5] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Kepala</span>
        </button>

        <button
          onClick={() => setActiveShopTab('accessory')}
          className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeShopTab === 'accessory'
              ? 'bg-[#1e88e5] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Glasses className="w-3.5 h-3.5" />
          <span>Aksesoris</span>
        </button>

        <button
          onClick={() => setActiveShopTab('handheld')}
          className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeShopTab === 'handheld'
              ? 'bg-[#1e88e5] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Tangan & Bawaan</span>
        </button>

        <button
          onClick={() => setActiveShopTab('utility')}
          className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeShopTab === 'utility'
              ? 'bg-[#f59e0b] text-[#1e293b] font-black shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>Petunjuk & Perlengkapan</span>
        </button>
      </div>

      {/* ========================================================
          SHOP ITEMS GRID
          ======================================================== */}
      {activeShopTab !== 'utility' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentCategoryItems.map(item => {
            const owned = isItemOwned(item.id);
            const isEquipped =
              (item.category === 'outfit' && stats.activeOutfit === item.id) ||
              (item.category === 'headwear' && stats.activeHeadwear === item.id) ||
              (item.category === 'accessory' && stats.activeAccessory === item.id) ||
              (item.category === 'handheld' && stats.activeHandheld === item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between shadow-xs ${
                  isEquipped
                    ? 'border-[#1e88e5] ring-2 ring-blue-200 bg-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top Bar of Card: Icon + Name + Rarity Tag */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-slate-50 border border-slate-200 shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="font-black text-slate-900 text-base leading-snug">
                          {item.name}
                        </h3>
                        {item.rarity && (
                          <span
                            className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mt-0.5 ${
                              item.rarity === 'Legendaris'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : item.rarity === 'Langka'
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.rarity}
                          </span>
                        )}
                      </div>
                    </div>

                    {isEquipped && (
                      <span className="shrink-0 bg-blue-100 text-[#1565c0] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-blue-200">
                        <Check className="w-3 h-3" /> Dipakai
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-semibold mb-2.5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Lore / Maba Tip */}
                  {item.mabaTip && (
                    <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-2.5 mb-3 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold text-amber-900 leading-tight">
                        <span className="font-black">Catatan Maba: </span>{item.mabaTip}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-1.5 font-black text-sm text-[#1565c0]">
                    {item.cost === 0 ? (
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                        Bawaan Awal
                      </span>
                    ) : (
                      <>
                        <Gem className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                        <span>{item.cost} Intan</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Live Preview Button */}
                    <button
                      onClick={() => {
                        if (item.category === 'headwear') setPreviewHeadwear(item.id);
                        if (item.category === 'outfit') setPreviewOutfit(item.id);
                        if (item.category === 'accessory') setPreviewAccessory(item.id);
                        if (item.category === 'handheld') setPreviewHandheld(item.id);
                        if (stats.soundEnabled) soundEffects.playTap();
                      }}
                      className="px-2.5 py-1.5 text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Coba Pasang
                    </button>

                    {/* Equip / Buy Button */}
                    <button
                      disabled={isEquipped}
                      onClick={() => handleEquipOrBuy(item)}
                      className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                        isEquipped
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : owned
                          ? 'bg-[#1e88e5] text-white hover:bg-[#1565c0] shadow-xs'
                          : stats.gems >= item.cost
                          ? 'gama-btn-gold text-[#1e293b]'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isEquipped ? 'Sedang Dipakai' : owned ? 'Pakai' : 'Beli & Pakai'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ========================================================
            UTILITY TAB (PETUNJUK, NYAWA & STREAK)
            ======================================================== */
        <div className="space-y-4 max-w-xl mx-auto">
          {/* Petunjuk Bundle 1: Paket 3x Petunjuk */}
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center shrink-0 text-amber-700 shadow-2xs">
                <Lightbulb className="w-8 h-8 fill-amber-400 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900 text-base">Gulungan Petunjuk Maba (3x)</h3>
                  <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">Hemat</span>
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Mendapatkan 3 petunjuk kilat untuk mengeliminasi pilihan salah atau menata kalimat kuis.
                </p>
                <span className="text-[11px] font-bold text-[#b45309] block mt-1">
                  💡 Dimiliki sekarang: {stats.hintCount} petunjuk
                </span>
              </div>
            </div>

            <button
              onClick={() => handleBuyHints(3, 25, 'Paket 3 Petunjuk Maba')}
              className="px-4 py-2.5 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 gama-btn-gold text-[#1e293b] cursor-pointer shadow-xs"
            >
              <Gem className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" /> 25 Intan
            </button>
          </div>

          {/* Petunjuk Bundle 2: Paket Besar 10x Petunjuk */}
          <div className="bg-white rounded-3xl p-5 border-2 border-purple-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-300 flex items-center justify-center shrink-0 text-purple-700 shadow-2xs">
                <Sparkles className="w-8 h-8 text-purple-600 fill-purple-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900 text-base">Peti Petunjuk Gamada (10x)</h3>
                  <span className="text-[10px] font-black bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md">Paling Populer</span>
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Stok melimpah 10 petunjuk untuk belajar undha-usuk basa dan aksara Jawa tanpa macet.
                </p>
                <span className="text-[11px] font-bold text-purple-700 block mt-1">
                  Diskon 30% dibanding beli satuan
                </span>
              </div>
            </div>

            <button
              onClick={() => handleBuyHints(10, 70, 'Peti 10 Petunjuk Gamada')}
              className="px-4 py-2.5 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 gama-btn-gold text-[#1e293b] cursor-pointer shadow-xs"
            >
              <Gem className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" /> 70 Intan
            </button>
          </div>

          {/* Petunjuk Satuan: 1x Petunjuk */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-amber-600">
                <Lightbulb className="w-6 h-6 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">1x Petunjuk Kilat</h3>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Beli 1 petunjuk langsung untuk dipakai kapan pun saat kuis.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleBuyHints(1, 10, '1 Petunjuk Kilat')}
              className="px-3.5 py-2 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              <Gem className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" /> 10 Intan
            </button>
          </div>

          {/* Heart Refill */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <Heart className="w-8 h-8 fill-red-500 text-red-500" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Isi Penuh Nyawa (5 Nyawa)</h3>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Nyawa saat ini: <span className="font-black text-red-600">{stats.hearts} / 5</span>. Pulihkan agar bisa terus latihan tanpa henti.
                </p>
              </div>
            </div>

            <button
              onClick={handleBuyHearts}
              disabled={stats.hearts >= stats.maxHearts}
              className={`px-4 py-2.5 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                stats.hearts >= stats.maxHearts
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'gama-btn-gold text-[#1e293b]'
              }`}
            >
              <Gem className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" /> 50 Intan
            </button>
          </div>

          {/* Streak Freeze */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Shield className="w-8 h-8 text-[#1e88e5] fill-blue-100" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Pelindung Hari Streak</h3>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Menjaga rantai belajarmu tetap aman jika kamu libur atau sibuk tugas kuliah sehari.
                </p>
                <span className="text-[11px] font-bold text-[#1565c0]">
                  Dimiliki: {stats.streakFreezeCount} pelindung
                </span>
              </div>
            </div>

            <button
              onClick={handleBuyFreeze}
              className="px-4 py-2.5 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 gama-btn-gold text-[#1e293b] cursor-pointer"
            >
              <Gem className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" /> 80 Intan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
