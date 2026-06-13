# Copa do Mundo

Projeto final desenvolvido para a disciplina de Desenvolvimento Web.
O sistema permite pesquisar jogadores de futebol utilizando a API TheSportsDB, visualizar suas informações, adicioná-los aos favoritos, montar um time personalizado e manter um histórico das pesquisas realizadas.
---

# Autor

**Leonardo Borba**
Engenharia de Computação – Universidade Estadual de Ponta Grossa (UEPG)
---

## Objetivo do Projeto

Desenvolver uma aplicação web funcional utilizando os conceitos estudados durante a disciplina, incluindo integração entre front-end e back-end, persistência de dados em banco MySQL e consumo de APIs externas.
---

# Funcionalidades

* Buscar jogadores pelo nome utilizando a API TheSportsDB;
* Exibir informações do jogador, como:
  * Nome;
  * Nacionalidade;
  * Clube atual;
  * Posição;
  * Foto do atleta;
* Adicionar jogadores aos Favoritos;
* Remover jogadores dos Favoritos;
* Montar o "Meu Time" com os jogadores escolhidos;
* Remover jogadores do Meu Time;
* Registrar o histórico das pesquisas realizadas;
* Limpar o histórico de pesquisas;
* Atualizar automaticamente os contadores de Favoritos e Meu Time.

---

# Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* Express
* MySQL
* API TheSportsDB
* Git e GitHub
---

# Estrutura do Projeto
copadomundo/
├── index.js
├── package.json
├── package-lock.json
├── script.sql
├── README.md
└── public/
    ├── index.html
    ├── style.css
    └── script.js
---

## Como Executar o Projeto
# 1. Clone o repositório
git clone https://github.com/BorbaLeonardo/copadomundo.git

# 2. Entre na pasta do projeto
cd copadomundo

# 3. Instale as dependências
npm install

# 4. Configure o banco de dados
Abra o MySQL Workbench e execute o arquivo:
script.sql
Esse arquivo criará o banco de dados `copadomundo` e todas as tabelas necessárias para o funcionamento do sistema.

# 5. Inicie o servidor
node index.js

# 6. Acesse o sistema no navegador
http://localhost:3000

---
# Banco de Dados
O projeto utiliza o banco MySQL denominado:
copadomundo

As tabelas utilizadas são:
* favoritos
* meu_time
* historico

O arquivo `script.sql` contém toda a estrutura necessária para recriar o banco.
---
# API Utilizada

TheSportsDB
https://www.thesportsdb.com/
A API foi utilizada para realizar a busca dos jogadores e exibir suas informações no sistema.
