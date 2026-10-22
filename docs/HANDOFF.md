# Handoff — Meraki Bersama Static POC

## 1. Ringkasan deliverable

Static website POC dengan 20 halaman HTML, CSS responsif, dan vanilla JavaScript. Website dapat dibuka langsung dari `index.html` tanpa build step, package manager, backend, atau test runner.

Cakupan yang sudah diimplementasikan:

- Company profile: homepage, about, services, service detail, articles, article detail, contact.
- Katalog digital: search, filter tipe/kategori, pagination, detail produk, preview, dan produk terkait.
- Simulasi akun: login, registrasi, forgot password, akun customer, order history, My Library.
- Learning viewer: video, dokumen, foto, fallback sesi live, progres, dan akses berbasis kepemilikan produk.
- Commerce demo: checkout, pembuatan order, status pembayaran success/pending/failed/expired, dan integrasi ke library.
- Admin demo: dashboard, ringkasan performa, CRUD produk, manajemen order, filter, detail modal, dan reset data.
- App shell terpisah:
  - Admin memakai sidebar gelap + topbar + drawer mobile.
  - Area anggota memakai topbar, sidebar profil/navigasi, dan drawer mobile.
  - Checkout dan payment result memakai shell commerce yang fokus.
  - Header/footer publik tidak lagi muncul di area panel.

## 2. Cara membuka dan akun demo

Buka `index.html` melalui browser. Tidak ada instalasi.

| Peran | Email | Password |
| --- | --- | --- |
| Customer | `customer@meraki.demo` | `demo1234` |
| Admin | `admin@meraki.demo` | `admin1234` |

Akun demo juga dapat dimasuki lewat tombol demo pada gate area anggota, gate admin, dan halaman login.

## 3. Skenario presentasi yang disarankan

1. **Public journey**
   - Buka homepage, lihat layanan, produk unggulan, dan artikel.
   - Buka `services.html`, klik selector program (termasuk 1-on-1) untuk menunjukkan anchor dan layout kartu.
   - Buka katalog, gunakan search/filter, lalu buka detail produk.

2. **Customer journey**
   - Dari detail produk, klik beli sehingga diarahkan ke login.
   - Masuk sebagai customer demo.
   - Selesaikan checkout, lalu tunjukkan halaman payment result.
   - Buka My Library, buka materi, tandai satu materi selesai, dan lihat progres.
   - Kembali ke akun untuk menunjukkan order history.

3. **Status pembayaran**
   - Di payment result, ganti status ke Pending, Gagal, dan Expired.
   - Kembali ke akun/admin untuk menunjukkan status order berubah.

4. **Admin journey**
   - Logout, buka halaman admin, tunjukkan gate admin.
   - Masuk sebagai admin demo.
   - Tunjukkan dashboard, tambah/edit produk, publish/draft, hapus dengan konfirmasi.
   - Buka order, filter status, buka detail order, ubah status.
   - Tunjukkan bahwa perubahan status dapat memengaruhi akses library customer.

5. **Responsive**
   - Perkecil viewport ke 390/360 px.
   - Buka drawer anggota dan admin.
   - Tunjukkan tabel dapat discroll di dalam container tanpa membuat halaman melebar.

## 4. Struktur teknis

- `assets/js/mock-data.js` — data produk, layanan, artikel, akun, dan order.
- `assets/js/core.js` — state, persistence, design utilities, header/footer publik, app shell admin/member, modal, toast, dan guard.
- `assets/js/app.js` — render halaman publik.
- `assets/js/commerce.js` — autentikasi, checkout, payment result, akun.
- `assets/js/library.js` — My Library dan learning viewer.
- `assets/js/admin.js` — dashboard, produk, order.
- `assets/css/styles.css` — design system, komponen publik, app shell, dan media query.

State demo:

- Key utama: `meraki_demo_state_v1`.
- Fallback: `window.name` dengan prefix `meraki_demo_state::`.
- Reset: tombol **Reset data demo** di `admin-products.html`.
- Password disimpan sebagai fingerprint non-kriptografis untuk demo, bukan mekanisme keamanan.

## 5. Keputusan desain

- Navy `#1e3a8a`, orange `#f97316`, dan Plus Jakarta Sans digunakan konsisten.
- Logo “M” dibuat dengan HTML/CSS agar tidak bergantung pada file logo beresolusi rendah.
- Program di hero layanan diubah menjadi empat selector berlebar sama; label “1-on-1 Mentorship” tidak lagi menjadi chip pendek di tepi.
- Kartu layanan dibuat setinggi baris dan CTA ditempatkan di bagian bawah kartu.
- Area panel dipisahkan dari marketing chrome agar terasa seperti aplikasi setelah login.
- Halaman checkout/payment result sengaja tidak memakai sidebar penuh agar fokus pada transaksi dan status.
- Semua data dan transaksi diberi label demo; tidak ada klaim pembayaran atau autentikasi nyata.

## 6. Batasan dan risiko

- Tidak ada backend, database, payment gateway, email, CMS, atau audit log.
- Kontrol akses konten hanya simulasi frontend.
- Semua state dapat diubah pengguna; jangan gunakan untuk data asli.
- Aset dan konten fiktif perlu diganti dengan materi resmi yang disetujui pemilik brand sebelum produksi.
- Google Fonts adalah satu-satunya dependency jaringan; font fallback tetap tersedia.
- Uji lintas browser perangkat fisik belum dilakukan pada putaran ini.

## 7. Pertanyaan terbuka untuk stakeholder

1. Apakah struktur navigasi dan pengelompokan halaman sudah sesuai prioritas brand?
2. Apakah empat program (Public Class, Corporate Mentorship, Executive Coaching, 1-on-1 Mentorship) sudah tepat sebagai penawaran utama?
3. Apakah copywriting, harga, dan paket produk digital pada demo sudah mendekati penawaran nyata?
4. Apakah dashboard admin demo perlu dipertahankan pada versi produksi, atau hanya untuk presentasi?
5. Apakah checkout perlu mendukung lebih dari satu produk dalam satu transaksi?
6. Apakah status pembayaran dan alur order sudah sesuai proses bisnis yang diinginkan?
7. Apakah learning viewer perlu mendukung video eksternal (YouTube/Vimeo), DRM, atau file privat?
8. Apakah dibutuhkan halaman kebijakan privasi, syarat layanan, dan FAQ terpisah?
9. Apakah brand guideline, logo resmi, foto, dan kontak final sudah tersedia?
10. Apakah perlu dukungan multibahasa (Indonesia/Inggris) pada fase berikutnya?

## 8. Pemeriksaan sebelum handoff final

- [x] Seluruh 20 halaman dapat dibuka.
- [x] Alur utama katalog → login → checkout → payment result → library → viewer berjalan.
- [x] Alur admin login → dashboard → produk/order berjalan.
- [x] Gate customer/admin menyembunyikan panel sebelum login.
- [x] Drawer mobile admin/member berfungsi.
- [x] Tidak ada console error pada alur utama.
- [x] Tidak ada horizontal overflow pada viewport yang diuji.
- [ ] Uji perangkat fisik dan browser lain (Safari/Firefox) sebelum produksi.
- [ ] Ganti seluruh konten dan aset fiktif dengan materi resmi yang disetujui.
