import { AksaraChar } from '../types';

export const HANACARAKA_LIST: AksaraChar[] = [
  // Baris 1: Ha Na Ca Ra Ka (Hana caraka = Ana utusan / Ada utusan)
  {
    aksara: 'ꦲ',
    latin: 'Ha',
    pasangan: '꧀ꦲ',
    meaningMnemonic: 'Hana caraka: Ana utusan (Ada utusan/utusan kehidupan)',
    row: 1
  },
  {
    aksara: 'ꦤ',
    latin: 'Na',
    pasangan: '꧀ꦤ',
    meaningMnemonic: 'Hana caraka: Ana utusan',
    row: 1
  },
  {
    aksara: 'ꦕ',
    latin: 'Ca',
    pasangan: '꧀ꦕ',
    meaningMnemonic: 'Hana caraka: Ana utusan',
    row: 1
  },
  {
    aksara: 'ꦫ',
    latin: 'Ra',
    pasangan: '꧀ꦫ',
    meaningMnemonic: 'Hana caraka: Ana utusan',
    row: 1
  },
  {
    aksara: 'ꦏ',
    latin: 'Ka',
    pasangan: '꧀ꦏ',
    meaningMnemonic: 'Hana caraka: Ana utusan',
    row: 1
  },

  // Baris 2: Da Ta Sa Wa La (Data sawala = Padha pasulayan / Keduanya berselisih)
  {
    aksara: 'ꦢ',
    latin: 'Da',
    pasangan: '꧀ꦢ',
    meaningMnemonic: 'Data sawala: Padha pasulayan (Saling berselisih memegang amanat)',
    row: 2
  },
  {
    aksara: 'ꦠ',
    latin: 'Ta',
    pasangan: '꧀ꦠ',
    meaningMnemonic: 'Data sawala: Padha pasulayan',
    row: 2
  },
  {
    aksara: 'ꦱ',
    latin: 'Sa',
    pasangan: '꧀ꦱ',
    meaningMnemonic: 'Data sawala: Padha pasulayan',
    row: 2
  },
  {
    aksara: 'ꦮ',
    latin: 'Wa',
    pasangan: '꧀ꦮ',
    meaningMnemonic: 'Data sawala: Padha pasulayan',
    row: 2
  },
  {
    aksara: 'ꦭ',
    latin: 'La',
    pasangan: '꧀ꦭ',
    meaningMnemonic: 'Data sawala: Padha pasulayan',
    row: 2
  },

  // Baris 3: Pa Dha Ja Ya Nya (Padha jayanya = Padha sektine / Sama-sama kuat)
  {
    aksara: 'ꦥ',
    latin: 'Pa',
    pasangan: '꧀ꦥ',
    meaningMnemonic: 'Padha jayanya: Padha digjayane (Sama-sama kuat dan sakti)',
    row: 3
  },
  {
    aksara: 'ꦝ',
    latin: 'Dha',
    pasangan: '꧀ꦝ',
    meaningMnemonic: 'Padha jayanya: Padha digjayane',
    row: 3
  },
  {
    aksara: 'ꦗ',
    latin: 'Ja',
    pasangan: '꧀ꦗ',
    meaningMnemonic: 'Padha jayanya: Padha digjayane',
    row: 3
  },
  {
    aksara: 'ꦪ',
    latin: 'Ya',
    pasangan: '꧀ꦪ',
    meaningMnemonic: 'Padha jayanya: Padha digjayane',
    row: 3
  },
  {
    aksara: 'ꦚ',
    latin: 'Nya',
    pasangan: '꧀ꦚ',
    meaningMnemonic: 'Padha jayanya: Padha digjayane',
    row: 3
  },

  // Baris 4: Ma Ga Ba Tha Nga (Maga bathanga = Padha dadi bathang / Gugur bersama)
  {
    aksara: 'ꦩ',
    latin: 'Ma',
    pasangan: '꧀ꦩ',
    meaningMnemonic: 'Maga bathanga: Padha dadi bathang (Keduanya gugur memegang sumpah)',
    row: 4
  },
  {
    aksara: 'ꦒ',
    latin: 'Ga',
    pasangan: '꧀ꦒ',
    meaningMnemonic: 'Maga bathanga: Padha dadi bathang',
    row: 4
  },
  {
    aksara: 'ꦧ',
    latin: 'Ba',
    pasangan: '꧀ꦧ',
    meaningMnemonic: 'Maga bathanga: Padha dadi bathang',
    row: 4
  },
  {
    aksara: 'ꦛ',
    latin: 'Tha',
    pasangan: '꧀ꦛ',
    meaningMnemonic: 'Maga bathanga: Padha dadi bathang',
    row: 4
  },
  {
    aksara: 'ꦔ',
    latin: 'Nga',
    pasangan: '꧀ꦔ',
    meaningMnemonic: 'Maga bathanga: Padha dadi bathang',
    row: 4
  }
];

export interface SandhanganItem {
  name: string;
  symbol: string;
  sound: string;
  description: string;
  example: string;
  exampleLatin: string;
}

export const SANDHANGAN_LIST: SandhanganItem[] = [
  {
    name: 'Wulu',
    symbol: 'ꦶ',
    sound: '[i]',
    description: 'Bunderan cilik ing dhuwur aksara kanggo swara "i"',
    example: 'ꦱꦶꦠꦶ',
    exampleLatin: 'Siti'
  },
  {
    name: 'Suku',
    symbol: 'ꦸ',
    sound: '[u]',
    description: 'Garis mlengkung ing ngisor aksara kanggo swara "u"',
    example: 'ꦧꦸꦢꦶ',
    exampleLatin: 'Budi'
  },
  {
    name: 'Taling',
    symbol: 'ꦺ',
    sound: '[é]',
    description: 'Ing ngarepe aksara kanggo swara "é / è"',
    example: 'ꦱꦺꦠ',
    exampleLatin: 'Séta'
  },
  {
    name: 'Pepet',
    symbol: 'ꦼ',
    sound: '[ə]',
    description: 'Bunderan mawa garis ing ndhuwur kanggo swara "e" (seperti segar)',
    example: 'ꦱꦼꦒ',
    exampleLatin: 'Sega'
  },
  {
    name: 'Taling Tarung',
    symbol: 'ꦺ...ꦴ',
    sound: '[o]',
    description: 'Ngapit aksara ing ngarep lan mburi kanggo swara "o"',
    example: 'ꦠꦺꦴꦏꦺꦴ',
    exampleLatin: 'Toko'
  },
  {
    name: 'Wignyan',
    symbol: 'ꦃ',
    sound: '[-h]',
    description: 'Pungkasan konsonan "h"',
    example: 'ꦒꦗꦃ',
    exampleLatin: 'Gajah'
  },
  {
    name: 'Layar',
    symbol: 'ꦂ',
    sound: '[-r]',
    description: 'Pungkasan konsonan "r"',
    example: 'ꦥꦱꦂ',
    exampleLatin: 'Pasar'
  },
  {
    name: 'Cecak',
    symbol: 'ꦁ',
    sound: '[-ng]',
    description: 'Pungkasan konsonan "ng"',
    example: 'ꦮꦪꦁ',
    exampleLatin: 'Wayang'
  },
  {
    name: 'Pangkon',
    symbol: '꧀',
    sound: '[mati]',
    description: 'Matèni aksara konsonan ing pungkasan ukara',
    example: 'ꦧꦥꦏ꧀',
    exampleLatin: 'Bapak'
  }
];
