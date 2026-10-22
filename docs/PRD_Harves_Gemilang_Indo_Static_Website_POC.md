# Product Requirements Document (PRD)

# Harves Gemilang Indo --- Website Statis Proof of Concept

**Dokumen:** PRD Website Statis / Frontend Proof of Concept\
**Versi:** 1.0\
**Status:** Draft implementasi\
**Tanggal:** 22 Oktober 2026\
**Tujuan:** Memvalidasi struktur website, visual design, navigasi,
katalog produk digital, dan simulasi pengalaman LMS sebelum pengembangan
backend.

------------------------------------------------------------------------

## 1. Ringkasan

Dokumen ini mendefinisikan versi **website statis** untuk redesign
website Harves Gemilang Indo yang memadukan company profile dan
pengalaman penjualan konten digital/LMS.

Website statis dibuat untuk menunjukkan pengalaman pengguna end-to-end
secara visual dan interaktif. Semua halaman, menu, link, tombol, filter,
tab, modal, form, dan simulasi checkout yang ditampilkan harus berfungsi
secara lokal di browser.

Versi ini **bukan sistem produksi**. Tidak ada autentikasi server
sungguhan, database, pembayaran nyata, penyimpanan file privat, atau
kontrol akses konten yang aman. Perilaku tersebut hanya disimulasikan
menggunakan data mock dan state frontend.

## 2. Tujuan dan Non-Tujuan

### 2.1 Tujuan

-   Menampilkan arah desain baru website perusahaan.
-   Memvalidasi struktur halaman dan navigasi.
-   Memperlihatkan katalog produk digital.
-   Memperlihatkan detail produk dengan tipe dokumen, foto, video, atau
    kursus.
-   Mendemonstrasikan alur login/registrasi, checkout, status
    pembayaran, library, dan viewer materi menggunakan data dummy.
-   Memastikan seluruh tautan dan kontrol UI yang terlihat memberikan
    respons yang masuk akal.
-   Menjadi bahan review stakeholder sebelum implementasi
    Laravel/backend.

### 2.2 Non-Tujuan

-   Tidak memproses pembayaran nyata.
-   Tidak menyimpan data pengguna secara aman atau melakukan autentikasi
    server.
-   Tidak mengamankan file digital dari akses langsung.
-   Tidak menyediakan CMS backend.
-   Tidak mengirim email atau notifikasi sungguhan.
-   Tidak menggunakan database.
-   Tidak memerlukan server API atau backend untuk menjalankan
    demonstrasi.
-   Tidak memerlukan instalasi dependency atau perintah terminal untuk
    penggunaan dasar.

## 3. Target Pengguna Demo

1.  **Guest:** menjelajahi website, membaca profil perusahaan, dan
    melihat katalog.
2.  **Demo Customer:** mencoba login demo, memilih produk,
    mensimulasikan checkout, dan melihat library.
3.  **Demo Admin (opsional):** melihat contoh dashboard serta mock data
    produk/transaksi.
4.  **Stakeholder:** menilai tampilan, copywriting, navigasi, dan
    kelengkapan alur.

## 4. Prinsip dan NFR Wajib

### NFR-1: Simplicity

-   Clean, minimal interface.
-   Easy to understand and use.
-   No complex setup required.
-   No test setup required.

Interpretasi implementasi: - Gunakan struktur HTML yang mudah dipahami
dan komponen CSS yang konsisten. - Pengguna dapat membuka `index.html`
langsung di browser tanpa menjalankan terminal atau server
development. - Hindari build step, package manager, framework yang
memerlukan kompilasi, dan dependency kompleks. - Navigasi utama ringkas
dan label menu jelas. - CTA konsisten dan tidak ada kontrol dekoratif
yang tampak interaktif tetapi tidak berfungsi. - Form memiliki label,
petunjuk, dan pesan validasi. - Demo dapat direview tanpa akun
eksternal, API key, atau konfigurasi environment. - Tidak diperlukan
setup test runner untuk membuka atau mencoba demo. Pemeriksaan manual
tetap dilakukan sebelum diserahkan.

### NFR-2: Performance

-   Fast load time.
-   Responsive UI interactions.
-   No noticeable lag when updating data.

Interpretasi implementasi: - Gunakan HTML, CSS, dan vanilla JavaScript
tanpa framework runtime. - Hindari asset besar dan library yang tidak
diperlukan. - Optimalkan ukuran gambar dan gunakan dimensi gambar yang
sesuai. - Interaksi seperti tab, filter, modal, navigasi, dan perubahan
state terasa langsung. - Gunakan data mock kecil dan render hanya bagian
yang diperlukan. - Hindari animasi berat atau layout shift yang
mengganggu. - Jika memakai gambar eksternal, sediakan fallback yang
layak ketika gambar gagal dimuat. - Target praktis: halaman awal dapat
digunakan dengan cepat pada koneksi broadband biasa; pengukuran final
dilakukan pada perangkat dan koneksi yang disepakati.

### NFR-3: Visual Design

-   User-friendly aesthetic.
-   Clear visual hierarchy.
-   Readable typography.

Interpretasi implementasi: - Desain profesional, modern, bersih, dan
sesuai identitas brand Harves Gemilang Indo. - Gunakan sistem warna,
spacing, radius, bayangan, dan tombol yang konsisten. - Heading,
subheading, body text, label, dan metadata memiliki hirarki jelas. -
Kontras teks dan latar memadai. - Kartu produk memiliki komposisi
konsisten. - Form, tabel, modal, badge status, dan empty state mudah
dipahami. - Layout responsif untuk desktop, tablet, dan mobile. - State
hover, focus, active, disabled, loading, success, dan error ditampilkan
sesuai konteks.

### NFR-4: Navigation & Functional Completeness

-   Semua link internal menuju halaman atau bagian yang benar.
-   Semua tombol menjalankan aksi yang sesuai dengan labelnya.
-   Tidak ada link `#` yang tidak memiliki perilaku yang bermakna.
-   Menu mobile dapat dibuka dan ditutup.
-   Modal dapat ditutup melalui tombol close dan mekanisme yang wajar.
-   Form memiliki validasi frontend.
-   Navigasi antarhalaman tidak menampilkan halaman kosong atau error.
-   State demo tidak boleh disalahartikan sebagai data produksi.

### NFR-5: Compatibility

-   Dibuka melalui browser modern pada desktop dan mobile.
-   Layout dapat menyesuaikan viewport.
-   Penggunaan dasar tidak membutuhkan plugin browser.
-   Fungsi inti tidak bergantung pada hover saja.
-   Navigasi keyboard dasar dan indikator focus tersedia.

### NFR-6: Maintainability

-   Gunakan nama file, class, ID, dan fungsi yang konsisten.
-   Pisahkan struktur HTML, styling CSS, data mock, dan logika
    JavaScript bila memungkinkan.
-   Hindari duplikasi kode yang tidak perlu.
-   Berikan komentar untuk logika simulasi yang tidak langsung jelas.
-   Jangan menambahkan dependency hanya untuk fungsi sederhana.

## 5. Batasan Teknis

### 5.1 Stack yang diwajibkan

-   HTML5.
-   CSS3.
-   Vanilla JavaScript.
-   Data mock berbentuk array/object JavaScript atau file JSON lokal
    jika kompatibel dengan cara membuka demo.
-   Asset gambar lokal atau sumber gambar eksternal yang telah
    ditentukan.

### 5.2 Cara menjalankan

Targetnya adalah **tanpa terminal dan tanpa proses build**. Pengguna
cukup membuka `index.html` melalui browser.

Agar pembukaan langsung dengan `file://` tetap berjalan: - Jangan
mengandalkan `fetch()` untuk membaca file JSON lokal, karena pembatasan
origin browser dapat menghalanginya. - Simpan data mock dalam file
JavaScript yang dimuat melalui tag script biasa, atau gunakan data
inline. - Gunakan navigasi halaman biasa atau mekanisme yang tidak
membutuhkan server routing. - Hindari API backend, OAuth, payment SDK,
dan fitur yang memerlukan server.

### 5.3 Struktur folder yang disarankan

``` text
harves-static-poc/
├── index.html
├── about.html
├── services.html
├── service-detail.html
├── products.html
├── product-detail.html
├── articles.html
├── article-detail.html
├── contact.html
├── login.html
├── register.html
├── forgot-password.html
├── checkout.html
├── payment-result.html
├── account.html
├── my-library.html
├── learning-viewer.html
├── admin-dashboard.html
├── admin-products.html
├── admin-orders.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── mock-data.js
│   │   └── app.js
│   └── images/
└── README.md
```

Nama file boleh disesuaikan selama seluruh route dan link konsisten.
Halaman admin bersifat opsional untuk demo visual, tetapi
direkomendasikan agar stakeholder dapat melihat gambaran sistem lengkap.

## 6. Sitemap dan Halaman yang Harus Dibuat

### 6.1 Public website

#### POC-PAGE-001 --- Homepage (`index.html`)

Bagian yang disarankan: - Header dan navigasi. - Hero section dengan
headline, deskripsi, dan CTA. - Ringkasan perusahaan. -
Layanan/kompetensi utama. - Produk atau kelas unggulan. - Keunggulan
atau value proposition. - Testimoni/partner jika tersedia atau telah
disetujui. - Artikel/insight terbaru. - CTA menuju katalog atau
kontak. - Footer berisi kontak, navigasi, dan kebijakan.

Interaksi: - Logo kembali ke homepage. - Menu membuka halaman terkait. -
CTA katalog menuju katalog. - CTA kontak menuju halaman kontak atau
tautan kontak yang valid. - Kartu produk membuka detail produk. - Kartu
artikel membuka detail artikel.

#### POC-PAGE-002 --- About (`about.html`)

-   Profil perusahaan.
-   Visi dan misi jika konten disediakan.
-   Nilai/keunggulan.
-   Ringkasan pengalaman atau kompetensi.
-   CTA kontak.

#### POC-PAGE-003 --- Services (`services.html`)

-   Daftar layanan.
-   Deskripsi ringkas tiap layanan.
-   Kartu/CTA detail layanan.
-   CTA konsultasi atau kontak.

#### POC-PAGE-004 --- Service Detail (`service-detail.html`)

-   Judul dan deskripsi layanan.
-   Manfaat dan cakupan.
-   Gambar/ilustrasi.
-   CTA kontak.
-   Breadcrumb kembali ke daftar layanan.

#### POC-PAGE-005 --- Product Catalog (`products.html`)

-   Judul dan pengantar katalog.
-   Search input.
-   Filter kategori dan tipe konten.
-   Sorting sederhana, jika ditampilkan.
-   Kartu produk dengan thumbnail, nama, tipe, ringkasan, harga, dan
    CTA.
-   Empty state ketika tidak ada hasil.
-   Tombol reset filter.
-   Pagination atau tombol load more jika jumlah mock data cukup banyak.

Interaksi: - Search memfilter data mock. - Filter kategori/tipe
benar-benar memperbarui daftar. - Reset mengembalikan seluruh daftar. -
Kartu produk menuju detail yang tepat. - CTA beli menuju login atau
checkout demo sesuai state simulasi.

#### POC-PAGE-006 --- Product Detail (`product-detail.html`)

-   Nama produk, kategori, tipe, harga, dan gambar utama.
-   Deskripsi dan manfaat.
-   Apa yang akan didapatkan pembeli.
-   Jenis konten dan informasi akses.
-   Preview materi jika ada.
-   Informasi pembuat/instruktur jika relevan.
-   CTA beli.
-   Produk terkait.
-   Breadcrumb.

Interaksi: - CTA beli meneruskan produk yang dipilih ke alur checkout
demo. - Preview hanya menampilkan konten contoh yang memang ditujukan
untuk publik. - Produk terkait membuka detail produk yang sesuai. - Jika
slug/ID tidak dikenal, tampilkan not-found state yang ramah.

#### POC-PAGE-007 --- Articles (`articles.html`)

-   Daftar artikel mock.
-   Kategori dan tanggal.
-   Pencarian/filter opsional.
-   Kartu menuju detail artikel.

#### POC-PAGE-008 --- Article Detail (`article-detail.html`)

-   Judul, tanggal, kategori, gambar, dan isi artikel mock.
-   Breadcrumb dan tautan kembali ke artikel.
-   Artikel terkait jika tersedia.

#### POC-PAGE-009 --- Contact (`contact.html`)

-   Informasi kontak yang telah disetujui.
-   Form nama, email, subjek, dan pesan.
-   Validasi field wajib dan format email.
-   Setelah submit, tampilkan pesan simulasi bahwa pesan telah dicatat
    pada demo.
-   Jangan mengklaim pesan benar-benar terkirim ke perusahaan.
-   Link telepon, email, atau WhatsApp harus menggunakan tujuan yang
    benar jika data tersedia.

### 6.2 Account dan commerce demo

#### POC-PAGE-010 --- Login (`login.html`)

-   Form email dan password.
-   Validasi field wajib.
-   Tombol tampil/sembunyikan password bila diimplementasikan.
-   Link register dan forgot password.
-   Tombol login demo menggunakan akun mock atau simulasi state.
-   Pesan jelas bahwa autentikasi hanya simulasi.
-   Tidak menyimpan password sungguhan.

#### POC-PAGE-011 --- Register (`register.html`)

-   Form nama, email, password, konfirmasi password.
-   Validasi input dan kecocokan password.
-   Setelah submit, tampilkan sukses simulasi atau arahkan ke login
    demo.
-   Jangan mengirim data ke server.

#### POC-PAGE-012 --- Forgot Password (`forgot-password.html`)

-   Form email.
-   Validasi email.
-   Tampilkan konfirmasi simulasi tanpa mengirim email sungguhan.

#### POC-PAGE-013 --- Checkout (`checkout.html`)

-   Ringkasan produk yang dipilih.
-   Harga, diskon mock jika ada, dan total.
-   Data pembeli demo seperlunya.
-   Pilihan metode pembayaran mock jika diperlukan.
-   Persetujuan syarat transaksi.
-   Tombol konfirmasi pembelian.
-   Validasi sebelum melanjutkan.
-   Label permanen bahwa transaksi ini adalah simulasi.

Interaksi: - Produk pada ringkasan harus sama dengan produk yang
dipilih. - Total dihitung dari data mock, bukan input bebas yang dapat
mengubah harga. - Tombol konfirmasi membuka halaman hasil pembayaran
demo. - Tidak ada transaksi atau charge sungguhan.

#### POC-PAGE-014 --- Payment Result (`payment-result.html`)

-   State sukses, pending, gagal, atau expired yang dapat
    didemonstrasikan.
-   Nomor order mock.
-   Ringkasan status.
-   CTA kembali ke katalog atau membuka library demo.
-   Jelaskan bahwa status tidak berasal dari payment gateway nyata.

#### POC-PAGE-015 --- Account (`account.html`)

-   Ringkasan profil demo.
-   Ringkasan jumlah produk yang dimiliki dan order mock.
-   Link ke My Library dan Order History.
-   Tombol logout demo yang mengubah state simulasi.

#### POC-PAGE-016 --- My Library (`my-library.html`)

-   Daftar produk yang "dimiliki" oleh pengguna demo.
-   Kartu menampilkan thumbnail, tipe, status akses, dan CTA.
-   Filter sederhana berdasarkan tipe jika diperlukan.
-   Empty state jika belum ada produk.
-   CTA membuka viewer yang benar.
-   Akses di sini hanya simulasi frontend dan bukan kontrol akses
    keamanan.

#### POC-PAGE-017 --- Learning Viewer (`learning-viewer.html`)

-   Judul produk/kursus.
-   Sidebar atau daftar materi.
-   Area konten utama.
-   Tampilan contoh untuk video, foto, atau dokumen.
-   Tombol materi sebelumnya/berikutnya jika struktur course mock
    mendukung.
-   Progress bar mock.
-   Tombol tandai selesai atau lanjutkan jika relevan.
-   Kembali ke My Library.
-   State untuk tipe materi yang tidak didukung.

Video dapat menggunakan file contoh lokal atau embed publik yang sah.
Jangan menyematkan materi privat atau berhak cipta tanpa izin.

### 6.3 Admin demo (direkomendasikan)

#### POC-PAGE-018 --- Admin Dashboard (`admin-dashboard.html`)

-   Kartu ringkasan jumlah produk, pengguna, order, dan penjualan mock.
-   Grafik sederhana atau visual ringkasan jika menambah kejelasan.
-   Daftar order terbaru mock.
-   Navigasi ke manajemen produk dan order.
-   Label "Demo Data".

#### POC-PAGE-019 --- Admin Products (`admin-products.html`)

-   Tabel produk mock.
-   Search/filter.
-   Tombol tambah/edit produk membuka modal atau form.
-   Validasi nama, harga, kategori, dan tipe konten.
-   Simpan perubahan hanya ke state/data demo selama sesi.
-   Tombol publish/draft mengubah badge dan tampilan.
-   Tombol hapus meminta konfirmasi dan memperbarui tampilan.
-   Berikan pemberitahuan bahwa data tidak tersimpan ke server dan dapat
    kembali ke kondisi awal setelah reload.

#### POC-PAGE-020 --- Admin Orders (`admin-orders.html`)

-   Tabel order mock.
-   Filter status dan search.
-   Detail order dalam modal/halaman.
-   Badge status pembayaran.
-   Jangan menyediakan tindakan yang memberi kesan refund atau transaksi
    nyata benar-benar diproses.

## 7. Data Mock Minimum

Buat dataset yang cukup realistis agar halaman tidak terlihat kosong.

### 7.1 Products

Setiap produk setidaknya memiliki: - `id` - `slug` - `title` -
`shortDescription` - `description` - `category` - `type` (`document`,
`photo`, `video`, `bundle`, `course`) - `price` - `discountPrice`
(opsional) - `thumbnail` - `previewAvailable` - `accessLabel` - `status`
(`published`, `draft`) - `featured` - `contentItems` atau struktur
lesson bila kursus

Sediakan minimal 6 produk demo dengan kombinasi tipe konten yang
berbeda. Nama dan detail produk harus ditandai sebagai contoh jika belum
disediakan oleh stakeholder.

### 7.2 Articles

Setiap artikel setidaknya memiliki ID, slug, title, excerpt, category,
date, thumbnail, dan body.

Sediakan minimal 3 artikel demo.

### 7.3 Orders

Setiap order demo setidaknya memiliki nomor order, tanggal, nama/email
pembeli mock, daftar item, total, dan status.

Sediakan status sukses, pending, dan gagal agar state UI dapat
diperiksa.

### 7.4 Users

Sediakan satu akun customer demo dan satu admin demo bila diperlukan.
Jangan gunakan data pribadi sungguhan. Kredensial demo, jika disediakan,
harus ditampilkan jelas dan tidak menyerupai kredensial produksi.

## 8. Aturan Interaksi Global

-   Header/footer konsisten di seluruh halaman publik.
-   Link logo menuju homepage.
-   Menu aktif mencerminkan halaman saat ini.
-   Menu mobile dapat dibuka dan ditutup.
-   CTA harus memiliki aksi yang sesuai dengan teks.
-   Semua form memvalidasi field wajib.
-   Tombol submit memberikan feedback sukses/gagal.
-   Modal dapat dibuka, ditutup, dan tidak menutup secara tidak sengaja
    saat konten di dalamnya diklik.
-   Filter dan search mengubah data yang terlihat.
-   Tab mengubah panel aktif.
-   Tombol kembali menggunakan navigasi yang benar atau fallback yang
    jelas.
-   Link eksternal membuka tujuan yang benar dan menggunakan kebijakan
    target yang sesuai.
-   Semua halaman memiliki state not-found atau fallback untuk ID/slug
    yang tidak valid.
-   Jangan meninggalkan tombol dengan `href="#"` tanpa perilaku.
-   Tidak boleh ada error JavaScript yang menghalangi alur utama.
-   Jika menggunakan localStorage untuk menyimpan state demo, jelaskan
    bahwa data hanya bersifat lokal dan dapat dihapus pengguna; hindari
    menyimpan password atau data sensitif.
-   Jangan menjadikan localStorage sebagai simulasi keamanan atau
    autentikasi nyata.

## 9. Visual Design Requirements

### 9.1 Arah visual

-   Profesional dan tepercaya.
-   Modern, bersih, tidak terlalu padat.
-   Berorientasi pada konten dan kemudahan menemukan produk.
-   Menggunakan identitas brand yang disetujui stakeholder.
-   Bila brand guideline belum tersedia, gunakan sistem visual sementara
    yang mudah diganti.

### 9.2 Komponen utama

-   Header desktop dan mobile.
-   Footer.
-   Hero section.
-   CTA button primary/secondary.
-   Product card.
-   Article card.
-   Breadcrumb.
-   Search field dan filter.
-   Form field dan validation message.
-   Price display dan discount label.
-   Status badge.
-   Modal/dialog.
-   Alert/toast.
-   Empty state.
-   Loading state jika ada proses simulasi.
-   Pagination atau load more.
-   Table untuk admin demo.
-   Course navigation dan progress indicator.

### 9.3 Responsive behavior

-   Desktop: navigasi lengkap dan grid beberapa kolom.
-   Tablet: grid dan navigasi menyesuaikan lebar.
-   Mobile: menu ringkas, kartu satu kolom atau dua kolom sesuai ruang,
    form lebar penuh, tombol mudah disentuh.
-   Tidak ada horizontal overflow pada halaman normal.
-   Modal dan tabel admin tetap dapat digunakan pada layar kecil, dengan
    layout adaptif atau scroll terkontrol.

### 9.4 Accessibility dasar

-   Gunakan HTML semantik.
-   Gambar informatif memiliki alt text.
-   Form memiliki label yang terhubung.
-   Semua tombol dapat dijangkau keyboard.
-   Focus state terlihat.
-   Kontras warna memadai.
-   Pesan error tidak hanya dibedakan dengan warna.
-   Heading berurutan secara logis.

## 10. Acceptance Criteria

Website statis dianggap memenuhi PRD jika:

### 10.1 Struktur dan navigasi

-   Semua halaman dalam sitemap yang disepakati tersedia.
-   Header dan footer bekerja konsisten.
-   Setiap link internal menuju tujuan yang benar.
-   Tidak ada halaman kosong, broken link internal, atau navigasi buntu.
-   URL/parameter produk yang tidak dikenal menghasilkan fallback yang
    ramah.

### 10.2 Katalog dan detail produk

-   Minimal enam produk mock tersedia dengan tipe bervariasi.
-   Search/filter mengubah hasil yang terlihat.
-   Reset filter bekerja.
-   Kartu produk membuka detail yang tepat.
-   Detail produk menampilkan harga dan tipe konten dengan benar.
-   CTA beli meneruskan produk yang benar ke checkout demo.

### 10.3 Simulasi commerce dan LMS

-   Login/register/forgot password memvalidasi input dan menunjukkan
    feedback.
-   Checkout menampilkan produk dan total yang benar.
-   Hasil pembayaran demo dapat memperlihatkan state sukses, pending,
    dan gagal.
-   Library menampilkan daftar produk mock yang dimiliki.
-   Viewer menampilkan konten sesuai tipe produk.
-   Navigasi materi dan progress demo bekerja jika disediakan.
-   Tidak ada klaim bahwa pembayaran, email, autentikasi, atau
    penyimpanan benar-benar terjadi.

### 10.4 Admin demo

-   Dashboard menampilkan data mock yang konsisten.
-   Search/filter produk dan order bekerja jika ditampilkan.
-   Modal/form tambah/edit produk dapat dibuka, divalidasi, disimpan ke
    state demo, dan ditutup.
-   Perubahan state tercermin di UI.
-   Tindakan hapus memiliki konfirmasi.
-   Status demo ditandai dengan jelas.

### 10.5 NFR

-   Halaman dapat dibuka dengan membuka `index.html`, tanpa terminal,
    build, atau backend.
-   Tidak diperlukan instalasi test runner untuk mencoba demo.
-   Interaksi umum terasa responsif.
-   Layout tidak mengalami horizontal overflow pada viewport yang diuji.
-   Tipografi mudah dibaca dan hierarki visual konsisten.
-   Tidak ada error JavaScript kritis pada alur utama.
-   Gambar yang gagal dimuat tidak merusak layout.
-   Navigasi keyboard dasar dan focus state tersedia.

## 11. QA Checklist Manual

Tidak perlu menyiapkan test runner untuk menjalankan demo, tetapi
checklist manual berikut wajib dilakukan sebelum handoff.

### 11.1 Smoke test

-   Buka homepage.
-   Klik seluruh menu utama.
-   Buka katalog dan detail produk.
-   Uji login demo dan validasi form.
-   Jalankan checkout demo.
-   Buka hasil pembayaran.
-   Buka My Library dan viewer.
-   Buka semua halaman admin demo jika tersedia.
-   Periksa footer, kontak, dan kebijakan.

### 11.2 Link dan tombol

-   Semua CTA utama berfungsi.
-   Logo kembali ke homepage.
-   Breadcrumb bekerja.
-   Menu mobile bekerja.
-   Modal dapat dibuka dan ditutup.
-   Tombol submit memberi feedback.
-   Tidak ada tombol palsu atau link placeholder yang tidak jelas.

### 11.3 Form dan state

-   Submit form kosong.
-   Masukkan email dengan format salah.
-   Masukkan password yang tidak cocok pada register.
-   Coba produk yang tidak valid.
-   Uji katalog tanpa hasil.
-   Uji library kosong.
-   Uji status order berbeda.
-   Uji error/fallback gambar.

### 11.4 Responsive

Periksa setidaknya pada: - Desktop lebar. - Laptop standar. - Tablet. -
Mobile dengan lebar sekitar 360--390 px.

Periksa menu, grid produk, form, modal, tabel admin, viewer materi, dan
footer.

## 12. Out of Scope dan Peringatan Keamanan

Website statis ini hanya proof of concept. Hal-hal berikut tidak boleh
dipresentasikan sebagai fitur produksi yang benar-benar aman atau
berfungsi:

-   Login dan autentikasi sungguhan.
-   Penyimpanan akun atau transaksi di database.
-   Payment gateway dan pembayaran nyata.
-   Kontrol akses konten berbayar di server.
-   Proteksi file atau video privat.
-   Pengiriman email.
-   CMS dengan persistensi data.
-   Audit log server.
-   Backup dan pemulihan data.
-   Validasi pembayaran dari webhook.

Semua state yang dimanipulasi melalui JavaScript dapat diubah pengguna.
Jangan memasukkan API key, password sungguhan, file berbayar, atau data
pelanggan asli ke dalam demo.

## 13. Handoff Deliverables

Hasil akhir minimum: - Folder website statis yang dapat dibuka melalui
`index.html`. - Semua halaman HTML yang disepakati. - CSS responsif. -
Vanilla JavaScript untuk navigasi dan interaksi. - Data mock. - Asset
gambar yang digunakan atau fallback yang sesuai. - README berisi cara
membuka website, daftar halaman, fitur simulasi, dan batasan demo. -
Ringkasan halaman/fitur yang telah diimplementasikan. - Checklist QA
manual dengan status pass/fail. - Daftar pertanyaan terbuka untuk
stakeholder.

## 14. Definition of Done

POC dinyatakan selesai ketika: - Semua halaman prioritas tersedia. -
Seluruh link dan tombol yang tampak interaktif bekerja. - Katalog,
detail produk, checkout demo, library, dan viewer dapat dicoba dari awal
sampai akhir. - Desain konsisten dan responsif. - NFR Simplicity,
Performance, dan Visual Design terpenuhi berdasarkan pemeriksaan
manual. - Tidak ada error kritis yang memblokir alur utama. - Website
dapat dibuka tanpa terminal, build, atau backend. - Batasan simulasi dan
data dummy dijelaskan dalam README. - Stakeholder dapat melakukan review
tanpa setup khusus.

## 15. Asumsi Konten dan Tindak Lanjut

Konten perusahaan, logo, foto, detail layanan, harga, materi, testimoni,
dan kebijakan harus berasal dari Harves Gemilang Indo atau disetujui
pemiliknya. Bila belum tersedia, gunakan placeholder yang diberi label
jelas dan jangan menampilkan klaim bisnis, testimoni, atau sertifikasi
fiktif seolah-olah nyata.

Sebelum desain final, konfirmasikan: 1. Brand guideline dan aset resmi.
2. Halaman company profile yang wajib dipertahankan. 3. Kategori produk
digital. 4. Contoh produk dan harga. 5. Apakah viewer video perlu
ditampilkan pada POC. 6. Apakah dashboard admin demo termasuk
deliverable. 7. Preferensi warna, tipografi, dan referensi visual. 8.
Apakah checkout demo harus memiliki beberapa status pembayaran yang bisa
dipilih untuk presentasi.

------------------------------------------------------------------------

**Catatan status:** PRD ini dirancang untuk membuat prototype yang dapat
diklik dan ditinjau stakeholder. Implementasi produksi harus mengikuti
PRD website lengkap serta menambahkan backend, database, payment
gateway, kontrol akses, keamanan, dan pengujian integrasi.
