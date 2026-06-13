function obterFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function salvarFavoritos(favoritos) {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function obterMeuTime() {
  return JSON.parse(localStorage.getItem("meuTime")) || [];
}

function salvarMeuTime(time) {
  localStorage.setItem("meuTime", JSON.stringify(time));
}

function obterHistorico() {
  return JSON.parse(localStorage.getItem("historico")) || [];
}

function salvarHistoricoLocal(historico) {
  localStorage.setItem("historico", JSON.stringify(historico));
}

async function buscarJogador() {
  const nome = document.getElementById("busca").value.trim();

  if (nome === "") {
    alert("Digite o nome de um jogador.");
    return;
  }

  let historico = obterHistorico();

  historico.unshift(nome);

  historico = [...new Set(historico)].slice(0, 10);

  salvarHistoricoLocal(historico);

  carregarHistorico();

  const resposta = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${nome}`,
  );

  const dados = await resposta.json();

  mostrarResultados(dados.player);
}

function mostrarResultados(jogadores) {
  const resultados = document.getElementById("resultados");

  resultados.innerHTML = "";

  if (!jogadores) {
    resultados.innerHTML = "<p>Nenhum jogador encontrado.</p>";
    return;
  }

  jogadores.forEach((jogador) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${jogador.strCutout || jogador.strThumb || "https://via.placeholder.com/150"}">

      <h3>${jogador.strPlayer}</h3>

      <p><strong>País:</strong> ${jogador.strNationality || "Não informado"}</p>

      <p><strong>Clube:</strong> ${jogador.strTeam || "Sem clube"}</p>

      <p><strong>Posição:</strong> ${jogador.strPosition || "Não informada"}</p>

      <button onclick='favoritar(${JSON.stringify({
        id: jogador.idPlayer,
        nome: jogador.strPlayer,
        clube: jogador.strTeam,
        pais: jogador.strNationality,
        foto: jogador.strCutout || jogador.strThumb,
      })})'>
        Favoritar
      </button>

      <button onclick='adicionarMeuTime(${JSON.stringify({
        id: jogador.idPlayer,
        nome: jogador.strPlayer,
        posicao: jogador.strPosition,
        clube: jogador.strTeam,
        foto: jogador.strCutout || jogador.strThumb,
      })})'>
        Meu Time
      </button>
    `;

    resultados.appendChild(card);
  });
}

function favoritar(jogador) {
  const favoritos = obterFavoritos();

  if (favoritos.some((f) => f.id == jogador.id)) {
    return;
  }

  favoritos.unshift(jogador);

  salvarFavoritos(favoritos);

  carregarFavoritos();
}

function carregarFavoritos() {
  const favoritos = obterFavoritos();

  const div = document.getElementById("favoritos");

  div.innerHTML = "";

  favoritos.forEach((jogador, index) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${jogador.foto || "https://via.placeholder.com/150"}">

      <h3>${jogador.nome}</h3>

      <p>${jogador.clube}</p>

      <button onclick="removerFavorito(${index})">
        Remover
      </button>
    `;

    div.appendChild(card);
  });

  document.getElementById("contadorFavoritos").textContent = favoritos.length;
}

function removerFavorito(index) {
  const favoritos = obterFavoritos();

  favoritos.splice(index, 1);

  salvarFavoritos(favoritos);

  carregarFavoritos();
}

function adicionarMeuTime(jogador) {
  const time = obterMeuTime();

  if (time.some((j) => j.id == jogador.id)) {
    return;
  }

  time.unshift(jogador);

  salvarMeuTime(time);

  carregarMeuTime();
}

function carregarMeuTime() {
  const time = obterMeuTime();

  const div = document.getElementById("meuTime");

  div.innerHTML = "";

  time.forEach((jogador, index) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${jogador.foto || "https://via.placeholder.com/150"}">

      <h3>${jogador.nome}</h3>

      <p>${jogador.posicao}</p>

      <button onclick="removerMeuTime(${index})">
        Remover
      </button>
    `;

    div.appendChild(card);
  });

  document.getElementById("contadorMeuTime").textContent = time.length;
}

function removerMeuTime(index) {
  const time = obterMeuTime();

  time.splice(index, 1);

  salvarMeuTime(time);

  carregarMeuTime();
}

function carregarHistorico() {
  const historico = obterHistorico();

  const lista = document.getElementById("historico");

  lista.innerHTML = "";

  historico.forEach((item) => {
    const li = document.createElement("li");

    li.textContent = item;

    lista.appendChild(li);
  });
}

window.onload = function () {
  carregarFavoritos();
  carregarMeuTime();
  carregarHistorico();
};
