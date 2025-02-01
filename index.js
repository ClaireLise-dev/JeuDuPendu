// Sélection des éléments du DOM

const themeButton = document.querySelector(".mainButton:nth-child(3)");
const body = document.querySelector("body");
const url = "https://trouve-mot.fr/api/random";
const input = document.querySelector("input");
const keyboardButton = document.querySelectorAll(".keyboardButton");
const keyboardContainer = document.querySelector(".keyboard");
const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const textRemainingAttempts = document.querySelector("#remainingAttempts");
const progressBar = document.querySelector(".progress");
const newGameButton = document.querySelector("#newGame");
const hangmanImage = document.querySelector("#hangmanImage");
const proposedWordButton = document.querySelector("#proposedWord");

//Initialisation des variables globales

let guessWord;
let displayArray = [];
let remainingAttempts = 10;

//Initialisation de l'affichage

progressBar.style.width = "100%";
textRemainingAttempts.textContent = `Coups ${remainingAttempts}`;

if (localStorage.getItem("theme") === "sombre") {
  darkMode();
}

//Récupération du mot aléatoire via l'API

async function getWord() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur lors de la récupération du mot");

    let word = await response.json();
    guessWord = word[0].name;
    displayArray = "-".repeat(guessWord.length).split("");
    input.value = displayArray.join("");
  } catch (error) {
    alert("Oups... il y a eu un problème !");
  }
}

getWord();

//Fonctions de la page

function updateProgressBar() {
  remainingAttempts--;
  let percentage = parseFloat(progressBar.style.width) - 10;
  progressBar.style.width = percentage + "%";
  textRemainingAttempts.textContent = `Coups ${remainingAttempts}`;
  updateHangmanImage();

  if (remainingAttempts === 0) {
    progressBar.style.width = "0%";
    textRemainingAttempts.textContent = `Coups 0`;

    setTimeout(() => {
      alert(`Perdu ! Le mot était : ${guessWord}`);
      location.reload();
    }, 500);
  }
}

function darkMode() {
  body.classList.add("transition");
  setTimeout(() => body.classList.remove("transition"), 300);
  document.body.classList.add("darkTheme");
  themeButton.textContent = "Thème clair";
  localStorage.setItem("theme", "sombre");
}

function updateHangmanImage() {
  let imageIndex = 10 - remainingAttempts;
  if (remainingAttempts === 9) {
    hangmanImage.style.visibility = "visible";
  }
  if (imageIndex >= 1 && imageIndex <= 10) {
    hangmanImage.src = `img/Step ${imageIndex}.png`;
  }
}

function checkFullWord() {
  let proposedWord = prompt("Veuillez proposer un mot entier :")
    .trim()
    .toLowerCase();

  if (!/^[a-zA-Z]+$/.test(proposedWord)) {
    alert(
      "Erreur : Veuillez entrer uniquement des lettres (sans chiffres ni symboles)."
    );
    return;
  }

  if (proposedWord === guessWord) {
    alert("Bravo! Vous avez trouvé le mot!");
  } else {
    alert("Désolée, ce n'est pas le bon mot");
    updateProgressBar();
  }
}

//Gestion des évènements sur les boutons

themeButton.addEventListener("click", () => {
  if (body.classList.contains("darkTheme")) {
    body.classList.add("transition");
    setTimeout(() => body.classList.remove("transition"), 300);
    body.classList.remove("darkTheme");
    themeButton.textContent = "Thème sombre";
    localStorage.setItem("theme", "clair");
  } else {
    darkMode();
  }
});

newGameButton.addEventListener("click", () => {
  location.reload();
});

proposedWordButton.addEventListener("click", () => {
  checkFullWord();
});

// Gestion du clavier virtuel

letters.forEach((letter) => {
  const keyboardButton = document.createElement("button");
  keyboardButton.textContent = letter;
  keyboardButton.classList.add("keyboardButton");
  keyboardButton.addEventListener("click", (event) => {
    const guessedLetter = event.target.textContent;
    if (guessWord.includes(guessedLetter)) {
      guessWord.split("").forEach((letter, index) => {
        if (letter === guessedLetter) {
          displayArray[index] = guessedLetter;
        }
      });
      input.value = displayArray.join("");
    } else {
      updateProgressBar();
    }

    event.target.classList.add("clickedLetter");
    event.target.disabled = true;
  });
  keyboardContainer.appendChild(keyboardButton);
});
