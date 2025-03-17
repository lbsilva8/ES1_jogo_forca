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
    console.log('Palavra enviada para o frontend:', word);
    res.json(word);
  } catch (err) {
    console.error('Erro ao obter palavra:', error);
    res.status(500).json({ error: err.message });
  }
};
