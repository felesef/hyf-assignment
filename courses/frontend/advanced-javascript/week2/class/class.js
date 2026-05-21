//Exercise -2 

function createGreeating(name, callback) {
    return callback(name);
}

// I want to crate a greeting for the name either formal or informal

function createFormalGreeting(name) {
    return `Hello, ${name}`;
}

function createInformalGreeting(name) {
    return `Hi, ${name}`;
}

function createInformalGreetingLadies(name) {
    return `Hello, Mrs. ${name}`;
}

function createInformalGreetingGentlemen(name) {
    return `Hello, Mr. ${name}`;
}

console.log(createGreeating("John", createFormalGreeting));
console.log(createGreeating("John", createInformalGreeting));
console.log(createGreeating("John", createInformalGreetingLadies));
console.log(createGreeating("John", createInformalGreetingGentlemen));

// Exercise 2 
/*
Create a button with the text "Log in 3 seconds" and an area where you can show a message.

When the button is clicked, wait 3 seconds and then show the text: "This text was delayed by 3 seconds".
*/

const button = document.createElement("button");
button.textContent = "3 seconds delayed message";
document.body.appendChild(button);

const message = document.createElement("p");
message.textContent = "Waiting for pressing the button...";
document.body.appendChild(message);


button.addEventListener("click", () => {
    setTimeout(() => {
        message.textContent = "This text was delayed by 3 seconds";
        //console.log("This text was delayed by 3 seconds");
    }, 3000);
});


// Exercise 3
/*
3. Page onload
Create a callback function (as a variable) that shows "DOM fully loaded and parsed".

This callback should run when the DOM is fully loaded. Search for how to run code when the DOM is ready (e.g. "DOM ready" or "page load event").
*/

const domLoaded = () => {
    console.log("DOM fully loaded and parsed");
}

window.addEventListener("DOMContentLoaded", domLoaded);

// Exercise 4
// Create a handler that shows the x,y coordinates of the mouse (e.g. update a paragraph or a fixed div as the user moves the mouse).

const mauseCoordinates = document.createElement("p");
mauseCoordinates.textContent = "Mouse coordinates: 0, 0";
document.body.appendChild(mauseCoordinates);

document.addEventListener("mousemove", (event) => {
    mauseCoordinates.textContent = `Mouse coordinates: ${event.clientX}, ${event.clientY}`;
});

//exercise 5
/* Imagine an online tool where businesses see where their users' mouse is most of the time, to check if their design works well.

Write JS that, after 30 seconds, computes the average x and y position of the user's mouse and displays it */


const averageMouseCoordinates = document.createElement("p");
averageMouseCoordinates.textContent = "Average mouse coordinates: 0, 0";
document.body.appendChild(averageMouseCoordinates);

const mouseCoordinates = {
    x: [],
    y: []
}

document.addEventListener("mousemove", (event) => {
    mouseCoordinates.x.push(event.clientX);
    mouseCoordinates.y.push(event.clientY);
});

setInterval(() => { //lets make it refresh every 30 seconds interval
    const averageX = mouseCoordinates.x.reduce((a, b) => a + b, 0) / mouseCoordinates.x.length;
    const averageY = mouseCoordinates.y.reduce((a, b) => a + b, 0) / mouseCoordinates.y.length;
    averageMouseCoordinates.textContent = `Average mouse coordinates: ${averageX}, ${averageY}`;
}, 30000);

// create a function to take the last 2 average mause coordinates and display message if there is not a significant movement

const message2 = document.createElement("p");
message2.textContent = " ";
document.body.appendChild(message2);

let lastAverageX = 0;
let lastAverageY = 0;

const significantMovement = (x1, y1, x2, y2) => {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance > 50 ? message2.textContent = "There is a significant movement for the last 30 seconds" : message2.textContent = "There is no significant movement for the last 30 seconds";
}

setInterval(() => {
    const currentAverageX = mouseCoordinates.x.reduce((a, b) => a + b, 0) / mouseCoordinates.x.length;
    const currentAverageY = mouseCoordinates.y.reduce((a, b) => a + b, 0) / mouseCoordinates.y.length;
    if (significantMovement(lastAverageX, lastAverageY, currentAverageX, currentAverageY)) {
        lastAverageX = currentAverageX;
        lastAverageY = currentAverageY;
        averageMouseCoordinates.textContent = `Average mouse coordinates: ${currentAverageX}, ${currentAverageY}`;
    }
    lastAverageX = currentAverageX;
    lastAverageY = currentAverageY;
    console.log(`Last average X updated: ${lastAverageX}, Last average Y updated: ${lastAverageY}`);
}, 30000);