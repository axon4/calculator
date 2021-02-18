const calculatorDisPlay = document.querySelector('h1');
const inPutButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-button');

const calculate = {
	'/': (firstNumber, secondNumber) => firstNumber / secondNumber,
	'*': (firstNumber, secondNumber) => firstNumber * secondNumber,
	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
	'=': (firstNumber, secondNumber) => secondNumber
};

let firstValue = 0;
let operatorValue = '';
let aWaitingNextValue = false;

function sendNumberValue(number) {
	if (aWaitingNextValue) {
		calculatorDisPlay.textContent = number;
		aWaitingNextValue = false;
	} else {
		const displayValue = calculatorDisPlay.textContent;

		calculatorDisPlay.textContent = displayValue === '0' ? number : displayValue + number;
	};
};

function addDecimal() {
	if (aWaitingNextValue) return;

	if (!calculatorDisPlay.textContent.includes('.')) {
		calculatorDisPlay.textContent = `${calculatorDisPlay.textContent}.`;
	};
};

function useOperator(operator) {
	const currentValue = Number(calculatorDisPlay.textContent);

	if (operatorValue && aWaitingNextValue) {
		operatorValue = operator;

		return;
	};

	if (!firstValue) {
		firstValue = currentValue;
	} else {
		const calculation = calculate[operatorValue](firstValue, currentValue);

		calculatorDisPlay.textContent = calculation;
		firstValue = calculation;
	};
	
	aWaitingNextValue = true;
	operatorValue = operator;
};

function reSet() {
	firstValue = 0;
	operatorValue = '';
	aWaitingNextValue = false;
	calculatorDisPlay.textContent = '0';
};

inPutButtons.forEach(inPutButton => {
	if (inPutButton.classList.length === 0) {
		inPutButton.addEventListener('click', () => {sendNumberValue(inPutButton.value)});
	} else if (inPutButton.classList.contains('operator')) {
		inPutButton.addEventListener('click', () => {useOperator(inPutButton.value)});
	} else if (inPutButton.classList.contains('decimal')) {
		inPutButton.addEventListener('click', addDecimal);
	};
});

clearButton.addEventListener('click', reSet);