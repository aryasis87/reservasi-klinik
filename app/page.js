import { Suspense } from 'react';
import KlinikApp from '@/components/KlinikApp';

export default function Home() {
  return (
    <Suspense fallback={<p className="py-32 text-center text-slate-600">Memuat…</p>}>
      <KlinikApp />
    </Suspense>
  );
}
