// // storage.js

// export function salvarUsuario(sessionData) {
//   const user = {
//     id: sessionData.id,
//     nome: sessionData.nome,
//     xp: sessionData.xp,
//     coins: sessionData.coins,
//     acesso: sessionData.tipoAcesso
//   };

//   localStorage.setItem("user", JSON.stringify(user));
// }

// export function pegarUsuario() {
//   const data = localStorage.getItem("user");
//   return data ? JSON.parse(data) : null;
// }

// export function limparUsuario() {
//   localStorage.removeItem("user");
// }


// storage.js

export function salvarUsuario(sessionData) {
  const user = {
    id: sessionData.id,
    nome: sessionData.nome,
    xp: sessionData.xp ?? 0,
    coins: sessionData.coins ?? 0
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
