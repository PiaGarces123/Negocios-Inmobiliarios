/**
 * miCuenta.js
 * Lógica para las vistas de Propietario dentro de Mi Cuenta:
 *  - Navegación entre todas las vistas (extiende misFavoritos.js)
 *  - Vista 5: Mis Propiedades (crear, listar, filtrar, eliminar)
 *  - Vista 6: Inmuebles Asignados
 * Requiere: misFavoritos.js cargado antes (maneja favoritos/citas/alertas)
 */

(function () {
  'use strict';

  /* =============================================
     DATOS DEMO
     ============================================= */

  /** Propiedades enviadas por el propietario */
  const mcPropiedades = [
    {
      id: 1,
      title: 'Casa moderna con jardín y quincho',
      addr: 'Av. del Libertador 5700, Palermo',
      tipo: 'venta',
      price: 280000,
      ambientes: 4,
      banos: 2,
      m2: 220,
      status: 'aprobada',
      img: '../../assets/media/prop1.jpg',
      fecha: '2025-01-15',
    },
    {
      id: 2,
      title: 'Depto. en Armenia con terraza privada',
      addr: 'Armenia 1542, Villa Crespo',
      tipo: 'alquiler',
      price: 1800,
      ambientes: 2,
      banos: 1,
      m2: 65,
      status: 'en-revision',
      img: '../../assets/media/prop2.jpg',
      fecha: '2025-08-20',
    },
    {
      id: 3,
      title: 'PH con vista al río en Puerto Madero',
      addr: 'Alicia Moreau de Justo 740, Puerto Madero',
      tipo: 'venta',
      price: 520000,
      ambientes: 5,
      banos: 3,
      m2: 340,
      status: 'rechazada',
      img: '../../assets/media/prop4.jpg',
      fecha: '2025-07-10',
      motivo: 'Fotos insuficientes y precio sin sustento de mercado.',
    },
    {
      id: 4,
      title: 'Casa en barrio cerrado, Tigre',
      addr: 'Calle Las Palmas 456, Nordelta, Tigre',
      tipo: 'venta',
      price: 195000,
      ambientes: 3,
      banos: 2,
      m2: 180,
      status: 'vendida',
      img: '../../assets/media/prop3.jpg',
      fecha: '2025-06-01',
    },
  ];

  /** Inmuebles asignados al usuario (como propietario o inquilino) */
  const mcInmueblesAsignados = [
    {
      id: 1,
      title: 'Casa moderna con jardín y quincho',
      addr: 'Av. del Libertador 5700, Palermo',
      tipo: 'venta',
      price: 280000,
      rol: 'propietario',
      img: '../../assets/media/prop1.jpg',
      asesor: 'Martín Gómez'
    },
    {
      id: 5,
      title: 'Departamento Premium con Amenities',
      addr: 'Posadas 1640, Recoleta',
      tipo: 'alquiler',
      price: 2200,
      rol: 'inquilino',
      img: '../../assets/media/prop2.jpg',
      asesor: 'Laura Fernández'
    },
  ];

  /* =============================================
     ESTADO INTERNO
     ============================================= */
  let propiedades = [...mcPropiedades];
  let deleteTargetId = null;
  let uploadedFiles = [];

  /* =============================================
     NAVEGACIÓN ENTRE VISTAS
     El script misFavoritos.js ya maneja las vistas
     1-4. Extendemos su lógica para 5 y 6.
     ============================================= */

  /**
   * Oculta todas las account-views y activa la indicada.
   * Compatible con la estructura de misFavoritos.js.
   */
  function switchView(viewId) {
    document.querySelectorAll('.account-view').forEach((v) => v.classList.add('hidden'));
    document.querySelectorAll('.account-nav-item').forEach((b) => {
      b.classList.remove('active');
      b.removeAttribute('aria-current');
    });

    const targetView = document.getElementById('view-' + viewId);
    if (targetView) targetView.classList.remove('hidden');

    const targetBtn = document.querySelector(`[data-view="${viewId}"]`);
    if (targetBtn) {
      targetBtn.classList.add('active');
      targetBtn.setAttribute('aria-current', 'page');
    }

    // Vistas que requieren renderizado
    if (viewId === 'mis-propiedades') renderMisPropiedades();
    if (viewId === 'inmuebles-asignados') renderInmueblesAsignados();
    if (viewId === 'seguridad') {
      // Redirigir a perfil y hacer scroll al bloque de seguridad
      switchViewSilent('perfil');
      setTimeout(() => {
        const sec = document.getElementById('section-seguridad');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    // Cerrar menú móvil si aplica
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
    }
  }

  /** Cambia vista sin lógica extra (para seguridad→perfil redirect) */
  function switchViewSilent(viewId) {
    document.querySelectorAll('.account-view').forEach((v) => v.classList.add('hidden'));
    document.querySelectorAll('.account-nav-item').forEach((b) => {
      b.classList.remove('active');
      b.removeAttribute('aria-current');
    });
    const v = document.getElementById('view-' + viewId);
    if (v) v.classList.remove('hidden');
    const b = document.querySelector(`[data-view="${viewId}"]`);
    if (b) { b.classList.add('active'); b.setAttribute('aria-current', 'page'); }
  }

  /* =============================================
     RENDER — MIS PROPIEDADES
     ============================================= */

  function renderResumen() {
    const counts = { 'en-revision': 0, aprobada: 0, rechazada: 0, cerrada: 0 };
    propiedades.forEach((p) => {
      if (p.status === 'vendida' || p.status === 'alquilada') counts.cerrada++;
      else if (counts[p.status] !== undefined) counts[p.status]++;
    });
    setText('mcStatRevision',  counts['en-revision']);
    setText('mcStatAprobada',  counts.aprobada);
    setText('mcStatRechazada', counts.rechazada);
    setText('mcStatCerrada',   counts.cerrada);

    // Badge del sidebar
    const badge = document.getElementById('mcNavPropBadge');
    if (badge) badge.textContent = propiedades.length;
  }

  function renderMisPropiedades() {
    renderResumen();
    const search = (document.getElementById('mcPropSearch')?.value || '').toLowerCase();
    const filtro = document.getElementById('mcPropFiltro')?.value || 'todos';

    let lista = propiedades.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search) || p.addr.toLowerCase().includes(search);
      const matchFiltro = filtro === 'todos' || p.status === filtro;
      return matchSearch && matchFiltro;
    });

    const container = document.getElementById('mcPropList');
    const empty = document.getElementById('mcPropEmpty');
    if (!container) return;

    if (lista.length === 0) {
      container.innerHTML = '';
      if (empty) empty.style.display = '';
      return;
    }

    if (empty) empty.style.display = 'none';
    container.innerHTML = lista.map(propItemHTML).join('');
    
    // Add reveal animation
    revealCards();
  }

  function propItemHTML(p) {
    const statusMap = {
      'en-revision': { label: 'En revisión',  cls: 'mc-badge-revision', color: '#b45309' },
      aprobada:      { label: 'Aprobada',      cls: 'mc-badge-aprobada', color: '#059669' },
      rechazada:     { label: 'Rechazada',     cls: 'mc-badge-rechazada', color: '#dc2626' },
      vendida:       { label: 'Vendida',       cls: 'mc-badge-vendida', color: 'var(--navy-700)' },
      alquilada:     { label: 'Alquilada',     cls: 'mc-badge-alquilada', color: '#4f46e5' },
    };
    const st = statusMap[p.status] || { label: p.status, cls: '', color: '#000' };
    const tipoLabel = p.tipo === 'venta' ? 'Venta' : 'Alquiler';
    const precio = formatPrice(p.price, p.tipo);

    const puedeEliminar = p.status === 'en-revision' || p.status === 'rechazada';
    const actionBtn = puedeEliminar
      ? `<button class="mc-btn-del-prop" data-id="${p.id}" style="width:100%; justify-content:center; margin-top:1rem;">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
           Eliminar
         </button>`
      : ``;

    const motivoHTML = p.motivo
      ? `<div class="mc-item-rechazado-motivo" title="${p.motivo}" style="margin-top:0.75rem; white-space:normal;">⚠ ${p.motivo}</div>`
      : '';

    const imgHTML = p.img
      ? `<img src="${p.img}" alt="${escapeHTML(p.title)}" loading="lazy" width="400" height="300" onerror="this.style.display='none'">`
      : `<div style="width:100%;height:300px;background:#f8f9fa;display:flex;align-items:center;justify-content:center;color:#9ca3af;">Sin foto</div>`;

    // Iconos reutilizados
    const iconPin = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
    const iconHome = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
    const iconBath = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path><line x1="10" y1="5" x2="8" y2="7"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="7" y1="19" x2="7" y2="21"></line><line x1="17" y1="19" x2="17" y2="21"></line></svg>`;
    const iconRuler = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 1 0 2.828 2.828z"></path><path d="m3 14 4 4"></path><path d="m9 8 4 4"></path><path d="m15 2 4 4"></path></svg>`;

    return `
      <article class="property-card reveal" data-id="${p.id}">
        <div class="card-image-wrap">
          ${imgHTML}
          <span class="card-type">${tipoLabel}</span>
          <span class="card-badge ${st.cls}" style="position:absolute; top:1rem; right:1rem; z-index:2; padding:0.35rem 0.65rem; border-radius:6px; font-weight:700; font-size:0.7rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border:none; background:var(--white); color:${st.color};">${st.label}</span>
        </div>
        <div class="card-body">
          <div class="card-price">${precio}</div>
          <h3 class="card-title" style="margin-bottom:0.25rem;">${escapeHTML(p.title)}</h3>
          <p class="card-location">${iconPin} ${escapeHTML(p.addr)}</p>
          <div class="card-features" style="margin-top:0.75rem;">
            ${p.ambientes ? `<div class="card-feature">${iconHome} ${p.ambientes} Amb.</div>` : ''}
            ${p.banos ? `<div class="card-feature">${iconBath} ${p.banos} Baños</div>` : ''}
            ${p.m2 ? `<div class="card-feature">${iconRuler} ${p.m2} m²</div>` : ''}
          </div>
          ${motivoHTML}
          ${actionBtn}
        </div>
      </article>`;
  }

  /* =============================================
     RENDER — INMUEBLES ASIGNADOS
     ============================================= */

  function renderInmueblesAsignados() {
    const grid = document.getElementById('mcAsignadosGrid');
    const empty = document.getElementById('mcAsignadosEmpty');
    if (!grid) return;

    if (mcInmueblesAsignados.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.style.display = '';
      return;
    }

    if (empty) empty.style.display = 'none';
    grid.innerHTML = mcInmueblesAsignados.map(asignadoCardHTML).join('');
    
    // Add reveal animation
    revealCards();
  }

  function asignadoCardHTML(p) {
    const tipoLabel = p.tipo === 'venta' ? 'Venta' : 'Alquiler';
    const rolLabel  = p.rol === 'propietario' ? 'Propietario' : 'Inquilino';
    const rolColor  = p.rol === 'propietario' ? '#92400e' : '#065f46';
    const precio    = formatPrice(p.price, p.tipo);
    const asesor    = p.asesor || 'Asesor Asignado';

    const imgHTML = p.img
      ? `<img src="${p.img}" alt="${escapeHTML(p.title)}" loading="lazy" width="400" height="300" onerror="this.style.display='none'">`
      : `<div style="width:100%;height:300px;background:#f8f9fa;display:flex;align-items:center;justify-content:center;color:#9ca3af;">Sin foto</div>`;

    const iconPin = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
    const iconUser = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

    return `
      <article class="property-card reveal" data-id="${p.id}">
        <div class="card-image-wrap">
          ${imgHTML}
          <span class="card-type">${tipoLabel}</span>
          <span class="card-badge" style="position:absolute; top:1rem; right:1rem; z-index:2; padding:0.35rem 0.65rem; border-radius:6px; font-weight:700; font-size:0.7rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border:none; background:var(--white); color:${rolColor};">${rolLabel}</span>
        </div>
        <div class="card-body">
          <div class="card-price">${precio}</div>
          <h3 class="card-title" style="margin-bottom:0.25rem;">${escapeHTML(p.title)}</h3>
          <p class="card-location">${iconPin} ${escapeHTML(p.addr)}</p>
          <div style="margin-top:1rem; padding-top:1rem; border-top:1px solid var(--gray-100); display:flex; align-items:center; font-size:0.8rem; color:var(--gray-600);">
            ${iconUser} Asesor: <strong style="color:var(--navy-900);">&nbsp;${escapeHTML(asesor)}</strong>
          </div>
        </div>
      </article>`;
  }

  /* =============================================
     PANEL LATERAL — CREAR PROPIEDAD
     ============================================= */

  function openPanel() {
    document.getElementById('mcEditPanel')?.classList.add('open');
    document.getElementById('mcOverlay')?.classList.add('open');
    document.getElementById('mcOverlay')?.removeAttribute('aria-hidden');
    document.getElementById('mcFTitle')?.focus();
  }

  function closePanel() {
    document.getElementById('mcEditPanel')?.classList.remove('open');
    document.getElementById('mcOverlay')?.classList.remove('open');
    document.getElementById('mcOverlay')?.setAttribute('aria-hidden', 'true');
    resetForm();
  }

  function resetForm() {
    const form = document.getElementById('mcFormPropiedad');
    if (form) form.reset();
    uploadedFiles = [];
    const preview = document.getElementById('mcUploadPreview');
    if (preview) preview.innerHTML = '';
    document.querySelectorAll('.mc-form-group input.invalid, .mc-form-group select.invalid')
      .forEach((el) => el.classList.remove('invalid'));
  }

  /* =============================================
     MODAL — ELIMINAR
     ============================================= */

  function openDeleteModal(id) {
    const prop = propiedades.find((p) => p.id === id);
    if (!prop) return;
    deleteTargetId = id;
    const nameEl = document.getElementById('mcDeleteName');
    if (nameEl) nameEl.textContent = `"${prop.title}"`;
    document.getElementById('mcDeleteModal')?.classList.add('open');
  }

  function closeDeleteModal() {
    document.getElementById('mcDeleteModal')?.classList.remove('open');
    deleteTargetId = null;
  }

  function confirmDelete() {
    if (deleteTargetId === null) return;
    propiedades = propiedades.filter((p) => p.id !== deleteTargetId);
    closeDeleteModal();
    renderMisPropiedades();
    showToast('Propiedad eliminada correctamente.', 'success');
  }

  /* =============================================
     GUARDAR NUEVA PROPIEDAD
     ============================================= */

  function saveNewProperty() {
    const title = document.getElementById('mcFTitle')?.value.trim();
    const addr  = document.getElementById('mcFAddr')?.value.trim();
    const tipo  = document.getElementById('mcFTipo')?.value;
    const price = parseFloat(document.getElementById('mcFPrice')?.value);

    let valid = true;
    [['mcFTitle', title], ['mcFAddr', addr], ['mcFPrice', price]].forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (!val || (id === 'mcFPrice' && isNaN(val))) {
        el?.classList.add('invalid');
        valid = false;
      } else {
        el?.classList.remove('invalid');
      }
    });

    if (!valid) {
      showToast('Completá los campos obligatorios.', 'error');
      return;
    }

    const newProp = {
      id: Date.now(),
      title,
      addr,
      tipo,
      price,
      ambientes: parseInt(document.getElementById('mcFAmb')?.value) || 0,
      banos:     parseInt(document.getElementById('mcFBanos')?.value) || 0,
      m2:        parseInt(document.getElementById('mcFM2')?.value) || 0,
      status:    'en-revision',
      fecha:     new Date().toISOString().split('T')[0],
      img:       uploadedFiles.length ? uploadedFiles[0] : '',
    };

    propiedades.unshift(newProp);
    closePanel();
    renderMisPropiedades();
    showToast('¡Propiedad enviada a revisión!', 'success');
  }

  /* =============================================
     UPLOAD DE FOTOS
     ============================================= */

  function handleFiles(files) {
    const maxFiles = 5;
    const preview  = document.getElementById('mcUploadPreview');
    if (!preview) return;

    Array.from(files).slice(0, maxFiles - uploadedFiles.length).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedFiles.push(e.target.result);
        const thumb = document.createElement('div');
        thumb.className = 'mc-upload-thumb';
        thumb.innerHTML = `
          <img src="${e.target.result}" alt="Foto cargada">
          <button class="mc-upload-thumb-remove" type="button" aria-label="Quitar foto">×</button>`;
        thumb.querySelector('.mc-upload-thumb-remove').addEventListener('click', () => {
          const idx = [...preview.children].indexOf(thumb);
          uploadedFiles.splice(idx, 1);
          thumb.remove();
        });
        preview.appendChild(thumb);
      };
      reader.readAsDataURL(file);
    });
  }

  /* =============================================
     TOAST
     ============================================= */

  function showToast(msg, type = 'default') {
    let toast = document.getElementById('mcToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mcToast';
      toast.className = 'mc-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.className = `mc-toast${type !== 'default' ? ' ' + type : ''}`;
    toast.textContent = msg;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  /* =============================================
     HELPERS
     ============================================= */

  function formatPrice(price, tipo) {
    const formatted = price.toLocaleString('es-AR');
    return tipo === 'alquiler' ? `USD ${formatted}/mes` : `USD ${formatted}`;
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function revealCards() {
    const items = document.querySelectorAll('.reveal:not(.visible)');
    if (!items.length) return;
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    items.forEach((el) => ro.observe(el));
  }

  /* =============================================
     INICIALIZACIÓN
     ============================================= */

  function init() {
    /* ── Navegación extendida ── */
    document.querySelectorAll('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    /* ── Botones crear propiedad ── */
    ['btnPublicarPropiedad', 'btnPublicarPropiedadEmpty'].forEach((id) => {
      document.getElementById(id)?.addEventListener('click', openPanel);
    });

    /* ── Panel lateral ── */
    document.getElementById('mcEditPanelClose')?.addEventListener('click', closePanel);
    document.getElementById('mcBtnCancelPanel')?.addEventListener('click', closePanel);
    document.getElementById('mcOverlay')?.addEventListener('click', closePanel);
    document.getElementById('mcBtnSavePanel')?.addEventListener('click', saveNewProperty);

    /* ── Eliminar desde tarjeta ── */
    document.getElementById('mcPropList')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.mc-btn-del-prop');
      if (btn) openDeleteModal(parseInt(btn.dataset.id));
    });

    /* ── Modal de eliminación ── */
    document.getElementById('mcBtnDelCancel')?.addEventListener('click', closeDeleteModal);
    document.getElementById('mcBtnDelConfirm')?.addEventListener('click', confirmDelete);

    /* ── Búsqueda y filtro ── */
    document.getElementById('mcPropSearch')?.addEventListener('input', renderMisPropiedades);
    document.getElementById('mcPropFiltro')?.addEventListener('change', renderMisPropiedades);

    /* ── Upload de fotos ── */
    const zone  = document.getElementById('mcUploadZone');
    const input = document.getElementById('mcFotos');

    zone?.addEventListener('click', () => input?.click());
    zone?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') input?.click(); });
    input?.addEventListener('change', () => handleFiles(input.files));

    zone?.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone?.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone?.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });

    /* ── Cerrar sesión ── */
    document.getElementById('nav-salir')?.addEventListener('click', () => {
      if (confirm('¿Cerrar sesión?')) window.location.href = '../../index.html';
    });

    /* ── Teclado: ESC cierra panel/modal ── */
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (document.getElementById('mcDeleteModal')?.classList.contains('open')) closeDeleteModal();
      else if (document.getElementById('mcEditPanel')?.classList.contains('open')) closePanel();
    });

    /* ── Render inicial (si la URL trae #mis-propiedades) ── */
    if (window.location.hash === '#mis-propiedades') switchView('mis-propiedades');
    else if (window.location.hash === '#inmuebles-asignados') switchView('inmuebles-asignados');

    /* Badge inicial */
    const badge = document.getElementById('mcNavPropBadge');
    if (badge) badge.textContent = propiedades.length;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
