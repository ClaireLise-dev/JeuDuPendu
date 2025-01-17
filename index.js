const themeButton = document.querySelector(".mainButton:nth-child(3)");
const body = document.querySelector("body");
const url = "https://trouve-mot.fr/api/random";
const input = document.querySelector("input");

if (localStorage.getItem("theme") === "sombre") {
  darkMode();
}

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

const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const keyboardContainer = document.querySelector(".keyboard");
letters.forEach((letter) => {
  const button = document.createElement("button");
  button.textContent = letter;
  button.classList.add("keyboardButton");
  keyboardContainer.appendChild(button);
});

async function getWord() {
  const request = await fetch(url, { method: "GET" });
  if (!request.ok) {
    alert("Il y a eu un problème");
  } else {
    let word = await request.json();
    const wordLength = word[0].name.length;
    console.log(wordLength);
    const dashes = "-".repeat(wordLength).trim();
    input.value = dashes;
  }
}

getWord();
