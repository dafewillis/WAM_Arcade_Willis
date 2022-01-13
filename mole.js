const reactors = document.querySelectorAll('.reactor'); //creating variable that's a bucket for all my reactors
const scoring = document.querySelectorAll('.score') //creating variable for my score container
const montgomeries = document.querySelectorAll('.montgomery') //creating variable that's a bucket for all my montgomeries

let lastReactor;

function popupTime (min, max) { //function to get random times for my montgomeries to pop up from the reactors
    return Math.random() * (max - min) + min;
}

function randReactor (reactors) { //function to choose random reactors from which montgomeries will pop up
    const idx = Math.floor(Math.random() * reactors.length);
    const reactor = reactors[idx];

    console.log(reactor);

    lastReactor = reactor;
}