const themeButton = document.querySelector(".mainButton:nth-child(3)");
const body = document.querySelector("body");
const url = "https://trouve-mot.fr/api/random";
const input = document.querySelector("input");
const keyboardButton = document.querySelectorAll(".keyboardButton");
const keyboardContainer = document.querySelector(".keyboard");
const letters = "abcdefghijklmnopqrstuvwxyz".split("");
let guessWord ;
let displayArray = [];

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


function darkMode() {
  body.classList.add("transition");
  setTimeout(() => body.classList.remove("transition"), 300);
  document.body.classList.add("darkTheme");
  themeButton.textContent = "Thème clair";
  localStorage.setItem("theme", "sombre");
}



letters.forEach((letter) => {
  const keyboardButton = document.createElement("button");
  keyboardButton.textContent = letter;
  keyboardButton.classList.add("keyboardButton");
  keyboardButton.addEventListener ("click", (event) => {
    const guessedLetter = event.target.textContent;
    if (guessWord.includes(guessedLetter)){
      guessWord.split("").forEach((letter, index) => {
        if (letter === guessedLetter) {
          displayArray[index] = guessedLetter;
        }
      });
      input.value = displayArray.join(""); 
    }
    event.target.classList.add("clickedLetter");
    console.log(event.target.classList) 
  })
  keyboardContainer.appendChild(keyboardButton);
});