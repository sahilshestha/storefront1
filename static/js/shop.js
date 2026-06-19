

    /* ── JS 1: ANNOUNCEMENT BAR CLOSE ───────────────────────────
       Hide the bar when the ✕ button is clicked.
    ─────────────────────────────────────────────────────────── */
    document.getElementById('announcementClose').addEventListener('click', function () {
      document.getElementById('announcement').style.display = 'none';
    });


    /* ── JS 2: STICKY HEADER SHADOW ─────────────────────────────
       Add a shadow when the user scrolls away from the top.
    ─────────────────────────────────────────────────────────── */
    window.addEventListener('scroll', function () {
      const header = document.getElementById('header');
      if (window.scrollY > 10) {
        header.classList.add('elevated');
      } else {
        header.classList.remove('elevated');
      }
    });


    /* ── JS 3: PRODUCT FILTER CHIPS ─────────────────────────────
       Show / hide product cards based on the selected chip.
       Each card has a data-category attribute to match against.
    ─────────────────────────────────────────────────────────── */
    const filterChips = document.querySelectorAll('.filter-chip');
    const prodCards   = document.querySelectorAll('.prod-card');

    filterChips.forEach(chip => {
      chip.addEventListener('click', function () {

        // Mark this chip as active
        filterChips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;   // "furniture", "all", etc.

        prodCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });


    /* ── JS 4: WISHLIST HEART TOGGLE ────────────────────────────
       Toggle the heart icon on each product card between
       an empty heart (♡) and a filled heart (♥).
    ─────────────────────────────────────────────────────────── */
    document.querySelectorAll('[data-wish]').forEach(btn => {
      btn.addEventListener('click', function () {
        const liked = this.classList.toggle('liked');
        this.textContent  = liked ? '♥' : '♡';
        this.setAttribute('aria-label', liked ? 'Remove from wishlist' : 'Add to wishlist');
      });
    });


    /* ── JS 5: CART SYSTEM ───────────────────────────────────────
       Stores cart items in a plain JS array (no server needed).
       "Add to Cart" buttons add items; the drawer shows them.
       Qty +/- buttons and remove work inline.
    ─────────────────────────────────────────────────────────── */

    // The cart is just an array of item objects
    let cart = [];

    // DOM references
    const cartDrawer   = document.getElementById('cartDrawer');
    const cartOverlay  = document.getElementById('cartOverlay');
    const cartItemsEl  = document.getElementById('cartItems');
    const cartFooterEl = document.getElementById('cartFooter');
    const cartBadge    = document.getElementById('cartBadge');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal    = document.getElementById('cartTotal');

    /* Open / close helpers */
    function openCart() {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';   // prevent background scrolling
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

    /* Re-render the cart drawer whenever the cart array changes */
    function renderCart() {

      // Update badge count (total quantity of all items)
      const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
      cartBadge.textContent = totalQty;

      // Update totals
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      cartSubtotal.textContent = '$' + subtotal.toFixed(2);
      cartTotal.textContent    = '$' + subtotal.toFixed(2);

      // Show/hide footer
      cartFooterEl.style.display = cart.length > 0 ? 'block' : 'none';

      if (cart.length === 0) {
        // Show empty state
        cartItemsEl.innerHTML = `
          <div class="cart-empty">
            <div class="cart-empty__icon">🛒</div>
            <p>Your cart is empty.</p>
            <p style="font-size:0.85rem; color:var(--clr-muted); margin-top:4px;">Add something beautiful!</p>
          </div>
        `;
        return;
      }

      // Build HTML for each item
      cartItemsEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <img class="cart-item__img" src="${item.img}" alt="${item.name}" />
          <div class="cart-item__info">
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__variant">Natural / Standard</div>
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

    /* Add an item — called by "Add to Cart" buttons */
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', function () {
        const name  = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const img   = this.dataset.img;

        // If item already in cart, increase qty; otherwise add new entry
        const existing = cart.find(item => item.name === name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name, price, img, qty: 1 });
        }

        renderCart();
        openCart();   // open drawer so the user sees what was added
      });
    });

    /* Change quantity (+1 or -1) */
    function changeQty(index, delta) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);   // remove item if qty reaches 0
      }
      renderCart();
    }

    /* Remove item entirely */
    function removeItem(index) {
      cart.splice(index, 1);
      renderCart();
    }

    // Run once on load to initialise the badge
    renderCart();


    /* ── JS 6: COUNTDOWN TIMER ───────────────────────────────────
       Set a target time 8 hours 45 minutes from now and
       count down to it, updating the display every second.
    ─────────────────────────────────────────────────────────── */
    const deadline = new Date(Date.now() + (8 * 60 + 45) * 60 * 1000);   // now + 8h 45m

    function updateCountdown() {
      const now  = new Date();
      const diff = deadline - now;   // milliseconds remaining

      if (diff <= 0) {
        document.getElementById('cd-hours').textContent   = '00';
        document.getElementById('cd-minutes').textContent = '00';
        document.getElementById('cd-seconds').textContent = '00';
        return;
      }

      const hours   = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      // Pad single digits with a leading zero, e.g. 7 → "07"
      document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
      document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();                  // run immediately on load
    setInterval(updateCountdown, 1000); // then every second


    /* ── JS 7: NEWSLETTER FORM ───────────────────────────────────
       Validate the email field and show a success message.
    ─────────────────────────────────────────────────────────── */
    document.getElementById('newsletterForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('newsletterEmail');

      if (!emailInput.value.includes('@')) {
        emailInput.style.borderColor = '#e05c5c';
        return;
      }

      // Hide form, show success text
      this.style.display = 'none';
      document.getElementById('newsletterSuccess').style.display = 'block';
    });
