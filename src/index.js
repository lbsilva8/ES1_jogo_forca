import cors from 'cors';
import express from 'express';
import { dirname, join } from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import wordRoutes from './routes/wordRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo ao servidor do Jogo da Forca!',
    docs: '/api-docs',
  });
});

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jogo da Velha API',
      version: '1.0.0',
      description:
        'API de um jogo da velha para a disciplina de Engenharia de Software 1 UFCAT',
    },
  },
  apis: [join(__dirname, 'routes', 'wordRoutes.js')],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use('/words', wordRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Documentação Swagger disponivel em http://localhost:${PORT}/api-docs`,
  );
});
