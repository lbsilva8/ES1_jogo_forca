import express from 'express';
import { getAllWords } from '../controllers/wordController.js';

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

export default router;
