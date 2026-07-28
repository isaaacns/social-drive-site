const WHATSAPP_NUMBER = '5511999999999';

const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('open'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

document.querySelectorAll('.work').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.full;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock');
  });
});

function closeBox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.classList.remove('lock');
}

closeLightbox.addEventListener('click', closeBox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeBox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBox();
});

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const segment = document.getElementById('segment').value.trim();
  const service = document.getElementById('service').value;

  const message = [
    'Olá, Social Drive!',
    '',
    `Meu nome é ${name}.`,
    segment ? `Meu segmento é: ${segment}.` : '',
    `Tenho interesse em: ${service}.`,
    '',
    'Gostaria de solicitar um orçamento.'
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.getElementById('year').textContent = new Date().getFullYear();
