const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operation');
const modifierButtons = document.querySelectorAll('.modify');  
const evaluateButtons = document.querySelectorAll('.evaluate');
numberButtons.forEach(button => button.addEventListener('click', numberButton));
operatorButtons.forEach(button => button.addEventListener('click', operationButton));
modifierButtons.forEach(button => button.addEventListener('click', modifyButton));
evaluateButtons.forEach(button => button.addEventListener('click', evaluateButton));
const decimalButton = document.querySelector('#button-dot');
let input = '';
let aNumber = NaN;
let bNumber = NaN;
let calcOperation = blankOperation;

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
    console.log(`input: ${input}, a: ${aNumber}, operator: ${calcOperation()} b: ${bNumber}`);
}

function operationButton(e) {
    switch (e.target.id) {
        case 'button-slash': assignOperator(divide); break;
        case 'button-star': assignOperator(multiply); break;
        case 'button-minus': assignOperator(subtract); break;
        case 'button-plus': assignOperator(add); break;
    }
    console.log(calcOperation);
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
    operate(aNumber, calcOperation, bNumber);
}

function parseInput(i) {
    input += i;
}
function assignNumber() {
    if (input === '') return;
    if (calcOperation === blankOperation) {
       aNumber = parseFloat(input);
       input = '';
    } else {
        bNumber = parseFloat(input);
        input = '';
    }
}

function assignOperator(op) {
    assignNumber();
    if (bNumber !== NaN) {
        aNumber = operate(aNumber, calcOperation, bNumber);
    } 
    calcOperation = op;
    decimalButton.disabled = false;
}

function operate(a, operator, b) {
    if (calcOperation === blankOperation) return a;
    if (b === NaN) {
        clearCalc(a);
        return a;
    }
    value = operator(a,b);
    clearCalc(value);
    console.log(value);
    return value;
}
function clearCalc(a) {
    input = '';
    aNumber = a;
    bNumber = NaN;
    calcOperation = blankOperation;
    document.querySelector('#button-dot').disabled = false;
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
    return a / b;
}

function blankOperation() {
    return;
}
