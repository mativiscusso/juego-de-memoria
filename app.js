const cartas = document.querySelectorAll(".carta");

let flippedCarta = false;
let lockBoard = false;
let primeraCarta, segundaCarta;

function flipCard() {
  if (lockBoard) return;
  if (this === primeraCarta) return;

  this.classList.add("flip");

  if (!flippedCarta) {
    flippedCarta = true;
    primeraCarta = this;

    return;
  }

  segundaCarta = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch =
    primeraCarta.dataset.framework === segundaCarta.dataset.framework;

  isMatch ? disableCartas() : unflipCartas();
}

function disableCartas() {
  primeraCarta.removeEventListener("click", flipCard);
  segundaCarta.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCartas() {
  lockBoard = true;

  setTimeout(() => {
    primeraCarta.classList.remove("flip");
    segundaCarta.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flippedCarta, lockBoard] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}

(function shuffle() {
  cartas.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cartas.forEach((carta) => carta.addEventListener("click", flipCard));
