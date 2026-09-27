# Klinik Sehat Sentosa — Janji Temu Dokter Online

Buat janji temu dokter online: pilih dokter, tanggal, dan slot waktu yang tersedia. Praktis tanpa antre panjang.

**Demo live:** https://reservasi-klinik-rose.vercel.app

![Tangkapan layar Klinik Sehat Sentosa](public/og.jpg)

> Aplikasi reservasi contoh. Data tersimpan di browser (localStorage), tanpa backend.

## Konsep

Paradigma **slot dokter**: pilih dokter, tanggal, lalu slot 30 menit lewat stepper empat langkah.

## Halaman

`/`

## Teknologi

- Next.js 15.5 (App Router) dan React 19
- Tailwind CSS v4
- JavaScript
- Framer Motion, Lucide (ikon)
- Font: Inter (next/font)
- SEO: metadata per halaman, Open Graph, JSON-LD, sitemap.xml, dan robots.txt

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk build produksi: `npm run build` lalu `npm start`.

---

Bagian dari koleksi 5 aplikasi reservasi di [PortalReservasi](https://portal-reservasi-nu.vercel.app). Dibuat oleh [PintuWeb](https://pintuweb.com), jasa pembuatan website.
