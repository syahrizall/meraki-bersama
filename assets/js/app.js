/* ==========================================================================
   Meraki Bersama — Public pages
   Home, program, katalog, artikel, dan kontak.
   ========================================================================== */
(function () {
  "use strict";

  const MB = window.MB;
  const DATA = MB.data;

  /* ---------------------------------------------------------------
     Shared form helpers
     --------------------------------------------------------------- */
  function setError(input, message) {
    if (!input) return;
    input.setAttribute("aria-invalid", "true");
    const field = input.closest(".field");
    let slot = field ? field.querySelector(".field-error") : null;
    if (!slot) {
      slot = document.createElement("p");
      slot.className = "field-error";
      (field || input.parentElement).appendChild(slot);
    }
    if (!slot.id) slot.id = (input.id || "field") + "-error";
    input.setAttribute("aria-describedby", slot.id);
    slot.textContent = message;
  }

  function clearErrors(form) {
    MB.qsa(".field-error", form).forEach(function (slot) { slot.textContent = ""; });
    MB.qsa("[aria-invalid]", form).forEach(function (input) {
      input.removeAttribute("aria-invalid");
      if (input.getAttribute("aria-describedby") && input.getAttribute("aria-describedby").slice(-6) === "-error") {
        input.removeAttribute("aria-describedby");
      }
    });
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || "").trim());
  }

  function scrollToElement(element) {
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------------------------------------------------------------
     Home
     --------------------------------------------------------------- */
  MB.registerPage("home", function () {
    const productsHost = MB.qs("#featured-products");
    if (productsHost) {
      const published = MB.publishedProducts();
      let featured = published.filter(function (product) { return product.featured; });
      if (featured.length < 4) {
        featured = featured.concat(published.filter(function (product) { return !product.featured; }));
      }
      productsHost.innerHTML = featured.slice(0, 4).map(MB.productCard).join("");
    }

    const servicesHost = MB.qs("#home-services");
    if (servicesHost) {
      servicesHost.innerHTML = DATA.services.slice(0, 4).map(MB.serviceCard).join("");
    }

    const articlesHost = MB.qs("#latest-articles");
    if (articlesHost) {
      articlesHost.innerHTML = DATA.articles.slice(0, 3).map(MB.articleCard).join("");
    }
  });

  /* ---------------------------------------------------------------
     Services
     --------------------------------------------------------------- */
  MB.registerPage("services", function () {
    const host = MB.qs("#services-grid");
    if (host) host.innerHTML = DATA.services.map(MB.serviceCard).join("");
  });

  MB.registerPage("service-detail", function () {
    const host = MB.qs("#service-root");
    if (!host) return;
    const slug = MB.param("slug");
    const service = DATA.services.find(function (item) { return item.slug === slug; });

    if (!service) {
      host.innerHTML = MB.notFoundHTML(
        "Program tidak ditemukan",
        "Program yang Anda cari tidak tersedia. Silakan kembali ke daftar program.",
        "services.html",
        "Kembali ke program"
      );
      return;
    }

    const related = DATA.services.filter(function (item) { return item.slug !== service.slug; }).slice(0, 3);
    const benefits = service.benefits.map(function (item) {
      return "<li>" + MB.icon("check", 17) + "<span>" + MB.esc(item) + "</span></li>";
    }).join("");
    const scope = service.scope.map(function (item) {
      return "<li>" + MB.icon("check", 17) + "<span>" + MB.esc(item) + "</span></li>";
    }).join("");
    const audience = service.forWho.map(function (item) {
      return "<li>" + MB.icon("check", 17) + "<span>" + MB.esc(item) + "</span></li>";
    }).join("");

    host.innerHTML =
      '<div class="container">' +
        '<div class="breadcrumb"><a href="index.html">Home</a><span class="sep">/</span><a href="services.html">Program</a><span class="sep">/</span><span aria-current="page">' + MB.esc(service.title) + "</span></div>" +
        '<div class="page-hero service-hero">' +
          '<span class="eyebrow">Program Meraki</span>' +
          '<h1 class="page-hero-title">' + MB.esc(service.title) + "</h1>" +
          '<p class="page-hero-sub">' + MB.esc(service.shortDescription) + "</p>" +
          '<div class="cluster mt-3"><span class="pill">' + MB.esc(service.format) + '</span><span class="badge badge--demo badge--plain">Demo</span></div>' +
        "</div>" +

        '<section class="section">' +
          '<div class="detail-grid">' +
            '<div><div class="detail-media"><img src="' + MB.esc(service.image) + '" alt="' + MB.esc(service.title) + '" data-fallback="Meraki"></div></div>' +
            '<div class="stack">' +
              '<span class="eyebrow">Tentang program</span>' +
              '<div class="stack-sm">' + service.description + "</div>" +
              '<div class="meta-list">' +
                '<div class="meta-item">' + MB.icon("calendar", 18) + '<div><strong>Format</strong><span>' + MB.esc(service.format) + "</span></div></div>" +
                '<div class="meta-item">' + MB.icon("users", 18) + '<div><strong>Untuk siapa</strong><span>' + MB.esc(service.forWho[0]) + "</span></div></div>" +
              "</div>" +
              '<div class="cluster mt-2">' +
                '<a class="btn btn-primary" href="contact.html?service=' + encodeURIComponent(service.slug) + '">' + MB.esc(service.cta) + "</a>" +
                '<a class="btn btn-outline" href="products.html">Lihat katalog digital</a>' +
              "</div>" +
            "</div>" +
          "</div>" +
        "</section>" +

        '<section class="section section-soft">' +
          '<div class="container">' +
            '<div class="grid grid-3">' +
              '<div class="card card-pad"><h2 class="section-title" style="font-size:1.25rem">Manfaat</h2><ul class="benefit-list mt-2">' + benefits + "</ul></div>" +
              '<div class="card card-pad"><h2 class="section-title" style="font-size:1.25rem">Cakupan</h2><ul class="benefit-list mt-2">' + scope + "</ul></div>" +
              '<div class="card card-pad"><h2 class="section-title" style="font-size:1.25rem">Cocok untuk</h2><ul class="benefit-list mt-2">' + audience + "</ul></div>" +
            "</div>" +
          "</div>" +
        "</section>" +

        '<section class="section">' +
          '<div class="container">' +
            '<div class="section-head"><div><span class="eyebrow">Program lain</span><h2 class="section-title">Lanjutkan perjalanan Anda</h2></div><a class="btn btn-outline btn-sm" href="services.html">Semua program</a></div>' +
            '<div class="grid grid-3">' + related.map(function (item, index) { return MB.serviceCard(item, index); }).join("") + "</div>" +
          "</div>" +
        "</section>" +
      "</div>";
  });

  /* ---------------------------------------------------------------
     Product catalog
     --------------------------------------------------------------- */
  const catalogState = { q: "", category: "all", type: "all", sort: "featured", page: 1, perPage: 6 };

  MB.registerPage("products", function () {
    const grid = MB.qs("#catalog-grid");
    if (!grid) return;

    const search = MB.qs("#catalog-search");
    const category = MB.qs("#catalog-category");
    const type = MB.qs("#catalog-type");
    const sort = MB.qs("#catalog-sort");
    const reset = MB.qs("#catalog-reset");
    const count = MB.qs("#catalog-count");
    const pagination = MB.qs("#catalog-pagination");
    const empty = MB.qs("#catalog-empty");
    const emptyReset = MB.qs("#catalog-empty-reset");
    const publishedCount = MB.qs("#catalog-published-count");
    const base = MB.publishedProducts();

    if (publishedCount) publishedCount.textContent = base.length + " produk published";

    const categories = Array.from(new Set(base.map(function (product) { return product.category; }))).sort();
    const types = Array.from(new Set(base.map(function (product) { return product.type; })));

    category.innerHTML = '<option value="all">Semua kategori</option>' + categories.map(function (item) {
      return '<option value="' + MB.esc(item) + '">' + MB.esc(item) + "</option>";
    }).join("");

    type.innerHTML = '<option value="all">Semua tipe</option>' + types.map(function (item) {
      return '<option value="' + MB.esc(item) + '">' + MB.esc(DATA.typeLabels[item] || item) + "</option>";
    }).join("");

    function filtered() {
      const query = catalogState.q.trim().toLowerCase();
      let items = base.filter(function (product) {
        const matchQuery = !query ||
          (product.title + " " + product.shortDescription + " " + product.category + " " + product.author)
            .toLowerCase().indexOf(query) !== -1;
        const matchCategory = catalogState.category === "all" || product.category === catalogState.category;
        const matchType = catalogState.type === "all" || product.type === catalogState.type;
        return matchQuery && matchCategory && matchType;
      });

      items.sort(function (a, b) {
        if (catalogState.sort === "price-asc") return MB.effectivePrice(a) - MB.effectivePrice(b);
        if (catalogState.sort === "price-desc") return MB.effectivePrice(b) - MB.effectivePrice(a);
        if (catalogState.sort === "title") return a.title.localeCompare(b.title);
        if (catalogState.sort === "newest") return b.id.localeCompare(a.id, undefined, { numeric: true });
        return Number(b.featured) - Number(a.featured);
      });
      return items;
    }

    function render() {
      const items = filtered();
      const pages = Math.max(1, Math.ceil(items.length / catalogState.perPage));
      if (catalogState.page > pages) catalogState.page = pages;
      const start = (catalogState.page - 1) * catalogState.perPage;
      const visible = items.slice(start, start + catalogState.perPage);

      grid.innerHTML = visible.map(MB.productCard).join("");
      grid.hidden = !items.length;
      empty.hidden = items.length > 0;
      count.innerHTML = "Menampilkan <strong>" + items.length + "</strong> produk demo" +
        (items.length ? " · halaman " + catalogState.page + " dari " + pages : "");

      if (items.length > catalogState.perPage) {
        pagination.hidden = false;
        pagination.innerHTML =
          '<button class="page-btn" type="button" data-page="' + (catalogState.page - 1) + '"' + (catalogState.page === 1 ? " disabled" : "") + ' aria-label="Halaman sebelumnya">' + MB.icon("chevronLeft", 16) + "</button>" +
          Array.from({ length: pages }, function (_, index) {
            const number = index + 1;
            return '<button class="page-btn' + (number === catalogState.page ? " is-active" : "") + '" type="button" data-page="' + number + '" aria-label="Halaman ' + number + '">' + number + "</button>";
          }).join("") +
          '<button class="page-btn" type="button" data-page="' + (catalogState.page + 1) + '"' + (catalogState.page === pages ? " disabled" : "") + ' aria-label="Halaman berikutnya">' + MB.icon("chevronRight", 16) + "</button>";
      } else {
        pagination.hidden = true;
        pagination.innerHTML = "";
      }
    }

    search.addEventListener("input", function () {
      catalogState.q = search.value;
      catalogState.page = 1;
      render();
    });
    category.addEventListener("change", function () {
      catalogState.category = category.value;
      catalogState.page = 1;
      render();
    });
    type.addEventListener("change", function () {
      catalogState.type = type.value;
      catalogState.page = 1;
      render();
    });
    sort.addEventListener("change", function () {
      catalogState.sort = sort.value;
      render();
    });
    function resetFilters() {
      catalogState.q = "";
      catalogState.category = "all";
      catalogState.type = "all";
      catalogState.sort = "featured";
      catalogState.page = 1;
      search.value = "";
      category.value = "all";
      type.value = "all";
      sort.value = "featured";
      render();
      MB.toast("Filter direset.", "info", "Katalog");
    }

    reset.addEventListener("click", resetFilters);
    if (emptyReset) emptyReset.addEventListener("click", resetFilters);
    pagination.addEventListener("click", function (event) {
      const button = event.target.closest("[data-page]");
      if (!button || button.disabled) return;
      catalogState.page = Number(button.dataset.page);
      render();
      MB.qs("#catalog-results").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    render();
  });

  /* ---------------------------------------------------------------
     Product detail
     --------------------------------------------------------------- */
  MB.registerPage("product-detail", function () {
    const host = MB.qs("#product-root");
    if (!host) return;
    const slug = MB.param("slug");
    const product = MB.productBySlug(slug);

    if (!product) {
      host.innerHTML = MB.notFoundHTML(
        "Produk tidak ditemukan",
        "Slug produk tidak dikenali. Produk mungkin sudah dihapus pada data demo.",
        "products.html",
        "Kembali ke katalog"
      );
      return;
    }

    const isAvailable = product.status === "published";
    const related = MB.publishedProducts()
      .filter(function (item) { return item.id !== product.id; })
      .sort(function (a, b) {
        const aScore = a.category === product.category ? 1 : 0;
        const bScore = b.category === product.category ? 1 : 0;
        return bScore - aScore;
      })
      .slice(0, 3);

    const priceHTML = product.discountPrice
      ? '<span class="now">' + MB.money(product.discountPrice) + '</span><span class="old">' + MB.money(product.price) + '</span><span class="save">Hemat ' + MB.money(product.price - product.discountPrice) + "</span>"
      : '<span class="now">' + MB.money(product.price) + "</span>";

    const lessons = (product.contentItems || []).map(function (item, index) {
      return '<div class="lesson-preview-row">' +
        '<span class="num">' + String(index + 1).padStart(2, "0") + "</span>" +
        "<span>" + MB.esc(item.title) + "</span>" +
        '<span class="type">' + MB.esc(item.duration || item.type) + "</span>" +
      "</div>";
    }).join("");

    const benefits = (product.benefits || []).map(function (item) {
      return "<li>" + MB.icon("check", 17) + "<span>" + MB.esc(item) + "</span></li>";
    }).join("");

    const includes = (product.includes || []).map(function (item) {
      return "<li>" + MB.icon("check", 17) + "<span>" + MB.esc(item) + "</span></li>";
    }).join("");

    host.innerHTML =
      '<div class="container">' +
        '<div class="breadcrumb"><a href="index.html">Home</a><span class="sep">/</span><a href="products.html">Katalog</a><span class="sep">/</span><span aria-current="page">' + MB.esc(product.title) + "</span></div>" +
        '<div class="detail-grid">' +
          '<div><div class="detail-media"><img src="' + MB.esc(product.thumbnail) + '" alt="' + MB.esc(product.title) + '" data-fallback="' + MB.esc(product.category) + '"></div>' +
            '<div class="notice-box notice-box--info mt-2">' + MB.icon("info", 19) + "<div><strong>Demo statis.</strong> Gambar dan materi adalah contoh, bukan file produk sebenarnya.</div></div>" +
          "</div>" +
          '<div class="stack">' +
            '<div class="detail-badges">' + MB.typeBadge(product.type) + MB.badge(product.category, "accent", true) + (product.status === "draft" ? MB.badge("Draft", "draft") : "") + "</div>" +
            '<h1 class="detail-title">' + MB.esc(product.title) + "</h1>" +
            '<p class="detail-sub">' + MB.esc(product.shortDescription) + "</p>" +
            '<div class="detail-price">' + priceHTML + "</div>" +
            '<div class="detail-cta">' +
              (isAvailable
                ? '<button class="btn btn-primary btn-lg" type="button" data-buy="' + MB.esc(product.slug) + '">Beli produk</button>'
                : '<button class="btn btn-primary btn-lg" type="button" disabled>Belum dijual</button>') +
              (product.previewAvailable ? '<button class="btn btn-outline" type="button" id="preview-btn">Pratinjau contoh</button>' : "") +
            "</div>" +
            '<div class="meta-list">' +
              '<div class="meta-item">' + MB.icon("layers", 18) + '<div><strong>Tipe konten</strong><span>' + MB.esc(MB.typeLabel(product.type)) + "</span></div></div>" +
              '<div class="meta-item">' + MB.icon("lock", 18) + '<div><strong>Akses</strong><span>' + MB.esc(product.accessLabel) + "</span></div></div>" +
              '<div class="meta-item">' + MB.icon("user", 18) + '<div><strong>Pembuat</strong><span>' + MB.esc(product.author) + "</span></div></div>" +
              '<div class="meta-item">' + MB.icon("clock", 18) + '<div><strong>Durasi</strong><span>' + MB.esc(product.duration) + "</span></div></div>" +
            "</div>" +
            '<p class="field-hint">Transaksi pada demo ini tidak nyata. Produk akan ditambahkan ke My Library setelah status pembayaran sukses.</p>' +
          "</div>" +
        "</div>" +

        '<section class="section">' +
          '<div class="content-tabs" id="product-tabs" role="tablist" aria-label="Informasi produk">' +
            '<button class="tab-btn is-active" type="button" role="tab" aria-selected="true" data-tab="description">Deskripsi</button>' +
            '<button class="tab-btn" type="button" role="tab" aria-selected="false" data-tab="content">Materi</button>' +
            '<button class="tab-btn" type="button" role="tab" aria-selected="false" data-tab="benefits">Manfaat</button>' +
          "</div>" +
          '<div class="tab-panel" data-panel="description"><div class="stack">' + product.description + "</div></div>" +
          '<div class="tab-panel" data-panel="content" hidden><div class="lesson-preview">' + lessons + "</div><p class=\"field-hint mt-2\">Daftar materi mengikuti data demo. Sebagian materi mungkin belum tersedia penuh.</p></div>" +
          '<div class="tab-panel" data-panel="benefits" hidden><div class="grid grid-2"><div><h3 style="font-size:1rem">Yang Anda dapatkan</h3><ul class="benefit-list mt-2">' + benefits + "</ul></div><div><h3 style=\"font-size:1rem\">Termasuk</h3><ul class=\"benefit-list mt-2\">" + includes + "</ul></div></div></div>" +
        "</section>" +

        '<section class="section section-soft">' +
          '<div class="container">' +
            '<div class="section-head"><div><span class="eyebrow">Produk terkait</span><h2 class="section-title">Lengkapi perjalanan Anda</h2></div><a class="btn btn-outline btn-sm" href="products.html">Semua produk</a></div>' +
            '<div class="grid grid-3">' + related.map(MB.productCard).join("") + "</div>" +
          "</div>" +
        "</section>" +
      "</div>";

    const tabs = MB.qs("#product-tabs");
    if (tabs) {
      tabs.addEventListener("click", function (event) {
        const button = event.target.closest("[data-tab]");
        if (!button) return;
        MB.qsa("[data-tab]", tabs).forEach(function (item) {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });
        MB.qsa("[data-panel]").forEach(function (panel) {
          panel.hidden = panel.dataset.panel !== button.dataset.tab;
        });
      });
    }

    const buy = MB.qs("[data-buy]");
    if (buy) buy.addEventListener("click", function () { MB.buyProduct(buy.dataset.buy); });

    const preview = MB.qs("#preview-btn");
    if (preview) {
      preview.addEventListener("click", function () {
        MB.openModal({
          title: "Pratinjau — " + product.title,
          size: "modal-panel--lg",
          body: (product.preview || "<p>Pratinjau belum tersedia.</p>") +
            '<div class="notice-box mt-3">' + MB.icon("info", 19) + "<div>Ini hanya contoh konten publik. Materi lengkap tidak disertakan pada demo statis.</div></div>",
          footer: '<button class="btn btn-primary btn-sm" type="button" data-modal-close>Tutup pratinjau</button>'
        });
      });
    }
  });

  /* ---------------------------------------------------------------
     Articles
     --------------------------------------------------------------- */
  const articleState = { q: "", category: "all" };

  MB.registerPage("articles", function () {
    const grid = MB.qs("#articles-grid");
    if (!grid) return;
    const search = MB.qs("#article-search");
    const chips = MB.qs("#article-chips");
    const empty = MB.qs("#articles-empty");
    const count = MB.qs("#articles-count");
    const categories = Array.from(new Set(DATA.articles.map(function (article) { return article.category; })));

    chips.innerHTML = '<button class="chip is-active" type="button" data-cat="all">Semua</button>' +
      categories.map(function (category) {
        return '<button class="chip" type="button" data-cat="' + MB.esc(category) + '">' + MB.esc(category) + "</button>";
      }).join("");

    function render() {
      const query = articleState.q.trim().toLowerCase();
      const items = DATA.articles.filter(function (article) {
        const matchQuery = !query ||
          (article.title + " " + article.excerpt + " " + article.category).toLowerCase().indexOf(query) !== -1;
        const matchCategory = articleState.category === "all" || article.category === articleState.category;
        return matchQuery && matchCategory;
      });
      grid.innerHTML = items.map(MB.articleCard).join("");
      grid.hidden = !items.length;
      empty.hidden = items.length > 0;
      count.innerHTML = "Menampilkan <strong>" + items.length + "</strong> artikel demo";
    }

    search.addEventListener("input", function () {
      articleState.q = search.value;
      render();
    });
    chips.addEventListener("click", function (event) {
      const chip = event.target.closest("[data-cat]");
      if (!chip) return;
      articleState.category = chip.dataset.cat;
      MB.qsa(".chip", chips).forEach(function (item) { item.classList.toggle("is-active", item === chip); });
      render();
    });

    render();
  });

  MB.registerPage("article-detail", function () {
    const host = MB.qs("#article-root");
    if (!host) return;
    const slug = MB.param("slug");
    const article = DATA.articles.find(function (item) { return item.slug === slug; });

    if (!article) {
      host.innerHTML = MB.notFoundHTML(
        "Artikel tidak ditemukan",
        "Artikel yang Anda cari tidak tersedia di data demo.",
        "articles.html",
        "Kembali ke artikel"
      );
      return;
    }

    const related = DATA.articles.filter(function (item) { return item.slug !== article.slug; }).slice(0, 3);
    const plainBody = article.body.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const readMinutes = Math.max(2, Math.ceil(plainBody.split(" ").length / 200));
    const tags = [article.category, "Meraki"].map(function (tag) {
      return '<span class="tag">' + MB.esc(tag) + "</span>";
    }).join("");

    host.innerHTML =
      '<div class="container">' +
        '<div class="article-hero">' +
          '<div class="breadcrumb"><a href="index.html">Home</a><span class="sep">/</span><a href="articles.html">Artikel</a><span class="sep">/</span><span aria-current="page">' + MB.esc(article.category) + "</span></div>" +
          '<span class="badge badge--accent">' + MB.esc(article.category) + "</span>" +
          "<h1>" + MB.esc(article.title) + "</h1>" +
          '<div class="article-hero-meta"><span>' + MB.dateLong(article.date) + '</span><span class="dot"></span><span>Tim Meraki Bersama</span><span class="dot"></span><span>' + readMinutes + " menit baca</span></div>" +
          '<div class="article-cover"><img src="' + MB.esc(article.thumbnail) + '" alt="' + MB.esc(article.title) + '" data-fallback="Artikel"></div>' +
        "</div>" +
        '<article class="article-content">' + article.body + "</article>" +
        '<div class="article-footer"><div class="article-tags">' + tags + '</div><a class="btn btn-outline btn-sm" href="articles.html">' + MB.icon("arrowLeft", 15) + " Semua artikel</a></div>" +
        '<section class="section">' +
          '<div class="section-head"><div><span class="eyebrow">Baca juga</span><h2 class="section-title">Artikel terkait</h2></div></div>' +
          '<div class="grid grid-3">' + related.map(MB.articleCard).join("") + "</div>" +
        "</section>" +
      "</div>";
  });

  /* ---------------------------------------------------------------
     Contact
     --------------------------------------------------------------- */
  MB.registerPage("contact", function () {
    const form = MB.qs("#contact-form");
    if (!form) return;
    const result = MB.qs("#contact-result");
    const serviceSlug = MB.param("service");
    const service = DATA.services.find(function (item) { return item.slug === serviceSlug; });
    const subject = MB.qs("#contact-subject");

    if (service && subject && !subject.value) {
      subject.value = "Konsultasi program: " + service.title;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(form);
      result.hidden = true;

      const name = MB.qs("#contact-name");
      const email = MB.qs("#contact-email");
      const message = MB.qs("#contact-message");
      let valid = true;

      if (!name.value.trim()) { setError(name, "Nama wajib diisi."); valid = false; }
      if (!email.value.trim()) { setError(email, "Email wajib diisi."); valid = false; }
      else if (!validEmail(email.value)) { setError(email, "Format email belum benar."); valid = false; }
      if (!subject.value.trim()) { setError(subject, "Subjek wajib diisi."); valid = false; }
      if (message.value.trim().length < 10) { setError(message, "Tuliskan pesan minimal 10 karakter."); valid = false; }

      if (!valid) {
        const firstInvalid = MB.qs("[aria-invalid=\"true\"]", form);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      result.hidden = false;
      result.innerHTML = '<div class="alert alert--success">' + MB.icon("checkCircle", 18) +
        "<div><strong>Pesan dicatat pada demo ini.</strong><br>Formulir tidak mengirim email atau data ke server. Untuk kontak nyata, gunakan alamat email yang tertera.</div></div>";
      form.reset();
      if (service) subject.value = "Konsultasi program: " + service.title;
      scrollToElement(result);
    });
  });
})();
