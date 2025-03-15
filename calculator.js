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
    this.updateDisplay();
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

  const calculate = new Calculator(); //생성자를 통한 초기화
  calculate.init();
});
