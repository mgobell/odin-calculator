const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operation');
const modifierButtons = document.querySelectorAll('.modify');  
const evaluateButtons = document.querySelectorAll('.evaluate');
numberButtons.forEach(button => button.addEventListener('click', numberButton));
operatorButtons.forEach(button => button.addEventListener('click', operationButton));
modifierButtons.forEach(button => button.addEventListener('click', modifyButton));
evaluateButtons.forEach(button => button.addEventListener('click', evaluateButton));
let aNumber = '0';
let bNumber = '';
let calcOperation = blankOperation;

function numberButton(e) {
    switch(e.target.id) {
        case 'button-0': assignNumber('0'); break;
        case 'button-1': assignNumber('1'); break;
        case 'button-2': assignNumber('2'); break;
        case 'button-3': assignNumber('3'); break;
        case 'button-4': assignNumber('4'); break;
        case 'button-5': assignNumber('5'); break;
        case 'button-6': assignNumber('6'); break;
        case 'button-7': assignNumber('7'); break;
        case 'button-8': assignNumber('8'); break;
        case 'button-9': assignNumber('9'); break;
    }
    console.log(`a: ${aNumber} b: ${bNumber}`);
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
    operate(aNumber, calcOperation, bNumber);
}


function assignNumber(number) {
    if (calcOperation === blankOperation) {
       aNumber += number; 
       aNumber = parseFloat(aNumber).toString();
    } else {
        bNumber += number;
        bNumber = parseFloat(bNumber).toString();
    }
}

function assignOperator(op) {
    if (bNumber !== '') {
        aNumber = operate(parseFloat(aNumber), calcOperation, parseFloat(bNumber));
    } 
    calcOperation = op;
}

function operate(a, operator, b) {
    if (calcOperation === blankOperation) return a;
    if (b === '') {
        clearCalc(a);
        return a;
    }
    value = operator(parseFloat(a),parseFloat(b));
    value.toString();
    clearCalc(value);
    console.log(value);
    return value;
}
function clearCalc(a) {
    aNumber = a;
    bNumber = '';
    calcOperation = blankOperation;
}

function changeSign() {

}

function useDecimal() {
    if (calcOperation === blankOperation) {
        aNumber += '.';
    } else {
        bNumber += '.';
    }
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
