import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = {
  title: 'Klinik Sehat Sentosa — Janji Temu Dokter',
  description: 'Buat janji temu: pilih dokter, tanggal, dan slot waktu yang tersedia.',
};

export const viewport = { themeColor: '#2563eb' };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
