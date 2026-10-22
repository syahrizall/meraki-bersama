# Meraki Bersama — Static Website POC

Proof of concept website statis untuk **Meraki Bersama / PT Harves Gemilang Indo**. POC ini menggabungkan company profile, katalog produk digital, alur checkout demo, area anggota, learning viewer, dan panel admin dalam satu website yang dapat dibuka langsung tanpa build step atau backend.

## Cara membuka

1. Buka folder project ini.
2. Klik dua kali `index.html`, atau buka melalui browser dengan URL `file:///.../index.html`.
3. Tidak perlu menjalankan terminal, install dependency, atau menyalakan server.

Browser yang disarankan: Chrome atau Edge versi terbaru. Google Fonts dimuat dari internet; jika offline, website tetap berjalan dengan font fallback sistem.

## Akun demo

| Peran | Email | Password | Akses |
| --- | --- | --- | --- |
| Customer | `customer@meraki.demo` | `demo1234` | Akun, order, My Library, learning viewer |
| Admin | `admin@meraki.demo` | `admin1234` | Dashboard, produk, order |

Tombol **Masuk sebagai Demo Customer** dan **Masuk sebagai Admin Demo** juga tersedia pada halaman login dan halaman gate masing-masing area.

## Halaman

### Publik

- `index.html` — homepage, layanan, produk unggulan, artikel, CTA.
- `about.html` — profil, nilai, dan pendekatan Meraki Bersama.
- `services.html` — empat program dengan selector program yang dapat diklik.
- `service-detail.html` — detail layanan, manfaat, cakupan, dan CTA konsultasi.
- `products.html` — katalog dengan search, filter tipe, filter kategori, reset, dan pagination.
- `product-detail.html` — detail produk, tab informasi, preview, dan produk terkait.
- `articles.html` — artikel dengan search dan filter kategori.
- `article-detail.html` — isi artikel dan artikel terkait.
- `contact.html` — formulir kontak dengan validasi dan state sukses.

### Akun dan autentikasi

- `login.html` — login demo dengan validasi dan redirect ke halaman tujuan.
- `register.html` — registrasi akun demo; akun baru dimulai tanpa library.
- `forgot-password.html` — simulasi permintaan reset password.
- `account.html` — ringkasan akun, statistik, order history, dan pintasan.
- `my-library.html` — produk yang dimiliki, filter tipe, dan progres belajar.
- `learning-viewer.html` — viewer video, dokumen, foto, dan fallback sesi live.

### Commerce

- `checkout.html` — checkout satu produk dengan data pembeli, metode pembayaran simulasi, dan validasi.
- `payment-result.html` — status pembayaran `success`, `pending`, `failed`, atau `expired`; status bisa dipilih untuk presentasi.

### Admin

- `admin-dashboard.html` — ringkasan produk, order, pengguna, penjualan, dan grafik mock.
- `admin-products.html` — tambah, edit, publish/draft, hapus dengan konfirmasi, dan reset data demo.
- `admin-orders.html` — pencarian, filter status, detail order, dan perubahan status.

## Fitur utama

- Desain responsif 360–1440 px tanpa horizontal overflow pada halaman yang diuji.
- Header publik dan footer publik hanya tampil di halaman publik.
- Panel admin memiliki sidebar dan topbar sendiri; panel anggota memiliki topbar, sidebar, dan drawer mobile.
- Gate login terpisah untuk area anggota dan admin. Konten panel tidak dirender sebelum login.
- State demo tersimpan di browser dan dipakai lintas halaman.
- Katalog, artikel, library, dan admin table memiliki filter/search yang benar-benar memperbarui hasil.
- Modal, toast, lightbox foto, tab detail produk, dan drawer mobile dapat digunakan dengan keyboard.
- Produk yang dibeli memengaruhi akses My Library dan learning viewer.
- Perubahan status order di panel admin memengaruhi akses produk pada state demo.
- Gambar yang gagal dimuat memiliki fallback visual; slug/ID yang tidak dikenal memiliki halaman fallback yang ramah.

## Struktur project

```text
index.html
about.html
services.html
service-detail.html
products.html
product-detail.html
articles.html
article-detail.html
contact.html
login.html
register.html
forgot-password.html
checkout.html
payment-result.html
account.html
my-library.html
learning-viewer.html
admin-dashboard.html
admin-products.html
admin-orders.html
assets/
  css/styles.css
  js/core.js
  js/app.js
  js/commerce.js
  js/library.js
  js/admin.js
  js/mock-data.js
  images/
  media/sample-video.mp4
docs/
  PRD_Harves_Gemilang_Indo_Static_Website_POC.md
  QA_CHECKLIST.md
  HANDOFF.md
```

## Data dan state demo

- State disimpan sebagai JSON di `localStorage` dengan key `meraki_demo_state_v1`.
- Jika `localStorage` tidak tersedia, state memakai fallback `window.name` dengan prefix `meraki_demo_state::`.
- Password demo disimpan sebagai fingerprint non-kriptografis hanya untuk simulasi frontend; ini bukan keamanan produksi.
- Data dapat dikembalikan ke kondisi awal melalui tombol **Reset data demo** di halaman produk admin.
- Status pembayaran dapat diubah saat presentasi melalui query string, misalnya:
  `payment-result.html?order=MB-2026-0101&status=failed`.

## Konten dan aset

- Nama, program, produk, harga, artikel, testimoni, dan akun adalah konten fiktif untuk POC.
- Kontak yang digunakan hanya:
  - `email@harvesgemilangindo.com`
  - Instagram `@merakicoachingandtraining`
- Gambar disimpan lokal di `assets/images/`; video demo memakai file lokal `assets/media/sample-video.mp4`.
- Logo “M” dibuat dengan HTML/CSS, bukan file logo resmi.

## Batasan penting

Website ini **bukan sistem produksi**:

- Tidak ada autentikasi server, database, pembayaran nyata, pengiriman email, atau CMS.
- Kontrol akses materi hanya simulasi frontend; file tidak diamankan.
- Semua state dapat diubah pengguna melalui browser.
- Jangan memasukkan data pribadi, password asli, API key, atau materi berbayar ke dalam demo.
- Perubahan state hanya bertahan pada browser/perangkat yang dipakai.

## Dokumen terkait

- `docs/PRD_Harves_Gemilang_Indo_Static_Website_POC.md` — kebutuhan dan acceptance criteria.
- `docs/QA_CHECKLIST.md` — hasil pemeriksaan manual dan catatan pengujian.
- `docs/HANDOFF.md` — ringkasan deliverable, skenario presentasi, dan pertanyaan terbuka.
