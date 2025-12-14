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
// import { paginaHTML } from './Ilobby.js/modalcursos.js';
// import { paginaPASSE } from './Ilobby.js/modalpasse.js';

// const x = paginaHTML;
// const Y= paginaPASSE;
// const overlay = document.getElementById("modal-overlay");
// const content = document.getElementById("modal-content");

// // 1. DEFINIÇÃO CONSISTENTE: Todas as funções que precisam ser chamadas pelo HTML (onclick)
// //    e internamente, são definidas como globais (window).

// window.openModal = function(html) {
//     content.innerHTML = html;
//     overlay.style.display = "flex";
// }

// window.closeModal = function() {
//     overlay.style.display = "none";
//     content.innerHTML = "";
// }

// // Fechar ao clicar fora
// overlay.addEventListener("click", (e) => {
//     // CORRIGIDO: Usa a função global window.closeModal()
//     if (e.target === overlay) window.closeModal(); 
// });

// // Exemplo de uso - Função chamada ao clicar no botão 'Cursos'
// // (Você deve usar addEventListener para este, mas também a expomos por segurança)
// window.mostrarExemploFormulario = function() {
//     window.openModal(`
//         ${x}
//     `);
// }
// window.mostrarPasse = function() {
//     window.openModal(`
//         ${Y}
//     `);
// }


// // Função para o formulário (se usada no onclick)
// window.enviarFormulario = function() {
//     const nome = document.getElementById("nome").value;
//     alert("Nome enviado: " + nome);
//     window.closeModal();
// }

// // 2. ADICIONANDO O LISTENER (SEM OS PARÊNTESES)
// // Garante que o modal abre APENAS no clique, e não ao carregar a página.
// // Este listener substitui o 'onclick' no botão 'Cursos'.
// const botaoCursos = document.getElementById("teste-modal");
// const botaoPasse = document.getElementById("teste-passe");

// // Certifique-se que o elemento existe antes de adicionar o listener
// if (botaoCursos) {
//     botaoCursos.addEventListener("click", window.mostrarExemploFormulario);
// }
// if (botaoPasse) {
//     botaoCursos.addEventListener("click", window.mostrarPasse);
// }
  const over= document.getElementById("loading-overlay");

  document.querySelectorAll("button[data-link]").forEach(button => {
    button.addEventListener("click", () => {
      const destino = button.getAttribute("data-link");

      over.classList.add("active");
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = destino;
      }, 400);
    });
  });


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

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
});
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('auryModal');
    const openBtn = document.querySelector('.chat-btn');
    const closeBtn = modal.querySelector('.aury-close');
    const input = document.getElementById('auryInput');
    const sendBtn = document.getElementById('aurySend');
    const chatWindow = document.getElementById('auryChatWindow');

    if (!modal || !openBtn || !closeBtn) {
        console.error('Modal ou botões não encontrados: confira ids/classes.');
        return;
    }

    // abre modal
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';      // garante visibilidade imediata
        modal.classList.remove('hide');
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    });

    // função de fechar com cleanup via animationend
    function closeModal() {
        // adiciona classe hide para rodar animação
        modal.classList.remove('show');
        modal.classList.add('hide');
        modal.setAttribute('aria-hidden', 'true');
    }

    // quando a animação de fechar terminar, esconde e remove classe hide
    modal.addEventListener('animationend', (e) => {
        // só responder quando a animação for do conteúdo do modal
        if (e.animationName === 'auryCloseAnim') {
            modal.style.display = 'none';
            modal.classList.remove('hide');
        }
    });

    // evento do X
    closeBtn.addEventListener('click', closeModal);

    // fechar clicando no backdrop
    modal.addEventListener('click', (ev) => {
        if (ev.target === modal) closeModal();
    });

    // enviar mensagem (mantive seu comportamento)
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        const userMsg = document.createElement('div');
        userMsg.className = 'aury-msg aury-user';
        userMsg.textContent = text;
        chatWindow.appendChild(userMsg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        input.value = '';

        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'aury-msg aury-bot';
            botMsg.textContent = "Recebi sua mensagem! Vamos conversar. 😊";
            chatWindow.appendChild(botMsg);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 600);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}); 


const cursos = document.getElementById("cursos-btn");
const passe = document.getElementById("passe-btn");
const ranking = document.getElementById("ranking-btn");
const loja = document.getElementById("loja-btn");
const inventario = document.getElementById("inventario-btn");
const simuladores = document.getElementById("simuladores-btn");
const noticias = document.getElementById("noticias-btn");


