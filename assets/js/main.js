// =============================================
// NEGOCIOS INMOBILIARIOS — main.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──────────────────
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Hamburger menu ────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    navbar.classList.toggle('nav-open', isOpen);
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      navbar.classList.remove('nav-open');
    });
  });

  // ── Filter tabs ───────────────────────────
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      filterProperties(filter);
    });
  });

  // ── Sort control ──────────────────────────
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortProperties(sortSelect.value);
    });
  }

  // ── Favorite toggle ───────────────────────
  document.querySelectorAll('.card-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const svgFavRed = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
      const svgFavWhite = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
      btn.innerHTML = btn.classList.contains('active') ? svgFavRed : svgFavWhite;
      btn.setAttribute('aria-pressed', btn.classList.contains('active'));
    });
  });

  // ── Card click to detail ──────────────────
  document.querySelectorAll('.property-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.card-favorite')) {
        // Redirigir a la vista de detalle
        // Para index.html la ruta es pages/verInmueble.html
        window.location.href = 'pages/verInmueble.html';
      }
    });
  });

  // ── Counter animation ─────────────────────
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

  // Trigger counters when hero stats are visible
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { animateCounters(); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // ── Scroll Reveal ─────────────────────────
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

  // ── Search form ───────────────────────────
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

  // ── Load More ─────────────────────────────
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

  // ── Toast notification ────────────────────
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

  // ── Filter properties ─────────────────────
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
      return parseInt(b.dataset.id) - parseInt(a.dataset.id); // newest
    });
    cards.forEach(card => grid.appendChild(card));
  }

  // ── Active nav link on scroll ─────────────
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

  // ── Smooth scroll for anchor links ───────
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

  // ── Contact Form in index.html ────────────
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
    togglePresupuesto(); // Run on init
  }

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
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
        showToast('⚠️ Por favor completa los campos requeridos.');
        return;
      }

      const submitBtn = mainContactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✅ ¡Consulta enviada!';
      submitBtn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      submitBtn.disabled = true;

      showToast('✅ Consulta recibida. Un asesor te contactará a la brevedad.');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        mainContactForm.reset();
        if (selectorBuscando) {
          // Reset conditional field visibility
          selectorBuscando.dispatchEvent(new Event('change'));
        }
      }, 3500);
    });
  }

});

