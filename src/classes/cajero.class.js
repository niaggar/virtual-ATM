
import { Screen } from './pantalla.class.js';
import { Keyboard } from './teclado.class.js';
import { Cash } from './billete.class.js';
import { Withdrawal } from './rendija.class.js';


export class ATM {
  
  constructor(typesOfCash) {
    this.cash = typesOfCash || [
      new Cash(100000, 5),
      new Cash(50000, 5),
      new Cash(20000, 5),
      new Cash(10000, 5),
      new Cash(5000, 5),
      new Cash(2000, 5),
      new Cash(1000, 5),
    ];
    this.aviable = 0;
    this.state = 'main';
    this.cashAviable();
    this.createVirtualATM();
  }

  createVirtualATM() {
    this.withdrawal = new Withdrawal('withdrawal', this);
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
        moneyToGive.push({ value: element.value, number: quatity });
        element.number -= quatity;
        required -= (element.value * quatity); 
      } else {
        console.log('We don\'t have more money :(');
      }
    });
    this.screen.updateBalance();
    this.renderTheCash(moneyToGive);
  }

  renderTheCash(moneyToGive) {
    let space = 0;
    moneyToGive.forEach(element => {
      if (element.number > 0) {
        for (let a = 1; a <= element.number; a++) {
          this.withdrawal.renderRetireCash(element.value, space);
          space += 5
        }
      }
    });
  }

  updateCash(listOfCash) {
    listOfCash.forEach((cash, index) => {
      if (!cash.number) return;
      this.cash.map((c) => {
        if (c.value == cash.value) c.number += cash.number;
      })
    });
  }

}
