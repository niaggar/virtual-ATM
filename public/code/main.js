
const calcularBtn = document.querySelector( '#enter' )
const saldo = document.querySelector( "#saldo-valor" )

let dineroDeseado
let dineroDisponible

class billete {
  constructor( valor, cantidad, deseados ) {
    this.valor = valor,
    this.cantidad = cantidad,
    this.deseados = deseados
  }
}

let caja = [
  new billete( 100000, 10 ),
  new billete( 50000, 23 ),
  new billete( 20000, 31 ),
  new billete( 10000, 21 ),
  new billete( 5000, 10 ),
  new billete( 2000, 15 ),
  new billete( 1000, 20 )
]

saldo.innerHTML = Intl.NumberFormat().format(contarDineroDisponible()) 

//Evento que lanza el programa al presionar el boton
calcularBtn.addEventListener( 'click', () => {
  dineroDeseado = parseInt(numCantDeseada)
  dineroDisponible = contarDineroDisponible()
  console.log( dineroDisponible )
  calcularDineroParaDar()
  for (a in caja) {
    if (caja[a].deseados > 0) {
      console.log(caja[a].valor + " = " + caja[a].deseados)
      caja[a].cantidad = caja[a].cantidad - caja[a].deseados
    }
  }
  saldo.innerHTML = Intl.NumberFormat().format(contarDineroDisponible())
} )

//Calcula la minima cantidad de billetes que se entregan
function calcularDineroParaDar() {
  for ( a in caja ) {
    if ( dineroDeseado <= dineroDisponible ) {
      caja[a].deseados = Math.floor( dineroDeseado / caja[a].valor )
      if ( caja[a].cantidad < caja[a].deseados ) {
        caja[a].deseados = caja[a].cantidad
      }
    } else {
      caja[a].deseados = 0
    }
    dineroDeseado = dineroDeseado - ( caja[a].deseados * caja[a].valor )
  }
}

//Cuenta el dinero disponible en la caja 
function contarDineroDisponible() {
  let dinero = 0
  for( a in caja ) {
    dinero = dinero + ( caja[a].valor * caja[a].cantidad )
  }
  return dinero
}
