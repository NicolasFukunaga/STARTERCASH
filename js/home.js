// =========================================================
// app.js - lógica da home StarterCash
// ---------------------------------------------------------
// - Controles de acessibilidade (A-, A+, alto contraste)
// - Carrossel de feedback (3 cards: esquerda, centro, direita)
// =========================================================

// ---------------------------
// 1. ACESSIBILIDADE
// ---------------------------

// Botões de fonte e contraste
const btnFontMenor = document.getElementById("font-menor");
const btnFontMaior = document.getElementById("font-maior");
const btnContraste = document.getElementById("toggle-contraste");

// Escala atual: 0 (padrão), 1 (médio), 2 (grande)
let escalaFonte = 0;
const body = document.body;

/**
 * Atualiza a classe de escala de fonte no <body>.
 */
function aplicarEscalaFonte() {
  // Garante limites
  if (escalaFonte < 0) escalaFonte = 0;
  if (escalaFonte > 2) escalaFonte = 2;

  // Limpa classes antigas
  body.classList.remove("font-scale-0", "font-scale-1", "font-scale-2");

  // Aplica classe correspondente
  body.classList.add(`font-scale-${escalaFonte}`);
}

// Clique em A-
if (btnFontMenor) {
  btnFontMenor.addEventListener("click", () => {
    escalaFonte--;
    aplicarEscalaFonte();
  });
}

// Clique em A+
if (btnFontMaior) {
  btnFontMaior.addEventListener("click", () => {
    escalaFonte++;
    aplicarEscalaFonte();
  });
}

// Alternar alto contraste
if (btnContraste) {
  btnContraste.addEventListener("click", () => {
    body.classList.toggle("alto-contraste");
  });
}

// ---------------------------
// 2. CARROSSEL DE FEEDBACK
// ---------------------------

// Cards
const cardLeft = document.getElementById("card-left");
const cardCenter = document.getElementById("card-center");
const cardRight = document.getElementById("card-right");

// Botões
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

// Lista de depoimentos
const depoimentos = [
  {
    texto:
      "A Aury me ajudou a organizar minha vida financeira com facilidade.",
    nome: "Carla Moreira",
  },
  {
    texto:
      "As missões gamificadas tornam tudo mais motivador e menos cansativo.",
    nome: "Lucas Ribeiro",
  },
  {
    texto:
      "Consigo enxergar meu progresso como se fosse um jogo. Isso me prende!",
    nome: "Mariana Costa",
  },
  {
    texto:
      "Antes eu ignorava temas de finanças, agora quero sempre completar a próxima missão.",
    nome: "Rafael Mendes",
  },
  {
    texto:
      "A combinação de jogo com aprendizado fez diferença na minha rotina.",
    nome: "Ana Paula",
  },
];

// Índice do depoimento central
let indiceAtual = 0;

/**
 * Garante que o índice caia sempre dentro do intervalo [0, depoimentos.length).
 */
function loopIndex(i) {
  const total = depoimentos.length;
  return ((i % total) + total) % total;
}

/**
 * Preenche um card com os dados do depoimento.
 */
function preencherCard(card, depoimento) {
  if (!card || !depoimento) return;
  const p = card.querySelector("p");
  const h4 = card.querySelector("h4");

  if (p) p.textContent = `“${depoimento.texto}”`;
  if (h4) h4.textContent = `— ${depoimento.nome}`;
}

/**
 * Renderiza os 3 cards (esquerda, centro, direita)
 * com base no índice central atual.
 */
function renderizarCarousel() {
  if (!cardLeft || !cardCenter || !cardRight) return;

  const centro = loopIndex(indiceAtual);
  const esquerda = loopIndex(centro - 1);
  const direita = loopIndex(centro + 1);

  preencherCard(cardCenter, depoimentos[centro]);
  preencherCard(cardLeft, depoimentos[esquerda]);
  preencherCard(cardRight, depoimentos[direita]);

  // Garante a classe "active" apenas no centro
  cardCenter.classList.add("active");
}

// Navegação
if (btnNext) {
  btnNext.addEventListener("click", () => {
    indiceAtual++;
    renderizarCarousel();
  });
}

if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    indiceAtual--;
    renderizarCarousel();
  });
}

// ---------------------------
// 3. INICIALIZAÇÃO
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  aplicarEscalaFonte();
  renderizarCarousel();
});
