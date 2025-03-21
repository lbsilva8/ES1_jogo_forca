document.addEventListener('DOMContentLoaded', async function () {
  console.log('Página carregada e evento DOMContentLoaded executado');

  const API_BASE_URL = 'http://localhost:3000';

  let palavra = '';
  let dificuldade = '';
  let categoria = '';
  let arrayPalavra = [];
  let erros = 0;
  const maxErros = 6;
  let pontuacao = parseInt(localStorage.getItem('pontuacao')) || 0; // Nova: pontuação
  let letrasUsadas = new Set(); // Nova: rastrear letras usadas
  const pontuacaoElemento = document.getElementById('pontuacao'); // Nova: elemento de pontuação

  if (pontuacaoElemento) {
    pontuacaoElemento.textContent = pontuacao; // Nova: exibir pontuação inicial
  }

  dificuldade = localStorage.getItem('dificuldade'); // Carregar a dificuldade ou usar 'facil' como padrão

  async function getPalavraAleatoria(dificuldade = '') {
    try {
      const url = dificuldade
        ? `${API_BASE_URL}/words/wordByDifficulty?dificuldade=${dificuldade}`
        : `${API_BASE_URL}/words/word`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Erro ao buscar palavra');
      }
      const data = await response.json();
      return data; // Retorna a palavra aleatória
    } catch (error) {
      console.error('Erro ao buscar palavra aleatória:', error);
      throw error;
    }
  }

  // Função para inicializar o jogo com uma nova palavra
  async function iniciarJogo(dificuldade = '') {
    try {
      const data = await getPalavraAleatoria(dificuldade);
      palavra = data.palavra.toUpperCase();
      categoria = data.categoria;
      arrayPalavra = palavra.split('');
      erros = 0;
      letrasUsadas.clear(); // Nova: limpar letras usadas
      generateWordSpaces();
      carregarCategoria();
      resetarBoneco();
      resetarTeclado();
    } catch (error) {
      document.getElementById('palavraEscolhida').textContent =
        'Erro ao carregar palavra.';
      palavra = 'EXEMPLO';
      categoria = 'Geral';
      arrayPalavra = palavra.split('');
      erros = 0;
      letrasUsadas.clear(); // Nova: limpar letras usadas
      generateWordSpaces();
      carregarCategoria();
      resetarBoneco();
      resetarTeclado();
    }
  }

  function carregarCategoria() {
    document.getElementById('categoria').textContent = categoria.toUpperCase();
  }

  /* Página 2 */
  const partesBoneco = [
    'cabeca',
    'corpo',
    'bracoE',
    'bracoD',
    'pernaE',
    'pernaD',
  ];
  const palavraEscolhida = document.getElementById('palavraEscolhida');
  const keyboard = document.getElementById('keyboard');
  const cabeca = document.getElementById('cabeca');
  const corvo = document.getElementById('corvo');

  function generateWordSpaces() {
    palavraEscolhida.innerHTML = '';
    arrayPalavra.forEach((letra) => {
      const span = document.createElement('span');
      span.className = 'letter';
      if (letra === ' ') {
        span.textContent = ' '; // Espaços aparecem como visíveis
        span.classList.add('space'); // Opcional: estilização para espaços
      } else if (letra === '-') {
        span.textContent = '-'; // Hífens aparecem diretamente
        span.classList.add('hyphen'); // Opcional: estilização para hífens
      } else {
        span.textContent = '_'; // Letras permanecem ocultas
      }
      palavraEscolhida.appendChild(span);
    });
  }
  
  

  function resetarBoneco() {
    partesBoneco.forEach((parte) => {
      document.getElementById(parte).style.display = 'none';
    });
    cabeca.src = 'img/cabeça-viva.png';
    corvo.src = 'img/corvo-hd.png';
  }

  function resetarTeclado() {
    document.querySelectorAll('.key').forEach((tecla) => {
      tecla.disabled = false;
      tecla.classList.remove('disabled-key');
    });
  }

  function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function verificarLetra(letra) {
    let letraNormalizada = removerAcentos(letra.toLowerCase());
  
    if (letrasUsadas.has(letraNormalizada)) return; // Nova: verificar letras usadas
  
    letrasUsadas.add(letraNormalizada); // Nova: adicionar letra usada
    let acertou = false;
  
    document.querySelectorAll('.letter').forEach((span, index) => {
      if (arrayPalavra[index] === ' ' || arrayPalavra[index] === '-') return; // Ignora espaços e hífens
      let letraPalavra = removerAcentos(arrayPalavra[index].toLowerCase());
      if (letraPalavra === letraNormalizada) {
        span.textContent = arrayPalavra[index]; // Mantém o acento original
        acertou = true;
      }
    });
  
    let tecla = [...document.querySelectorAll('.key')].find(
      (key) => key.textContent.toLowerCase() === letra.toLowerCase(),
    );
  
    if (tecla) {
      tecla.disabled = true;
      tecla.classList.add('disabled-key');
    }
  
    if (!acertou) {
      if (erros < maxErros) {
        document.getElementById(partesBoneco[erros]).style.display = 'block';
        erros++;
      }
  
      if (erros === maxErros) {
        cabeca.src = 'img/morto.png';
        corvo.src = 'img/corvo-fome.png';
        fimDeJogo();
      }
    }
  
    // Verificar se todas as letras (exceto espaços e hífens) foram acertadas
    if (
      [...document.querySelectorAll('.letter')].every(
        (span, index) =>
          span.textContent !== '_' || arrayPalavra[index] === ' ' || arrayPalavra[index] === '-',
      )
    ) {
      venceuJogo();
    }
  }
  

  // Nova: captura de entrada por teclado físico
  document.addEventListener('keydown', function (event) {
    let letra = event.key.toUpperCase();
    if (/^[A-ZÇ]$/.test(letra) && !letrasUsadas.has(letra.toLowerCase())) {
      verificarLetra(letra);
    }
  });

  keyboard.addEventListener('click', function (event) {
    if (event.target.classList.contains('key')) {
      verificarLetra(event.target.textContent);
    }
  });

  /* Página de ajuda */
  let paginaAtual = 1;
  const totalPaginas = 4;

  function mostrarPagina(numero) {
    document.querySelectorAll('.popup-page').forEach((pagina) => {
      pagina.style.display = 'none';
    });
    document.getElementById(`pagina${numero}`).style.display = 'block';
    paginaAtual = numero;
  }

  window.mudarPagina = function (numero) {
    if (numero >= 1 && numero <= totalPaginas) {
      mostrarPagina(numero);
    }
  };

  mostrarPagina(1);

  const infoButton = document.querySelector('.info');
  const modal = document.getElementById('infoModal');
  const closeModal = document.getElementById('closeModal');
  const overlay = document.getElementById('overlay');

  infoButton.addEventListener('click', function () {
    modal.showModal();
    overlay.style.display = 'block';
  });

  closeModal.addEventListener('click', function () {
    modal.close();
    overlay.style.display = 'none';
  });

  // Fim de jogo
  function reiniciarJogo() {
    const dificuldade = localStorage.getItem('dificuldade') || 'facil'; // Lê novamente a dificuldade
    iniciarJogo(dificuldade); // Busca uma nova palavra e reinicia o jogo
  }

  function fimDeJogo() {
    adicionarPontos(-5); // Nova: subtrair pontos ao perder
    const modalGame = document.getElementById('gameOverModal');
    const gameOverMessage = document.getElementById('gameOverMessage');

    gameOverMessage.textContent = `Você perdeu! A palavra era: ${palavra}. Tente novamente.`;
    modalGame.showModal();
  }

  function venceuJogo() {
    adicionarPontos(10); // Nova: adicionar pontos ao vencer
    const modalWin = document.getElementById('youWonModal');
    modalWin.showModal();
  }

  // Nova: função para gerenciar pontuação
  function adicionarPontos(pontos) {
    pontuacao += pontos;
    if (pontuacaoElemento) {
      pontuacaoElemento.textContent = pontuacao;
    }
    localStorage.setItem('pontuacao', pontuacao);
  }

  document
    .getElementById('closeGameOverModal')
    .addEventListener('click', function () {
      document.getElementById('gameOverModal').close();
      reiniciarJogo();
    });

  document
    .getElementById('closeYouWonModal')
    .addEventListener('click', function () {
      document.getElementById('youWonModal').close();
      reiniciarJogo();
    });

  // Inicia o jogo pela primeira vez
  await iniciarJogo(dificuldade);

  document
    .getElementById('resetarJogoBtn')
    .addEventListener('click', function () {
      // Zera todos os dados no localStorage
      localStorage.clear(); // Remove todos os dados do localStorage

      // Zera as variáveis relevantes
      pontuacao = 0;
      letrasUsadas.clear(); // Limpa as letras usadas

      // Atualiza a pontuação na interface
      if (pontuacaoElemento) {
        pontuacaoElemento.textContent = pontuacao;
      }
    });
});
