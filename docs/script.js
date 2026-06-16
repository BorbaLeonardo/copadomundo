let meuTime = JSON.parse(localStorage.getItem("meuTime")) || [];
let historico = JSON.parse(localStorage.getItem("historico")) || [];

async function buscarJogador() {
  const nome = document.getElementById("busca").value.trim();

  if (nome === "") {
    alert("Digite o nome de um jogador.");
    return;
  }

  salvarHistorico(nome);

  const resposta = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nome)}`,
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

            <button onclick='adicionarMeuTime(${JSON.stringify({
              id: jogador.idPlayer,
              nome: jogador.strPlayer,
              foto:
                jogador.strCutout ||
                jogador.strThumb ||
                "https://via.placeholder.com/150",
            })})'>
                Adicionar ao Meu Time
            </button>
        `;

    resultados.appendChild(card);
  });
}

function adicionarMeuTime(jogador) {
  if (meuTime.length >= 11) {
    alert("Seu time já possui 11 jogadores.");
    return;
  }

  const existe = meuTime.some((j) => j.id === jogador.id);

  if (existe) {
    alert("Este jogador já está no seu time.");
    return;
  }

  meuTime.push(jogador);

  salvarMeuTime();

  desenharCampo();
}

function removerMeuTime(indice) {
  meuTime.splice(indice, 1);

  salvarMeuTime();

  desenharCampo();
}

function salvarMeuTime() {
  localStorage.setItem("meuTime", JSON.stringify(meuTime));

  document.getElementById("contadorMeuTime").textContent = meuTime.length;
}

function desenharCampo() {
  const campo = document.getElementById("campo");

  campo.innerHTML = "";

  const formacao = document.getElementById("formacao").value;

  let linhas = [];

  if (formacao === "433") {
    linhas = [1, 4, 3, 3];
  }

  if (formacao === "442") {
    linhas = [1, 4, 4, 2];
  }

  if (formacao === "352") {
    linhas = [1, 3, 5, 2];
  }

  let indiceJogador = 0;

  linhas.forEach((quantidade) => {
    const linha = document.createElement("div");

    linha.className = "linha";

    for (let i = 0; i < quantidade; i++) {
      const posicao = document.createElement("div");

      if (indiceJogador < meuTime.length) {
        const jogador = meuTime[indiceJogador];

        posicao.className = "jogador-campo";

        posicao.innerHTML = `
                    <img src="${jogador.foto}">

                    <span>${jogador.nome}</span>

                    <button onclick="removerMeuTime(${indiceJogador})">
                        Remover
                    </button>
                `;

        indiceJogador++;
      } else {
        posicao.className = "jogador-campo";

        posicao.innerHTML = `
                    <span>Vazio</span>
                `;
      }

      linha.appendChild(posicao);
    }

    campo.appendChild(linha);
  });

  document.getElementById("contadorMeuTime").textContent = meuTime.length;
}

function salvarHistorico(nome) {
  historico.unshift(nome);

  historico = historico.slice(0, 10);

  localStorage.setItem("historico", JSON.stringify(historico));

  carregarHistorico();
}

function carregarHistorico() {
  const lista = document.getElementById("historico");

  lista.innerHTML = "";

  historico.forEach((termo) => {
    const li = document.createElement("li");

    li.textContent = termo;

    lista.appendChild(li);
  });
}

window.onload = function () {
  document.getElementById("contadorMeuTime").textContent = meuTime.length;

  carregarHistorico();

  desenharCampo();
};
