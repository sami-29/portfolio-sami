let soleilpath;
let lunepath;
if (window.location.href === window.location.origin) {
  soleilpath = "./assets/soleil.webp";
  lunepath = "./assets/mode-nuit.webp";
  console.log("NOOO");
} else {
  soleilpath = "../assets/soleil.webp";
  lunepath = "../assets/mode-nuit.webp";
  console.log("YESSS");
}

window.onload = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    themeToggle.src = lunepath;
    themeToggle.classList.add("invert");
  } else {
    document.documentElement.classList.remove("dark");
    themeToggle.src = soleilpath;
    themeToggle.classList.remove("invert");
  }
};

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  if (localStorage.theme === "light") {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
    themeToggle.src = lunepath;
    themeToggle.classList.add("invert");
  } else {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
    themeToggle.src = soleilpath;
    themeToggle.classList.remove("invert");
  }
});
