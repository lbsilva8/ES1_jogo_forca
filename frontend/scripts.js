document.addEventListener("DOMContentLoaded", function () {
    let palavra = ['T', 'E', 'S', 'T', 'E']; 
    let erros = 0;
    const maxErros = 6;
    const partesBoneco = ['cabeca', 'corpo', 'bracoE', 'bracoD', 'pernaE', 'pernaD'];
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
            }
        }
    }

    keyboard.addEventListener('click', function (event) {
        if (event.target.classList.contains('key')) {
            verificarLetra(event.target.textContent); 
        }
    });

    generateWordSpaces(); 
});

    