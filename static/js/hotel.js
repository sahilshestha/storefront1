

    /* ── JS 1: HERO ZOOM-OUT ON LOAD ─────────────────────────────
    The hero background starts scaled up (CSS: scale 1.06).
    Adding the "loaded" class triggers the CSS transition
    to scale back to 1, creating a gentle zoom-out effect.
    ─────────────────────────────────────────────────────────── */
    window.addEventListener('load', function () {
    document.getElementById('heroBg').classList.add('loaded');
});


    /* ── JS 2: STICKY / PINNED HEADER ───────────────────────────
    The header starts transparent over the hero image.
    When the user scrolls past 80px, we add the "pinned" class
    which gives it a dark background (see CSS).
    ─────────────────────────────────────────────────────────── */
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
    header.classList.add('pinned');
} else {
    header.classList.remove('pinned');
}
});


    /* ── JS 3: MOBILE NAV TOGGLE ─────────────────────────────────
    Show / hide the nav list when the hamburger is pressed.
    Clicking any nav link closes the menu automatically.
    ─────────────────────────────────────────────────────────── */
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    navToggle.addEventListener('click', function () {
    navList.classList.toggle('open');
});

    navList.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
        navList.classList.remove('open');
    });
});


    /* ── JS 4: BOOKING FORM VALIDATION ──────────────────────────
    On submit:
    1. Prevent the default page reload.
    2. Make sure check-in and check-out are both filled.
    3. Make sure check-out is AFTER check-in.
    4. If valid — hide the form, show the success message.
    ─────────────────────────────────────────────────────────── */
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');

    // Set today as the minimum selectable check-in date
    const todayStr = new Date().toISOString().split('T')[0];
    document.getElementById('checkin').setAttribute('min', todayStr);
    document.getElementById('checkout').setAttribute('min', todayStr);

    // When check-in changes, push check-out minimum forward by 1 day
    document.getElementById('checkin').addEventListener('change', function () {
    const nextDay = new Date(this.value);
    nextDay.setDate(nextDay.getDate() + 1);
    document.getElementById('checkout').setAttribute('min', nextDay.toISOString().split('T')[0]);
});

    bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const checkin  = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests   = document.getElementById('guests').value;

    let valid = true;

    // Highlight empty required fields
    [document.getElementById('checkin'), document.getElementById('checkout'), document.getElementById('guests')].forEach(function (field) {
    if (!field.value) {
    field.style.borderColor = '#e05c5c';
    valid = false;
} else {
    field.style.borderColor = '';
}
});

    // Check that check-out is after check-in
    if (checkin && checkout && checkout <= checkin) {
    document.getElementById('checkout').style.borderColor = '#e05c5c';
    valid = false;
}

    if (!valid) return;

    // All good — hide form, show success
    bookingForm.style.display  = 'none';
    bookingSuccess.style.display = 'block';
});


    /* ── JS 5: GALLERY LIGHTBOX ──────────────────────────────────
    When a gallery image is clicked:
    — Read the full-size URL from the data-lightbox attribute
    — Set it as the src of the lightbox <img/>
    — Show the lightbox overlay
    Clicking the ✕ button or outside the image closes it.
    Pressing Escape also closes it.
    ─────────────────────────────────────────────────────────── */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    // Open lightbox on gallery item click
    document.querySelectorAll('.gallery__item[data-lightbox]').forEach(function (item) {
    item.addEventListener('click', function () {
        lightboxImg.src = this.dataset.lightbox;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';   // prevent background scroll
    });
});

    // Close on ✕ button
    lightboxClose.addEventListener('click', closeLightbox);

    // Close when clicking the dark backdrop (not the image itself)
    lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
});

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});

    function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';   // clear so it doesn't flash on next open
}


    /* ── JS 6: NEWSLETTER / CTA FORM ────────────────────────────
    Basic email validation — show success message on submit.
    ─────────────────────────────────────────────────────────── */
    document.getElementById('ctaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const input = document.getElementById('ctaEmail');

    if (!input.value.includes('@')) {
    input.style.borderColor = '#e05c5c';
    return;
}

    // Hide form elements, show success line
    this.querySelector('.cta-band__form').style.display = 'none';
    this.querySelector('.cta-band__note').style.display = 'none';
    document.getElementById('ctaSuccess').style.display = 'block';
});