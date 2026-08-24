// =============================================
// misFavoritos.js — Mi Cuenta, Favoritos, Perfil y Alertas
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Estado de Favoritos ──────────────────────
  let favorites = JSON.parse(localStorage.getItem('ni_favorites') || 'null') || [
    {
      id: 1,
      title: 'Casa Moderna con Vista Panorámica',
      location: 'Nordelta, Buenos Aires',
      price: 'USD 280.000',
      priceNum: 280000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 4, banos: 3, m2: 320,
      img: '../../assets/media/prop1.jpg',
      href: '../verInmueble.html',
      date: '2025-08-01',
    },
    {
      id: 2,
      title: 'Departamento con Terraza y Vista',
      location: 'Palermo, CABA',
      price: 'USD 1.800',
      priceNum: 1800,
      priceUnit: '/mes',
      tipo: 'Alquiler',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 3, banos: 2, m2: 120,
      img: '../../assets/media/prop2.jpg',
      href: '../verInmueble.html',
      date: '2025-07-25',
    },
    {
      id: 3,
      title: 'Casa Familiar con Jardín y Pileta',
      location: 'Tigre, Buenos Aires',
      price: 'USD 195.000',
      priceNum: 195000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'reservado',
      statusLabel: 'Reservado',
      amb: 5, banos: 3, m2: 480,
      img: '../../assets/media/prop3.jpg',
      href: '../verInmueble.html',
      date: '2025-07-18',
    },
    {
      id: 4,
      title: 'PH Premium con Vista a Buenos Aires',
      location: 'Puerto Madero, CABA',
      price: 'USD 520.000',
      priceNum: 520000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 5, banos: 4, m2: 290,
      img: '../../assets/media/prop4.jpg',
      href: '../verInmueble.html',
      date: '2025-08-10',
    },
  ];

  let currentView  = 'grid'; // 'grid' | 'list'
  let pendingRemoveId = null;

  // ── Catálogo de Propiedades para Alertas de Precio ──
  const priceAlertCatalog = [
    {
      id: 101,
      title: 'Monoambiente Studio Soho',
      location: 'Palermo Soho, CABA',
      price: 'USD 950',
      priceNum: 950,
      priceUnit: '/mes',
      tipo: 'Alquiler',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 1, banos: 1, m2: 38,
      img: '../../assets/media/prop2.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 102,
      title: 'Oficina Comercial Puerto Madero',
      location: 'Puerto Madero, CABA',
      price: 'USD 1.200',
      priceNum: 1200,
      priceUnit: '/mes',
      tipo: 'Alquiler',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 2, banos: 1, m2: 55,
      img: '../../assets/media/prop4.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 103,
      title: 'Duplex de Estilo Belgrano R',
      location: 'Belgrano R, CABA',
      price: 'USD 1.400',
      priceNum: 1400,
      priceUnit: '/mes',
      tipo: 'Alquiler',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 3, banos: 2, m2: 85,
      img: '../../assets/media/prop1.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 104,
      title: 'Departamento con Terraza y Vista',
      location: 'Palermo, CABA',
      price: 'USD 1.800',
      priceNum: 1800,
      priceUnit: '/mes',
      tipo: 'Alquiler',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 3, banos: 2, m2: 120,
      img: '../../assets/media/prop2.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 105,
      title: 'Living Moderno Palermo Hollywood',
      location: 'Palermo Hollywood, CABA',
      price: 'USD 2.200',
      priceNum: 2200,
      priceUnit: '/mes',
      tipo: 'Alquiler',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 2, banos: 1, m2: 65,
      img: '../../assets/media/detail_t1.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 106,
      title: 'Loft Industrial San Telmo',
      location: 'San Telmo, CABA',
      price: 'USD 2.400',
      priceNum: 2400,
      priceUnit: '/mes',
      tipo: 'Alquiler',
      status: 'reservado',
      statusLabel: 'Reservado',
      amb: 2, banos: 2, m2: 90,
      img: '../../assets/media/prop3.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 107,
      title: 'Departamento 2 Ambientes Centro',
      location: 'San Nicolás, CABA',
      price: 'USD 85.000',
      priceNum: 85000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 2, banos: 1, m2: 48,
      img: '../../assets/media/detail_t2.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 108,
      title: 'Suite Maestro en Nordelta',
      location: 'Nordelta, Tigre',
      price: 'USD 145.000',
      priceNum: 145000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 3, banos: 2, m2: 180,
      img: '../../assets/media/detail_t3.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 109,
      title: 'Casa Familiar con Jardín y Pileta',
      location: 'Tigre, Buenos Aires',
      price: 'USD 195.000',
      priceNum: 195000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'reservado',
      statusLabel: 'Reservado',
      amb: 5, banos: 3, m2: 480,
      img: '../../assets/media/prop3.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 110,
      title: 'Casa Moderna con Vista Panorámica',
      location: 'Nordelta, Buenos Aires',
      price: 'USD 280.000',
      priceNum: 280000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 4, banos: 3, m2: 320,
      img: '../../assets/media/prop1.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 111,
      title: 'Cocina Premium Recoleta',
      location: 'Recoleta, CABA',
      price: 'USD 380.000',
      priceNum: 380000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 4, banos: 3, m2: 210,
      img: '../../assets/media/detail_hero.jpg',
      href: '../verInmueble.html'
    },
    {
      id: 112,
      title: 'PH Premium con Vista a Buenos Aires',
      location: 'Puerto Madero, CABA',
      price: 'USD 520.000',
      priceNum: 520000,
      priceUnit: '',
      tipo: 'Venta',
      status: 'disponible',
      statusLabel: 'Disponible',
      amb: 5, banos: 4, m2: 290,
      img: '../../assets/media/prop4.jpg',
      href: '../verInmueble.html'
    },
  ];

  let currentAlertFilter = 'all'; // 'all' | 'alquiler' | 'venta'

  // ── Elementos DOM ──────────────────────────
  const grid        = document.getElementById('favsGrid');
  const listView    = document.getElementById('favsList');
  const emptyState  = document.getElementById('emptyState');
  const countEl     = document.getElementById('favsCount');
  const countBadge  = document.getElementById('countBadge');
  const btnGrid     = document.getElementById('btnGrid');
  const btnList     = document.getElementById('btnList');
  const sortSel     = document.getElementById('favsSortSelect');
  const confirmDlg  = document.getElementById('removeConfirm');
  const btnCancel   = document.getElementById('btnCancelRemove');
  const btnConfirm  = document.getElementById('btnConfirmRemove');
  const alertasGrid = document.getElementById('alertasGrid');

  // ── Navegación entre Vistas de Cuenta ──────
  const navItems = document.querySelectorAll('.account-nav-item[data-view]');
  const views = {
    favoritos: document.getElementById('view-favoritos'),
    perfil:    document.getElementById('view-perfil'),
    alertas:   document.getElementById('view-alertas'),
  };

  function switchAccountView(viewKey) {
    // Si la vista solicitada es seguridad, mostramos perfil y enfocamos seguridad
    const actualKey = (viewKey === 'seguridad') ? 'perfil' : viewKey;

    Object.keys(views).forEach(k => {
      if (views[k]) {
        if (k === actualKey) {
          views[k].classList.remove('hidden');
        } else {
          views[k].classList.add('hidden');
        }
      }
    });

    navItems.forEach(item => {
      if (item.dataset.view === viewKey) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'page');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });

    if (viewKey === 'alertas') {
      renderAlertas();
    } else if (viewKey === 'favoritos') {
      render();
    } else if (viewKey === 'seguridad') {
      setTimeout(() => {
        const sec = document.getElementById('section-seguridad');
        sec?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('userOldPass')?.focus();
      }, 100);
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const targetView = item.dataset.view;
      if (targetView) switchAccountView(targetView);
    });
  });

  // ── Render Favoritos ────────────────────────
  function save() { localStorage.setItem('ni_favorites', JSON.stringify(favorites)); }

  function getSorted() {
    const order = sortSel?.value || 'newest';
    return [...favorites].sort((a, b) => {
      if (order === 'newest') return new Date(b.date || 0) - new Date(a.date || 0);
      if (order === 'oldest') return new Date(a.date || 0) - new Date(b.date || 0);
      const pa = parseInt(a.price.replace(/\D/g,'')) || 0;
      const pb = parseInt(b.price.replace(/\D/g,'')) || 0;
      if (order === 'price-asc')  return pa - pb;
      if (order === 'price-desc') return pb - pa;
      return 0;
    });
  }

  function updateCount() {
    const n = favorites.length;
    if (countEl)    countEl.textContent    = `${n} ${n === 1 ? 'propiedad guardada' : 'propiedades guardadas'}`;
    if (countBadge) countBadge.textContent = `${n} ${n === 1 ? 'favorito' : 'favoritos'}`;
  }

  function badgeClass(status) {
    return status === 'disponible' ? 'badge-disponible'
         : status === 'reservado'  ? 'badge-reservado'
         : 'badge-vendido';
  }

  function iconSVG(type) {
    const icons = {
      pin: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
      home: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
      bath: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
      ruler: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`,
      heartRed: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
      heartOutline: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
    };
    return icons[type] || '';
  }

  function renderGrid(data) {
    if (!grid) return;
    grid.innerHTML = data.map(p => `
      <article class="property-card reveal" data-id="${p.id}" aria-label="${p.title}">
        <div class="card-image-wrap">
          <a href="${p.href}">
            <img src="${p.img}" alt="${p.title}" loading="lazy" width="400" height="300" />
            <span class="card-type">${p.tipo}</span>
          </a>
          <button class="card-favorite active" data-fav-id="${p.id}" aria-label="Quitar de favoritos" aria-pressed="true" type="button">
            ${iconSVG('heartRed')}
          </button>
        </div>
        <div class="card-body">
          <a href="${p.href}" style="text-decoration:none; color:inherit;">
            <div class="card-price">${p.price}<span class="card-price-unit">${p.priceUnit}</span></div>
            <h3 class="card-title">${p.title}</h3>
            <p class="card-location">${iconSVG('pin')} ${p.location}</p>
            <div class="card-features">
              <div class="card-feature">${iconSVG('home')} ${p.amb} Amb.</div>
              <div class="card-feature">${iconSVG('bath')} ${p.banos} Baños</div>
              <div class="card-feature">${iconSVG('ruler')} ${p.m2} m²</div>
            </div>
          </a>
        </div>
      </article>
    `).join('');
    attachFavButtons();
    revealCards();
  }

  function renderList(data) {
    if (!listView) return;
    listView.innerHTML = data.map(p => `
      <article class="favs-list-card reveal" data-id="${p.id}" aria-label="${p.title}">
        <a href="${p.href}" class="list-card-img">
          <img src="${p.img}" alt="${p.title}" loading="lazy" width="220" height="165" />
          <span class="card-badge ${badgeClass(p.status)} list-card-badge">${p.statusLabel}</span>
        </a>
        <div class="list-card-body">
          <div class="card-price">${p.price}<span class="card-price-unit">${p.priceUnit}</span></div>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-location">${iconSVG('pin')} ${p.location}</p>
          <div class="card-features">
            <div class="card-feature">${iconSVG('home')} ${p.amb} Amb.</div>
            <div class="card-feature">${iconSVG('bath')} ${p.banos} Baños</div>
            <div class="card-feature">${iconSVG('ruler')} ${p.m2} m²</div>
            <span class="topbar-badge venta" style="font-size:0.62rem;padding:0.2rem 0.6rem;">${p.tipo}</span>
          </div>
        </div>
        <div class="list-card-actions">
          <a href="${p.href}" class="list-action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Ver detalle
          </a>
          <button class="list-action-btn remove" data-fav-id="${p.id}" aria-label="Quitar de favoritos">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/></svg>
            Eliminar
          </button>
        </div>
      </article>
    `).join('');
    attachFavButtons();
    revealCards();
  }

  function render() {
    const data    = getSorted();
    const isEmpty = data.length === 0;

    if (grid) grid.style.display       = (!isEmpty && currentView === 'grid') ? 'grid' : 'none';
    if (listView) listView.style.display   = (!isEmpty && currentView === 'list') ? 'flex' : 'none';
    if (emptyState) emptyState.style.display = isEmpty ? 'flex' : 'none';

    updateCount();
    if (isEmpty) return;
    if (currentView === 'grid') renderGrid(data);
    else renderList(data);
  }

  // ── Botones de Corazón de Favoritos ─────────────────
  function attachFavButtons() {
    document.querySelectorAll('[data-fav-id]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        pendingRemoveId = parseInt(btn.dataset.favId);
        openConfirm();
      });
    });
  }

  // ── Diálogo de confirmación ──────────────────────────
  function openConfirm() {
    confirmDlg.classList.add('open');
    confirmDlg.setAttribute('aria-hidden', 'false');
  }
  function closeConfirm() {
    confirmDlg.classList.remove('open');
    confirmDlg.setAttribute('aria-hidden', 'true');
    pendingRemoveId = null;
  }

  btnCancel?.addEventListener('click', closeConfirm);
  confirmDlg?.addEventListener('click', e => { if (e.target === confirmDlg) closeConfirm(); });

  btnConfirm?.addEventListener('click', () => {
    if (pendingRemoveId === null) return;
    favorites = favorites.filter(f => f.id !== pendingRemoveId);
    save();
    closeConfirm();
    render();
    showToast('✓ Propiedad eliminada de favoritos');
  });

  // Esc para cerrar modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeConfirm();
  });

  // ── Alternar vista ─────────────────────────────
  btnGrid?.addEventListener('click', () => {
    currentView = 'grid';
    btnGrid.classList.add('active');
    btnList.classList.remove('active');
    render();
  });
  btnList?.addEventListener('click', () => {
    currentView = 'list';
    btnList.classList.add('active');
    btnGrid.classList.remove('active');
    render();
  });

  // ── Ordenamiento ────────────────────────────────────
  sortSel?.addEventListener('change', render);

  // ── Revelación al hacer scroll (Scroll Reveal) ───────────────────────────
  function revealCards() {
    const items = document.querySelectorAll('.reveal:not(.visible)');
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(el => ro.observe(el));
  }

  // ── Render Alertas de Precio (6 Más Económicas) ──
  function renderAlertas() {
    if (!alertasGrid) return;

    let filtered = [...priceAlertCatalog];
    if (currentAlertFilter === 'alquiler') {
      filtered = filtered.filter(p => p.tipo === 'Alquiler');
    } else if (currentAlertFilter === 'venta') {
      filtered = filtered.filter(p => p.tipo === 'Venta');
    }

    // Ordenar de menor a mayor precio y tomar exactamente las 6 primeras
    filtered.sort((a, b) => a.priceNum - b.priceNum);
    const top6 = filtered.slice(0, 6);

    alertasGrid.innerHTML = top6.map(p => {
      const isFav = favorites.some(f => f.id === p.id);
      return `
        <article class="property-card reveal" data-id="${p.id}" aria-label="${p.title}">
          <div class="card-image-wrap">
            <a href="${p.href}">
              <img src="${p.img}" alt="${p.title}" loading="lazy" width="400" height="300" />
              <span class="card-type">${p.tipo}</span>
            </a>
            <button class="card-favorite ${isFav ? 'active' : ''}" data-alert-fav-id="${p.id}" aria-label="${isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}" aria-pressed="${isFav}" type="button">
              ${isFav ? iconSVG('heartRed') : iconSVG('heartOutline')}
            </button>
          </div>
          <div class="card-body">
            <div class="alert-deal-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              Oportunidad de precio
            </div>
            <div class="card-price">${p.price}<span class="card-price-unit">${p.priceUnit}</span></div>
            <h3 class="card-title">${p.title}</h3>
            <p class="card-location">${iconSVG('pin')} ${p.location}</p>
            <div class="card-features">
              <div class="card-feature">${iconSVG('home')} ${p.amb} Amb.</div>
              <div class="card-feature">${iconSVG('bath')} ${p.banos} Baños</div>
              <div class="card-feature">${iconSVG('ruler')} ${p.m2} m²</div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Eventos para corazones dentro de Alertas
    alertasGrid.querySelectorAll('[data-alert-fav-id]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const id = parseInt(btn.dataset.alertFavId);
        const prop = priceAlertCatalog.find(x => x.id === id);
        if (!prop) return;

        const existsIndex = favorites.findIndex(f => f.id === id);
        if (existsIndex >= 0) {
          favorites.splice(existsIndex, 1);
          btn.classList.remove('active');
          btn.innerHTML = iconSVG('heartOutline');
          btn.setAttribute('aria-pressed', 'false');
          showToast('✓ Propiedad eliminada de favoritos');
        } else {
          favorites.push({
            id: prop.id,
            title: prop.title,
            location: prop.location,
            price: prop.price,
            priceNum: prop.priceNum,
            priceUnit: prop.priceUnit,
            tipo: prop.tipo,
            status: prop.status,
            statusLabel: prop.statusLabel,
            amb: prop.amb,
            banos: prop.banos,
            m2: prop.m2,
            img: prop.img,
            href: prop.href,
            date: new Date().toISOString().split('T')[0]
          });
          btn.classList.add('active');
          btn.innerHTML = iconSVG('heartRed');
          btn.setAttribute('aria-pressed', 'true');
          showToast('✓ Propiedad agregada a favoritos');
        }
        save();
        updateCount();
      });
    });

    revealCards();
  }

  // Filtros de Alertas
  document.querySelectorAll('.filter-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAlertFilter = btn.dataset.filter || 'all';
      renderAlertas();
    });
  });

  // ── Gestión del Perfil e Información de Contacto ──
  const userProfile = JSON.parse(localStorage.getItem('ni_user_profile') || 'null') || {
    nombre: 'Juan Manuel Pérez',
    email: 'ejemplo@gmail.com',
    tel: '+54 11 4444-5555',
    pref: 'whatsapp',
    avatar: ''
  };

  const inputNombre    = document.getElementById('userNombre');
  const inputEmail     = document.getElementById('userEmail');
  const inputTel       = document.getElementById('userTel');
  const selectPref     = document.getElementById('userPref');
  const avatarImg      = document.getElementById('avatarImg');
  const avatarInitials = document.getElementById('avatarInitials');
  const userPhotoInput = document.getElementById('userPhotoInput');
  const btnUploadPhoto = document.getElementById('btnUploadPhoto');
  const btnRemovePhoto = document.getElementById('btnRemovePhoto');
  const formPerfil     = document.getElementById('formPerfil');

  function updateInitials(name) {
    if (!avatarInitials) return;
    const parts = (name || '').trim().split(' ');
    let inits = 'U';
    if (parts.length >= 2) {
      inits = (parts[0][0] || '') + (parts[1][0] || '');
    } else if (parts.length === 1 && parts[0].length > 0) {
      inits = parts[0].substring(0, 2);
    }
    avatarInitials.textContent = inits.toUpperCase();
  }

  function loadProfileData() {
    if (inputNombre) inputNombre.value = userProfile.nombre;
    if (inputEmail)  inputEmail.value  = userProfile.email;
    if (inputTel)    inputTel.value    = userProfile.tel;
    if (selectPref)  selectPref.value  = userProfile.pref;

    if (userProfile.avatar) {
      if (avatarImg) {
        avatarImg.src = userProfile.avatar;
        avatarImg.style.display = 'block';
      }
      if (avatarInitials) avatarInitials.style.display = 'none';
    } else {
      if (avatarImg) avatarImg.style.display = 'none';
      if (avatarInitials) {
        avatarInitials.style.display = 'block';
        updateInitials(userProfile.nombre);
      }
    }
  }

  btnUploadPhoto?.addEventListener('click', () => userPhotoInput?.click());

  userPhotoInput?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('✗ La imagen no debe superar los 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => {
        userProfile.avatar = ev.target.result;
        if (avatarImg) {
          avatarImg.src = ev.target.result;
          avatarImg.style.display = 'block';
        }
        if (avatarInitials) avatarInitials.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemovePhoto?.addEventListener('click', () => {
    userProfile.avatar = '';
    if (userPhotoInput) userPhotoInput.value = '';
    if (avatarImg) avatarImg.style.display = 'none';
    if (avatarInitials) {
      avatarInitials.style.display = 'block';
      updateInitials(inputNombre?.value || userProfile.nombre);
    }
  });

  inputNombre?.addEventListener('input', e => {
    if (!userProfile.avatar) updateInitials(e.target.value);
  });

  formPerfil?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = inputNombre?.value.trim();
    const email  = inputEmail?.value.trim();
    const tel    = inputTel?.value.trim();
    const pref   = selectPref?.value;
    const oldPass = document.getElementById('userOldPass')?.value;
    const newPass = document.getElementById('userNewPass')?.value;
    const confPass = document.getElementById('userConfirmPass')?.value;

    if (!nombre || !email || !tel) {
      showToast('✗ Por favor completa los campos requeridos');
      return;
    }

    if (newPass) {
      if (newPass.length < 6) {
        showToast('✗ La nueva contraseña debe tener al menos 6 caracteres');
        return;
      }
      if (newPass !== confPass) {
        showToast('✗ Las contraseñas no coinciden');
        return;
      }
    }

    userProfile.nombre = nombre;
    userProfile.email  = email;
    userProfile.tel    = tel;
    userProfile.pref   = pref;
    localStorage.setItem('ni_user_profile', JSON.stringify(userProfile));

    // Limpiar campos de contraseña tras guardar
    if (document.getElementById('userOldPass')) document.getElementById('userOldPass').value = '';
    if (document.getElementById('userNewPass')) document.getElementById('userNewPass').value = '';
    if (document.getElementById('userConfirmPass')) document.getElementById('userConfirmPass').value = '';

    showToast('✓ Información de contacto actualizada');
  });

  // ── Notificación Toast ───────────────────────
  function showToast(msg) {
    let t = document.querySelector('.toast-account');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast-account';
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
    }
    t.textContent = msg;
    requestAnimationFrame(() => { t.style.transform='translateY(0)'; t.style.opacity='1'; });
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
      t.style.transform='translateY(20px)'; t.style.opacity='0';
    }, 3200);
  }

  // ── Cerrar sesión (Logout) ────────────────────────────────────
  document.getElementById('nav-salir')?.addEventListener('click', () => {
    showToast('✓ Sesión cerrada');
    setTimeout(() => window.location.href = '../../index.html', 1000);
  });

  // ── Inicialización ──────────────────────────
  render();
  loadProfileData();

});
