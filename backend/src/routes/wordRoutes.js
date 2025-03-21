import express from 'express';
import {
  getAllWords,
  getRandomWord,
  getWordByDifficulty,
} from '../controllers/wordController.js';

const router = express.Router();

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Buscar palavras
 *     description: Este endpoint retorna uma lista com todas as palavras cadastradas.
 *     tags:
 *       - BD
 *     responses:
 *       200:
 *         description: listar todas as palavras
 *         content:
 *            application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/', getAllWords);

/**
 * @swagger
 * /words/word:
 *   get:
 *     summary: Buscar uma palsvra aleatória
 *     description: Este endpoint retorna uma palavra aleatória do banco de dados.
 *     tags:
 *       - BD
 *     responses:
 *       200:
 *         description: listar palavra aleatória
 *         content:
 *            application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/word', getRandomWord);

/**
 * @swagger
 * /words/wordByDifficulty:
 *   get:
 *     summary: Buscar uma palavra filtrada por dificuldade
 *     description: Este endpoint retorna uma palavra filtrada com base na dificuldade (fácil, médio, difícil).
 *     tags:
 *       - BD
 *     parameters:
 *       - in: query
 *         name: dificuldade
 *         required: true
 *         schema:
 *           type: string
 *           enum: [facil, medio, dificil]
 *         description: A dificuldade da palavra a ser retornada.
 *     responses:
 *       200:
 *         description: listar palavra filtrada por dificuldade
 *         content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 palavra:
 *                   type: string
 *                 categoria:
 *                   type: string
 *       400:
 *         description: Dificuldade inválida fornecida
 *       404:
 *         description: Nenhuma palavra encontrada para a dificuldade selecionada
 */
router.get('/wordByDifficulty', getWordByDifficulty);

export default router;
