let result = document.getElementById('result');
let operator = '';
let operand1 = '';
let operand2 = '';

function appendNumber(number) {
  result.value += number;
}

function setOperator(op) {
  operator = op;
  operand1 = result.value;
  result.value = '';
}

function calculate() {
  operand2 = result.value;
  let res = eval(operand1 + operator + operand2);
  result.value = res;
}

function clearResult() {
  result.value = '';
  operator = '';
  operand1 = '';
  operand2 = '';
}
