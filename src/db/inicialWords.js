import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../banco_palavras.db');

export const initialWords = [
  ['morango', 'fruta'],
  ['banana', 'fruta'],
  ['cachorro', 'animal'],
  ['gato', 'animal'],
  ['computador', 'tecnologia'],
  ['smartphone', 'tecnologia'],
  ['cadeira', 'objeto'],
  ['mesa', 'objeto'],
  ['quadrado', 'formato'],
  ['círculo', 'formato'],
  ['alegria', 'sentimento'],
  ['tristeza', 'sentimento'],
  ['paris', 'cidade'],
  ['roma', 'cidade'],
];
