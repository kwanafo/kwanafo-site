(function(){
// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click', e=>{
const id = a.getAttribute('href').slice(1);
const el = document.getElementById(id);
if (el) {
e.preventDefault();
el.scrollIntoView({ behavior:'smooth', block:'start' });
nav && nav.classList.remove('open');
}
});
});

// Optional: inline success with Formspree using AJAX (uncomment to use, otherwise form will redirect to Formspree success page)
/*
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
form.addEventListener('submit', async (e)=>{
e.preventDefault();
if (status) status.textContent = 'Sending...';
try {
const res = await fetch(form.action, {
method:'POST',
headers:{ 'Accept':'application/json' },
body:new FormData(form)
});
if (res.ok) {
form.reset();
if (status) status.textContent = 'Thanks! Your message has been sent.';
} else {
let msg = 'Oops, something went wrong. Please try again.';
try {
const data = await res.json();
if (Array.isArray(data.errors)) msg = data.errors.map(e=>e.message).join(', ');
} catch(_){}
if (status) status.textContent = msg;
}
} catch {
if (status) status.textContent = 'Network error. Please try again.';
}
});
}
*/
})();