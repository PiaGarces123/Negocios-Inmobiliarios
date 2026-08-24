// =============================================
// NEGOCIOS INMOBILIARIOS — main.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Efecto de scroll en la barra de navegación ──────────────────
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Menú hamburguesa ────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    navbar.classList.toggle('nav-open', isOpen);
  });

  // Cerrar navegación móvil al hacer clic en un enlace
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      navbar.classList.remove('nav-open');
    });
  });

  // ── Pestañas de filtrado ───────────────────
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      filterProperties(filter);
    });
  });

  // ── Control de ordenamiento ────────────────
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortProperties(sortSelect.value);
    });
  }

  // ── Favorite toggle & Card click (solo en catálogo general / index) ──
  const isAccountPage = document.querySelector('.account-page') !== null;
  if (!isAccountPage) {
    document.querySelectorAll('.card-favorite').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const active = btn.classList.toggle('active');
        const svgFavRed = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
        const svgFavWhite = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
        btn.innerHTML = active ? svgFavRed : svgFavWhite;
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        showToast(active ? '✓ Propiedad guardada en favoritos' : '✓ Propiedad eliminada de favoritos');
      });
    });

    document.querySelectorAll('.property-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-favorite') && !e.target.closest('a')) {
          const isInsidePages = window.location.pathname.includes('/pages/');
          window.location.href = isInsidePages ? 'verInmueble.html' : 'pages/verInmueble.html';
        }
      });
    });
  }

  // ── Animación del contador ─────────────────
  const statValues = document.querySelectorAll('[data-count]');
  const animateCounters = () => {
    statValues.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const increment = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = current.toLocaleString('es-AR') + suffix;
        if (current >= target) clearInterval(timer);
      }, 24);
    });
  };

  // Activar contadores cuando las estadísticas del hero son visibles
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { animateCounters(); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // ── Revelación al hacer scroll (Scroll Reveal) ─────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── Formulario de búsqueda ───────────────────────────
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = document.getElementById('searchLocation').value.trim();
      const tipo     = document.getElementById('searchTipo').value;
      const operacion = document.getElementById('searchOperacion').value;
      console.log('Búsqueda:', { location, tipo, operacion });
      // Aquí conectar con backend / filtrado real
      showToast(`Buscando propiedades${location ? ' en ' + location : ''}…`);
    });
  }

  // ── Cargar más ─────────────────────────────
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const hiddenCards = document.querySelectorAll('.property-card.hidden');
  if (loadMoreBtn && hiddenCards.length) {
    loadMoreBtn.addEventListener('click', () => {
      hiddenCards.forEach(card => {
        card.classList.remove('hidden');
        card.style.display = '';
      });
      loadMoreBtn.closest('.load-more-wrap').style.display = 'none';
    });
  } else if (loadMoreBtn) {
    loadMoreBtn.closest('.load-more-wrap').style.display = 'none';
  }

  // ── Notificación Toast ────────────────────
  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '2rem', right: '2rem',
      background: 'var(--navy-800)', color: 'var(--white)',
      padding: '0.85rem 1.5rem', borderRadius: '10px',
      fontSize: '0.875rem', fontWeight: '500',
      boxShadow: '0 8px 24px rgba(10,22,40,0.25)',
      zIndex: '9999',
      transform: 'translateY(20px)', opacity: '0',
      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
      borderLeft: '3px solid var(--gold-400)',
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      toast.addEventListener('transitionend', () => toast.remove());
    }, 3200);
  }

  // ── Filtrar propiedades ─────────────────────
  const allCards = document.querySelectorAll('.property-card');

  function filterProperties(filter) {
    allCards.forEach(card => {
      const tipo = card.dataset.tipo || '';
      const show = filter === 'all' || tipo === filter;
      card.style.display = show ? '' : 'none';
    });
  }

  function sortProperties(order) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.property-card')];
    cards.sort((a, b) => {
      const priceA = parseInt(a.dataset.price || 0);
      const priceB = parseInt(b.dataset.price || 0);
      if (order === 'price-asc') return priceA - priceB;
      if (order === 'price-desc') return priceB - priceA;
      return parseInt(b.dataset.id) - parseInt(a.dataset.id); // el más nuevo
    });
    cards.forEach(card => grid.appendChild(card));
  }

  // ── Enlace de navegación activo al hacer scroll ─────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  // ── Desplazamiento suave para enlaces de anclaje ───────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Formulario de contacto en index.html ────────────
  const mainContactForm = document.getElementById('mainContactForm');
  const selectorBuscando = document.getElementById('cBuscando');
  const groupPresupuesto = document.getElementById('groupPresupuesto');

  if (selectorBuscando && groupPresupuesto) {
    const togglePresupuesto = () => {
      const show = selectorBuscando.value === 'alquilar';
      groupPresupuesto.style.display = show ? 'flex' : 'none';
      const inputPresupuesto = groupPresupuesto.querySelector('input');
      if (inputPresupuesto) {
        inputPresupuesto.required = show;
      }
    };
    selectorBuscando.addEventListener('change', togglePresupuesto);
    togglePresupuesto(); // Ejecutar al iniciar
  }

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validación básica
      const fields = ['cNombre', 'cEmail', 'cTel', 'cUbicacion'];
      let valid = true;
      fields.forEach(fid => {
        const input = document.getElementById(fid);
        if (input && !input.value.trim()) {
          input.style.borderColor = '#dc2626';
          valid = false;
        } else if (input) {
          input.style.borderColor = '';
        }
      });

      if (selectorBuscando.value === 'alquilar') {
        const cPres = document.getElementById('cPresupuesto');
        if (cPres && !cPres.value.trim()) {
          cPres.style.borderColor = '#dc2626';
          valid = false;
        } else if (cPres) {
          cPres.style.borderColor = '';
        }
      }

      if (!valid) {
        showToast('✗ Por favor completa los campos requeridos.');
        return;
      }

      const submitBtn = mainContactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✅ ¡Consulta enviada!';
      submitBtn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      submitBtn.disabled = true;

      showToast('✓ Consulta recibida. Un asesor te contactará a la brevedad.');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        mainContactForm.reset();
        if (selectorBuscando) {
          // Restablecer la visibilidad condicional del campo
          selectorBuscando.dispatchEvent(new Event('change'));
        }
      }, 3500);
    });
  }

  // ── Carrusel de testimonios (Móvil) ─────────────
  const testTrack = document.getElementById('testimonialsTrack');
  const testPrevBtn = document.getElementById('btnTestimonialsPrev');
  const testNextBtn = document.getElementById('btnTestimonialsNext');
  if (testTrack && testPrevBtn && testNextBtn) {
    testPrevBtn.addEventListener('click', () => {
      const cards = Array.from(testTrack.querySelectorAll('.testimonial-card'));
      if (cards.length === 0) return;
      const trackLeft = testTrack.getBoundingClientRect().left;
      let activeIndex = cards.findIndex(card => {
        const cardLeft = card.getBoundingClientRect().left;
        return Math.abs(cardLeft - trackLeft) < 30; // Umbral de 30px para la detección de ajuste (snap)
      });
      if (activeIndex === -1) activeIndex = 0;
      const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
      cards[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    testNextBtn.addEventListener('click', () => {
      const cards = Array.from(testTrack.querySelectorAll('.testimonial-card'));
      if (cards.length === 0) return;
      const trackLeft = testTrack.getBoundingClientRect().left;
      let activeIndex = cards.findIndex(card => {
        const cardLeft = card.getBoundingClientRect().left;
        return Math.abs(cardLeft - trackLeft) < 30;
      });
      if (activeIndex === -1) activeIndex = 0;
      const nextIndex = (activeIndex + 1) % cards.length;
      cards[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
  }

});

