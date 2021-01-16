

const txtCantidadDeseata = document.getElementById('cantidad-deseada')
const eliminar = document.getElementById('eliminar')
let numCantDeseada = ""

document.getElementById('btn-1').addEventListener('click',()=>{
  mostrarNumeroDigitado('1')
})
document.getElementById('btn-2').addEventListener('click',()=>{
  mostrarNumeroDigitado('2')
})
document.getElementById('btn-3').addEventListener('click',()=>{
  mostrarNumeroDigitado('3')
})
document.getElementById('btn-4').addEventListener('click',()=>{
  mostrarNumeroDigitado('4')
})
document.getElementById('btn-5').addEventListener('click',()=>{
  mostrarNumeroDigitado('5')
})
document.getElementById('btn-6').addEventListener('click',()=>{
  mostrarNumeroDigitado('6')
})
document.getElementById('btn-7').addEventListener('click',()=>{
  mostrarNumeroDigitado('7')
})
document.getElementById('btn-8').addEventListener('click',()=>{
  mostrarNumeroDigitado('8')
})
document.getElementById('btn-9').addEventListener('click',()=>{
  mostrarNumeroDigitado('9')
})
document.getElementById('btn-0').addEventListener('click',()=>{
  mostrarNumeroDigitado('0')
})

eliminar.addEventListener('click',()=>{
  numCantDeseada = numCantDeseada.substring(0, numCantDeseada.length - 1)
  txtCantidadDeseata.innerHTML = Intl.NumberFormat().format(numCantDeseada) 
})

function mostrarNumeroDigitado(a) {
  numCantDeseada = numCantDeseada + a
  txtCantidadDeseata.innerHTML = Intl.NumberFormat().format(numCantDeseada)
}
