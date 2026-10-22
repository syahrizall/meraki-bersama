/* ==========================================================================
   Meraki Bersama — My Library & Learning Viewer
   ========================================================================== */
(function () {
  "use strict";

  const MB = window.MB;

  function authGate(message, next) {
    const target = next || "my-library.html";
    return '<div class="empty-state">' +
      '<span class="empty-icon">' + MB.icon("lock", 26) + "</span>" +
      "<h3>Masuk ke akun demo</h3>" +
      "<p>" + MB.esc(message) + "</p>" +
      '<div class="cluster" style="justify-content:center">' +
        '<a class="btn btn-primary" href="login.html?next=' + encodeURIComponent(target) + '">Masuk</a>' +
        '<button class="btn btn-outline" type="button" data-demo-login="customer">Masuk sebagai Demo Customer</button>' +
      "</div>" +
      '<p class="field-hint">customer@meraki.demo · demo1234</p>' +
    "</div>";
  }

  /* ---------------------------------------------------------------
     My Library
     --------------------------------------------------------------- */
  let libraryFilter = "all";

  MB.registerPage("my-library", function () {
    const root = MB.qs("#library-root");
    if (!root) return;
    const user = MB.currentUser();

    if (!user) {
      root.innerHTML = authGate("My Library berisi produk demo yang sudah Anda miliki. Masuk untuk melihat akses dan progres belajar.");
      return;
    }

    const owned = MB.ownedProducts(user.email);
    const types = Array.from(new Set(owned.map(function (product) { return product.type; })));

    function render() {
      const items = owned.filter(function (product) {
        return libraryFilter === "all" || product.type === libraryFilter;
      });

      const cards = items.map(function (product) {
        const progress = MB.progressFor(user.email, product.slug);
        const stat = MB.completion(product, progress);
        const label = stat.percent === 100 ? "Ulangi materi" : stat.done ? "Lanjutkan" : "Mulai belajar";
        return '<article class="library-card">' +
          '<div class="library-media">' +
            '<img src="' + MB.esc(product.thumbnail) + '" alt="' + MB.esc(product.title) + '" loading="lazy" data-fallback="' + MB.esc(product.category) + '">' +
            '<span class="badge badge--' + MB.esc(product.type) + ' product-type">' + MB.esc(MB.typeLabel(product.type)) + "</span>" +
          "</div>" +
          '<div class="library-body">' +
            "<h3>" + MB.esc(product.title) + "</h3>" +
            '<div class="library-meta"><span>' + MB.esc(product.accessLabel) + '</span><span class="dot"></span><span>' + MB.esc(product.duration) + "</span></div>" +
            '<div class="progress-label mt-2"><span>Progress demo</span><strong>' + stat.percent + "%</strong></div>" +
            '<div class="progress"><div class="progress-bar" style="width:' + stat.percent + '%"></div></div>' +
            '<div class="library-foot">' +
              '<span class="badge badge--success">Akses aktif</span>' +
              '<a class="btn btn-primary btn-sm" href="learning-viewer.html?product=' + encodeURIComponent(product.slug) + '">' + label + "</a>" +
            "</div>" +
          "</div>" +
        "</article>";
      }).join("");

      const chips = '<div class="filter-chips mb-3">' +
        '<button class="chip' + (libraryFilter === "all" ? " is-active" : "") + '" type="button" data-lib-filter="all">Semua (' + owned.length + ")</button>" +
        types.map(function (type) {
          const count = owned.filter(function (product) { return product.type === type; }).length;
          return '<button class="chip' + (libraryFilter === type ? " is-active" : "") + '" type="button" data-lib-filter="' + MB.esc(type) + '">' +
            MB.esc(MB.typeLabel(type)) + " (" + count + ")</button>";
        }).join("") +
      "</div>";

      root.innerHTML =
        '<div class="breadcrumb"><a href="account.html">Akun</a><span class="sep">/</span><span aria-current="page">My Library</span></div>' +
        '<div class="section-head"><div><span class="eyebrow">Ruang belajar</span><h1 class="section-title">My Library</h1><p class="section-sub">' +
          (owned.length ? "Produk demo yang sudah Anda miliki. Progres belajar tersimpan di browser ini." : "Belum ada produk. Mulai dari katalog demo.") +
        "</p></div>" +
        '<a class="btn btn-outline btn-sm" href="products.html">Tambah produk</a></div>' +
        (owned.length ? chips : "") +
        (items.length
          ? '<div class="library-grid">' + cards + "</div>"
          : owned.length
            ? '<div class="empty-state"><span class="empty-icon">' + MB.icon("layers", 26) + '</span><h3>Tidak ada produk untuk filter ini</h3><p>Coba pilih tipe konten lain atau tampilkan semua.</p><button class="btn btn-outline" type="button" data-lib-filter="all">Reset filter</button></div>'
            : MB.emptyState({
                icon: "package",
                title: "Library masih kosong",
                text: "Produk akan muncul di sini setelah pembelian demo berstatus sukses.",
                actionHref: "products.html",
                actionLabel: "Jelajahi katalog"
              })) +
        '<div class="notice-box mt-3">' + MB.icon("info", 19) +
          "<div><strong>Akses simulasi.</strong> Kontrol akses di halaman ini hanya frontend. Tidak ada file privat atau proteksi server pada demo statis.</div></div>";

      MB.qsa("[data-lib-filter]", root).forEach(function (button) {
        button.addEventListener("click", function () {
          libraryFilter = button.dataset.libFilter;
          render();
        });
      });
    }

    render();
  });

  /* ---------------------------------------------------------------
     Learning viewer
     --------------------------------------------------------------- */
  MB.registerPage("learning-viewer", function () {
    const root = MB.qs("#viewer-root");
    if (!root) return;
    const user = MB.currentUser();

    if (!user) {
      root.innerHTML = authGate("Learning viewer menampilkan materi dari produk yang Anda miliki. Masuk untuk melanjutkan.", "my-library.html");
      return;
    }

    const requestedSlug = MB.param("product");
    const owned = MB.ownedProducts(user.email);
    const initial = requestedSlug ? MB.productBySlug(requestedSlug) : owned[0];

    if (!initial) {
      root.innerHTML = MB.emptyState({
        icon: "book",
        title: "Belum ada materi untuk dibuka",
        text: "Mulai dengan membeli produk demo atau buka My Library untuk melihat akses yang tersedia.",
        actionHref: "my-library.html",
        actionLabel: "Buka My Library"
      });
      return;
    }

    const canAccess = user.role === "admin" || owned.some(function (product) { return product.id === initial.id; });
    if (!canAccess) {
      root.innerHTML =
        '<div class="breadcrumb"><a href="products.html">Katalog</a><span class="sep">/</span><span aria-current="page">' + MB.esc(initial.title) + "</span></div>" +
        '<div class="detail-grid">' +
          '<div class="detail-media"><img src="' + MB.esc(initial.thumbnail) + '" alt="' + MB.esc(initial.title) + '" data-fallback="' + MB.esc(initial.category) + '"></div>' +
          '<div class="stack">' +
            '<div class="detail-badges">' + MB.typeBadge(initial.type) + MB.badge(initial.category, "accent", true) + "</div>" +
            '<h1 class="detail-title">' + MB.esc(initial.title) + "</h1>" +
            '<p class="detail-sub">' + MB.esc(initial.shortDescription) + "</p>" +
            '<div class="detail-price"><span class="now">' + MB.money(MB.effectivePrice(initial)) + "</span></div>" +
            '<div class="notice-box">' + MB.icon("lock", 19) + "<div><strong>Materi terkunci pada simulasi.</strong> Produk ini belum ada di library akun demo Anda.</div></div>" +
            '<div class="cluster mt-2"><button class="btn btn-primary" type="button" data-buy="' + MB.esc(initial.slug) + '">Beli produk</button>' +
            '<a class="btn btn-outline" href="my-library.html">Kembali ke library</a></div>' +
          "</div>" +
        "</div>";

      const buy = MB.qs("[data-buy]");
      if (buy) buy.addEventListener("click", function () { MB.buyProduct(buy.dataset.buy); });
      return;
    }

    const product = initial;
    const items = product.contentItems || [];
    if (!items.length) {
      root.innerHTML = MB.emptyState({
        icon: "layers",
        title: "Materi belum tersedia",
        text: "Produk ini belum memiliki item materi pada data demo.",
        actionHref: "my-library.html",
        actionLabel: "Kembali ke My Library"
      });
      return;
    }

    const progress = MB.progressFor(user.email, product.slug);
    let currentId = MB.param("item") || progress.last || items[0].id;
    if (!items.some(function (item) { return item.id === currentId; })) currentId = items[0].id;

    function updateUrl() {
      try {
        window.history.replaceState(null, "", "learning-viewer.html?product=" +
          encodeURIComponent(product.slug) + "&item=" + encodeURIComponent(currentId));
      } catch (error) {
        /* file:// di beberapa browser membatasi replaceState. */
      }
    }

    function itemContent(item) {
      if (item.type === "video") {
        return '<div class="video-frame"><video controls preload="metadata" poster="' + MB.esc(product.thumbnail) + '">' +
            '<source src="assets/media/sample-video.mp4" type="video/mp4">' +
            "Browser Anda tidak mendukung pemutaran video." +
          "</video></div>" +
          '<p class="viewer-note">' + MB.esc(item.description || "") + "</p>" +
          '<div class="notice-box notice-box--info mt-2">' + MB.icon("info", 19) +
            "<div>Video contoh berlisensi CC0 (MDN). Materi asli tidak disertakan pada demo statis.</div></div>";
      }

      if (item.type === "document") {
        const points = (product.benefits || []).slice(0, 3).map(function (point) {
          return "<li>" + MB.esc(point) + "</li>";
        }).join("");
        return '<div class="doc-page">' +
          '<div class="doc-meta"><span>Dokumen demo</span><span>' + MB.esc(item.duration || "Contoh") + '</span><span>' + MB.esc(product.title) + "</span></div>" +
          "<h2>" + MB.esc(item.title) + "</h2>" +
          "<p>" + MB.esc(item.description || "Contoh halaman dokumen untuk demo viewer.") + "</p>" +
          "<h3>Ringkasan</h3>" +
          "<p>Halaman ini mensimulasikan tampilan dokumen digital. Pada implementasi produksi, konten akan dimuat dari file privat yang dilindungi kontrol akses server.</p>" +
          "<h3>Poin utama</h3>" +
          "<ul>" + points + "</ul>" +
          '<div class="notice-box mt-3">' + MB.icon("info", 19) + "<div>Tidak ada file PDF yang benar-benar diunduh dari halaman ini.</div></div>" +
        "</div>";
      }

      if (item.type === "photo") {
        const images = item.images && item.images.length ? item.images : [product.thumbnail];
        return '<div class="photo-gallery">' + images.map(function (src, index) {
          return '<button type="button" data-lightbox data-src="' + MB.esc(src) + '" data-caption="' +
            MB.esc(item.title + " — Foto " + (index + 1)) + '"><img src="' + MB.esc(src) +
            '" alt="' + MB.esc(item.title + " foto " + (index + 1)) + '" loading="lazy" data-fallback="Foto"></button>';
        }).join("") + "</div>" +
        '<p class="viewer-note">' + MB.esc(item.description || "") + " Klik foto untuk memperbesar.</p>" +
        '<div class="notice-box notice-box--info mt-2">' + MB.icon("info", 19) +
          "<div>Foto dokumentasi berasal dari materi publik Meraki Bersama dan dipakai untuk demo.</div></div>";
      }

      if (item.type === "live") {
        return '<div class="unsupported-state">' +
          '<span class="empty-icon">' + MB.icon("calendar", 26) + "</span>" +
          "<h3>Sesi live belum tersedia di demo</h3>" +
          "<p>Tipe materi <strong>live</strong> memerlukan penjadwalan, tautan meeting, dan kontrol akses dari backend. State ini sengaja ditampilkan untuk menguji fallback tipe materi yang belum didukung.</p>" +
          '<a class="btn btn-outline btn-sm" href="contact.html">Tanyakan jadwal</a>' +
        "</div>";
      }

      return '<div class="unsupported-state">' +
        '<span class="empty-icon">' + MB.icon("alert", 26) + "</span>" +
        "<h3>Tipe materi belum didukung</h3>" +
        "<p>Viewer demo belum memiliki tampilan untuk tipe <strong>" + MB.esc(item.type) + "</strong>.</p>" +
      "</div>";
    }

    function render() {
      const index = items.findIndex(function (item) { return item.id === currentId; });
      const item = items[index] || items[0];
      const stat = MB.completion(product, progress);
      const isDone = progress.completed.indexOf(item.id) !== -1;

      const lessons = items.map(function (lesson, lessonIndex) {
        const done = progress.completed.indexOf(lesson.id) !== -1;
        const active = lesson.id === item.id;
        return '<button class="lesson-btn' + (active ? " is-active" : "") + (done ? " is-done" : "") + '" type="button" data-item="' + MB.esc(lesson.id) + '"' +
          (active ? ' aria-current="true"' : "") + ">" +
          '<span class="lesson-num">' + String(lessonIndex + 1).padStart(2, "0") + "</span>" +
          '<span class="lesson-col"><span class="lesson-label">' + MB.esc(lesson.title) + "</span>" +
          '<span class="lesson-type">' + MB.esc(MB.typeLabel(lesson.type) || lesson.type) + " · " + MB.esc(lesson.duration || "") + "</span></span>" +
          (done ? '<span class="lesson-check">' + MB.icon("checkCircle", 15) + "</span>" : "") +
        "</button>";
      }).join("");

      root.innerHTML =
        '<div class="breadcrumb"><a href="my-library.html">My Library</a><span class="sep">/</span><span aria-current="page">' + MB.esc(product.title) + "</span></div>" +
        '<div class="viewer-shell">' +
          '<aside class="viewer-sidebar" aria-label="Daftar materi">' +
            '<div class="viewer-course-head">' +
              "<h2>" + MB.esc(product.title) + "</h2>" +
              "<p>" + stat.done + " dari " + stat.total + " materi selesai</p>" +
              '<div class="progress-label mt-2"><span>Progress</span><strong>' + stat.percent + "%</strong></div>" +
              '<div class="progress"><div class="progress-bar" style="width:' + stat.percent + '%"></div></div>' +
            "</div>" +
            '<div class="lesson-list">' + lessons + "</div>" +
          "</aside>" +
          '<section class="viewer-main">' +
            '<div class="viewer-head">' +
              "<div><div class=\"detail-badges\">" + MB.typeBadge(item.type) + MB.badge(item.duration || "Materi", "accent", true) + "</div>" +
              "<h1>" + MB.esc(item.title) + "</h1>" +
              "<p>" + MB.esc(item.description || "") + "</p></div>" +
              '<a class="btn btn-outline btn-sm" href="my-library.html">' + MB.icon("arrowLeft", 15) + " Library</a>" +
            "</div>" +
            '<div class="viewer-content">' + itemContent(item) + "</div>" +
            '<div class="viewer-actions">' +
              '<div class="viewer-nav">' +
                '<button class="btn btn-outline btn-sm" type="button" data-prev' + (index === 0 ? " disabled" : "") + ">" + MB.icon("chevronLeft", 15) + " Sebelumnya</button>" +
                '<button class="btn btn-outline btn-sm" type="button" data-next' + (index === items.length - 1 ? " disabled" : "") + ">Berikutnya " + MB.icon("chevronRight", 15) + "</button>" +
              "</div>" +
              '<button class="btn ' + (isDone ? "btn-outline" : "btn-primary") + ' btn-sm" type="button" data-complete aria-pressed="' + String(isDone) + '">' +
                MB.icon("check", 15) + (isDone ? " Tandai belum selesai" : " Tandai selesai") +
              "</button>" +
            "</div>" +
          "</section>" +
        "</div>";

      MB.qsa("[data-item]", root).forEach(function (button) {
        button.addEventListener("click", function () {
          currentId = button.dataset.item;
          progress.last = currentId;
          MB.save();
          updateUrl();
          render();
        });
      });

      const prev = MB.qs("[data-prev]", root);
      if (prev) {
        prev.addEventListener("click", function () {
          if (index <= 0) return;
          currentId = items[index - 1].id;
          progress.last = currentId;
          MB.save();
          updateUrl();
          render();
        });
      }

      const next = MB.qs("[data-next]", root);
      if (next) {
        next.addEventListener("click", function () {
          if (index >= items.length - 1) return;
          currentId = items[index + 1].id;
          progress.last = currentId;
          MB.save();
          updateUrl();
          render();
        });
      }

      const complete = MB.qs("[data-complete]", root);
      if (complete) {
        complete.addEventListener("click", function () {
          const position = progress.completed.indexOf(item.id);
          if (position === -1) progress.completed.push(item.id);
          else progress.completed.splice(position, 1);
          progress.last = item.id;
          MB.save();
          MB.toast(position === -1 ? "Materi ditandai selesai." : "Penanda selesai dibatalkan.", "info", "Progress demo");
          render();
        });
      }

      MB.qsa("[data-lightbox]", root).forEach(function (button) {
        button.addEventListener("click", function () {
          MB.openModal({
            title: button.dataset.caption || "Foto demo",
            size: "modal-panel--lg",
            body: '<img class="rounded-lg w-full" src="' + MB.esc(button.dataset.src) + '" alt="' + MB.esc(button.dataset.caption || "Foto demo") + '">' +
              '<p class="field-hint mt-2">Foto dokumentasi demo. Klik di luar gambar atau tombol tutup untuk keluar.</p>',
            footer: '<button class="btn btn-primary btn-sm" type="button" data-modal-close>Tutup</button>'
          });
        });
      });
    }

    render();
  });
})();
