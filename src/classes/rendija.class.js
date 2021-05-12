
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js';


export class Withdrawal {

  constructor(id, ATM) {
    this.ATM = ATM;
    this.elementID = id;
    this.cashToEnter = [];
    this.createConection();
  }

  setBind() {
    this.addEventToAceptMoney = this.addEventToAceptMoney.bind(this)
  }

  createConection() {
    if (!document.querySelector(`#${this.elementID}`)) return;
    this.element = document.querySelector(`#${this.elementID}`);
  }

  renderRetireCash(quatity, space) {
    this.element.innerHTML += `
    <div 
      data-value="${quatity}" 
      style="left: ${space}px" 
      class="billete billete-${quatity}" 
    >
      <div class="billete-sombra">
        <h1 class="billete__value" id="valor">
          $ ${Intl.NumberFormat().format(quatity)}
        </h1>
      </div>
    </div>`
  }

  addEventToAceptMoney() {
    interact('.atm__dinero')
      .dropzone({
        accept: '.billete',
        overlap: 0.75,
        ondrop: (event) => {
          // alert(event.relatedTarget.id + ' was dropped into ' + event.target.id);
          this.detectEnterCashValue(event)
          event.relatedTarget.remove();
        },
        ondropactivate: (event) => {
          event.target.classList.add('atm__dinero-active');
        },
        ondropdeactivate: (event) => {
          event.target.classList.remove('atm__dinero-active');
        }
      })
  }

  removeEventToAceptMoney() {
    interact('.atm__dinero').unset();
  }

  detectEnterCashValue(event) {
    if (!event.relatedTarget.dataset.value) return;
    if (!document.querySelector('#cantidad-ingresar')) return;

    let state = false;
    let value = parseInt(event.relatedTarget.dataset.value);

    this.cashToEnter.map((cash) => {
      if (cash.value == value) {
        cash.number += 1;
        state = true;
      }
    });

    if (!state) this.cashToEnter.push({value: value, number: 1});

    this.ATM.screen.updateRechargeMoney(this.countCashToDisplay());
  }

  countCashToDisplay() {
    let aviable = 0;
    this.cashToEnter.forEach((element) => {
      aviable += (element.value * element.number);
    });

    return aviable;
  }

}
