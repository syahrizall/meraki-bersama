/* ==========================================================================
   Meraki Bersama — Core
   State demo, layout bersama, komponen UI, dan helper.
   ========================================================================== */
(function () {
  "use strict";

  const DATA = window.MB_DATA;
  if (!DATA) {
    console.error("mock-data.js belum dimuat.");
    return;
  }

  const STORAGE_KEY = "meraki_demo_state_v1";
  const WINDOW_NAME_PREFIX = "meraki_demo_state::";
  const PAGE = document.body ? document.body.dataset.page || "" : "";
  const clone = (value) => JSON.parse(JSON.stringify(value));

  /* ---------------------------------------------------------------
     State
     --------------------------------------------------------------- */
  function defaultState() {
    return {
      version: 1,
      users: clone(DATA.users),
      products: clone(DATA.products),
      orders: clone(DATA.orders),
      session: null,
      progress: {},
      checkout: null,
      lastOrderId: null
    };
  }

  function loadState() {
    const base = defaultState();
    const candidates = [];

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === 1) candidates.push(parsed);
      }
    } catch (error) {
      /* localStorage dapat diblokir pada file://. */
    }

    try {
      if (window.name && window.name.indexOf(WINDOW_NAME_PREFIX) === 0) {
        const parsed = JSON.parse(window.name.slice(WINDOW_NAME_PREFIX.length));
        if (parsed && parsed.version === 1) candidates.push(parsed);
      }
    } catch (error) {
      /* window.name bukan JSON milik aplikasi. */
    }

    if (!candidates.length) return base;
    candidates.sort(function (a, b) { return (b.savedAt || 0) - (a.savedAt || 0); });
    return Object.assign(base, candidates[0]);
  }

  const state = loadState();

  function save() {
    state.savedAt = Date.now();
    const serialized = JSON.stringify(state);
    try {
      window.localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      /* Mode file:// dapat memblokir localStorage. */
    }
    try {
      /* Fallback lintas halaman saat localStorage file:// tidak dibagi antar file. */
      window.name = WINDOW_NAME_PREFIX + serialized;
    } catch (error) {
      /* window.name tidak tersedia. Demo tetap berjalan di memori. */
    }
  }

  function currentUser() {
    if (!state.session) return null;
    const email = String(state.session.email || "").toLowerCase();
    return state.users.find((user) => String(user.email).toLowerCase() === email) || null;
  }

  function isAdmin() {
    const user = currentUser();
    return !!user && user.role === "admin";
  }

  /* ---------------------------------------------------------------
     Helpers
     --------------------------------------------------------------- */
  const qs = (selector, root) => (root || document).querySelector(selector);
  const qsa = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  const esc = (value) =>
    String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));

  const param = (name, fallback) => {
    const value = new URLSearchParams(window.location.search).get(name);
    return value == null || value === "" ? (fallback || "") : value;
  };

  const slugify = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70);

  const IDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  });

  const money = (value) => IDR.format(Number(value) || 0).replace(/\u00a0/g, " ");

  const dateFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" });
  const dateLongFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" });

  function dateShort(value) {
    if (!value) return "-";
    return dateFmt.format(new Date(value));
  }

  function dateLong(value) {
    if (!value) return "-";
    return dateLongFmt.format(new Date(value));
  }

  function typeLabel(type) {
    return (DATA.typeLabels && DATA.typeLabels[type]) || type || "Materi";
  }

  function statusLabel(status) {
    return (DATA.statusLabels && DATA.statusLabels[status]) || status || "-";
  }

  function productBySlug(slug) {
    return state.products.find((product) => product.slug === slug) || null;
  }

  function productById(id) {
    return state.products.find((product) => product.id === id) || null;
  }

  function publishedProducts() {
    return state.products.filter((product) => product.status === "published");
  }

  function effectivePrice(product) {
    return Number(product.discountPrice || product.price || 0);
  }

  function orderById(id) {
    return state.orders.find((order) => order.id === id) || null;
  }

  function nextOrderId() {
    const year = new Date().getFullYear();
    const numbers = state.orders
      .map((order) => parseInt(String(order.id).split("-").pop(), 10))
      .filter((number) => !Number.isNaN(number));
    const next = (numbers.length ? Math.max.apply(null, numbers) : 100) + 1;
    return "MB-" + year + "-" + String(next).padStart(4, "0");
  }

  function ownedProducts(email) {
    const address = String(email || "").toLowerCase();
    if (!address) return [];
    const ids = new Set();
    state.orders.forEach((order) => {
      if (order.status !== "success") return;
      if (String(order.customer.email).toLowerCase() !== address) return;
      order.items.forEach((item) => ids.add(item.productId));
    });
    return state.products.filter((product) => ids.has(product.id));
  }

  function progressFor(email, slug) {
    const key = String(email || "").toLowerCase();
    if (!state.progress[key]) state.progress[key] = {};
    if (!state.progress[key][slug]) state.progress[key][slug] = { completed: [], last: null };
    return state.progress[key][slug];
  }

  function completion(product, progress) {
    const total = (product.contentItems || []).length;
    const done = (progress && progress.completed ? progress.completed.length : 0);
    return {
      total: total,
      done: Math.min(done, total),
      percent: total ? Math.round((Math.min(done, total) / total) * 100) : 0
    };
  }

  function safeNext(next, fallback) {
    if (!next) return fallback || "account.html";
    if (/^[a-z0-9._-]+\.html(\?[^#]*)?$/i.test(next)) return next;
    return fallback || "account.html";
  }

  /* ---------------------------------------------------------------
     Icons
     --------------------------------------------------------------- */
  const ICONS = {
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    chevronLeft: '<path d="M15 18l-6-6 6-6"/>',
    chevronRight: '<path d="M9 18l6-6-6-6"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    close: '<path d="M18 6L6 18M6 6l12 12"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 6.2A10 10 0 0 1 22 12s-1.5 2.6-4 4.2"/><path d="M6.1 6.1C3.7 7.7 2 12 2 12s3.5 6 10 6a10 10 0 0 0 4.1-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M8 3v18"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 15l-5-5L5 21"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>',
    alert: '<path d="M12 3L2 21h20L12 3z"/><path d="M12 9v5M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    package: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>',
    receipt: '<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3.1-6 7-6s7 2.5 7 6"/><circle cx="18" cy="9" r="2.5"/><path d="M18 14c2.8 0 5 1.8 5 4.5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    external: '<path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v7H3V3h7"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 21h16"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>',
    box: '<path d="M4 7l8-4 8 4v10l-8 4-8-4z"/><path d="M4 7l8 4 8-4M12 11v10"/>'
  };

  function icon(name, size) {
    const path = ICONS[name] || "";
    const dimension = size || 18;
    return '<svg viewBox="0 0 24 24" width="' + dimension + '" height="' + dimension +
      '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      path + "</svg>";
  }

  /* ---------------------------------------------------------------
     Badges & cards
     --------------------------------------------------------------- */
  function badge(text, variant, plain) {
    return '<span class="badge badge--' + esc(variant || "info") + (plain ? " badge--plain" : "") + '">' +
      esc(text) + "</span>";
  }

  function typeBadge(type) {
    return badge(typeLabel(type), type);
  }

  function statusBadge(status) {
    return badge(statusLabel(status), status);
  }

  function productCard(product) {
    const link = "product-detail.html?slug=" + encodeURIComponent(product.slug);
    const oldPrice = product.discountPrice
      ? '<span class="price-old">' + money(product.price) + "</span>"
      : "";
    return (
      '<article class="product-card">' +
        '<a class="product-media" href="' + link + '" aria-label="Lihat ' + esc(product.title) + '">' +
          '<img src="' + esc(product.thumbnail) + '" alt="' + esc(product.title) + '" loading="lazy" data-fallback="' + esc(product.category) + '">' +
          '<span class="badge badge--' + esc(product.type) + ' product-type">' + esc(typeLabel(product.type)) + "</span>" +
          (product.discountPrice ? '<span class="product-flag">Promo</span>' : "") +
        "</a>" +
        '<div class="product-body">' +
          '<span class="product-cat">' + esc(product.category) + "</span>" +
          '<h3 class="product-title"><a href="' + link + '">' + esc(product.title) + "</a></h3>" +
          '<p class="product-desc">' + esc(product.shortDescription) + "</p>" +
          '<div class="product-foot">' +
            '<div class="price"><span class="price-now">' + money(effectivePrice(product)) + "</span>" + oldPrice + "</div>" +
            '<a class="product-link" href="' + link + '">Detail ' + icon("arrowRight", 15) + "</a>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function articleCard(article) {
    const link = "article-detail.html?slug=" + encodeURIComponent(article.slug);
    return (
      '<article class="article-card">' +
        '<a class="article-media" href="' + link + '" aria-label="Baca ' + esc(article.title) + '">' +
          '<img src="' + esc(article.thumbnail) + '" alt="' + esc(article.title) + '" loading="lazy" data-fallback="Artikel">' +
        "</a>" +
        '<div class="article-body">' +
          '<div class="article-meta"><span>' + esc(article.category) + '</span><span class="dot"></span><span>' + dateShort(article.date) + "</span></div>" +
          '<h3 class="article-title"><a href="' + link + '">' + esc(article.title) + "</a></h3>" +
          '<p class="article-excerpt">' + esc(article.excerpt) + "</p>" +
          '<a class="read-link" href="' + link + '">Baca artikel ' + icon("arrowRight", 15) + "</a>" +
        "</div>" +
      "</article>"
    );
  }

  function serviceCard(service, index) {
    return (
      '<a class="service-card" href="service-detail.html?slug=' + encodeURIComponent(service.slug) + '">' +
        '<span class="service-num">' + String(index + 1).padStart(2, "0") + "</span>" +
        '<h3 class="service-title">' + esc(service.title) + "</h3>" +
        '<p class="service-desc">' + esc(service.shortDescription) + "</p>" +
        '<div class="service-tags">' + (service.forWho || []).slice(0, 2).map((item) => '<span class="tag">' + esc(item) + "</span>").join("") + "</div>" +
        '<span class="service-arrow">Lihat program ' + icon("arrowRight", 15) + "</span>" +
      "</a>"
    );
  }

  /* ---------------------------------------------------------------
     Toast, modal, confirm
     --------------------------------------------------------------- */
  const TOAST_TITLES = { success: "Berhasil", error: "Perlu diperiksa", info: "Informasi" };

  function toast(message, type, title) {
    const kind = type || "success";
    let stack = qs(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      stack.setAttribute("aria-live", "polite");
      document.body.appendChild(stack);
    }
    const item = document.createElement("div");
    item.className = "toast toast--" + kind;
    item.setAttribute("role", "status");
    item.innerHTML =
      icon(kind === "error" ? "alert" : kind === "info" ? "info" : "checkCircle", 18) +
      "<div><strong>" + esc(title || TOAST_TITLES[kind] || "Informasi") + "</strong><p>" + esc(message) + "</p></div>";
    stack.appendChild(item);
    window.setTimeout(function () {
      item.style.opacity = "0";
      item.style.transform = "translateY(6px)";
      window.setTimeout(function () { item.remove(); }, 220);
    }, 4200);
  }

  let lastFocused = null;

  function openModal(options) {
    const config = options || {};
    closeModal(true);
    lastFocused = document.activeElement;
    const wrap = document.createElement("div");
    wrap.className = "modal";
    wrap.id = "app-modal";
    wrap.innerHTML =
      '<div class="modal-backdrop" data-modal-close></div>' +
      '<div class="modal-panel ' + (config.size || "") + '" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '<div class="modal-head">' +
          '<h2 class="modal-title" id="modal-title">' + esc(config.title || "Detail") + "</h2>" +
          '<button class="modal-close" type="button" data-modal-close aria-label="Tutup dialog">' + icon("close", 18) + "</button>" +
        "</div>" +
        '<div class="modal-body">' + (config.body || "") + "</div>" +
        (config.footer ? '<div class="modal-foot">' + config.footer + "</div>" : "") +
      "</div>";
    document.body.appendChild(wrap);
    document.body.classList.add("modal-open");

    wrap.addEventListener("click", function (event) {
      if (event.target.closest("[data-modal-close]")) {
        event.preventDefault();
        closeModal();
      }
    });

    wrap.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
      if (event.key !== "Tab") return;
      const focusable = qsa('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', wrap)
        .filter((element) => !element.disabled && element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const focusTarget = qs("[autofocus]", wrap) || qs("input, select, textarea, button", wrap);
    if (focusTarget) window.setTimeout(function () { focusTarget.focus(); }, 30);
    if (config.onOpen) config.onOpen(wrap);
    return wrap;
  }

  function closeModal(silent) {
    const existing = qs("#app-modal");
    if (!existing) return;
    existing.remove();
    document.body.classList.remove("modal-open");
    if (!silent && lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function confirmDialog(options) {
    const config = options || {};
    openModal({
      title: config.title || "Konfirmasi",
      size: "modal-panel--sm",
      body: '<p class="muted">' + esc(config.message || "Lanjutkan tindakan ini?") + "</p>",
      footer:
        '<button class="btn btn-outline btn-sm" type="button" data-modal-close>Batal</button>' +
        '<button class="btn ' + (config.danger ? "btn-danger" : "btn-primary") + ' btn-sm" type="button" data-confirm>' +
        esc(config.confirmLabel || "Lanjutkan") + "</button>",
      onOpen: function (wrap) {
        wrap.querySelector("[data-confirm]").addEventListener("click", function () {
          closeModal(true);
          if (config.onConfirm) config.onConfirm();
        });
      }
    });
  }

  /* ---------------------------------------------------------------
     Header & footer
     --------------------------------------------------------------- */
  const NAV_ITEMS = [
    { page: "home", label: "Home", href: "index.html" },
    { page: "services", label: "Program", href: "services.html" },
    { page: "products", label: "Katalog", href: "products.html" },
    { page: "articles", label: "Artikel", href: "articles.html" },
    { page: "about", label: "About Us", href: "about.html" },
    { page: "contact", label: "Kontak", href: "contact.html" }
  ];

  const PAGE_GROUP = {
    "service-detail": "services",
    "product-detail": "products",
    "article-detail": "articles"
  };

  function brandHTML(footer) {
    return (
      '<a class="brand" href="index.html" aria-label="Meraki Bersama — Beranda">' +
        '<span class="brand-mark" aria-hidden="true">M</span>' +
        '<span class="brand-word"><strong>Meraki</strong><span>Bersama</span></span>' +
      "</a>"
    );
  }

  function renderHeader() {
    const host = qs("#site-header");
    if (!host) return;
    const user = currentUser();
    const active = PAGE_GROUP[PAGE] || PAGE;
    const nav = NAV_ITEMS.map(function (item) {
      return '<a class="nav-link' + (item.page === active ? " is-active" : "") + '" href="' + item.href + '"' +
        (item.page === active ? ' aria-current="page"' : "") + ">" + item.label + "</a>";
    }).join("");

    const authDesktop = user
      ? (user.role === "admin" ? '<a class="header-login" href="admin-dashboard.html">Admin</a>' : "") +
        '<a class="header-login header-user" href="account.html">Halo, ' + esc(user.name.split(" ")[0]) + "</a>"
      : '<a class="header-login" href="login.html">Masuk</a>' +
        '<a class="btn btn-primary btn-sm" href="register.html">Registrasi</a>';

    const mobileAuth = user
      ? '<a href="account.html">Akun Saya</a>' +
        '<a href="my-library.html">My Library</a>' +
        (user.role === "admin" ? '<a href="admin-dashboard.html">Admin Demo</a>' : "") +
        '<a href="index.html" data-action="logout">Keluar</a>'
      : '<a href="login.html">Masuk</a>' +
        '<a class="btn btn-primary" href="register.html">Registrasi Demo</a>';

    host.innerHTML =
      '<div class="container header-inner">' +
        brandHTML() +
        '<nav class="main-nav" aria-label="Navigasi utama">' + nav + "</nav>" +
        '<div class="header-actions">' + authDesktop +
          '<button class="menu-toggle" id="menu-toggle" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="mobile-nav">' +
            icon("menu", 22) +
          "</button>" +
        "</div>" +
      "</div>" +
      '<div class="mobile-nav" id="mobile-nav">' +
        '<nav aria-label="Navigasi mobile">' +
          nav + mobileAuth +
        "</nav>" +
      "</div>";

    const toggle = qs("#menu-toggle");
    const panel = qs("#mobile-nav");
    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        const open = panel.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      });
      document.addEventListener("click", function (event) {
        if (!panel.classList.contains("is-open")) return;
        if (panel.contains(event.target) || toggle.contains(event.target)) return;
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
      document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape" || !panel.classList.contains("is-open")) return;
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      });
      panel.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          panel.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  function renderFooter() {
    const host = qs("#site-footer");
    if (!host) return;
    const user = currentUser();
    const year = new Date().getFullYear();
    const accountLinks = user
      ? '<a href="account.html">Akun Saya</a><a href="my-library.html">My Library</a><a href="index.html" data-action="logout">Keluar</a>'
      : '<a href="login.html">Masuk</a><a href="register.html">Registrasi Demo</a>';
    host.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' + brandHTML(true) +
            '<p class="footer-about">Meraki Bersama — coaching dan training kepemimpinan berbasis nilai. Bersama Berbagi Berkat.</p>' +
            '<div class="social-row">' +
              '<a class="social-link" href="' + esc(DATA.site.instagram) + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram Meraki Bersama">' + icon("instagram", 17) + "</a>" +
              '<a class="social-link" href="mailto:' + esc(DATA.site.email) + '" aria-label="Kirim email ke Meraki Bersama">' + icon("mail", 17) + "</a>" +
            "</div>" +
          "</div>" +
          '<div class="footer-col"><h2 class="footer-title">Jelajahi</h2><div class="footer-links">' +
            '<a href="index.html">Home</a><a href="services.html">Program</a><a href="products.html">Katalog Digital</a><a href="articles.html">Artikel</a><a href="about.html">About Us</a><a href="contact.html">Kontak</a>' +
          "</div></div>" +
          '<div class="footer-col"><h2 class="footer-title">Akun Demo</h2><div class="footer-links">' +
            accountLinks + '<a href="admin-dashboard.html">Admin Demo</a><a href="index.html" data-action="demo-policy">Kebijakan Demo</a>' +
          "</div></div>" +
          '<div class="footer-col footer-col--contact"><h2 class="footer-title">Hubungi Kami</h2><div class="footer-contact">' +
            '<div><span class="label">Email</span><a href="mailto:' + esc(DATA.site.email) + '">' + esc(DATA.site.email) + "</a></div>" +
            '<div><span class="label">Instagram</span><a href="' + esc(DATA.site.instagram) + '" target="_blank" rel="noopener noreferrer">' + esc(DATA.site.instagramLabel) + "</a></div>" +
            '<div><span class="label">Alamat</span><span>Informasi alamat belum disediakan untuk demo ini.</span></div>' +
          "</div></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<p>© ' + year + " Meraki Bersama · " + esc(DATA.site.legal) + ". All rights reserved.</p>" +
          '<p class="footer-disclaimer">Website ini adalah proof of concept statis. Tidak ada pembayaran, autentikasi, email, atau penyimpanan data nyata di balik layar.</p>' +
        "</div>" +
      "</div>";
  }

  function adminSidebar(active) {
    const host = qs("#admin-sidebar");
    if (!host) return;
    const user = currentUser();
    const items = [
      { key: "dashboard", label: "Dashboard", href: "admin-dashboard.html", icon: "dashboard" },
      { key: "products", label: "Produk", href: "admin-products.html", icon: "package" },
      { key: "orders", label: "Order", href: "admin-orders.html", icon: "receipt" }
    ];
    host.className = "admin-sidebar";
    host.innerHTML =
      '<div class="admin-brand"><span class="brand-mark" aria-hidden="true">M</span><div><strong>Meraki Admin</strong><span>Demo Panel</span></div></div>' +
      '<nav class="admin-nav" aria-label="Navigasi admin">' +
        items.map(function (item) {
          return '<a class="' + (item.key === active ? "is-active" : "") + '" href="' + item.href + '"' +
            (item.key === active ? ' aria-current="page"' : "") + ">" + icon(item.icon, 17) + item.label + "</a>";
        }).join("") +
        '<a href="index.html">' + icon("external", 17) + "Lihat Situs</a>" +
        '<a href="index.html" data-action="logout">' + icon("logout", 17) + "Keluar</a>" +
      "</nav>" +
      '<div class="admin-foot">' + esc(user ? user.name : "Demo Admin") + "<br>Data demo · tidak tersimpan di server</div>";
  }

  function adminGate(host) {
    if (isAdmin()) return true;
    host.innerHTML =
      '<div class="empty-state">' +
        '<span class="empty-icon">' + icon("lock", 26) + "</span>" +
        "<h3>Area admin demo</h3>" +
        "<p>Masuk sebagai admin demo untuk melihat dashboard, mengelola produk, dan memeriksa order. Data di sini hanya simulasi.</p>" +
        '<button class="btn btn-primary" type="button" data-demo-login="admin">Masuk sebagai Admin Demo</button>' +
        '<p class="field-hint">admin@meraki.demo · admin1234</p>' +
      "</div>";
    return false;
  }

  /* ---------------------------------------------------------------
     Shared actions
     --------------------------------------------------------------- */
  function loginAs(role) {
    const user = state.users.find((item) => item.role === role);
    if (!user) {
      toast("Akun demo tidak ditemukan.", "error");
      return;
    }
    state.session = { email: user.email, role: user.role };
    save();
    toast("Masuk sebagai " + user.name + ".", "success", "Mode demo");
    window.setTimeout(function () { window.location.reload(); }, 350);
  }

  function logout() {
    state.session = null;
    save();
    toast("Sesi demo diakhiri.", "info", "Logout");
    window.setTimeout(function () { window.location.href = "index.html"; }, 350);
  }

  function buyProduct(slug) {
    const product = productBySlug(slug);
    if (!product) {
      toast("Produk tidak ditemukan.", "error");
      return;
    }
    if (product.status !== "published") {
      toast("Produk ini masih draft dan belum dijual.", "error", "Tidak tersedia");
      return;
    }
    state.checkout = { slug: product.slug };
    save();
    const target = "checkout.html?slug=" + encodeURIComponent(product.slug);
    if (currentUser()) {
      window.location.href = target;
    } else {
      window.location.href = "login.html?next=" + encodeURIComponent(target);
    }
  }

  function demoPolicyModal() {
    openModal({
      title: "Kebijakan Demo",
      body:
        '<div class="stack">' +
          '<p class="muted">Website ini adalah <strong>proof of concept statis</strong> untuk review stakeholder. Seluruh data, akun, harga, dan transaksi adalah fiktif.</p>' +
          '<ul class="benefit-list">' +
            "<li>" + icon("check", 17) + "<span>Tidak ada pembayaran, penagihan, atau payment gateway nyata.</span></li>" +
            "<li>" + icon("check", 17) + "<span>Login hanya simulasi frontend; tidak ada autentikasi server.</span></li>" +
            "<li>" + icon("check", 17) + "<span>Tidak ada email, notifikasi, atau pesan yang benar-benar dikirim.</span></li>" +
            "<li>" + icon("check", 17) + "<span>File materi tidak diamankan; jangan gunakan untuk konten privat.</span></li>" +
            "<li>" + icon("check", 17) + "<span>Perubahan admin disimpan di localStorage browser dan dapat di-reset.</span></li>" +
          "</ul>" +
          '<p class="small muted">Jangan memasukkan data pribadi, password asli, atau informasi rahasia ke dalam demo ini.</p>' +
        "</div>",
      footer: '<button class="btn btn-primary btn-sm" type="button" data-modal-close>Mengerti</button>'
    });
  }

  function notFoundHTML(title, message, backHref, backLabel) {
    return (
      '<div class="not-found">' +
        '<div class="code">404</div>' +
        "<h1>" + esc(title || "Halaman tidak ditemukan") + "</h1>" +
        "<p>" + esc(message || "Tautan yang Anda buka tidak tersedia di demo ini.") + "</p>" +
        '<div class="cluster">' +
          '<a class="btn btn-primary" href="' + esc(backHref || "products.html") + '">' + esc(backLabel || "Kembali ke katalog") + "</a>" +
          '<a class="btn btn-outline" href="index.html">Beranda</a>' +
        "</div>" +
      "</div>"
    );
  }

  function emptyState(options) {
    const config = options || {};
    return (
      '<div class="empty-state">' +
        '<span class="empty-icon">' + icon(config.icon || "box", 26) + "</span>" +
        "<h3>" + esc(config.title || "Belum ada data") + "</h3>" +
        "<p>" + esc(config.text || "") + "</p>" +
        (config.actionHref
          ? '<a class="btn btn-primary" href="' + esc(config.actionHref) + '">' + esc(config.actionLabel || "Mulai") + "</a>"
          : "") +
        (config.actionButton || "") +
      "</div>"
    );
  }

  /* ---------------------------------------------------------------
     Global event bindings
     --------------------------------------------------------------- */
  function bindGlobal() {
    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!target || typeof target.closest !== "function") return;

      const demoLogin = target.closest("[data-demo-login]");
      if (demoLogin) {
        event.preventDefault();
        loginAs(demoLogin.dataset.demoLogin);
        return;
      }

      const fillUser = target.closest("[data-fill-user]");
      if (fillUser) {
        event.preventDefault();
        const user = state.users.find((item) => item.role === fillUser.dataset.fillUser);
        const email = document.getElementById("login-email");
        const password = document.getElementById("login-password");
        if (user && email && password) {
          email.value = user.email;
          password.value = user.password;
          toast("Kredensial demo diisi. Tekan Masuk untuk melanjutkan.", "info");
        }
        return;
      }

      const logoutAction = target.closest('[data-action="logout"]');
      if (logoutAction) {
        event.preventDefault();
        logout();
        return;
      }

      const policy = target.closest('[data-action="demo-policy"]');
      if (policy) {
        event.preventDefault();
        demoPolicyModal();
        return;
      }

      const passwordToggle = target.closest(".toggle-password");
      if (passwordToggle) {
        const input = document.getElementById(passwordToggle.dataset.target);
        if (!input) return;
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        passwordToggle.innerHTML = icon(show ? "eyeOff" : "eye", 18);
        passwordToggle.setAttribute("aria-label", show ? "Sembunyikan password" : "Tampilkan password");
      }
    });

    document.addEventListener("error", function (event) {
      const img = event.target;
      if (!img || img.tagName !== "IMG") return;
      const holder = img.closest(
        ".product-media, .article-media, .detail-media, .coach-media, .library-media, .order-line-media, .article-cover, .detail-thumb, .photo-gallery button, .hero-media"
      );
      if (!holder) return;
      holder.classList.add("image-fallback");
      holder.setAttribute("data-fallback", img.dataset.fallback || "Meraki");
    }, true);
  }

  /* ---------------------------------------------------------------
     Boot & public API
     --------------------------------------------------------------- */
  const pages = {};

  function registerPage(name, controller) {
    pages[name] = controller;
  }

  function boot() {
    renderHeader();
    renderFooter();
    bindGlobal();
    if (PAGE === "admin-dashboard" || PAGE === "admin-products" || PAGE === "admin-orders") {
      adminSidebar(PAGE.replace("admin-", ""));
    }
    const controller = pages[PAGE];
    if (controller) controller();
  }

  window.MB = {
    data: DATA,
    state: state,
    page: PAGE,
    save: save,
    currentUser: currentUser,
    isAdmin: isAdmin,
    loginAs: loginAs,
    logout: logout,
    qs: qs,
    qsa: qsa,
    esc: esc,
    icon: icon,
    money: money,
    dateShort: dateShort,
    dateLong: dateLong,
    typeLabel: typeLabel,
    statusLabel: statusLabel,
    typeBadge: typeBadge,
    statusBadge: statusBadge,
    badge: badge,
    param: param,
    slugify: slugify,
    productBySlug: productBySlug,
    productById: productById,
    publishedProducts: publishedProducts,
    effectivePrice: effectivePrice,
    orderById: orderById,
    nextOrderId: nextOrderId,
    ownedProducts: ownedProducts,
    progressFor: progressFor,
    completion: completion,
    safeNext: safeNext,
    productCard: productCard,
    articleCard: articleCard,
    serviceCard: serviceCard,
    toast: toast,
    openModal: openModal,
    closeModal: closeModal,
    confirmDialog: confirmDialog,
    renderHeader: renderHeader,
    renderFooter: renderFooter,
    adminSidebar: adminSidebar,
    adminGate: adminGate,
    notFoundHTML: notFoundHTML,
    emptyState: emptyState,
    buyProduct: buyProduct,
    registerPage: registerPage,
    pages: pages
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
