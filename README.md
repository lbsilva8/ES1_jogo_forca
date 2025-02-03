<h1 align="center">API Jogo da velha</h1>

<p align="center">
 <a href="#descricao">Descrição do projeto</a> •
 <a href="#executar">Como executar</a> • 
 <a href="#funcionalidades">Funcionalidades</a> • 
 <a href="#autores">Autores</a>
</p>

---

## Descrição do projeto:

<p> Projeto para a disciplina de Engenharia de Software I do curso de Ciencias da computação da UFCAT. <br>
Está sendo desenvolvida uma API de um jogo da velha para navegador. </p>

---

## Como executar:

### Instalação

- Clonar o repositório ou realizar o download do mesmo;
- Instalar todas as bibliotecas:

```
npm install
```

- Para inciar o banco de dados com as palavras bases:

```
node src/db/inicialWords.js
```

- Executar a API:

```
npm run dev
```

- Abrir o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador para verificar o status da API em execução.
- Abrir o [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para acesara documentação no Swagger.

---

## Funcionalidades

- [x] Método GET, para visualizar todas as palavras cadastradas na base de dados
- [x] Método POST, para cadastro de novas palavras na base de dados
- [x] Método DELETE, para exclusão de palavras atravez do ID
- [x] Método PUT, para edição de palavras já cadastrados na base de dados

### Autores

---

<a>
 <sub><b>Aline</b></sub>
 <sub><b>Ana Clara</b></sub>
 <sub><b>Lorena Borges</b></sub>
 <sub><b>Marcus</b></sub>
 <sub><b>Maria Isadora</b></sub>
 </a>
