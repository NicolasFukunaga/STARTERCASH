// storage.js

export function salvarUsuario(sessionData) {
  const user = {
    nome: sessionData.nome,
    xp: sessionData.xp,
    coins: sessionData.coins,
    acesso: sessionData.tipoAcesso
  };

  localStorage.setItem("user", JSON.stringify(user));
}

export function pegarUsuario() {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}

export function limparUsuario() {
  localStorage.removeItem("user");
}


