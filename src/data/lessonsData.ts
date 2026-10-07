import { Unit } from '../types';

export const UNITS_DATA: Unit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Pitepangan & Salam (Perkenalan & Salam)',
    description: 'Sinau salam pambuka, nakoni kabar, lan ngenalake jeneng nganggo basa Jawa.',
    color: '#58cc02', // Duolingo green
    lessons: [
      {
        id: 'u1-l1',
        title: 'Sugeng Rawuh & Salam',
        subtitle: 'Ungkapan salam saben dina ing tanah Jawa',
        icon: 'Hand',
        xpReward: 15,
        questions: [
          {
            id: 'u1-q1',
            type: 'multiple_choice',
            prompt: 'Kepriye carane ngucapake "Selamat Pagi" ing basa Jawa?',
            options: ['Sugeng Enjang', 'Sugeng Dalu', 'Sugeng Siang', 'Sugeng Tindak'],
            correctAnswer: 'Sugeng Enjang',
            promptAudioText: 'Sugeng Enjang',
            explanation: '"Sugeng Enjang" digunakake kanggo menehi salam ing wayah esuk.',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u1-q2',
            type: 'sentence_builder',
            prompt: 'Susun tembung iki dadi ukara "Apa kabarmu?":',
            scrambledTokens: ['kabare?', 'piye', 'kula', 'sugeng'],
            correctTokens: ['piye', 'kabare?'],
            promptAudioText: 'Piye kabare?',
            explanation: '"Piye kabare?" yaiku pitakonan takon kabar ing tataran Ngoko (kanca saumuran).',
            politenessLevel: 'Ngoko'
          },
          {
            id: 'u1-q3',
            type: 'multiple_choice',
            prompt: 'Yen arep matur "Terima kasih", tembung sing bener yaiku...',
            options: ['Matur Nuwun', 'Nuwun Sewu', 'Mugi Rahayu', 'Kula Nuwun'],
            correctAnswer: 'Matur Nuwun',
            promptAudioText: 'Matur Nuwun',
            explanation: '"Matur nuwun" tegese matur panuwun / terima kasih.',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u1-q4',
            type: 'match_pairs',
            prompt: 'Jodohake tembung salam karo tegese:',
            pairItems: [
              { left: 'Sugeng Dalu', right: 'Selamat Malam' },
              { left: 'Sugeng Siang', right: 'Selamat Siang' },
              { left: 'Matur Nuwun', right: 'Terima Kasih' },
              { left: 'Nuwun Sewu', right: 'Permisi' }
            ],
            explanation: 'Salam ing basa Jawa tansah nengenake rasa urmat lan kurmat marang sapadha-padha.'
          },
          {
            id: 'u1-q5',
            type: 'multiple_choice',
            prompt: 'Yen arep liwat ing ngarepe wong sepuh, kita ngucapake...',
            options: ['Ndherek langkung', 'Sugeng tindak', 'Ora apa-apa', 'Kula wangsul'],
            correctAnswer: 'Ndherek langkung',
            promptAudioText: 'Ndherek langkung',
            explanation: '"Ndherek langkung" diucapake sinambi rada mbungkukake awak nalika liwat ing ngarepe wong liya.',
            politenessLevel: 'Krama Inggil'
          }
        ]
      },
      {
        id: 'u1-l2',
        title: 'Ngenalake Dhiri (Perkenalan Diri)',
        subtitle: 'Jeneng, asal, lan tembung pangganti wong (Aku / Kula)',
        icon: 'User',
        xpReward: 20,
        questions: [
          {
            id: 'u1-l2-q1',
            type: 'multiple_choice',
            prompt: 'Tembung "Kula" ing tataran Krama tegese padha karo tembung Ngoko...',
            options: ['Aku', 'Kowe', 'Dheweke', 'Kalian'],
            correctAnswer: 'Aku',
            promptAudioText: 'Kula',
            explanation: '"Aku" (Ngoko) digunakake marang kanca akrab, dene "Kula" (Krama) kanggo ngurmati wong liya.',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u1-l2-q2',
            type: 'sentence_builder',
            prompt: 'Susun ukara Krama: "Nama saya Bimo":',
            scrambledTokens: ['asma', 'Bimo', 'kula', 'dalem', 'jeneng'],
            correctTokens: ['asma', 'kula', 'Bimo'],
            promptAudioText: 'Asma kula Bimo',
            explanation: '"Asma kula Bimo" utawa "Jeneng kula Bimo" yaiku cara sopan ngenalake jeneng.',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u1-l2-q3',
            type: 'multiple_choice',
            prompt: 'Nalika takon jenenge kanca saumuran nganggo basa Ngoko:',
            options: ['Sapa jenengmu?', 'Sinten asma panjenengan?', 'Pripun asmane?', 'Sapa kuwi?'],
            correctAnswer: 'Sapa jenengmu?',
            promptAudioText: 'Sapa jenengmu?',
            explanation: '"Sapa jenengmu?" digunakake ing tataran Ngoko marang kanca saumuran utawa sing luwih enom.',
            politenessLevel: 'Ngoko'
          },
          {
            id: 'u1-l2-q4',
            type: 'match_pairs',
            prompt: 'Jodohake tembung pangganti (kata ganti) Ngoko lan Kramane:',
            pairItems: [
              { left: 'Aku', right: 'Kula' },
              { left: 'Kowe', right: 'Panjenengan' },
              { left: 'Dheweke', right: 'Piyambakipun' },
              { left: 'Jeneng', right: 'Asma' }
            ],
            explanation: 'Iki undha-usuk dhasar kanggo nyebut dhiri lan wong kapindho.'
          }
        ]
      },
      {
        id: 'u1-l3',
        title: 'Wilangan & Angka (1-10)',
        subtitle: 'Etungan angka Ngoko lan Krama',
        icon: 'Hash',
        xpReward: 20,
        questions: [
          {
            id: 'u1-l3-q1',
            type: 'multiple_choice',
            prompt: 'Angka 1 (Siji) ing basa Krama yaiku...',
            options: ['Setunggal', 'Kalih', 'Tiga', 'Sekawan'],
            correctAnswer: 'Setunggal',
            promptAudioText: 'Setunggal',
            explanation: '1 = Siji (Ngoko) / Setunggal (Krama).',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u1-l3-q2',
            type: 'match_pairs',
            prompt: 'Jodohake angka Ngoko karo Kramane:',
            pairItems: [
              { left: 'Loro (2)', right: 'Kalih' },
              { left: 'Telu (3)', right: 'Tiga' },
              { left: 'Papat (4)', right: 'Sekawan' },
              { left: 'Lima (5)', right: 'Gangsal' }
            ],
            explanation: 'Angka ing basa Krama nduweni sebutan mligi kang alus.'
          },
          {
            id: 'u1-l3-q3',
            type: 'multiple_choice',
            prompt: 'Pira cacahe "Sekawan" yen ditulis nganggo angka Latin?',
            options: ['4', '5', '3', '6'],
            correctAnswer: '4',
            promptAudioText: 'Sekawan',
            explanation: 'Sekawan tegese papat (4).',
            politenessLevel: 'Krama Madya'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Kulawarga & Pawon (Keluarga & Rumah)',
    description: 'Nyebut anggota kulawarga, perangan omah, lan kabiasaan padinan.',
    color: '#1cb0f6', // Duolingo blue
    lessons: [
      {
        id: 'u2-l1',
        title: 'Sesambungan Kulawarga',
        subtitle: 'Simbah, Bapak, Ibu, lan Sedulur',
        icon: 'Users',
        xpReward: 20,
        questions: [
          {
            id: 'u2-l1-q1',
            type: 'multiple_choice',
            prompt: 'Sebutan kanggo kakang mbarep (kakak laki-laki) ing basa Jawa yaiku...',
            options: ['Kangmas', 'Mbakyu', 'Adhi', 'Pakdhe'],
            correctAnswer: 'Kangmas',
            promptAudioText: 'Kangmas',
            explanation: 'Kangmas / Mas yaiku sebutan urmat kanggo sedulur lanang sing luwih tuwa.',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u2-l1-q2',
            type: 'sentence_builder',
            prompt: 'Susun ukara: "Ibu memasak di dapur" (Ngoko):',
            scrambledTokens: ['masak', 'Ibu', 'ing', 'pawon', 'kamar'],
            correctTokens: ['Ibu', 'masak', 'ing', 'pawon'],
            promptAudioText: 'Ibu masak ing pawon',
            explanation: '"Pawon" tegese dapur ing basa Jawa.',
            politenessLevel: 'Ngoko'
          },
          {
            id: 'u2-l1-q3',
            type: 'match_pairs',
            prompt: 'Jodohake sebutan anggota kulawarga:',
            pairItems: [
              { left: 'Simbah', right: 'Kakek / Nenek' },
              { left: 'Mbakyu', right: 'Kakak Perempuan' },
              { left: 'Adhi', right: 'Adik' },
              { left: 'Pakdhe', right: 'Paman (Kakak Orang Tua)' }
            ],
            explanation: 'Sistem kulawarga Jawa sugih tetembungan kekerabatan.'
          },
          {
            id: 'u2-l1-q4',
            type: 'multiple_choice',
            prompt: 'Tembung Krama Inggil kanggo "Omah" (Rumah) yaiku...',
            options: ['Dalem', 'Griya', 'Kamar', 'Gubug'],
            correctAnswer: 'Dalem',
            promptAudioText: 'Dalem',
            explanation: 'Omah (Ngoko) -> Griya (Krama Madya) -> Dalem (Krama Inggil kagem tiyang sanes).',
            politenessLevel: 'Krama Inggil'
          }
        ]
      },
      {
        id: 'u2-l2',
        title: 'Kagiatan Ing Omah',
        subtitle: 'Sare, Siram, lan Resik-resik',
        icon: 'Home',
        xpReward: 20,
        questions: [
          {
            id: 'u2-l2-q1',
            type: 'multiple_choice',
            prompt: 'Yen Simbah lagi "turu", tembung Krama Inggil sing pantes yaiku...',
            options: ['Sare', 'Turu', 'Tilem', 'Nglilir'],
            correctAnswer: 'Sare',
            promptAudioText: 'Simbah saweg sare',
            explanation: 'Kanggo simbah/wong tuwa nggunakake "sare", dene kanggo awake dhewe "tilem".',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u2-l2-q2',
            type: 'sentence_builder',
            prompt: 'Susun ukara: "Bapak saweg maos koran":',
            scrambledTokens: ['saweg', 'Bapak', 'maos', 'koran', 'moco'],
            correctTokens: ['Bapak', 'saweg', 'maos', 'koran'],
            promptAudioText: 'Bapak saweg maos koran',
            explanation: '"Saweg maos" tegese lagi maca nganggo tataran Krama Alus.',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u2-l2-q3',
            type: 'match_pairs',
            prompt: 'Jodohake tembung tumindak (kata kerja):',
            pairItems: [
              { left: 'Turu (Tidur)', right: 'Sare' },
              { left: 'Adus (Mandi)', right: 'Siram' },
              { left: 'Lunga (Pergi)', right: 'Tindak' },
              { left: 'Ndeleng (Melihat)', right: 'Mirsani' }
            ],
            explanation: 'Krama Inggil ngajeni tumindake wong sing luwih sepuh.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Undha-Usuk Basa: Mangan vs Dhahar',
    description: 'Bédakake tataran Ngoko, Krama Madya, lan Krama Inggil kanthi trep.',
    color: '#ff9600', // Duolingo orange
    lessons: [
      {
        id: 'u3-l1',
        title: 'Mangan, Neda, lan Dhahar',
        subtitle: 'Konsep paling penting ing undha-usuk basa Jawa',
        icon: 'Utensils',
        xpReward: 25,
        questions: [
          {
            id: 'u3-l1-q1',
            type: 'multiple_choice',
            prompt: 'Nalika awake dhewe sing mangan, nanging omong karo wong tuwa, tembung sing bener yaiku...',
            options: ['Nedha', 'Dhahar', 'Mangan', 'Nguntal'],
            correctAnswer: 'Nedha',
            promptAudioText: 'Kula saweg nedha',
            explanation: 'Aja nyebut awake dhewe "dhahar"! Awake dhewe nganggo "nedha" (Krama Andhap/Madya), dene wong liya sing diurmati nganggo "dhahar".',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u3-l2-q2',
            type: 'sentence_builder',
            prompt: 'Susun ukara: "Bapak sampun dhahar":',
            scrambledTokens: ['sampun', 'Bapak', 'dhahar', 'mangan', 'kula'],
            correctTokens: ['Bapak', 'sampun', 'dhahar'],
            promptAudioText: 'Bapak sampun dhahar',
            explanation: '"Sampun dhahar" tegese wis mangan (kagem tiyang sepuh).',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u3-l1-q3',
            type: 'multiple_choice',
            prompt: 'Ukara Ngoko "Aku arep mangan sega", yen dikramakake dadi...',
            options: ['Kula badhe nedha sekul', 'Kula badhe dhahar sego', 'Aku arep dhahar sekul', 'Kula badhe mangan beras'],
            correctAnswer: 'Kula badhe nedha sekul',
            promptAudioText: 'Kula badhe nedha sekul',
            explanation: 'Aku -> Kula; arep -> badhe; mangan -> nedha (kanggo diri sendiri); sega -> sekul.',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u3-l1-q4',
            type: 'match_pairs',
            prompt: 'Jodohake owah-owahan tembung Ngoko menyang Krama:',
            pairItems: [
              { left: 'Sega (Nasi)', right: 'Sekul' },
              { left: 'Banyu (Air)', right: 'Toya' },
              { left: 'Gula (Gula)', right: 'Gendhis' },
              { left: 'Iwak (Ikan/Lauk)', right: 'Ulam' }
            ],
            explanation: 'Panganan lan omben-omben nduweni jeneng Krama kang endah.'
          }
        ]
      },
      {
        id: 'u3-l2',
        title: 'Tindak-Tanduk Liyane',
        subtitle: 'Tuku vs Mundhut, Teka vs Rawuh',
        icon: 'ShoppingBag',
        xpReward: 25,
        questions: [
          {
            id: 'u3-l2-q1',
            type: 'multiple_choice',
            prompt: 'Bapak "tuku" klambi anyar. Tembung "tuku" kagem Bapak aluse yaiku...',
            options: ['Mundhut', 'Tumbas', 'Mundhutaken', 'Nyolong'],
            correctAnswer: 'Mundhut',
            promptAudioText: 'Bapak mundhut rasukan enggal',
            explanation: 'Tuku (Ngoko) -> Tumbas (Krama Madya kagem diri sendiri) -> Mundhut (Krama Inggil kagem wong sepuh).',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u3-l2-q2',
            type: 'sentence_builder',
            prompt: 'Susun ukara: "Pak Guru rawuh ing sekolahan":',
            scrambledTokens: ['rawuh', 'Pak Guru', 'ing', 'sekolahan', 'teko'],
            correctTokens: ['Pak Guru', 'rawuh', 'ing', 'sekolahan'],
            promptAudioText: 'Pak Guru rawuh ing sekolahan',
            explanation: '"Rawuh" tegese teka / datang (Krama Inggil).',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u3-l2-q3',
            type: 'match_pairs',
            prompt: 'Jodohake tataran tembung tumindak:',
            pairItems: [
              { left: 'Teka (Datang)', right: 'Rawuh' },
              { left: 'Mulih (Pulang)', right: 'Kondur' },
              { left: 'Ngomong (Bicara)', right: 'Ngendika' },
              { left: 'Menehi (Memberi)', right: 'Maringi' }
            ],
            explanation: 'Rawuh, Kondur, Ngendika, Maringi kabeh kalebu Krama Inggil.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Aksara Jawa Hanacaraka (20 Aksara)',
    description: 'Sinau maca lan ngenali 20 aksara Jawa legena lan filosofine.',
    color: '#ce82ff', // Duolingo purple
    lessons: [
      {
        id: 'u4-l1',
        title: 'Baris Kapisan: Ha - Na - Ca - Ra - Ka',
        subtitle: 'Hana Caraka: Ana utusan',
        icon: 'BookOpen',
        xpReward: 30,
        questions: [
          {
            id: 'u4-l1-q1',
            type: 'aksara_choice',
            prompt: 'Pilih aksara Jawa kanggo swara "HA":',
            options: ['ꦲ', 'ꦤ', 'ꦕ', 'ꦫ'],
            correctAnswer: 'ꦲ',
            promptAksara: 'ꦲ',
            promptAudioText: 'Ha',
            explanation: 'ꦲ yaiku aksara Ha. Maknane "Hana" utawa ana/urip.',
            politenessLevel: 'Aksara'
          },
          {
            id: 'u4-l1-q2',
            type: 'multiple_choice',
            prompt: 'Aksara "ꦤ" diwaca apa?',
            promptAksara: 'ꦤ',
            options: ['Na', 'Ha', 'Ca', 'Ka'],
            correctAnswer: 'Na',
            promptAudioText: 'Na',
            explanation: 'ꦤ diwaca Na.',
            politenessLevel: 'Aksara'
          },
          {
            id: 'u4-l1-q3',
            type: 'match_pairs',
            prompt: 'Jodohake aksara Jawa karo wacana Latine:',
            pairItems: [
              { left: 'ꦲ', right: 'Ha' },
              { left: 'ꦤ', right: 'Na' },
              { left: 'ꦕ', right: 'Ca' },
              { left: 'ꦫ', right: 'Ra' }
            ],
            explanation: 'Ha-Na-Ca-Ra-Ka tegese "Hana Caraka" yaiku ana utusan.'
          },
          {
            id: 'u4-l1-q4',
            type: 'aksara_choice',
            prompt: 'Tembung "ꦏ" iku aksara apa?',
            promptAksara: 'ꦏ',
            options: ['Ka', 'Ra', 'Da', 'Ta'],
            correctAnswer: 'Ka',
            promptAudioText: 'Ka',
            explanation: 'ꦏ diwaca Ka.',
            politenessLevel: 'Aksara'
          }
        ]
      },
      {
        id: 'u4-l2',
        title: 'Baris Kapindho: Da - Ta - Sa - Wa - La',
        subtitle: 'Data Sawala: Padha pasulayan',
        icon: 'Feather',
        xpReward: 30,
        questions: [
          {
            id: 'u4-l2-q1',
            type: 'aksara_choice',
            prompt: 'Aksara "ꦢ" diwaca apa?',
            promptAksara: 'ꦢ',
            options: ['Da', 'Ta', 'Sa', 'Wa'],
            correctAnswer: 'Da',
            promptAudioText: 'Da',
            explanation: 'ꦢ yaiku aksara Da.',
            politenessLevel: 'Aksara'
          },
          {
            id: 'u4-l2-q2',
            type: 'match_pairs',
            prompt: 'Jodohake aksara baris kapindho:',
            pairItems: [
              { left: 'ꦠ', right: 'Ta' },
              { left: 'ꦱ', right: 'Sa' },
              { left: 'ꦮ', right: 'Wa' },
              { left: 'ꦭ', right: 'La' }
            ],
            explanation: 'Da-Ta-Sa-Wa-La tegese "Data Sawala" yaiku padha pasulayan / adu kekuwatan.'
          },
          {
            id: 'u4-l2-q3',
            type: 'multiple_choice',
            prompt: 'Tembung Jawa "ꦱꦫꦲ" diwaca apa?',
            promptAksara: 'ꦱꦫꦲ',
            options: ['Saraha', 'Sanaha', 'Danaha', 'Karaha'],
            correctAnswer: 'Saraha',
            promptAudioText: 'Saraha',
            explanation: 'Gabungan aksara Sa (ꦱ), Ra (ꦫ), lan Ha (ꦲ).',
            politenessLevel: 'Aksara'
          }
        ]
      },
      {
        id: 'u4-l3',
        title: 'Sandhangan Swara (Wulu, Suku, Taling)',
        subtitle: 'Ngarani swara i, u, e, o ing aksara Jawa',
        icon: 'Sparkles',
        xpReward: 35,
        questions: [
          {
            id: 'u4-l3-q1',
            type: 'multiple_choice',
            prompt: 'Sandhangan kanggo ngowahi swara dadi "I" jenenge...',
            options: ['Wulu (ꦶ)', 'Suku (ꦸ)', 'Taling (ꦺ)', 'Pepet (ꦼ)'],
            correctAnswer: 'Wulu (ꦶ)',
            promptAudioText: 'Wulu',
            explanation: 'Wulu (bunderan cilik ing ndhuwur) ngowahi aksara dadi swara [i]. Tuladha: ꦲꦶ (Hi).',
            politenessLevel: 'Aksara'
          },
          {
            id: 'u4-l3-q2',
            type: 'match_pairs',
            prompt: 'Jodohake sandhangan swara karo unine:',
            pairItems: [
              { left: 'Wulu (ꦶ)', right: 'Swara i' },
              { left: 'Suku (ꦸ)', right: 'Swara u' },
              { left: 'Taling (ꦺ)', right: 'Swara é' },
              { left: 'Taling Tarung (ꦺꦴ)', right: 'Swara o' }
            ],
            explanation: 'Sandhangan swara minangka tandha vokal ing aksara Jawa.'
          },
          {
            id: 'u4-l3-q3',
            type: 'multiple_choice',
            prompt: 'Aksara "ꦲꦸ" (Ha disuku) diwaca apa?',
            promptAksara: 'ꦲꦸ',
            options: ['Hu', 'Hi', 'Ho', 'He'],
            correctAnswer: 'Hu',
            promptAudioText: 'Hu',
            explanation: 'Aksara Ha diwenehi sandhangan suku dadi unine "Hu".',
            politenessLevel: 'Aksara'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Paribasan & Falsafah Jawa',
    description: 'Nyelami paribasan adiluhung kanggo tuntunan urip saben dina.',
    color: '#ff4b4b', // Duolingo red
    lessons: [
      {
        id: 'u5-l1',
        title: 'Paribasan Kawentar',
        subtitle: 'Pitutur luhur para leluhur Jawa',
        icon: 'Compass',
        xpReward: 30,
        questions: [
          {
            id: 'u5-l1-q1',
            type: 'multiple_choice',
            prompt: 'Paribasan "Alon-alon waton kelakon" ngemot piwulang...',
            options: [
              'Tumindak kanthi ati-ati lan titi, sing penting tujuane kelakon slamet',
              'Kudu keset lan santai wae',
              'Ora usah nggarap tugas',
              'Mlaku alon ing dalan gedhe'
            ],
            correctAnswer: 'Tumindak kanthi ati-ati lan titi, sing penting tujuane kelakon slamet',
            promptAudioText: 'Alon-alon waton kelakon',
            explanation: 'Piwulang supaya ora kesusu (grusa-grusu), nanging tansah teliti lan waspada.',
            politenessLevel: 'Ngoko'
          },
          {
            id: 'u5-l1-q2',
            type: 'sentence_builder',
            prompt: 'Susun paribasan: "Becik ketitik ala ketara":',
            scrambledTokens: ['ketitik', 'Becik', 'ketara', 'ala', 'kabeh'],
            correctTokens: ['Becik', 'ketitik', 'ala', 'ketara'],
            promptAudioText: 'Becik ketitik ala ketara',
            explanation: 'Tegese: Tumindak becik lan ala pungkasane bakal konangan uga.',
            politenessLevel: 'Ngoko'
          },
          {
            id: 'u5-l1-q3',
            type: 'match_pairs',
            prompt: 'Jodohake paribasan Jawa karo tegese:',
            pairItems: [
              { left: 'Aja dumeh', right: 'Jangan mentang-mentang / sombong' },
              { left: 'Urip iku urup', right: 'Hidup harus memberi manfaat bagi sesama' },
              { left: 'Mikul dhuwur mendhem jero', right: 'Menjunjung nama baik orang tua' },
              { left: 'Jer basuki mawa beya', right: 'Keberhasilan butuh pengorbanan' }
            ],
            explanation: 'Paribasan Jawa kebak kawicaksanan lan piwulang budi pekerti luhur.'
          }
        ]
      }
    ]
  }
];
