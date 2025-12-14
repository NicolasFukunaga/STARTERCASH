// =========================================================
// auth.js — versão revisada, limpa, organizada e funcional
// =========================================================
import { salvarUsuario } from "./root.js";
document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // 1) CONTROLES DE ACESSIBILIDADE
  // =========================================================
  const body = document.body;
  let escalaFonte = 0;

  function atualizarEscalaFonte() {
    if (escalaFonte < 0) escalaFonte = 0;
    if (escalaFonte > 2) escalaFonte = 2;

    body.classList.remove("font-scale-0", "font-scale-1", "font-scale-2");
    body.classList.add(`font-scale-${escalaFonte}`);
  }

  const btnFontMenor = document.getElementById("font-menor");
  const btnFontMaior = document.getElementById("font-maior");
  const btnContraste = document.getElementById("toggle-contraste");

  btnFontMenor?.addEventListener("click", () => {
    escalaFonte--;
    atualizarEscalaFonte();
  });

  btnFontMaior?.addEventListener("click", () => {
    escalaFonte++;
    atualizarEscalaFonte();
  });

  btnContraste?.addEventListener("click", () => {
    body.classList.toggle("alto-contraste");
  });

  atualizarEscalaFonte();



  // =========================================================
  // 2) TROCA ENTRE LOGIN E REGISTRO (NOVO SISTEMA)
  // =========================================================
  const tabs = document.querySelectorAll(".auth-tab");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (tabs && loginForm && registerForm) {

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const selected = tab.dataset.tab;

        if (selected === "login") {
          loginForm.style.display = "block";
          registerForm.style.display = "none";
        } else {
          loginForm.style.display = "none";
          registerForm.style.display = "block";
        }
      });
    });

    // Estado inicial
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  }



  // =========================================================
  // 3) MOSTRAR / OCULTAR SENHA
  // =========================================================
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);
      const icon = button.querySelector("i");

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        icon?.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon?.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });



  // =========================================================
  // 4) PAINEL DE RECUPERAÇÃO DE SENHA
  // =========================================================
  const recoveryPanel = document.getElementById("recovery-panel");
  const openRecoveryBtn = document.getElementById("open-recovery");
  const closeRecoveryBtn = document.getElementById("close-recovery");
  const sendRecoveryBtn = document.getElementById("send-recovery");
  const recoveryEmailInput = document.getElementById("recovery-email");

  function abrirPainel() {
    recoveryPanel.style.display = "block";
    recoveryPanel.setAttribute("aria-hidden", "false");
  }

  function fecharPainel() {
    recoveryPanel.style.display = "none";
    recoveryPanel.setAttribute("aria-hidden", "true");
  }

  openRecoveryBtn?.addEventListener("click", abrirPainel);
  closeRecoveryBtn?.addEventListener("click", fecharPainel);

  sendRecoveryBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    const email = recoveryEmailInput.value.trim();

    if (!email) return alert("Informe um e-mail para recuperação.");

    alert("Se este e-mail estiver cadastrado, enviaremos um link de recuperação.");
    fecharPainel();
  });



  // =========================================================
  // 5) LOGIN — ENVIO PARA BACKEND
  // =========================================================
  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-password").value;

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      if (!res.ok) {
        alert("Credenciais inválidas.");
        return;
      }

      const sessionData = await res.json(); // 👈 SÓ ISSO

      salvarUsuario(sessionData);

      window.location.href = "../html/lobby.html";

    } catch (err) {
      console.error(err);
      alert("Erro ao tentar login.");
    }
  });



  // =========================================================
  // 6) CADASTRO — ENVIO PARA BACKEND
  // =========================================================
  registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("register-name").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const email = document.getElementById("register-email").value.trim();
    const senha = document.getElementById("register-password").value;
    const confirmar = document.getElementById("register-confirm").value;

    if (senha !== confirmar) {
      return alert("As senhas não conferem.");
    }

    const payload = { nome, idade, email, senha };

    try {
      const res = await fetch("http://localhost:8080/cadastro", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        alert("Erro no cadastro.");
        return;
      }
      const sessionData = await res.json(); // 👈

      salvarUsuario(sessionData);

      window.location.href = "../html/lobby.html";
    } catch (err) {
      console.error(err);
      alert("Erro interno no cadastro.");
    }
  });

}); // FIM DO DOMContentLoaded



// =========================================================
// 7) CAMPOS DE DATA DE NASCIMENTO + CÁLCULO DA IDADE
// =========================================================

const anoSelect = document.getElementById("nasc-ano");
const mesSelect = document.getElementById("nasc-mes");
const diaSelect = document.getElementById("nasc-dia");
const idadeInput = document.getElementById("idade");

// ------- Preencher anos -------
const anoAtual = new Date().getFullYear();
for (let ano = anoAtual; ano >= anoAtual - 100; ano--) {
  anoSelect.innerHTML += `<option value="${ano}">${ano}</option>`;
}

// ------- Preencher dias conforme mês -------
function atualizarDias() {
  const ano = parseInt(anoSelect.value);
  const mes = parseInt(mesSelect.value);

  if (!ano || !mes) {
    diaSelect.innerHTML = '<option value="">Dia</option>';
    return;
  }

  const ultimoDia = new Date(ano, mes, 0).getDate();
  diaSelect.innerHTML = '<option value="">Dia</option>';

  for (let d = 1; d <= ultimoDia; d++) {
    diaSelect.innerHTML += `<option value="${d}">${d}</option>`;
  }
}

// ------- Calcular idade -------
function calcularIdade() {
  const ano = parseInt(anoSelect.value);
  const mes = parseInt(mesSelect.value);
  const dia = parseInt(diaSelect.value);

  if (!ano || !mes || !dia) {
    idadeInput.value = "";
    return;
  }

  const hoje = new Date();
  const nasc = new Date(ano, mes - 1, dia);

  let idade = hoje.getFullYear() - nasc.getFullYear();

  const fezAniversario =
    hoje.getMonth() + 1 > mes ||
    (hoje.getMonth() + 1 === mes && hoje.getDate() >= dia);

  if (!fezAniversario) idade--;

  idadeInput.value = idade;
}

// Eventos
anoSelect?.addEventListener("change", () => {
  atualizarDias();
  calcularIdade();
});

mesSelect?.addEventListener("change", () => {
  atualizarDias();
  calcularIdade();
});

diaSelect?.addEventListener("change", calcularIdade);
