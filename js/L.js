/*import { paginaHTML } from './Ilobby.js/modalcursos.js';

const x = paginaHTML;
const overlay = document.getElementById("modal-overlay");
const content = document.getElementById("modal-content");

function openModal(html) {
    content.innerHTML = html;
    overlay.style.display = "flex";
}

function closeModal() {
    overlay.style.display = "none";
    content.innerHTML = "";
}

// Fechar ao clicar fora
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
});

// Exemplo de uso
function mostrarExemploFormulario() {
    openModal(`
       ${x}
    `);
}

function enviarFormulario() {
    const nome = document.getElementById("nome").value;
    alert("Nome enviado: " + nome);
    closeModal();
}


// Passa a referência da função. Ela SÓ será executada ao clicar.
document.getElementById("teste-modal").addEventListener("click", mostrarExemploFormulario);*/
import { paginaHTML } from './Ilobby.js/modalcursos.js';
import { paginaPASSE } from './Ilobby.js/modalpasse.js';

const x = paginaHTML;
const Y= paginaPASSE;
const overlay = document.getElementById("modal-overlay");
const content = document.getElementById("modal-content");

// 1. DEFINIÇÃO CONSISTENTE: Todas as funções que precisam ser chamadas pelo HTML (onclick)
//    e internamente, são definidas como globais (window).

window.openModal = function(html) {
    content.innerHTML = html;
    overlay.style.display = "flex";
}

window.closeModal = function() {
    overlay.style.display = "none";
    content.innerHTML = "";
}

// Fechar ao clicar fora
overlay.addEventListener("click", (e) => {
    // CORRIGIDO: Usa a função global window.closeModal()
    if (e.target === overlay) window.closeModal(); 
});

// Exemplo de uso - Função chamada ao clicar no botão 'Cursos'
// (Você deve usar addEventListener para este, mas também a expomos por segurança)
window.mostrarExemploFormulario = function() {
    window.openModal(`
        ${x}
    `);
}
window.mostrarPasse = function() {
    window.openModal(`
        ${Y}
    `);
}


// Função para o formulário (se usada no onclick)
window.enviarFormulario = function() {
    const nome = document.getElementById("nome").value;
    alert("Nome enviado: " + nome);
    window.closeModal();
}

// 2. ADICIONANDO O LISTENER (SEM OS PARÊNTESES)
// Garante que o modal abre APENAS no clique, e não ao carregar a página.
// Este listener substitui o 'onclick' no botão 'Cursos'.
const botaoCursos = document.getElementById("teste-modal");
const botaoPasse = document.getElementById("teste-passe");

// Certifique-se que o elemento existe antes de adicionar o listener
if (botaoCursos) {
    botaoCursos.addEventListener("click", window.mostrarExemploFormulario);
}
if (botaoPasse) {
    botaoCursos.addEventListener("click", window.mostrarPasse);
}
