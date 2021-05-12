
import { ATM } from './classes/cajero.class.js';
import { Cash } from './classes/billete.class.js';
import { Wallet } from './classes/billetera.class.js';


Cash.doInteractive();
const cajero = new ATM();
const billetera = new Wallet('billetera');
