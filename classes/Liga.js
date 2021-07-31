export default class Liga {
    constructor(name, teams = []) {
        this.name = name;
        this.teams = teams;
        this.size = 16; // tamaño del subgrupo de países que quiero que participen. Por defecto será 16.
        this.misEquipos = this.sampleTeam(this.teams);
    }

    sampleTeam() { // Generar aleatoriamente una lista de 16 países:
    let equipos =  new Set(); // Set permite usar funciones "has" y "add" y se puede transformar a array.

    if (this.teams.length > 16) {
        for (let i = 0; i < this.size; i++) {
            let pais;
            do { pais = this.teams[Math.floor(Math.random() * this.teams.length)]; } // país elegido al azar
            while (equipos.has(pais)); // si es true: el país ya está en EQUIPOS--> out, si es false: añádelo!
            equipos.add(pais);
            }
            return [...equipos]; // crea un Array plano con los mismos valores
        } else { // si la lista es menor de 16 equipos, saldrá este menaje y un ejemplo
            console.log(`\n=========================================================================`);
            console.log(`ERROR: Se necesitan mínimo 16+1 equipos para empezar la Liga.\n`);
            console.log(`( )_( )\n(0__0)\nC(")(") Ejemplo:`);
            console.log(`=========================================================================\n`);
            return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']; // equipos por defecto
        }
    }

    encabezado(tipo_de_final){
        return console.log(`\n==== ${tipo_de_final} ====\n`);
    }

    welcome(){
            console.log(`========================================`);
            console.log(`===== ¡Bienvenidos a ${this.name}! =====`);
            console.log(`============ ¡Comenzamos! ==============`);
            console.log(`========================================`);
            console.log(`( )_( )\n(='.'=)\n(")_(")`);
            console.log(`\n${this.size} Equipos participantes:`);
            console.log(`----------------------------\n`);
    
            for (let i in this.misEquipos) {
                const team = this.misEquipos[i];
                console.log(team);
            }
    }

    matchOctavos(array, tipo_de_final) {
        let n_partidos = array.length/2; // número de partidos que se jugarán
        let partidos = [];
        this.encabezado(tipo_de_final);
    
        for (let i = 0; i < n_partidos; i++) {
        let result = [];
        
        for(let j=0; j < 2; j++) { 
            let index = Math.floor(Math.random() * array.length); // selección al azar
            const team = array[index]; 
            array.splice(index, 1); // una vez elegido, se elimina de la lista
            result.push(team); // guarda los equipos en un array
        }
        partidos.push(result); // guarda lista en "partidos"
        }
        return partidos;
    }

    adjudicarGoles() {
        return Math.floor(Math.random()*10); //value: n goles al azar del equipo
    }

    jugar(array) { // array de dos equipos que se enfrentan Ej. ["Spain", "Francia"]
        let partido = {}; // diccionario: { key:value}
        partido[array[0]] = 0; // {Spain:0}
        partido[array[1]] = 0; // {Spain:0, Francia:0}
    
        while (partido[array[0]] === partido[array[1]]) {
            partido[array[0]] = this.adjudicarGoles();
            partido[array[1]] = this.adjudicarGoles();
        
            if (partido[array[0]] !== partido[array[1]]) { // Si no hay empate...
                break; // loop can stop.
            }
        }
    
        // ¿quién tiene más goles? ordenar de mayor a menor y seleccionar el primer elemento.
        let tmp = Object.keys(partido).sort(function(a, b){return partido[b]-partido[a]});
        partido.winner = tmp[0];
    
        return partido;
    }

    showResults(array, nota=[]){ // [[pais3, pais6], [pais2, pais1], [pais4, pais9], etc..]
        let winners = [];
        
        for (let i in array) {
            const match = array[i];
            let partidoJugado = this.jugar(match); // obtenemos {team1:, team2:, winner:}

            partidoJugado["winnerQ"] = nota[i];
            winners.push(partidoJugado.winner); // añado los ganadores al array vacío
            console.log(
                Object.keys(partidoJugado)[0] + " " + Object.values(partidoJugado)[0] + " - " + 
                Object.keys(partidoJugado)[1] + " " + Object.values(partidoJugado)[1] + " => " + 
                partidoJugado.winner + " (" + partidoJugado.winnerQ + ")"
            ); 
        }
        return winners;
    }

    matchCuartos(array, tipo_de_final) {
        let n_partidos = array.length/2;
        let partidos = [];
        this.encabezado(tipo_de_final);
    
        for (let i = 0; i < n_partidos; i++) {
            let result = [];
          // seleccionamos primero-último:
            let index1 = 0;
            const team1 = array[index1]; 
            array.splice(index1, 1); 
            
            let index2 = array.length-1;
            const team2 = array[index2];
            array.splice(index2, 1);
            
          // guarda los equipos en un array:
            result.push(team1);
            result.push(team2);
            
          // guarda lista en "partidos":
            partidos.push(result);
        }
        return partidos;
    }

    matchSemi(array, tipo_de_final) {
        let partidos = [];
        this.encabezado(tipo_de_final);
        // seleccionamos [0] con [2] y [1] con [3]
        let match1 = array.filter((team, index) => index % 2 == 0); // filtro par
        let match2 = array.filter((team, index) => index % 2 == 1); // filtro impar
        
        partidos.push(match1);
        partidos.push(match2);
        
        return partidos;
    }

    matchFinal(arrayCuartos, arraySemi, tipo_de_final) {
        let finales = [];
        this.encabezado(tipo_de_final);
    
        let match34 = arrayCuartos.filter(item => {return arraySemi.indexOf(item) === -1;}); 
        finales.push(match34); // los que lucharán por ser 3ro y 4to
        finales.push(arraySemi); // los que lucharán por ser 1ro y 2do

        return finales
    }

    panelResultadoFinal(arrayFinales, arrayWinners) { // los que jugaron las finales y los que ganaron
        let third = arrayWinners[0];
        let fourth = arrayFinales[0].filter(item => {return third.indexOf(item) === -1;}); // de [finales] filtro el perdedor (cuarto puesto)
    
        let first = arrayWinners[1];
        let second = arrayFinales[1].filter(item => {return first.indexOf(item) === -1;}); // de [finales] filtro el perdedor (segundo puesto)   
        console.log(`\n-- Resultado --`);
        console.log(`4) Cuarto puesto: ${fourth}`);
        console.log(`3) Tercer puesto: ${third}`);
        console.log(`2) Segundo puesto: ${second}`);
        console.log(`1) Primer puesto: ${first}`);
    
        console.log(`\n==============================================`);
        console.log(`¡${arrayWinners[1].toUpperCase()} campeona de ${this.name}!`);
        console.log(`==============================================`);
    }

    letsPlay() {
        this.welcome();
    
        let octavos = this.matchOctavos(this.misEquipos, "Octavos de final");
        let winnnersOctavos = this.showResults(octavos,  ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8']);
    
        let cuartos = this.matchCuartos(winnnersOctavos, "Cuartos de final");
        let winnnersCuartos = this.showResults(cuartos, ['Q1-Q8', 'Q2-Q7', 'Q3-6', 'Q4-Q5']);
    
        let semifinal = this.matchSemi(winnnersCuartos, "Semifinales");
        let winnnersSemi = this.showResults(semifinal,  ['Ganador Q1-Q8 vs Ganador Q3-6', 'Ganador Q2-Q7 vs Ganador Q4-Q5']);
    
        let finales = this.matchFinal(winnnersCuartos, winnnersSemi, 'Finales');
        let winnnersFinal = this.showResults(finales, ["Ganador: 3er puesto", "Ganador: 1er puesto"]);
        this.panelResultadoFinal(finales, winnnersFinal);
    
        console.log(`\nGracias por participar.\n`);
        console.log(`( ) ( )\n(>•.•<) \n(") (")O`);
    }
}