

    /* ── JS 1: STICKY HEADER ─────────────────────────────────────
       Add/remove the "scrolled" class as the user scrolls.
       The CSS transitions the background colour automatically.
    ─────────────────────────────────────────────────────────── */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });


    /* ── JS 2: MOBILE NAVIGATION TOGGLE ─────────────────────────
       When the hamburger button is clicked, show/hide the nav list.
    ─────────────────────────────────────────────────────────── */
    const navToggle = document.getElementById('navToggle');
    const navList   = document.getElementById('navList');

    navToggle.addEventListener('click', () => {
      navList.classList.toggle('open');   // "open" class shows the menu
    });

    // Close the mobile menu when any link inside it is clicked
    navList.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
      });
    });


    /* ── JS 3: MENU FILTER ───────────────────────────────────────
       Show/hide food cards based on the selected category button.
       Each card has a "data-category" attribute that we compare
       against the filter button's "data-filter" attribute.
    ─────────────────────────────────────────────────────────── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const foodCards  = document.querySelectorAll('.food-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {

        // 1. Mark the clicked button as active (removes from others)
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Get the selected filter value
        const filter = btn.dataset.filter;   // e.g. "starter", "all"

        // 3. Show or hide each card
        foodCards.forEach(card => {
          const category = card.dataset.category;   // e.g. "main"

          if (filter === 'all' || category === filter) {
            card.style.display = '';          // show card (reset to default)
          } else {
            card.style.display = 'none';     // hide card
          }
        });

      });
    });


    /* ── JS 4: CONTACT FORM SUBMISSION ───────────────────────────
       Prevent the default page reload, do basic validation,
       then show a success message.
       (In a real project you would send data to a server here.)
    ─────────────────────────────────────────────────────────── */
    const contactForm  = document.getElementById('contactForm');
    const formSuccess  = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', (event) => {

      // Stop the browser from reloading the page
      event.preventDefault();

      // Simple validation: check all required fields are filled
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#e05c5c';   // red border on empty fields
        } else {
          field.style.borderColor = '';           // reset if filled
        }
      });

      if (!isValid) return;   // stop here if any field is empty

      // All good — hide the form and show the success message
      contactForm.style.display  = 'none';
      formSuccess.style.display = 'block';

      // Scroll the success message into view
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });


    /* ── JS 5: SET MIN DATE ON DATE INPUT ────────────────────────
       Prevent users from selecting a date in the past.
    ─────────────────────────────────────────────────────────── */
    const dateInput = document.getElementById('date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];   // "YYYY-MM-DD"
      dateInput.setAttribute('min', today);
    }
