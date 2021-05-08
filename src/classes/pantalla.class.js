
export class Screen {

  constructor(e, ATM) {
    this.elementID = e;
    this.ATM = ATM;
    this.setBind();
    this.createConection();
    this.renderMainMenu();
  }

  setBind() {
    this.changeOption = this.changeOption.bind(this);
    this.addSelectedAnimation = this.addSelectedAnimation.bind(this);
  }

  createConection() {
    if (!document.querySelector(`#${this.elementID}`)) 
      return console.error('Sreen doesn\'t exist');
    this.element = document.querySelector(`#${this.elementID}`);
  }

  renderBalance() {
    return `
    <div class="pantalla__saldo">
      <p class="pantalla__text">
        Saldo: <br> 
        <span id="saldo" class=" pantalla__text pantalla__text-important">
          ${Intl.NumberFormat().format(this.ATM.aviable)}
        </span>
      </p> 
    </div>`;
  }

  updateBalance() {
    if (!document.querySelector('#saldo')) return;
    document
      .querySelector('#saldo')
      .innerHTML = Intl.NumberFormat().format(this.ATM.aviable);
  }

  renderMainMenu() {
    if (this.menuSelectedAnimation) clearInterval(this.menuSelectedAnimation);
    this.ATM.state = 'main';
    this.ATM.keyboard.numberToRetire = ''
    this.element.innerHTML = 
    `<div class="pantalla main-menu"> 
      ${this.renderBalance()}
      <div class="pantalla__cont-opciones">
        <p class="pantalla__text pantalla__text-important">
          ¿Que acción desea realizar?
        </p>
        <div class="opciones">
          <div id="retirar" class="opcion__retirar opcion__seleccionada">
            <p>Retirar</p>
          </div>
          <div id="recargar" class="opcion__recargar">
            <p>Reacargar</p>
          </div>
        </div>
      </div>
    </div>`;
    this.addSelectedAnimation();
  }

  addSelectedAnimation() {
    this.menuSelectedAnimation = setInterval(() => {
      document
        .querySelector('.opcion__seleccionada')
        .classList
        .toggle('titilar');
    }, 500);
  }

  changeOption(option) {
    if (!document.querySelector('.opciones')) return;
    switch (option) {
      case 'retirar':
        clearInterval(this.menuSelectedAnimation);
        document
          .querySelector(`#${option}`)
          .classList
          .add('opcion__seleccionada');
        document
          .querySelector(`#recargar`)
          .classList
          .remove('opcion__seleccionada', 'titilar');
        this.addSelectedAnimation();
        break;
    
      case 'recargar':
        clearInterval(this.menuSelectedAnimation);
        document
          .querySelector(`#${option}`)
          .classList
          .add('opcion__seleccionada')
        document
          .querySelector(`#retirar`)
          .classList
          .remove('opcion__seleccionada', 'titilar');
        this.addSelectedAnimation();
        break;
        
      case 'enter':
        clearInterval(this.menuSelectedAnimation);
        if (document.querySelector('.opcion__seleccionada').id == 'retirar') {
          this.ATM.state = 'retire';
          this.renderRetireMoney()
        } else if (document.querySelector('.opcion__seleccionada').id == 'recargar') {
          this.ATM.state = 'recharge';
          this.renderRechargeMoney()
        }
        break;
    }
  }

  renderRetireMoney() {
    this.element.innerHTML = 
    `<div class="pantalla retirar">
      ${this.renderBalance()}
      <div class="pantalla__cont-retirar">
        <p class="pantalla__text pantalla__text-important">
          Ingrese la cantidad de dinero que desesa retirar:
        </p>
        <div class="pantalla__cant-deseada">
          $ <span id="cantidad-deseada">0</span>
        </div>
      </div>
    </div>`;
  }

  updateTxtRetireMoney(value) {
    if (!document.querySelector('#cantidad-deseada')) return;
    document
      .querySelector('#cantidad-deseada')
      .innerHTML = Intl.NumberFormat().format(value);
  }

  renderRechargeMoney() {
    this.element.innerHTML = 
    `<div class="pantalla main-menu">
      Recharge:
      ${this.renderBalance()}
    </div>`;
  }
  
}
