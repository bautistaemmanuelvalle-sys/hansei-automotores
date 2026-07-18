// ============================================
// HANSEI AUTOMOTORES — script.js
// ============================================

const WHATSAPP_NUMBER = '5491169024795';

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initFilters();
  initFaq();
  initSimulator();
  initTasacionForm();
  initContactForm();
  initBackToTop();
});

/* ---------- Mobile menu ---------- */
function initMenu(){
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if(!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Catalog filters ---------- */
function initFilters(){
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.car-card');
  const empty = document.getElementById('catalogEmpty');
  if(!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      let visibleCount = 0;

      cards.forEach(card => {
        const cats = card.dataset.cat || '';
        const show = filter === 'todos' || cats.includes(filter);
        card.style.display = show ? '' : 'none';
        if(show) visibleCount++;
      });

      if(empty) empty.hidden = visibleCount > 0;
    });
  });
}

/* ---------- FAQ accordion ---------- */
function initFaq(){
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });
}

/* ---------- Financing simulator ---------- */
function initSimulator(){
  const valorRange = document.getElementById('valorRange');
  const anticipoRange = document.getElementById('anticipoRange');
  const cuotasRange = document.getElementById('cuotasRange');
  if(!valorRange) return;

  const valorOut = document.getElementById('valorOut');
  const anticipoOut = document.getElementById('anticipoOut');
  const cuotasOut = document.getElementById('cuotasOut');
  const cuotaOut = document.getElementById('cuotaOut');

  const ANNUAL_RATE = 0.12; // tasa anual estimada, ajustable

  function formatUSD(n){
    return 'USD ' + Math.round(n).toLocaleString('es-AR');
  }

  function calculate(){
    const valor = Number(valorRange.value);
    const anticipoPct = Number(anticipoRange.value);
    const meses = Number(cuotasRange.value);

    const anticipoMonto = valor * (anticipoPct / 100);
    const montoFinanciado = valor - anticipoMonto;
    const tasaMensual = ANNUAL_RATE / 12;

    // Amortización francesa
    const cuota = montoFinanciado *
      (tasaMensual * Math.pow(1 + tasaMensual, meses)) /
      (Math.pow(1 + tasaMensual, meses) - 1);

    valorOut.textContent = formatUSD(valor);
    anticipoOut.textContent = anticipoPct + '%';
    cuotasOut.textContent = meses + ' meses';
    cuotaOut.textContent = formatUSD(cuota);
  }

  [valorRange, anticipoRange, cuotasRange].forEach(input => {
    input.addEventListener('input', calculate);
  });

  calculate();
}

/* ---------- Tasación form -> WhatsApp ---------- */
function initTasacionForm(){
  const form = document.getElementById('tasacionForm');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const message = `Hola Norberto, quiero solicitar una tasación 🚗

*DATOS DEL VEHÍCULO*
• Marca: ${data.marca || ''}
• Modelo: ${data.modelo || ''}
• Versión: ${data.version || ''}
• Año: ${data.anio || ''}
• Kilómetros: ${data.km || ''}
• Transmisión: ${data.transmision || ''}
• Combustible: ${data.combustible || ''}
• Color: ${data.color || ''}
• Patente: ${data.patente || ''}
• Ciudad/Provincia: ${data.ciudad || ''}

*ESTADO DEL VEHÍCULO*
• Estado general: ${data.estado || ''}

*EQUIPAMIENTO*
• ${data.equipamiento || ''}

*MIS DATOS*
• Nombre y Apellido: ${data.nombre || ''}
• Teléfono: ${data.telefono || ''}
• Email: ${data.email || ''}
• Comentarios: ${data.comentarios || ''}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}

/* ---------- Contact form -> WhatsApp ---------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const message = `Hola, me comunico desde la web de HANSEI

*Nombre:* ${data.nombre || ''}
*Teléfono:* ${data.telefono || ''}
*Email:* ${data.email || ''}
*Motivo:* ${data.motivo || ''}
*Mensaje:* ${data.mensaje || ''}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}

/* ---------- Back to top ---------- */
function initBackToTop(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
