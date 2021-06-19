'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0Player = document.querySelector('#score--0');
const score1Player = document.querySelector('#score--1');
const current0Score = document.querySelector('#current--0');
const current1Score = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const imagem = document.querySelector('.dice');
let scores = [0, 0]; // valores para pontuação
let valor = 0; // armazenador dos valores do dado
let activePlayer = 0; //status do player alterna entre 0 e 1
startGame(); // chama função para iniciar jogo

btnNewGame.addEventListener('click', startGame);

btnRoll.addEventListener('click', function () {
  //Gerando valor para o dado
  let numDice = Math.floor(Math.random() * 6) + 1;
  //exibindo o dado na tela
  imagem.classList.remove('hidden');
  imagem.src = `dice-${numDice}.png`;
  //comparando valores
  if (numDice !== 1) {
    //se não for 1, irá continuar jogando e armazenando o valor na parte acumulado
    valor += numDice;
    document.getElementById(`current--${activePlayer}`).textContent = valor;
  } else {
    //Trocando de jogador ao retirar número 1
    changePlayer();
  }
});
btnHold.addEventListener('click', function () {
  //ao clicar em hold, armazenara o valor na posição do array e verificará se o mesmo atingiu a pontuação para vencer caso contrário irá mudar de jogador
  scores[activePlayer] += valor;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    imagem.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
  } else {
    changePlayer();
  }
});
//Starting conditions
function startGame() {
  score0Player.textContent = 0;
  score1Player.textContent = 0;
  current0Score.textContent = 0;
  current1Score.textContent = 0;
  scores = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  valor = 0;
  imagem.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  let p1 = window.prompt('Digite o nome do primeiro Jogador');
  let p2 = window.prompt('Digite o nome do segundo Jogador');
  p1 !== '' ? (document.getElementById('name--0').textContent = p1) : null;
  p2 !== '' ? (document.getElementById('name--1').textContent = p2) : null;
}

function changePlayer() {
  valor = 0;
  document.getElementById(`current--${activePlayer}`).textContent = valor;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
