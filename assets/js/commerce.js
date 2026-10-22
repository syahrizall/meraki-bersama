/* ==========================================================================
   Meraki Bersama — Auth, checkout, payment result, account
   ========================================================================== */
(function () {
  "use strict";

  const MB = window.MB;
  const DATA = MB.data;

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

  function alertBox(host, message, type) {
    if (!host) return;
    host.hidden = false;
    host.innerHTML = '<div class="alert alert--' + (type || "error") + '">' +
      MB.icon(type === "success" ? "checkCircle" : "alert", 18) +
      "<div>" + message + "</div></div>";
  }

  function lockForm(form, label) {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    button.disabled = true;
    button.textContent = label || "Memproses...";
  }

  function authGate(message) {
    return '<div class="empty-state">' +
      '<span class="empty-icon">' + MB.icon("lock", 26) + "</span>" +
      "<h3>Masuk ke akun demo</h3>" +
      "<p>" + MB.esc(message) + "</p>" +
      '<div class="cluster" style="justify-content:center">' +
        '<a class="btn btn-primary" href="login.html?next=' + encodeURIComponent("account.html") + '">Masuk</a>' +
        '<button class="btn btn-outline" type="button" data-demo-login="customer">Masuk sebagai Demo Customer</button>' +
      "</div>" +
      '<p class="field-hint">customer@meraki.demo · demo1234</p>' +
    "</div>";
  }

  /* ---------------------------------------------------------------
     Login
     --------------------------------------------------------------- */
  MB.registerPage("login", function () {
    const form = MB.qs("#login-form");
    if (!form) return;
    const alert = MB.qs("#login-alert");
    const next = MB.safeNext(MB.param("next"), "account.html");
    const user = MB.currentUser();
    const sessionBox = MB.qs("#login-session");

    if (user && sessionBox) {
      sessionBox.hidden = false;
      sessionBox.innerHTML = '<div class="alert alert--info">' + MB.icon("info", 18) +
        "<div><strong>Anda sudah masuk sebagai " + MB.esc(user.name) + ".</strong><br>" +
        '<a href="' + MB.esc(next) + '">Lanjutkan ke halaman tujuan</a> atau masuk dengan akun demo lain di bawah.</div></div>';
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(form);
      if (alert) alert.hidden = true;

      const email = MB.qs("#login-email");
      const password = MB.qs("#login-password");
      let valid = true;

      if (!email.value.trim()) { setError(email, "Email wajib diisi."); valid = false; }
      else if (!validEmail(email.value)) { setError(email, "Format email belum benar."); valid = false; }
      if (!password.value) { setError(password, "Password wajib diisi."); valid = false; }
      if (!valid) {
        const first = MB.qs("[aria-invalid=\"true\"]", form);
        if (first) first.focus();
        return;
      }

      const found = MB.state.users.find(function (item) {
        return String(item.email).toLowerCase() === email.value.trim().toLowerCase();
      });

      if (!found || !MB.verifyPassword(found, password.value)) {
        alertBox(alert, "<strong>Email atau password demo tidak cocok.</strong><br>Gunakan kredensial demo yang tertera di halaman ini.", "error");
        setError(password, "Periksa kembali password demo Anda.");
        password.focus();
        return;
      }

      MB.state.session = { email: found.email, role: found.role };
      MB.save();
      lockForm(form, "Mengalihkan...");
      MB.toast("Selamat datang, " + found.name + ".", "success", "Login demo");
      window.setTimeout(function () { window.location.href = next; }, 450);
    });
  });

  /* ---------------------------------------------------------------
     Register
     --------------------------------------------------------------- */
  MB.registerPage("register", function () {
    const form = MB.qs("#register-form");
    if (!form) return;
    const alert = MB.qs("#register-alert");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(form);
      if (alert) alert.hidden = true;

      const name = MB.qs("#reg-name");
      const email = MB.qs("#reg-email");
      const password = MB.qs("#reg-password");
      const confirm = MB.qs("#reg-confirm");
      const terms = MB.qs("#reg-terms");
      let valid = true;

      if (name.value.trim().length < 2) { setError(name, "Nama minimal 2 karakter."); valid = false; }
      if (!validEmail(email.value)) { setError(email, "Masukkan alamat email yang valid."); valid = false; }
      else if (MB.state.users.some(function (item) {
        return String(item.email).toLowerCase() === email.value.trim().toLowerCase();
      })) {
        setError(email, "Email ini sudah terdaftar pada data demo.");
        valid = false;
      }
      if (password.value.length < 8) { setError(password, "Password minimal 8 karakter."); valid = false; }
      if (confirm.value !== password.value) { setError(confirm, "Konfirmasi password belum cocok."); valid = false; }

      const termsError = MB.qs("#reg-terms-error");
      if (!terms.checked) {
        if (termsError) termsError.textContent = "Centang persetujuan untuk melanjutkan.";
        valid = false;
      } else if (termsError) {
        termsError.textContent = "";
      }

      if (!valid) {
        const first = MB.qs("[aria-invalid=\"true\"]", form);
        if (first) first.focus();
        return;
      }

      const newUser = {
        id: "u" + Date.now(),
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value,
        role: "customer",
        joined: new Date().toISOString().slice(0, 10)
      };
      MB.state.users.push(newUser);
      MB.state.session = { email: newUser.email, role: "customer" };
      MB.save();
      lockForm(form, "Membuat akun...");
      MB.toast("Akun demo berhasil dibuat.", "success", "Registrasi");
      window.setTimeout(function () { window.location.href = "account.html?welcome=1"; }, 500);
    });
  });

  /* ---------------------------------------------------------------
     Forgot password
     --------------------------------------------------------------- */
  MB.registerPage("forgot-password", function () {
    const form = MB.qs("#forgot-form");
    if (!form) return;
    const result = MB.qs("#forgot-result");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(form);
      const email = MB.qs("#forgot-email");
      if (!validEmail(email.value)) {
        setError(email, "Masukkan alamat email yang valid.");
        email.focus();
        return;
      }

      form.hidden = true;
      result.hidden = false;
      result.innerHTML = '<div class="alert alert--success">' + MB.icon("checkCircle", 18) +
        "<div><strong>Permintaan reset dicatat pada demo.</strong><br>Jika email <strong>" + MB.esc(email.value) +
        "</strong> terdaftar, tautan reset akan dikirim. Demo ini tidak mengirim email sungguhan.</div></div>" +
        '<div class="cluster mt-3"><a class="btn btn-primary" href="login.html">Kembali ke login</a>' +
        '<button class="btn btn-outline" type="button" id="forgot-again">Coba email lain</button></div>';
      const again = MB.qs("#forgot-again");
      if (again) {
        again.addEventListener("click", function () {
          result.hidden = true;
          form.hidden = false;
          form.reset();
          email.focus();
        });
      }
    });
  });

  /* ---------------------------------------------------------------
     Checkout
     --------------------------------------------------------------- */
  MB.registerPage("checkout", function () {
    const root = MB.qs("#checkout-root");
    if (!root) return;
    const slug = MB.param("slug") || (MB.state.checkout && MB.state.checkout.slug);
    const product = MB.productBySlug(slug);

    if (!product || product.status !== "published") {
      root.innerHTML = MB.emptyState({
        icon: "package",
        title: "Belum ada produk yang dipilih",
        text: "Pilih produk dari katalog terlebih dahulu untuk mencoba alur checkout demo.",
        actionHref: "products.html",
        actionLabel: "Buka katalog"
      });
      return;
    }

    MB.state.checkout = { slug: product.slug };
    MB.save();

    const user = MB.currentUser();
    const total = MB.effectivePrice(product);
    const discount = product.discountPrice ? product.price - product.discountPrice : 0;
    const next = "checkout.html?slug=" + encodeURIComponent(product.slug);

    const summary =
      '<aside class="summary-card" aria-label="Ringkasan pesanan">' +
        '<h2 class="summary-title">Ringkasan Pesanan</h2>' +
        '<div class="order-line">' +
          '<div class="order-line-media"><img src="' + MB.esc(product.thumbnail) + '" alt="' + MB.esc(product.title) + '" data-fallback="Produk"></div>' +
          '<div class="order-line-info"><h4>' + MB.esc(product.title) + "</h4><p>" + MB.esc(MB.typeLabel(product.type)) + " · " + MB.esc(product.accessLabel) + "</p></div>" +
        "</div>" +
        '<div class="summary-row"><span>Harga</span><strong>' + MB.money(product.price) + "</strong></div>" +
        (discount ? '<div class="summary-row"><span>Diskon demo</span><strong style="color:var(--success)">−' + MB.money(discount) + "</strong></div>" : "") +
        '<div class="summary-row"><span>Biaya layanan</span><strong>Rp 0</strong></div>' +
        '<div class="summary-total"><span>Total</span><strong>' + MB.money(total) + "</strong></div>" +
        '<div class="notice-box mt-2">' + MB.icon("alert", 19) + "<div><strong>Simulasi.</strong> Tidak ada tagihan atau pembayaran nyata pada halaman ini.</div></div>" +
      "</aside>";

    if (!user) {
      root.innerHTML =
        '<div class="checkout-grid">' +
          '<div class="form-card">' +
            '<span class="eyebrow">Satu langkah lagi</span>' +
            '<h2 class="section-title" style="font-size:1.5rem">Masuk untuk melanjutkan checkout</h2>' +
            '<p class="muted mt-1">Checkout demo memakai sesi customer agar produk yang dibeli bisa muncul di My Library. Tidak ada autentikasi server.</p>' +
            '<div class="cluster mt-3">' +
              '<a class="btn btn-primary" href="login.html?next=' + encodeURIComponent(next) + '">Masuk</a>' +
              '<a class="btn btn-outline" href="register.html">Registrasi demo</a>' +
            "</div>" +
            '<div class="divider">atau</div>' +
            '<button class="btn btn-dark btn-block" type="button" data-demo-login="customer">Masuk sebagai Demo Customer</button>' +
            '<p class="field-hint mt-2">customer@meraki.demo · demo1234</p>' +
          "</div>" +
          summary +
        "</div>";
      return;
    }

    const methods = DATA.paymentMethods.map(function (method, index) {
      return '<label class="radio-card">' +
        '<input type="radio" name="payment" value="' + MB.esc(method.id) + '" data-label="' + MB.esc(method.label + " (Demo)") + '"' + (index === 0 ? " checked" : "") + ">" +
        "<span><strong>" + MB.esc(method.label) + "</strong><span>" + MB.esc(method.note) + "</span></span>" +
      "</label>";
    }).join("");

    root.innerHTML =
      '<div class="checkout-grid">' +
        '<form class="form-card" id="checkout-form" novalidate>' +
          '<span class="eyebrow">Checkout demo</span>' +
          '<h2 class="section-title" style="font-size:1.55rem">Data pembeli</h2>' +
          '<p class="muted mt-1">Data hanya dipakai di browser untuk mensimulasikan alur pembelian.</p>' +
          '<div id="checkout-alert" hidden></div>' +
          '<div class="form-grid mt-3">' +
            '<div class="field"><label for="co-name">Nama lengkap</label><input class="input" id="co-name" type="text" value="' + MB.esc(user.name) + '" autocomplete="name"><p class="field-error"></p></div>' +
            '<div class="field"><label for="co-email">Email akun</label><input class="input" id="co-email" type="email" value="' + MB.esc(user.email) + '" readonly><p class="field-hint">Email mengikuti akun demo yang sedang masuk.</p></div>' +
          "</div>" +
          '<h3 class="mt-4" style="font-size:1rem">Metode pembayaran (demo)</h3>' +
          '<div class="payment-options mt-2">' + methods + "</div>" +
          '<label class="checkbox mt-3"><input type="checkbox" id="co-terms"><span>Saya memahami bahwa ini adalah <strong>transaksi simulasi</strong> dan tidak ada pembayaran nyata. <a href="index.html" data-action="demo-policy">Kebijakan demo</a>.</span></label>' +
          '<p class="field-error" id="co-terms-error"></p>' +
          '<button class="btn btn-primary btn-lg btn-block mt-3" type="submit">Konfirmasi Pembelian (Demo)</button>' +
          '<p class="field-hint text-center mt-2">Total dihitung dari data mock, bukan input bebas.</p>' +
        "</form>" +
        summary +
      "</div>";

    const form = MB.qs("#checkout-form");
    const alert = MB.qs("#checkout-alert");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(form);
      if (alert) alert.hidden = true;

      const name = MB.qs("#co-name");
      const terms = MB.qs("#co-terms");
      const termsError = MB.qs("#co-terms-error");
      const payment = form.querySelector('input[name="payment"]:checked');
      let valid = true;

      if (name.value.trim().length < 2) { setError(name, "Nama minimal 2 karakter."); valid = false; }
      if (!payment) { alertBox(alert, "Pilih metode pembayaran demo.", "error"); valid = false; }
      if (!terms.checked) { termsError.textContent = "Centang persetujuan sebelum melanjutkan."; valid = false; }
      else { termsError.textContent = ""; }

      if (!valid) {
        const first = MB.qs("[aria-invalid=\"true\"]", form);
        if (first) first.focus();
        return;
      }

      const order = {
        id: MB.nextOrderId(),
        date: new Date().toISOString(),
        customer: { name: name.value.trim(), email: user.email },
        items: [{ productId: product.id, price: total }],
        total: total,
        status: "pending",
        paymentMethod: payment.dataset.label
      };
      lockForm(form, "Membuat order...");
      MB.state.orders.push(order);
      MB.state.lastOrderId = order.id;
      MB.state.checkout = null;
      MB.save();
      MB.toast("Order demo dibuat: " + order.id, "success", "Checkout");
      window.setTimeout(function () {
        window.location.href = "payment-result.html?order=" + encodeURIComponent(order.id) + "&status=success";
      }, 450);
    });
  });

  /* ---------------------------------------------------------------
     Payment result
     --------------------------------------------------------------- */
  const RESULT_COPY = {
    success: {
      icon: "checkCircle",
      title: "Pembayaran demo berhasil",
      text: "Produk sudah ditambahkan ke My Library demo Anda. Tidak ada pembayaran nyata yang diproses."
    },
    pending: {
      icon: "clock",
      title: "Menunggu pembayaran",
      text: "Status ini disimulasikan. Pada sistem nyata, halaman akan menunggu konfirmasi payment gateway sebelum memberi akses."
    },
    failed: {
      icon: "alert",
      title: "Pembayaran gagal",
      text: "Simulasi status gagal. Produk belum ditambahkan ke library. Anda dapat mencoba checkout lagi."
    },
    expired: {
      icon: "calendar",
      title: "Sesi pembayaran kedaluwarsa",
      text: "Simulasi status expired. Buat order demo baru untuk melanjutkan."
    }
  };

  MB.registerPage("payment-result", function () {
    const root = MB.qs("#result-root");
    if (!root) return;
    const user = MB.currentUser();
    let order = MB.orderById(MB.param("order"));

    if (!order && user) {
      const own = MB.state.orders
        .filter(function (item) { return String(item.customer.email).toLowerCase() === String(user.email).toLowerCase(); })
        .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      order = own[0] || null;
    }

    if (!order) {
      root.innerHTML = MB.emptyState({
        icon: "receipt",
        title: "Order demo tidak ditemukan",
        text: "Buka halaman ini dari alur checkout, atau pilih order dari halaman akun.",
        actionHref: "products.html",
        actionLabel: "Kembali ke katalog"
      });
      return;
    }

    const requested = MB.param("status");
    if (requested && DATA.orderStatuses.indexOf(requested) !== -1 && order.status !== requested) {
      order.status = requested;
      MB.save();
    }

    const copy = RESULT_COPY[order.status] || RESULT_COPY.pending;
    const product = order.items.length ? MB.productById(order.items[0].productId) : null;
    const retryHref = product ? "checkout.html?slug=" + encodeURIComponent(product.slug) : "products.html";

    const itemsHTML = order.items.map(function (item) {
      const productItem = MB.productById(item.productId);
      const title = productItem ? productItem.title : "Produk demo (tidak tersedia)";
      return '<div class="summary-row"><span>' + MB.esc(title) + "</span><strong>" + MB.money(item.price) + "</strong></div>";
    }).join("");

    const actions = order.status === "success"
      ? '<a class="btn btn-primary" href="my-library.html">Buka My Library</a><a class="btn btn-outline" href="products.html">Jelajahi katalog</a>'
      : order.status === "pending"
        ? '<a class="btn btn-primary" href="account.html">Lihat order di akun</a><a class="btn btn-outline" href="products.html">Kembali ke katalog</a>'
        : '<a class="btn btn-primary" href="' + retryHref + '">Coba checkout lagi</a><a class="btn btn-outline" href="products.html">Kembali ke katalog</a>';

    root.innerHTML =
      '<div class="result-shell" data-status="' + MB.esc(order.status) + '">' +
        '<div class="result-icon">' + MB.icon(copy.icon, 38) + "</div>" +
        '<span class="badge badge--demo">Status simulasi</span>' +
        "<h1>" + MB.esc(copy.title) + "</h1>" +
        '<p class="result-sub">' + MB.esc(copy.text) + "</p>" +
        '<div class="result-summary">' +
          '<div class="summary-row"><span>Nomor order</span><strong>' + MB.esc(order.id) + "</strong></div>" +
          '<div class="summary-row"><span>Tanggal</span><strong>' + MB.dateLong(order.date) + "</strong></div>" +
          '<div class="summary-row"><span>Metode</span><strong>' + MB.esc(order.paymentMethod) + "</strong></div>" +
          '<div class="summary-row"><span>Status</span><strong>' + MB.statusBadge(order.status) + "</strong></div>" +
          itemsHTML +
          '<div class="summary-total"><span>Total</span><strong>' + MB.money(order.total) + "</strong></div>" +
        "</div>" +
        '<div class="result-actions">' + actions + "</div>" +
        '<div class="demo-switcher">' +
          "<p>Simulasikan status pembayaran</p>" +
          '<div class="filter-chips">' +
            DATA.orderStatuses.map(function (status) {
              return '<a class="chip' + (status === order.status ? " is-active" : "") + '" href="payment-result.html?order=' +
                encodeURIComponent(order.id) + "&status=" + status + '">' + MB.statusLabel(status) + "</a>";
            }).join("") +
          "</div>" +
          '<p class="field-hint mt-2">Status diubah manual untuk presentasi. Tidak ada payment gateway yang terhubung.</p>' +
        "</div>" +
      "</div>";
  });

  /* ---------------------------------------------------------------
     Account
     --------------------------------------------------------------- */
  MB.registerPage("account", function () {
    const root = MB.qs("#account-root");
    if (!root) return;
    const user = MB.currentUser();

    if (!user) {
      root.innerHTML = authGate("Halaman akun menampilkan profil, order, dan library demo. Masuk dengan akun demo untuk melanjutkan.");
      return;
    }

    const welcome = MB.param("welcome");
    const owned = MB.ownedProducts(user.email);
    const orders = MB.state.orders
      .filter(function (order) { return String(order.customer.email).toLowerCase() === String(user.email).toLowerCase(); })
      .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    const spent = orders.filter(function (order) { return order.status === "success"; })
      .reduce(function (sum, order) { return sum + Number(order.total); }, 0);
    const initials = user.name.split(" ").map(function (part) { return part.charAt(0); }).slice(0, 2).join("").toUpperCase();

    const rows = orders.map(function (order) {
      const firstItem = order.items.length ? MB.productById(order.items[0].productId) : null;
      return "<tr>" +
        '<td><span class="cell-title">' + MB.esc(order.id) + "</span><span class=\"cell-sub\">" + MB.dateShort(order.date) + "</span></td>" +
        '<td><span class="cell-title">' + MB.esc(firstItem ? firstItem.title : "Produk demo") + "</span><span class=\"cell-sub\">" + order.items.length + " item</span></td>" +
        '<td class="cell-strong">' + MB.money(order.total) + "</td>" +
        "<td>" + MB.statusBadge(order.status) + "</td>" +
        '<td><a class="btn btn-outline btn-sm" href="payment-result.html?order=' + encodeURIComponent(order.id) + '">Lihat</a></td>' +
      "</tr>";
    }).join("");

    root.innerHTML =
      (welcome ? '<div class="alert alert--success mb-3">' + MB.icon("checkCircle", 18) + "<div><strong>Akun demo berhasil dibuat.</strong> Selamat datang, " + MB.esc(user.name) + ". Library Anda masih kosong — mulai dari katalog.</div></div>" : "") +
      '<div class="account-hero">' +
        '<div class="avatar" aria-hidden="true">' + MB.esc(initials) + "</div>" +
        "<div><h1>" + MB.esc(user.name) + "</h1><p>" + MB.esc(user.email) + " · " + (user.role === "admin" ? "Admin demo" : "Customer demo") + "</p></div>" +
        '<div class="account-actions"><a class="btn btn-light btn-sm" href="my-library.html">My Library</a><a class="btn btn-light btn-sm" href="#order-history">Riwayat order</a></div>' +
      "</div>" +
      '<div class="stat-grid mt-3">' +
        '<div class="stat-card"><div class="stat-head"><span class="stat-kicker">Produk dimiliki</span><span class="stat-icon">' + MB.icon("package", 17) + '</span></div><div class="stat-number">' + owned.length + '</div><div class="stat-trend">Akses demo</div></div>' +
        '<div class="stat-card"><div class="stat-head"><span class="stat-kicker">Total order</span><span class="stat-icon">' + MB.icon("receipt", 17) + '</span></div><div class="stat-number">' + orders.length + '</div><div class="stat-trend">Termasuk pending</div></div>' +
        '<div class="stat-card"><div class="stat-head"><span class="stat-kicker">Pembelian sukses</span><span class="stat-icon">' + MB.icon("checkCircle", 17) + '</span></div><div class="stat-number">' + MB.money(spent) + '</div><div class="stat-trend">Nilai simulasi</div></div>' +
        '<div class="stat-card"><div class="stat-head"><span class="stat-kicker">Status akun</span><span class="stat-icon">' + MB.icon("user", 17) + '</span></div><div class="stat-number" style="font-size:1.15rem">Aktif (demo)</div><div class="stat-trend">Tanpa autentikasi server</div></div>' +
      "</div>" +
      '<div class="admin-grid mt-3">' +
        '<section class="admin-panel" id="order-history">' +
          '<div class="panel-head"><h2 class="panel-title">Order history</h2><a class="btn btn-outline btn-sm" href="products.html">Belanja lagi</a></div>' +
          (orders.length
            ? '<div class="table-wrap"><table class="data-table"><thead><tr><th>Order</th><th>Produk</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead><tbody>' + rows + "</tbody></table></div>"
            : '<div class="table-empty">Belum ada order demo. Coba checkout dari katalog.</div>') +
        "</section>" +
        '<aside class="admin-panel"><div class="panel-head"><h2 class="panel-title">Pintasan</h2></div><div class="panel-body stack-sm">' +
          '<a class="btn btn-primary btn-block" href="my-library.html">Buka My Library</a>' +
          '<a class="btn btn-outline btn-block" href="products.html">Jelajahi katalog</a>' +
          (user.role === "admin" ? '<a class="btn btn-dark btn-block" href="admin-dashboard.html">Buka Admin Demo</a>' : "") +
          '<button class="btn btn-ghost btn-block" type="button" data-action="logout">Keluar dari akun demo</button>' +
          '<p class="field-hint">Data akun, order, dan library hanya tersimpan di browser dan dapat di-reset dari panel admin.</p>' +
        "</div></aside>" +
      "</div>";
  });
})();
