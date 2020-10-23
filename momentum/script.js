const time = document.querySelector('#time'),
    date = document.querySelector('#date'),
    greeting = document.querySelector('#greeting'),
    name = document.querySelector('#name'),
    question = document.querySelector('#question'),
    task = document.querySelector('#task'),
    nextImg = document.querySelector('#next-image'),
    nextImgIcon = nextImg.querySelector('i'),
    blockquoteError = document.querySelector('.blockquote__error'),
    blockquote = document.querySelector('.blockquote__text'),
    quoteAuthor = document.querySelector('.author'),
    btnUpdateQuote = document.querySelector('.btnUpdateQuote'),
    weatherError = document.querySelector('.weather__error'),
    weatherErrorText = weatherError.querySelector('.weather__error__text'),
    weatherContent = document.querySelector('.weather__content'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    humidity = document.querySelector('.humidity'),
    windSpeed = document.querySelector('.windSpeed'),
    weatherDescription = document.querySelector('.weather-description'),
    city = document.querySelector('.city'),
    cityLabel = document.querySelector('.cityLabel'),
    btnUpdateWeather = document.querySelector('.btnUpdateWeather');

let imgNight = null,
    imgMorning = null,
    imgDay = null,
    imgEvening = null;

let images = null;    

let current = {
    name: null,
    city: null,
    task: null,
    hour: null,
    indexImg: null,
};

let isStart = true;
let isEnable = true;
let isUpdateQuote = true;
let isUpdateWeather = true;
let isUpdateBackground = true;

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
            //img = `url('assets/images/${timeOfDay}/${id}.jpg')`;
            img = `assets/images/${timeOfDay}/${id}.jpg`;
        } while (result.includes(img));
        result.push(img);
    }
    return result;
}

function addZero(n) {
    return parseInt(n, 10) < 10 ? '0' + n : n;
}   

function changeBackground(indexImage) {
    if (isUpdateBackground) {
        isUpdateBackground = false;
        nextImg.classList.add('animate');
        nextImgIcon.classList.remove('fa-play-circle-o');
        nextImgIcon.classList.add('fa-spinner', 'fa-pulse'); 
        let img = new Image();
        img.src = images[indexImage];
        img.addEventListener('load', () => {
            let currBackground = document.querySelector('.background');
            let newBackground = document.createElement('div');
            newBackground.style.backgroundImage = `url('${img.src}')`;
            newBackground.classList.add('background');
            document.body.prepend(newBackground);

            currBackground.classList.add('fadeOut');
            currBackground.addEventListener('animationend', () => {
                currBackground.parentElement.removeChild(currBackground);
                nextImgIcon.classList.remove('fa-spinner', 'fa-pulse', 'fa-fw');
                nextImg.classList.remove('animate');
                nextImgIcon.classList.add('fa-play-circle-o');
                isUpdateBackground = true;
            });
        })
    }
}

function changeView(hour) {
    current.indexImg = null;
    changeBackground(hour);
    if (hour < 6) {
        greeting.textContent = "Good Night, ";
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

function getCity() {
    if (localStorage.getItem('city') === null) {
        city.value = '[Enter Place]';
    } else {
        city.value = localStorage.getItem('city');
        cityLabel.textContent = city.value;
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
    if (e.which == 27 || e.key === 'Escape') {
        input = current[name];
        name.blur();
        return;
    }
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            toLocalStorage(name.value, 'name');
            name.blur();
        }
    } 
}

function setCity(e) {
    if (e.which == 27 || e.key === 'Escape') {
        input = current[city];
        city.blur();
        return;
    }
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            toLocalStorage(city.value, 'city');
            city.blur();
            cityLabel.textContent = city.value;
            getWeather();
        }
    } 
}

function setTask(e) {
    if (e.which == 27 || e.key === 'Escape') {
        input = current[task];
        task.blur();
        return;
    }
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            toLocalStorage(task.value, 'task');
            task.blur();
        }
    } 
}

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

function stopSpiner(spiner) {
    spiner.classList.remove('fa-spin');
}

function displayErrorQuote() {
    blockquoteError.classList.add('active');
    blockquote.textContent = "Sorry, there was an error. Try updating again.";
    quoteAuthor.textContent = "";
}

async function getQuote() {  
    if (isUpdateQuote) {
        isUpdateQuote = false;
        btnUpdateQuote.classList.add('fa-spin');

        const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
        try {
            const res = await fetch(url);
            const data = await res.json(); 
            
            if (data == undefined) {
                displayErrorQuote();
                setTimeout(stopSpiner, 200, btnUpdateQuote);
                isUpdateQuote = true;            
            } else {
                blockquoteError.classList.remove('active');
                blockquote.textContent = data.quote.quoteText;
                quoteAuthor.textContent = data.quote.quoteAuthor;
            }
        } catch (error) {
            displayErrorQuote();
            setTimeout(stopSpiner, 200, btnUpdateQuote);
            isUpdateQuote = true;            
        }
        setTimeout(stopSpiner, 200, btnUpdateQuote);
        isUpdateQuote = true;            

    }
}
document.addEventListener('DOMContentLoaded', getQuote);
btnUpdateQuote.addEventListener('click', getQuote);

function displayErrorWeather(errorText = 'No data') {
    weatherErrorText.textContent = errorText; 
    weatherContent.classList.add('hide');
    weatherError.classList.add('active');
}

async function getWeather() {
    if (isUpdateWeather) {
        isUpdateWeather = false;
        btnUpdateWeather.classList.add('fa-spin');
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=2497afbe0c7a794c5b79f203d4db6786&units=metric`;
        
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data == undefined) {
                displayErrorWeather("Sorry, there was an error. Try updating again.");    
            } else {
                if (data.cod == '200')
                {
                    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
                    weatherDescription.textContent = data.weather[0].description;
                    temperature.textContent = `${data.main.temp}°C`;
                    humidity.textContent = `Humidity ${data.main.humidity}%`;
                    windSpeed.textContent = `${data.wind.speed}m/s`;
                    weatherError.classList.remove('active');
                    weatherContent.classList.remove('hide');
                } else {
                    displayErrorWeather(data.message);
                }
    
            }
                
        } catch (error) {
            displayErrorWeather(error);
            setTimeout(stopSpiner, 300, btnUpdateWeather);
            isUpdateWeather = true;
        }
        setTimeout(stopSpiner, 300, btnUpdateWeather);
        isUpdateWeather = true;
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
btnUpdateWeather.addEventListener('click', getWeather);

showDateTime();
getName();
getCity();
getWeather();
getTask();

name.addEventListener('focus', () => {
    current['name'] = name.value;
    name.value = '';
});
name.addEventListener('keydown', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', () => name.value = current['name']);

city.addEventListener('focus', () => {
    current['city'] = city.value;
    city.value = '';
});
city.addEventListener('keydown', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', () => city.value = current['city']);

task.addEventListener('focus', () => {
    current['task'] = task.value;
    task.value = '';
});
task.addEventListener('keydown', setTask);
task.addEventListener('keypress', setTask);
task.addEventListener('blur', () => task.value = current['task']);