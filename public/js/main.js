let buttons = document.querySelectorAll('.button');
let firstCard, secondCard;
let lockBoard = false;
let attempts = 0;
let btnReset = document.querySelector('.btnReset');
let score = 0;
let timer;
let timerDisplay = document.querySelector('.span2');
//La fonction "flipCard" est appelée lorsqu'un utilisateur clique sur un bouton de carte. Elle affiche l'image cachée de la carte en utilisant la propriété "style.display" et ajoute la classe "flip" pour retourner la carte. Si la variable "lockBoard" est définie sur "true", la fonction ne fera rien. Si l'utilisateur clique sur la première carte déjà sélectionnée, la fonction ne fera rien non plus. Sinon, elle mettra à jour la variable "firstCard" pour stocker la référence à cette carte et vérifiera si les deux cartes sont une correspondance en appelant la fonction "checkForMatch".


function flipCard() {
    if (this.clicked) return;
    this.clicked = true;
    setTimeout(() => {
        this.clicked = false;
    }, 1000);
    this.querySelector('img').style.display = 'block';
    if (lockBoard) return;
    attempts++;
    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
    // setTimeout();
}


//La fonction "checkForMatch" vérifie si les images des deux cartes sélectionnées ont la même source. Si c'est le cas, elle appelle la fonction "disableCards" pour désactiver les cartes correspondantes (en les supprimant de l'écouteur d'événement et de l'affichage). Sinon, si c'est le deuxième coup, elle appelle la fonction "unflipAll" pour retourner toutes les cartes, sinon elle appelle la fonction "unflipCards" pour retourner les cartes sélectionnées.

function checkForMatch() {

    let isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;
    isMatch ? disableCards() : unflipCards();

    if (isMatch) {
        disableCards();
    } else if (attempts === 1) {
        unflipAll();
        resetBoard();
    } else {
        unflipCards();
    }

}

//La fonction "disableCards" supprime les images des cartes correspondantes en utilisant "remove()" et appelle la fonction "resetBoard" pour réinitialiser les variables de la partie.

function disableCards() {
    setTimeout(function () {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.remove();
        secondCard.remove();
        updateScore();
        //updateRemainingPairs();
        resetBoard();
    }, 1000);
}

//La fonction "unflipCards" verrouille le plateau (en définissant "lockBoard" sur "true") et utilise "setTimeout" pour retourner les cartes après 1 seconde, puis appelle la fonction "resetBoard" pour réinitialiser les variables de la partie.

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.querySelector('img').style.display = 'none';
        secondCard.querySelector('img').style.display = 'none';
        resetBoard();
    }, 1000);
}

//La fonction "resetBoard" réinitialise les variables "lockBoard", "firstCard" et "secondCard" à leurs valeurs par défaut (false, null et null respectivement)

function resetBoard() {
    [lockBoard, firstCard, secondCard] = [false, null, null, 0];
}

//La fonction "shuffle" est une fonction auto-appelée qui mélange l'ordre des cartes en utilisant la propriété "style.order" et une génération aléatoire.

function shuffle() {
    buttons.forEach(button => {
        let randomPos = Math.floor(Math.random() * buttons.length);
        button.style.order = randomPos;
    });
};



btnReset.addEventListener("click", resetGame)

function resetGame() {
    buttons.forEach(button => {
        button.addEventListener('click', flipCard);
        button.querySelector('img').style.display = 'none';
    });
    resetBoard();
    shuffle();

}


buttons.forEach(button => button.addEventListener('click', flipCard));

function updateScore() {
    score++;
    scoreDisplay.innerHTML = score;
}

// function startTimer() {
//     let seconds = 0;
//     timer = setInterval(() => {
//         seconds++;
//         timerDisplay.innerHTML = `Temps écoulé: ${seconds} secondes`;
//     }, 1000);
// }

// function stopTimer() {
//     clearInterval(timer);
//     timerDisplay.innerHTML = `Temps écoulé: ${seconds} secondes`;
// }

// resetGame();
// startTimer();

// Appeler la fonction "stopTimer" lorsque la dernière paire est trouvée
// let remainingPairs = buttons.length / 2;

// function updateRemainingPairs() {
//     remainingPairs--;
//     if (remainingPairs === 0) {
//         stopTimer();
//     }
// }
