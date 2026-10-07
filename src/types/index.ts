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

export interface UserStats {
  xp: number;
  gems: number; // Intan
  hearts: number; // Nyawa (max 5)
  maxHearts: number;
  streak: number; // Dina Mateng
  lastActiveDate: string; // YYYY-MM-DD
  completedLessonIds: string[];
  activeUnitId: string;
  streakFreezeCount: number;
  unlockedBadges: string[];
  soundEnabled: boolean;
  activeOutfit: string; // 'classic' | 'blangkon_emas' | 'batik_keraton'
}

export interface DictionaryItem {
  id: string;
  indonesian: string;
  ngoko: string;
  kramaMadya: string;
  kramaInggil: string;
  aksara?: string;
  category: 'Keseharian' | 'Keluarga' | 'Angka' | 'Makanan' | 'Sopan Santun' | 'Sifat';
  exampleSentence: string;
  exampleMeaning: string;
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
