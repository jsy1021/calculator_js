import { Display } from '../ui/Display.js';

export class Calculator {
  constructor() {
    this.currentInput = '';
    this.lastInputIsOperator = false;
    this.display = new Display(); // Display 클래스 사용
  }

  clear() {
    this.currentInput = '';
    this.lastInputIsOperator = false;
    this.display.clearDisplays();
  }

  appendInput(value) {
    let operators = new Set(['+', '-', '*', '/', '%']);

    if (operators.has(value)) {
      if (this.currentInput === '' || this.lastInputIsOperator) return;
      this.lastInputIsOperator = true;
    } else {
      this.lastInputIsOperator = false;
    }

    this.currentInput += value;
    this.display.updateInputDisplay(this.currentInput);
  }

  calculateResult() {
    let result = this.calculate(this.currentInput);
    this.display.updateOutputDisplay(result);
    this.currentInput = '';
    this.lastInputIsOperator = false;
  }

  calculate(expression) {
    //연산
    let operators = new Set(['+', '-', '*', '/', '%']);
    let tokens = [];
    let numberBuffer = '';

    for (let char of expression) {
      if (operators.has(char)) {
        if (numberBuffer) tokens.push(numberBuffer);
        tokens.push(char);
        numberBuffer = '';
      } else {
        numberBuffer += char;
      }
    }
    if (numberBuffer) tokens.push(numberBuffer);

    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      let operator = tokens[i];
      let nextNumber = parseFloat(tokens[i + 1]);

      switch (operator) {
        case '+':
          result += nextNumber;
          break;
        case '-':
          result -= nextNumber;
          break;
        case '*':
          result *= nextNumber;
          break;
        case '/':
          if (nextNumber === 0) return 'Error';
          result /= nextNumber;
          break;
        case '%':
          if (nextNumber === 0) return 'Error';
          result %= nextNumber;
          break;
        default:
          return 'Error';
      }
    }
    return result;
  }
}
