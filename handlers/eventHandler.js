export function setupCalculator(calculator) {
  // ✅ eventHandler 객체를 생성하지 않음
  function handleButtonClick(value) {
    switch (value) {
      case 'AC':
        console.log('초기화');
        calculator.clear();
        break;
      case '=':
        calculator.calculateResult();
        break;
      default:
        calculator.appendInput(value);
        break;
    }
  }

  document.querySelectorAll('td').forEach((button) => {
    button.addEventListener('click', (event) =>
      handleButtonClick(event.target.textContent)
    );
  });
}
