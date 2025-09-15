console.log("T02 - Ejercicio 03");
/* Desarrolla un script que pida un año al usuario e indique si es bisiesto o no. 
Se debe verificar que el número introducido esté entre 0 y el año actual.
Después el script preguntará si es necesario comprobar otro año o salir. */
const anioActual = new Date().getFullYear();
let seguir;

do {
    let year = parseInt(prompt(`Dame un año (entre 0 y ${anioActual})`));

    while (isNaN(year) || year < 0 || year > anioActual) {
        year = parseInt(
            prompt(`Error. Dame un año válido (entre 0 y ${anioActual})`)
        );
    }

    let esBisiesto;

    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
        esBisiesto = true;
        alert(`${year} es bisiesto`);
        console.log(`${year} es bisiesto`);
    } else {
        esBisiesto = false;
        alert(`${year} no es bisiesto`);
        console.log(`${year} no es bisiesto`);
    }

    seguir = prompt("¿Quieres comprobar otro año? Sí/No");
    console.log(seguir);
} while (seguir == "sí" || seguir == "si" || seguir == "Sí" || seguir == "Si");
