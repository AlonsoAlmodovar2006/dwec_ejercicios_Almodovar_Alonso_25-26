console.log("T03 - Ejercicio 10");
let opcion = -1;
let esValido = true;

const arrayLiga = [
    ["Equipo", "PTS", "PJ", "PG", "PE", "PP"],
    ["Levante", undefined, undefined, 13, 1, 0],
    ["Málaga", undefined, undefined, 12, 1, 1],
    ["Eibar", undefined, undefined, 11, 1, 2],
    ["Córdoba C.F.", undefined, undefined, 8, 3, 3],
];

rellenarMatriz(arrayLiga);

do {
    do {
        opcion = parseInt(
            prompt(
                "¿Cuál de estas acciones quieres hacer? \n 1. Saber el líder \n 2. Equipo con más partidos perdidos \n 3. Equipo con más partidos ganados \n 4. Añadir Equipo \n 5. Introducir Jornada \n 6. Ordenar clasificación \n 0. Salir"
            )
        );
        if (!Number.isInteger(opcion) || opcion < 0 || opcion > 6) {
            alert("Tiene que ser un número entero positivo entre 0 y 6");
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);

    switch (opcion) {
        case 0:
            console.log("¡Adiós!");
            break;
        case 1:
            let lider = saberLider(arrayLiga);
            console.log(`El líder de la Liga es: ${lider}`);
            break;
        case 2:
            let masPerdidos = saberEquipoConMasPerdidos(arrayLiga);
            console.log(`El equipo con más partidos perdidos es: ${masPerdidos}`);
            break;
        case 3:
            let masGanados = saberEquipoConMasGanados(arrayLiga);
            console.log(`El equipo con más partidos ganados es: ${masGanados}`);
            break;
        case 4:
            pedirDatos(arrayLiga);
            break;
        case 5:
            introducirJornada(arrayLiga);
            break;
        case 6:
            ordenarClasificacion(arrayLiga);
            break;
        default:
            console.log("¿Qué ha pasado? Opción no debería de valer eso");
    }
} while (opcion != 0);

console.table(arrayLiga);

function rellenarMatriz(matriz) {
    let puntos = (array) => array[3] * 3 + array[4];
    let partidosJugados = (array) => array[3] + array[4] + array[5];

    for (let i = 1; i < matriz.length; i++) {
        matriz[i][1] = puntos(matriz[i]);
        matriz[i][2] = partidosJugados(matriz[i]);
    }
}

function saberLider(matriz) {
    let lider = matriz[1][1];
    let equipo = matriz[1][0];
    for (let i = 2; i < matriz.length; i++) {
        if (lider < matriz[i][1]) {
            lider = matriz[i][1];
            equipo = matriz[i][0];
        }
    }
    return equipo;
}

function saberEquipoConMasPerdidos(matriz) {
    let masPerdidos = matriz[1][5];
    let equipo = matriz[1][0];
    for (let i = 2; i < matriz.length; i++) {
        if (masPerdidos < matriz[i][5]) {
            masPerdidos = matriz[i][5];
            equipo = matriz[i][0];
        }
    }
    return equipo;
}

function saberEquipoConMasGanados(matriz) {
    let masGanados = matriz[1][3];
    let equipo = matriz[1][0];
    for (let i = 2; i < matriz.length; i++) {
        if (masGanados < matriz[i][3]) {
            masGanados = matriz[i][3];
            equipo = matriz[i][0];
        }
    }
    return equipo;
}

function pedirDatos(matriz) {
    let nombreEquipo = "";
    let nGanados = 0;
    let nEmpatados = 0;
    let nPerdidos = 0;
    let esValido = true;

    do {
        nombreEquipo = prompt("Dime el nombre del equipo");
        if (!isNaN(nombreEquipo)) {
            alert("Tiene que ser el nombre de un equipo");
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);

    do {
        nGanados = parseInt(
            prompt(`Dime el número de partidos ganados que tiene el ${nombreEquipo}`)
        );
        if (!Number.isInteger(nGanados) || nGanados < 0 || nGanados > 14) {
            alert(
                "Tiene que ser un número entero positivo entre 0 y 14. Recuerda que estamos en la jornada 14"
            );
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);

    do {
        nEmpatados = parseInt(
            prompt(
                `Dime el número de partidos empatados que tiene el ${nombreEquipo}`
            )
        );
        if (!Number.isInteger(nEmpatados) || nEmpatados < 0 || nEmpatados > 14) {
            alert(
                "Tiene que ser un número entero positivo entre 0 y 14. Recuerda que estamos en la jornada 14"
            );
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);

    do {
        nPerdidos = parseInt(
            prompt(`Dime el número de partidos perdidos que tiene el ${nombreEquipo}`)
        );
        if (!Number.isInteger(nPerdidos) || nPerdidos < 0 || nPerdidos > 14) {
            alert(
                "Tiene que ser un número entero positivo entre 0 y 14. Recuerda que estamos en la jornada 14"
            );
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);

    let suma = nGanados + nPerdidos + nEmpatados;
    let puntos = nGanados * 3 + nPerdidos;

    let nPartidos = matriz[2][2];
    if (suma != nPartidos) {
        console.log(
            `No puede ser que los partidos jugados del ${nombreEquipo} no sea ${nPartidos}. Anulamos su introducción en la tabla`
        );
        // Este script no valdría si hay alguna jornada aplazada
    } else {
        return (matriz[matriz.length] = [
            nombreEquipo,
            puntos,
            suma,
            nGanados,
            nEmpatados,
            nPerdidos,
        ]);
    }
}

function introducirJornada(matriz) {
    matrizTemp = matriz.slice(1);
    let esValido = true;
    let resultado = "";
    matrizTemp.forEach((equipo) => {
        do {
            resultado = prompt(
                `¿Qué ha hecho el ${equipo[0]} en esta jornada? (g, e o p)`
            );
            if (resultado != "g" && resultado != "e" && resultado != "p") {
                alert("Tiene que ser g (ganar), e (empatar) o p (perder)");
                esValido = false;
            } else {
                esValido = true;
            }
        } while (!esValido);

        equipo[2]++;
        switch (resultado) {
            case "g":
                equipo[3]++;
                break;
            case "e":
                equipo[4]++;
                break;
            case "p":
                equipo[5]++;
                break;
            default:
                console.log("¿Qué ha pasado? Opción no debería de valer eso");
        }

        let puntos = equipo[3] * 3 + equipo[4];
        equipo[2] = puntos;
    });

    matriz.splice(1, matriz.length - 1, ...matrizTemp);
}

function ordenarClasificacion(matriz){
    matrizTemp = matriz.slice(1);
    matrizTemp.sort(function(a, b){return b[1]-a[1]})
    matriz.splice(1, matriz.length - 1, ...matrizTemp);
}