
export class Keyboard {

  constructor(e, ATM) {
    this.elementID = e;
    this.numberToRetire = '';
    this.ATM = ATM;
    this.setBind();
    this.createConection();
    this.addKeyboardEvent();
  }

  setBind() {
    this.detectButtonClicked = this.detectButtonClicked.bind(this);
    this.detecButtonMainMenu = this.detecButtonMainMenu.bind(this);
    this.detectButtonRecharge = this.detectButtonRecharge.bind(this);
    this.detectButtonRetire = this.detectButtonRetire.bind(this);
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
    if (e.target.dataset.value == 'cancel') return this.ATM.screen.renderMainMenu();
    switch (this.ATM.state) {
      case 'main':
        this.detecButtonMainMenu(e.target.dataset.value);
        break;
    
      case 'retire':
        this.detectButtonRetire(e.target.dataset.value);
        break;

      case 'recharge':
        this.detectButtonRecharge(e.target.dataset.value);
        break;
    }
  }
  
  detecButtonMainMenu(clicked) {
    switch (clicked) {
      case 'der':
        this.ATM.screen.changeOption('recargar');
        break;
      case 'izq':
        this.ATM.screen.changeOption('retirar');
        break;
      case 'enter':
        this.ATM.screen.changeOption('enter');
        break;
    }
  }

  detectButtonRetire(clicked) {
    if (clicked == 'enter') {
      this.ATM.screen.updateTxtRetireMoney(0);
      this.ATM.retireCash(parseInt(this.numberToRetire));
      this.numberToRetire = '';
    } else if (clicked == 'delete') {
      this.numberToRetire = this.numberToRetire.substring(0, this.numberToRetire.length - 1);
      this.ATM.screen.updateTxtRetireMoney(this.numberToRetire);
    } else if (!parseInt(clicked) && clicked != '0') {
      return
    } else {
      this.numberToRetire += clicked;
      this.ATM.screen.updateTxtRetireMoney(this.numberToRetire);
    }
  }

  detectButtonRecharge() {}

}
