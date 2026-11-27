// =========================================================
// contato.js · validação do formulário "Fale conosco"
// Regras pedidas na Sprint 4:
//   Nome completo -> não pode ficar em branco; precisa ter nome E
//                    sobrenome; cada um com pelo menos 2 letras.
//   E-mail        -> não pode ficar em branco; formato válido.
//   Mensagem      -> não pode ficar em branco; no máximo 500 caracteres.
// Erros e sucesso aparecem na própria página (sem alert).
// =========================================================

const formulario = document.querySelector('#contato-form');
const avisoGeral = document.querySelector('#contato-mensagem');
const campoMensagem = document.querySelector('#mensagem');
const contadorMensagem = document.querySelector('#contador-mensagem');

const LIMITE_MENSAGEM = 500;

// ---------- Regras de cada campo ----------
// Cada regra recebe o texto digitado e devolve a mensagem de erro,
// ou um texto vazio ('') quando está tudo certo.

function validarNome(valor) {
  if (valor === '') {
    return 'Informe seu nome completo.';
  }

  // Só letras (com acento), espaço, apóstrofo e hífen
  if (!/^[A-Za-zÀ-ÿ' -]+$/.test(valor)) {
    return 'Use apenas letras no nome.';
  }

  // Separa as palavras: "Ana  Souza" vira ["Ana", "Souza"]
  const partes = valor.split(' ').filter(function (parte) {
    return parte !== '';
  });

  if (partes.length < 2) {
    return 'Informe também o sobrenome.';
  }

  const nome = partes[0];
  const sobrenome = partes[partes.length - 1];

  if (contarLetras(nome) < 2 || contarLetras(sobrenome) < 2) {
    return 'O nome e o sobrenome precisam ter pelo menos 2 letras cada.';
  }

  return '';
}

function validarEmail(valor) {
  if (valor === '') {
    return 'Informe seu e-mail.';
  }
  // algo@algo.algo, sem espaços
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
    return 'Digite um e-mail válido, como nome@exemplo.com.';
  }
  return '';
}

function validarTelefone(valor) {
  if (valor === '') {
    return ''; // é opcional
  }
  const numeros = valor.replace(/\D/g, '');
  if (numeros.length < 10 || numeros.length > 11) {
    return 'Digite o telefone com DDD, como (11) 91234-5678.';
  }
  return '';
}

function validarPerfil(valor) {
  if (valor === '') {
    return 'Escolha uma opção.';
  }
  return '';
}

function validarAssunto(valor) {
  if (valor === '') {
    return 'Informe o assunto.';
  }
  return '';
}

function validarMensagem(valor) {
  if (valor === '') {
    return 'Escreva sua mensagem.';
  }
  if (valor.length > LIMITE_MENSAGEM) {
    const excesso = valor.length - LIMITE_MENSAGEM;
    return 'A mensagem pode ter no máximo ' + LIMITE_MENSAGEM + ' caracteres. Apague ' + excesso + '.';
  }
  return '';
}

// Conta só as letras de uma palavra ("D'Ávila" tem 6 letras)
function contarLetras(palavra) {
  return palavra.replace(/[^A-Za-zÀ-ÿ]/g, '').length;
}

// Liga cada campo à sua regra
const regras = {
  nome: validarNome,
  email: validarEmail,
  telefone: validarTelefone,
  perfil: validarPerfil,
  assunto: validarAssunto,
  mensagem: validarMensagem
};

// ---------- Mostrar ou limpar o erro de um campo ----------
function validarCampo(nomeCampo) {
  const campo = formulario.elements[nomeCampo];
  const erro = regras[nomeCampo](campo.value.trim());
  const areaErro = document.querySelector('#erro-' + nomeCampo);

  areaErro.textContent = erro;
  campo.setAttribute('aria-invalid', erro !== '');
  return erro === '';
}

// Confere cada campo quando a pessoa sai dele
Object.keys(regras).forEach(function (nomeCampo) {
  formulario.elements[nomeCampo].addEventListener('blur', function () {
    validarCampo(nomeCampo);
  });

  // Se o campo já está com erro, confere de novo enquanto a pessoa digita,
  // assim a mensagem nunca fica desatualizada
  formulario.elements[nomeCampo].addEventListener('input', function () {
    if (formulario.elements[nomeCampo].getAttribute('aria-invalid') === 'true') {
      validarCampo(nomeCampo);
    }
  });
});

// ---------- Contador de caracteres da mensagem ----------
function atualizarContador() {
  const usados = campoMensagem.value.length;
  contadorMensagem.textContent = usados + ' de ' + LIMITE_MENSAGEM + ' caracteres';
  // Fica vermelho quando passa do limite
  contadorMensagem.classList.toggle('dica-limite', usados > LIMITE_MENSAGEM);
}
campoMensagem.addEventListener('input', atualizarContador);

// ---------- Envio ----------
formulario.addEventListener('submit', function (evento) {
  evento.preventDefault(); // não temos back-end, então a página não recarrega

  let primeiroComErro = null;
  Object.keys(regras).forEach(function (nomeCampo) {
    const valido = validarCampo(nomeCampo);
    if (!valido && primeiroComErro === null) {
      primeiroComErro = formulario.elements[nomeCampo];
    }
  });

  if (primeiroComErro) {
    avisoGeral.className = 'mensagem mensagem-erro';
    avisoGeral.textContent = 'Há campos para corrigir. Veja as mensagens em vermelho.';
    primeiroComErro.focus();
    return;
  }

  const primeiroNome = formulario.elements.nome.value.trim().split(' ')[0];
  avisoGeral.className = 'mensagem mensagem-sucesso';
  avisoGeral.textContent = 'Obrigado, ' + primeiroNome + '! Sua mensagem foi enviada. Responderemos pelo e-mail informado.';

  formulario.reset();
  Object.keys(regras).forEach(function (nomeCampo) {
    formulario.elements[nomeCampo].removeAttribute('aria-invalid');
  });
  atualizarContador();
  avisoGeral.focus();
});

// ---------- Assunto já preenchido (vindo da página Doações) ----------
// Ex.: fale-conosco.html?assunto=Doação: tomate
const parametros = new URLSearchParams(window.location.search);
if (parametros.has('assunto')) {
  formulario.elements.assunto.value = parametros.get('assunto');
}

atualizarContador();
