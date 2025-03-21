import { dirname, join } from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { initialWords } from '../db/inicialWords.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../banco_palavras.db');

class Word {
  constructor() {
    // Conecta ao banco de dados SQLite
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to SQLite database');
        this.initializeDatabase(); // Inicializa o banco de dados se a conexão for bem-sucedida
      }
    });
  }

  async initializeDatabase() {
    try {
      // Cria a tabela 'palavras' se ela não existir
      await this.runQuery(`
        CREATE TABLE IF NOT EXISTS palavras (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          palavra TEXT NOT NULL,
          categoria TEXT NOT NULL
        )
      `);

      // Verifica se a tabela 'palavras' está vazia
      const result = await this.getQuery(
        'SELECT COUNT(*) as count FROM palavras',
      );

      // Se a tabela estiver vazia, insere as palavras iniciais
      if (result.count === 0) {
        const stmt = this.db.prepare(
          'INSERT INTO palavras (palavra, categoria) VALUES (?, ?)',
        );

        for (const [palavra, categoria] of initialWords) {
          await new Promise((resolve, reject) => {
            stmt.run(palavra, categoria, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }

        await new Promise((resolve, reject) => {
          stmt.finalize((err) => {
            if (err) reject(err);
            else resolve();
          });
        });

        console.log('Database seeded successfully');
      } else {
        console.log('Database already contains words, skipping seed');
      }
    } catch (err) {
      console.error('Failed to initialize database:', err);
      throw err;
    }
  }

  runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  getQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  getAllWords() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM palavras', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  getRandomWord() {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM palavras ORDER BY RANDOM() LIMIT 1',
        [],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        },
      );
    });
  }

  getWordsByLength(minLength, maxLength) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT * FROM palavras
      WHERE LENGTH(palavra) BETWEEN ? AND ?
    `;
      this.db.all(query, [minLength, maxLength], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}
export default new Word();
