import { Calculator } from './core/Calculator.js';
import { Display } from './ui/Display.js';
import { setupCalculator } from './handlers/eventHandler.js'; // 함수 방식으로 변경

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM 로드 완료!');

  const display = new Display();
  const calculator = new Calculator(display);

  setupCalculator(calculator);
});
