 <!-- ============================================================
       JAVASCRIPT
       ============================================================ -->

    /* ── JS 1: ANNOUNCEMENT BAR CLOSE ─────────────────────────── */
    document.getElementById('announcementClose').addEventListener('click', function () {
      document.getElementById('announcement').style.display = 'none';
    });


    /* ── JS 2: STICKY HEADER SHADOW ───────────────────────────── */
    window.addEventListener('scroll', function () {
      const header = document.getElementById('header');
      header.classList.toggle('elevated', window.scrollY > 10);
    });


    /* ── JS 3: PRODUCT FILTER CHIPS ───────────────────────────── */
    const filterChips = document.querySelectorAll('.filter-chip');
    const prodCards   = document.querySelectorAll('.prod-card');

    filterChips.forEach(chip => {
      chip.addEventListener('click', function () {
        filterChips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        prodCards.forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
        });
      });
    });


    /* ── JS 4: WISHLIST HEART TOGGLE ───────────────────────────── */
    document.querySelectorAll('[data-wish]').forEach(btn => {
      btn.addEventListener('click', function () {
        const liked = this.classList.toggle('liked');
        this.textContent = liked ? '♥' : '♡';
        this.setAttribute('aria-label', liked ? 'Remove from wishlist' : 'Add to wishlist');
      });
    });


    /* ── JS 5: CART SYSTEM ─────────────────────────────────────── */
    let cart = [];

    const cartDrawer   = document.getElementById('cartDrawer');
    const cartOverlay  = document.getElementById('cartOverlay');
    const cartItemsEl  = document.getElementById('cartItems');
    const cartFooterEl = document.getElementById('cartFooter');
    const cartBadge    = document.getElementById('cartBadge');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal    = document.getElementById('cartTotal');

    function openCart() {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.getElementById('cartToggle').addEventListener('click', openCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    document.getElementById('continueShopping').addEventListener('click', closeCart);

    function renderCart() {
      const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
      cartBadge.textContent = totalQty;

      const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      cartSubtotal.textContent = '$' + subtotal.toFixed(2);
      cartTotal.textContent    = '$' + subtotal.toFixed(2);

      cartFooterEl.style.display = cart.length > 0 ? 'block' : 'none';

      if (cart.length === 0) {
        cartItemsEl.innerHTML = `
          <div class="cart-empty">
            <div class="cart-empty__icon">🏀</div>
            <p style="font-weight:700; color:#e8e8e8;">Your bag is empty.</p>
            <p style="font-size:0.85rem; color:var(--clr-muted); margin-top:4px;">Add some gear and get after it.</p>
          </div>
        `;
        return;
      }

      cartItemsEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <img class="cart-item__img" src="${item.img}" alt="${item.name}" />
          <div class="cart-item__info">
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__variant">Size M / Black</div>
            <div class="cart-item__qty-row">
              <div class="qty-control">
                <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${index}, +1)">+</button>
              </div>
              <span class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</span>
            </div>
          </div>
          <button class="cart-item__remove" onclick="removeItem(${index})" aria-label="Remove item">✕</button>
        </div>
      `).join('');
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', function () {
        const name  = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const img   = this.dataset.img;

        const existing = cart.find(item => item.name === name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name, price, img, qty: 1 });
        }

        renderCart();
        openCart();
      });
    });

    function changeQty(index, delta) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) cart.splice(index, 1);
      renderCart();
    }

    function removeItem(index) {
      cart.splice(index, 1);
      renderCart();
    }

    renderCart();


    /* ── JS 6: COUNTDOWN TIMER ─────────────────────────────────── */
    const deadline = new Date(Date.now() + (8 * 60 + 45) * 60 * 1000);

    function updateCountdown() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        ['cd-hours','cd-minutes','cd-seconds'].forEach(id => {
          document.getElementById(id).textContent = '00';
        });
        return;
      }
      document.getElementById('cd-hours').textContent   = String(Math.floor(diff / 3600000)).padStart(2, '0');
      document.getElementById('cd-minutes').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      document.getElementById('cd-seconds').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* ── JS 7: NEWSLETTER FORM ─────────────────────────────────── */
    document.getElementById('newsletterForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (!emailInput.value.includes('@')) {
        emailInput.style.borderColor = '#e03c3c';
        return;
      }
      this.style.display = 'none';
      document.getElementById('newsletterSuccess').style.display = 'block';
    });

