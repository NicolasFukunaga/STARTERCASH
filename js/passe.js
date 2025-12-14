import { pegarUsuario } from "./root.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = pegarUsuario();

  // 🔒 proteção de rota
  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  // =========================
  // DOM
  // =========================
  document.getElementById("userNome").textContent = user.nome;
  document.getElementById("userXp").textContent = `${user.xp}% XP`;
  document.getElementById("userCoins").textContent = user.coins;
});


const overlay = document.getElementById("loading-overlay");

document.getElementById("voltar").addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "./lobby.html";
    }, 400);
});