
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

const houseWidthPeter = 8;
const houseWidthJulia = 5;
const houseDepthPeter = 10;
const houseDepthJulia = 11;
const houseHeightPeter = 10;
const houseHeightJulia = 8;
const volumeInMetersPeter = houseWidthPeter * houseDepthPeter * houseHeightPeter;
const volumeInMetersJulia = houseWidthJulia * houseDepthJulia * houseHeightJulia;

const gardenSizeInM2Peter = 100;
const gardenSizeInM2Julia = 70;

let housePricePeter = volumeInMetersPeter * 2.5 * 1000 + gardenSizeInM2Peter * 300;
let housePriceJulia = volumeInMetersJulia * 2.5 * 1000 + gardenSizeInM2Julia * 300;

console.log('Peter\'s house price: ', housePricePeter);
console.log('Julia\'s house price: ', housePriceJulia);

if (housePricePeter > housePriceJulia) {
  console.log('Peter is paying too much');
} else {
  console.log('Julia is paying too much');
}

//rewrite the code to use a function
let housePriceCalculator = (volumeInMeters, gardenSizeInM2) => {
  return volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
}

let housePricePeter2 = housePriceCalculator(volumeInMetersPeter, gardenSizeInM2Peter);
let housePriceJulia2 = housePriceCalculator(volumeInMetersJulia, gardenSizeInM2Julia);

if (housePricePeter2 > housePriceJulia2) {
  console.log('Peter is paying too much');
} else {
  console.log('Julia is paying too much');
}

//4. Ez Namey (Startup name generator) Optional

const firstWords = ['Easy', 'Awesome', 'Corporate', 'Better', 'Faster', 'Smarter', 'Stronger', 'Wiser', 'Clever', 'Smart'];
const secondWords = ['Corporation', 'Inc', 'Group', 'Company', 'LTD', 'LLC', 'Corp', 'IO', 'AS', 'LLP'];
const randomNumber = Math.floor(Math.random() * 10);
const startupName = firstWords[randomNumber] + ' ' + secondWords[randomNumber];
console.log(`The startup: "${startupName}" contains ${startupName.length} characters`);


//Rewrite the code to use a function
let startupNameGenerator = (firstWords, secondWords) => {
  const randomNumber = Math.floor(Math.random() * 10);
  return firstWords[randomNumber] + ' ' + secondWords[randomNumber];
}

let startupName2 = startupNameGenerator(firstWords, secondWords);
console.log(`The startup: "${startupName2}" contains ${startupName2.length} characters`);