const themeButton = document.querySelector(".mainButton:nth-child(3)");
const body = document.querySelector("body");

if (localStorage.getItem("theme") === "sombre") {
  darkMode();
}

themeButton.addEventListener("click", () => {
  if (body.classList.contains("darkTheme")) {
    body.classList.remove("darkTheme");
    themeButton.textContent = "Thème sombre";
    localStorage.setItem("theme", "clair");
  } else {
    darkMode();
  }
});

function darkMode() {
  document.body.classList.toggle("darkTheme");
  themeButton.textContent = "Thème clair";
  localStorage.setItem("theme", "sombre");
}
