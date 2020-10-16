function showBurgerMenu() {
    document.querySelector(".blackout").classList.toggle("active");
    document.querySelector(".menu__burger").classList.toggle("active");
    document.querySelector(".burger-menu").classList.toggle("active");
};

document.querySelector(".menu__burger").addEventListener("click", () => {
    showBurgerMenu();
});

document.querySelector(".blackout").addEventListener("click", () => {
    showBurgerMenu();     
});