
export class Wallet {

  constructor(e) {
    this.elementID = e;
    this.createConection();
    this.start();
  }

  createConection() {
    if (!document.querySelector(`#${this.elementID}`)) return; 
    this.element = document.querySelector(`#${this.elementID}`);
  }

  start() {
    const cash = [
      {value: 100000, number: 1},
      {value: 50000, number: 1},
      {value: 20000, number: 1},
      {value: 10000, number: 1},
      {value: 5000, number: 1},
      {value: 2000, number: 1},
      {value: 1000, number: 1},
    ];

    cash.forEach((c, index) => this.renderCashOnWallet(c.value, index));
  }
  
  renderCashOnWallet(value, index) {
    this.element.innerHTML += 
    `<div 
      data-value="${value}" 
      class="billete billete-${value} billete-billetera"
      style="top: ${70 * index}px; left: -30px"
    >
      <div class="billete-sombra">
        <h1 class="billete__value" id="valor">
          $ ${Intl.NumberFormat().format(value)}
        </h1>
      </div>
    </div>`
  }

}