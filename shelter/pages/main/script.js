async function getJSON() {
  const url = '../../assets/pets.json';
  const res = await fetch(url);
  const petsList = await res.json();
  createSlider(petsList);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random pets from petsList
function createRandomPets(petsList, count, currPets) {
  let result = [];
  let pet = null;
  let id = null;

  for (let index = 0; index < count; index++) {
    do {
      id = getRandomIntInclusive(0, petsList.length - 1);
      pet = petsList[id];
    } while (result.includes(pet) || currPets.includes(pet));
    result.push(pet);
  }
  return result;
};

function createPetCardHTML(pet, classNames) {
  let resultHTML = null;
  resultHTML = document.createElement("div");
  resultHTML.classList.add("friends__slider__card");
  if (classNames) resultHTML.classList.add(...classNames.split(" "));
  
  let element = document.createElement("label");
  element.innerHTML = pet.id;
  resultHTML.appendChild(element);

  element = document.createElement("div");
  element.classList.add("friends__slider__card__image");
  let img = document.createElement("img");
  img.src = pet.img;
  img.alt = "Image pet " + pet.name;
  element.appendChild(img);
  resultHTML.appendChild(element);

  element = document.createElement("p");
  element.classList.add("friends__slider__card__title");
  element.innerHTML = pet.name;
  resultHTML.appendChild(element);

  element = document.createElement("div");
  element.classList.add("friends__slider__card__button");
  let button = document.createElement("button");
  button.classList.add("button-primary","button-secondary");
  button.type = "button";
  button.innerHTML = "Learn more";
  element.appendChild(button);
  resultHTML.appendChild(element);

  return resultHTML;
};

// Create slider
function createSlider(petsList) {
  let isEnabled = true;
  let index = 0;
  
  // Add id for pet
  petsList.forEach((pet) => {
    pet.id = index;
    index++;
  });

  // Generate pets
  let pets = createRandomPets(petsList, 3, []);

  // Generate HTML
  let sliderHTML = document.querySelector(".friends__slider__wrapper");
  let petCardHTML = null;
  let currentSlide = document.createElement("div");
  currentSlide.classList.add("slide-current");
  
  pets.forEach((pet) => {
    petCardHTML = createPetCardHTML(pet, null);
    currentSlide.appendChild(petCardHTML);
  });
  sliderHTML.appendChild(currentSlide);

  // Create popup window for card
  createPopup(petsList);
  

  let btnLeft = document.querySelector(".friends__slider__button-left");
  let btnRight = document.querySelector(".friends__slider__button-right");
  
  function findCurrPets () {
    let currPetsId = document.querySelectorAll(".friends__slider__card > label");
    let result = [];
    currPetsId.forEach((label) => {
      result.push(petsList[label.innerHTML]);
    });
    return result;
  }

  // Create HTML for next slide
  function createNextSlideHTML() {
    let currPets = findCurrPets();
    let nextPets = createRandomPets(petsList, 3, currPets);
    let nextSlide = document.createElement("div");
    nextSlide.classList.add("slide-next");
    nextPets.forEach((pet) => {
      nextSlide.appendChild(createPetCardHTML(pet, null));
    });
    sliderHTML.appendChild(nextSlide);
    
    document.querySelectorAll(".slide-current .friends__slider__card").forEach((card) => {
      if (getComputedStyle(card).display == "none") card.parentElement.removeChild(card);
    });
  }

  function switchSlide(direction) {
    if (isEnabled) {
      isEnabled = false;
      // Create next slide
      createNextSlideHTML();
      // Hide current slide
      let current = document.querySelector(".slide-current");
      current.classList.add("to-" + direction);
      current.addEventListener("animationend", () => {
        current.parentElement.removeChild(current);
      });
      // Show next slide
      let next = document.querySelector(".slide-next");
      next.classList.add("to-" + direction);
      next.addEventListener("animationend", () => {
        next.className = "slide-current";
        isEnabled = true;
      });
      createPopup(petsList);
    };
  }

  // Click on left
  btnLeft.onclick = function() {
    switchSlide("left");
  }

  // Click on right
  btnRight.onclick = function() {
    switchSlide("right")
  }
}

function createPopup(petsList) {
  // Get the modal
  let popup = document.getElementById("popup");

  // Get the button that opens the modal
  let petCards = document.querySelectorAll(".friends__slider__card");

  // Get the <span> element that closes the modal
  //let span = document.getElementsByClassName("popup__close")[0];
  let btnClose = document.querySelector(".popup__close");

  // When the user clicks on the button, open the modal
  petCards.forEach(function(petCard){
      petCard.onclick = function(e) {
          let id = e.target.closest(".friends__slider__card").querySelector("label").innerHTML;
          let pet = petsList[id];
          popup.querySelector(".pet-image").src = pet.img;
          popup.querySelector(".pet-name").innerHTML = pet.name;
          popup.querySelector(".pet-type").innerHTML = pet.type + ' - ' + pet.breed;
          popup.querySelector(".pet-description").innerHTML = pet.description;
          popup.querySelector(".pet-age").innerHTML = "<b>Age:</b> " + pet.age;
          popup.querySelector(".pet-inoculations").innerHTML = "<b>Inoculations:</b> " + pet.inoculations.join(", ");
          popup.querySelector(".pet-diseases").innerHTML = "<b>Diseases:</b> " + pet.diseases;
          popup.querySelector(".pet-parasites").innerHTML = "<b>Parasites:</b> " + pet.parasites;
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
}

// Read pets from json
getJSON();

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