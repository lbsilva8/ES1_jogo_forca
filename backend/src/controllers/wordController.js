// controllers/wordController.js
import Word from '../models/words.js';

export const getAllWords = async (req, res) => {
  try {
    const words = await Word.getAllWords();
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRandomWord = async (req, res) => {
  try {
    const word = await Word.getRandomWord();
    res.json({ palavra: word.palavra, categoria: word.categoria });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWordByDifficulty = async (req, res) => {
  const { dificuldade } = req.query;

  try {
    let words;

    if (dificuldade === 'facil') {
      words = await Word.getWordsByLength(0, 5);
    } else if (dificuldade === 'medio') {
      words = await Word.getWordsByLength(6, 10);
    } else if (dificuldade === 'dificil') {
      words = await Word.getWordsByLength(11, Infinity);
    } else {
      words = await Word.getWordsByLength(6, 10);
    }

    if (words.length === 0) {
      return res.status(404).json({
        error: 'Nenhuma palavra encontrada para a dificuldade selecionada',
      });
    }

    const randomWord = words[Math.floor(Math.random() * words.length)];

    res.json({ palavra: randomWord.palavra, categoria: randomWord.categoria });
  } catch (err) {
    console.error('Erro ao obter palavra:', err);
    res.status(500).json({ error: err.message });
  }
};
