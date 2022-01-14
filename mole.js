const reactors = document.querySelectorAll('.reactor'); //creating variable that's a bucket for all my reactors
const scoring = document.querySelector('.score') //creating variable for my score container
const montgomeries = document.querySelectorAll('.montgomery') //creating variable that's a bucket for all my montgomeries

let lastReactor;
let gameOver = false;
let score = 0;

function popupTime(min, max) { //function to get random times for my montgomeries to pop up from the reactors
    return Math.round(Math.random() * (max - min) + min);
}

function randReactor(reactors) { //function to choose random reactors from which montgomeries will pop up
    const idx = Math.floor(Math.random() * reactors.length);
    const reactor = reactors[idx];
    if (reactor === lastReactor) {
        return randReactor(reactors);
    }

    lastReactor = reactor;
    return reactor;
}

function surprise() {
    const time = popupTime (500, 1000);
    const reactor = randReactor(reactors);
    reactor.classList.add('up');  
    setTimeout(() => {
        reactor.classList.remove('up');
        if (!gameOver) surprise();
    }, time);  
}

function gameOn() {
    scoring.textContent = 0;
    gameOver = false;
    score = 0;
    surprise();
    setTimeout(() => gameOver = true, 15000);
}

function whack(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoring.textContent = score;
}

montgomeries.forEach(montgomery => montgomery.addEventListener('click', whack));