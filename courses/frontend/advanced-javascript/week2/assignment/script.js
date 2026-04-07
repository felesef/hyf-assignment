// 2. Functions

// Show text in an element.
function showIn(el, text) {
    if (typeof el === "string") {
        el = document.querySelector(el);
    }
    el.textContent = text;
}

function appendLine(el, text) {
    if (typeof el === "string") {
        el = document.querySelector(el);
    }
    el.textContent = el.textContent ? `${el.textContent}\n${text}` : text;
}

// 2.1 — 2.5 seconds after load
setTimeout(() => {
    showIn("#out-2-1", "Called after 2.5 seconds");
}, 2500);

// 2.2 — generic delayed log on the page
function logAfterDelay(delay, stringToLog) {
    const delayMs = delay * 1000;
    setTimeout(() => {
        appendLine("#out-2-2", stringToLog);
    }, delayMs);
}

// Demo: different delays and strings
logAfterDelay(1, "After 1 second: hello!");
logAfterDelay(2, "After 2 seconds: hello again!");

// 2.3 — button: 5 seconds after click
document.querySelector("#btn-5-sec").addEventListener("click", () => {
    logAfterDelay(5, "Called after 5 seconds");
});

// 2.4 — planet loggers and runner
const logEarth = function () {
    appendLine("#out-planets", "Earth");
};

const logSaturn = function () {
    appendLine("#out-planets", "Saturn");
};

function logPlanet(planetLogFunction) {
    planetLogFunction();
}

document.querySelector("#btn-planet-earth").addEventListener("click", () => {
    logPlanet(logEarth);
});
document.querySelector("#btn-planet-saturn").addEventListener("click", () => {
    logPlanet(logSaturn);
});
logPlanet(logEarth);
logPlanet(logSaturn);

// 2.5 — geolocation
const mapFrame = document.querySelector("#map-frame");

document.querySelector("#btn-location").addEventListener("click", () => {
    if (!navigator.geolocation) {
        showIn("#out-location", "Geolocation is not supported in this browser.");
        mapFrame.hidden = true;
        return;
    }
    showIn("#out-location", "Getting location…");
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            showIn(
                "#out-location",
                `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`
            );
            mapFrame.hidden = false;
            mapFrame.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
        },
        () => {
            showIn("#out-location", "Could not read location (permission denied or error).");
            mapFrame.hidden = true;
        }
    );
});

// 2.7 — runAfterDelay
function runAfterDelay(delay, callback) {
    setTimeout(callback, delay * 1000);
}

document.querySelector("#btn-run-after-delay").addEventListener("click", () => {
    const raw = document.querySelector("#input-delay").value;
    const seconds = Number.parseFloat(raw);
    if (Number.isNaN(seconds) || seconds < 0) {
        showIn("#out-run-after-delay", "Please enter a valid delay in seconds.");
        return;
    }
    showIn("#out-run-after-delay", `Waiting ${seconds} second(s)…`);
    runAfterDelay(seconds, () => {
        showIn("#out-run-after-delay", "Delayed message ran!");
    });
});

// 2.8 — double click
let lastClickAt = 0;
document.addEventListener("click", () => {
    const now = Date.now();
    if (lastClickAt > 0 && now - lastClickAt < 500) {
        showIn("#out-double", "double click!");
    }
    lastClickAt = now;
});

// 2.9 — jokeCreator
function jokeCreator(shouldTellFunnyJoke, logFunnyJoke, logBadJoke) {
    if (shouldTellFunnyJoke) {
        logFunnyJoke();
    } else {
        logBadJoke();
    }
}

const logFunnyJoke = () => {
    showIn("#out-joke", "Why do programmers prefer dark mode? Because light attracts bugs.");
};

const logBadJoke = () => {
    showIn("#out-joke", "What’s brown and sticky? A stick.");
};

document.querySelector("#btn-funny-joke").addEventListener("click", () => {
    jokeCreator(true, logFunnyJoke, logBadJoke);
});
document.querySelector("#btn-bad-joke").addEventListener("click", () => {
    jokeCreator(false, logFunnyJoke, logBadJoke);
});


// 3. Function as a variable


const fnArray = [
    () => appendLine("#out-fn-array", "Function in array 1 says hi."),
    () => appendLine("#out-fn-array", "Function in array 2 says hello."),
    () => appendLine("#out-fn-array", "Function in array 3 says bye bye."),
];
fnArray.forEach((functionToCall) => functionToCall());

const asConst = function () {
    appendLine("#out-fn-styles", "This one is a function expression stored in a const variable.");
};

function asDeclaration() {
    appendLine("#out-fn-styles", "This one is a normal function declaration.");
}

asConst();
asDeclaration();

const toolbox = {
    describe() {
        appendLine("#out-fn-object", "Hello from an object method.");
    },
};
toolbox.describe();


// 4. The fastest presser

let gameActive = false;
let countS = 0;
let countL = 0;
let gameTimerId = null;

const elCountS = document.querySelector("#count-s");
const elCountL = document.querySelector("#count-l");
const elGameStatus = document.querySelector("#game-status");

function updateScoreboard() {
    elCountS.textContent = String(countS);
    elCountL.textContent = String(countL);
}

function endGame() {
    gameActive = false;
    gameTimerId = null;
    let msg = "Time's up! ";
    if (countS > countL) {
        msg += "Player S wins!";
    } else if (countL > countS) {
        msg += "Player L wins!";
    } else {
        msg += "It's a draw.";
    }
    elGameStatus.textContent = msg;
}

document.querySelector("#btn-start-game").addEventListener("click", () => {
    const seconds = Number.parseInt(document.querySelector("#game-duration").value, 10);
    if (Number.isNaN(seconds) || seconds < 1) {
        elGameStatus.textContent = "Enter a game length of at least 1 second.";
        return;
    }
    if (gameTimerId) {
        clearTimeout(gameTimerId);
    }
    countS = 0;
    countL = 0;
    updateScoreboard();
    gameActive = true;
    elGameStatus.textContent = `Go! Press S or L for ${seconds} seconds…`;
    gameTimerId = setTimeout(endGame, seconds * 1000);
});

document.addEventListener("keydown", (event) => {
    if (!gameActive) return;
    const key = event.key.toLowerCase();
    if (key === "s") {
        countS += 1;
        updateScoreboard();
    } else if (key === "l") {
        countL += 1;
        updateScoreboard();
    }
});
