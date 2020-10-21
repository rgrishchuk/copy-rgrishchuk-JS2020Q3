async function getJSON() {
  const url = '../../assets/pets.json';
  const res = await fetch(url);
  const petsList = await res.json();
  createStartPage(petsList);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Checks uniqueness item on the page
function notUniqueOnPage(item, indexItem, itemsList, onPage) {
    // Find number of page
    if (itemsList.length === 0) return false;
    let page = Math.trunc(indexItem / onPage);
    let startIndex = page * onPage;
    if (startIndex > itemsList.length - 1 ) return false;
    let endIndex = startIndex + onPage - 1;
    if (endIndex > itemsList.length - 1) endIndex > itemsList.length - 1;
    let itemsOnPage = itemsList.slice(startIndex, endIndex + 1);
    return itemsOnPage.includes(item);
}

// Generate random pets from petsList
function createRandomPets(petsList, count) {
  let result = [];
  let pet = null;
  let id = null;

  for (let index = 0; index < count; index++) {
    do {
        id = getRandomIntInclusive(0, petsList.length - 1);  
        pet = petsList[id];
    } while (notUniqueOnPage(pet, index, result, 6) || notUniqueOnPage(pet, index, result, 8));
    result.push(pet);
  }
  return result;
};

// Calculate how many pets on page
function calcOnPage(screenWidth) {
    if (screenWidth < 768) {
        return 3;
    } else if (screenWidth < 1280) {
        return 6;
    } else return 8;
}

function createPetCardHTML(pet) {
    let li = document.createElement('li');
    li.classList.add('pets__item');
    
    let element = document.createElement('label');
    element.innerHTML = pet.id;
    li.appendChild(element);
    
    let petCard = document.createElement('div');
    petCard.classList.add('pets__item__card');
    
    element = document.createElement('div');
    element.classList.add('pets__item__card__image');
    let img = document.createElement('img');
    img.src = pet.img;
    img.alt = "Image pet " + pet.name;
    element.appendChild(img);
    petCard.appendChild(element);

    element = document.createElement('p');
    element.classList.add('pets__item__card__title');
    element.innerHTML = pet.name;
    petCard.appendChild(element);

    element = document.createElement('div');
    element.classList.add('pets__item__card__button');
    let button = document.createElement('button');
    button.classList.add('button-primary','button-secondary');
    button.type = 'button';
    button.innerHTML = 'Learn more';
    element.appendChild(button);
    petCard.appendChild(element);

    li.appendChild(petCard);
    return li;
}

function createPetsHTML(petsList) {
  let petsHTML = document.createElement('ul');
  petsHTML.classList.add('pets__list');
  petsList.forEach((pet) => {
      petsHTML.appendChild(createPetCardHTML(pet));
  });
  return petsHTML;
}

// Create start page
function createStartPage(petsList) {
    let isEnabled = true;
    let index = 0;
    
    // Add id for pet
    petsList.forEach((pet) => {
      pet.id = index;
      index++;
    });
  
    // Generate pets
    let pets = createRandomPets(petsList, 48);
    
    let current = {
        page: null,
        pages: null,
        onPage: null,
        pets: [],
    };

    function allPetsOnPage(page, onPage) {
        let startIndex = page * onPage;
        let endIndex = startIndex + onPage - 1;
        return pets.slice(startIndex, endIndex + 1);
    }

    current.page = 1;
    current.onPage = calcOnPage(document.documentElement.clientWidth);
    current.pages = 48 / current.onPage;
    current.pets = allPetsOnPage(current.page - 1, current.onPage);

    // Create HTML for our pets
    document.querySelector('.pets__content__list').prepend(createPetsHTML(current.pets));

    // Buttons for pagination
    let buttonStart = document.querySelector('.button-start');
    let buttonLeft = document.querySelector('.button-left');
    let buttonPage = document.querySelector('.button-num-page');
    let buttonPageTitle = buttonPage.querySelector('h4');
    let buttonRight = document.querySelector('.button-right');
    let buttonEnd = document.querySelector('.button-end');
    
    buttonPageTitle.innerHTML = '1';
    buttonStart.setAttribute("disabled", "true");
    buttonLeft.setAttribute("disabled", "true");
    
    // Switch page
    function toPage(numPage) {
      if (isEnabled) {
        isEnabled = false;
        if (numPage == 1) {
          buttonStart.setAttribute("disabled", "true");
          buttonLeft.setAttribute("disabled", "true");
          buttonEnd.removeAttribute("disabled");
          buttonRight.removeAttribute("disabled");
        } else if (numPage == current.pages) {
          buttonEnd.setAttribute("disabled", "true");
          buttonRight.setAttribute("disabled", "true");
          buttonStart.removeAttribute("disabled");
          buttonLeft.removeAttribute("disabled");
        } else {
          buttonStart.removeAttribute("disabled");
          buttonLeft.removeAttribute("disabled");
          buttonEnd.removeAttribute("disabled");
          buttonRight.removeAttribute("disabled");
        }
        current.page = numPage; 
        current.pets = allPetsOnPage(current.page - 1, current.onPage);
        let newPage = createPetsHTML(current.pets);
        newPage.classList.add('fadeIn');
        let currPage = document.querySelector('.pets__list');
        currPage.classList.add('fadeOut');
        currPage.parentElement.removeChild(currPage);
        document.querySelector('.pets__content__list').prepend(newPage);
        newPage.addEventListener('animationend',() => {
          newPage.classList.remove('fadeIn');
          createPopup(petsList);
        });
        buttonPageTitle.innerHTML = numPage;        
        isEnabled = true;
      }
    }

    buttonStart.addEventListener('click', () => toPage(1));
    buttonLeft.addEventListener('click', () => toPage(current.page - 1));
    buttonRight.addEventListener('click', () => toPage(current.page + 1));
    buttonEnd.addEventListener('click', () => toPage(current.pages));

    function eventResize() {
      let newData = {
        page: null,
        pages: null,
        onPage: null,
      };
      newData.onPage = calcOnPage(document.documentElement.clientWidth);
      if (current.onPage !== newData.onPage) {
        newData.pages = 48 / newData.onPage;
        if (current.page > newData.pages) {
          current.page = newData.pages;
        }
        current.pages = newData.pages;
        current.onPage = newData.onPage;
        toPage(current.page);
      }
    }

    window.addEventListener('resize', () => eventResize());
    // Create popup card
    createPopup(petsList);
}

function createPopup(petsList) {
  // Get the modal
  let popup = document.getElementById("popup");

  // Get the button that opens the modal
  let petCards = document.querySelectorAll(".pets__item");

  // Get the <span> element that closes the modal
  //let span = document.getElementsByClassName("popup__close")[0];
  let btnClose = document.querySelector(".popup__close");

  // When the user clicks on the button, open the modal
  petCards.forEach(function(petCard){
      petCard.onclick = function(e) {
          let id = e.target.closest(".pets__item").querySelector("label").innerHTML;
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