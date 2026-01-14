const nameInput = document.getElementById("nameInput");
const generateBtn = document.getElementById("generateBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const resultDiv = document.getElementById("result");
const backgroundContainer = document.getElementById("backgroundContainer");
const houseLogoContainer = document.getElementById("houseLogoContainer");

let houseAssigned = false;

const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const houseImages = {
  Gryffindor: "media/Gryffindor_ClearBG.webp",
  Hufflepuff: "media/Hufflepuff_ClearBG.webp",
  Ravenclaw: "media/RavenclawCrest.webp",
  Slytherin: "media/Slytherin_ClearBG.webp",
};

backgroundContainer.style.backgroundImage = "url('media/mainLogo.avif')";

function validateInput(input) {
  if (input === "") {
    return false;
  }

  if (input.length < 2) {
    return false;
  }

  if (typeof input !== "string") {
    return false;
  }

  if (/^\d+$/.test(input)) {
    return false;
  }

  if (!isNaN(input) && !isNaN(parseFloat(input))) {
    return false;
  }

  return true;
}

function getRandomHouse() {
  const randomIndex = Math.floor(Math.random() * houses.length);
  return houses[randomIndex];
}

function changeBackground(house) {
  backgroundContainer.style.backgroundImage = `url('${houseImages[house]}')`;
}

function displayHouseLogo(house) {
  const img = document.createElement("img");
  img.src = houseImages[house];
  img.alt = `${house} logo`;

  houseLogoContainer.innerHTML = "";

  houseLogoContainer.appendChild(img);

  houseLogoContainer.style.display = "block";
}

function resetToInitial() {
  backgroundContainer.style.backgroundImage = "url('media/mainLogo.avif')";

  houseLogoContainer.style.display = "none";
  houseLogoContainer.innerHTML = "";
}

function displayResult(userName, assignedHouse) {
  const message = `${userName} belongs in ${assignedHouse}!`;

  resultDiv.textContent = message;

  resultDiv.classList.remove(
    "gryffindor",
    "hufflepuff",
    "ravenclaw",
    "slytherin"
  );

  resultDiv.classList.add(assignedHouse.toLowerCase());

  changeBackground(assignedHouse);

  displayHouseLogo(assignedHouse);

  tryAgainBtn.classList.remove("hidden");

  generateBtn.disabled = true;
  houseAssigned = true;
}

function resultGenerate() {
  const userName = nameInput.value.trim();

  if (!validateInput(userName)) {
    return;
  }

  const assignedHouse = getRandomHouse();

  displayResult(userName, assignedHouse);
}

function resultTryAgain() {
  resultDiv.textContent = "";
  resultDiv.classList.remove(
    "gryffindor",
    "hufflepuff",
    "ravenclaw",
    "slytherin"
  );

  tryAgainBtn.classList.add("hidden");

  houseAssigned = false;

  checkInputValidity();

  resetToInitial();
}

function checkInputValidity() {
  if (houseAssigned) {
    generateBtn.disabled = true;
    return;
  }

  const userName = nameInput.value.trim();
  generateBtn.disabled = !validateInput(userName);
}

generateBtn.disabled = true;

nameInput.addEventListener("input", checkInputValidity);

generateBtn.addEventListener("click", resultGenerate);

tryAgainBtn.addEventListener("click", resultTryAgain);

nameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && !generateBtn.disabled) {
    resultGenerate();
  }
});
