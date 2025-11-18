// exercise 1
// Flight booking fullname function

console.log("Flight booking fullname function\n");

function getFullName(firstName, lastName, useFormalName, gender) {
    if (useFormalName) {
        if (gender === "male") {
            return "Lord " + firstName + " " + lastName;
        } else {
            return "Lady " + firstName + " " + lastName;
        }
    } else {
        return firstName + " " + lastName;
    }
}

const useFormalName = true;

const firstName = "Mark";
const lastName = "Hunter";

const firstName2 = "Jane";
const lastName2 = "Smith";
fullName1 = getFullName(firstName, lastName, useFormalName, "male");
fullName2 = getFullName(firstName2, lastName2, useFormalName, "female");
fullName3 = getFullName(firstName2, lastName2, false, "female");

console.log(fullName1);
console.log(fullName2);
console.log(fullName3);

/*
Q: But what if the person is a woman? Describe how you would fix the getFullName so it also works for women

A: I added new parameter to the function called useFormalName and gender. If the useFormalName is true and gender is female, the function will return "Lady" instead of "Lord".
*/

console.log("\n========================================================\n");

// ----- exercise 2 -----
// Event application

console.log("Event application\n");
function getEventWeekday(daysFromToday) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    const eventDay = (today + daysFromToday) % 7;
    return `The event will be on ${weekdays[eventDay]}`;
}

console.log(getEventWeekday(5));
console.log(getEventWeekday(2));

console.log("\n========================================================\n");

// ----- exercise 3 -----
// Weather wear


console.log("Weather wear\n");
function wearThisOutfit(temperature) {
    if (temperature > 25) {
        return `The temperature is ${temperature}°C, so it's warm outside, wear a t-shirt`;
    }
    else if (temperature <= 25 && temperature > 15) {
        return `The temperature is ${temperature}°C, so it's cool outside, wear a light jacket`;
    }
    else if (temperature <= 15 && temperature > 10) {
        return `The temperature is ${temperature}°C, so it's cold outside, wear a jacket`;
    }
    else if (temperature <= 10 && temperature > 0) {
        return `The temperature is ${temperature}°C, so it's freezing outside, wear a winter coat`;
    }
    else {
        return `The temperature is ${temperature}°C, so it's freezing outside, wear a snow suit`;
    }
}

console.log(wearThisOutfit(26));
console.log(wearThisOutfit(25));
console.log(wearThisOutfit(15));
console.log(wearThisOutfit(1));
console.log(wearThisOutfit(-10));

console.log("\n========================================================\n");


// ----- exercise 4 -----
// Student manager

console.log("Student manager\n");
const class07Students = [];
function addStudentToClass(studentName) {
  if (class07Students.length < 6 && !class07Students.includes(studentName)) {
    class07Students.push(studentName);
  } else if (class07Students.includes(studentName)) {
    console.log(`Student ${studentName} is already in the class`);
  } else if (studentName === "Queen") {
    class07Students.push(studentName);
    console.log(`Queen is added to the class she should always get a space. Even if the class has been filled out.`);
  } else {
    console.log(`Cannot add more students to class 07`);
  }
}

function getNumberOfStudents() {
  return class07Students.length;
}

addStudentToClass("John");
addStudentToClass("Jane");
addStudentToClass("Jim");
addStudentToClass("Tarek");
addStudentToClass("Mette");
addStudentToClass("Amber");
addStudentToClass("Melih");
addStudentToClass("John");
addStudentToClass("Queen");
console.log(getNumberOfStudents());

console.log("\n========================================================\n");


// ----- exercise 5 -----
//Candy helper
console.log("Candy helper\n");
const boughtCandyPrices = [];
const amountToSpend = Math.random() * 100;
console.log(`You have ${amountToSpend} kr to spend on candy`);

function addCandy(candyType, weight) {
    if (candyType === "sweet") {
        boughtCandyPrices.push(weight * 0.5);
    } else if (candyType === "chocolate") {
        boughtCandyPrices.push(weight * 0.7);
    } else if (candyType === "toffee") {
        boughtCandyPrices.push(weight * 1.1);
    } else if (candyType === "chewing-gum") {
        boughtCandyPrices.push(weight * 0.03);
    }else {
        console.log(`Invalid candy type`);
    }
    console.log(`You have added ${weight} kg of ${candyType} to your basket`);
    return boughtCandyPrices;
}

addCandy("sweet", 10);
addCandy("chocolate", 10);
addCandy("toffee", 10);
addCandy("chewing-gum", 10);


function canBuyMoreCandy() {
    let totalPrice = 0;
    for(let i = 0; i < boughtCandyPrices.length; i++) {
        totalPrice += boughtCandyPrices[i];
    }
    if (totalPrice < amountToSpend) {
        console.log(`You can buy more candy, you have ${amountToSpend - totalPrice} kr left`);
    } else {
        console.log(`You can't buy more candy, you have spent ${totalPrice} kr`);
    }
}

canBuyMoreCandy();

console.log("\n========================================================\n");
