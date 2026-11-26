// =========================================================
// menu.js · usado nas 5 páginas
// No celular, o menu vira um botão ☰ que abre e fecha a lista.
// =========================================================

const botaoMenu = document.querySelector('#menu-botao');
const menu = document.querySelector('#menu-lista');

if (botaoMenu && menu) {
  botaoMenu.addEventListener('click', function () {
    const aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', aberto);
  });

  // Fecha o menu com a tecla Esc
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menu.classList.contains('aberto')) {
      menu.classList.remove('aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.focus();
    }
  });
}
