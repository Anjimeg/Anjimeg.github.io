import { Unit } from '../types';

export const UNITS_DATA: Unit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Survival Maba UGM: Sapaan & Sopan Santun',
    description: 'Pelajari kata-kata ajaib wajib maba: permisi, terima kasih, salam, dan menyapa bapak/ibu kos serta dosen.',
    color: '#1e88e5', // Lighter UGM Cerulean Blue
    lessons: [
      {
        id: 'u1-l1',
        title: 'Kata Ajaib di Jogja & Kampus',
        subtitle: 'Matur nuwun, nyuwun sewu, dan monggo',
        icon: 'Hand',
        xpReward: 15,
        questions: [
          {
            id: 'u1-q1',
            type: 'multiple_choice',
            prompt: 'Saat kamu berjalan lewat di depan bapak/ibu kos atau warga Pogung yang sedang duduk di teras, ucapan permisi paling santun adalah...',
            options: ['Nyuwun sewu / Ndherek langkung', 'Sugeng dalu', 'Matur nuwun', 'Piye kabare'],
            correctAnswer: 'Nyuwun sewu / Ndherek langkung',
            promptAudioText: 'Nyuwun sewu, ndherek langkung',
            explanation: '"Nyuwun sewu" (artinya permisi / maaf) atau "Ndherek langkung" (permisi numpang lewat) diucapkan sambil sedikit membungkukkan badan. Warga Jogja sangat menghargai etika ini!',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u1-q2',
            type: 'sentence_builder',
            prompt: 'Susun kalimat bahasa Jawa untuk mengucapkan "Terima kasih banyak":',
            scrambledTokens: ['sanget', 'Matur', 'nuwun', 'sewu', 'kula'],
            correctTokens: ['Matur', 'nuwun', 'sanget'],
            promptAudioText: 'Matur nuwun sanget',
            explanation: '"Matur nuwun" artinya terima kasih. Menambahkan kata "sanget" berarti terima kasih banyak (sangat berterima kasih).',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u1-q3',
            type: 'multiple_choice',
            prompt: 'Ketika dosen atau penjual di kantin mempersilakan kamu duduk atau masuk, kata yang sering kamu dengar adalah...',
            options: ['Monggo', 'Sampun', 'Mboten', 'Ngapunten'],
            correctAnswer: 'Monggo',
            promptAudioText: 'Monggo pinarak',
            explanation: '"Monggo" berarti silakan. Kata ini sangat serbaguna: bisa untuk mempersilakan duduk, makan, lewat lebih dulu, atau masuk ruangan.',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u1-q4',
            type: 'match_pairs',
            prompt: 'Jodohkan sapaan waktu dalam bahasa Jawa dengan artinya dalam bahasa Indonesia:',
            pairItems: [
              { left: 'Sugeng Enjang', right: 'Selamat Pagi' },
              { left: 'Sugeng Siang', right: 'Selamat Siang' },
              { left: 'Sugeng Sonten', right: 'Selamat Sore' },
              { left: 'Sugeng Dalu', right: 'Selamat Malam' }
            ],
            explanation: '"Sugeng" berarti selamat atau sejahtera. Sering digunakan dalam pengumuman kampus atau salam pembuka pidato.'
          },
          {
            id: 'u1-q5',
            type: 'multiple_choice',
            prompt: 'Ketika kamu tidak sengaja menyenggol seseorang di selasar kampus dan ingin minta maaf, kamu mengucapkan...',
            options: ['Ngapunten nggih', 'Matur nuwun', 'Sugeng tindak', 'Iki piro'],
            correctAnswer: 'Ngapunten nggih',
            promptAudioText: 'Ngapunten nggih mas',
            explanation: '"Ngapunten" artinya maaf. Penambahan "nggih" (ya) membuatnya terdengar luwes dan ramah khas Jogja.',
            politenessLevel: 'Krama Madya'
          }
        ]
      },
      {
        id: 'u1-l2',
        title: 'Menyapa & Berkenalan dengan Kawan',
        subtitle: 'Menanyakan nama dan kabar sesama mahasiswa',
        icon: 'MessageCircle',
        xpReward: 20,
        questions: [
          {
            id: 'u1-l2-q1',
            type: 'multiple_choice',
            prompt: 'Saat ngobrol santai sesama teman sebaya angkatan maba, bagaimana cara menanyakan "Bagaimana kabarmu?":',
            options: ['Piye kabare?', 'Pripun kersane?', 'Sinten asmane?', 'Wonten pundi?'],
            correctAnswer: 'Piye kabare?',
            promptAudioText: 'Piye kabare rek?',
            explanation: '"Piye kabare?" adalah bentuk santai (Ngoko) untuk menanyakan kabar sesama teman akrab atau teman sebaya.',
            politenessLevel: 'Ngoko'
          },
          {
            id: 'u1-l2-q2',
            type: 'multiple_choice',
            prompt: 'Dan jawaban yang tepat jika kabarmu baik dan sehat adalah...',
            options: ['Apik / Sae', 'Mboten', 'Sampun', 'Dereng'],
            correctAnswer: 'Apik / Sae',
            promptAudioText: 'Kabar apik / sae',
            explanation: '"Apik" (Ngoko) atau "Sae" (Krama) artinya baik atau sehat walafiat.',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u1-l2-q3',
            type: 'sentence_builder',
            prompt: 'Susun kalimat perkenalan: "Nama saya Dimas":',
            scrambledTokens: ['Dimas', 'kula', 'Jeneng', 'panjenengan', 'sinten'],
            correctTokens: ['Jeneng', 'kula', 'Dimas'],
            promptAudioText: 'Jeneng kula Dimas',
            explanation: 'Kamu bisa memperkenalkan diri dengan "Jeneng kula [Nama]" (bahasa santai-sopan) atau "Nami kula [Nama]".',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u1-l2-q4',
            type: 'match_pairs',
            prompt: 'Jodohkan ungkapan perkenalan penting berikut:',
            pairItems: [
              { left: 'Sinten asmane? (Krama)', right: 'Siapa nama Anda?' },
              { left: 'Saka ngendi asalmu? (Ngoko)', right: 'Dari mana asalmu?' },
              { left: 'Kula saking Medan', right: 'Saya dari Medan' },
              { left: 'Kanca anyar', right: 'Teman baru' }
            ],
            explanation: 'Banyak mahasiswa UGM berasal dari luar Jawa, jadi saling bertukar daerah asal adalah topik perkenalan yang paling asyik!'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Kantin, Burjo & Warmindo Survival',
    description: 'Cara memesan makanan, es teh, gorengan, serta menanyakan total harga ke Aa Burjo atau penjual angkringan.',
    color: '#0284c7', // UGM Lighter Sky Blue
    lessons: [
      {
        id: 'u2-l1',
        title: 'Pesan Makan & Minum di Jogja',
        subtitle: 'Es teh setunggal, mendoan kalih, bungkus!',
        icon: 'Utensils',
        xpReward: 20,
        questions: [
          {
            id: 'u2-l1-q1',
            type: 'multiple_choice',
            prompt: 'Kamu mampir di warung makan Pogung dan ingin memesan "Es teh satu". Kalimat bahasa Jawa yang paling tepat dan sopan adalah...',
            options: ['Mas, es teh setunggal nggih', 'Mas, es teh siji kowe', 'Mas, njaluk es teh', 'Es teh loro mas'],
            correctAnswer: 'Mas, es teh setunggal nggih',
            promptAudioText: 'Mas, es teh setunggal nggih',
            explanation: '"Setunggal" adalah angka 1 dalam tingkatan Krama (sopan). Menggunakan "setunggal nggih" terdengar sangat ramah dan santun di telinga penjual!',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u2-l1-q2',
            type: 'multiple_choice',
            prompt: 'Jika ingin menambah "Mendoan dua", angka 2 dalam bahasa Jawa Krama adalah...',
            options: ['Kalih', 'Tiga', 'Sekawan', 'Papat'],
            correctAnswer: 'Kalih',
            promptAudioText: 'Mendoan kalih mas',
            explanation: '1 = Setunggal, 2 = Kalih, 3 = Tiga, 4 = Sekawan, 5 = Gangsal. Jadi pesan mendoan 2 adalah "Mendoan kalih nggih mas".',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u2-l1-q3',
            type: 'multiple_choice',
            prompt: 'Penjual bertanya: "Dipuncampur napa dipunpisah?" Maksud pertanyaan tersebut adalah...',
            options: ['Dicampur atau dipisah?', 'Makan di sini atau dibungkus?', 'Pedas atau manis?', 'Pake es atau panas?'],
            correctAnswer: 'Dicampur atau dipisah?',
            promptAudioText: 'Dipun campur napa dipun pisah mas?',
            explanation: '"Napa" di sini berarti "atau". Pertanyaan ini sering ditanyakan penjual soto, es campur, atau lauk nasi!',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u2-l1-q4',
            type: 'sentence_builder',
            prompt: 'Susun kalimat bahasa Jawa untuk memesan: "Dibungkus saja mas":',
            scrambledTokens: ['mas', 'kemawon', 'Dipunbungkus', 'mriki', 'dhahar'],
            correctTokens: ['Dipunbungkus', 'kemawon', 'mas'],
            promptAudioText: 'Dipunbungkus kemawon mas',
            explanation: '"Dipunbungkus" artinya dibungkus bawa pulang. "Kemawon" artinya saja (Krama dari \'wae\').',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u2-l1-q5',
            type: 'match_pairs',
            prompt: 'Jodohkan istilah kuliner penting di Jogja:',
            pairItems: [
              { left: 'Dahar mriki (Krama)', right: 'Makan di sini' },
              { left: 'Bungkus / Bekta wangsul', right: 'Bawa pulang' },
              { left: 'Wedang anget', right: 'Minuman hangat' },
              { left: 'Sekul (Krama)', right: 'Nasi' }
            ],
            explanation: 'Sekul = Nasi, Toya = Air, Gendhis = Gula. Kosakata ini membuatmu terdengar seperti warga lokal yang beradab!'
          }
        ]
      },
      {
        id: 'u2-l2',
        title: 'Tanya Harga & Bayar',
        subtitle: 'Pinten nggih mas? Sedaya pinten?',
        icon: 'ShoppingBag',
        xpReward: 20,
        questions: [
          {
            id: 'u2-l2-q1',
            type: 'multiple_choice',
            prompt: 'Setelah selesai makan di angkringan, bagaimana cara sopan menanyakan "Berapa total semuanya mas?":',
            options: ['Sedaya pinten nggih mas?', 'Iki piro mas?', 'Duwite piro?', 'Piro kabeh?'],
            correctAnswer: 'Sedaya pinten nggih mas?',
            promptAudioText: 'Sedaya pinten nggih mas?',
            explanation: '"Sedaya" artinya semuanya, "pinten" artinya berapa. "Sedaya pinten nggih mas?" adalah kalimat pamungkas maba yang sangat sopan!',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u2-l2-q2',
            type: 'sentence_builder',
            prompt: 'Susun kalimat: "Habis berapa mas?":',
            scrambledTokens: ['mas?', 'nggih', 'Pinten', 'tuku', 'ora'],
            correctTokens: ['Pinten', 'nggih', 'mas?'],
            promptAudioText: 'Pinten nggih mas?',
            explanation: '"Pinten nggih mas?" adalah bentuk singkat yang paling lazim digunakan saat berbelanja apa pun di Jogja.',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u2-l2-q3',
            type: 'multiple_choice',
            prompt: 'Jika penjual menjawab "Sedasa ewu", berapa rupiah yang harus kamu bayarkan?',
            options: ['Rp 10.000', 'Rp 20.000', 'Rp 1.000', 'Rp 50.000'],
            correctAnswer: 'Rp 10.000',
            promptAudioText: 'Sedasa ewu rupiah',
            explanation: 'Sedasa = 10, ewu = ribu. Sedasa ewu = Rp 10.000. Kalau Kalih dasa ewu = Rp 20.000.',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u2-l2-q4',
            type: 'multiple_choice',
            prompt: 'Ketika kamu memberikan uang pas atau ingin memberi tip receh: "Kembaliannya tidak usah mas", dalam bahasa Jawa adalah...',
            options: ['Mboten sah susuk mas', 'Ora usah dhuwit', 'Kurang susuke', 'Duwitku kacek'],
            correctAnswer: 'Mboten sah susuk mas',
            promptAudioText: 'Mboten sah susuk mas',
            explanation: '"Mboten sah" = tidak usah, "susuk" = uang kembalian. Sangat praktis saat belanja gorengan!',
            politenessLevel: 'Krama Madya'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Aturan Emas: Ngoko, Krama & Etika Kampus',
    description: 'Pahami kapan boleh santai dan kapan wajib sopan: jangan pernah sebut diri sendiri "dhahar" atau panggil dosen "kowe"!',
    color: '#d97706', // UGM Radiant Gold Amber
    lessons: [
      {
        id: 'u3-l1',
        title: 'Misteri Kata "Makan": Mangan, Nedha, & Dhahar',
        subtitle: 'Konsep paling sering salah diucapkan maba non-Jawa!',
        icon: 'AlertCircle',
        xpReward: 25,
        questions: [
          {
            id: 'u3-l1-q1',
            type: 'multiple_choice',
            prompt: 'KESALAHAN UMUM MABA: Ketika kamu berbicara kepada dosen atau orang tua bahwa kamu sendiri yang sedang makan, kata yang benar adalah...',
            options: ['Kula saweg nedha', 'Kula saweg dhahar', 'Aku lagi mangan', 'Kula lagi nguntal'],
            correctAnswer: 'Kula saweg nedha',
            promptAudioText: 'Kula saweg nedha sekul',
            explanation: 'INGAT BAIK-BAIK: Kata "dhahar" (Krama Inggil) hanya untuk menghormati orang lain (dosen/orang tua). Menyebut diri sendiri "kula dhahar" dianggap sombong/tidak tahu tata krama. Untuk diri sendiri, gunakan "nedha"!',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u3-l1-q2',
            type: 'multiple_choice',
            prompt: 'Sebaliknya, ketika kamu menanyakan apakah Bapak Dosen atau Ibu Kos sudah makan, kata yang tepat adalah...',
            options: ['Bapak sampun dhahar?', 'Bapak sampun nedha?', 'Bapak wis mangan?', 'Bapak mangan sega?'],
            correctAnswer: 'Bapak sampun dhahar?',
            promptAudioText: 'Bapak sampun dhahar?',
            explanation: 'Untuk orang yang kita hormati (dosen, bapak/ibu kos, orang tua), kata "makan" WAJIB menggunakan "dhahar" (Krama Inggil).',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u3-l1-q3',
            type: 'sentence_builder',
            prompt: 'Susun kalimat sopan: "Ibu dosen sudah pulang (kondur)":',
            scrambledTokens: ['Ibu dosen', 'kondur', 'sampun', 'mulih', 'kula'],
            correctTokens: ['Ibu dosen', 'sampun', 'kondur'],
            promptAudioText: 'Ibu dosen sampun kondur',
            explanation: 'Sama seperti makan, kata pulang untuk diri sendiri adalah "wangsul", sedangkan untuk orang tua/dosen adalah "kondur" (Krama Inggil).',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u3-l1-q4',
            type: 'match_pairs',
            prompt: 'Jodohkan kata kerja berdasarkan tataran kesopanannya:',
            pairItems: [
              { left: 'Mangan (Santai/Ngoko)', right: 'Makan (Sesama Teman)' },
              { left: 'Nedha (Krama Madya)', right: 'Makan (Untuk Diri Sendiri)' },
              { left: 'Dhahar (Krama Inggil)', right: 'Makan (Untuk Dosen / Orang Tua)' },
              { left: 'Turu -> Tilem -> Sare', right: 'Tidur (Ngoko -> Madya -> Inggil)' }
            ],
            explanation: 'Inilah intisari "Undha-Usuk Basa". Bahasa Jawa mengajarkan kita merendahkan hati untuk diri sendiri dan memuliakan orang lain.'
          }
        ]
      },
      {
        id: 'u3-l2',
        title: 'Etika Kata Ganti: Aku vs Kula, Kowe vs Panjenengan',
        subtitle: 'Biar tidak salah panggil saat chat dosen atau bicara dengan warga',
        icon: 'Users',
        xpReward: 25,
        questions: [
          {
            id: 'u3-l2-q1',
            type: 'multiple_choice',
            prompt: 'Jika kamu mengirim pesan ke Dosen Wali UGM atau staf akademik, kata ganti "saya" yang sopan adalah...',
            options: ['Kula', 'Aku', 'Awakdhewe', 'Gue'],
            correctAnswer: 'Kula',
            promptAudioText: 'Nyuwun sewu bapak, kula mahasiswa bimbingan',
            explanation: 'Kata "Aku" hanya untuk teman sebaya/akrab (Ngoko). Kepada dosen atau orang yang lebih tua, selalu gunakan "Kula"!',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u3-l2-q2',
            type: 'multiple_choice',
            prompt: 'PANTANGAN BESAR: Jangan pernah memanggil dosen atau orang tua dengan kata...',
            options: ['Kowe', 'Panjenengan', 'Bapak / Ibu', 'Njenengan'],
            correctAnswer: 'Kowe',
            promptAudioText: 'Aja nyebut kowe marang dosen',
            explanation: 'Kata "Kowe" artinya kamu dalam tataran Ngoko kasar/santai. Memanggil dosen "kowe" dianggap sangat tidak sopan. Gunakan "Panjenengan" atau panggil jabatannya seperti "Bapak / Ibu"!',
            politenessLevel: 'Krama Inggil'
          },
          {
            id: 'u3-l2-q3',
            type: 'sentence_builder',
            prompt: 'Susun kalimat hormat: "Apakah Bapak Dosen berkenan (kersa)?":',
            scrambledTokens: ['Bapak', 'kersa?', 'menapa', 'gelem', 'kowe'],
            correctTokens: ['Bapak', 'menapa', 'kersa?'],
            promptAudioText: 'Bapak menapa kersa?',
            explanation: '"Kersa" artinya mau atau berkenan (Krama Inggil dari kata \'gelem\').',
            politenessLevel: 'Krama Inggil'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Ojol, Trans Jogja & Arah Mata Angin',
    description: 'Khas Jogja banget: petunjuk jalan pakai arah mata angin (Lor, Kidul, Kulon, Wetan) bukan sekadar kiri/kanan!',
    color: '#2563eb', // UGM Lighter Royal Blue
    lessons: [
      {
        id: 'u4-l1',
        title: 'Mata Angin Khas Warga Jogja',
        subtitle: 'Lor (Utara) Gunung Merapi, Kidul (Selatan) Pantai Parangtritis',
        icon: 'Compass',
        xpReward: 30,
        questions: [
          {
            id: 'u4-l1-q1',
            type: 'multiple_choice',
            prompt: 'Ketika kamu bertanya arah ke warga Jogja, mereka sering menjawab "Terus ngalor wae mas". Arti kata "Ngalor / Lor" adalah...',
            options: ['Ke Utara (ke arah Gunung Merapi)', 'Ke Selatan', 'Ke Barat', 'Ke Timur'],
            correctAnswer: 'Ke Utara (ke arah Gunung Merapi)',
            promptAudioText: 'Ngalor ngetan ngidul ngulon',
            explanation: 'Patokan kota Jogja adalah sumbu filosofis: Lor = Utara (Gunung Merapi), Kidul = Selatan (Laut Kidul). Warga Jogja terbiasa memakai kompas alamiah ini!',
            politenessLevel: 'Ngoko'
          },
          {
            id: 'u4-l1-q2',
            type: 'match_pairs',
            prompt: 'Hafalkan 4 arah mata angin yang wajib diketahui mahasiswa Jogja:',
            pairItems: [
              { left: 'Lor (Ngalor)', right: 'Utara' },
              { left: 'Kidul (Ngidul)', right: 'Selatan' },
              { left: 'Kulon (Ngulon)', right: 'Barat' },
              { left: 'Wetan (Ngetan)', right: 'Timur' }
            ],
            explanation: 'Tips hafalan maba: U-T-S-B di Jogja adalah Lor (Utara), Wetan (Timur), Kidul (Selatan), Kulon (Barat).'
          },
          {
            id: 'u4-l1-q3',
            type: 'multiple_choice',
            prompt: 'Saat naik Trans Jogja atau taksi online dan ingin bilang "Kiri jalan mas", ucapan yang umum adalah...',
            options: ['Kiri mas / Ngiwa mas', 'Nengen mas', 'Lurus wae', 'Mandheg mriki'],
            correctAnswer: 'Kiri mas / Ngiwa mas',
            promptAudioText: 'Kiri mas, ngiwa sekedhik',
            explanation: '"Ngiwa" artinya ke kiri (kiwo = kiri), sedangkan "Nengen" artinya ke kanan (tengen = kanan).',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u4-l1-q4',
            type: 'sentence_builder',
            prompt: 'Susun kalimat: "Permisi, mau tanya arah jalan":',
            scrambledTokens: ['sewu,', 'Nyuwun', 'tanglet', 'dalan', 'kowe'],
            correctTokens: ['Nyuwun', 'sewu,', 'tanglet', 'dalan'],
            promptAudioText: 'Nyuwun sewu, tanglet dalan mas',
            explanation: '"Tanglet" adalah bahasa Krama dari \'takon\' (tanya). Sangat sopan digunakan saat tersesat di gang kos-kosan!',
            politenessLevel: 'Krama Madya'
          }
        ]
      },
      {
        id: 'u4-l2',
        title: 'Angka & Bilangan Belanja',
        subtitle: 'Setunggal, kalih, tiga, sekawan, gangsal...',
        icon: 'Hash',
        xpReward: 30,
        questions: [
          {
            id: 'u4-l2-q1',
            type: 'multiple_choice',
            prompt: 'Angka 5 dalam bahasa Jawa Krama yang sering kamu dengar saat belanja adalah...',
            options: ['Gangsal', 'Sekawan', 'Limo', 'Pitu'],
            correctAnswer: 'Gangsal',
            promptAudioText: 'Gangsal ewu rupiah',
            explanation: '1 = Setunggal, 2 = Kalih, 3 = Tiga, 4 = Sekawan, 5 = Gangsal (Limo dalam ngoko).',
            politenessLevel: 'Krama Madya'
          },
          {
            id: 'u4-l2-q2',
            type: 'multiple_choice',
            prompt: 'Angka 25 dalam bahasa Jawa memiliki sebutan unik yang sangat populer di pasar, yaitu...',
            options: ['Selawe', 'Selikur', 'Rong puluh lima', 'Sewidak'],
            correctAnswer: 'Selawe',
            promptAudioText: 'Rega selawe ewu',
            explanation: 'Selawe = 25. Sementara 21-29 memakai akhiran \'-likur\' (selikur = 21, rolikur = 22, dst.), tetapi khusus 25 disebut Selawe (seneng-senenge laku gawe).',
            politenessLevel: 'Ngoko'
          },
          {
            id: 'u4-l2-q3',
            type: 'match_pairs',
            prompt: 'Jodohkan angka belasan dan puluhan khas Jawa:',
            pairItems: [
              { left: 'Sewelas (11)', right: 'Sebelas' },
              { left: 'Selikur (21)', right: 'Dua puluh satu' },
              { left: 'Selawe (25)', right: 'Dua puluh lima' },
              { left: 'Sewidak (60)', right: 'Enam puluh' }
            ],
            explanation: 'Orang tua di pasar tradisional sering menyebut "selawe" atau "sewelas". Sekarang kamu tidak akan bingung lagi!'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Aksara Jawa di Plang Kampus UGM',
    description: 'Kenapa plang nama jalan di UGM dan Jogja ada tulisan aksaranya? Pelajari 20 huruf Hanacaraka dengan mudah!',
    color: '#78350f', // Batik Mataraman Warm Brown
    lessons: [
      {
        id: 'u5-l1',
        title: 'Mengenal Baris Pertama: Ha - Na - Ca - Ra - Ka',
        subtitle: 'Legenda utusan Aji Saka yang menjadi identitas budaya Jogja',
        icon: 'BookOpen',
        xpReward: 30,
        questions: [
          {
            id: 'u5-l1-q1',
            type: 'aksara_choice',
            prompt: 'Huruf pertama Aksara Jawa adalah "Ha" (ꦲ). Yang manakah huruf "Ha"?',
            options: ['ꦲ', 'ꦤ', 'ꦕ', 'ꦫ'],
            correctAnswer: 'ꦲ',
            promptAudioText: 'Aksara Ha',
            explanation: 'Aksara "ꦲ" (Ha / A) melambangkan hembusan nafas kehidupan manusia dan huruf pembuka Hanacaraka.',
            politenessLevel: 'Aksara'
          },
          {
            id: 'u5-l1-q2',
            type: 'multiple_choice',
            prompt: 'Lima huruf pertama (Ha-Na-Ca-Ra-Ka) secara filosofi memiliki arti...',
            options: ['Ada dua orang utusan yang setia', 'Sama-sama saktinya', 'Keduanya bertarung sengit', 'Keduanya gugur bersama'],
            correctAnswer: 'Ada dua orang utusan yang setia',
            promptAudioText: 'Hana caraka tegese ana utusan',
            explanation: 'Hana Caraka (Ada utusan), Data Sawala (Saling berbeda pendapat), Pada Jayanya (Sama saktinya), Maga Bathanga (Keduanya mati menjadi bangkai demi memegang amanah).',
            politenessLevel: 'Aksara'
          },
          {
            id: 'u5-l1-q3',
            type: 'aksara_choice',
            prompt: 'Di plang nama jalan "KALIURANG", huruf "Ka" yang sering kamu lihat adalah...',
            options: ['ꦏ', 'ꦫ', 'ꦤ', 'ꦲ'],
            correctAnswer: 'ꦏ',
            promptAudioText: 'Aksara Ka',
            explanation: 'Aksara "ꦏ" (Ka) adalah huruf kelima dari baris pertama Hanacaraka.',
            politenessLevel: 'Aksara'
          },
          {
            id: 'u5-l1-q4',
            type: 'match_pairs',
            prompt: 'Jodohkan aksara baris pertama dengan bunyi latinnya:',
            pairItems: [
              { left: 'ꦲ', right: 'Ha' },
              { left: 'ꦤ', right: 'Na' },
              { left: 'ꦕ', right: 'Ca' },
              { left: 'ꦫ', right: 'Ra' }
            ],
            explanation: 'Bagus sekali! Dengan mengenali bentuk dasarnya, kamu akan mulai bisa mengeja plang jalan di sekeliling kampus UGM!'
          }
        ]
      }
    ]
  }
];
