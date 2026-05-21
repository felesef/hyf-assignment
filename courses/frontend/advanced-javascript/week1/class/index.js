// =============================================================================
// DATA
// =============================================================================

const mentors = [
  {
    name: "Abed Sujan",
    subjects: ["JS", "HTML", "CSS", "NODEJS"],
    yearOfExperience: 4,
  },
  {
    name: "Ahmed Magdy",
    subjects: ["JS", "Database", "CSS"],
    yearOfExperience: 1,
  },
  {
    name: "Alicia Gonzales",
    subjects: ["DB", "HTML", "NODEJS"],
    yearOfExperience: 8,
  },
  {
    name: "allan Thraen",
    subjects: ["REACT", "HTML", "CSS"],
    yearOfExperience: 3,
  },
  {
    name: "Anders Ravn",
    subjects: ["JS", "HTML", "NODEJS"],
    yearOfExperience: 2,
  },
  {
    name: "Daniel Fernandes",
    subjects: ["Database", "HTML", "CSS"],
    yearOfExperience: 9,
  },
];

// =============================================================================
// RENDER HELPERS (already implemented – go through with trainees)
// =============================================================================

/**
 * Create one card element for a mentor
 */
function renderMentorCard(mentor) {
  const div = document.createElement("div");
  div.className = "card";

  const subjectSpans = mentor.subjects.map(function (subject) {
    return `<span>${subject}</span>`;
  });
  const subjectsHtml = subjectSpans.join("");

  div.innerHTML = `
    <div class="card-name">${mentor.name}</div>
    <div class="card-experience">${mentor.yearOfExperience} years experience</div>
    <div class="card-subjects">${subjectsHtml}</div>
  `;

  return div;
}

/**
 * Clear #result and show names as comma-separated text (or "No names." if empty).
 */
function renderNamesList(names) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  const div = document.createElement("div");
  div.className = `names-list${names.length === 0 ? " empty" : ""}`;
  div.textContent = names.length === 0 ? "No names." : names.join(", ");

  container.appendChild(div);
}

/**
 * Helper function to set the active button
 */
function setActive(clickedBtn) {
  const buttons = document.querySelectorAll(".actions button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  clickedBtn.classList.add("active");
}

// Default: show all mentors on load
showAllMentors();

// =============================================================================
// HOMEMADE ARRAY FUNCTIONS (implement these during the session for demostration)
// =============================================================================

/**
 * Executes function for each item in the array, NO RETURN!
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */
function forEachHomemade(array, functionToExecute) {
  // FOREACH TODO: implement forEach
  const result = [];
  array.forEach(function (item) {
    result.push(functionToExecute(item));
  });
  return result;
}
function mentorCardMaker(obj) {
  return {name: obj.name, subjects: obj.subjects, yearOfExperience: obj.yearOfExperience}
}

/**
 * Changes/transforms the items in the array. Returns a new array with the transformed items.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
function mapHomemade(arr, functionToExecute) {
  // MAP TODO: implement map
  return arr.map(functionToExecute);
}
function namesOnly(obj) {
  return obj.name;
}

/**
 * Changes the number of items in the array based on a condition. Returns a new array with only the items that satisfy the condition.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
function filterHomemade(array, number, letter) {
  // FILTER TODO: implement filter
  const result = [];
  array.forEach(function (item) {
    if (experienceMoreThan(number, item) && (letter === null || nameStartsWith(letter, item))) {
      result.push(item);
    }
  });
  return result;
}

function experienceMoreThan(number, obj) {
  if (obj.yearOfExperience > number) {
    return obj;
  }
  return null;
}

function nameStartsWith(letter, obj) {
  if (obj.name.charAt(0) === letter) {
    return obj;
  }
  return null;
}
// =============================================================================
// DEMO ACTIONS (forEach, map, filter)
// =============================================================================

function renderCards(mentorsToShow) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "cards";

  // FOREACH TODO: implement showing all mentors as cards instead
  const allMentorsCards = forEachHomemade(mentorsToShow, mentorCardMaker)
  allMentorsCards.forEach(function (mentorCard) {
    wrapper.appendChild(renderMentorCard(mentorCard));
  });
  container.appendChild(wrapper);
}

function showAllMentors() {
  document.getElementById("resultLabel").textContent =
    "Result: forEach – all mentors";

  renderCards(mentors);
}

function showNamesOnly() {
  document.getElementById("resultLabel").textContent =
    "Result: map – mentor names (array of strings)";

  // MAP TODO: implement showing only the names of the mentors instead
  const mentorNames = mapHomemade(mentors, namesOnly);

  renderNamesList(mentorNames);
}

function showExperienced() {
  document.getElementById("resultLabel").textContent =
    "Result: filter – yearOfExperience > 7";

  // FILTER TODO: implement showing only the mentors with more than 7 years of experience instead
  const experiencedMentors = filterHomemade(mentors, 7, null);

  renderCards(experiencedMentors);
}

function showNamesStartingWithA() {
  document.getElementById("resultLabel").textContent =
    'Result: filter (multiple conditions) – name starts with "A" and yearOfExperience > 2';

  // CHAINING TODO: implement – filter to name starts with "A", then filter to yearOfExperience > 2
  const mentorsThatStartWithA = filterHomemade(mentors, 2, "A");

  renderCards(mentorsThatStartWithA);
}
