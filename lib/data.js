// Klinik + daftar dokter + jam praktik.
export const klinik = {
  name: 'Klinik Sehat Sentosa',
  tagline: 'Pelayanan kesehatan keluarga terpercaya',
};

export const doctors = [
  { id: 'd1', name: 'dr. Anita Wijaya', spec: 'Dokter Umum', initials: 'AW', color: 'bg-blue-600', start: '08:00', end: '13:00' },
  { id: 'd2', name: 'dr. Budi Santoso, Sp.A', spec: 'Spesialis Anak', initials: 'BS', color: 'bg-emerald-600', start: '09:00', end: '14:00' },
  { id: 'd3', name: 'drg. Citra Lestari', spec: 'Dokter Gigi', initials: 'CL', color: 'bg-rose-500', start: '10:00', end: '16:00' },
  { id: 'd4', name: 'dr. Dharma Putra, Sp.PD', spec: 'Penyakit Dalam', initials: 'DP', color: 'bg-violet-600', start: '13:00', end: '18:00' },
];

// Bangun slot 30 menit dari start..end.
export function buildSlots(start, end) {
  const toMin = (s) => +s.slice(0, 2) * 60 + +s.slice(3);
  const pad = (n) => String(n).padStart(2, '0');
  const slots = [];
  for (let m = toMin(start); m < toMin(end); m += 30) slots.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  return slots;
}

const today = new Date().toISOString().slice(0, 10);
export const seedReservations = [
  { id: 'a1', doctorId: 'd1', date: today, time: '08:30' },
  { id: 'a2', doctorId: 'd1', date: today, time: '10:00' },
  { id: 'a3', doctorId: 'd3', date: today, time: '10:30' },
];
