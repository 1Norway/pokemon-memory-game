"use strict";

function flipSound() {
  const audio = new Audio();
  audio.src = './assets/sounds/Card-flip-sound-effect.mp3';
  audio.volume = 0.12;
  audio.play();
}

function matchSound() {
  const audio = new Audio();
  audio.src = './assets/sounds/Nice.mp3';
  audio.volume = 0.3;
  audio.play();
}

function TahdahSound() {
  const audio = new Audio();
  audio.src = './assets/sounds/TahDah.mp3';
  audio.volume = 1;
  audio.play();
}

const getData = () => [{
    imgSrc: "./assets/images/Arceus.png",
    name: "Arceus"
  },
  {
    imgSrc: "./assets/images/Articuno.png",
    name: "Articuno"
  },
  {
    imgSrc: "./assets/images/Luxray.png",
    name: "Luxray"
  },
  {
    imgSrc: "./assets/images/Magmortar.png",
    name: "Magmortar"
  },
  {
    imgSrc: "./assets/images/Ninetales.png",
    name: "Ninetales"
  },
  {
    imgSrc: "./assets/images/Pidgeot.png",
    name: "Pidgeot"
  },
  {
    imgSrc: "./assets/images/Raichu.png",
    name: "Raichu"
  },
  {
    imgSrc: "./assets/images/Zapdos.png",
    name: "Zapdos"
  }, {
    imgSrc: "./assets/images/Arceus.png",
    name: "Arceus"
  },
  {
    imgSrc: "./assets/images/Articuno.png",
    name: "Articuno"
  },
  {
    imgSrc: "./assets/images/Luxray.png",
    name: "Luxray"
  },
  {
    imgSrc: "./assets/images/Magmortar.png",
    name: "Magmortar"
  },
  {
    imgSrc: "./assets/images/Ninetales.png",
    name: "Ninetales"
  },
  {
    imgSrc: "./assets/images/Pidgeot.png",
    name: "Pidgeot"
  },
  {
    imgSrc: "./assets/images/Raichu.png",
    name: "Raichu"
  },
  {
    imgSrc: "./assets/images/Zapdos.png",
    name: "Zapdos"
  },
]

// Select Elements

const img = document.querySelector('.card__front');
const section = document.querySelector('section');
const step = document.querySelector('.steps');
const body = document.body;
const modalContainer = document.querySelector('#modal-container');
const modalBackground = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const newGameBtn = document.querySelector('.n');

newGameBtn.addEventListener('click', newGame);

modalBackground.addEventListener('click', () => {
  body.classList.remove('modal-active');
  modalContainer.classList.add('out');
})

const btn = document.querySelector('button');
btn.addEventListener('click', openResults)

function openResults() {
  modalContainer.classList.remove('out');
  body.classList.add('modal-active');
  modalContainer.classList.add('one');
  showResults();
}

// Randomize

const randomize = () => {
  const data = getData();
  return data.sort(() => Math.random() - 0.5);
}


const createCards = () => {
  const data = randomize();
  data.forEach(item => {
    const card = document.createElement('div');
    const cardFront = document.createElement('img');
    const cardBack = document.createElement('div');
    cardFront.src = item.imgSrc;
    card.setAttribute('name', item.name);
    card.classList.add('card');
    cardFront.classList.add('card__front');
    cardBack.classList.add('card__back');
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    section.appendChild(card);
  })
  const cards = document.querySelectorAll('.card');
  cards.forEach(item => item.addEventListener('click', (e) => {
    if (action) {

    } else {
      flipSound();
      item.classList.add('toggleCard');
      checkCards(e);
    }
  }));
}

let action = false;
let stepCount = 0;
let gameIsOver = 8;


function checkCards(e) {
  const card = e.target;
  card.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const cards = document.querySelectorAll('.card');

  if (flippedCards.length === 2) {

    stepCount++
    step.textContent = `Step: ${stepCount}`;
    if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
      matchSound();
      flippedCards.forEach(item => item.classList.remove('flipped'));
      gameIsOver--;
      if (!gameIsOver) {
        TahdahSound();
        saveResults();
        openResults();
      };
    } else {
      action = true;
      flippedCards.forEach(item => item.classList.remove('flipped'));
      setTimeout(() => {
        flippedCards.forEach(item => item.classList.remove('toggleCard'));
      }, 1000)
      setTimeout(() => {
        action = false;
      }, 800)
    }
  };
}

createCards();

function saveResults() {
  let results;
  if (!localStorage.getItem('LastResults')) {
    results = `0/0/0/0/0/0/0/0/0/0`;
    results = results.split('/');
  } else {
    results = localStorage.getItem('LastResults').split('/');
  }
  results.pop();
  results.unshift(stepCount);
  localStorage.setItem('LastResults', results.join('/'));
}

function showResults() {
  if (localStorage.getItem('LastResults')) {
    modal.innerHTML = '<h2>Last Results:</h2>';
    const resArray = localStorage.getItem('LastResults').split('/');
    for (let i = 0; i < 10; i++) {
      const resultsHTML = `<p>${i+1}. Result: ${resArray[i]}</p>`
      modal.insertAdjacentHTML('beforeend', resultsHTML);
    }
  }
}

function newGame() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(item => item.classList.remove('toggleCard'));
  cards.forEach(item => item.classList.remove('flipped'));
  stepCount = 0;
  gameIsOver = 8;
  action = false;
  step.textContent = `Step: ${stepCount}`;
  cards.forEach(item => item.classList.add('pen'));
  setTimeout(() => {
    section.innerHTML = '';
    createCards();
    cards.forEach(item => item.classList.remove('pen'));
  }, 2000);
}