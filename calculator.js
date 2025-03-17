document.addEventListener('DOMContentLoaded', function () {
  console.log('dom이 준비되었습니다. ');

  function Calculator() {
    this.currentInput = '';
    this.inputDisplay = document.getElementById('input_display');
    this.outputDisplay = document.getElementById('output_display');
  }

  Calculator.prototype.init = function () {
    document.querySelectorAll('td').forEach((button) => {
      //콜백 함수 추가
      button.addEventListener('click', (event) =>
        this.handleButtonClick(event.target.textContent)
      );
    });
  };
  Calculator.prototype.clear = function () {
    this.currentInput = ''; //입력값 초기화
    this.outputDisplay.value = '';
    this.updateDisplay();
  };
  Calculator.prototype.calculateResult = function () {
    this.outputDisplay.value = '';
    this.currentInput = ''; //계산후 input값은 비워둠
  };

  Calculator.prototype.appendInput = function (value) {
    //input값 입력추가 메서드
    let operator = new Set(['+', '-', '*', '/', '%']); //연산자 종류 set
    if (operator.has(value)) {
      if (this.currentInput === '') return; //입력값이 없는 상태일 때 연산자 입력시 함수 종료
    }
    this.currentInput += value;
    this.updateDisplay(); //값 추가시 추가된 input 업데이트 메서드
  };

  Calculator.prototype.updateDisplay = function () {
    this.inputDisplay.value = this.currentInput;
  };
  Calculator.prototype.handleButtonClick = function (value) {
    switch (value) {
      case 'AC':
        console.log('초기화');
        this.clear();
        break;
      case '=':
        this.calculateResult();
        break;
      default:
        this.appendInput(value);
        break;
    }
  };
  Calculator.prototype.calculate = function (expression) {
    let operators = new Set(['+', '-', '*', '/', '%']);
    let tokens = [];
    let numberBuffer = '';

    for (let char of expression) {
      if (operators.has(char)) {
        //연산자가 포함되어 있는 경우
        if (numberBuffer) tokens.push(numberBuffer);
        tokens.push(char);
        numberBuffer = '';
      } else {
        numberBuffer += char;
      }
    }
    if (numberBuffer) tokens.push(numberBuffer);
    let result = parseFloat(tokens[0]); //parseFlaot은 소숫점연산도 처리하기 위함
    for (let i = 1; i < tokens.length; i += 2) {
      let operator = tokens[i]; //연산자는 홀수 인덱스에 위치
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
          if (nextNumber === 0)
            //0으로는 나눌 수 없으므로 에러 처리
            return 'Error';
          result /= nextNumber;
          break;
        case '%':
          if (nextNumber === 0)
            //0으로 나눌 수 없으므로 에러 처리
            return 'Error';
          result %= nextNumber;
          break;
        default:
          return 'Error';
      }
    }
    return result;
  };
  const calculate = new Calculator(); //생성자를 통한 초기화
  calculate.init();
});
