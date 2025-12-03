let userName = null;
const todoList = [];
const activeTimers = [];

function getReply(command) {
  const lowerCommand = command.toLowerCase().trim();

  // My name is [name]
  if (lowerCommand.startsWith("hello my name is")) {
    const nameMatch = command.match(/hello my name is (.+)/i);
    if (nameMatch) {
      const newName = nameMatch[1].trim();
      if (userName === null) {
        userName = newName;
        return `Nice to meet you ${newName}`;
      } else {
        return `I already know your name is ${userName}. Nice to meet you ${newName}!`;
      }
    }
  }

  // What is my name?
  if (lowerCommand.includes("what is my name") || lowerCommand.includes("what's my name")) {
    if (userName === null) {
      return "I don't know your name yet. Please tell me your name first.";
    }
    return `Your name is ${userName}`;
  }

  // Add [item] to my todo
  if (lowerCommand.startsWith("add") && lowerCommand.includes("to my todo")) {
    const todoMatch = command.match(/add (.+) to my todo/i);
    if (todoMatch) {
      const todoItem = todoMatch[1].trim();
      if (todoList.includes(todoItem)) {
        return `${todoItem} is already in your todo list`;
      } else {
        todoList.push(todoItem);
        return `${todoItem} added to your todo`;
      }
    }
  }

  // Remove [item] from my todo
  if (lowerCommand.startsWith("remove") && lowerCommand.includes("from my todo")) {
    const todoMatch = command.match(/remove (.+) from my todo/i);
    if (todoMatch) {
      const todoItem = todoMatch[1].trim();
      const index = todoList.indexOf(todoItem);
      if (index === -1) {
        return `${todoItem} is not in your todo list`;
      }
      todoList.splice(index, 1);
      return `Removed ${todoItem} from your todo`;
    }
  }

  // What is on my todo?
  if (lowerCommand.includes("what is on my todo") || lowerCommand.includes("what's on my todo")) {
    if (todoList.length === 0) {
      return "Your todo list is empty"; 
    } else if (todoList.length === 1) {
      return `You have 1 todo - ${todoList[0]}`;
    } else {
      return `You have ${todoList.length} todos - ${todoList.join(", ")}`;
    }
  }

  // What day is it today?
  if (lowerCommand.includes("what day is it today") || lowerCommand.includes("what's the date")) {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day}. of ${month} ${year}`;
  }

  // Math operations
  if (lowerCommand.startsWith("what is") || lowerCommand.startsWith("what's")) {
    const mathMatch = command.match(/what is (.+)/i) || command.match(/what's (.+)/i);
    if (mathMatch) {
      const expression = mathMatch[1].trim();
      if (/[\d+\-*/().\s]+/.test(expression)) {
        try {
          const result = eval(expression);
          return result.toString();
        } catch (error) {
          return "I couldn't calculate that. Please try again with a valid math expression.";
        }
      }
    }
  }

  // Set a timer for X minutes
  if (lowerCommand.startsWith("set a timer for")) {
    const timerMatch = command.match(/set a timer for (\d+) (minute|minutes)/i);
    if (timerMatch) {
      const minutes = parseInt(timerMatch[1], 10);
      const milliseconds = minutes * 60 * 1000;
      
      const timerId = setTimeout(() => {
        console.log("Timer done");
        const index = activeTimers.indexOf(timerId);
        if (index > -1) {
          activeTimers.splice(index, 1);
        }
      }, milliseconds);
      
      activeTimers.push(timerId);
      return `Timer set for ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }
  }


  // Additional: "Clear my todos"
  if (lowerCommand.includes("clear my todos") || lowerCommand.includes("clear todos")) {
    const count = todoList.length;
    todoList.length = 0;
    if (count === 0) {
      return "Your todo list is already empty";
    }
    return `Cleared ${count} ${count === 1 ? "todo" : "todos"} from your list`;
  }

  // Default response
  return "I'm sorry, I didn't understand that command. Please try again.";

}

//Test function
function testGetReply() {
  let passedTests = 0;
  let failedTests = 0;
  const testResults = [];

  function test(description, command, expected) {
    const actual = getReply(command);
    const passed = actual === expected || (Array.isArray(expected) && Array.isArray(actual) && JSON.stringify(actual) === JSON.stringify(expected));
    
    if (passed) {
      passedTests++;
      testResults.push(`PASS: ${description}`);
    } else {
      failedTests++;
      testResults.push(`FAIL: ${description}`);
      testResults.push(`Expected: ${JSON.stringify(expected)}`);
      testResults.push(`Actual:   ${JSON.stringify(actual)}`);
    }
  }

  console.log("\nRunning Tests...\n");

  userName = null;
  todoList.length = 0;
  activeTimers.length = 0;

  // Test: Name introduction -1
  test(
    "Name introduction",
    "Hello my name is Benjamin",
    "Nice to meet you Benjamin"
  );

  // Test: Name introduction - 2: Ask for name
  test(
    "Ask for name",
    "What is my name?",
    "Your name is Benjamin"
  );

  // Test: Add todo item - 1
  test(
    "Add fishing to todo",
    "Add fishing to my todo",
    "fishing added to your todo"
  );

  // Test: Add todo item - 2
  test(
    "Add singing to todo",
    "Add singing in the shower to my todo",
    "singing in the shower added to your todo"
  );

  // Test: Add todo item - 3: List todos
  test(
    "List todos",
    "What is on my todo?",
    "You have 2 todos - fishing, singing in the shower"
  );

  // Test: Add todo item - 4: Remove todo item
  test(
    "Remove fishing from todo",
    "Remove fishing from my todo",
    "Removed fishing from your todo"
  );

  // Test: Add todo item - 5: Add another todo item
  test(
    "Add singing to todo",
    "Add singing in the shower to my todo",
    "singing in the shower is already in your todo list"
  );
  // Test: Add todo item - 6: Add another todo item
  test(
    "Add watching a movie to todo",
    "Add watching a movie to my todo",
    "watching a movie added to your todo"
  );

  // Test: Add todo item - 7: List todos
  test(
    "List todos",
    "What is on my todo?",
    "You have 2 todos - singing in the shower, watching a movie"
  );
  // Test: Add todo item - 8: Remove another todo item
  test(
    "Remove singing in the shower from todo",
    "Remove singing in the shower from my todo",
    "Removed singing in the shower from your todo"
  );
  // Test: Add todo item - 9: List todos
  test(
    "List todos",
    "What is on my todo?",
    "You have 1 todo - watching a movie"
  );
  // Test: Add todo item - 10: Clear todos
  test(
    "Clear todos",
    "Clear my todos",
    "Cleared 1 todo from your list"
  );
  // Test: Add todo item - 11: Clear todos
  test(
    "Clear todos",
    "Clear my todos",
    "Your todo list is already empty"
  );
  // Test: Add todo item - 12: List todos
  test(
    "List todos",
    "What is on my todo?",
    "Your todo list is empty"
  );

  // Test: Math operation - addition
  test(
    "Math: 3 + 3",
    "What is 3 + 3",
    "6"
  );

  // Test: Math operation - multiplication
  test(
    "Math: 4 * 12",
    "What is 4 * 12",
    "48"
  );

  // Test: Timer setup
  test(
    "Set timer for 4 minutes",
    "Set a timer for 4 minutes",
    "Timer set for 4 minutes"
  );


  // Test: Date (check format, not exact value)
  const dateResult = getReply("What day is it today?");
  const datePattern = /\d+\. of \w+ \d{4}/;
  if (datePattern.test(dateResult)) {
    passedTests++;
    testResults.push("PASS: Date format");
  } else {
    failedTests++;
    testResults.push("FAIL: Date format");
    testResults.push(`Expected: Format like "30. of August 2019"`);
    testResults.push(`Actual:   ${dateResult}`);
  }

  console.log(testResults.join("\n"));
  console.log(`\nTest Results: ${passedTests} passed, ${failedTests} failed\n`);

  return { passed: passedTests, failed: failedTests };
}

testGetReply();

