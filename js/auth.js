// =========================================================
// auth.js
// Lógica da página de autenticação (auth.html)
//
// - Alternar entre abas "Entrar" e "Criar conta"
// - Mostrar / ocultar senhas
// - Painel de recuperação de senha
// - Controles de acessibilidade (A-, A+, contraste)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // 1. CONTROLES DE ACESSIBILIDADE
  // -----------------------------
  const body = document.body;
  const btnFontMenor = document.getElementById("font-menor");
  const btnFontMaior = document.getElementById("font-maior");
  const btnContraste = document.getElementById("toggle-contraste");

  // nível atual de fonte (0, 1, 2)
  let escalaFonte = 0;

  function atualizarEscalaFonte() {
    if (escalaFonte < 0) escalaFonte = 0;
    if (escalaFonte > 2) escalaFonte = 2;

    body.classList.remove("font-scale-0", "font-scale-1", "font-scale-2");
    body.classList.add(`font-scale-${escalaFonte}`);
  }

  if (btnFontMenor) {
    btnFontMenor.addEventListener("click", () => {
      escalaFonte--;
      atualizarEscalaFonte();
    });
  }

  if (btnFontMaior) {
    btnFontMaior.addEventListener("click", () => {
      escalaFonte++;
      atualizarEscalaFonte();
    });
  }

  if (btnContraste) {
    btnContraste.addEventListener("click", () => {
      body.classList.toggle("alto-contraste");
    });
  }

  // aplica escala inicial
  atualizarEscalaFonte();

  // -----------------------------
  // 2. ABAS LOGIN / CADASTRO
  // -----------------------------
  const tabButtons = document.querySelectorAll(".auth-tab");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab"); // "login" ou "register"

      // Atualiza estado visual das abas
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Mostra o formulário correspondente
      if (target === "login") {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
      } else if (target === "register") {
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
      }

      // Opcional: fecha painel de recuperação ao trocar de aba
      fecharPainelRecuperacao();
    });
  });

  // -----------------------------
  // 3. MOSTRAR / OCULTAR SENHA
  // -----------------------------
  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      if (!targetId) return;

      const input = document.getElementById(targetId);
      if (!input) return;

      const icon = button.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        if (icon) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        }
      } else {
        input.type = "password";
        if (icon) {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    });
  });

  // -----------------------------
  // 4. RECUPERAÇÃO DE SENHA
  // -----------------------------
  const recoveryPanel = document.getElementById("recovery-panel");
  const openRecoveryBtn = document.getElementById("open-recovery");
  const closeRecoveryBtn = document.getElementById("close-recovery");
  const sendRecoveryBtn = document.getElementById("send-recovery");
  const recoveryEmailInput = document.getElementById("recovery-email");

  function abrirPainelRecuperacao() {
    if (recoveryPanel) {
      recoveryPanel.style.display = "block";
      recoveryPanel.setAttribute("aria-hidden", "false");
    }
  }

  function fecharPainelRecuperacao() {
    if (recoveryPanel) {
      recoveryPanel.style.display = "none";
      recoveryPanel.setAttribute("aria-hidden", "true");
    }
  }

  if (openRecoveryBtn) {
    openRecoveryBtn.addEventListener("click", () => {
      abrirPainelRecuperacao();
    });
  }

  if (closeRecoveryBtn) {
    closeRecoveryBtn.addEventListener("click", () => {
      fecharPainelRecuperacao();
    });
  }

  if (sendRecoveryBtn) {
    sendRecoveryBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const email = recoveryEmailInput?.value?.trim();
      if (!email) {
        alert("Por favor, informe um e-mail para recuperação.");
        return;
      }

      // Aqui futuramente você pode integrar com sua API de envio de e-mail
      alert(`Se este e-mail estiver cadastrado, enviaremos um link de recuperação para: ${email}`);
      fecharPainelRecuperacao();
    });
  }

  // -----------------------------
  // 5. SUBMISSÕES (DEMO)
  // -----------------------------
  // Aqui apenas prevenimos o comportamento padrão do form
  // e mostramos um alerta de demonstração.
  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Login submetido (aqui entraria sua lógica de autenticação).");
  });

  registerForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const senha = document.getElementById("register-password")?.value;
    const confirmar = document.getElementById("register-confirm")?.value;

    if (senha && confirmar && senha !== confirmar) {
      alert("As senhas não conferem. Verifique e tente novamente.");
      return;
    }

    alert("Cadastro submetido (aqui entraria sua lógica de criação de conta).");
  });
});
