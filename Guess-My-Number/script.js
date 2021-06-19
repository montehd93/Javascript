'use strict';
const mensagens = document.querySelector('.message'); //Texto acima do Score
const highscore = document.querySelector('.highscore'); //melhor pontuação do jogador
const score = document.querySelector('.score'); //score atual
const number = document.querySelector('.number'); //Número correto
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');
const minMax = document.querySelector('.between');
const imagem = document.querySelector('.imagem');
const min = 1; // min valor
const max = 100; //max valor
let tentativas = max / 2; //num de tentativas
let bestScore = 0;
let secretNumber = 0;
//define o texto do minimo e máximo, highscore e também o número de tentativas no corpo do HTML
minMax.textContent = `(Between ${min} and ${max})`;
tentar();
updateHighscore();
randim();
//Criando o eventlistener ao click do botão
btnAgain.addEventListener('click', () => {
  //Evento para executar refresh da página
  console.log('Refresh');
  console.log(secretNumber);
  randim();
  console.log(secretNumber);
  tentativas = max / 2;
  tentar();
  imagem.src = 'pensar.gif';
  number.textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  mensagens.textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
});

btnCheck.addEventListener('click', () => {
  //Evento para executar teste
  const guess = Number(document.querySelector('.guess').value); //número enviado pelo jogador
  if (!guess) {
    mensagens.textContent = '⛔No number!⛔';
  } else if (guess === secretNumber) {
    mensagens.textContent = 'Correct Number!🎉🎉';
    imagem.src = 'acertou.jpg';
    let audio = new Audio('acertou.mp3');
    audio.loop = false;
    audio.play();
    number.textContent = `${guess}`;
    document.querySelector('body').style.backgroundColor = '#60b347';
    if (bestScore < tentativas) {
      bestScore = tentativas;
      updateHighscore();
    }
  } else if (guess !== secretNumber && tentativas > 0) {
    mensagens.textContent =
      guess > secretNumber ? 'Try again, too high 📈' : 'Try again, too low 📉';
    tentar();
    errou();
  }
  if (tentativas < 1) {
    mensagens.textContent = '🧨🧨 You lost the game!';
    tentativas = 0;
    tentar();
  }
  highscore.textContent = `${bestScore}`;
});
function errou() {
  //função para chamar o errou
  imagem.src = 'errou.jpg';
  let audio = new Audio('errou.mp3');
  audio.loop = false;
  audio.play();
  tentativas--;
}

function tentar() {
  //função para fazer update das tentativas
  score.textContent = `${tentativas}`;
}
function updateHighscore() {
  //função para atualizar o score do jogador
  highscore.textContent = `${bestScore}`;
}
function randim() {
  secretNumber = Math.floor(Math.random() * max) + 1;
}
