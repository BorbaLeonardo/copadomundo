async function buscarJogador() {
  const nome = document.getElementById("busca").value.trim();

  if (nome === "") {
    alert("Digite o nome de um jogador.");
    return;
  }

  await salvarHistorico(nome);

  try {
    const resposta = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nome)}`,
    );
    const dados = await resposta.json();

    mostrarResultados(dados.player);
  } catch (erro) {
    console.log(erro);
    document.getElementById("resultados").innerHTML =
      "<p>Erro ao buscar jogadores.</p>";
  }
}

function mostrarResultados(jogadores) {
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";
  if (!jogadores || jogadores.length === 0) {
    resultados.innerHTML = "<p>Nenhum jogador encontrado.</p>";
    return;
  }

  jogadores.forEach((jogador) => {
    const card = document.createElement("div");
    card.className = "card";
    const foto =
      jogador.strCutout ||
      jogador.strThumb ||
      "https://via.placeholder.com/150";

    card.innerHTML = `
            <img src="${foto}" alt="${jogador.strPlayer}">
            <h3>${jogador.strPlayer}</h3>
            <p><strong>País:</strong> ${jogador.strNationality || "Não informado"}</p>
            <p><strong>Clube:</strong> ${jogador.strTeam || "Sem clube"}</p>
            <p><strong>Posição:</strong> ${jogador.strPosition || "Não informada"}</p>
            <button class="btn-favorito">
                Favoritar
            </button>
            <button class="btn-time">
                Meu Time
            </button>
        `;

    card.querySelector(".btn-favorito").addEventListener("click", () => {
      favoritar({
        id: jogador.idPlayer,
        nome: jogador.strPlayer,
        clube: jogador.strTeam,
        pais: jogador.strNationality,
        foto: foto,
      });
    });

    card.querySelector(".btn-time").addEventListener("click", () => {
      adicionarMeuTime({
        id: jogador.idPlayer,
        nome: jogador.strPlayer,
        posicao: jogador.strPosition,
        clube: jogador.strTeam,
        foto: foto,
      });
    });

    resultados.appendChild(card);
  });
}

async function salvarHistorico(nome) {
  await fetch("/historico", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      termo_buscado: nome,
    }),
  });
  carregarHistorico();
}

async function carregarHistorico() {
  const resposta = await fetch("/historico");
  const historico = await resposta.json();
  const lista = document.getElementById("historico");
  lista.innerHTML = "";
  historico.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.termo_buscado;
    lista.appendChild(li);
  });
}

async function limparHistorico() {
  await fetch("/historico", {
    method: "DELETE",
  });
  carregarHistorico();
}

async function favoritar(jogador) {
  await fetch("/favoritos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jogador),
  });
  carregarFavoritos();
}

async function carregarFavoritos() {
  const resposta = await fetch("/favoritos");
  const favoritos = await resposta.json();
  const div = document.getElementById("favoritos");
  div.innerHTML = "";
  favoritos.forEach((jogador) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${jogador.foto || "https://via.placeholder.com/150"}">
            <h3>${jogador.nome}</h3>
            <p>${jogador.clube || "Sem clube"}</p>
            <button onclick="removerFavorito(${jogador.id})">
                Remover
            </button>
        `;

    div.appendChild(card);
  });
  atualizarContadorFavoritos(favoritos.length);
}

async function removerFavorito(id) {
  await fetch(`/favoritos/${id}`, {
    method: "DELETE",
  });
  carregarFavoritos();
}

function atualizarContadorFavoritos(total) {
  document.getElementById("contadorFavoritos").textContent =
    `${total} jogador(es)`;
}

async function adicionarMeuTime(jogador) {
  await fetch("/meutime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jogador),
  });
  carregarMeuTime();
}

async function carregarMeuTime() {
  const resposta = await fetch("/meutime");
  const jogadores = await resposta.json();
  const div = document.getElementById("meuTime");
  div.innerHTML = "";

  jogadores.forEach((jogador) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${jogador.foto || "https://via.placeholder.com/150"}">
            <h3>${jogador.nome}</h3>
            <p>${jogador.posicao || "Sem posição"}</p>
            <button onclick="removerMeuTime(${jogador.id})">
                Remover
            </button>
        `;

    div.appendChild(card);
  });
  atualizarContadorTime(jogadores.length);
}

async function removerMeuTime(id) {
  await fetch(`/meutime/${id}`, {
    method: "DELETE",
  });
  carregarMeuTime();
}

function atualizarContadorTime(total) {
  document.getElementById("contadorTime").textContent = `${total} jogador(es)`;
}

window.onload = function () {
  carregarFavoritos();
  carregarMeuTime();
  carregarHistorico();

  document
    .getElementById("btnLimparHistorico")
    .addEventListener("click", limparHistorico);
};
