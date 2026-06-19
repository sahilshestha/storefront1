/* =========================================
   MAISON — Login Page Scripts
   ========================================= */

'use strict';

/* ----------------------------------------
   CUSTOM CURSOR
---------------------------------------- */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let fX = 0, fY = 0;

if (cursor && follower) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateFollower() {
    fX += (mouseX - fX) * 0.1;
    fY += (mouseY - fY) * 0.1;
    follower.style.left = fX + 'px';
    follower.style.top  = fY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });
}

/* ----------------------------------------
   PASSWORD VISIBILITY TOGGLE
---------------------------------------- */
const toggleBtn   = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');
const eyeShow     = document.querySelector('.eye-icon--show');
const eyeHide     = document.querySelector('.eye-icon--hide');

if (toggleBtn && passwordInput) {
  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeShow.style.display = isPassword ? 'none'  : '';
    eyeHide.style.display = isPassword ? ''      : 'none';
    toggleBtn.setAttribute('aria-label',
      isPassword ? 'Hide password' : 'Show password'
    );
  });
}

/* ----------------------------------------
   FORM VALIDATION HELPERS
---------------------------------------- */
function showError(groupId, errorId, message) {
  const group = document.getElementById(groupId);
  const error = document.getElementById(errorId);
  if (!group || !error) return;
  group.classList.add('has-error');
  group.classList.remove('has-success');
  error.textContent = '⚠ ' + message;
  error.classList.add('visible');
}

function showSuccess(groupId, errorId) {
  const group = document.getElementById(groupId);
  const error = document.getElementById(errorId);
  if (!group || !error) return;
  group.classList.remove('has-error');
  group.classList.add('has-success');
  error.textContent = '';
  error.classList.remove('visible');
}

function clearState(groupId, errorId) {
  const group = document.getElementById(groupId);
  const error = document.getElementById(errorId);
  if (!group || !error) return;
  group.classList.remove('has-error', 'has-success');
  error.textContent = '';
  error.classList.remove('visible');
}

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

/* ----------------------------------------
   LIVE VALIDATION (on blur)
---------------------------------------- */
const emailInput = document.getElementById('email');

if (emailInput) {
  emailInput.addEventListener('blur', () => {
    const val = emailInput.value.trim();
    if (!val) {
      showError('group-email', 'error-email', 'Email address is required.');
    } else if (!isValidEmail(val)) {
      showError('group-email', 'error-email', 'Please enter a valid email address.');
    } else {
      showSuccess('group-email', 'error-email');
    }
  });

  emailInput.addEventListener('input', () => {
    if (document.getElementById('group-email').classList.contains('has-error')) {
      if (isValidEmail(emailInput.value.trim())) {
        showSuccess('group-email', 'error-email');
      }
    }
  });
}

if (passwordInput) {
  passwordInput.addEventListener('blur', () => {
    const val = passwordInput.value;
    if (!val) {
      showError('group-password', 'error-password', 'Password is required.');
    } else if (val.length < 6) {
      showError('group-password', 'error-password', 'Password must be at least 6 characters.');
    } else {
      showSuccess('group-password', 'error-password');
    }
  });

  passwordInput.addEventListener('input', () => {
    if (document.getElementById('group-password').classList.contains('has-error')) {
      if (passwordInput.value.length >= 6) {
        showSuccess('group-password', 'error-password');
      }
    }
  });
}

/* ----------------------------------------
   SUBMIT BUTTON RIPPLE
---------------------------------------- */
const submitBtn = document.getElementById('submit-btn');

if (submitBtn) {
  submitBtn.addEventListener('click', (e) => {
    const rect   = submitBtn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'btn-submit__ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    submitBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

/* ----------------------------------------
   FORM SUBMIT
---------------------------------------- */
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email    = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    let valid = true;

    // Validate email
    if (!email) {
      showError('group-email', 'error-email', 'Email address is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError('group-email', 'error-email', 'Please enter a valid email address.');
      valid = false;
    } else {
      showSuccess('group-email', 'error-email');
    }

    // Validate password
    if (!password) {
      showError('group-password', 'error-password', 'Password is required.');
      valid = false;
    } else if (password.length < 6) {
      showError('group-password', 'error-password', 'Password must be at least 6 characters.');
      valid = false;
    } else {
      showSuccess('group-password', 'error-password');
    }

    if (!valid) {
      shakeForm();
      return;
    }

    // --- Loading state ---
    setLoading(true);

    // Simulate API call (replace with your real fetch/axios call)
    await simulateLogin(email, password);
  });
}

/* ----------------------------------------
   SIMULATE LOGIN (replace with real API)
---------------------------------------- */
async function simulateLogin(email, password) {
  await delay(1800);

  // Demo: treat any valid input as success
  // In production: replace with fetch('/api/login', { method: 'POST', body: ... })
  const success = true;

  setLoading(false);

  if (success) {
    setSuccess();
    showToast('✓ Welcome back! Redirecting…', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1600);
  } else {
    showError('group-email', 'error-email', 'No account found with this email.');
    showError('group-password', 'error-password', 'Please check your credentials.');
    showToast('Sign-in failed. Please try again.', 'error');
    shakeForm();
  }
}

/* ----------------------------------------
   BUTTON STATE HELPERS
---------------------------------------- */
function setLoading(on) {
  if (!submitBtn) return;
  submitBtn.classList.toggle('loading', on);
  submitBtn.disabled = on;
}

function setSuccess() {
  if (!submitBtn) return;
  submitBtn.classList.remove('loading');
  submitBtn.classList.add('success');
  submitBtn.querySelector('.btn-submit__text').textContent = '✓ Signed in';
}

function shakeForm() {
  const panel = document.querySelector('.login-panel__inner');
  if (!panel) return;
  panel.style.animation = 'none';
  // Force reflow
  void panel.offsetWidth;
  panel.style.animation = 'shake 0.45s ease';
}

// Inject shake keyframe once
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
}`;
document.head.appendChild(shakeStyle);

/* ----------------------------------------
   SOCIAL BUTTON HANDLERS
---------------------------------------- */
document.getElementById('google-btn')?.addEventListener('click', () => {
  showToast('🔄 Redirecting to Google…');
  // window.location.href = '/auth/google';
});

document.getElementById('apple-btn')?.addEventListener('click', () => {
  showToast('🔄 Redirecting to Apple…');
  // window.location.href = '/auth/apple';
});

/* ----------------------------------------
   TOAST NOTIFICATION
---------------------------------------- */
let toastTimeout;

function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.className   = 'toast' + (type ? ' toast--' + type : '');
  // Force reflow for re-animation
  void toast.offsetWidth;
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ----------------------------------------
   UTILITY
---------------------------------------- */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ----------------------------------------
   INPUT FOCUS EFFECTS — subtle border glow
---------------------------------------- */
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.form-group')?.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.closest('.form-group')?.classList.remove('focused');
  });
});

/* ----------------------------------------
   INIT
---------------------------------------- */
console.log('%cMAISON — Login loaded ✦', 'font-family: Georgia, serif; font-size: 14px; color: #c17b5c;');