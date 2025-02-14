import Word from '../models/words.js';

export const getAllWords = async (req, res) => {
  try {
    const words = await Word.getAllWords();
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
