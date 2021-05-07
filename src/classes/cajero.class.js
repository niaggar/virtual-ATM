
export class ATM {
  
  constructor() {
    this.cash = [];
    this.aviable = 0;
    this.createVirtualATM();
    this.addKeyboardEvent();
  }

  buildCash(typesOfCash) {
    this.cash = typesOfCash;
  }

  createVirtualATM() {
    this.withdrawal = document.querySelector("#withdrawal");
    this.keyboard = document.querySelector("#keyboard");
    this.screen = document.querySelector("#screen");
  }

  addKeyboardEvent() {
    this.keyboard.addEventListener('click', this.detectButtonClicked);
  }

  removeKeyboardEvent() {
    this.keyboard.removeEventListener('click', this.detectButtonClicked);
  }

  detectButtonClicked(e) {
    if (e.target.dataset.value) {
      console.log(e.target.dataset.value);
    }
  }

  cashAviable() {
    this.aviable = 0;
    this.cash.forEach((element) => {
      this.aviable += (element.value * element.number);
    });
  }

  retireCash(required) {
    let moneyToGive = [];
    // Verifica cuantos billetes hay que dar segun el valor
    this.cash.forEach((element, index) => {
      this.cashAviable();
      // Continua solo si el dinero disponible es suficiente
      if (required <= this.aviable) {
        // Determina cuantos billetes son necesarios
        let quatity = Math.floor(required / element.value);
        // Si los billetes necesarios son mayores a los disponibles
        // entrega unicamente los disponibles
        if (quatity > element.number) { quatity = element.number; }
        // Agrega a la lista cuantos billetes toca entregar
        moneyToGive.push({
          value: element.value,
          number: quatity,
        });
        // Resta a la caja el dinero que se piensa retirar
        element.number -= quatity;
        // Resta al dinero requerido el que ya se organizo
        required -= (element.value * quatity); 
      } else {
        console.log('We don\'t have more money :(');
      }
    });
    if (required == 0) {
      console.log('You are going to recive all!');
    } else {
      console.log('Mmmm we can\'t give you all');
    }
    return moneyToGive;
  }

}
