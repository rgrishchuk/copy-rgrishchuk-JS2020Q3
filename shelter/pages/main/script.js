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


// Get the modal
let popup = document.getElementById("popup");

// Get the button that opens the modal
let petCards = document.querySelectorAll(".friends__slider__card");

// Get the <span> element that closes the modal
//let span = document.getElementsByClassName("popup__close")[0];
let btnClose = document.querySelector(".popup__close");

// When the user clicks on the button, open the modal
petCards.forEach(function(petCard){
    petCard.onclick = function() {
        popup.style.display = "flex";
    }
});

// When the user clicks on <span> (x), close the modal
btnClose.onclick = function() {
  popup.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
} 