const themeButton = document.querySelector(".mainButton:nth-child(3)");
const body = document.querySelector("body");

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
