
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 proteção
  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  // nome
  document.querySelector(".user-box strong").textContent = user.nome;

  // XP
  const xpPercent = Math.min(user.xp, 100);
  document.querySelector(".xp-fill").style.width = xpPercent + "%";
  document.querySelector(".xp-text").textContent = `${xpPercent}% XP`;

  // coins
  document.querySelector(".user-box > p").textContent = `${user.coins} 💰`;
});

const overlay = document.getElementById("loading-overlay");

document.getElementById("voltar").addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "./lobby.html";
    }, 400);
});