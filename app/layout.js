import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const __jsonld = {"@context":"https://schema.org","@type":"MedicalClinic","name":"Klinik Sehat Sentosa","description":"Janji temu dokter online","url":"https://reservasi-klinik.vercel.app","areaServed":"ID"};

export const metadata = {
  metadataBase: new URL("https://reservasi-klinik.vercel.app"),
  title: "Klinik Sehat Sentosa — Janji Temu Dokter Online",
  description: "Buat janji temu dokter online: pilih dokter, tanggal, dan slot waktu yang tersedia. Praktis tanpa antre panjang.",
  applicationName: "Klinik Sehat Sentosa",
  keywords: ["janji temu dokter", "booking dokter", "reservasi klinik", "konsultasi dokter", "appointment"],
  authors: [{ name: "Klinik Sehat Sentosa" }],
  creator: "Klinik Sehat Sentosa",
  publisher: "Klinik Sehat Sentosa",
  alternates: { canonical: "https://reservasi-klinik.vercel.app" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://reservasi-klinik.vercel.app",
    siteName: "Klinik Sehat Sentosa",
    title: "Klinik Sehat Sentosa — Janji Temu Dokter Online",
    description: "Buat janji temu dokter online: pilih dokter, tanggal, dan slot waktu yang tersedia. Praktis tanpa antre panjang.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Klinik Sehat Sentosa — Janji Temu Dokter Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klinik Sehat Sentosa — Janji Temu Dokter Online",
    description: "Buat janji temu dokter online: pilih dokter, tanggal, dan slot waktu yang tersedia. Praktis tanpa antre panjang.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport = { themeColor: '#2563eb' };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
