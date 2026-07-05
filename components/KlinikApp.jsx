'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, CalendarDays, Clock, Check, User, Phone, ClipboardList, ChevronRight, Search } from 'lucide-react';
import { klinik, doctors, buildSlots, seedReservations } from '@/lib/data';
import { useLocalStorage } from '@/lib/useLocalStorage';

const today = new Date().toISOString().slice(0, 10);
const fmtDate = (s) => new Date(s).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
const STEPS = ['Dokter', 'Jadwal', 'Data', 'Konfirmasi'];
const SPECIALTIES = ['Semua', 'Umum', 'Anak', 'Gigi', 'Penyakit Dalam'];

export default function KlinikApp() {
  const [reservations, setReservations] = useLocalStorage('klinik.appointments', seedReservations);
  const [doctorId, setDoctorId] = useState(null);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', complaint: '' });
  const [query, setQuery] = useState('');
  const [spec, setSpec] = useState('Semua');
  const [done, setDone] = useState(null);

  const doctor = doctors.find((d) => d.id === doctorId) || null;
  const slots = useMemo(() => (doctor ? buildSlots(doctor.start, doctor.end) : []), [doctor]);
  const bookedSlots = useMemo(() => reservations.filter((r) => r.doctorId === doctorId && r.date === date).map((r) => r.time), [reservations, doctorId, date]);

  const visibleDoctors = useMemo(() => doctors.filter((d) => {
    const q = query.trim().toLowerCase();
    const okQ = !q || d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q);
    const okS = spec === 'Semua' || d.spec.toLowerCase().includes(spec.toLowerCase());
    return okQ && okS;
  }), [query, spec]);

  const step = done ? 4 : time ? 3 : doctor ? 2 : 1;

  const pickDoctor = (id) => { setDoctorId(id); setTime(null); };
  const confirm = (e) => {
    e.preventDefault();
    if (!doctor || !time || !form.name.trim() || !form.phone.trim()) return;
    const appt = { id: `a-${Date.now()}`, doctorId, doctorName: doctor.name, date, time, ...form };
    setReservations((p) => [...p, appt]);
    setDone(appt);
    setTime(null);
    setForm({ name: '', phone: '', complaint: '' });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"><Stethoscope size={20} /></span>
          <div>
            <h1 className="text-lg font-bold leading-none text-slate-800">{klinik.name}</h1>
            <p className="mt-1 text-xs text-slate-500">{klinik.tagline}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8">
        {/* Stepper */}
        <div className="mb-8 flex items-center">
          {STEPS.map((s, i) => {
            const n = i + 1; const active = step >= n;
            return (
              <div key={s} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {step > n ? <Check size={15} /> : n}
                  </span>
                  <span className={`text-[11px] font-semibold ${active ? 'text-blue-600' : 'text-slate-400'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`mx-2 h-1 flex-1 rounded-full ${step > n ? 'bg-blue-600' : 'bg-slate-200'}`} />}
              </div>
            );
          })}
        </div>

        {/* 1. Dokter */}
        <h2 className="text-2xl font-bold text-slate-800">Pilih Dokter</h2>
        <p className="mt-1 text-sm text-slate-500">Siapa yang ingin Anda temui hari ini?</p>

        <div className="relative mt-4">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama dokter atau spesialisasi..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SPECIALTIES.map((s) => (
            <button key={s} onClick={() => setSpec(s)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${spec === s ? 'bg-blue-600 text-white shadow' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {visibleDoctors.map((d) => {
            const active = doctorId === d.id;
            return (
              <button key={d.id} onClick={() => pickDoctor(d.id)}
                className={`relative flex items-center gap-3 rounded-xl border bg-white p-4 text-left shadow-sm transition ${active ? 'border-2 border-blue-600' : 'border-slate-200 hover:border-blue-300'}`}>
                {active && <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"><Check size={14} /></span>}
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${d.color}`}>{d.initials}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-800">{d.name}</p>
                  <p className="text-xs font-medium text-blue-600">{d.spec}</p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400"><Clock size={12} /> {d.start}–{d.end}</p>
                </div>
              </button>
            );
          })}
          {visibleDoctors.length === 0 && <p className="col-span-full py-6 text-center text-sm text-slate-400">Tidak ada dokter cocok.</p>}
        </div>

        {/* 2. Jadwal */}
        {doctor && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="mt-10 text-sm font-bold uppercase tracking-wide text-slate-700">Pilih Tanggal &amp; Waktu</h3>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <label className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
                <CalendarDays size={16} className="text-blue-600" />
                <input type="date" min={today} value={date} onChange={(e) => { setDate(e.target.value); setTime(null); }}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500" />
                <span className="text-slate-400">{fmtDate(date)}</span>
              </label>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {slots.map((s) => {
                  const booked = bookedSlots.includes(s); const active = time === s;
                  return (
                    <button key={s} disabled={booked} onClick={() => setTime(s)}
                      className={`rounded-lg border py-2 text-sm font-semibold transition ${active ? 'border-blue-600 bg-blue-600 text-white' : booked ? 'cursor-not-allowed border-slate-100 bg-slate-100 text-slate-300 line-through' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-600'}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. Data */}
        {doctor && time && (
          <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={confirm}>
            <h3 className="mt-10 text-sm font-bold uppercase tracking-wide text-slate-700">Data Pasien</h3>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm">
                <span className="font-semibold text-blue-900">{doctor.name}</span>
                <span className="text-blue-700">{fmtDate(date)} • {time}</span>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-blue-500"><User size={16} className="text-slate-400" /><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama pasien" required className="w-full bg-transparent text-sm outline-none" /></label>
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-blue-500"><Phone size={16} className="text-slate-400" /><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="No. WhatsApp" required className="w-full bg-transparent text-sm outline-none" /></label>
                <label className="flex items-start gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-blue-500"><ClipboardList size={16} className="mt-0.5 text-slate-400" /><textarea value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} placeholder="Keluhan (opsional)" rows={2} className="w-full resize-none bg-transparent text-sm outline-none" /></label>
              </div>
              <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700">Konfirmasi Janji Temu <ChevronRight size={16} /></button>
            </div>
          </motion.form>
        )}
      </main>

      <AnimatePresence>
        {done && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDone(null)}>
            <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white"><Check size={28} /></div>
              <h3 className="mt-4 text-2xl font-bold text-slate-800">Janji Temu Dibuat!</h3>
              <p className="mt-1 text-sm text-slate-500">Sampai jumpa, {done.name} 🩺</p>
              <div className="mt-5 space-y-1.5 rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-600">
                <p className="flex justify-between"><span>Dokter</span><span className="font-semibold text-slate-800">{done.doctorName}</span></p>
                <p className="flex justify-between"><span>Tanggal</span><span className="font-semibold text-slate-800">{fmtDate(done.date)}</span></p>
                <p className="flex justify-between"><span>Waktu</span><span className="font-semibold text-slate-800">{done.time} WIB</span></p>
              </div>
              <button onClick={() => setDone(null)} className="mt-5 w-full rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Selesai</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
