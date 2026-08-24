// =============================================
// verInmueble.js — JS de la página de detalle
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Reutilizar navbar scroll + hamburger de main.js
  // (main.js se carga también en esta página)

  // ── Gallery modal ───────────────────────────
  const galleryModal   = document.getElementById('galleryModal');
  const modalImg       = document.getElementById('modalImg');
  const modalCounter   = document.getElementById('modalCounter');
  const modalClose     = document.getElementById('modalClose');
  const modalPrev      = document.getElementById('modalPrev');
  const modalNext      = document.getElementById('modalNext');

  const galleryImages = [
    { src: '../assets/media/detail_hero.jpg', alt: 'Exterior de la propiedad' },
    { src: '../assets/media/detail_t1.jpg',   alt: 'Living comedor' },
    { src: '../assets/media/detail_t2.jpg',   alt: 'Cocina premium' },
    { src: '../assets/media/detail_t3.jpg',   alt: 'Dormitorio principal' },
    { src: '../assets/media/detail_t4.jpg',   alt: 'Piscina y jardín' },
  ];
  let currentIdx = 0;

  function openModal(idx) {
    currentIdx = idx;
    updateModal();
    galleryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    galleryModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  function updateModal() {
    const { src, alt } = galleryImages[currentIdx];
    modalImg.src = src;
    modalImg.alt = alt;
    if (modalCounter) modalCounter.textContent = `${currentIdx + 1} / ${galleryImages.length}`;
  }

  // Abrir desde thumbnails
  document.querySelectorAll('[data-gallery-idx]').forEach(el => {
    el.addEventListener('click', () => openModal(parseInt(el.dataset.galleryIdx)));
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalPrev)  modalPrev.addEventListener('click', () => { currentIdx = (currentIdx - 1 + galleryImages.length) % galleryImages.length; updateModal(); });
  if (modalNext)  modalNext.addEventListener('click', () => { currentIdx = (currentIdx + 1) % galleryImages.length; updateModal(); });
  if (galleryModal) galleryModal.addEventListener('click', e => { if (e.target === galleryModal) closeModal(); });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (!galleryModal?.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft')  { currentIdx = (currentIdx - 1 + galleryImages.length) % galleryImages.length; updateModal(); }
    if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % galleryImages.length; updateModal(); }
  });

  // ── Favorite button ─────────────────────────
  const favBtn = document.getElementById('propFavBtn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      const active = favBtn.classList.toggle('active');
      const svgFavRed = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
      const svgFavWhite = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
      favBtn.querySelector('.fav-icon').innerHTML = active ? svgFavRed : svgFavWhite;
      favBtn.querySelector('.fav-text').textContent = active ? 'Guardado' : 'Guardar';
    });
  }

  // ── Read more ───────────────────────────────
  const readMoreBtn  = document.getElementById('readMoreBtn');
  const descExtra    = document.getElementById('descExtra');
  if (readMoreBtn && descExtra) {
    readMoreBtn.addEventListener('click', () => {
      const expanded = descExtra.classList.toggle('visible');
      readMoreBtn.innerHTML = expanded
        ? 'Ver menos <span>↑</span>'
        : 'Leer descripción completa <span>↓</span>';
    });
  }

  // ── Carousel ──────────────────────────────────
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (track.scrollLeft <= 0) {
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
      }
    });
    nextBtn.addEventListener('click', () => {
      if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
      }
    });
  }

  // ── Contact form ────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-contact');
      const original = btn.innerHTML;
      btn.innerHTML = '✅ ¡Mensaje enviado!';
      btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3500);
    });
  }

  // ── Share button ────────────────────────────
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Casa Moderna Premium – Negocios Inmobiliarios',
        text:  'Mirá esta propiedad exclusiva en Negocios Inmobiliarios.',
        url:   window.location.href,
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          showToast('🔗 Enlace copiado al portapapeles');
        }
      } catch (_) {}
    });
  }

  // ── Print ───────────────────────────────────
  const printBtn = document.getElementById('printBtn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  // ── Toast (inline, no depende de main.js) ──
  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    Object.assign(t.style, {
      position:'fixed', bottom:'2rem', right:'2rem',
      background:'var(--navy-800)', color:'var(--white)',
      padding:'0.85rem 1.5rem', borderRadius:'10px',
      fontSize:'0.875rem', fontWeight:'500',
      boxShadow:'0 8px 24px rgba(10,22,40,0.25)',
      zIndex:'9999', transform:'translateY(20px)', opacity:'0',
      transition:'all 0.3s cubic-bezier(0.4,0,0.2,1)',
      borderLeft:'3px solid var(--gold-400)',
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.transform='translateY(0)'; t.style.opacity='1'; });
    setTimeout(() => {
      t.style.transform='translateY(20px)'; t.style.opacity='0';
      t.addEventListener('transitionend', () => t.remove());
    }, 3000);
  }

  // ── Scroll reveal (reutiliza clase .reveal de style.css) ──
  const revealEls = document.querySelectorAll('.reveal');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => ro.observe(el));

});
