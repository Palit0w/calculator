//Selectors
const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const display = document.querySelector('.display')

//Vars
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldReset = false;


//Event Listeners
equalsButton.addEventListener("click", () => evaluate());
clearButton.addEventListener("click", () => clear());
deleteButton.addEventListener("click", () => deleteANumber());

numbersButtons.forEach(button =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorsButtons.forEach(button =>
  button.addEventListener("click", () => selectOperator(button.textContent))
);

//Functions
function appendNumber(number) {
  if (display.textContent == "0" || shouldReset) resetDisplay();
  if (number == '.' && display.textContent.includes('.')) {
    return
  }
  display.textContent += number;
}

function resetDisplay() {
  display.textContent = "";
  shouldReset = false;
}

function selectOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldReset = true;
}

function evaluate() {
  if (shouldReset || currentOperator === null) return;
  if (currentOperator == "/" && display.textContent == "0") {
    alert("In this page we respect maths rules! :@");
    clear();
    return
  }
  secondNumber = display.textContent;
  display.textContent = operate(+firstNumber, +secondNumber, currentOperator);
  currentOperator = null;
}

function clear() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldReset = false;
  display.textContent = '0';
}

function deleteANumber() {
  display.textContent = display.textContent.slice(0, -1);
}

// Calculator
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  let result;
  switch (operator) {
    case '+':
      result = add(a, b)
      break;

    case '-':
      result = subtract(a, b)
      break;

    case 'x':
      result = multiply(a, b)
      break;

    case '/':
      result = divide(a, b)
      break;

    default:
      break;
  }
  return Math.round(result * 10000) / 10000;
}