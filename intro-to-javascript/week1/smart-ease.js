
//1. Age-ify (A future age calculator)

const yearOfBirth = 1990;
const yearFuture = 2027;
const age = yearFuture - yearOfBirth;
console.log(`You will be ${age} years old in ${yearFuture}`);

//2. Goodboy-Oldboy (A dog age calculator)

const dogYearOfBirth = 2020;
const dogYearFuture = 2027;
const dogYear = (dogYearFuture - dogYearOfBirth) * 7;
const shouldShowResultInDogYears = true;
console.log(`Your dog will be ${dogYear} ${shouldShowResultInDogYears ? 'dog' : 'human'} years old in ${dogYearFuture}`);

//3. Housey pricey (A house price estimator)

const housePeter = {
  width: 8,
  depth: 10,
  height: 10,
  gardenSize: 100
}

const houseJulia = {
  width: 5,
  depth: 11,
  height: 8,
  gardenSize: 70
}

const housePricePeter = housePeter.width * housePeter.depth * housePeter.height * 2.5 * 1000 + housePeter.gardenSize * 300;
const housePriceJulia = houseJulia.width * houseJulia.depth * houseJulia.height * 2.5 * 1000 + houseJulia.gardenSize * 300;

console.log('Peter\'s house price: ', housePricePeter);
console.log('Julia\'s house price: ', housePriceJulia);

if (housePricePeter > housePriceJulia) {
  console.log('Peter is paying too much');
} else {
  console.log('Julia is paying too much');
}

//rewrite the code to use a function
const housePriceCalculator = (house) => {
  return house.width * house.depth * house.height * 2.5 * 1000 + house.gardenSize * 300;
}
const housePricePeter2 = housePriceCalculator(housePeter);
const housePriceJulia2 = housePriceCalculator(houseJulia);

if (housePricePeter2 > housePriceJulia2) {
  console.log('Peter is paying too much');
} else {
  console.log('Julia is paying too much');
}

//4. Ez Namey (Startup name generator) Optional

const firstWords = ['Easy', 'Awesome', 'Corporate', 'Better', 'Faster', 'Smarter', 'Stronger', 'Wiser', 'Clever', 'Smart'];
const secondWords = ['Corporation', 'Inc', 'Group', 'Company', 'LTD', 'LLC', 'Corp', 'IO', 'AS', 'LLP'];
const randomNumber = Math.floor(Math.random() * 10);
const randomNumber2 = Math.floor(Math.random() * 10);

const startupName = firstWords[randomNumber] + ' ' + secondWords[randomNumber2];
console.log(`The startup: "${startupName}" contains ${startupName.length} characters`);


//Rewrite the code to use a function
const startupNameGenerator = (firstWords, secondWords) => {
  const randomNumber = Math.floor(Math.random() * 10);
  const randomNumber2 = Math.floor(Math.random() * 10);
  return firstWords[randomNumber] + ' ' + secondWords[randomNumber2];
}

const startupName2 = startupNameGenerator(firstWords, secondWords);
console.log(`The startup: "${startupName2}" contains ${startupName2.length} characters`);
