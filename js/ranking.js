
// document.addEventListener("DOMContentLoaded", () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   // 🔒 proteção
//   if (!user) {
//     window.location.href = "../index.html";
//     return;
//   }

//   // nome
//   document.querySelector(".user-box strong").textContent = user.nome;

//   // XP
//   const xpPercent = Math.min(user.xp, 100);
//   document.querySelector(".xp-fill").style.width = xpPercent + "%";
//   document.querySelector(".xp-text").textContent = `${xpPercent}% XP`;

//   // coins
//   document.querySelector(".user-box > p").textContent = `${user.coins} 💰`;
// });

// const overlay = document.getElementById("loading-overlay");

// document.getElementById("voltar").addEventListener("click", () => {
//     overlay.classList.add("active");
//     document.body.classList.add("fade-out");

//     setTimeout(() => {
//         window.location.href = "./lobby.html";
//     }, 400);
// });


document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 proteção
  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  // ===============================
  // HEADER (user box)
  // ===============================
  document.querySelector(".user-box strong").textContent = user.nome;

  const xpPercent = Math.min(user.xp ?? 0, 100);
  document.querySelector(".xp-fill").style.width = xpPercent + "%";
  document.querySelector(".xp-text").textContent = `${xpPercent}XP`;
  document.querySelector(".user-box > p").textContent = `${user.coins ?? 0} 💰`;

  // ===============================
  // CRIA DOM DO RANKING
  // ===============================
  const main = document.createElement("main");
  main.className = "ranking-container";

  const ul = document.createElement("ul");
  ul.id = "ranking-list";

  main.appendChild(ul);
  document.body.appendChild(main);

  // ===============================
  // CARREGA RANKING
  // ===============================
  carregarRanking();
});

// =====================================================
// 🔥 RANKING API
// =====================================================
async function carregarRanking() {
  const overlay = document.getElementById("loading-overlay");
  const list = document.getElementById("ranking-list");

  overlay.classList.add("active");

  try {
    const response = await fetch("http://localhost:8080/ranking");

    if (!response.ok) {
      throw new Error("Erro ao buscar ranking");
    }

    let ranking = await response.json();

    // 🔥 ordena por XP (desc)
    ranking.sort((a, b) => b.xp - a.xp);

    list.innerHTML = "";

    ranking.forEach((user, index) => {
      const li = document.createElement("li");
      li.className = "ranking-item";

      if (index === 0) li.classList.add("gold");
      if (index === 1) li.classList.add("silver");
      if (index === 2) li.classList.add("bronze");

      li.innerHTML = `
        <span class="posicao">#${index + 1}</span>
        <span class="nome">${user.nome}</span>
        <span class="xp">${user.xp} XP</span>
      `;

      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = `<p class="erro">Erro ao carregar ranking</p>`;
  } finally {
    overlay.classList.remove("active");
  }
}

// =====================================================
// BOTÃO VOLTAR (seu código, intacto)
// =====================================================
const overlay = document.getElementById("loading-overlay");

document.getElementById("voltar").addEventListener("click", () => {
  overlay.classList.add("active");
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "./lobby.html";
  }, 400);
});
