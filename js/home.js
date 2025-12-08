// =========================================================
// app.js - lógica da home StarterCash
// ---------------------------------------------------------
// 1. Controles de acessibilidade
//    - Botão flutuante abre painel com:
//      • A- (diminuir fonte)
//      • A+ (aumentar fonte)
//      • Alto contraste
// 2. Carrossel de feedback (3 cards: esquerda, centro, direita)
// 3. Fundo de estrelas com velocidade dinâmica (scroll)
// =========================================================

// ----------------------------------------------------------
// 1. ACESSIBILIDADE
// ----------------------------------------------------------

// Referências aos botões internos do painel
const btnFontMenor = document.getElementById("font-menor");
const btnFontMaior = document.getElementById("font-maior");
const btnContraste = document.getElementById("toggle-contraste");

// Botão principal de acessibilidade e container
const btnAcessibilidade = document.getElementById("btn-acessibilidade");
const acessibilidadeWrapper = document.querySelector(".acessibilidade-controls");

// Escala atual: 0 (padrão), 1 (médio), 2 (grande)
let escalaFonte = 0;
const body = document.body;

/**
 * Atualiza a classe de escala de fonte no <body>.
 * Classes usadas:
 *  - font-scale-0
 *  - font-scale-1
 *  - font-scale-2
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

// Clique em A- (diminuir fonte)
if (btnFontMenor) {
  btnFontMenor.addEventListener("click", () => {
    escalaFonte--;
    aplicarEscalaFonte();
  });
}

// Clique em A+ (aumentar fonte)
if (btnFontMaior) {
  btnFontMaior.addEventListener("click", () => {
    escalaFonte++;
    aplicarEscalaFonte();
  });
}

// Alternar alto contraste (liga/desliga)
if (btnContraste) {
  btnContraste.addEventListener("click", () => {
    body.classList.toggle("alto-contraste");
  });
}

// Abrir/fechar painel de acessibilidade (botão principal)
if (btnAcessibilidade && acessibilidadeWrapper) {
  btnAcessibilidade.addEventListener("click", () => {
    const isOpen = acessibilidadeWrapper.classList.toggle("open");
    btnAcessibilidade.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Fecha painel ao clicar fora, para não ficar aberto pra sempre
  document.addEventListener("click", (event) => {
    if (!acessibilidadeWrapper.contains(event.target)) {
      if (acessibilidadeWrapper.classList.contains("open")) {
        acessibilidadeWrapper.classList.remove("open");
        btnAcessibilidade.setAttribute("aria-expanded", "false");
      }
    }
  });
}

// ----------------------------------------------------------
// 2. CARROSSEL DE FEEDBACK (3 cards, laterais borradas)
// ----------------------------------------------------------

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
 * Garante que o índice fique sempre dentro do intervalo
 * [0, depoimentos.length), usando aritmética modular.
 */
function loopIndex(i) {
  const total = depoimentos.length;
  return ((i % total) + total) % total;
}

/**
 * Preenche um card de feedback com texto e nome.
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

// Navegação para próximo depoimento
if (btnNext) {
  btnNext.addEventListener("click", () => {
    indiceAtual++;
    renderizarCarousel();
  });
}

// Navegação para depoimento anterior
if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    indiceAtual--;
    renderizarCarousel();
  });
}

// ----------------------------------------------------------
// 3. FUNDO DE ESTRELAS COM VELOCIDADE DINÂMICA
// ----------------------------------------------------------
//
// Idéia: quanto mais o usuário rola para baixo,
// mais rápido as estrelas "sobem" na tela.
//
// Fazemos isso mudando a variável CSS --star-speed
// (que controla a duração da animação stars-move).
// ----------------------------------------------------------

const rootElement = document.documentElement;

/**
 * Atualiza a velocidade das estrelas baseada no scroll.
 * - minSpeed: animação mais rápida (número menor em segundos).
 * - maxSpeed: animação mais lenta (topo da página).
 */
function atualizarVelocidadeEstrelas() {
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollY = window.scrollY || window.pageYOffset || 0;

  // Proporção do scroll (0 no topo, 1 no final da página)
  const ratio = docHeight > 0 ? scrollY / docHeight : 0;

  const minSpeed = 8;   // 8s (rápido no final)
  const maxSpeed = 22;  // 22s (mais lento no topo)

  // Quanto mais desce, menor a duração (mais rápido)
  const currentSpeed = maxSpeed - (maxSpeed - minSpeed) * ratio;

  rootElement.style.setProperty(
    "--star-speed",
    `${currentSpeed.toFixed(1)}s`
  );
}

window.addEventListener("scroll", atualizarVelocidadeEstrelas);

// ----------------------------------------------------------
// 4. INICIALIZAÇÃO GERAL
// ----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Aplica escala de fonte padrão
  aplicarEscalaFonte();

  // Renderiza o carrossel na primeira vez
  renderizarCarousel();

  // Garante velocidade inicial das estrelas
  atualizarVelocidadeEstrelas();
});
