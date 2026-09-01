(function () {
  "use strict";

  function track(eventName, payload) {
    console.log('[funil]', eventName, payload || {});
  }
  track('exit_offer_viewed', { ref: document.referrer || null });

  document.getElementById('btnOffer').addEventListener('click', () => {
    track('exit_offer_checkout_clicked');
  });
  document.getElementById('skipLink').addEventListener('click', () => {
    track('exit_offer_skipped');
  });

  // ----------------------------------------------------------------------
  // CRONÔMETRO — é apenas visual/de sessão, para reforçar que essa
  // condição é algo à parte da oferta normal do site, mostrada só a quem
  // demonstrou intenção de sair.
  //
  // IMPORTANTE: ele NÃO desativa o botão de compra quando chega a zero,
  // porque o link de checkout continuaria válido de qualquer forma — fazer
  // o cronômetro "travar" a oferta sem que isso seja real seria escassez
  // falsa. Se você quiser uma condição que realmente expira, crie um cupom
  // com validade de verdade na Cakto e me avise: eu troco esse cronômetro
  // para contar até esse prazo real.
  // ----------------------------------------------------------------------
  const totalSeconds = 10 * 60;
  let remaining = totalSeconds;
  const clock = document.getElementById('timerClock');
  const timerBox = document.querySelector('.timer');

  function render() {
    const m = Math.floor(remaining / 60).toString().padStart(2, '0');
    const s = (remaining % 60).toString().padStart(2, '0');
    clock.textContent = `${m}:${s}`;
  }
  render();

  const interval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(interval);
      timerBox.innerHTML = '⏱ Esta página é exclusiva para quem estava de saída';
      return;
    }
    render();
  }, 1000);
})();