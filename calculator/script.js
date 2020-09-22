class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.pow = false;
        this.error = false;
        this.previousInMemory = '';
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.pow = false;
        this.error = false;
    }

    delete() {
        if (this.currentOperand !=='0') {
            this.currentOperand = this.currentOperand.slice(0,-1);
        }
    }

    switchDisplayToPow() {
        this.pow =true;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (number === '.' && this.currentOperand === '') this.currentOperand = '0';
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.currentOperand !=='') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculateCurrent(operator) {
        let calculation;
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        switch (operator) {
            case 'sqrt':
                calculation = Math.sqrt(current);
                break;
            case 'plusmn':
                calculation = current * (-1);
                break;
            default:
                return;
        }
        if (isNaN(calculation)) {
            this.error = true;
            return;
        }    
        this.currentOperand = calculation;
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '÷':
                calculation = prev / current;
                break;
            default:
                return;
        }
        // this.readyToReset = true;
        if (isNaN(calculation)) {
            this.error = true;
            return;
        }    
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = '';            
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
          integerDisplay = '';
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } else {
          return integerDisplay;
        }
      }
    
    updateDisplay() {
        if (this.pow) {
            
            return;
        }

        if (this.error) {
            this.clear();
            this.currentOperandTextElement.innerText = 'Error';
        } else this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operator]');
const equalButton = document.querySelector('[equal]');
const deleteButton = document.querySelector('[delete]');
const allClearButton = document.querySelector('[all-clear]');
const plusmnButton = document.querySelector('[plusmn]');
const sqrtButton = document.querySelector('[sqrt]');
const powButton = document.querySelector('[pow]');
const previousOperandTextElement = document.querySelector('[previous-operand]');
const currentOperandTextElement = document.querySelector('[current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

plusmnButton.addEventListener('click', () => {
    calculator.calculateCurrent('plusmn');
    calculator.updateDisplay();
});

sqrtButton.addEventListener('click', () => {
    calculator.calculateCurrent('sqrt');
    calculator.updateDisplay();
});

powButton.addEventListener('click', () => {
    calculator.pow = true;
    calculator.updateDisplay();
});