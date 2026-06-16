# Projeto Copa do Mundo

Projeto final desenvolvido para a disciplina de Desenvolvimento Web.

O sistema permite pesquisar jogadores de futebol utilizando a API TheSportsDB, visualizar suas informações, montar um time personalizado de 11 jogadores e organizá-los em diferentes formações táticas, além de manter um histórico das pesquisas realizadas.

---

## Autor

**Leonardo Borba**
Engenharia de Computação – Universidade Estadual de Ponta Grossa (UEPG)

---

## Objetivo do Projeto

Desenvolver uma aplicação web funcional utilizando os conceitos estudados durante a disciplina, incluindo integração entre front-end e back-end, persistência de dados em banco MySQL e consumo de APIs externas.

---

## Funcionalidades

* Buscar jogadores pelo nome utilizando a API TheSportsDB;
* Exibir informações do jogador, como:

  * Nome;
  * Nacionalidade;
  * Clube atual;
  * Foto do atleta;
* Adicionar jogadores ao "Meu Time";
* Montar um elenco com até 11 jogadores;
* Visualizar os jogadores em um campo tático;
* Alternar entre as formações:

  * 4-3-3;
  * 4-4-2;
  * 3-5-2;
* Remover jogadores do Meu Time;
* Registrar o histórico das pesquisas realizadas;
* Exibir contador de jogadores adicionados ao time;
* Utilizar armazenamento local na versão publicada do sistema.

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* Express
* MySQL
* API TheSportsDB
* Git e GitHub
* LocalStorage

---

## Estrutura do Projeto

copadomundo/

├── docs/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── index.js
├── package.json
├── package-lock.json
├── script.sql
├── README.md
└── .gitignore

---

## Como Executar o Projeto

### 1. Clone o repositório

git clone https://github.com/BorbaLeonardo/copadomundo.git

### 2. Entre na pasta do projeto

cd copadomundo

### 3. Instale as dependências

npm install

### 4. Configure o banco de dados

Abra o MySQL Workbench e execute o arquivo:

script.sql

Esse arquivo criará o banco de dados `copadomundo` e as tabelas necessárias para o funcionamento do sistema.

### 5. Inicie o servidor

node index.js

### 6. Acesse o sistema no navegador

http://localhost:3000

---

## Banco de Dados

O projeto utiliza o banco MySQL denominado:

copadomundo

As tabelas utilizadas são:

* meu_time
* historico

O arquivo `script.sql` contém toda a estrutura necessária para recriar o banco.

---

## API Utilizada

TheSportsDB

https://www.thesportsdb.com/

A API foi utilizada para realizar a busca dos jogadores e exibir suas informações no sistema.

---

## Versão Publicada

A versão publicada do projeto utiliza GitHub Pages e faz uso do LocalStorage para manter os dados do Meu Time e do Histórico de Pesquisas diretamente no navegador do usuário.

---

## Considerações Finais

Este projeto foi desenvolvido com o objetivo de aplicar, na prática, os principais conceitos abordados durante a disciplina, como manipulação do DOM, eventos em JavaScript, consumo de APIs, persistência de dados e construção de interfaces responsivas e organizadas.
