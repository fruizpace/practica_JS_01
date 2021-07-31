import {paises} from './teams.js';
import Liga from './classes/Liga.js';

// Paso 1: Escribe el nombre de la Liga de futbol y dale una lista de países.
const ligaDeFutbol = new Liga('LA EUROCOPA', paises);
// Paso 2: ¿Quieres saber quien ganará? Let's Play!
ligaDeFutbol.letsPlay();