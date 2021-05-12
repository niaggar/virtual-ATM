
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js';


export class Cash {

  constructor(value, number) {
    this.value = value;
    this.number = number;
  }

  static doInteractive() {
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
  }
}
