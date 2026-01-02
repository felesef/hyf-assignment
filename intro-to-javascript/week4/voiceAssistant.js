let userName = null;
const todoList = [];
const activeTimers = [];

const COMMANDS = {
  HELLO_MY_NAME_IS: "hello my name is",
  WHAT_IS_MY_NAME: "what is my name",
  WHATS_MY_NAME: "what's my name",
  WHAT_IS: "what is",
  WHATS: "what's",
  ADD: "add",
  TO_MY_TODO: "to my todo",
  REMOVE: "remove",
  FROM_MY_TODO: "from my todo",
  WHAT_IS_ON_MY_TODO: "what is on my todo",
  WHATS_ON_MY_TODO: "what's on my todo",
  WHAT_DAY_IS_IT_TODAY: "what day is it today",
  WHATS_THE_DATE: "what's the date",
  SET_A_TIMER_FOR: "set a timer for",
  CLEAR_MY_TODOS: "clear my todos",
  CLEAR_TODOS: "clear todos",
  CLEAR_LAST_TIMER: "clear last timer",
  CLEAR_TIMER: "clear timer",
};

function safeEvaluate(expression) {
  expression = expression.replace(/\s/g, "");
  
  if (!/^[\d+\-*/().]+$/.test(expression)) {
    throw new Error("Invalid characters in expression");
  }
  
  let parenCount = 0;
  for (let char of expression) {
    if (char === "(") parenCount++;
    if (char === ")") parenCount--;
    if (parenCount < 0) throw new Error("Unbalanced parentheses");
  }
  if (parenCount !== 0) throw new Error("Unbalanced parentheses");
  
  let index = 0;
  
  function parseExpression() {
    let left = parseTerm();
    while (index < expression.length && (expression[index] === "+" || expression[index] === "-")) {
      const op = expression[index++];
      const right = parseTerm();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }
  
  function parseTerm() {
    let left = parseFactor();
    while (index < expression.length && (expression[index] === "*" || expression[index] === "/")) {
      const op = expression[index++];
      const right = parseFactor();
      if (op === "*") {
        left = left * right;
      } else {
        if (right === 0) throw new Error("Division by zero");
        left = left / right;
      }
    }
    return left;
  }
  
  function parseFactor() {
    if (index >= expression.length) throw new Error("Unexpected end of expression");
    
    if (expression[index] === "(") {
      index++; // skip '('
      const result = parseExpression();
      if (index >= expression.length || expression[index] !== ")") {
        throw new Error("Expected ')'");
      }
      index++; // skip ')'
      return result;
    }
    
    if (expression[index] === "-") {
      index++;
      return -parseFactor();
    }
    
    if (expression[index] === "+") {
      index++;
      return parseFactor();
    }
    
    let numStr = "";
    while (index < expression.length && /[\d.]/.test(expression[index])) {
      numStr += expression[index++];
    }
    
    if (numStr === "") throw new Error("Expected number");
    
    const num = parseFloat(numStr);
    if (isNaN(num)) throw new Error("Invalid number");
    
    return num;
  }
  
  const result = parseExpression();
  if (index < expression.length) {
    throw new Error("Unexpected characters at end of expression");
  }
  
  return result;
}

function getReply(command) {
  if (typeof command !== "string") {
    return "I'm sorry, I need a text command. Please try again.";
  }
  
  const lowerCommand = command.toLowerCase().trim();

  // Name recognition
  if (lowerCommand.startsWith(COMMANDS.HELLO_MY_NAME_IS)) {
    const nameMatch = command.match(/hello my name is (.+)/i);
    if (nameMatch) {
      const newName = nameMatch[1].trim();
      if (userName == null) {
        userName = newName;
        return `Nice to meet you ${newName}`;
      } else {
        return `I already know your name is ${userName}. Nice to meet you ${newName}!`;
      }
    }
  }

  // Name recognition - 2: What is my name?
  if (
    lowerCommand.includes(COMMANDS.WHAT_IS_MY_NAME) ||
    lowerCommand.includes(COMMANDS.WHATS_MY_NAME)
  ) {
    if (userName == null) {
      return "I don't know your name yet. Please tell me your name first.";
    }
    return `Your name is ${userName}`;
  }

  // Todo list - 1: Add [item] to my todo
  if (lowerCommand.startsWith(COMMANDS.ADD) && lowerCommand.includes(COMMANDS.TO_MY_TODO)) {
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

  // Todo list - 2: Remove [item] from my todo
  if (
    lowerCommand.startsWith(COMMANDS.REMOVE) &&
    lowerCommand.includes(COMMANDS.FROM_MY_TODO)
  ) {
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

  // Todo list - 3: What is on my todo?
  if (
    lowerCommand.includes(COMMANDS.WHAT_IS_ON_MY_TODO) ||
    lowerCommand.includes(COMMANDS.WHATS_ON_MY_TODO)
  ) {
    if (todoList.length === 0) {
      return "Your todo list is empty";
    } else if (todoList.length === 1) {
      return `You have 1 todo - ${todoList[0]}`;
    } else {
      return `You have ${todoList.length} todos - ${todoList.join(", ")}`;
    }
  }

  // Date recognition: What day is it today?
  if (
    lowerCommand.includes(COMMANDS.WHAT_DAY_IS_IT_TODAY) ||
    lowerCommand.includes(COMMANDS.WHATS_THE_DATE)
  ) {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day}. of ${month} ${year}`;
  }

  // Math operations
  if (lowerCommand.startsWith(COMMANDS.WHAT_IS) || lowerCommand.startsWith(COMMANDS.WHATS)) {
    const mathMatch =
      command.match(/^what is (.+)$/i) || command.match(/^what's (.+)$/i);
    if (mathMatch) {
      const expression = mathMatch[1].trim();
      if (/^[\d+\-*/().\s]+$/.test(expression)) {
        try {
          const result = safeEvaluate(expression);
          return result.toString();
        } catch (error) {
          return "I couldn't calculate that. Please try again with a valid math expression.";
        }
      }
    }
  }

  // Timer - 1: Set a timer for X minutes
  if (lowerCommand.startsWith(COMMANDS.SET_A_TIMER_FOR)) {
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

  // Timer - 2: Clear the last timer
  if (
    lowerCommand.includes(COMMANDS.CLEAR_LAST_TIMER) ||
    lowerCommand.includes(COMMANDS.CLEAR_TIMER)
  ) {
    if (activeTimers.length === 0) {
      return "No active timers to clear";
    }
    const lastTimerId = activeTimers.pop();
    clearTimeout(lastTimerId);
    return "Last timer cleared";
  }

  // Todo list - 4: Clear my todos (additional command)
  if (
    lowerCommand.includes(COMMANDS.CLEAR_MY_TODOS) ||
    lowerCommand.includes(COMMANDS.CLEAR_TODOS)
  ) {
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
    const passed =
      actual === expected ||
      (Array.isArray(expected) &&
        Array.isArray(actual) &&
        JSON.stringify(actual) === JSON.stringify(expected));

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
  test("Ask for name", "What is my name?", "Your name is Benjamin");

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
  test("Clear todos", "Clear my todos", "Cleared 1 todo from your list");
  // Test: Add todo item - 11: Clear todos
  test("Clear todos", "Clear my todos", "Your todo list is already empty");
  // Test: Add todo item - 12: List todos
  test("List todos", "What is on my todo?", "Your todo list is empty");

  // Test: Math operation - addition
  test("Math: 3 + 3", "What is 3 + 3", "6");

  // Test: Math operation - multiplication
  test("Math: 4 * 12", "What is 4 * 12", "48");

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
