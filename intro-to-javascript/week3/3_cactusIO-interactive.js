// CactusIO-interactive (Smart phone usage app) optional

const activities = [];

let usageLimit = 0;

// Adding an activity function
function addActivity(date, activity, duration) {
  if (usageLimit > 0) {
    let currentTotal = 0;
    for (let i = 0; i < activities.length; i++) {
      currentTotal += activities[i].duration;
    }
    
    if (currentTotal + duration > usageLimit) {
      const remainingLimit = usageLimit - currentTotal;
      
      if (remainingLimit > 0) {
        console.log(`This activity would exceed your limit. It will be added as ${remainingLimit} minutes.`);
        activities.push({
          date: date,
          activity: activity,
          duration: remainingLimit
        });
        return;
      } else {
        return;
      }
    }
  }
  
  // Add the activity normally if limit is not exceeded
  activities.push({
    date: date,
    activity: activity,
    duration: duration
  });
}


// Show my status function
function showStatus(activitiesArray) {
  if (activitiesArray.length === 0) {
    console.log('Add some activities before calling showStatus');
    return;
  }
  
  let totalDuration = 0;
  for (let i = 0; i < activitiesArray.length; i++) {
    totalDuration += activitiesArray[i].duration;
  }
  
  const statusMessage = `You have added ${activitiesArray.length} activities. Their amount to ${totalDuration} min. of usage`;
  console.log(statusMessage);
 
  if (usageLimit > 0 && totalDuration >= usageLimit) {
    console.log('You have reached your limit, no more smartphoning for you!');
  }
  
  return statusMessage;
}


// Set usage limit function
function setUsageLimit(limit) {
  usageLimit = limit;
}

// Extra feature: Get most used activity
function getMostUsedActivity() {
  if (activities.length === 0) {
    console.log('No activities found');
    return;
  }
  
  const activityTotals = {};
  
  for (let i = 0; i < activities.length; i++) {
    const activityName = activities[i].activity;
    const duration = activities[i].duration;
    
    if (activityTotals[activityName] === undefined) {
      activityTotals[activityName] = 0;
    }
    activityTotals[activityName] += duration;
  }
  
  let mostUsedActivity = '';
  let maxDuration = 0;
  
  for (let activityName in activityTotals) {
    if (activityTotals[activityName] > maxDuration) {
      maxDuration = activityTotals[activityName];
      mostUsedActivity = activityName;
    }
  }
  
  console.log(`Most used activity: ${mostUsedActivity} with ${maxDuration} minutes`);
}

// test the functions
addActivity('26-11-2025', 'Facebook', 20);
addActivity('26-11-2025', 'Instagram', 35);
addActivity('26-11-2025', 'Twitter', 20);
console.log(activities);
showStatus(activities);
setUsageLimit(100);
addActivity('26-11-2025', 'Prime Video', 30);
console.log(activities);
showStatus(activities);
addActivity('26-11-2025', 'Prime Video', 5);
console.log(activities);
showStatus(activities);
getMostUsedActivity();

/* output:
[
  { date: '26-11-2025', activity: 'Facebook', duration: 20 },
  { date: '26-11-2025', activity: 'Instagram', duration: 35 },
  { date: '26-11-2025', activity: 'Twitter', duration: 20 }
]
You have added 3 activities. Their amount to 75 min. of usage
This activity would exceed your limit. It will be added as 25 minutes.
[
  { date: '26-11-2025', activity: 'Facebook', duration: 20 },
  { date: '26-11-2025', activity: 'Instagram', duration: 35 },
  { date: '26-11-2025', activity: 'Twitter', duration: 20 },
  { date: '26-11-2025', activity: 'Prime Video', duration: 25 }
]
You have added 4 activities. Their amount to 100 min. of usage
You have reached your limit, no more smartphoning for you!
[
  { date: '26-11-2025', activity: 'Facebook', duration: 20 },
  { date: '26-11-2025', activity: 'Instagram', duration: 35 },
  { date: '26-11-2025', activity: 'Twitter', duration: 20 },
  { date: '26-11-2025', activity: 'Prime Video', duration: 25 }
]
You have added 4 activities. Their amount to 100 min. of usage
You have reached your limit, no more smartphoning for you!
Most used activity: Instagram with 35 minutes

*/