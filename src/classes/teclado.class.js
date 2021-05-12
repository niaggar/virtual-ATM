
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
    let target = e.target.dataset.value;
    switch (this.ATM.state) {
      case 'main':
        this.detecButtonMainMenu(target);
        break;
    
      case 'retire':
        this.detectButtonRetire(target);
        break;

      case 'recharge':
        this.detectButtonRecharge(target);
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
      
      case 'cancel':
        this.ATM.screen.renderMainMenu();
        break;
    }
  }

  detectButtonRetire(clicked) {
    switch (clicked) {
      case 'enter':
        this.ATM.screen.updateTxtRetireMoney(0);
        this.ATM.retireCash(parseInt(this.numberToRetire));
        this.numberToRetire = '';
        break;

      case 'delete':
        this.numberToRetire = this.numberToRetire.substring(0, this.numberToRetire.length - 1);
        this.ATM.screen.updateTxtRetireMoney(this.numberToRetire);
        break;

      case 'cancel':
        this.ATM.screen.renderMainMenu();
        break;
    
      default:
        if (!parseInt(clicked) && clicked != '0') return
        this.numberToRetire += clicked;
        this.ATM.screen.updateTxtRetireMoney(this.numberToRetire);
        break;
    }
  }

  detectButtonRecharge(clicked) {
    switch (clicked) {
      case 'enter':
        this.ATM.updateCash(this.ATM.withdrawal.cashToEnter);
        this.ATM.withdrawal.cashToEnter = [];
        this.ATM.screen.updateRechargeMoney(0);
        this.ATM.cashAviable();
        this.ATM.screen.updateBalance();
        break;

      case 'cancel':
        this.ATM.renderTheCash(this.ATM.withdrawal.cashToEnter);
        this.ATM.screen.renderMainMenu();
        break;
    }
  }

}
