import React, { useState, useMemo } from 'react';
import { Search, Volume2, Sparkles, Copy, Check, Compass, BookOpen, HelpCircle } from 'lucide-react';
import { DICTIONARY_ITEMS } from '../data/dictionaryData';
import { speakText, soundEffects } from '../utils/sound';
import { DictionaryItem } from '../types';

export const DictionaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'Semua',
    'Wajib Maba',
    'Warmindo & Burjo',
    'Kampus & Dosen',
    'Kos & Warga',
    'Arah & Navigasi',
    'Istilah Gaul Jogja',
    'Angka'
  ];

  const filteredItems = useMemo(() => {
    return DICTIONARY_ITEMS.filter(item => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.indonesian.toLowerCase().includes(q) ||
        item.ngoko.toLowerCase().includes(q) ||
        item.kramaMadya.toLowerCase().includes(q) ||
        item.kramaInggil.toLowerCase().includes(q) ||
        (item.mabaTip && item.mabaTip.toLowerCase().includes(q)) ||
        item.exampleSentence.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyPhrase = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundEffects.playTap();
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28 md:pb-14">
      {/* Header - Ramah Indonesia bagi Maba Non-Jawa */}
      <div className="text-center mb-6 sm:mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-[#1565c0] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Kamus Saku Mahasiswa Baru Non-Jawa
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1565c0] mt-2">
          Kamus Praktis & Panduan Bahasa Maba UGM
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 max-w-xl mx-auto">
          Disusun khusus untuk mahasiswa baru perantau dari luar Jawa agar percaya diri ngobrol santun di kosan, pesan makan di burjo, chat WA dosen, hingga navigasi arah di Jogja!
        </p>
      </div>

      {/* Quick Guide Banner for Non-Javanese Freshmen */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-amber-50 rounded-3xl p-4 sm:p-5 border-2 border-blue-200/90 shadow-2xs mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl p-2 bg-white rounded-2xl border border-blue-200 shrink-0">💡</span>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base">
              Aturan Emas Bertutur Kata di Jogja & Kampus Biru:
            </h3>
            <ul className="text-xs text-slate-700 font-semibold mt-1 space-y-1 list-disc list-inside">
              <li><strong className="text-[#1565c0]">Ngoko</strong>: Dipakai santai ke sesama teman maba yang sudah akrab sebaya.</li>
              <li><strong className="text-[#1565c0]">Krama Madya</strong>: Bahasa sopan sehari-hari ke abang warmindo, penjual pasar, ibu kos, atau sopir ojol.</li>
              <li><strong className="text-[#1565c0]">Krama Inggil</strong>: Bahasa penghormatan tinggi untuk dosen, bapak/ibu sepuh, dan pejabat kampus.</li>
              <li><strong className="text-red-600">Catatan Penting</strong>: Jangan pernah gunakan kata Krama Inggil untuk diri sendiri (misal: jangan bilang <em>"Saya sudah dhahar"</em>, tapi <em>"Kula sampun nedha"</em>)!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search Bar - Pencarian Ramah Bahasa Indonesia */}
      <div className="relative max-w-xl mx-auto mb-5">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Cari arti kata (contoh: permisi, terima kasih, makan, bapak kos, lor, bangjo)..."
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 placeholder-slate-400 font-bold text-sm focus:outline-none focus:border-[#1e88e5] focus:ring-2 focus:ring-blue-100 shadow-xs transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Hapus
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-6 sm:mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#1e88e5] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-xs font-bold text-slate-600 mb-4 px-1 flex items-center justify-between">
        <span>Menampilkan {filteredItems.length} kosakata praktis</span>
        <span className="text-[11px] text-slate-400">Klik ikon speaker untuk dengar lafal</span>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {filteredItems.map((item: DictionaryItem) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs hover:border-blue-300 transition-colors"
          >
            {/* Top row: Indonesian Meaning + Category */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base sm:text-lg font-black text-slate-900">
                  {item.indonesian}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#1565c0] border border-blue-200 px-2.5 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyPhrase(item.id, item.exampleSentence)}
                  className="px-2.5 py-1 text-[11px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  title="Salin contoh kalimat ke clipboard untuk chat WA"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kalimat</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3-Tier Undha-Usuk Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3.5">
              {/* Ngoko */}
              <div className="bg-slate-50 rounded-2xl p-2.5 border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    Ngoko (Teman Akrab)
                  </span>
                  <button
                    onClick={() => speakText(item.ngoko)}
                    className="p-1 rounded-md text-slate-400 hover:text-[#1e88e5] hover:bg-white cursor-pointer"
                    title="Dengar lafal ngoko"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-sm font-black text-slate-800 mt-0.5">
                  {item.ngoko}
                </div>
              </div>

              {/* Krama Madya */}
              <div className="bg-blue-50/70 rounded-2xl p-2.5 border border-blue-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#1565c0] uppercase tracking-wider">
                    Krama Madya (Sehari-hari)
                  </span>
                  <button
                    onClick={() => speakText(item.kramaMadya)}
                    className="p-1 rounded-md text-[#1565c0] hover:bg-white cursor-pointer"
                    title="Dengar lafal krama madya"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-sm font-black text-[#1565c0] mt-0.5">
                  {item.kramaMadya}
                </div>
              </div>

              {/* Krama Inggil */}
              <div className="bg-amber-50/70 rounded-2xl p-2.5 border border-amber-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#b45309] uppercase tracking-wider">
                    Krama Inggil (Dosen / Orang Tua)
                  </span>
                  <button
                    onClick={() => speakText(item.kramaInggil)}
                    className="p-1 rounded-md text-[#b45309] hover:bg-white cursor-pointer"
                    title="Dengar lafal krama inggil"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-sm font-black text-[#b45309] mt-0.5">
                  {item.kramaInggil}
                </div>
              </div>
            </div>

            {/* Pronunciation phonetics tip if present */}
            {item.pronunciation && (
              <div className="text-[11px] font-semibold text-slate-500 mb-2.5 flex items-start gap-1.5">
                <span className="font-bold text-slate-700 shrink-0">🗣️ Cara Lafal:</span>
                <span>{item.pronunciation}</span>
              </div>
            )}

            {/* Practical Maba Tip Banner */}
            {item.mabaTip && (
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3 mb-3 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-amber-950 leading-relaxed">
                  <span className="font-black text-[#b45309]">Tips Maba Non-Jawa: </span>
                  {item.mabaTip}
                </p>
              </div>
            )}

            {/* Example sentence with speaker */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <span className="text-slate-400">Contoh:</span>
                  <span>"{item.exampleSentence}"</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5 italic">
                  Artinya: "{item.exampleMeaning}"
                </div>
              </div>
              <button
                onClick={() => speakText(item.exampleSentence)}
                className="p-1.5 rounded-xl bg-white border border-slate-200 text-[#1e88e5] hover:bg-blue-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
                title="Dengarkan pengucapan kalimat"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border-2 border-slate-200 p-6">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-black text-slate-700">Kosakata tidak ditemukan</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Coba kata kunci lain atau pilih tab kategori di atas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
