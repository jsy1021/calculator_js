export class Display {
  constructor() {
    this.inputDisplay = document.getElementById('input_display');
    this.outputDisplay = document.getElementById('output_display');
  }

  updateInputDisplay(value) {
    this.inputDisplay.value = value;
  }

  updateOutputDisplay(value) {
    this.outputDisplay.value = value;
  }

  clearDisplays() {
    this.inputDisplay.value = '';
    this.outputDisplay.value = '';
  }
}
