// =========================================================
// catalogo.js · funcionalidade nova da Sprint 4
// O comprador busca produtos, filtra, monta um pedido e vê
// o total e quanto economiza em relação aos intermediários.
// Depende da lista "produtos" (js/produtos-dados.js).
// =========================================================

// ---------- Elementos da página ----------
const campoBusca = document.querySelector('#busca');
const campoCategoria = document.querySelector('#categoria');
const botaoExcedentes = document.querySelector('#so-excedentes');
const listaProdutos = document.querySelector('#lista-produtos');
const contadorProdutos = document.querySelector('#contador-produtos');
const avisoCatalogo = document.querySelector('#aviso-catalogo');

const listaPedido = document.querySelector('#itens-pedido');
const pedidoVazio = document.querySelector('#pedido-vazio');
const resumoTotal = document.querySelector('#resumo-total');
const resumoEconomia = document.querySelector('#resumo-economia');
const resumoProdutores = document.querySelector('#resumo-produtores');
const botaoFinalizar = document.querySelector('#finalizar');
const avisoPedido = document.querySelector('#aviso-pedido');

// O pedido guarda objetos assim: { id: 3, quantidade: 2 }
let pedido = [];

// ---------- Funções auxiliares ----------
function emReais(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function buscarProduto(id) {
  return produtos.find(function (produto) {
    return produto.id === id;
  });
}

// Tira acentos para "feijao" achar "Feijão"
function semAcento(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function mostrarAviso(elemento, texto, tipo) {
  elemento.className = 'mensagem mensagem-' + tipo;
  elemento.textContent = texto;
}

// ---------- 1. Filtrar ----------
function filtrarProdutos() {
  const termo = semAcento(campoBusca.value.trim());
  const categoria = campoCategoria.value;
  const soExcedentes = botaoExcedentes.getAttribute('aria-pressed') === 'true';

  return produtos.filter(function (produto) {
    const texto = semAcento(produto.nome + ' ' + produto.produtor + ' ' + produto.cidade);
    const passaBusca = texto.includes(termo);
    const passaCategoria = categoria === 'todas' || produto.categoria === categoria;
    const passaExcedente = !soExcedentes || produto.excedente;
    return passaBusca && passaCategoria && passaExcedente;
  });
}

// ---------- 2. Mostrar os produtos ----------
function mostrarProdutos() {
  const filtrados = filtrarProdutos();
  listaProdutos.innerHTML = '';
  contadorProdutos.textContent = 'Mostrando ' + filtrados.length + ' de ' + produtos.length + ' produtos';

  if (filtrados.length === 0) {
    const vazio = document.createElement('li');
    vazio.className = 'vazio';
    vazio.textContent = 'Nenhum produto encontrado. Tente outra palavra ou outra categoria.';
    listaProdutos.appendChild(vazio);
    return;
  }

  filtrados.forEach(function (produto) {
    const desconto = Math.round((1 - produto.precoDireto / produto.precoMercado) * 100);
    const esgotado = produto.estoque === 0;

    const item = document.createElement('li');
    item.className = 'card produto';
    item.innerHTML = `
      <div class="produto-topo">
        <span class="produto-emoji" aria-hidden="true">${produto.emoji}</span>
        ${produto.excedente
          ? '<span class="selo selo-ambar">Excedente com desconto</span>'
          : '<span class="selo">' + produto.categoria + '</span>'}
      </div>
      <h3>${produto.nome}</h3>
      <p class="local">📍 ${produto.produtor} (${produto.cidade})</p>
      <p>${esgotado ? 'Esgotado' : produto.estoque + ' disponíveis'} · por ${produto.unidade}</p>
      <p class="precos">
        <span class="preco">${emReais(produto.precoDireto)}</span>
        <span class="preco-antigo"><span class="sr-only">Preço com intermediários: </span>${emReais(produto.precoMercado)}</span>
        <span class="selo">-${desconto}%</span>
      </p>
      <div class="produto-acao">
        <label class="sr-only" for="qtd-${produto.id}">Quantidade de ${produto.nome}</label>
        <input type="number" id="qtd-${produto.id}" min="1" value="1" ${esgotado ? 'disabled' : ''}>
        <button type="button" class="btn btn-green btn-pequeno" data-id="${produto.id}" ${esgotado ? 'disabled' : ''}>
          Adicionar<span class="sr-only"> ${produto.nome}</span>
        </button>
      </div>
    `;
    listaProdutos.appendChild(item);
  });
}

// ---------- 3. Adicionar ao pedido ----------
function adicionar(id) {
  const produto = buscarProduto(id);
  const campoQtd = document.querySelector('#qtd-' + id);
  const quantidade = Number(campoQtd.value);

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    mostrarAviso(avisoCatalogo, 'Digite uma quantidade inteira maior que zero para ' + produto.nome + '.', 'erro');
    campoQtd.focus();
    return;
  }
  if (quantidade > produto.estoque) {
    mostrarAviso(avisoCatalogo, 'Só há ' + produto.estoque + ' de ' + produto.nome + ' disponíveis.', 'erro');
    campoQtd.focus();
    return;
  }

  const existente = pedido.find(function (item) {
    return item.id === id;
  });
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    pedido.push({ id: id, quantidade: quantidade });
  }
  produto.estoque -= quantidade;

  mostrarAviso(avisoCatalogo, quantidade + ' × ' + produto.nome + ' adicionado ao pedido.', 'sucesso');
  avisoPedido.textContent = '';
  mostrarProdutos();
  mostrarPedido();
}

// ---------- 4. Remover do pedido ----------
function remover(id) {
  const item = pedido.find(function (i) {
    return i.id === id;
  });
  const produto = buscarProduto(id);
  produto.estoque += item.quantidade; // devolve ao estoque

  pedido = pedido.filter(function (i) {
    return i.id !== id;
  });

  mostrarAviso(avisoCatalogo, produto.nome + ' removido do pedido.', 'info');
  mostrarProdutos();
  mostrarPedido();
}

// ---------- 5. Resumo do pedido ----------
function mostrarPedido() {
  listaPedido.innerHTML = '';
  let total = 0;
  let economia = 0;
  const produtores = [];

  pedido.forEach(function (item) {
    const produto = buscarProduto(item.id);
    const subtotal = produto.precoDireto * item.quantidade;
    total += subtotal;
    economia += (produto.precoMercado - produto.precoDireto) * item.quantidade;
    if (!produtores.includes(produto.produtor)) {
      produtores.push(produto.produtor);
    }

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.quantidade} × ${produto.nome}</span>
      <span>${emReais(subtotal)}
        <button type="button" class="btn-remover" data-remover="${produto.id}">Remover<span class="sr-only"> ${produto.nome}</span></button>
      </span>
    `;
    listaPedido.appendChild(li);
  });

  pedidoVazio.hidden = pedido.length > 0;
  botaoFinalizar.disabled = pedido.length === 0;
  resumoTotal.textContent = emReais(total);
  resumoEconomia.textContent = emReais(economia);
  resumoProdutores.textContent = produtores.length;
}

// ---------- 6. Finalizar ----------
function finalizar() {
  const economia = resumoEconomia.textContent;
  const qtdProdutores = resumoProdutores.textContent;

  mostrarAviso(avisoPedido,
    'Pedido enviado para ' + qtdProdutores + ' produtor(es)! Você economizou ' + economia +
    ', e o pagamento vai direto para quem plantou. (Simulação: nenhum pagamento foi feito.)',
    'sucesso');

  pedido = [];
  mostrarPedido();
  avisoPedido.focus();
}

// ---------- 7. Eventos ----------
campoBusca.addEventListener('input', mostrarProdutos);
campoCategoria.addEventListener('change', mostrarProdutos);

botaoExcedentes.addEventListener('click', function () {
  const ligado = botaoExcedentes.getAttribute('aria-pressed') === 'true';
  botaoExcedentes.setAttribute('aria-pressed', String(!ligado));
  mostrarProdutos();
});

// Um só "ouvinte" para todos os botões Adicionar
listaProdutos.addEventListener('click', function (evento) {
  const botao = evento.target.closest('button[data-id]');
  if (botao) adicionar(Number(botao.dataset.id));
});

listaPedido.addEventListener('click', function (evento) {
  const botao = evento.target.closest('button[data-remover]');
  if (botao) remover(Number(botao.dataset.remover));
});

botaoFinalizar.addEventListener('click', finalizar);

// Não deixa o Enter da busca recarregar a página
document.querySelector('.barra-busca').addEventListener('submit', function (evento) {
  evento.preventDefault();
});

// ---------- Início ----------
mostrarProdutos();
mostrarPedido();
