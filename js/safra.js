// =========================================================
// safra.js · filtro por categoria da página Safra
// (mesmo filtro da Sprint 3, agora em arquivo separado)
// =========================================================

const botoesFiltro = document.querySelectorAll('.filtro-btn');
const cardsSafra = document.querySelectorAll('.safra-card');
const contadorSafra = document.querySelector('#safra-contador');

botoesFiltro.forEach(function (botao) {
  botao.addEventListener('click', function () {
    // Marca só o botão clicado como ativo
    botoesFiltro.forEach(function (outro) {
      outro.setAttribute('aria-pressed', 'false');
    });
    botao.setAttribute('aria-pressed', 'true');

    const categoria = botao.dataset.filtro;
    let visiveis = 0;

    cardsSafra.forEach(function (card) {
      const mostrar = categoria === 'todos' || card.dataset.categoria === categoria;
      card.hidden = !mostrar;
      if (mostrar) visiveis++;
    });

    contadorSafra.textContent = 'Mostrando ' + visiveis + (visiveis === 1 ? ' safra' : ' safras');
  });
});
