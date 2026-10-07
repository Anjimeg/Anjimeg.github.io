export interface JavaneseDayInfo {
  dateStr: string; // YYYY-MM-DD
  dayOfMonth: number;
  dinaName: string; // Senèn, Selasa, Rebo, etc.
  dinaIndo: string; // Senin, Selasa, Rabu, etc.
  pasaran: string; // Legi, Pahing, Pon, Wagé, Kliwon
  weton: string; // e.g. "Rebo Wagé"
  neptu: number; // e.g. 11
  isToday: boolean;
  isCompleted: boolean;
}

export interface TodayWetonInfo {
  dateStr: string;
  formattedDate: string; // e.g. "7 Oktober 2026"
  dinaName: string;
  pasaran: string;
  weton: string;
  neptuDina: number;
  neptuPasaran: number;
  totalNeptu: number;
  maknaWeton: string;
}

// Dina Pitu (7 Hari)
const DINA_LIST = [
  { name: 'Minggu', indo: 'Minggu', neptu: 5 },
  { name: 'Senèn', indo: 'Senin', neptu: 4 },
  { name: 'Selasa', indo: 'Selasa', neptu: 3 },
  { name: 'Rebo', indo: 'Rabu', neptu: 7 },
  { name: 'Kemis', indo: 'Kamis', neptu: 8 },
  { name: 'Jemuwah', indo: 'Jumat', neptu: 6 },
  { name: 'Setu', indo: 'Sabtu', neptu: 9 }
];

// Pancawara (5 Pasaran Jawa)
const PASARAN_LIST = [
  { name: 'Legi', neptu: 5, color: '#f8fafc', desc: 'Arah Wetan (Timur) - Manis, tulus, lan luhur' },
  { name: 'Pahing', neptu: 9, color: '#fee2e2', desc: 'Arah Kidul (Selatan) - Semangat mawa geni lan greget' },
  { name: 'Pon', neptu: 7, color: '#fef3c7', desc: 'Arah Kulon (Barat) - Kawicaksanan lan wibawa' },
  { name: 'Wagé', neptu: 4, color: '#e0f2fe', desc: 'Arah Lor (Utara) - Katentreman, landhep pikirane' },
  { name: 'Kliwon', neptu: 8, color: '#f3e8ff', desc: 'Pusat (Tengah) - Spiritual, pakurmatan lan peparing' }
];

// Reference anchor: 2024-02-14 was Rebo Pon (Pasaran index = 2)
const ANCHOR_DATE = new Date(Date.UTC(2024, 1, 14));
const ANCHOR_PASARAN_IDX = 2; // Pon

export function calculateWetonForDate(date: Date): { dina: typeof DINA_LIST[0]; pasaran: typeof PASARAN_LIST[0] } {
  // Normalize to UTC date components
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayOfWeek = utcDate.getUTCDay(); // 0 = Minggu, 1 = Senen, ..., 6 = Setu
  
  const diffDays = Math.round((utcDate.getTime() - ANCHOR_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const pasaranIdx = ((ANCHOR_PASARAN_IDX + diffDays) % 5 + 5) % 5;

  return {
    dina: DINA_LIST[dayOfWeek],
    pasaran: PASARAN_LIST[pasaranIdx]
  };
}

export function getTodayJavaneseInfo(): TodayWetonInfo {
  const now = new Date();
  const { dina, pasaran } = calculateWetonForDate(now);

  const monthsIndo = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const year = now.getFullYear();
  const month = now.getMonth();
  const dateNum = now.getDate();
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
  const formattedDate = `${dateNum} ${monthsIndo[month]} ${year}`;

  const weton = `${dina.name} ${pasaran.name}`;
  const totalNeptu = dina.neptu + pasaran.neptu;

  const maknaMap: Record<string, string> = {
    'Legi': 'Dina manis lan becik kanggo miwiti pakaryan anyar kanthi guyub rukun.',
    'Pahing': 'Dina semangat lan greget kanggo nggayuh cita-cita lan ngudi kawruh.',
    'Pon': 'Dina kawicaksanan, becik kanggo tetulung lan nuntun marang kabecikan.',
    'Wagé': 'Dina pinter lan setiti, pas banget kanggo sinau basa lan sastra luhur.',
    'Kliwon': 'Dina wingit lan suci, wektu prayoga kanggo nyenyuwun donga pangestu.'
  };

  return {
    dateStr,
    formattedDate,
    dinaName: dina.name,
    pasaran: pasaran.name,
    weton,
    neptuDina: dina.neptu,
    neptuPasaran: pasaran.neptu,
    totalNeptu,
    maknaWeton: maknaMap[pasaran.name] || 'Dina rahayu widada kagem sinau.'
  };
}

/**
 * Returns the current calendar week (Senèn s/d Minggu) with each day's authentic Javanese weton and completion state
 */
export function getCurrentWeekJavaneseDays(activeDates: string[] = []): JavaneseDayInfo[] {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
  
  // Find Monday of the current week
  // If today is Sunday (0), distance to Monday was -6 days; otherwise 1 - currentDayOfWeek
  const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + distanceToMonday);

  const week: JavaneseDayInfo[] = [];

  for (let i = 0; i < 7; i++) {
    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + i);

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const dateNum = targetDate.getDate();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;

    const { dina, pasaran } = calculateWetonForDate(targetDate);
    const isToday = targetDate.toDateString() === today.toDateString();
    const isCompleted = activeDates.includes(dateStr) || (isToday && activeDates.includes(dateStr));

    week.push({
      dateStr,
      dayOfMonth: dateNum,
      dinaName: dina.name,
      dinaIndo: dina.indo,
      pasaran: pasaran.name,
      weton: `${dina.name} ${pasaran.name}`,
      neptu: dina.neptu + pasaran.neptu,
      isToday,
      isCompleted
    });
  }

  return week;
}
