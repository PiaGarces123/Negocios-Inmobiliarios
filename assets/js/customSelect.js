// =============================================
// NEGOCIOS INMOBILIARIOS — customSelect.js
// Dropdown con position:fixed para escapar
// cualquier stacking context del DOM.
// =============================================

(function () {
  'use strict';

  const CHEVRON_SVG = `
    <svg class="cs-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`;

  function buildCustomSelect(nativeSelect) {
    if (nativeSelect.dataset.csInit) return;
    nativeSelect.dataset.csInit = 'true';

    // ── Wrapper ──────────────────────────────
    const wrapper = document.createElement('div');
    wrapper.className = 'cs-wrapper';
    if (nativeSelect.dataset.csTheme) wrapper.classList.add(nativeSelect.dataset.csTheme);

    nativeSelect.parentNode.insertBefore(wrapper, nativeSelect);
    wrapper.appendChild(nativeSelect);

    // ── Trigger ──────────────────────────────
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'cs-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const triggerText = document.createElement('span');
    triggerText.className = 'cs-trigger-text';
    trigger.appendChild(triggerText);
    trigger.insertAdjacentHTML('beforeend', CHEVRON_SVG);
    wrapper.appendChild(trigger);

    // ── Dropdown — appendeado al <body> para escapar stacking contexts ──
    const dropdown = document.createElement('div');
    dropdown.className = 'cs-dropdown';
    dropdown.setAttribute('role', 'listbox');
    document.body.appendChild(dropdown);

    // ── Posicionar el dropdown bajo el trigger ──
    function positionDropdown() {
      const rect = trigger.getBoundingClientRect();
      const dropW = Math.max(rect.width, 180);
      dropdown.style.width = dropW + 'px';

      // Intentar colocar abajo; si no cabe, colocar arriba
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropH = dropdown.offsetHeight || 200;

      if (spaceBelow >= dropH + 8 || spaceBelow >= 120) {
        dropdown.style.top  = (rect.bottom + 8) + 'px';
      } else {
        dropdown.style.top  = (rect.top - dropH - 8) + 'px';
      }

      // Centrar horizontalmente bajo el trigger, sin salir de la pantalla
      let left = rect.left + rect.width / 2 - dropW / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - dropW - 8));
      dropdown.style.left = left + 'px';
    }

    // ── Poblar opciones ──────────────────────
    function renderOptions() {
      dropdown.innerHTML = '';
      Array.from(nativeSelect.options).forEach((opt, i) => {
        const item = document.createElement('div');
        item.className = 'cs-option' + (opt.selected ? ' selected' : '');
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', opt.selected ? 'true' : 'false');
        item.dataset.value = opt.value;
        item.dataset.index = i;
        item.textContent = opt.text;
        dropdown.appendChild(item);
      });

      const selected = nativeSelect.options[nativeSelect.selectedIndex];
      triggerText.textContent = selected ? selected.text : '';
    }

    renderOptions();

    // ── Open / Close ─────────────────────────
    function openDropdown() {
      // Cerrar cualquier otro abierto primero
      document.querySelectorAll('.cs-wrapper.open').forEach(w => {
        if (w !== wrapper) w.classList.remove('open');
      });

      positionDropdown();
      wrapper.classList.add('open');
      dropdown.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      wrapper.classList.remove('open');
      dropdown.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    function toggleDropdown() {
      wrapper.classList.contains('open') ? closeDropdown() : openDropdown();
    }

    // ── Seleccionar opción ────────────────────
    function selectOption(index) {
      nativeSelect.selectedIndex = index;
      nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
      renderOptions();
      closeDropdown();
    }

    // ── Eventos ──────────────────────────────
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    dropdown.addEventListener('click', (e) => {
      const opt = e.target.closest('.cs-option');
      if (!opt) return;
      selectOption(Number(opt.dataset.index));
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(); }
      else if (e.key === 'Escape') { closeDropdown(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); selectOption(Math.min(nativeSelect.selectedIndex + 1, nativeSelect.options.length - 1)); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); selectOption(Math.max(nativeSelect.selectedIndex - 1, 0)); }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target) && !dropdown.contains(e.target)) closeDropdown();
    }, true);

    // Reposicionar al scrollear o redimensionar
    window.addEventListener('scroll', () => { if (wrapper.classList.contains('open')) positionDropdown(); }, { passive: true });
    window.addEventListener('resize', () => { if (wrapper.classList.contains('open')) positionDropdown(); }, { passive: true });

    // Si el select nativo cambia por JS, sincronizar
    nativeSelect.addEventListener('change', () => {
      const selected = nativeSelect.options[nativeSelect.selectedIndex];
      triggerText.textContent = selected ? selected.text : '';
      dropdown.querySelectorAll('.cs-option').forEach((el, i) => {
        const isSel = i === nativeSelect.selectedIndex;
        el.classList.toggle('selected', isSel);
        el.setAttribute('aria-selected', isSel ? 'true' : 'false');
      });
    });
  }

  // ── Inicializar todos los .custom-select ──
  function init() {
    document.querySelectorAll('select.custom-select').forEach(buildCustomSelect);
  }

  // Disponible globalmente
  window.CustomSelect = { init, buildCustomSelect };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
