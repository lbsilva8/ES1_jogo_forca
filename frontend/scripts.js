document.addEventListener('DOMContentLoaded', function () {
  /*Página 2*/
  let palavra = ['T', 'E', 'S', 'T', 'E'];
  let erros = 0;
  const maxErros = 6;
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
    palavra.forEach(() => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = '_';
      palavraEscolhida.appendChild(span);
    });
  }
  function verificarLetra(letra) {
    let acertou = false;
    document.querySelectorAll('.letter').forEach((span, index) => {
      if (palavra[index] === letra) {
        span.textContent = letra;
        acertou = true;
      }
    });
  
    if (!acertou) {
      if (erros < maxErros) {
        document.getElementById(partesBoneco[erros]).style.display = 'block';
        erros++;
      }
  
      if (erros === maxErros) {
        cabeca.src = 'img/morto.png';
        corvo.src = 'img/corvo-fome.png';
        fimDeJogo(); // Chama o fim de jogo quando o jogador perde
      }
    }
  
    // Verificar se venceu
    if ([...document.querySelectorAll('.letter')].every(span => span.textContent !== '_')) {
      venceuJogo();
    }
  }
  
  keyboard.addEventListener('click', function (event) {
    if (event.target.classList.contains('key')) {
      verificarLetra(event.target.textContent);
    }
  });

  generateWordSpaces();

  /* página de ajuda*/
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

  // Exibir a primeira página ao abrir o modal
  mostrarPagina(1);

  // Abrir e fechar o modal
  const infoButton = document.querySelector('.info');
  const modal = document.getElementById('infoModal');
  const closeModal = document.getElementById('closeModal');

  infoButton.addEventListener('click', function () {
    modal.showModal();
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  });

  closeModal.addEventListener('click', function () {
    modal.close();
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  });
});
//Fim de jogo 
function fimDeJogo() {
  const modalGame = document.getElementById('gameOverModal');
  const gameOverMessage = document.getElementById('gameOverMessage');

  gameOverMessage.textContent = "Você perdeu! Tente novamente.";
  modalGame.showModal(); // Abre o modal de Game Over
}

function venceuJogo() {
  const modalWin = document.getElementById('youWonModal');
  modalWin.showModal(); // Abre o modal de Vitória
}

// Fechar modal de game over
document.getElementById('closeGameOverModal').addEventListener('click', function () {
  document.getElementById('gameOverModal').close();
});

// Fechar modal de vitória
document.getElementById('closeYouWonModal').addEventListener('click', function () {
  document.getElementById('youWonModal').close();
});
