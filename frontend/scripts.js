document.addEventListener('DOMContentLoaded', async function () {
  console.log('Página carregada e evento DOMContentLoaded executado');

  const API_BASE_URL = 'http://localhost:3000';
  let palavra = "";
  let categoria = "";
  let arrayPalavra;
  let pontuacao = parseInt(localStorage.getItem("pontuacao")) || 0;
  let palavraArray = []; // Inicializando como um array vazio
  let erros = 0;
  const maxErros = 6;
  const partesBoneco = ['cabeca', 'corpo', 'bracoE', 'bracoD', 'pernaE', 'pernaD'];
  let letrasUsadas = new Set(); // Armazena as letras já digitadas
  const pontuacaoElemento = document.getElementById("pontuacao");

  if (pontuacaoElemento) {
    pontuacaoElemento.textContent = pontuacao; // Atualiza o texto inicial da pontuação
  }

  async function getPalavraAleatoria() {
    try {
      const dificuldade = localStorage.getItem("dificuldade") || "medio";
      const response = await fetch(`${API_BASE_URL}/words/word?dificuldade=${dificuldade}`);

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar palavra aleatória:", error);
      throw error;
    }
  }

  async function carregarPalavra() {
    try {
      arrayPalavra = await getPalavraAleatoria();
      if (!arrayPalavra || !arrayPalavra.palavra) {
        throw new Error("Palavra inválida recebida da API");
      }

      palavra = arrayPalavra.palavra;
      palavraArray = palavra.split('');

      console.log("Palavra carregada:", palavra);
      generateWordSpaces();
      carregarCategoria();
    } catch (error) {
      console.error("Erro ao carregar palavra:", error);
      document.getElementById('palavraEscolhida').textContent = 'Erro ao carregar palavra.';
    }
  }

  function carregarCategoria() {
    categoria = arrayPalavra.categoria;
    document.getElementById('categoria').textContent = categoria.toUpperCase();
  }

  function generateWordSpaces() {
    const palavraEscolhida = document.getElementById('palavraEscolhida');
    palavraEscolhida.innerHTML = '';
    palavraArray.forEach(() => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = '_';
      palavraEscolhida.appendChild(span);
    });
  }

  document.addEventListener("keydown", function (event) {
    let letra = event.key.toUpperCase();

    if (/^[A-ZÇ]$/.test(letra) && !letrasUsadas.has(letra.toLowerCase())) {
      verificarLetra(letra);
    }
  });

  function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function verificarLetra(letra) {
    let letraNormalizada = removerAcentos(letra.toLowerCase());

    if (letrasUsadas.has(letraNormalizada)) return;

    letrasUsadas.add(letraNormalizada);
    let acertou = false;

    document.querySelectorAll('.letter').forEach((span, index) => {
      let letraPalavra = removerAcentos(palavraArray[index].toLowerCase());
      if (letraPalavra === letraNormalizada) {
        span.textContent = palavraArray[index].toUpperCase();
        acertou = true;
      }
    });

    let tecla = [...document.querySelectorAll('.key')].find(
      (key) => key.textContent.toLowerCase() === letra.toLowerCase()
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
        document.getElementById('cabeca').src = 'img/morto.png';
        document.getElementById('corvo').src = 'img/corvo-fome.png';
        fimDeJogo();
      }
    }

    if ([...document.querySelectorAll('.letter')].every(span => span.textContent !== '_')) {
      venceuJogo();
    }
  }

  function fimDeJogo() {
    adicionarPontos(-5);
    setTimeout(() => {
      document.getElementById('gameOverMessage').textContent = 'Você perdeu! Tente novamente.';
      document.getElementById('gameOverModal').showModal();
    }, 200); // Pequeno delay para garantir atualização antes de abrir modal
  }

  function venceuJogo() {
    adicionarPontos(10);
    setTimeout(() => {
      document.getElementById('youWonModal').showModal();
    }, 200);
  }

  function adicionarPontos(pontos) {
    pontuacao += pontos;

    if (pontuacaoElemento) {
      pontuacaoElemento.textContent = pontuacao;
    }

    localStorage.setItem("pontuacao", pontuacao);
  }

  // Modal Info
  let paginaAtual = 1;
  const totalPaginas = 4;

  function mostrarPagina(numero) {
    document.querySelectorAll(".popup-page").forEach(pagina => {
        pagina.style.display = "none";  
    });
    document.getElementById(`pagina${numero}`).style.display = "block";
    paginaAtual = numero;
  }

  window.mudarPagina = function(numero) {
    if (numero >= 1 && numero <= totalPaginas) {
        mostrarPagina(numero);
    }
  };

  // Exibir a primeira página ao abrir o modal
  mostrarPagina(1);

  // Abrir e fechar o modal
  const infoButton = document.querySelector(".info");
  const modal = document.getElementById("infoModal");
  const overlay = document.getElementById("overlay"); // Pegando o overlay
  const closeModal = document.getElementById("closeModal");

  infoButton.addEventListener("click", function () {
    modal.showModal();
    overlay.style.display = "block"; // Exibir o fundo escuro quando o modal abrir
  });

  closeModal.addEventListener("click", function () {
    modal.close();
    overlay.style.display = "none"; // Esconder o fundo escuro quando o modal fechar
  });


  // Fechar o modal de game over e vitória
  document.getElementById('closeGameOverModal').addEventListener('click', function () {
    document.getElementById('gameOverModal').close();
    reiniciarJogo();
  });

  document.getElementById('closeYouWonModal').addEventListener('click', function () {
    document.getElementById('youWonModal').close();
    reiniciarJogo();
  });

  function reiniciarJogo() {
    location.reload();
  }

  carregarPalavra();
});
