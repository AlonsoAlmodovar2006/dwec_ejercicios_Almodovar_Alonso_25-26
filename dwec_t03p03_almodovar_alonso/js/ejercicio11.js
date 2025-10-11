console.log("T03 - Ejercicio 11");
const arrayMap = new Map([]);
let jugador1;
do {
    jugador1 = almacenarJugador();
    if (jugador1 == "Máquina") {
        alert("El jugador existe");
    }
} while (jugador1 == "Máquina");
const jugadasJugador1 = almacenarJugadas();
arrayMap.set(jugador1, jugadasJugador1);

let tipoJugador;
let jugador2;
do {
    tipoJugador = parseInt(
        prompt(
            "¿Quieres jugar contra la máquina? \n1. Sí \n2. No, voy a jugar con un amigo"
        )
    );
    if (
        !Number.isInteger(tipoJugador) ||
        (tipoJugador != 1 && tipoJugador != 2)
    ) {
        alert("No puede ser otra cosa entre 1 y 2. Repítelo");
        esValido = false;
    } else {
        esValido = true;
    }
} while (!esValido);
switch (tipoJugador) {
    case 1:
        jugador2 = "Máquina";
        const jugadasJugador2 = almacenarJugadasMaquina();
        arrayMap.set(jugador2, jugadasJugador2);
        break;
    case 2:
        jugador2 = almacenarJugador();
        if (!arrayMap.has(jugador2)) {
            const jugadasJugador2 = almacenarJugadas();
            arrayMap.set(jugador2, jugadasJugador2);
        } else {
            alert("El jugador existe");
            do {
                jugador2 = almacenarJugador();
                if (jugador2 == jugador1) {
                    alert("El jugador existe");
                }
            } while (jugador2 == jugador1);
        }
        break;
    default:
        console.log("¿Qué ha pasado? Opción no debería de valer eso");
}

jugar(arrayMap);


function almacenarJugador() {
    let jugador = "";
    let esValido = true;
    do {
        jugador = prompt("Dime el nombre del usuario");
        if (!jugador || jugador.trim() == "") {
            alert("No puede estar vacío.");
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return jugador;
}

function almacenarJugadas() {
    const jugadasSet = new Set(["piedra", "papel", "tijera", "lagarto", "spock"]);
    const jugadas = [];
    let esValido = true;
    let jugadaPalabra = "";
    let jugadaNumero;
    let introduccion;
    do {
        introduccion = parseInt(
            prompt(
                "¿Cómo quieres almacenar las jugadas? (piedra, papel, tijera, lagarto, spock) \n1. Usando números en un menú \n2. Escribiendo directamente el texto"
            )
        );
        if (
            !Number.isInteger(introduccion) ||
            (introduccion != 1 && introduccion != 2)
        ) {
            alert("No puede ser otra cosa entre 1 y 2. Repítelo");
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    for (let i = 0; i < 5; i++) {
        switch (introduccion) {
            case 1:
                do {
                    jugadaNumero = parseInt(
                        prompt(`Dime la jugada ${i + 1} que quieras hacer:
    1. Piedra
    2. Papel
    3. Tijera
    4. Lagarto
    5. Spock `)
                    );
                    if (
                        !Number.isInteger(jugadaNumero) ||
                        jugadaNumero < 1 ||
                        jugadaNumero > 5
                    ) {
                        alert("Tiene que ser un número entero positivo entre 1 y 5");
                        esValido = false;
                    } else {
                        esValido = true;
                    }
                } while (!esValido);
                switch (jugadaNumero) {
                    case 1:
                        jugadas.push("piedra");
                        break;
                    case 2:
                        jugadas.push("papel");
                        break;
                    case 3:
                        jugadas.push("tijera");
                        break;
                    case 4:
                        jugadas.push("lagarto");
                        break;
                    case 5:
                        jugadas.push("spock");
                        break;
                    default:
                        console.log("¿Qué ha pasado? Opción no debería de valer eso");
                }
                break;
            case 2:
                do {
                    jugadaPalabra = prompt(
                        `Dime la jugada ${i + 1
                        } que quieras hacer. (piedra, papel, tijera, lagarto, spock)`
                    );
                    if (!jugadasSet.has(jugadaPalabra.toLowerCase())) {
                        alert(
                            "Inválido. No puedes poner otra cosa que no sea --> piedra, papel, tijera, lagarto, spock"
                        );
                        esValido = false;
                    } else {
                        esValido = true;
                    }
                } while (!esValido);
                jugadas.push(jugadaPalabra.toLowerCase());
                break;
            default:
                console.log("¿Qué ha pasado? Opción no debería de valer eso");
        }
    }
    return jugadas;
}

function almacenarJugadasMaquina() {
    const jugadasPosibles = ["piedra", "papel", "tijera", "lagarto", "spock"];
    const jugadas = [];
    let numero;
    let jugada;

    for (let i = 0; i < 5; i++) {
        numero = Math.floor((Math.random() *4))
        jugada = jugadasPosibles[numero];
        jugadas.push(jugada)
        
    }
    console.log(jugadas)
    return jugadas
}

function jugar(arrayMap) {
    const jugadores = Array.from(arrayMap.keys());

    const jugador1 = jugadores[0];
    const jugador2 = jugadores[1];

    const jugadas1 = arrayMap.get(jugador1);
    const jugadas2 = arrayMap.get(jugador2);

    let ganador1 = 0;
    let ganador2 = 0;

    for (let i = 0; i < jugadas1.length; i++) {
        const j1 = jugadas1[i];
        const j2 = jugadas2[i];

        if (j1 == j2) {
            console.log(`Jugada ${i + 1} es empate`);
        } else if (
            (j1 === "tijera" && (j2 === "papel" || j2 === "lagarto")) ||
            (j1 === "papel" && (j2 === "piedra" || j2 === "spock")) ||
            (j1 === "piedra" && (j2 === "tijera" || j2 === "lagarto")) ||
            (j1 === "lagarto" && (j2 === "spock" || j2 === "papel")) ||
            (j1 === "spock" && (j2 === "tijera" || j2 === "piedra"))
        ) {
            console.log(`Jugada ${i + 1} gana ${jugador1}`);
            ganador1++;
        } else {
            console.log(`Jugada ${i + 1} gana ${jugador2}`);
            ganador2++;
        }
    }

    console.log("---");
    if (ganador1 > ganador2) {
        console.log(
            `Ha ganado ${jugador1} siendo el resultado ${ganador1}-${ganador2}`
        );
    } else if (ganador1 < ganador2) {
        console.log(
            `Ha ganado ${jugador2} siendo el resultado ${ganador2}-${ganador1}`
        );
    } else {
        console.log(
            `Ha sido un empate siendo el resultado ${ganador1}-${ganador2}`
        );
    }
}
