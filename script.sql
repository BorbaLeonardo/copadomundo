CREATE DATABASE copadomundo;

USE copadomundo;

CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogador_id VARCHAR(50),
    nome VARCHAR(100),
    clube VARCHAR(100),
    pais VARCHAR(100),
    foto TEXT
);

CREATE TABLE meu_time (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogador_id VARCHAR(50),
    nome VARCHAR(100),
    posicao VARCHAR(50),
    clube VARCHAR(100),
    foto TEXT
);

CREATE TABLE historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    termo_buscado VARCHAR(100),
    data_busca TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);