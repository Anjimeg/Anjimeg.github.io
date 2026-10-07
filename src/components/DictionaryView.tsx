import React, { useState, useMemo } from 'react';
import { Search, Volume2, BookOpen, Layers } from 'lucide-react';
import { DICTIONARY_ITEMS } from '../data/dictionaryData';
import { speakText } from '../utils/sound';
import { DictionaryItem } from '../types';

export const DictionaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Kabeh');

  const categories = ['Kabeh', 'Keseharian', 'Sopan Santun', 'Keluarga', 'Makanan', 'Angka'];

  const filteredItems = useMemo(() => {
    return DICTIONARY_ITEMS.filter(item => {
      const matchesSearch =
        item.indonesian.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ngoko.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kramaMadya.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kramaInggil.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'Kabeh' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Baosastra Digital
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
          Kamus Undha-Usuk Basa Jawa
        </h1>
        <p className="text-sm font-semibold text-slate-600 mt-1 max-w-lg mx-auto">
          Tembung Ngoko, Krama Madya, lan Krama Inggil kapepaki conto ukara.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-6">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Golek tembung (tuladha: mangan, tidur, rumah, bapak)..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 placeholder-slate-400 font-bold text-sm focus:outline-none focus:border-blue-500 shadow-xs transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Batal
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-xs font-bold text-slate-600 mb-4 px-1">
        Ditemokake {filteredItems.length} tembung
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {filteredItems.map((item: DictionaryItem) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs hover:border-blue-300 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900">
                  {item.indonesian}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>

              <button
                onClick={() => speakText(`${item.kramaInggil}`)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-800 self-start sm:self-auto cursor-pointer"
              >
                <Volume2 className="w-4 h-4" /> Rungokna Lafal
              </button>
            </div>

            {/* Comparison Grid: Ngoko, Krama Madya, Krama Inggil */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3.5">
              <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                  Ngoko (Kanca)
                </span>
                <span className="text-base font-black text-slate-800 mt-0.5 block">
                  {item.ngoko}
                </span>
              </div>

              <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 block">
                  Krama Madya (Umum)
                </span>
                <span className="text-base font-black text-slate-800 mt-0.5 block">
                  {item.kramaMadya}
                </span>
              </div>

              <div className="bg-purple-50/70 p-3 rounded-2xl border border-purple-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 block">
                  Krama Inggil (Sopan Luhur)
                </span>
                <span className="text-base font-black text-slate-800 mt-0.5 block">
                  {item.kramaInggil}
                </span>
              </div>
            </div>

            {/* Example sentence */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-xs">
              <div className="font-bold text-slate-800 mb-0.5">
                💬 <strong>Ukara:</strong> &ldquo;{item.exampleSentence}&rdquo;
              </div>
              <div className="text-slate-600 italic">
                Artine: {item.exampleMeaning}
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Tembung ora ditemokake</h3>
            <p className="text-xs text-slate-600 mt-1">
              Coba nganggo tembung kunci liyane ing basa Indonesia utawa Jawa.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
