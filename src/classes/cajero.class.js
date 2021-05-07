
import { Screen } from './pantalla.class.js';
import { Keyboard } from './teclado.class.js';


export class ATM {
  
  constructor(typesOfCash) {
    this.cash = typesOfCash;
    this.aviable = 0;
    this.cashAviable()
    this.createVirtualATM();
  }

  createVirtualATM() {
    this.withdrawal = document.querySelector("#withdrawal");
    this.keyboard = new Keyboard('keyboard', this);
    this.screen = new Screen('screen', this);
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
