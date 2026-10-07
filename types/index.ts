export type QuestionType =
  | 'multiple_choice'
  | 'sentence_builder'
  | 'match_pairs'
  | 'aksara_choice'
  | 'translate_input'
  | 'fill_blank';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string; // e.g. "Pilih tegese tembung iki:" or "Susun ukara iki:"
  promptJavanese?: string; // Original phrase in Javanese
  promptAksara?: string; // Aksara Jawa representation if applicable
  promptAudioText?: string; // Text to speak phonetically
  options?: string[]; // Multiple choice options
  correctAnswer?: string; // Correct answer text
  correctTokens?: string[]; // For sentence builder
  scrambledTokens?: string[]; // Tokens to arrange
  pairItems?: { left: string; right: string }[]; // For matching pairs
  explanation?: string; // Cultural or linguistic note (e.g. "Krama Inggil digunakake kanggo wong sing luwih sepuh")
  audioHint?: string;
  hintClue?: string; // Petunjuk petunjuk khusus
  politenessLevel?: 'Ngoko' | 'Krama Madya' | 'Krama Inggil' | 'Aksara';
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  icon: string; // lucide icon name or emoji
  xpReward: number;
  questions: Question[];
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  color: string; // Hex color for unit banner
  lessons: Lesson[];
}

export type HeadwearType = 'blangkon_klasik' | 'topi_ugm' | 'blangkon_emas' | 'headband_ppsmb' | 'caping_ppsmb' | 'toga_ugm' | 'none';
export type OutfitType = 'surjan_biru' | 'jas_almamater' | 'kaos_ppsmb' | 'beskap_keraton' | 'batik_parang' | 'hoodie_ugm';
export type AccessoryType = 'kacamata_cerdas' | 'kacamata_hitam' | 'hasduk_palapa' | 'selempang_cumlaude' | 'masker_santun' | 'totebag_ugm' | 'none';
export type HandheldType = 'es_teh_jumbo' | 'modul_diktat' | 'bendera_ugm' | 'gitar_burjo' | 'none';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: 'headwear' | 'outfit' | 'accessory' | 'handheld' | 'utility';
  cost: number;
  icon: string;
  mabaTip?: string;
  rarity?: 'Umum' | 'Langka' | 'Legendaris';
}

export interface UserStats {
  xp: number;
  gems: number; // Intan
  hearts: number; // Nyawa (max 5)
  maxHearts: number;
  streak: number; // Hari Streak
  lastActiveDate: string; // YYYY-MM-DD
  completedLessonIds: string[];
  activeUnitId: string;
  streakFreezeCount: number;
  unlockedBadges: string[];
  soundEnabled: boolean;
  activeOutfit: OutfitType | string;
  activeHeadwear: HeadwearType | string;
  activeAccessory: AccessoryType | string;
  activeHandheld: HandheldType | string;
  hintCount: number; // Jumlah petunjuk tersimpan
  ownedItems: string[];
}

export interface DictionaryItem {
  id: string;
  indonesian: string;
  ngoko: string;
  kramaMadya: string;
  kramaInggil: string;
  aksara?: string;
  category: 'Wajib Maba' | 'Warung & Burjo' | 'Kampus & Dosen' | 'Kos & Warga' | 'Arah & Navigasi' | 'Istilah Gaul Jogja' | 'Keseharian' | 'Keluarga' | 'Angka' | 'Makanan' | 'Sopan Santun' | 'Sifat';
  exampleSentence: string;
  exampleMeaning: string;
  mabaTip?: string; // Penjelasan ramah lan singkat untukmu
  pronunciation?: string; // Panduan pelafalan bunyi huruf Jawa (th, dh, d, t, dll)
}

export interface AksaraChar {
  aksara: string;
  latin: string;
  pasangan: string;
  meaningMnemonic: string;
  row: number; // 1-4 for the 4 rows of Hanacaraka
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
  tier: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardGems: number;
  completed: boolean;
}
