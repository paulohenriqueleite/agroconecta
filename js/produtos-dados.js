// =========================================================
// produtos-dados.js · lista de produtos do catálogo
// Dados FICTÍCIOS para o protótipo. Os produtores são os
// mesmos que aparecem na página Safra.
//
// precoDireto  -> preço pago direto ao produtor
// precoMercado -> preço médio com intermediários (para comparar)
// excedente    -> sobra de colheita com desconto (Descarte Zero)
// =========================================================

const produtos = [
  { id: 1,  nome: 'Alface americana',   emoji: '🥬', categoria: 'Hortaliças', produtor: 'Seu João',              cidade: 'Ceilândia - DF',   unidade: 'maço',    precoDireto: 2.5,  precoMercado: 4.5,  estoque: 80,  excedente: false },
  { id: 2,  nome: 'Rúcula',             emoji: '🌿', categoria: 'Hortaliças', produtor: 'Seu João',              cidade: 'Ceilândia - DF',   unidade: 'maço',    precoDireto: 2.0,  precoMercado: 4.0,  estoque: 40,  excedente: true  },
  { id: 3,  nome: 'Tomate italiano',    emoji: '🍅', categoria: 'Hortaliças', produtor: 'Sítio Boa Vista',       cidade: 'Planaltina - DF',  unidade: 'kg',      precoDireto: 6.0,  precoMercado: 9.9,  estoque: 120, excedente: false },
  { id: 4,  nome: 'Abobrinha',          emoji: '🥒', categoria: 'Hortaliças', produtor: 'Sítio Boa Vista',       cidade: 'Planaltina - DF',  unidade: 'kg',      precoDireto: 2.5,  precoMercado: 5.9,  estoque: 35,  excedente: true  },
  { id: 5,  nome: 'Morango orgânico',   emoji: '🍓', categoria: 'Frutas',     produtor: 'Dona Maria',            cidade: 'Fercal - DF',      unidade: 'bandeja', precoDireto: 7.0,  precoMercado: 11.9, estoque: 60,  excedente: false },
  { id: 6,  nome: 'Abacate manteiga',   emoji: '🥑', categoria: 'Frutas',     produtor: 'Pomar Família Souza',   cidade: 'Sobradinho - DF',  unidade: 'kg',      precoDireto: 5.0,  precoMercado: 8.9,  estoque: 90,  excedente: false },
  { id: 7,  nome: 'Banana prata',       emoji: '🍌', categoria: 'Frutas',     produtor: 'Pomar Família Souza',   cidade: 'Sobradinho - DF',  unidade: 'kg',      precoDireto: 3.5,  precoMercado: 6.9,  estoque: 50,  excedente: true  },
  { id: 8,  nome: 'Milho verde',        emoji: '🌽', categoria: 'Grãos',      produtor: 'Sítio Alvorada',        cidade: 'Paranoá - DF',     unidade: 'espiga',  precoDireto: 0.9,  precoMercado: 2.0,  estoque: 200, excedente: false },
  { id: 9,  nome: 'Feijão carioca',     emoji: '🫘', categoria: 'Grãos',      produtor: 'Sítio Alvorada',        cidade: 'Paranoá - DF',     unidade: 'kg',      precoDireto: 7.5,  precoMercado: 9.9,  estoque: 150, excedente: false },
  { id: 10, nome: 'Mandioca',           emoji: '🥔', categoria: 'Raízes',     produtor: 'Coop. Agrofamiliar',    cidade: 'Brazlândia - DF',  unidade: 'kg',      precoDireto: 3.5,  precoMercado: 6.5,  estoque: 100, excedente: false },
  { id: 11, nome: 'Cenoura',            emoji: '🥕', categoria: 'Raízes',     produtor: 'Coop. Agrofamiliar',    cidade: 'Brazlândia - DF',  unidade: 'kg',      precoDireto: 2.5,  precoMercado: 5.5,  estoque: 45,  excedente: true  },
  { id: 12, nome: 'Ovos caipiras',      emoji: '🥚', categoria: 'Ovos',       produtor: 'Granja Pé de Serra',    cidade: 'Gama - DF',        unidade: 'dúzia',   precoDireto: 11.0, precoMercado: 16.9, estoque: 40,  excedente: false }
];
