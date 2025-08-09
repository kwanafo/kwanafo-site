console.log('script.js v2 loaded');
// Smooth scroll for internal links and close mobile nav on click
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nav = document.querySelector('.nav');
      const toggle = document.querySelector('.nav-toggle');
      if (nav?.classList.contains('open')) {
        nav.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Inline success messaging for Formspree
(function () {
  const form = document.querySelector('form#contact-form');
  const statusEl = document.getElementById('form-status');

  if (!form || !statusEl) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        statusEl.textContent = 'Thanks! Your message has been sent.';
      } else {
        const data = await response.json().catch(() => null);
        const msg = data?.errors?.map(e => e.message).join(', ') || 'Oops, something went wrong. Please try again.';
        statusEl.textContent = msg;
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please check your connection and try again.';
    }
  });
})();