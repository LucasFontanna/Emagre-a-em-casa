/**
 * exit-offer.js
 * Redireciona o visitante para /oferta/index.html quando ele demonstra
 * intenção de sair da página — via mouse saindo pelo topo da tela (desktop)
 * ou via botão voltar do navegador (funciona em celular também).
 *
 * Só dispara UMA VEZ por sessão (sessionStorage), para não incomodar quem
 * já viu a oferta ou está apenas navegando entre abas.
 *
 * Inclua este script no final do <body> das páginas /quiz/index.html e
 * /landing/index.html, ajustando o caminho relativo se necessário:
 *   <script src="../assets/js/exit-offer.js"></script>
 */
(function () {
  "use strict";

  const OFFER_URL = "../oferta/index.html";
  const FLAG_KEY = "exit_offer_shown";

  function alreadyShown() {
    try { return sessionStorage.getItem(FLAG_KEY) === "1"; }
    catch (e) { return false; }
  }
  function markShown() {
    try { sessionStorage.setItem(FLAG_KEY, "1"); } catch (e) {}
  }

  function goToOffer() {
    if (alreadyShown()) return;
    markShown();
    window.location.href = OFFER_URL;
  }

  // ---- Intenção de saída (desktop): mouse sai pelo topo da janela ----
  document.addEventListener("mouseout", (e) => {
    const leftViaTop = !e.relatedTarget && e.clientY <= 0;
    if (leftViaTop) goToOffer();
  });

  // ---- Botão voltar (desktop e mobile) ----
  // Empilha um estado extra no histórico; se o usuário apertar "voltar",
  // capturamos o popstate e mostramos a oferta em vez de sair direto.
  history.pushState({ exitGuard: true }, "");
  window.addEventListener("popstate", () => {
    if (alreadyShown()) return; // já mostrou uma vez: deixa sair normalmente
    history.pushState({ exitGuard: true }, "");
    goToOffer();
  });
})();