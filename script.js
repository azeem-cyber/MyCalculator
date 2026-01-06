function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab-button");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  
  if (tabName === 'scientific-tab') {
    document.body.classList.add('sci-bg');
  } else {
    document.body.classList.remove('sci-bg');
  }
}

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.operation = undefined
        this.updateDisplay()
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        if (this.currentOperand === '') {
            this.currentOperand = '0'
        }
        this.updateDisplay()
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString()
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
        this.updateDisplay()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        this.updateDisplay()
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.updateDisplay()
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

class ScientificCalculator extends Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        super(previousOperandTextElement, currentOperandTextElement);
    }

    performUnaryOperation(operation) {
        if (this.currentOperand === '') return;
        let result;
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;

        switch (operation) {
            case 'sin':
                result = Math.sin(Math.PI / 180 * current); // convert to radians
                break;
            case 'cos':
                result = Math.cos(Math.PI / 180 * current); // convert to radians
                break;
            case 'tan':
                result = Math.tan(Math.PI / 180 * current); // convert to radians
                break;
            case 'log':
                result = Math.log10(current);
                break;
            case 'sqrt':
                result = Math.sqrt(current);
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }
}

const previousOperandTextElement = document.getElementById('previous-operand')
const currentOperandTextElement = document.getElementById('current-operand')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

const sciPreviousOperandTextElement = document.getElementById('sci-previous-operand')
const sciCurrentOperandTextElement = document.getElementById('sci-current-operand')
const sciCalculator = new ScientificCalculator(sciPreviousOperandTextElement, sciCurrentOperandTextElement)

function appendNumber(number) { calculator.appendNumber(number) }
function setOperator(operator) { calculator.chooseOperation(operator) }
function calculate() { calculator.compute() }
function clearResult() { calculator.clear() }
function deleteLast() { calculator.delete() }

function sciAppendNumber(number) { sciCalculator.appendNumber(number) }
function sciSetOperator(operator) { sciCalculator.chooseOperation(operator) }
function sciCalculate() { sciCalculator.compute() }
function sciClear() { sciCalculator.clear() }
function sciDelete() { sciCalculator.delete() }
function sciPerformUnaryOperation(operation) { sciCalculator.performUnaryOperation(operation) }

document.getElementsByClassName("tab-button")[0].click();
