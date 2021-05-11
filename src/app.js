
import { ATM } from './classes/cajero.class.js';
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js';

const cajero = new ATM();



interact('.billete')
  .draggable({
    // inertia: true,
    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,
    },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: '.contenedor',
        endOnly: true
      })
    ],
  })

interact('.atm__dinero')
  .dropzone({
    accept: '.billete',
    overlap: 0.75,
    ondrop: function (event) {
      // alert(event.relatedTarget.id + ' was dropped into ' + event.target.id);
      event.relatedTarget.remove()
    },
    ondropactivate: function (event) {
      event.target.classList.add('atm__dinero-active')
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove('atm__dinero-active')
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}