
import { ATM } from './classes/cajero.class.js';
import { Cash } from './classes/billete.class.js';


const cajero = new ATM([
  new Cash(10000, 5),
  new Cash(5000, 10),
  new Cash(1000, 5),
]);



console.log(cajero.cash);
