const time = document.querySelector('#time'),
    date = document.querySelector('#date'),
    greeting = document.querySelector('#greeting'),
    name = document.querySelector('#name'),
    question = document.querySelector('#question'),
    task = document.querySelector('#task'),
    nextImg = document.querySelector('#next-image');


let imgNight = null,
    imgMorning = null,
    imgDay = null,
    imgEvening = null;

let images = null;    

let current = {
    name: null,
    task: null,
    hour: null,
    indexImg: null,
};

let isStart = true;
let isEnable = true;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
function generateImages(timeOfDay) {
    let result = [];
    let id =null;
    let img = null;
    for (let i = 0; i < 6; i++) {
        do {
            id = '' + getRandomIntInclusive(1, 20);
            if (id.length == 1) id = '0' + id;
            img = `url('assets/images/${timeOfDay}/${id}.jpg')`;
            // img = `assets/images/${timeOfDay}/${id}.jpg`;
        } while (result.includes(img));
        result.push(img);
    }
    return result;
}

function addZero(n) {
    return parseInt(n, 10) < 10 ? '0' + n : n;
}   

function changeBackground(indexImage) {
    let currBackground = document.querySelector('.background');
    let newBackground = document.createElement('div');
    newBackground.classList.add('background', 'fadeIn');
    newBackground.style.backgroundImage = images[indexImage];
    document.body.prepend(newBackground);
    newBackground.addEventListener('animationend', () => {
        newBackground.classList.remove('fadeIn'); 
        currBackground.classList.add('fadeOut');
        currBackground.addEventListener('animationend', () => {
            currBackground.parentElement.removeChild(currBackground);
        });
    });
}

function changeView(hour) {
    current.indexImg = null;
    changeBackground(hour);
    if (hour < 6) {
        greeting.textContent = "Good Night, ";
        //document.body.style.color = "white";
    } else if (hour < 12) {
        greeting.textContent = "Good Morning, ";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon, ";
    } else if (hour < 24) {
        greeting.textContent = "Good Evening, ";
    }
}

function showDateTime() {
    let today = new Date(),
    //let today = new Date(2020, 09, 19, 24, 00, 00),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    let dateString = today.toLocaleString('en', {
        month: 'long',
        weekday: 'long',
        day: 'numeric'
    });
    date.innerHTML = dateString.charAt(0).toUpperCase() + dateString.substr(1);
    time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    //if (sec === 0) alert('0');
    if (isStart) {
        isStart = false;
        changeView(hour);
    } else if (min === 0 && sec === 0) changeView(hour);
    setTimeout(showDateTime, 1000);
}

function getName() {
    if (localStorage.getItem('name') === null) {
        name.value = '[Enter Name]';
    } else {
        name.value = localStorage.getItem('name');
    }
}

function getTask() {
    if (localStorage.getItem('task') === null) {
        task.value = '[Enter Focus]';
    } else {
        task.value = localStorage.getItem('task');
    }
}

function toLocalStorage(input, name) {
    if (input.trim() === '') {
        input = current[name];
    } else {
        localStorage.setItem(name, input);
        current[name] = input;
    }
}


function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            toLocalStorage(name.value, 'name');
            name.blur();
        }
    } 
}

function setTask(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            toLocalStorage(task.value, 'task');
            task.blur();
        }
    } 
}

name.addEventListener('focus', () => {
    current['name'] = name.value;
    name.value = '';
});
name.addEventListener('keypress', setName);
name.addEventListener('blur', () => name.value = current['name']);

task.addEventListener('focus', () => {
    current['task'] = task.value;
    task.value = '';
});
task.addEventListener('keypress', setTask);
task.addEventListener('blur', () => task.value = current['task']);

imgNight = generateImages("night");
imgMorning = generateImages("morning");
imgDay = generateImages("day");
imgEvening = generateImages("evening");

images = imgNight.concat(imgMorning, imgDay, imgEvening);
nextImg.addEventListener('click', () => {
    let index = null;
    if (current.indexImg === null) {
        index = (new Date()).getHours() + 1;
        current.indexImg = index;
    } else current.indexImg++;
    if (current.indexImg > 23) current.indexImg = 0;
    changeBackground(current.indexImg);  
});

showDateTime();
getName();
getTask();