import express from 'express';
import {
  addWord,
  deleteWord,
  getAllWords,
  updateWord,
} from '../controllers/wordController.js';

const router = express.Router();

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Buscar palavras
 *     responses:
 *       200:
 *         description: listar todas as palavras
 */
router.get('/', getAllWords);

/**
 * @swagger
 * /words:
 *   post:
 *     summary: Adicionar nova palavra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               palavra:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Palavra adicionada com sucesso
 */
router.post('/', addWord);

/**
 * @swagger
 * /words/{id}:
 *   put:
 *     summary: Atualizar palavra
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               palavra:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Palavra atualizada com sucesso
 *       404:
 *         description: Palavra não encontrada
 */
router.put('/:id', updateWord);

/**
 * @swagger
 * /words/{id}:
 *   delete:
 *     summary: Excluir palavra
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Paravra excluida com sucesso
 *       404:
 *         description: Palavra não encontrada
 */
router.delete('/:id', deleteWord);

export default router;
