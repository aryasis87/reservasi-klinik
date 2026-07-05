export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://reservasi-klinik.vercel.app/sitemap.xml",
    host: "https://reservasi-klinik.vercel.app",
  };
}
