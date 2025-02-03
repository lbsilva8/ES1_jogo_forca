import Word from '../models/words.js';

export const getAllWords = async (req, res) => {
  try {
    const words = await Word.getAllWords();
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addWord = async (req, res) => {
  try {
    const { palavra, categoria } = req.body;
    const newWord = await Word.addWord(palavra, categoria);
    res.status(201).json(newWord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { palavra, categoria } = req.body;
    const updatedWord = await Word.updateWord(id, palavra, categoria);
    res.json(updatedWord);
  } catch (err) {
    if (err.message === 'Word not found') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

export const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;
    await Word.deleteWord(id);
    res.status(204).send();
  } catch (err) {
    if (err.message === 'Word not found') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};
