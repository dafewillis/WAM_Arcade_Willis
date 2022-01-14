const reactors = document.querySelectorAll('.reactor'); //creating variable that's a bucket for all my reactors
const scoring = document.querySelector('.score') //creating variable for my score container
const montgomeries = document.querySelectorAll('.montgomery') //creating variable that's a bucket for all my montgomeries

let lastReactor;
let gameOver = false; 
let score = 0;

function popupTime(min, max) { //function to eventually set random times for my montgomeries to pop up; gets a random number between min & max
    return Math.round(Math.random() * (max - min) + min); //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
}

function randReactor(reactors) { //function to choose a random reactor div from which montgomery will pop up
    const idx = Math.floor(Math.random() * reactors.length); //a random index between 0-8 since there are 9 reactor divs
    const reactor = reactors[idx]; //accesses a random instance of one of the 9 reactor divs
    if (reactor === lastReactor) { //sometimes the next random reactor is the same as the last; this compares them, and if that happens...
        return randReactor(reactors); //this starts the function over - recursion - to get a different random result that's not the same as the last one
    }

    lastReactor = reactor; //saves reference to the reactor that resulted the last time the function was called, used above in the if statement
    return reactor; //if it wasn't the same reactor as previously called, then it will return the reactor instead of running the function again
}

function surprise() { //this is the function that gets our montgomeries to pop up from the reactors
    const time = popupTime (500, 1000); //using the popupTime function, we're getting a random time between 500ms and 1000ms
    const reactor = randReactor(reactors); //using the randReactor function to get a random reactor within the surprise function
    reactor.classList.add('up'); //triggers our css since we styled our reactor to be 'top: 100%' and we added the .up class to reactor
    setTimeout(() => {//setting Timeout will cause the montgomeries to go pop back down
        reactor.classList.remove('up'); //we achieve this by removing the .up class from reactor after the randomly chosen time has expired
        if (!gameOver) surprise(); //gameOver was given false as a value; until that changes to a true value, keep running the surprise function
    }, time);  
}

function gameOn() { //this function will start the game with an initial score of 0, and with a time of 15 seconds - 15000ms
    scoring.textContent = 0; //resets the scoring in case player plays more than once
    gameOver = false; //resets gameOver mode to false in case player plays more than once
    score = 0; //resets score to 0 in case player plays more than once
    surprise(); //runs surprise function, popping up montgomeries from random reactors for random allotted times as determined by above helper functions
    setTimeout(() => gameOver = true, 15000); //setTimeout sets a timer that switches gameOver's value from false to true after 15 seconds - 15000ms
}

function whack(e) { //function that takes in the event of me actually clicking on a montgomery
    if(!e.isTrusted) return; //insures that an actual click happens from the mouse input - if the e event is not trusted, return and run whack function again
    score++; //increments score number up by 1 every time a montgomery is clicked
    this.classList.remove('up'); //moves montgomery down if he gets clicked
    scoring.textContent = score; //reflects the actual score in the html
}

montgomeries.forEach(montgomery => montgomery.addEventListener('click', whack)); //adding an event listener that listens for a click on each montgomery, then runs whack function if clicked