class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.powOperation = false;
        this.error = false;
        this.previousInMemory = '';
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.previousInMemory = '';
        this.operation = undefined;
        this.powOperation = false;
        this.error = false;
    }

    delete() {
        if (this.currentOperand !=='0') {
            this.currentOperand = this.currentOperand.slice(0,-1);
            if (this.currentOperand == '') this.currentOperand = '0';
        }
    }

    switchDisplayToPow() {
        this.powOperation = true;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (number === '.' && this.currentOperand === '') this.currentOperand = '0';
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        this.calculate();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    calculatePow() {
        let calculation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        calculation = Math.pow(prev, current);
        this.powOperation = false;
        if (isNaN(calculation)) {
            this.error = true;
            return;
        }    
        this.currentOperand = calculation;
        console.log(prev + '^' + current + '='+calculation);
        this.previousOperand = this.previousInMemory;
        this.previousInMemory = '';
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
    	console.log('calc');
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
        console.log(prev + this.operation + current + '='+calculation);
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
        if (this.powOperation) {
			if (this.operation === undefined && this.previousOperand === '') {
				this.previousOperand = this.currentOperand;
				this.currentOperand = '0';
			}     	
        	if (this.previousInMemory === '' && this.operation != undefined) {
                this.previousInMemory = this.previousOperand;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '0';
        	}

        	if (this.operation != undefined) {
        		this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousInMemory)} ${this.operation} ${this.getDisplayNumber(this.previousOperand)} ^`;	
        	} else {
        		this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ^`;
        	}

            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
            return;
        }

        if (this.error) {
            this.clear();
            this.currentOperandTextElement.innerText = 'Error';
        } else this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != undefined) {
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
calculator.updateDisplay();

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.powOperation) {
        	calculator.calculatePow();
        }
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
    if (calculator.powOperation) {
        calculator.calculatePow();
    }
	calculator.calculate();
    calculator.updateDisplay();
});

plusmnButton.addEventListener('click', () => {
    calculator.calculateCurrent('plusmn');
    calculator.updateDisplay();
});

sqrtButton.addEventListener('click', () => {
	if (!calculator.powOperation) {
	    calculator.calculateCurrent('sqrt');
	    calculator.updateDisplay();
	}
});

powButton.addEventListener('click', () => {
    calculator.powOperation = true;
    calculator.updateDisplay();
});