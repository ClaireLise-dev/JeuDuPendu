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

let guessWord;
let displayArray = [];
let remainingAttempts = 10;
progressBar.style.width = "100%";
textRemainingAttempts.textContent = `Coups ${remainingAttempts}`;

if (localStorage.getItem("theme") === "sombre") {
  darkMode();
}

async function getWord() {
  const request = await fetch(url, { method: "GET" });
  if (!request.ok) {
    alert("Oups...il y a eu un problème");
  } else {
    let word = await request.json();
    guessWord = word[0].name;
    const wordLength = word[0].name.length;
    console.log(wordLength);
    displayArray = "-".repeat(wordLength).trim().split("");
    input.value = displayArray.join("");
  }
}

getWord();

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
    console.log(event.target.classList);
  });
  keyboardContainer.appendChild(keyboardButton);
});
