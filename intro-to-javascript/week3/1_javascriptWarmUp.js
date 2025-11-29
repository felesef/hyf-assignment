// #Javascript warmup
// #Item array removal

const names = [
    "Peter",
    "Ahmad",
    "Yana",
    "kristina",
    "Rasmus",
    "Samuel",
    "Katrine",
    "Tala",
  ];
  const nameToRemove = "Ahmad";
  
  // Write some code here

  // 1
  const index = names.indexOf(nameToRemove);
  if (index !== -1) {
    names.splice(index, 1);
  }
/*   // 2
  let names = [
    "Peter",
    "Ahmad",
    "Yana",
    "kristina",
    "Rasmus",
    "Samuel",
    "Katrine",
    "Tala",
  ];
  names = names.filter(name => name !== nameToRemove); */

  
  // Code done
  
  console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'Katrine', 'Tala']

  // ======================================================

  // #When will we be there??

const travelInformation = {
    speed: 50,
    destinationDistance: 432,
  };
  
  const travelTime = getTravelTime(travelInformation);
  console.log(travelTime); // 8 hour(s) and 38 minute(s)

  function getTravelTime(travelInformation) {
    const time = travelInformation.destinationDistance / travelInformation.speed;
    const hours = Math.floor(time);
    // calculate the minutes with the remainder of the time
    const minutes = Math.floor((time - hours) * 60);
    return `${hours} hour(s) and ${minutes} minute(s)`;
  }

  // ======================================================

  // #Series duration of my life


  const seriesDurations = [
    {
      title: "Game of thrones",
      days: 2,
      hours: 20,
      minutes: 8,
    
    },
    {
      title: "Sopranos",
      days: 3,
      hours: 2,
      minutes: 32,
    },
    {
      title: "The Wire",
      days: 2,
      hours: 11,
      minutes: 0,
    },
  ];

  

  function logOutSeriesText() {
    // write code here
    const lifeSpanInYears = 80;
    let totalPercentage = 0;
    
    // Loop through each series
    for (const series of seriesDurations) {
      // Convert days, hours, and minutes to total hours
      const totalHours = series.days * 24 + series.hours + series.minutes / 60;
      // Convert hours to years 
      const totalYears = totalHours / 8760;
      // Calculate percentage of life span
      const percentage = (totalYears / lifeSpanInYears) * 100;
      totalPercentage += percentage;
      
      // Log each series
      console.log(`${series.title} took ${percentage.toFixed(4)}% of my life`);
    }
    
    // Log total
    console.log(`\nIn total that is ${totalPercentage.toFixed(4)}% of my life`);
  }
  
  logOutSeriesText(); // logs out the text found above

