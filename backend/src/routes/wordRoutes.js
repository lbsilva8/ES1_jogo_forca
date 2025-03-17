import express from 'express';
import { getAllWords, getRandomWord } from '../controllers/wordController.js';

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

export default router;
