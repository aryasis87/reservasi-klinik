# Klinik Sehat Sentosa — Design System (Reservasi Klinik/Dokter)

> Concept: **friendly health-companion** — lembut, membulat, menenangkan & manusiawi (terasa seperti aplikasi wellness, bukan korporat dingin). Platform: responsive web. Bahasa: Indonesia.

## Brand voice
Tenang, suportif, jelas. "Buat janji temu", "Pilih dokter & waktu yang nyaman untukmu".

## Color tokens
| Token | Hex | Pakai |
|---|---|---|
| `bg` | `#f1f6fb` | latar (biru sangat muda) |
| `surface` | `#ffffff` | kartu |
| `ink` | `#0f172a` | teks utama (slate-900) |
| `muted` | `#64748b` | teks sekunder |
| `primary` | `#2563eb` | aksi (blue-600) |
| `primary-soft` | `#dbeafe` | latar lembut/aktif |
| `mint` | `#10b981` | aksen sehat/sukses |
| `slot-free` | `#ffffff`+border | slot tersedia |
| `slot-booked` | `#f1f5f9` / teks `#cbd5e1` | terisi (strikethrough) |
| `border` | `#e2e8f0` | garis |
Avatar dokter: warna lembut beragam (blue/emerald/rose/violet) untuk inisial.

## Typography
- Satu keluarga humanis ramah: **Inter** (atau Nunito) 400–700. Tidak ada serif — kesan modern & approachable.
- Skala: H1 24, step-title 14 uppercase, slot 14 bold, body 14.

## Shape & elevation
- Radius besar & ramah: kartu `16px`, slot `10px`, avatar full.
- Shadow sangat halus; banyak ruang putih.

## Components
- **Step wizard**: indikator langkah bernomor (1 Dokter · 2 Jadwal · 3 Data).
- **Doctor card**: avatar inisial berwarna + nama + spesialisasi + jam praktik; aktif → ring biru + centang.
- **Slot grid (signature)**: tombol jam 30-menit; terisi = nonaktif + strikethrough; terpilih = biru solid.
- **Patient form**: Nama, No. WhatsApp, Keluhan (opsional).
- **Buttons**: primary biru, radius-xl.

## States
Default = pilih dokter. Setelah dokter → muncul jadwal. Setelah slot → form. Disabled slot = terisi. Success = modal centang biru + ringkasan janji temu.

## Motion
Transisi langkah lembut (slide/fade), slot select halus (200ms). Hormati reduced-motion.

## Layout
Wizard satu kolom terpusat (max ~720px), tap target besar, sangat nyaman di mobile.
