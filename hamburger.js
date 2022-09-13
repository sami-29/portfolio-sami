const toggle_menu = document.querySelector("[data-collapse-toggle]");
const menu = document.querySelector("#navbar-default");

toggle_menu.onclick = () => {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    console.log(menu);
  } else {
    menu.classList.add("hidden");
    console.log(menu);
  }
};
