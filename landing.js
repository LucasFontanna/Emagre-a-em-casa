(function () {
  "use strict";

  // ----------------------------------------------------------------------
  // ANALYTICS / FUNIL — mesma estrutura de eventos usada no quiz.
  // Plugue GA4 / Meta Pixel aqui quando tiver os IDs.
  // ----------------------------------------------------------------------
  function track(eventName, payload) {
    console.log('[funil]', eventName, payload || {});
  }
  track('landing_viewed', { ref: document.referrer || null });

  // ----------------------------------------------------------------------
  // CHECKOUT — todos os CTAs já usam <a href> direto (funcionam sem JS).
  // Aqui só disparamos o evento de clique.
  // ----------------------------------------------------------------------
  document.querySelectorAll('.checkout-btn').forEach(btn => {
    btn.addEventListener('click', () => track('checkout_clicked', { href: btn.getAttribute('href') }));
  });

  // ----------------------------------------------------------------------
  // CONTINUIDADE COM O QUIZ
  // Se o visitante veio do quiz (?perfil=a|b|c), mostra uma barra sutil
  // de continuidade no topo da landing.
  // ----------------------------------------------------------------------
  const PROFILE_LABELS = {
    a: "Rotina em Construção",
    b: "Buscando Consistência",
    c: "Pronto para uma Nova Rotina",
  };

  function initProfileBanner() {
    const params = new URLSearchParams(window.location.search);
    let profile = params.get('perfil');
    if (!profile) {
      try { profile = sessionStorage.getItem('quiz_profile'); } catch (e) {}
    }
    if (profile && PROFILE_LABELS[profile]) {
      const banner = document.getElementById('profileBanner');
      banner.textContent = `Baseado no seu perfil: ${PROFILE_LABELS[profile]} — veja como o Emagreça em Casa pode ajudar`;
      banner.classList.add('show');
      track('landing_viewed', { profile });
    }
  }
  initProfileBanner();

  // ----------------------------------------------------------------------
  // Scroll reveal, com fallback para quem não tem IntersectionObserver
  // ----------------------------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ----------------------------------------------------------------------
  // Lightbox simples para a galeria de resultados/prova social
  // ----------------------------------------------------------------------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox) {
    document.querySelectorAll('.social-card').forEach(card => {
      card.addEventListener('click', () => {
        if (card.classList.contains('img-fallback')) return; // sem imagem real ainda
        const full = card.getAttribute('data-full');
        lightboxImg.src = full;
        lightboxImg.alt = card.querySelector('img').alt;
        lightbox.hidden = false;
        track('result_image_opened', { src: full });
      });
    });
    const closeLightbox = () => { lightbox.hidden = true; lightboxImg.src = ''; };
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ----------------------------------------------------------------------
  // Prévia do planner de 30 dias
  // ----------------------------------------------------------------------
  const grid = document.getElementById('streakGrid');
  if (grid) {
    const totalDays = 30;
    const previewFilled = 6;
    for (let i = 0; i < totalDays; i++) {
      const cell = document.createElement('div');
      cell.className = 'streak-cell';
      grid.appendChild(cell);
    }
    const cells = grid.querySelectorAll('.streak-cell');
    let streakStarted = false;
    const fillPreview = () => {
      if (streakStarted) return;
      streakStarted = true;
      for (let i = 0; i < previewFilled; i++) {
        setTimeout(() => cells[i].classList.add('filled'), i * 90);
      }
    };
    if ('IntersectionObserver' in window) {
      const streakObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) fillPreview(); });
      }, { threshold: 0.4 });
      streakObserver.observe(document.querySelector('.streak-panel'));
    } else {
      fillPreview();
    }
  }
})();