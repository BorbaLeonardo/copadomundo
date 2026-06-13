const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const porta = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "copadomundo",
});

db.connect((erro) => {
  if (erro) {
    console.log("Erro ao conectar ao MySQL:", erro);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/favoritos", (req, res) => {
  db.query("SELECT * FROM favoritos ORDER BY id DESC", (erro, resultados) => {
    if (erro) {
      console.log(erro);
      return res.status(500).send(erro);
    }

    res.json(resultados);
  });
});

app.post("/favoritos", (req, res) => {
  const { id, nome, clube, pais, foto } = req.body;

  db.query(
    "SELECT * FROM favoritos WHERE jogador_id = ?",
    [id],
    (erro, resultados) => {
      if (erro) {
        console.log(erro);
        return res.status(500).send(erro);
      }

      if (resultados.length > 0) {
        return res.send("Jogador já está nos favoritos.");
      }

      const sql = `
        INSERT INTO favoritos
        (jogador_id, nome, clube, pais, foto)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(sql, [id, nome, clube, pais, foto], (erro) => {
        if (erro) {
          console.log(erro);
          return res.status(500).send(erro);
        }

        res.send("Favorito salvo!");
      });
    },
  );
});

app.delete("/favoritos/:id", (req, res) => {
  db.query("DELETE FROM favoritos WHERE id = ?", [req.params.id], (erro) => {
    if (erro) {
      console.log(erro);
      return res.status(500).send(erro);
    }

    res.send("Favorito removido!");
  });
});

app.get("/meutime", (req, res) => {
  db.query("SELECT * FROM meu_time ORDER BY id DESC", (erro, resultados) => {
    if (erro) {
      console.log(erro);
      return res.status(500).send(erro);
    }

    res.json(resultados);
  });
});

app.post("/meutime", (req, res) => {
  const { id, nome, posicao, clube, foto } = req.body;

  db.query(
    "SELECT * FROM meu_time WHERE jogador_id = ?",
    [id],
    (erro, resultados) => {
      if (erro) {
        console.log(erro);
        return res.status(500).send(erro);
      }

      if (resultados.length > 0) {
        return res.send("Jogador já está no seu time.");
      }

      const sql = `
        INSERT INTO meu_time
        (jogador_id, nome, posicao, clube, foto)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(sql, [id, nome, posicao, clube, foto], (erro) => {
        if (erro) {
          console.log(erro);
          return res.status(500).send(erro);
        }

        res.send("Jogador adicionado ao time!");
      });
    },
  );
});

app.delete("/meutime/:id", (req, res) => {
  db.query("DELETE FROM meu_time WHERE id = ?", [req.params.id], (erro) => {
    if (erro) {
      console.log(erro);
      return res.status(500).send(erro);
    }

    res.send("Jogador removido do time!");
  });
});

app.get("/historico", (req, res) => {
  db.query(
    "SELECT * FROM historico ORDER BY id DESC LIMIT 10",
    (erro, resultados) => {
      if (erro) {
        console.log(erro);
        return res.status(500).send(erro);
      }

      res.json(resultados);
    },
  );
});

app.post("/historico", (req, res) => {
  const { termo_buscado } = req.body;

  db.query(
    "INSERT INTO historico (termo_buscado) VALUES (?)",
    [termo_buscado],
    (erro) => {
      if (erro) {
        console.log(erro);
        return res.status(500).send(erro);
      }

      res.send("Histórico salvo!");
    },
  );
});

app.delete("/historico", (req, res) => {
  db.query("DELETE FROM historico", (erro) => {
    if (erro) {
      console.log(erro);
      return res.status(500).send(erro);
    }

    res.send("Histórico apagado!");
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
