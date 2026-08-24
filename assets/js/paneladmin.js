// =============================================
// paneladmin.js — Panel de Administración
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger menu (Mobile) will be here after DOM refs ──

  // ── Data ────────────────────────────────────
  let properties = [
    { id: 1, title: 'Casa Moderna con Vista Panorámica',    addr: 'Av. Del Libertador 8500, Palermo',     price: 280000, unit: '',     tipo: 'venta',    status: 'disponible', amb: 4, banos: 3, m2: 320, img: '../../assets/media/prop1.jpg', desc: 'Casa moderna de autor con vistas panorámicas al río en Nordelta.' },
    { id: 2, title: 'Departamento con Terraza y Vista',     addr: 'Armenia 1234, Palermo, CABA',          price: 1800,   unit: '/mes', tipo: 'alquiler', status: 'disponible', amb: 3, banos: 2, m2: 120, img: '../../assets/media/prop2.jpg', desc: 'Departamento luminoso con terraza privada y vistas al parque.' },
    { id: 3, title: 'Casa Familiar con Jardín y Pileta',   addr: 'Calle Las Palmas 456, Tigre',          price: 195000, unit: '',     tipo: 'venta',    status: 'reservado',  amb: 5, banos: 3, m2: 480, img: '../../assets/media/prop3.jpg', desc: 'Casa familiar con jardín paisajístico y pileta climatizada en country.' },
    { id: 4, title: 'PH Premium con Vista a Buenos Aires', addr: 'Alicia Moreau de Justo 740, Pto Madero', price: 520000, unit: '',   tipo: 'venta',    status: 'disponible', amb: 5, banos: 4, m2: 290, img: '../../assets/media/prop4.jpg', desc: 'PH exclusivo con terraza privada y vista 360° al skyline porteño.' },
    { id: 5, title: 'Casa Moderna con Piscina Infinita',   addr: 'Av. Del Libertador 8900, Belgrano',    price: 520000, unit: '',     tipo: 'venta',    status: 'disponible', amb: 5, banos: 4, m2: 480, img: '../../assets/media/detail_hero.jpg', desc: 'Residencia premium con piscina infinita y jardín paisajístico.' },
    { id: 6, title: 'Living Moderno Palermo Hollywood',    addr: 'Humboldt 2356, Palermo, CABA',         price: 2200,   unit: '/mes', tipo: 'alquiler', status: 'vendido',    amb: 2, banos: 1, m2: 65,  img: '../../assets/media/detail_t1.jpg', desc: 'Living moderno reformado en planta baja con patio exclusivo.' },
    { id: 7, title: 'Cocina Premium Recoleta',             addr: 'Av. Alvear 1801, Recoleta, CABA',      price: 380000, unit: '',     tipo: 'venta',    status: 'reservado',  amb: 4, banos: 3, m2: 210, img: '../../assets/media/detail_t2.jpg', desc: 'Apartamento de lujo en edificio de categoría con amenities completos.' },
    { id: 8, title: 'Suite Maestro en Nordelta',           addr: 'Av. del Golf 1200, Nordelta',          price: 145000, unit: '',     tipo: 'venta',    status: 'disponible', amb: 3, banos: 2, m2: 180, img: '../../assets/media/detail_t3.jpg', desc: 'Casa en barrio cerrado con acceso directo al lago y bote propio.' },
  ];

  let clients = [
    { id: 1, nombre: 'Carolina Pérez',   email: 'carolina@email.com',  tel: '+54 11 4444-1111', favs: 3, consultas: 7,  fecha: '2025-07-12' },
    { id: 2, nombre: 'Roberto Martínez', email: 'roberto@gmail.com',    tel: '+54 11 4444-2222', favs: 1, consultas: 2,  fecha: '2025-08-01' },
    { id: 3, nombre: 'Luciana Torres',   email: 'luciana@hotmail.com',  tel: '+54 11 4444-3333', favs: 5, consultas: 12, fecha: '2025-06-20' },
    { id: 4, nombre: 'Martín Gómez',     email: 'martin@outlook.com',   tel: '+54 11 4444-4444', favs: 2, consultas: 4,  fecha: '2025-08-10' },
    { id: 5, nombre: 'Valentina Ruiz',   email: 'valen@email.com',      tel: '+54 11 4444-5555', favs: 0, consultas: 1,  fecha: '2025-08-15' },
  ];

  let nextId = 9;
  let currentView   = 'propiedades';
  let editPropId    = null;    // null = nuevo
  let deletePropId  = null;
  let searchQuery   = '';
  let filterStatus  = 'all';
  let filterTipo    = 'all';
  let currentPage   = 1;
  const PER_PAGE    = 6;

  // ── DOM refs ─────────────────────────────────
  const views        = { propiedades: document.getElementById('viewPropiedades'), clientes: document.getElementById('viewClientes'), settings: document.getElementById('viewSettings'), dashboard: document.getElementById('viewDashboard') };
  const navItems     = document.querySelectorAll('.admin-nav-item[data-view]');
  const topbarTitle  = document.getElementById('adminTopbarTitle');
  const btnCreate    = document.getElementById('btnCreate');
  const editOverlay  = document.getElementById('editOverlay');
  const editPanel    = document.getElementById('editPanel');
  const editPanelTitle = document.getElementById('editPanelTitle');
  const editClose    = document.getElementById('editPanelClose');
  const editForm     = document.getElementById('editForm');
  const tableBody    = document.getElementById('propTableBody');
  const searchInput  = document.getElementById('tableSearch');
  const filterSel    = document.getElementById('filterStatus');
  const filterTipoSel = document.getElementById('filterTipo');
  
  const adminHamburger = document.getElementById('adminHamburger');
  const adminSidebar   = document.getElementById('adminSidebar');
  const adminOverlay   = document.getElementById('adminOverlay');
  const tableInfo    = document.getElementById('tableInfo');
  const pagination   = document.getElementById('tablePagination');
  const deleteModal  = document.getElementById('deleteModal');
  const btnDelCancel  = document.getElementById('btnDelCancel');
  const btnDelConfirm = document.getElementById('btnDelConfirm');
  const uploadZone    = document.getElementById('uploadZone');
  const uploadInput   = document.getElementById('uploadInput');
  const uploadPreview = document.getElementById('uploadPreview');
  const clientTableBody = document.getElementById('clientTableBody');

  // ── Hamburger menu (Mobile) ────────────────
  if (adminHamburger && adminSidebar && adminOverlay) {
    const toggleMenu = () => {
      const isOpen = adminSidebar.classList.toggle('open');
      adminHamburger.classList.toggle('open', isOpen);
      adminHamburger.setAttribute('aria-expanded', isOpen);
      adminOverlay.classList.toggle('open', isOpen);
    };

    adminHamburger.addEventListener('click', toggleMenu);
    adminOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav item on mobile
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 900 && adminSidebar.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // ── Navigation ────────────────────────────────
  function switchView(viewName) {
    currentView = viewName;
    Object.values(views).forEach(v => v?.classList.remove('active'));
    views[viewName]?.classList.add('active');
    navItems.forEach(n => { n.classList.toggle('active', n.dataset.view === viewName); });
    const titles = { dashboard:'Dashboard', propiedades:'Listado de Propiedades', clientes:'Clientes', settings:'Configuración' };
    topbarTitle.textContent = titles[viewName] || 'Admin';
    btnCreate.style.display = viewName === 'propiedades' ? 'flex' : 'none';
    if (viewName === 'propiedades') renderTable();
    if (viewName === 'clientes')    renderClients();
    if (viewName === 'dashboard')   renderDashboard();
  }

  navItems.forEach(n => n.addEventListener('click', () => switchView(n.dataset.view)));

  // ── Dashboard ─────────────────────────────────
  function renderDashboard() {
    const total       = properties.length;
    const disponibles = properties.filter(p => p.status === 'disponible').length;
    const reservados  = properties.filter(p => p.status === 'reservado').length;
    const vendidos    = properties.filter(p => p.status === 'vendido').length;
    setEl('statTotal', total);
    setEl('statDisp',  disponibles);
    setEl('statReserv', reservados);
    setEl('statVend',  vendidos);
    setEl('statClients', clients.length);

    const dashboardPropTableBody = document.getElementById('dashboardPropTableBody');
    if (dashboardPropTableBody) {
      const recent = properties.slice(0, 4);
      dashboardPropTableBody.innerHTML = recent.map(p => `
        <tr style="cursor: pointer;" onclick="switchView('propiedades')">
          <td><img class="prop-thumb" src="${p.img}" alt="${p.title}" loading="lazy" /></td>
          <td>
            <div class="prop-table-title">${p.title}</div>
            <div class="prop-table-addr">${p.addr}</div>
          </td>
          <td><span class="badge-sm ${p.tipo === 'alquiler' ? 'badge-alquiler-sm' : 'badge-venta-sm'}">${p.tipo === 'alquiler' ? 'Alquiler' : 'Venta'}</span></td>
          <td>${formatPrice(p.price, p.unit, p.tipo)}</td>
          <td>${statusBadge(p.status)}</td>
        </tr>
      `).join('') || `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--gray-500)">No hay propiedades registradas</td></tr>`;
    }
  }
  function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

  // ── Property Table ────────────────────────────
  function getFiltered() {
    return properties.filter(p => {
      const q = searchQuery.toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.addr.toLowerCase().includes(q);
      const matchS = filterStatus === 'all' || p.status === filterStatus;
      const matchT = filterTipo   === 'all' || p.tipo   === filterTipo;
      return matchQ && matchS && matchT;
    });
  }

  function statusBadge(s) {
    const map = {
      disponible: `<span class="badge-sm badge-disponible-sm">Disponible</span>`,
      reservado:  `<span class="badge-sm badge-reservado-sm">Reservado</span>`,
      vendido:    `<span class="badge-sm badge-vendido-sm">Vendido</span>`,
      alquiler:   `<span class="badge-sm badge-alquiler-sm">Alquiler</span>`,
    };
    return map[s] || `<span class="badge-sm">${s}</span>`;
  }

  function formatPrice(p, unit, tipo) {
    const sym = tipo === 'alquiler' ? 'USD' : 'USD';
    const val = tipo === 'alquiler' ? p.toLocaleString() : p.toLocaleString();
    return `<span class="prop-table-price">${sym} ${val}<span class="prop-table-price-unit">${unit}</span></span>`;
  }

  function renderTable() {
    const data  = getFiltered();
    const total = data.length;
    const pages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (currentPage > pages) currentPage = pages;
    const slice = data.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    tableInfo.textContent = `Mostrando ${slice.length ? (currentPage - 1) * PER_PAGE + 1 : 0}–${Math.min(currentPage * PER_PAGE, total)} de ${total} propiedades`;

    tableBody.innerHTML = slice.map(p => `
      <tr data-id="${p.id}">
        <td><img class="prop-thumb" src="${p.img}" alt="${p.title}" loading="lazy" /></td>
        <td>
          <div class="prop-table-title">${p.title}</div>
          <div class="prop-table-addr">${p.addr}</div>
        </td>
        <td><span class="badge-sm ${p.tipo === 'alquiler' ? 'badge-alquiler-sm' : 'badge-venta-sm'}">${p.tipo === 'alquiler' ? 'Alquiler' : 'Venta'}</span></td>
        <td>${formatPrice(p.price, p.unit, p.tipo)}</td>
        <td>${statusBadge(p.status)}</td>
        <td>
          <div class="table-actions">
            <button class="tbl-btn edit" data-action="edit" data-id="${p.id}" title="Editar propiedad" aria-label="Editar ${p.title}">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="tbl-btn del" data-action="delete" data-id="${p.id}" title="Eliminar propiedad" aria-label="Eliminar ${p.title}">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="5" style="text-align:center;padding:3rem;color:var(--gray-500)">No se encontraron propiedades</td></tr>`;

    renderPagination(total, pages);
    attachTableEvents();
  }

  function renderPagination(total, pages) {
    if (pages <= 1) { pagination.innerHTML = ''; return; }
    let html = `<button class="page-btn" id="pagePrev" ${currentPage === 1 ? 'disabled' : ''}>‹ Anterior</button>`;
    const range = getPageRange(currentPage, pages);
    range.forEach(p => {
      if (p === '...') html += `<span class="page-btn" style="cursor:default;border:none;">…</span>`;
      else html += `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    });
    html += `<button class="page-btn" id="pageNext" ${currentPage === pages ? 'disabled' : ''}>Siguiente ›</button>`;
    pagination.innerHTML = html;

    document.getElementById('pagePrev')?.addEventListener('click', () => { currentPage--; renderTable(); });
    document.getElementById('pageNext')?.addEventListener('click', () => { currentPage++; renderTable(); });
    pagination.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => { currentPage = parseInt(btn.dataset.page); renderTable(); });
    });
  }

  function getPageRange(current, total) {
    if (total <= 5) return Array.from({length: total}, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, '...', total];
    if (current >= total - 2) return [1, '...', total - 2, total - 1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
  }

  function attachTableEvents() {
    tableBody.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        if (btn.dataset.action === 'edit')   openEdit(id);
        if (btn.dataset.action === 'delete') openDelete(id);
      });
    });
    tableBody.querySelectorAll('tr[data-id]').forEach(row => {
      row.addEventListener('click', () => openEdit(parseInt(row.dataset.id)));
    });
  }

  searchInput?.addEventListener('input', () => { searchQuery = searchInput.value; currentPage = 1; renderTable(); });
  filterSel?.addEventListener('change',    () => { filterStatus = filterSel.value; currentPage = 1; renderTable(); });
  filterTipoSel?.addEventListener('change',() => { filterTipo = filterTipoSel.value; currentPage = 1; renderTable(); });

  // ── Edit Panel ────────────────────────────────
  function openEdit(id) {
    editPropId = id;
    const p = properties.find(x => x.id === id);
    if (!p) return;
    editPanelTitle.textContent = 'Editar Propiedad';
    fillForm(p);
    openPanel();
  }

  function openCreate() {
    editPropId = null;
    editPanelTitle.textContent = 'Nueva Propiedad';
    editForm.reset();
    uploadPreview.innerHTML = '';
    openPanel();
  }

  function openPanel() {
    editOverlay.classList.add('open');
    setTimeout(() => editPanel.classList.add('open'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    editPanel.classList.remove('open');
    setTimeout(() => { editOverlay.classList.remove('open'); document.body.style.overflow = ''; }, 350);
  }

  function fillForm(p) {
    document.getElementById('fTitle').value    = p.title;
    document.getElementById('fAddr').value     = p.addr;
    document.getElementById('fPrice').value    = p.price;
    document.getElementById('fTipo').value     = p.tipo;
    document.getElementById('fStatus').value   = p.status;
    document.getElementById('fAmb').value      = p.amb;
    document.getElementById('fBanos').value    = p.banos;
    document.getElementById('fM2').value       = p.m2;
    document.getElementById('fDesc').value     = p.desc || '';
    uploadPreview.innerHTML = p.img
      ? `<div class="upload-thumb"><img src="${p.img}" alt="preview" /><span class="upload-thumb-remove" title="Quitar">✕</span></div>`
      : '';
  }

  btnCreate?.addEventListener('click', openCreate);
  editClose?.addEventListener('click', closePanel);
  editOverlay?.addEventListener('click', e => { if (e.target === editOverlay) closePanel(); });

  editForm?.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      title:  document.getElementById('fTitle').value.trim(),
      addr:   document.getElementById('fAddr').value.trim(),
      price:  parseFloat(document.getElementById('fPrice').value) || 0,
      tipo:   document.getElementById('fTipo').value,
      status: document.getElementById('fStatus').value,
      amb:    parseInt(document.getElementById('fAmb').value) || 0,
      banos:  parseInt(document.getElementById('fBanos').value) || 0,
      m2:     parseInt(document.getElementById('fM2').value) || 0,
      unit:   document.getElementById('fTipo').value === 'alquiler' ? '/mes' : '',
      desc:   document.getElementById('fDesc').value.trim(),
    };
    if (editPropId) {
      const idx = properties.findIndex(x => x.id === editPropId);
      if (idx !== -1) { properties[idx] = { ...properties[idx], ...data }; }
      showToast('✓ Propiedad actualizada correctamente');
    } else {
      const newImg = uploadPreview.querySelector('img')?.src || '../../assets/media/prop1.jpg';
      properties.unshift({ id: nextId++, img: newImg, ...data });
      showToast('✓ Propiedad creada correctamente');
    }
    closePanel();
    renderTable();
    renderDashboard();
  });

  // ── Delete ────────────────────────────────────
  function openDelete(id) {
    deletePropId = id;
    deleteClientId = null;
    const p = properties.find(x => x.id === id);
    document.getElementById('deleteModalTitle').textContent = '¿Eliminar propiedad?';
    document.getElementById('deleteModalName').textContent = p?.title || 'esta propiedad';
    deleteModal.classList.add('open');
  }
  btnDelCancel?.addEventListener('click',  () => { deleteModal.classList.remove('open'); deletePropId = null; deleteClientId = null; });
  btnDelConfirm?.addEventListener('click', () => {
    if (deletePropId) {
      properties = properties.filter(x => x.id !== deletePropId);
      deletePropId = null;
      renderTable();
      renderDashboard();
      showToast('✓ Propiedad eliminada');
    } else if (deleteClientId) {
      clients = clients.filter(x => x.id !== deleteClientId);
      deleteClientId = null;
      renderClients();
      renderDashboard();
      showToast('✓ Cliente eliminado');
    }
    deleteModal.classList.remove('open');
  });
  deleteModal?.addEventListener('click', e => { if (e.target === deleteModal) { deleteModal.classList.remove('open'); deletePropId = null; } });

  // ── Upload Zone ───────────────────────────────
  uploadZone?.addEventListener('click', () => uploadInput?.click());
  uploadInput?.addEventListener('change', () => {
    const files = Array.from(uploadInput.files).slice(0, 5);
    uploadPreview.innerHTML = '';
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = e => {
        const div = document.createElement('div');
        div.className = 'upload-thumb';
        div.innerHTML = `<img src="${e.target.result}" alt="preview" /><span class="upload-thumb-remove" title="Quitar">✕</span>`;
        div.querySelector('.upload-thumb-remove').addEventListener('click', () => div.remove());
        uploadPreview.appendChild(div);
      };
      reader.readAsDataURL(f);
    });
  });

  ['dragover','dragenter'].forEach(ev => uploadZone?.addEventListener(ev, e => { e.preventDefault(); uploadZone.classList.add('drag-over'); }));
  ['dragleave','drop'].forEach(ev => uploadZone?.addEventListener(ev, e => { e.preventDefault(); uploadZone.classList.remove('drag-over'); }));

  // ── Clients ───────────────────────────────────
  let deleteClientId = null;
  function attachClientTableEvents() {
    clientTableBody.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        if (btn.dataset.action === 'delete-client') openDeleteClient(id);
      });
    });
  }

  function openDeleteClient(id) {
    deleteClientId = id;
    const c = clients.find(x => x.id === id);
    document.getElementById('deleteModalTitle').textContent = '¿Eliminar cliente?';
    document.getElementById('deleteModalName').textContent = c?.nombre || 'este cliente';
    deleteModal.classList.add('open');
  }

  function renderClients() {
    if (!clientTableBody) return;
    clientTableBody.innerHTML = clients.map(c => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <div class="client-avatar">${c.nombre.charAt(0)}</div>
            <div>
              <div style="font-weight:600;color:var(--navy-900);font-size:0.875rem;">${c.nombre}</div>
              <div style="font-size:0.72rem;color:var(--gray-500);">${c.email}</div>
            </div>
          </div>
        </td>
        <td style="font-size:0.82rem;">${c.tel}</td>
        <td><span class="badge-sm badge-disponible-sm">${c.favs} guardados</span></td>
        <td style="font-size:0.82rem;">${c.consultas} consultas</td>
        <td style="font-size:0.75rem;color:var(--gray-500);">${new Date(c.fecha).toLocaleDateString('es-AR')}</td>
        <td>
          <div class="table-actions">
            <button class="tbl-btn" title="Ver perfil" aria-label="Ver perfil de ${c.nombre}">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="tbl-btn edit" title="Enviar mensaje" aria-label="Enviar mensaje a ${c.nombre}">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
            <button class="tbl-btn del" data-action="delete-client" data-id="${c.id}" title="Eliminar cliente" aria-label="Eliminar ${c.nombre}">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
    attachClientTableEvents();
  }

  // ── Toast ─────────────────────────────────────
  function showToast(msg) {
    let toast = document.querySelector('.admin-toast');
    if (!toast) { toast = document.createElement('div'); toast.className = 'admin-toast'; document.body.appendChild(toast); }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // ── Keyboard shortcuts ────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePanel();
      deleteModal?.classList.remove('open');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); searchInput?.focus(); }
  });

  // ── Logout ────────────────────────────────────
  document.getElementById('btnLogout')?.addEventListener('click', () => {
    showToast('✓ Sesión cerrada');
    setTimeout(() => window.location.href = '../../index.html', 1000);
  });

  // ── Init ─────────────────────────────────────
  switchView('dashboard');

});
