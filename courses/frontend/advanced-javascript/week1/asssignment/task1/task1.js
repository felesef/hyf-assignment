let numbers = [1, 2, 3, 4];

let newNumbers = numbers
  .filter(n => n % 2 !== 0)
  .map(n => n * 2);

console.log(newNumbers);