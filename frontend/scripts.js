
      document.addEventListener("DOMContentLoaded", function () { 
        let palavra = ['T', 'E', 'S', 'T', 'E']; 
    
        const palavraEscolhida = document.getElementById('palavraEscolhida'); // Pegando o elemento correto
        const keyboard = document.getElementById('keyboard');

        function generateWordSpaces() {
            palavraEscolhida.innerHTML = ''; // Limpa antes de adicionar
            palavra.forEach(() => {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = '_'; // Exibe os traços ocultando a palavra
                palavraEscolhida.appendChild(span);
            });
        }
    
        generateWordSpaces(); 
    });
    