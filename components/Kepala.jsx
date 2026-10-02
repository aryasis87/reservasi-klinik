'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Stethoscope } from 'lucide-react';
import { klinik, nav } from '@/lib/data';

export default function Kepala() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white" aria-hidden="true"><Stethoscope size={20} /></span>
          <span>
            <span className="block text-lg font-bold leading-none text-slate-900">{klinik.name}</span>
            <span className="mt-1 block text-xs text-slate-700">{klinik.jam}</span>
          </span>
        </Link>
        <nav aria-label="Utama" className="flex gap-1 overflow-x-auto text-sm font-semibold">
          {nav.map((n) => {
            const aktif = n.href === '/' ? path === '/' : path?.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} aria-current={aktif ? 'page' : undefined}
                className={`shrink-0 rounded-lg px-3 py-1.5 transition ${aktif ? 'bg-blue-700 text-white' : 'text-slate-800 hover:bg-blue-50 hover:text-blue-800'}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
