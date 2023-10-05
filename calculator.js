const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operation');
const modifierButtons = document.querySelectorAll('.modify');  
const evaluateButtons = document.querySelectorAll('.evaluate');
const calcDisplay = document.querySelector('#calculator-display');
window.addEventListener('keydown', keyPress);
numberButtons.forEach(button => button.addEventListener('click', numberButton));
operatorButtons.forEach(button => button.addEventListener('click', operationButton));
modifierButtons.forEach(button => button.addEventListener('click', modifyButton));
evaluateButtons.forEach(button => button.addEventListener('click', evaluateButton));
const decimalButton = document.querySelector('#button-dot');
let input = '';
let aNumber = 0;
let bNumber = NaN;
calcDisplay.textContent = aNumber.toString();
let calcOperation = blankOperation;

function keyPress(e) {
    if (!isNaN(parseInt(e.key))) parseInput(e.key);
    else {
        switch(e.key) {
            case '/': assignOperator(divide); break;
            case '*': assignOperator(multiply); break;
            case '+': assignOperator(add); break;
            case '-': assignOperator(subtract); break;
            case '.': useDecimal(); break;
            case 'Enter': evaluateButton(e); break;
        }
    }
}
function numberButton(e) {
    switch(e.target.id) {
        case 'button-0': parseInput('0'); break;
        case 'button-1': parseInput('1'); break;
        case 'button-2': parseInput('2'); break;
        case 'button-3': parseInput('3'); break;
        case 'button-4': parseInput('4'); break;
        case 'button-5': parseInput('5'); break;
        case 'button-6': parseInput('6'); break;
        case 'button-7': parseInput('7'); break;
        case 'button-8': parseInput('8'); break;
        case 'button-9': parseInput('9'); break;
    }
}

function operationButton(e) {
    switch (e.target.id) {
        case 'button-slash': assignOperator(divide); break;
        case 'button-star': assignOperator(multiply); break;
        case 'button-minus': assignOperator(subtract); break;
        case 'button-plus': assignOperator(add); break;
    }
}

function modifyButton(e) {
    switch(e.target.id) {
        case 'button-clear': clearCalc('0'); break;
        case 'button-plus-minus': changeSign(); break;
        case 'button-dot': useDecimal(); break;
    }
}

function evaluateButton(e) {
    assignNumber();
    aNumber = operate(aNumber, calcOperation, bNumber);
}

function parseInput(i) {
    input += i;
    calcDisplay.textContent = input;
}
function assignNumber() {
    if (input === '') return;
    if (calcOperation === blankOperation) {
       aNumber = parseFloat(input);
       calcDisplay.textContent = aNumber.toString();
    } else {
        bNumber = parseFloat(input);
        calcDisplay.textContent = bNumber.toString();
    }
    input = '';
}

function assignOperator(op) {
    assignNumber();
    decimalButton.disabled = false;
    if (!isNaN(bNumber)) {
        aNumber = operate(aNumber, calcOperation, bNumber);
    }
    calcOperation = op;
}

function operate(a, operator, b) {
    if (calcOperation === blankOperation) return a;
    if (isNaN(b)) {
        clearCalc(a);
        return a;
    }
    value = operator(a,b);
    if (value === "error") {
        return 0;
    }
    clearCalc(value);
    console.log(value);
    return value;
}
function clearCalc(a) {
    input = '';
    aNumber = a;
    bNumber = NaN;
    calcOperation = blankOperation;
    decimalButton.disabled = false;
    calcDisplay.textContent = aNumber.toString();        
}

function changeSign() {
    input = parseFloat(aNumber * -1).toString();
}

function useDecimal() {
    input += '.';
    decimalButton.disabled = true;
}
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
    if (b === 0) {
        calcDisplay.textContent = "ERROR - can't divide by zero!";
        aNumber = 0;
        bNumber = NaN;
        input = '';
        calcOperation = blankOperation;
        decimalButton.disabled = false;
        return "error";
    }
    return a / b;
}

function blankOperation() {
    return;
}
