import Link from 'next/link';

export const metadata = { title: 'Halaman tidak ditemukan' };

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-7xl font-bold text-blue-700">404</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Halaman ini tidak ditemukan</h1>
      <p className="mt-3 text-slate-700">Mungkin tautannya salah ketik.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800">Buat janji</Link>
        <Link href="/dokter" className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Jadwal dokter</Link>
      </div>
    </main>
  );
}
