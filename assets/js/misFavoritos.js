// =============================================
// misFavoritos.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Estado ─────────────────────────────────
  let favorites = JSON.parse(localStorage.getItem('ni_favorites') || 'null') || [
    {
      id: 1,
      title: 'Casa Moderna con Vista Panorámica',
      location: 'Nordelta, Buenos Aires',
      price: 'USD 280.000',
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

  // ── Render ──────────────────────────────────
  function save() { localStorage.setItem('ni_favorites', JSON.stringify(favorites)); }

  function getSorted() {
    const order = sortSel?.value || 'newest';
    return [...favorites].sort((a, b) => {
      if (order === 'newest') return new Date(b.date) - new Date(a.date);
      if (order === 'oldest') return new Date(a.date) - new Date(b.date);
      const pa = parseInt(a.price.replace(/\D/g,''));
      const pb = parseInt(b.price.replace(/\D/g,''));
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
      heartRed: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
    };
    return icons[type] || '';
  }

  function renderGrid(data) {
    grid.innerHTML = data.map(p => `
      <article class="property-card reveal" data-id="${p.id}" aria-label="${p.title}">
        <a href="${p.href}">
          <div class="card-image-wrap">
            <img src="${p.img}" alt="${p.title}" loading="lazy" width="400" height="300" />
            <span class="card-badge ${badgeClass(p.status)}">${p.statusLabel}</span>
            <span class="card-type">${p.tipo}</span>
          </div>
        </a>
        <button class="card-favorite active" data-fav-id="${p.id}" aria-label="Quitar de favoritos" aria-pressed="true">${iconSVG('heartRed')}</button>
        <div class="card-body">
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
    `).join('');
    attachFavButtons();
    revealCards();
  }

  function renderList(data) {
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

    grid.style.display      = (!isEmpty && currentView === 'grid') ? 'grid' : 'none';
    listView.style.display  = (!isEmpty && currentView === 'list') ? 'flex' : 'none';
    emptyState.style.display = isEmpty ? 'flex' : 'none';

    updateCount();
    if (isEmpty) return;
    if (currentView === 'grid') renderGrid(data);
    else renderList(data);
  }

  // ── Favorites heart buttons ─────────────────
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

  // ── Confirm dialog ──────────────────────────
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
    showToast('Propiedad eliminada de favoritos');
  });

  // Esc para cerrar
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeConfirm();
  });

  // ── View toggle ─────────────────────────────
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

  // ── Sort ────────────────────────────────────
  sortSel?.addEventListener('change', render);

  // ── Scroll reveal ───────────────────────────
  function revealCards() {
    const items = document.querySelectorAll('.reveal:not(.visible)');
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(el => ro.observe(el));
  }

  // ── Toast ───────────────────────────────────
  function showToast(msg) {
    const t = document.createElement('div');
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

  // ── Init ────────────────────────────────────
  render();

});
