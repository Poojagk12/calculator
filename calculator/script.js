// script.js

let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number.toString();
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number.toString() : displayValue + number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator && waitingForSecondOperand) {
        operator = op;
        return;
    }
    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (operator) {
        const result = calculateResult(firstOperand, operator, parseFloat(displayValue));
        displayValue = `${parseFloat(result.toFixed(5))}`;
        firstOperand = result;
    }
    waitingForSecondOperand = true;
    operator = op;
    updateDisplay();
}

function calculate() {
    if (operator && !waitingForSecondOperand) {
        const result = calculateResult(firstOperand, operator, parseFloat(displayValue));
        displayValue = `${parseFloat(result.toFixed(5))}`;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

function calculateResult(first, operator, second) {
    switch (operator) {
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': return second !== 0 ? first / second : 'Error';
        default: return second;
    }
}

function appendDot() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : '0';
    updateDisplay();
}

updateDisplay();
