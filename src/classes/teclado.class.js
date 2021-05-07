
export class Keyboard {

  constructor(e, ATM) {
    this.elementID = e;
    this.ATM = ATM;
    this.setBind();
    this.createConection();
    this.addKeyboardEvent();
  }

  setBind() {
    this.detectButtonClicked = this.detectButtonClicked.bind(this);
    this.detecButtonMainMenu = this.detecButtonMainMenu.bind(this);
  }
  
  createConection() {
    this.element = document.querySelector(`#${this.elementID}`);
  }

  addKeyboardEvent() {
    this.element.addEventListener('click', this.detectButtonClicked);
  }
  
  removeKeyboardEvent() {
    this.element.removeEventListener('click', this.detectButtonClicked);
  }
  
  detectButtonClicked(e) {
    this.detecButtonMainMenu(e.target.dataset.value);
  }
  
  detecButtonMainMenu(clicked) {
    switch (clicked) {
      case 'der':
        this.ATM.screen.changeOption('recargar');
        break;
      case 'izq':
        this.ATM.screen.changeOption('retirar');
        break;
    }
  }

}
