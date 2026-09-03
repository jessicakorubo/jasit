// JASIT Technologies — shared site behaviour

// Form submissions are sent via Web3Forms (https://web3forms.com) — a free
// service that emails form data straight to an inbox, with no backend code
// needed. This works on static hosts like Vercel, Netlify, or GitHub Pages.
//
// SETUP (one-time, takes under a minute):
// 1. Go to https://web3forms.com and enter jessicakorubo@gmail.com
// 2. You'll instantly get an access key emailed to that address
// 3. Paste that key below, replacing "YOUR_WEB3FORMS_ACCESS_KEY"
const WEB3FORMS_ACCESS_KEY = "2ab4daa6-42fb-4a02-ace2-cd908f0d0b5a";

function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      const nl = document.getElementById('nav-links');
      if (nl) nl.classList.remove('open');
    });
  });
});

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.form-submit');
  const originalText = btn.textContent;

  if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
    showToast('Form is not connected yet — see the setup note in site.js.');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const formData = new FormData(form);
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('subject', 'New enquiry from jasit.com.ng');
  formData.append('from_name', 'JASIT Website');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      form.reset();
      showToast('Message sent! We will be in touch within 24 hours.');
    } else {
      showToast('Something went wrong. Please try WhatsApp or email instead.');
    }
  } catch (err) {
    showToast('Network error — please try WhatsApp or email instead.');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}