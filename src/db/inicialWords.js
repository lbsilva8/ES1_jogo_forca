import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('banco_palavras.db');

const initialWords = [
  ['morango', 'fruta'],
  ['banana', 'fruta'],
  ['cachorro', 'animal'],
  ['gato', 'animal'],
  ['computador', 'tecnologia'],
  ['smartphone', 'tecnologia'],
  ['cadeira', 'objeto'],
  ['mesa', 'objeto'],
  ['quadrado', 'formato'],
  ['círculo', 'formato'],
  ['alegria', 'sentimento'],
  ['tristeza', 'sentimento'],
  ['paris', 'cidade'],
  ['roma', 'cidade'],
  ['brasil', 'país'],
];

db.serialize(() => {
  // Cria a tabela
  db.run(`CREATE TABLE IF NOT EXISTS palavras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    palavra TEXT NOT NULL,
    categoria TEXT NOT NULL
  )`);

  // Insere as palavras iniciais
  const stmt = db.prepare(
    'INSERT INTO palavras (palavra, categoria) VALUES (?, ?)',
  );

  initialWords.forEach(([palavra, categoria]) => {
    stmt.run(palavra, categoria);
  });

  stmt.finalize();
});

db.close();
