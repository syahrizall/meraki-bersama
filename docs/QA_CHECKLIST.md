# QA Checklist — Meraki Bersama Static POC

Tanggal pemeriksaan: 22 Oktober 2026  
Metode: pemeriksaan manual di Chrome + harness Playwright internal (di luar repository, tanpa setup untuk reviewer).  
Status keseluruhan: **PASS** untuk cakupan yang tercatat di bawah.

## Lingkungan pemeriksaan

| Item | Nilai |
| --- | --- |
| Browser utama | Google Chrome terbaru (Windows) |
| Viewport desktop | 1440 × 900 / 1000 |
| Viewport laptop | 1024 × 900 |
| Viewport tablet | 768 × 900 |
| Viewport mobile | 390 × 844 dan 360 × 800 |
| Cara membuka | `file://` langsung dari `index.html` |
| Console/page error pada alur utama | 0 |

## 1. Smoke test dan struktur

- [x] Homepage tampil dan seluruh section utama ter-render.
- [x] Header publik dan footer publik tampil di halaman publik.
- [x] Panel admin dan area anggota tidak menampilkan header/footer publik.
- [x] Seluruh 20 halaman HTML tersedia.
- [x] Menu utama menuju halaman yang benar.
- [x] Skip link tersedia.
- [x] Tidak ada link `href="#"` yang tersisa.
- [x] Semua halaman dapat dibuka langsung tanpa server.
- [x] Gambar fallback bekerja saat aset gagal dimuat.

## 2. Halaman publik

- [x] Homepage menampilkan 4 produk unggulan, 4 layanan, dan 3 artikel.
- [x] Empat program di hero `services.html` memiliki lebar yang sama dan dapat diklik.
- [x] Anchor program menggulir ke kartu layanan yang sesuai.
- [x] Kartu layanan memiliki CTA sejajar di setiap baris.
- [x] Katalog menampilkan 6 produk pada halaman pertama dan 1 produk pada halaman kedua.
- [x] Search katalog, filter tipe, filter kategori, dan reset bekerja.
- [x] Empty state katalog tampil saat pencarian tidak menemukan hasil.
- [x] Detail produk menampilkan tab, harga, preview, dan produk terkait.
- [x] Artikel dapat dicari, difilter, dan dibuka detailnya.
- [x] Form kontak memvalidasi input kosong/format salah dan menampilkan state sukses.
- [x] Link kontak menggunakan alamat yang disetujui.

## 3. Autentikasi dan area anggota

- [x] Login customer demo berhasil dan redirect ke halaman tujuan.
- [x] Login admin demo berhasil.
- [x] Password salah menampilkan pesan validasi.
- [x] Registrasi membuat akun demo baru dengan library kosong.
- [x] Forgot password menampilkan simulasi sukses.
- [x] Gate login area anggota tampil sebagai halaman sign-in fokus tanpa topbar/sidebar panel.
- [x] Setelah login, topbar, sidebar, profil, dan navigasi anggota tampil.
- [x] Halaman akun menampilkan statistik, order history, dan pintasan.
- [x] Link “Riwayat order” menuju bagian order history.
- [x] My Library menampilkan produk yang dimiliki dan filter tipe.
- [x] Learning viewer menampilkan video/dokumen/foto sesuai tipe produk.
- [x] Navigasi materi, penanda selesai, dan progres tersimpan.
- [x] Fallback sesi live tampil pada item live.
- [x] Lightbox foto dapat dibuka dan ditutup dengan Escape.

## 4. Commerce

- [x] CTA beli dari detail produk mengarah ke login/checkout yang tepat.
- [x] Checkout menampilkan produk dan total yang benar.
- [x] Form checkout memvalidasi field wajib, email, dan persetujuan syarat.
- [x] Checkout sukses membuat order dan menambah produk ke My Library.
- [x] Payment result mendukung status sukses, pending, gagal, dan expired.
- [x] Selector status pembayaran mengubah tampilan dan state order.
- [x] Perubahan status order di admin memengaruhi akses library.
- [x] Order tidak ditemukan menampilkan fallback yang ramah.
- [x] Halaman checkout dan payment result memakai shell commerce yang fokus, bukan header/footer publik penuh.

## 5. Admin

- [x] Guest membuka halaman admin dan hanya melihat login gate.
- [x] Customer yang membuka admin melihat pesan akses admin diperlukan.
- [x] Login admin menampilkan topbar, sidebar, dan konten dashboard.
- [x] Dashboard menampilkan statistik, order terbaru, status order, dan grafik.
- [x] Drawer admin dapat dibuka/ditutup lewat tombol, overlay, Escape, dan navigasi.
- [x] Produk admin dapat ditambah, diedit, di-publish/draft, dan dihapus dengan konfirmasi.
- [x] Pencarian dan filter produk/order bekerja.
- [x] Detail order dapat dibuka dalam modal dan ditutup dengan Escape.
- [x] Reset data demo mengembalikan state ke kondisi awal.
- [x] Logout dari panel kembali ke website publik.

## 6. Responsive

- [x] Tidak ada horizontal overflow halaman pada 1440, 1024, 768, 390, dan 360 px untuk halaman yang diuji.
- [x] Drawer admin dan anggota berfungsi pada 768, 390, dan 360 px.
- [x] Kartu, statistik, form, dan filter menyesuaikan lebar.
- [x] Panel admin dan anggota tetap dapat digunakan pada mobile.
- [x] Tabel lebar memakai scroll container internal tanpa membuat halaman melebar.
- [x] Selector program berubah menjadi grid 2 × 2 pada mobile.

## 7. Aksesibilitas dasar

- [x] Form memiliki label dan pesan error tekstual.
- [x] Tombol utama dapat difokuskan dengan keyboard.
- [x] Modal dapat ditutup dengan Escape.
- [x] Drawer dapat ditutup dengan Escape.
- [x] Skip link tersedia pada setiap halaman.
- [x] Focus state terlihat pada kontrol utama.
- [x] Error tidak hanya dibedakan berdasarkan warna.

## 8. Catatan dan batasan pengujian

- Safari iOS/macOS, Firefox, dan perangkat fisik belum diuji pada putaran ini.
- Tabel admin/order pada viewport sangat kecil dapat memerlukan scroll horizontal di dalam container tabel; halaman utama tidak ikut melebar.
- Lightbox, modal, dan drawer diuji secara fungsional di Chrome; uji perangkat nyata tetap disarankan sebelum handoff final.
- Google Fonts memerlukan koneksi internet; saat offline website tetap dapat digunakan dengan font fallback.
- Pengujian tidak mencakup backend, payment gateway, email, atau keamanan produksi karena memang di luar cakupan POC.
- Beberapa screenshot QA tersimpan di `.qa-shots/` untuk referensi internal. Artefak screenshot baru diabaikan dari Git melalui `.gitignore`.

## 9. Status akhir

| Area | Status |
| --- | --- |
| Struktur dan navigasi | PASS |
| Halaman publik | PASS |
| Autentikasi dan akun | PASS |
| Commerce dan LMS | PASS |
| Admin demo | PASS |
| Responsive 360–1440 px | PASS |
| Error JavaScript alur utama | PASS (0) |
| Uji lintas browser/perangkat | Belum diuji |
