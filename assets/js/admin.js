/* ==========================================================================
   Meraki Bersama — Admin demo
   Dashboard, manajemen produk, dan order.
   ========================================================================== */
(function () {
  "use strict";

  const MB = window.MB;
  const DATA = MB.data;

  const THUMBNAILS = {
    document: "assets/images/product-ebook.jpg",
    photo: "assets/images/event-seminar-1.jpg",
    video: "assets/images/product-video.jpg",
    bundle: "assets/images/product-bundle.jpg",
    course: "assets/images/product-course.jpg"
  };

  function productTitle(id) {
    const product = MB.productById(id);
    return product ? product.title : "Produk demo (tidak tersedia)";
  }

  /* ---------------------------------------------------------------
     Dashboard
     --------------------------------------------------------------- */
  MB.registerPage("admin-dashboard", function () {
    const root = MB.qs("#admin-root");
    if (!root) return;
    if (!MB.adminGate(root)) return;

    const products = MB.state.products;
    const orders = MB.state.orders;
    const users = MB.state.users;
    const published = products.filter(function (product) { return product.status === "published"; });
    const success = orders.filter(function (order) { return order.status === "success"; });
    const revenue = success.reduce(function (sum, order) { return sum + Number(order.total); }, 0);
    const counts = {};
    DATA.orderStatuses.forEach(function (status) { counts[status] = 0; });
    orders.forEach(function (order) { counts[order.status] = (counts[order.status] || 0) + 1; });
    const maxStatus = Math.max.apply(null, DATA.orderStatuses.map(function (status) { return counts[status] || 0; }).concat([1]));

    const revenueByProduct = {};
    success.forEach(function (order) {
      order.items.forEach(function (item) {
        revenueByProduct[item.productId] = (revenueByProduct[item.productId] || 0) + Number(item.price);
      });
    });
    const topProducts = Object.keys(revenueByProduct)
      .map(function (id) { return { id: id, amount: revenueByProduct[id] }; })
      .sort(function (a, b) { return b.amount - a.amount; })
      .slice(0, 4);
    const maxRevenue = topProducts.length ? topProducts[0].amount : 1;

    const recent = orders.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); }).slice(0, 5);
    const recentRows = recent.map(function (order) {
      return "<tr>" +
        '<td><span class="cell-title">' + MB.esc(order.id) + '</span><span class="cell-sub">' + MB.dateShort(order.date) + "</span></td>" +
        '<td><span class="cell-title">' + MB.esc(order.customer.name) + '</span><span class="cell-sub">' + MB.esc(order.customer.email) + "</span></td>" +
        '<td class="cell-strong">' + MB.money(order.total) + "</td>" +
        "<td>" + MB.statusBadge(order.status) + "</td>" +
      "</tr>";
    }).join("");

    root.innerHTML =
      '<div class="admin-topbar">' +
        '<div><div class="detail-badges">' + MB.badge("Demo Data", "demo", true) + '</div><h1>Dashboard</h1><p>Ringkasan data mock produk, pengguna, order, dan penjualan.</p></div>' +
        '<div class="admin-actions"><a class="btn btn-outline btn-sm" href="admin-orders.html">Lihat order</a><a class="btn btn-primary btn-sm" href="admin-products.html">Kelola produk</a></div>' +
      "</div>" +

      '<div class="stat-grid">' +
        '<div class="stat-card"><div class="stat-head"><span class="stat-kicker">Produk published</span><span class="stat-icon">' + MB.icon("package", 17) + '</span></div><div class="stat-number">' + published.length + '</div><div class="stat-trend">' + (products.length - published.length) + " draft</div></div>" +
        '<div class="stat-card"><div class="stat-head"><span class="stat-kicker">Total order</span><span class="stat-icon">' + MB.icon("receipt", 17) + '</span></div><div class="stat-number">' + orders.length + '</div><div class="stat-trend">' + success.length + " sukses</div></div>" +
        '<div class="stat-card"><div class="stat-head"><span class="stat-kicker">Pengguna demo</span><span class="stat-icon">' + MB.icon("users", 17) + '</span></div><div class="stat-number">' + users.length + '</div><div class="stat-trend">Termasuk akun admin</div></div>' +
        '<div class="stat-card"><div class="stat-head"><span class="stat-kicker">Penjualan sukses</span><span class="stat-icon">' + MB.icon("chart", 17) + '</span></div><div class="stat-number" style="font-size:1.25rem">' + MB.money(revenue) + '</div><div class="stat-trend">Nilai simulasi</div></div>' +
      "</div>" +

      '<div class="admin-grid">' +
        '<section class="admin-panel">' +
          '<div class="panel-head"><h2 class="panel-title">Order terbaru</h2><a class="btn btn-outline btn-sm" href="admin-orders.html">Semua order</a></div>' +
          '<div class="table-wrap"><table class="data-table"><thead><tr><th>Order</th><th>Pembeli</th><th>Total</th><th>Status</th></tr></thead><tbody>' + recentRows + "</tbody></table></div>" +
        "</section>" +
        '<section class="admin-panel">' +
          '<div class="panel-head"><h2 class="panel-title">Status order</h2><span class="badge badge--demo">Mock</span></div>' +
          '<div class="panel-body"><div class="chart">' +
            DATA.orderStatuses.map(function (status) {
              const value = counts[status] || 0;
              return '<div class="chart-row"><span class="chart-label">' + MB.statusLabel(status) + '</span><div class="chart-track"><div class="chart-fill' + (status === "success" ? " chart-fill--accent" : "") + '" style="width:' + Math.round((value / maxStatus) * 100) + '%"></div></div><span class="chart-value">' + value + "</span></div>";
            }).join("") +
          "</div></div>" +
        "</section>" +
      "</div>" +

      '<div class="admin-grid">' +
        '<section class="admin-panel">' +
          '<div class="panel-head"><h2 class="panel-title">Pendapatan per produk</h2><span class="badge badge--demo">Mock</span></div>' +
          '<div class="panel-body"><div class="chart">' +
            (topProducts.length
              ? topProducts.map(function (item) {
                  return '<div class="chart-row"><span class="chart-label">' + MB.esc(productTitle(item.id).slice(0, 18)) + '</span><div class="chart-track"><div class="chart-fill" style="width:' + Math.round((item.amount / maxRevenue) * 100) + '%"></div></div><span class="chart-value">' + MB.money(item.amount) + "</span></div>";
                }).join("")
              : '<p class="muted small">Belum ada penjualan sukses pada data demo.</p>') +
          "</div></div>" +
        "</section>" +
        '<section class="admin-panel"><div class="panel-head"><h2 class="panel-title">Catatan demo</h2></div><div class="panel-body stack-sm">' +
          '<p class="small muted">Semua angka berasal dari data mock di browser. Tidak ada database, payment gateway, atau audit log server.</p>' +
          '<a class="btn btn-outline btn-block btn-sm" href="index.html">Lihat website publik</a>' +
          '<button class="btn btn-ghost btn-block btn-sm" type="button" data-action="logout">Keluar dari admin demo</button>' +
        "</div></section>" +
      "</div>";
  });

  /* ---------------------------------------------------------------
     Admin products
     --------------------------------------------------------------- */
  MB.registerPage("admin-products", function () {
    const root = MB.qs("#admin-root");
    if (!root) return;
    if (!MB.adminGate(root)) return;

    const filters = { q: "", status: "all", type: "all" };
    const typeOptions = Object.keys(DATA.typeLabels).map(function (type) {
      return '<option value="' + type + '">' + DATA.typeLabels[type] + "</option>";
    }).join("");

    root.innerHTML =
      '<div class="admin-topbar">' +
        '<div><div class="detail-badges">' + MB.badge("Demo Data", "demo", true) + '</div><h1>Manajemen Produk</h1><p>Ubah data produk, publish/draft, dan hapus produk demo.</p></div>' +
        '<div class="admin-actions"><button class="btn btn-primary btn-sm" type="button" id="add-product">' + MB.icon("plus", 15) + " Tambah produk</button></div>" +
      "</div>" +
      '<div class="admin-panel">' +
        '<div class="table-toolbar">' +
          '<div class="search-field">' + MB.icon("search", 18) + '<label class="sr-only" for="prod-search">Cari produk</label><input class="input" id="prod-search" type="search" placeholder="Cari nama atau kategori..."></div>' +
          '<div class="filter-field"><label for="prod-status">Status</label><select class="select" id="prod-status"><option value="all">Semua status</option><option value="published">Published</option><option value="draft">Draft</option></select></div>' +
          '<div class="filter-field"><label for="prod-type">Tipe</label><select class="select" id="prod-type"><option value="all">Semua tipe</option>' + typeOptions + "</select></div>" +
        "</div>" +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>Produk</th><th>Tipe</th><th>Kategori</th><th>Harga</th><th>Status</th><th>Aksi</th></tr></thead><tbody id="product-rows"></tbody></table></div>' +
        '<div class="panel-body flex-between"><span class="small muted" id="product-count"></span><button class="btn btn-outline btn-sm" type="button" id="reset-demo">' + MB.icon("refresh", 15) + " Reset data demo</button></div>" +
      "</div>";

    const rowsHost = MB.qs("#product-rows");
    const countHost = MB.qs("#product-count");

    function renderRows() {
      const query = filters.q.trim().toLowerCase();
      const items = MB.state.products.filter(function (product) {
        const matchQuery = !query ||
          (product.title + " " + product.category + " " + product.slug).toLowerCase().indexOf(query) !== -1;
        const matchStatus = filters.status === "all" || product.status === filters.status;
        const matchType = filters.type === "all" || product.type === filters.type;
        return matchQuery && matchStatus && matchType;
      });

      rowsHost.innerHTML = items.length
        ? items.map(function (product) {
            const published = product.status === "published";
            return "<tr>" +
              '<td><span class="cell-title">' + MB.esc(product.title) + '</span><span class="cell-sub">' + MB.esc(product.slug) + "</span></td>" +
              "<td>" + MB.typeBadge(product.type) + "</td>" +
              "<td>" + MB.esc(product.category) + "</td>" +
              '<td class="cell-strong">' + MB.money(MB.effectivePrice(product)) + "</td>" +
              "<td>" + MB.statusBadge(product.status) + "</td>" +
              '<td><div class="table-actions">' +
                '<button class="btn btn-outline btn-sm" type="button" data-edit="' + MB.esc(product.id) + '">Edit</button>' +
                '<button class="btn btn-ghost btn-sm" type="button" data-toggle="' + MB.esc(product.id) + '">' + (published ? "Draft" : "Publish") + "</button>" +
                '<button class="btn btn-ghost btn-sm" type="button" style="color:var(--danger)" data-delete="' + MB.esc(product.id) + '">Hapus</button>' +
              "</div></td>" +
            "</tr>";
          }).join("")
        : '<tr><td colspan="6" class="table-empty">Tidak ada produk yang cocok dengan filter.</td></tr>';

      countHost.textContent = items.length + " dari " + MB.state.products.length + " produk demo";
    }

    function openProductForm(product) {
      const editing = !!product;
      const body =
        '<form id="product-form" novalidate>' +
          '<div class="form-grid">' +
            '<div class="field span-2"><label for="ap-title">Nama produk</label><input class="input" id="ap-title" type="text" value="' + MB.esc(editing ? product.title : "") + '" autofocus><p class="field-error"></p></div>' +
            '<div class="field"><label for="ap-slug">Slug</label><input class="input" id="ap-slug" type="text" value="' + MB.esc(editing ? product.slug : "") + '"' + (editing ? " readonly" : "") + '><p class="field-error"></p></div>' +
            '<div class="field"><label for="ap-category">Kategori</label><input class="input" id="ap-category" type="text" value="' + MB.esc(editing ? product.category : "") + '" placeholder="Leadership"><p class="field-error"></p></div>' +
            '<div class="field"><label for="ap-type">Tipe konten</label><select class="select" id="ap-type">' +
              Object.keys(DATA.typeLabels).map(function (type) {
                return '<option value="' + type + '"' + (editing && product.type === type ? " selected" : "") + ">" + DATA.typeLabels[type] + "</option>";
              }).join("") +
            "</select><p class=\"field-error\"></p></div>" +
            '<div class="field"><label for="ap-status">Status</label><select class="select" id="ap-status">' +
              '<option value="published"' + (editing && product.status === "published" ? " selected" : "") + ">Published</option>" +
              '<option value="draft"' + (editing && product.status === "draft" ? " selected" : "") + ">Draft</option>" +
            "</select></div>" +
            '<div class="field"><label for="ap-price">Harga (Rp)</label><input class="input" id="ap-price" type="number" min="0" step="1000" value="' + (editing ? product.price : "") + '"><p class="field-error"></p></div>' +
            '<div class="field"><label for="ap-discount">Harga diskon <span class="optional">(opsional)</span></label><input class="input" id="ap-discount" type="number" min="0" step="1000" value="' + (editing && product.discountPrice ? product.discountPrice : "") + '"><p class="field-error"></p></div>' +
            '<div class="field span-2"><label for="ap-short">Deskripsi singkat</label><textarea class="textarea" id="ap-short" rows="3">' + MB.esc(editing ? product.shortDescription : "") + "</textarea><p class=\"field-error\"></p></div>" +
            '<label class="checkbox span-2"><input type="checkbox" id="ap-featured"' + (editing && product.featured ? " checked" : "") + "><span>Tampilkan sebagai produk unggulan di homepage</span></label>" +
          "</div>" +
          '<div class="notice-box mt-3">' + MB.icon("info", 19) + "<div>Perubahan disimpan ke state demo di browser. Reload tidak menghapus data; gunakan <strong>Reset data demo</strong> untuk kembali ke awal.</div></div>" +
        "</form>";

      MB.openModal({
        title: editing ? "Edit produk" : "Tambah produk",
        size: "modal-panel--lg",
        body: body,
        footer:
          '<button class="btn btn-outline btn-sm" type="button" data-modal-close>Batal</button>' +
          '<button class="btn btn-primary btn-sm" type="submit" form="product-form">Simpan produk</button>',
        onOpen: function (wrap) {
          const form = MB.qs("#product-form", wrap);
          const title = MB.qs("#ap-title", wrap);
          const slug = MB.qs("#ap-slug", wrap);
          if (!editing) {
            title.addEventListener("input", function () {
              slug.value = MB.slugify(title.value);
            });
          }

          form.addEventListener("submit", function (event) {
            event.preventDefault();
            MB.qsa(".field-error", form).forEach(function (slot) { slot.textContent = ""; });
            MB.qsa("[aria-invalid]", form).forEach(function (input) { input.removeAttribute("aria-invalid"); });

            const price = Number(MB.qs("#ap-price", wrap).value);
            const discountRaw = MB.qs("#ap-discount", wrap).value;
            const discount = discountRaw === "" ? null : Number(discountRaw);
            const short = MB.qs("#ap-short", wrap).value.trim();
            const category = MB.qs("#ap-category", wrap).value.trim();
            const type = MB.qs("#ap-type", wrap).value;
            let valid = true;

            if (!title.value.trim()) { MB.qs("#ap-title", wrap).setAttribute("aria-invalid", "true"); MB.qs("#ap-title", wrap).closest(".field").querySelector(".field-error").textContent = "Nama produk wajib diisi."; valid = false; }
            if (!category) { MB.qs("#ap-category", wrap).setAttribute("aria-invalid", "true"); MB.qs("#ap-category", wrap).closest(".field").querySelector(".field-error").textContent = "Kategori wajib diisi."; valid = false; }
            if (!price || price <= 0) { MB.qs("#ap-price", wrap).setAttribute("aria-invalid", "true"); MB.qs("#ap-price", wrap).closest(".field").querySelector(".field-error").textContent = "Harga harus lebih dari 0."; valid = false; }
            if (discount !== null && (discount <= 0 || discount >= price)) { MB.qs("#ap-discount", wrap).setAttribute("aria-invalid", "true"); MB.qs("#ap-discount", wrap).closest(".field").querySelector(".field-error").textContent = "Diskon harus lebih kecil dari harga."; valid = false; }
            if (!valid) return;

            let finalSlug = slug.value.trim() ? MB.slugify(slug.value) : MB.slugify(title.value);
            if (!finalSlug) finalSlug = "produk-demo";
            if (!editing) {
              let candidate = finalSlug;
              let counter = 2;
              while (MB.state.products.some(function (item) { return item.slug === candidate; })) {
                candidate = finalSlug + "-" + counter;
                counter += 1;
              }
              finalSlug = candidate;
            }

            if (editing) {
              product.title = title.value.trim();
              product.category = category;
              product.type = type;
              product.status = MB.qs("#ap-status", wrap).value;
              product.price = price;
              product.discountPrice = discount;
              product.shortDescription = short || "Produk demo tanpa deskripsi.";
              product.duration = product.duration || "Materi demo";
              product.accessLabel = product.accessLabel || "Akses demo";
              product.featured = MB.qs("#ap-featured", wrap).checked;
            } else {
              MB.state.products.push({
                id: "p" + Date.now(),
                slug: finalSlug,
                title: title.value.trim(),
                shortDescription: short || "Produk demo tanpa deskripsi.",
                description: "<p>" + MB.esc(short || "Produk demo yang dibuat dari panel admin.") + "</p>",
                category: category,
                type: type,
                price: price,
                discountPrice: discount,
                thumbnail: THUMBNAILS[type] || "assets/images/product-course.jpg",
                previewAvailable: false,
                accessLabel: "Akses demo",
                status: MB.qs("#ap-status", wrap).value,
                featured: MB.qs("#ap-featured", wrap).checked,
                author: "Admin Demo",
                level: "Semua level",
                duration: "Materi demo",
                benefits: [],
                includes: [],
                contentItems: []
              });
            }

            MB.save();
            MB.closeModal(true);
            renderRows();
            MB.toast(editing ? "Produk diperbarui pada state demo." : "Produk baru ditambahkan pada state demo.", "success", "Admin");
          });
        }
      });
    }

    MB.qs("#prod-search").addEventListener("input", function (event) {
      filters.q = event.target.value;
      renderRows();
    });
    MB.qs("#prod-status").addEventListener("change", function (event) {
      filters.status = event.target.value;
      renderRows();
    });
    MB.qs("#prod-type").addEventListener("change", function (event) {
      filters.type = event.target.value;
      renderRows();
    });
    MB.qs("#add-product").addEventListener("click", function () { openProductForm(null); });

    MB.qs("#reset-demo").addEventListener("click", function () {
      MB.confirmDialog({
        title: "Reset data demo?",
        message: "Semua perubahan produk, order, dan progres akan dihapus dan kembali ke data awal. Tindakan ini tidak dapat dibatalkan.",
        confirmLabel: "Reset data",
        danger: true,
        onConfirm: function () {
          try { window.localStorage.removeItem("meraki_demo_state_v1"); } catch (error) { /* abaikan */ }
          try { window.name = ""; } catch (error) { /* abaikan */ }
          window.location.reload();
        }
      });
    });

    rowsHost.addEventListener("click", function (event) {
      const edit = event.target.closest("[data-edit]");
      if (edit) {
        const product = MB.productById(edit.dataset.edit);
        if (product) openProductForm(product);
        return;
      }

      const toggle = event.target.closest("[data-toggle]");
      if (toggle) {
        const product = MB.productById(toggle.dataset.toggle);
        if (!product) return;
        product.status = product.status === "published" ? "draft" : "published";
        MB.save();
        renderRows();
        MB.toast("Status diubah menjadi " + MB.statusLabel(product.status) + ".", "info", "Admin");
        return;
      }

      const remove = event.target.closest("[data-delete]");
      if (remove) {
        const product = MB.productById(remove.dataset.delete);
        if (!product) return;
        MB.confirmDialog({
          title: "Hapus produk?",
          message: "\"" + product.title + "\" akan dihapus dari katalog demo. Order lama yang merujuk produk ini akan menampilkan fallback.",
          confirmLabel: "Hapus produk",
          danger: true,
          onConfirm: function () {
            MB.state.products = MB.state.products.filter(function (item) { return item.id !== product.id; });
            MB.save();
            renderRows();
            MB.toast("Produk dihapus dari state demo.", "success", "Admin");
          }
        });
      }
    });

    renderRows();
  });

  /* ---------------------------------------------------------------
     Admin orders
     --------------------------------------------------------------- */
  MB.registerPage("admin-orders", function () {
    const root = MB.qs("#admin-root");
    if (!root) return;
    if (!MB.adminGate(root)) return;

    const filters = { q: "", status: "all" };

    root.innerHTML =
      '<div class="admin-topbar">' +
        '<div><div class="detail-badges">' + MB.badge("Demo Data", "demo", true) + '</div><h1>Manajemen Order</h1><p>Periksa order mock berdasarkan status dan pembeli. Tidak ada tindakan refund nyata.</p></div>' +
        '<div class="admin-actions"><a class="btn btn-outline btn-sm" href="admin-products.html">Kelola produk</a></div>' +
      "</div>" +
      '<div class="admin-panel">' +
        '<div class="table-toolbar">' +
          '<div class="search-field">' + MB.icon("search", 18) + '<label class="sr-only" for="order-search">Cari order</label><input class="input" id="order-search" type="search" placeholder="Cari nomor order, nama, atau email..."></div>' +
          '<div class="filter-field"><label for="order-status">Status</label><select class="select" id="order-status"><option value="all">Semua status</option>' +
            DATA.orderStatuses.map(function (status) { return '<option value="' + status + '">' + MB.statusLabel(status) + "</option>"; }).join("") +
          "</select></div>" +
        "</div>" +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>Order</th><th>Pembeli</th><th>Item</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead><tbody id="order-rows"></tbody></table></div>' +
        '<div class="panel-body"><span class="small muted" id="order-count"></span></div>' +
      "</div>";

    const rowsHost = MB.qs("#order-rows");
    const countHost = MB.qs("#order-count");

    function renderRows() {
      const query = filters.q.trim().toLowerCase();
      const items = MB.state.orders
        .filter(function (order) {
          const matchQuery = !query ||
            (order.id + " " + order.customer.name + " " + order.customer.email).toLowerCase().indexOf(query) !== -1;
          const matchStatus = filters.status === "all" || order.status === filters.status;
          return matchQuery && matchStatus;
        })
        .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

      rowsHost.innerHTML = items.length
        ? items.map(function (order) {
            return "<tr>" +
              '<td><span class="cell-title">' + MB.esc(order.id) + '</span><span class="cell-sub">' + MB.dateLong(order.date) + "</span></td>" +
              '<td><span class="cell-title">' + MB.esc(order.customer.name) + '</span><span class="cell-sub">' + MB.esc(order.customer.email) + "</span></td>" +
              "<td>" + order.items.length + " item</td>" +
              '<td class="cell-strong">' + MB.money(order.total) + "</td>" +
              "<td>" + MB.statusBadge(order.status) + "</td>" +
              '<td><button class="btn btn-outline btn-sm" type="button" data-order="' + MB.esc(order.id) + '">Detail</button></td>' +
            "</tr>";
          }).join("")
        : '<tr><td colspan="6" class="table-empty">Tidak ada order yang cocok dengan filter.</td></tr>';

      countHost.textContent = items.length + " dari " + MB.state.orders.length + " order demo";
    }

    function openOrder(order) {
      const items = order.items.map(function (item) {
        return '<div class="summary-row"><span>' + MB.esc(productTitle(item.productId)) + "</span><strong>" + MB.money(item.price) + "</strong></div>";
      }).join("");

      MB.openModal({
        title: "Order " + order.id,
        body:
          '<div class="stack">' +
            '<div class="flex-between"><span class="muted small">Status</span>' + MB.statusBadge(order.status) + "</div>" +
            '<div class="summary-row"><span>Tanggal</span><strong>' + MB.dateLong(order.date) + "</strong></div>" +
            '<div class="summary-row"><span>Metode</span><strong>' + MB.esc(order.paymentMethod) + "</strong></div>" +
            '<div class="summary-row"><span>Pembeli</span><strong>' + MB.esc(order.customer.name) + "</strong></div>" +
            '<div class="summary-row"><span>Email</span><strong>' + MB.esc(order.customer.email) + "</strong></div>" +
            "<hr>" + items +
            '<div class="summary-total"><span>Total</span><strong>' + MB.money(order.total) + "</strong></div>" +
            '<div class="notice-box notice-box--info">' + MB.icon("info", 19) + "<div>Order ini hanya data mock. Tidak ada refund, penagihan, atau perubahan status pembayaran nyata dari panel ini.</div></div>" +
          "</div>",
        footer: '<button class="btn btn-primary btn-sm" type="button" data-modal-close>Tutup</button>'
      });
    }

    MB.qs("#order-search").addEventListener("input", function (event) {
      filters.q = event.target.value;
      renderRows();
    });
    MB.qs("#order-status").addEventListener("change", function (event) {
      filters.status = event.target.value;
      renderRows();
    });
    rowsHost.addEventListener("click", function (event) {
      const button = event.target.closest("[data-order]");
      if (!button) return;
      const order = MB.orderById(button.dataset.order);
      if (order) openOrder(order);
    });

    renderRows();
  });
})();
