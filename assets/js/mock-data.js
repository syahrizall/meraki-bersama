/* ==========================================================================
   Meraki Bersama — Mock data
   Semua data di file ini adalah fiktif dan hanya untuk keperluan demo.
   ========================================================================== */

window.MB_DATA = {
  site: {
    brand: "Meraki Bersama",
    legal: "PT Harves Gemilang Indo",
    tagline: "Ready to growth fast with Meraki Coaching & Training",
    email: "email@harvesgemilangindo.com",
    instagram: "https://www.instagram.com/merakicoachingandtraining?igsh=a2plcDgwaWNsajdk",
    instagramLabel: "@merakicoachingandtraining",
    vision: "Meraki adalah kata Yunani yang berarti melakukan sesuatu dengan jiwa, kreativitas, dan cinta.",
    mission: "Nama perusahaan kami adalah “Bersama Berbagi Berkat” dimana kami rindu membagikan nilai-nilai positif dan membangun pemimpin-pemimpin sukses melalui pendekatan yang personal dan aplikatif.",
    quote: "Everything rises and falls on leadership",
    quoteTranslation: "Segala sesuatu naik dan turunnya ditentukan oleh kepemimpinan."
  },

  users: [
    {
      id: "u1",
      name: "Rina Demo",
      email: "customer@meraki.demo",
      password: "demo1234",
      role: "customer",
      joined: "2026-01-20"
    },
    {
      id: "u2",
      name: "Admin Demo",
      email: "admin@meraki.demo",
      password: "admin1234",
      role: "admin",
      joined: "2026-01-10"
    }
  ],

  products: [
    {
      id: "p1",
      slug: "maxwell-leadership-foundations",
      title: "Maxwell Leadership Foundations",
      shortDescription: "Kursus 8 modul untuk membangun fondasi kepemimpinan berbasis nilai ala Maxwell Leadership.",
      description:
        "<p>Kepemimpinan bukan soal jabatan, melainkan soal pengaruh. Kursus ini merangkum prinsip inti Maxwell Leadership ke dalam delapan modul yang bisa langsung Anda praktikkan di pekerjaan dan bisnis.</p><p>Dipandu oleh Coach Buhe, Anda akan mempelajari <em>5 Levels of Leadership</em>, cara membangun kepercayaan, dan bagaimana memimpin percakapan yang sulit tanpa merusak hubungan.</p>",
      category: "Leadership",
      type: "course",
      price: 899000,
      discountPrice: 749000,
      thumbnail: "assets/images/product-course.jpg",
      previewAvailable: true,
      accessLabel: "Akses 12 bulan",
      status: "published",
      featured: true,
      author: "Coach Buhe",
      level: "Pemula — Menengah",
      duration: "8 modul · 4 jam 20 menit",
      benefits: [
        "Memahami 5 levels of leadership dan posisi Anda saat ini",
        "Membangun pengaruh tanpa bergantung pada jabatan",
        "Menjalankan percakapan sulit dengan struktur yang sehat",
        "Menyusun rencana pertumbuhan kepemimpinan 30 hari"
      ],
      includes: [
        "8 modul video dan dokumen kerja",
        "Workbook audit kepemimpinan (PDF)",
        "Lembar refleksi 30 hari",
        "Sesi live Q&A bersama Coach Buhe"
      ],
      contentItems: [
        { id: "l1", title: "Selamat datang & peta perjalanan", type: "video", duration: "6 menit", description: "Gambaran kursus, ritme belajar, dan cara memakai workbook." },
        { id: "l2", title: "Everything rises and falls on leadership", type: "video", duration: "18 menit", description: "Mengapa kualitas kepemimpinan menentukan naik-turunnya sebuah tim." },
        { id: "l3", title: "Workbook: Audit Kepemimpinan", type: "document", duration: "12 halaman", description: "Latihan menilai lima area kepemimpinan Anda saat ini." },
        { id: "l4", title: "5 Levels of Leadership", type: "video", duration: "24 menit", description: "Dari position hingga pinnacle — dan jebakan di setiap level." },
        { id: "l5", title: "Membangun pengaruh tanpa jabatan", type: "video", duration: "21 menit", description: "Tiga praktik sederhana yang membangun kepercayaan tim." },
        { id: "l6", title: "Lembar refleksi 30 hari", type: "document", duration: "6 halaman", description: "Rutinitas refleksi harian untuk mengunci kebiasaan baru." },
        { id: "l7", title: "Percakapan sulit yang sehat", type: "video", duration: "26 menit", description: "Kerangka percakapan untuk memberi umpan balik yang jujur." },
        { id: "l8", title: "Live Q&A bersama Coach Buhe", type: "live", duration: "60 menit", description: "Sesi tanya jawab terjadwal. Rekaman tersedia setelah sesi." }
      ],
      preview:
        "<h3>Pratinjau Modul 1</h3><p>Kepemimpinan dimulai dari kesadaran. Sebelum memimpin orang lain, pemimpin perlu memahami pola pikir, kebiasaan, dan dampaknya.</p><p>Di modul pembuka, Anda akan memetakan tiga area yang paling memengaruhi tim Anda saat ini.</p>"
    },
    {
      id: "p2",
      slug: "executive-coaching-playbook",
      title: "Executive Coaching Playbook",
      shortDescription: "Panduan praktis 48 halaman untuk merancang sesi coaching eksekutif yang terstruktur.",
      description:
        "<p>Playbook ini disusun untuk coach, HR, dan pemimpin yang ingin menjalankan percakapan coaching yang terarah — bukan sekadar percakapan motivasi.</p><p>Di dalamnya terdapat kerangka GROW yang disederhanakan, bank pertanyaan, template sesi 60 menit, dan rubrik evaluasi yang bisa langsung dipakai.</p>",
      category: "Coaching",
      type: "document",
      price: 249000,
      discountPrice: null,
      thumbnail: "assets/images/product-ebook.jpg",
      previewAvailable: true,
      accessLabel: "Akses selamanya",
      status: "published",
      featured: true,
      author: "Coach Nancy",
      level: "Semua level",
      duration: "48 halaman",
      benefits: [
        "Menjalankan sesi coaching dengan alur yang jelas",
        "Mengajukan pertanyaan yang membuka cara pandang baru",
        "Menutup sesi dengan komitmen aksi yang terukur",
        "Mengevaluasi kualitas sesi secara konsisten"
      ],
      includes: [
        "E-book 48 halaman (PDF demo)",
        "Template rencana sesi 60 menit",
        "Bank 40 pertanyaan coaching",
        "Rubrik evaluasi sesi"
      ],
      contentItems: [
        { id: "d1", title: "Kerangka GROW versi Meraki", type: "document", duration: "10 halaman", description: "Goal, Reality, Options, Will — dengan contoh percakapan." },
        { id: "d2", title: "Bank pertanyaan coaching", type: "document", duration: "12 halaman", description: "Empat puluh pertanyaan untuk membuka insight." },
        { id: "d3", title: "Template sesi 60 menit", type: "document", duration: "8 halaman", description: "Agenda, catatan, dan komitmen tindak lanjut." },
        { id: "d4", title: "Rubrik evaluasi sesi", type: "document", duration: "18 halaman", description: "Indikator sederhana untuk menjaga kualitas coaching." }
      ],
      preview:
        "<h3>Pratinjau: Kerangka GROW</h3><p>Setiap sesi coaching yang baik punya tujuan yang disepakati. Mulailah dengan pertanyaan: “Apa yang ingin Anda capai dari 60 menit ini?”</p><p>Playbook lengkap memuat contoh percakapan dan catatan facilitator untuk setiap tahap.</p>"
    },
    {
      id: "p3",
      slug: "public-speaking-for-leaders",
      title: "Public Speaking for Leaders",
      shortDescription: "Enam sesi video untuk tampil percaya diri, jelas, dan meyakinkan di depan tim.",
      description:
        "<p>Pemimpin yang efektif harus bisa menyampaikan gagasan dengan jelas. Seri ini membedah struktur pesan, cara membuka presentasi, mengelola gugup, dan menjawab pertanyaan sulit.</p><p>Setiap sesi dilengkapi latihan singkat yang bisa Anda rekam sendiri untuk dievaluasi.</p>",
      category: "Communication",
      type: "video",
      price: 399000,
      discountPrice: 329000,
      thumbnail: "assets/images/product-video.jpg",
      previewAvailable: true,
      accessLabel: "Akses 12 bulan",
      status: "published",
      featured: true,
      author: "Coach Nancy",
      level: "Pemula — Menengah",
      duration: "6 sesi · 2 jam 10 menit",
      benefits: [
        "Menyusun pesan dengan struktur yang mudah diingat",
        "Membuka dan menutup presentasi dengan kuat",
        "Mengelola gugup sebelum tampil",
        "Menjawab pertanyaan sulit dengan tenang"
      ],
      includes: [
        "6 video sesi (total 130 menit)",
        "Lembar kerja struktur pesan",
        "Checklist persiapan presentasi",
        "Contoh rekaman evaluasi"
      ],
      contentItems: [
        { id: "v1", title: "Pesan yang layak didengar", type: "video", duration: "18 menit", description: "Menemukan inti pesan dan satu kalimat yang ingin diingat audiens." },
        { id: "v2", title: "Struktur tiga babak", type: "video", duration: "22 menit", description: "Membuka, membangun, dan menutup dengan jelas." },
        { id: "v3", title: "Mengelola gugup", type: "video", duration: "16 menit", description: "Teknik pernapasan dan persiapan fisik sebelum tampil." },
        { id: "v4", title: "Bahasa tubuh yang mendukung", type: "video", duration: "24 menit", description: "Kontak mata, gestur, dan posisi tubuh di panggung." },
        { id: "v5", title: "Menjawab pertanyaan sulit", type: "video", duration: "20 menit", description: "Kerangka menjawab tanpa defensif." },
        { id: "v6", title: "Latihan & evaluasi", type: "video", duration: "30 menit", description: "Studi kasus dan lembar evaluasi rekaman." }
      ],
      preview:
        "<h3>Pratinjau Sesi 1</h3><p>Presentasi yang kuat dimulai dari satu pesan yang jelas. Sebelum menyusun slide, tuliskan kalimat yang ingin diingat audiens setelah Anda selesai.</p>"
    },
    {
      id: "p4",
      slug: "leadership-event-documentation-pack",
      title: "Leadership Event Documentation Pack",
      shortDescription: "Kumpulan foto dokumentasi seminar dan coaching untuk kebutuhan presentasi internal.",
      description:
        "<p>Paket dokumentasi visual dari sesi Executive Leadership Seminar dan Antam Mentorship Program. Cocok untuk materi presentasi internal, laporan program, dan konten komunikasi perusahaan.</p><p>Semua foto dalam paket demo ini berasal dari dokumentasi publik Meraki Bersama dan dipakai sebagai contoh pada demo statis.</p>",
      category: "Branding",
      type: "photo",
      price: 149000,
      discountPrice: null,
      thumbnail: "assets/images/event-seminar-1.jpg",
      previewAvailable: true,
      accessLabel: "Lisensi demo internal",
      status: "published",
      featured: false,
      author: "Meraki Team",
      level: "Semua level",
      duration: "12 foto · 3 galeri",
      benefits: [
        "Foto resolusi tinggi untuk presentasi internal",
        "Ruang lingkup penggunaan yang jelas",
        "Kredit dokumentasi disertakan"
      ],
      includes: [
        "12 foto dokumentasi",
        "3 galeri tematik",
        "Panduan penggunaan singkat"
      ],
      contentItems: [
        {
          id: "f1",
          title: "Executive Leadership Seminar",
          type: "photo",
          duration: "4 foto",
          description: "Dokumentasi sesi seminar eksekutif.",
          images: [
            "assets/images/event-seminar-1.jpg",
            "assets/images/event-seminar-2.jpg",
            "assets/images/event-antam-1.jpg",
            "assets/images/event-antam-2.jpg"
          ]
        },
        {
          id: "f2",
          title: "Antam Mentorship Program",
          type: "photo",
          duration: "4 foto",
          description: "Sesi mentoring di lingkungan korporat.",
          images: [
            "assets/images/event-antam-2.jpg",
            "assets/images/event-antam-1.jpg",
            "assets/images/event-seminar-2.jpg",
            "assets/images/event-seminar-1.jpg"
          ]
        },
        {
          id: "f3",
          title: "Community & Launch Event",
          type: "photo",
          duration: "4 foto",
          description: "Momen komunitas dan peluncuran program.",
          images: [
            "assets/images/event-seminar-2.jpg",
            "assets/images/event-seminar-1.jpg",
            "assets/images/event-antam-2.jpg",
            "assets/images/event-antam-1.jpg"
          ]
        }
      ],
      preview:
        "<h3>Pratinjau Paket</h3><p>Galeri berisi dokumentasi seminar, sesi mentoring korporat, dan momen komunitas. Setiap foto disertai kredit dokumentasi.</p>"
    },
    {
      id: "p5",
      slug: "corporate-mentorship-bundle",
      title: "Corporate Mentorship Bundle",
      shortDescription: "Gabungan kursus, e-book, dan satu sesi grup untuk tim yang sedang bertumbuh.",
      description:
        "<p>Paket ini dirancang untuk perusahaan yang ingin membangun pipeline kepemimpinan tanpa program yang terlalu berat. Tim Anda mendapat fondasi mandiri, lalu dipertemukan dalam satu sesi grup bersama Coach Buhe.</p><p>Cocok untuk HR, L&D, dan tim lintas fungsi yang sedang menyiapkan calon pemimpin.</p>",
      category: "Corporate",
      type: "bundle",
      price: 1899000,
      discountPrice: 1499000,
      thumbnail: "assets/images/product-bundle.jpg",
      previewAvailable: true,
      accessLabel: "Akses 12 bulan · maks. 10 peserta",
      status: "published",
      featured: true,
      author: "Coach Buhe",
      level: "Menengah",
      duration: "Kursus + e-book + 1 sesi grup",
      benefits: [
        "Fondasi kepemimpinan yang seragam untuk tim",
        "Pendampingan langsung dalam satu sesi grup",
        "Materi mandiri yang bisa dipelajari ulang",
        "Laporan refleksi tim untuk HR"
      ],
      includes: [
        "Akses Maxwell Leadership Foundations untuk 10 peserta",
        "Executive Coaching Playbook",
        "Sesi grup 120 menit bersama Coach Buhe",
        "Ringkasan refleksi tim"
      ],
      contentItems: [
        { id: "b1", title: "Fondasi kepemimpinan berbasis nilai", type: "video", duration: "42 menit", description: "Rekaman modul inti untuk seluruh peserta." },
        { id: "b2", title: "Workbook tim: Audit kepemimpinan", type: "document", duration: "14 halaman", description: "Latihan bersama untuk memetakan kekuatan tim." },
        { id: "b3", title: "Panduan sesi grup", type: "document", duration: "8 halaman", description: "Agenda dan pertanyaan pemandu sesi grup." },
        { id: "b4", title: "Sesi grup bersama Coach Buhe", type: "live", duration: "120 menit", description: "Sesi terjadwal untuk membahas hasil refleksi tim." }
      ],
      preview:
        "<h3>Pratinjau Paket Korporat</h3><p>Paket mencakup akses kursus untuk sepuluh peserta, workbook tim, dan satu sesi grup. Jadwal sesi grup dikoordinasikan setelah pembelian demo.</p>"
    },
    {
      id: "p6",
      slug: "one-on-one-mentorship",
      title: "1-on-1 Mentorship Eksklusif",
      shortDescription: "Enam sesi pendampingan personal bersama Coach Buhe dan Coach Nancy.",
      description:
        "<p>Program pendampingan personal untuk pemimpin yang menghadapi keputusan besar, transisi peran, atau tantangan tim yang spesifik. Setiap sesi disusun berdasarkan tujuan yang Anda bawa.</p><p>Kuota program dibatasi agar setiap peserta mendapat perhatian penuh.</p>",
      category: "Mentorship",
      type: "course",
      price: 3500000,
      discountPrice: null,
      thumbnail: "assets/images/product-mentorship.jpg",
      previewAvailable: false,
      accessLabel: "6 sesi · 90 menit / sesi",
      status: "published",
      featured: false,
      author: "Coach Buhe & Coach Nancy",
      level: "Senior leader",
      duration: "6 sesi · 9 jam",
      benefits: [
        "Rencana pengembangan kepemimpinan yang personal",
        "Ruang aman untuk menguji keputusan besar",
        "Umpan balik langsung dari praktisi",
        "Komitmen aksi di setiap sesi"
      ],
      includes: [
        "6 sesi 1-on-1 (90 menit)",
        "Asesmen awal kepemimpinan",
        "Ringkasan komitmen setiap sesi",
        "Akses materi pendukung"
      ],
      contentItems: [
        { id: "m1", title: "Asesmen awal & penetapan tujuan", type: "document", duration: "30 menit", description: "Kuesioner persiapan sebelum sesi pertama." },
        { id: "m2", title: "Sesi 1 — Peta kepemimpinan Anda", type: "live", duration: "90 menit", description: "Menetapkan fokus dan baseline kepemimpinan." },
        { id: "m3", title: "Sesi 2 — Keputusan & prioritas", type: "live", duration: "90 menit", description: "Menguji keputusan besar dengan kerangka yang jelas." },
        { id: "m4", title: "Sesi 3 — Memimpin percakapan sulit", type: "live", duration: "90 menit", description: "Latihan percakapan dengan umpan balik langsung." },
        { id: "m5", title: "Sesi 4 — Membangun tim yang mandiri", type: "live", duration: "90 menit", description: "Delegasi, kepercayaan, dan akuntabilitas." },
        { id: "m6", title: "Sesi 5 — Rencana 90 hari", type: "document", duration: "12 halaman", description: "Template rencana aksi pasca-program." },
        { id: "m7", title: "Sesi 6 — Review & penutupan", type: "live", duration: "90 menit", description: "Evaluasi perkembangan dan rencana lanjutan." }
      ],
      preview: null
    },
    {
      id: "p7",
      slug: "team-alignment-toolkit",
      title: "Team Alignment Toolkit",
      shortDescription: "Dua belas template untuk menyelaraskan tujuan, peran, dan ritme kerja tim.",
      description:
        "<p>Toolkit praktis untuk memandu rapat penyelarasan tim tanpa berlarut-larut. Berisi template tujuan, matriks peran, agenda retrospektif, dan ritme komunikasi.</p><p>Dipakai bersama, template ini membantu tim berhenti bekerja pada prioritas yang berbeda.</p>",
      category: "Corporate",
      type: "document",
      price: 199000,
      discountPrice: null,
      thumbnail: "assets/images/product-toolkit.jpg",
      previewAvailable: true,
      accessLabel: "Akses selamanya",
      status: "published",
      featured: false,
      author: "Meraki Team",
      level: "Semua level",
      duration: "12 template",
      benefits: [
        "Menyamakan prioritas tanpa rapat panjang",
        "Memperjelas peran dan kepemilikan tugas",
        "Membangun ritme komunikasi yang sehat"
      ],
      includes: [
        "12 template siap pakai",
        "Panduan fasilitasi 45 menit",
        "Contoh hasil pengisian"
      ],
      contentItems: [
        { id: "t1", title: "Template tujuan & prioritas", type: "document", duration: "6 halaman", description: "Satu halaman untuk menyepakati tiga prioritas utama." },
        { id: "t2", title: "Matriks peran & kepemilikan", type: "document", duration: "4 halaman", description: "RACI ringkas untuk tim kecil." },
        { id: "t3", title: "Agenda retrospektif 45 menit", type: "document", duration: "3 halaman", description: "Format retrospektif yang tidak melebar." }
      ],
      preview:
        "<h3>Pratinjau Template Prioritas</h3><p>Tuliskan tiga prioritas tim untuk kuartal ini, lalu tandai satu keputusan yang harus dihentikan agar prioritas tersebut tercapai.</p>"
    },
    {
      id: "p8",
      slug: "leadership-insight-series",
      title: "Leadership Insight Video Series",
      shortDescription: "Delapan video pendek berisi insight praktis untuk pemimpin sibuk.",
      description:
        "<p>Seri video pendek yang membahas situasi nyata di tempat kerja: memberi umpan balik, memimpin perubahan, dan menjaga energi tim.</p><p>Status produk ini masih <strong>draft</strong> di data demo untuk memperlihatkan perbedaan status publikasi di admin.</p>",
      category: "Leadership",
      type: "video",
      price: 299000,
      discountPrice: 249000,
      thumbnail: "assets/images/product-insight.jpg",
      previewAvailable: false,
      accessLabel: "Akses 12 bulan",
      status: "draft",
      featured: false,
      author: "Coach Buhe",
      level: "Semua level",
      duration: "8 video · 96 menit",
      benefits: [
        "Insight singkat yang langsung bisa dipakai",
        "Studi kasus dari lingkungan kerja nyata"
      ],
      includes: ["8 video pendek", "Ringkasan satu halaman"],
      contentItems: [
        { id: "i1", title: "Umpan balik yang membangun", type: "video", duration: "12 menit", description: "Kerangka memberi umpan balik tanpa membuat orang defensif." },
        { id: "i2", title: "Memimpin perubahan", type: "video", duration: "14 menit", description: "Tiga percakapan yang perlu dilakukan di awal perubahan." }
      ],
      preview: null
    }
  ],

  articles: [
    {
      id: "a1",
      slug: "the-launch-of-meraki",
      title: "The Launch of Meraki",
      excerpt: "Mengapa kami memilih nama Meraki, dan apa yang ingin kami bangun bersama para pemimpin Indonesia.",
      category: "Berita",
      date: "2026-01-15",
      thumbnail: "assets/images/article-launch.jpg",
      body:
        "<p>Meraki adalah kata Yunani yang berarti melakukan sesuatu dengan jiwa, kreativitas, dan cinta. Nama itu menjadi pengingat sederhana bagi kami: pekerjaan membangun pemimpin tidak bisa dilakukan secara setengah hati.</p><h2>Berawal dari satu percakapan</h2><p>Meraki Bersama lahir dari keyakinan bahwa banyak pemimpin baik tidak pernah mendapat ruang untuk bertanya, berefleksi, dan berlatih. Mereka diminta memimpin sejak hari pertama, sering tanpa pendampingan yang memadai.</p><p>Kami ingin mengubah itu. Bukan dengan menambah teori, tetapi dengan mendampingi pemimpin menerapkan apa yang mereka pelajari di pekerjaan nyata.</p><blockquote>“Everything rises and falls on leadership.” — John C. Maxwell</blockquote><h2>Apa yang kami bawa</h2><p>Melalui Maxwell Leadership, kami membawa kerangka kepemimpinan berbasis nilai yang sudah dipakai di banyak negara. Melalui pengalaman sebagai praktisi bisnis, kami memastikan kerangka itu tetap membumi.</p><p>Peluncuran ini adalah awal. Kami mengundang pemimpin, tim HR, dan organisasi yang ingin bertumbuh bersama untuk memulai percakapan.</p>"
    },
    {
      id: "a2",
      slug: "principle-of-growth",
      title: "Principle of Growth",
      excerpt: "Pertumbuhan tidak terjadi karena kebetulan. Ia lahir dari kebiasaan kecil yang diulang dengan sengaja.",
      category: "Leadership",
      date: "2026-02-10",
      thumbnail: "assets/images/article-growth.jpg",
      body:
        "<p>Banyak pemimpin ingin melompat ke level berikutnya, tetapi enggan melakukan hal-hal kecil yang membuat lompatan itu mungkin. Pertumbuhan jarang datang dari satu momen besar; ia biasanya datang dari kebiasaan yang diulang.</p><h2>Mulai dari satu area</h2><p>Pilih satu area yang paling menghambat Anda saat ini. Bisa jadi kemampuan memberi umpan balik, mengelola waktu, atau membangun kepercayaan tim. Fokuskan perhatian di sana selama 30 hari.</p><p>Pertumbuhan yang terukur lebih meyakinkan daripada perubahan yang ambisius tetapi tidak konsisten.</p><blockquote>Pemimpin yang bertumbuh tidak selalu yang paling cepat, tetapi yang paling konsisten.</blockquote><h2>Tiga kebiasaan yang berdampak</h2><ul><li>Menyisihkan 15 menit setiap hari untuk refleksi tertulis.</li><li>Meminta satu umpan balik spesifik setiap minggu.</li><li>Menutup setiap percakapan dengan komitmen aksi yang jelas.</li></ul><p>Kebiasaan ini sederhana, tetapi membutuhkan keberanian untuk dijalankan secara konsisten.</p>"
    },
    {
      id: "a3",
      slug: "mentoring-session",
      title: "Mentoring Session",
      excerpt: "Apa yang sebenarnya terjadi dalam sesi mentoring, dan mengapa ruang aman begitu penting.",
      category: "Coaching",
      date: "2026-03-05",
      thumbnail: "assets/images/article-mentoring.jpg",
      body:
        "<p>Sesi mentoring yang baik bukan ceramah. Ia adalah percakapan terstruktur di mana peserta merasa cukup aman untuk jujur tentang tantangan yang mereka hadapi.</p><h2>Ruang aman, bukan ruang nyaman</h2><p>Ruang aman bukan berarti tidak ada ketegangan. Justru di ruang yang aman, pertanyaan sulit bisa diajukan tanpa membuat orang merasa dihakimi.</p><p>Dalam program mentoring korporat, kami sering menemukan bahwa hambatan terbesar bukan kurangnya pengetahuan, melainkan ketidakjelasan prioritas dan ketakutan mengambil keputusan.</p><blockquote>Mentoring membantu orang melihat apa yang sudah mereka ketahui, tetapi belum berani lakukan.</blockquote><h2>Struktur yang membantu</h2><p>Kami menggunakan alur sederhana: konteks, tujuan sesi, eksplorasi, komitmen aksi. Alur ini menjaga percakapan tetap hangat sekaligus terarah.</p><p>Di akhir setiap sesi, peserta menuliskan satu tindakan yang akan dilakukan sebelum pertemuan berikutnya. Akuntabilitas kecil ini sering menjadi pembeda terbesar.</p>"
    },
    {
      id: "a4",
      slug: "leadership-importance",
      title: "Leadership Importance",
      excerpt: "Mengapa kualitas kepemimpinan menentukan hampir semua hal di dalam organisasi.",
      category: "Insight",
      date: "2026-04-12",
      thumbnail: "assets/images/article-leadership.jpg",
      body:
        "<p>Ketika sebuah tim berkinerja buruk, mudah untuk menyalahkan orangnya. Lebih sulit, tetapi sering lebih akurat, untuk melihat kualitas kepemimpinan di sekitarnya.</p><h2>Pemimpin menentukan iklim</h2><p>Tim belajar dari apa yang ditoleransi dan apa yang dirayakan. Jika pemimpin membiarkan perilaku tidak sehat, tim akan menganggapnya normal. Jika pemimpin menghargai kejujuran, tim akan lebih berani berbicara.</p><p>Itulah sebabnya kepemimpinan bukan hanya soal strategi, tetapi juga soal contoh sehari-hari.</p><blockquote>“Leadership is influence, nothing more, nothing less.” — John C. Maxwell</blockquote><h2>Mulai dari diri sendiri</h2><p>Sebelum mengubah tim, pemimpin perlu jujur tentang pola pikirnya sendiri. Apa yang membuatnya bereaksi berlebihan? Apa yang ia hindari? Pertanyaan-pertanyaan ini tidak nyaman, tetapi menjadi pintu masuk pertumbuhan.</p><p>Kabar baiknya, kepemimpinan bisa dipelajari. Ia bukan bawaan sejak lahir, melainkan kumpulan kebiasaan yang bisa dilatih.</p>"
    },
    {
      id: "a5",
      slug: "membangun-budaya-coaching",
      title: "Membangun Budaya Coaching di Perusahaan",
      excerpt: "Coaching bukan hanya tugas HR. Ia perlu menjadi cara tim berbicara satu sama lain.",
      category: "Corporate",
      date: "2026-05-20",
      thumbnail: "assets/images/article-culture.jpg",
      body:
        "<p>Banyak perusahaan mengirim manajernya ke pelatihan coaching, lalu berharap budayanya berubah. Yang sering terjadi: keterampilan baru dipakai sekali, lalu kembali ke pola lama karena sistemnya tidak mendukung.</p><h2>Tiga syarat budaya coaching</h2><p>Pertama, pemimpin senior harus menjadi contoh. Kedua, percakapan coaching harus punya ruang rutin, bukan hanya saat ada masalah. Ketiga, keberhasilan coaching diukur dari perilaku, bukan hanya dari kepuasan peserta pelatihan.</p><ul><li>Jadwalkan percakapan 1-on-1 yang terlindungi.</li><li>Latih manajer mengajukan pertanyaan sebelum memberi solusi.</li><li>Rayakan tim yang berani mengambil keputusan sendiri.</li></ul><blockquote>Budaya coaching tumbuh ketika bertanya lebih dihargai daripada cepat menjawab.</blockquote><h2>Peran HR</h2><p>HR tidak harus menjadi coach untuk semua orang. Peran yang lebih tepat adalah membangun sistem, menyediakan ruang latihan, dan menjaga konsistensi ritme percakapan di seluruh organisasi.</p>"
    },
    {
      id: "a6",
      slug: "everything-rises-and-falls-on-leadership",
      title: "Everything Rises and Falls on Leadership",
      excerpt: "Refleksi atas satu kalimat yang menjadi fondasi banyak program kepemimpinan.",
      category: "Leadership",
      date: "2026-06-08",
      thumbnail: "assets/images/article-trust.jpg",
      body:
        "<p>Kalimat itu terdengar sederhana, bahkan terlalu sederhana. Namun semakin lama dipraktikkan, semakin terasa kebenarannya: kualitas kepemimpinan memengaruhi kualitas hampir segala hal di sekitarnya.</p><h2>Bukan berarti menyalahkan pemimpin</h2><p>Kalimat ini bukan alat untuk menyalahkan satu orang ketika organisasi gagal. Ia adalah pengingat bahwa kepemimpinan adalah tanggung jawab yang perlu ditopang, dilatih, dan dievaluasi.</p><p>Pemimpin yang baik pun butuh lingkungan yang mendukung, umpan balik yang jujur, dan ruang untuk belajar dari kesalahan.</p><blockquote>Kepemimpinan bukan posisi yang Anda duduki, tetapi dampak yang Anda tinggalkan.</blockquote><h2>Praktik mingguan</h2><p>Coba lakukan satu hal ini setiap Jumat: tanyakan kepada satu anggota tim, “Apa yang bisa saya lakukan dengan lebih baik minggu depan?” Dengarkan tanpa membela diri.</p><p>Pertanyaan kecil ini, dilakukan konsisten, bisa mengubah kualitas hubungan dan kinerja tim secara perlahan.</p>"
    }
  ],

  services: [
    {
      id: "s1",
      slug: "public-leadership-classes",
      title: "Public Leadership Classes",
      shortDescription: "Kelas terbuka untuk individu yang ingin membangun fondasi kepemimpinan berbasis nilai.",
      description:
        "<p>Kelas terbuka dengan suasana belajar yang hangat dan praktis. Peserta berasal dari berbagai industri, sehingga percakapan menjadi lebih kaya.</p><p>Materi disusun dari kerangka Maxwell Leadership dan disesuaikan dengan konteks kerja di Indonesia.</p>",
      image: "assets/images/event-seminar-1.jpg",
      format: "2 hari · kelas terbuka · Jakarta & online",
      forWho: ["Profesional yang baru masuk peran kepemimpinan", "Manajer yang ingin memperkuat pengaruh", "Pemilik bisnis yang memimpin tim kecil"],
      benefits: [
        "Memahami fondasi kepemimpinan berbasis nilai",
        "Berlatih percakapan kepemimpinan melalui studi kasus",
        "Membangun jaringan dengan pemimpin dari industri lain",
        "Menyusun rencana aksi 30 hari"
      ],
      scope: [
        "5 Levels of Leadership",
        "Membangun kepercayaan dan pengaruh",
        "Komunikasi yang jelas dan empatik",
        "Percakapan sulit dan umpan balik",
        "Perencanaan pertumbuhan pribadi"
      ],
      cta: "Lihat jadwal kelas"
    },
    {
      id: "s2",
      slug: "corporate-mentorship",
      title: "Corporate Leadership Mentorship",
      shortDescription: "Pendampingan in-house untuk calon pemimpin di perusahaan, dipandu Coach Buhe.",
      description:
        "<p>Program mentoring yang dirancang bersama HR dan pimpinan perusahaan. Fokusnya bukan sekadar transfer pengetahuan, tetapi pendampingan penerapan di pekerjaan nyata.</p><p>Coach Buhe membawa pengalaman sebagai praktisi bisnis sejak 1981 dan sertifikasi Maxwell Leadership.</p>",
      image: "assets/images/event-antam-1.jpg",
      format: "In-house · 6–12 sesi · grup kecil",
      forWho: ["HR dan Learning & Development", "Mid–senior management", "Startup dan perusahaan yang sedang bertumbuh"],
      benefits: [
        "Pipeline kepemimpinan yang lebih siap",
        "Penerapan langsung di tantangan bisnis nyata",
        "Ruang refleksi yang aman bagi calon pemimpin",
        "Laporan perkembangan program untuk HR"
      ],
      scope: [
        "Asesmen kebutuhan kepemimpinan",
        "Desain kurikulum bersama HR",
        "Sesi grup dan sesi individual",
        "Pendampingan implementasi",
        "Evaluasi dan rekomendasi lanjutan"
      ],
      cta: "Diskusikan program"
    },
    {
      id: "s3",
      slug: "corporate-coaching",
      title: "Corporate Coaching",
      shortDescription: "Executive dan business coaching untuk pemimpin dan tim yang ingin bergerak lebih cepat.",
      description:
        "<p>Coaching untuk pemimpin yang menghadapi keputusan penting, transisi peran, atau dinamika tim yang kompleks. Dipandu Coach Nancy, Executive & Business Coach dengan sertifikasi NFNLP & ENCO.</p><p>Setiap engagement dimulai dengan tujuan yang jelas dan diakhiri dengan rencana aksi yang terukur.</p>",
      image: "assets/images/event-seminar-2.jpg",
      format: "1-on-1 atau tim · 60–90 menit / sesi",
      forWho: ["Founder dan C-level", "Head of Department", "Tim leadership yang sedang bertransisi"],
      benefits: [
        "Kejelasan arah dan prioritas",
        "Peningkatan kualitas pengambilan keputusan",
        "Komunikasi strategis yang lebih efektif",
        "Akuntabilitas pada komitmen aksi"
      ],
      scope: [
        "Executive coaching 1-on-1",
        "Business coaching untuk founder",
        "Team coaching dan alignmment",
        "Leadership communication",
        "Review dan evaluasi progres"
      ],
      cta: "Jadwalkan konsultasi"
    },
    {
      id: "s4",
      slug: "one-on-one-mentorship-eksklusif",
      title: "1-on-1 Mentorship Eksklusif",
      shortDescription: "Enam sesi pendampingan personal untuk pemimpin dengan tantangan spesifik.",
      description:
        "<p>Program paling personal di Meraki. Dirancang untuk pemimpin yang membutuhkan ruang diskusi rahasia, umpan balik langsung, dan rencana pengembangan yang spesifik.</p><p>Kuota peserta dibatasi setiap kuartal agar kualitas pendampingan tetap terjaga.</p>",
      image: "assets/images/product-mentorship.jpg",
      format: "6 sesi · 90 menit / sesi · online atau tatap muka",
      forWho: ["Senior leader", "Founder yang sedang scale-up", "Eksekutif yang baru mengambil peran baru"],
      benefits: [
        "Rencana pengembangan kepemimpinan personal",
        "Ruang aman untuk menguji keputusan besar",
        "Umpan balik langsung dari praktisi",
        "Komitmen aksi yang terukur"
      ],
      scope: [
        "Asesmen awal kepemimpinan",
        "Enam sesi pendampingan",
        "Ringkasan komitmen setiap sesi",
        "Rencana aksi 90 hari",
        "Akses materi pendukung"
      ],
      cta: "Ajukan konsultasi"
    }
  ],

  orders: [
    {
      id: "MB-2026-0101",
      date: "2026-09-14T10:24:00",
      customer: { name: "Rina Demo", email: "customer@meraki.demo" },
      items: [
        { productId: "p1", price: 749000 },
        { productId: "p2", price: 249000 }
      ],
      total: 998000,
      status: "success",
      paymentMethod: "Transfer Bank (Demo)"
    },
    {
      id: "MB-2026-0102",
      date: "2026-10-02T14:10:00",
      customer: { name: "Rina Demo", email: "customer@meraki.demo" },
      items: [{ productId: "p5", price: 1499000 }],
      total: 1499000,
      status: "pending",
      paymentMethod: "QRIS (Demo)"
    },
    {
      id: "MB-2026-0103",
      date: "2026-10-05T09:42:00",
      customer: { name: "Rina Demo", email: "customer@meraki.demo" },
      items: [{ productId: "p3", price: 329000 }],
      total: 329000,
      status: "failed",
      paymentMethod: "E-Wallet (Demo)"
    },
    {
      id: "MB-2026-0104",
      date: "2026-10-09T16:05:00",
      customer: { name: "Rina Demo", email: "customer@meraki.demo" },
      items: [{ productId: "p4", price: 149000 }],
      total: 149000,
      status: "success",
      paymentMethod: "Transfer Bank (Demo)"
    },
    {
      id: "MB-2026-0105",
      date: "2026-10-12T11:30:00",
      customer: { name: "Rina Demo", email: "customer@meraki.demo" },
      items: [{ productId: "p7", price: 199000 }],
      total: 199000,
      status: "expired",
      paymentMethod: "QRIS (Demo)"
    },
    {
      id: "MB-2026-0106",
      date: "2026-10-15T13:18:00",
      customer: { name: "Budi Santoso", email: "budi.demo@example.com" },
      items: [{ productId: "p3", price: 329000 }],
      total: 329000,
      status: "success",
      paymentMethod: "Transfer Bank (Demo)"
    },
    {
      id: "MB-2026-0107",
      date: "2026-10-18T08:55:00",
      customer: { name: "Sari Wulandari", email: "sari.demo@example.com" },
      items: [{ productId: "p1", price: 749000 }],
      total: 749000,
      status: "pending",
      paymentMethod: "E-Wallet (Demo)"
    }
  ],

  typeLabels: {
    document: "Dokumen",
    photo: "Foto",
    video: "Video",
    bundle: "Bundle",
    course: "Kursus"
  },

  statusLabels: {
    success: "Sukses",
    pending: "Pending",
    failed: "Gagal",
    expired: "Expired",
    published: "Published",
    draft: "Draft"
  },

  orderStatuses: ["success", "pending", "failed", "expired"],

  paymentMethods: [
    { id: "transfer", label: "Transfer Bank", note: "Simulasi transfer ke rekening demo" },
    { id: "qris", label: "QRIS", note: "Simulasi pemindaian kode QR" },
    { id: "ewallet", label: "E-Wallet", note: "Simulasi pembayaran dompet digital" }
  ]
};
