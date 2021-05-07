
export class Screen {

  constructor(e, ATM) {
    this.elementID = e;
    this.ATM = ATM;
    this.setBind();
    this.createConection();
    this.initialiceSistem()
  }

  setBind() {
    this.changeOption = this.changeOption.bind(this);
    this.addSelectedAnimation = this.addSelectedAnimation.bind(this);
  }

  createConection() {
    this.element = document.querySelector(`#${this.elementID}`);
  }

  initialiceSistem() {
    this.element.innerHTML = 
    `<div class="pantalla main-menu"> 
      <div class="pantalla__saldo">
        <p class="pantalla__text">
          Saldo: <br> 
          <span id="saldo" class=" pantalla__text pantalla__text-important">
            ${this.ATM.aviable}
          </span>
        </p> 
      </div>
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
    this.mainAnimation = setInterval(() => {
      document
        .querySelector('.opcion__seleccionada')
        .classList
        .toggle('titilar');
    }, 500);
  }

  changeOption(option) {
    switch (option) {
      case 'retirar':
        clearInterval(this.mainAnimation);
        document
          .querySelector(`#${option}`)
          .classList
          .add('opcion__seleccionada');
        document
          .querySelector(`#recargar`)
          .classList
          .remove('opcion__seleccionada', 'titilar');
        this.addSelectedAnimation()
        break;
    
      case 'recargar':
        clearInterval(this.mainAnimation)
        document
          .querySelector(`#${option}`)
          .classList
          .add('opcion__seleccionada')
        document
          .querySelector(`#retirar`)
          .classList
          .remove('opcion__seleccionada', 'titilar');
        this.addSelectedAnimation()
        break;
    }
  }


  
}
