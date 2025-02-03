import { dirname, join } from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '../../banco_palavras.db');

class Word {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to SQLite database');
        this.initializeDatabase();
      }
    });
  }

  initializeDatabase() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS palavras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        palavra TEXT NOT NULL,
        categoria TEXT NOT NULL
      )
    `);
  }

  getAllWords() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM palavras', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  addWord(palavra, categoria) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO palavras (palavra, categoria) VALUES (?, ?)',
        [palavra, categoria],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, palavra, categoria });
        },
      );
    });
  }

  updateWord(id, palavra, categoria) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE palavras SET palavra = ?, categoria = ? WHERE id = ?',
        [palavra, categoria, id],
        function (err) {
          if (err) reject(err);
          else if (this.changes === 0) reject(new Error('Word not found'));
          else resolve({ id, palavra, categoria });
        },
      );
    });
  }

  deleteWord(id) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM palavras WHERE id = ?', [id], function (err) {
        if (err) reject(err);
        else if (this.changes === 0) reject(new Error('Word not found'));
        else resolve({ id });
      });
    });
  }

  getRandomWordByDifficulty(level) {
    let wordLengthCondition;

    switch (level) {
      case 'easy':
        wordLengthCondition = 'length(palavra) <= 5';
        break;
      case 'medium':
        wordLengthCondition = 'length(palavra) BETWEEN 6 AND 8';
        break;
      case 'hard':
        wordLengthCondition = 'length(palavra) > 8';
        break;
      default:
        return Promise.reject(new Error('Invalid difficulty level'));
    }

    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM palavras WHERE ${wordLengthCondition} ORDER BY RANDOM() LIMIT 1`,
        [],
        (err, row) => {
          if (err) reject(err);
          else if (!row)
            reject(new Error('No words found for this difficulty level'));
          else resolve(row);
        },
      );
    });
  }

  getWordById(id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT palavra FROM palavras WHERE id = ?',
        [id],
        (err, row) => {
          if (err) reject(err);
          else if (!row) reject(new Error('Word not found'));
          else resolve(row);
        },
      );
    });
  }
}

export default new Word();
