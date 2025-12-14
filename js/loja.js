const overlay = document.getElementById("loading-overlay");

document.getElementById("voltar").addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "./lobby.html";
    }, 400);
});