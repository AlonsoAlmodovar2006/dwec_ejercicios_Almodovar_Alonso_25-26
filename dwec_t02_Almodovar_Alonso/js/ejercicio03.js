console.log("T02 - Ejercicio 03");
/* Desarrolla un script que pida un año al usuario e indique si es bisiesto o no. 
Se debe verificar que el número introducido esté entre 0 y el año actual.
Después el script preguntará si es necesario comprobar otro año o salir. */
let seguir = "sí";
while (seguir == "sí" || seguir == "si" || seguir == "Sí" || seguir == "Si"){
    let year = parseInt(prompt("Dame un año"));
    while (isNaN(year) || year < 0){
        year = parseInt(prompt("No me has dado un año. Dame un año"));
    }

    let esBisiesto;
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        esBisiesto = true;
    } else {
        esBisiesto = false;
    }

    if (esBisiesto){
        alert(`${year} es bisiesto`);
        console.log(`${year} es bisiesto`);
    } else {
        alert(`${year} no es bisiesto`);
        console.log(`${year} no es bisiesto`);
    }

    seguir = prompt("¿Quieres comprobar otro año? Sí/No");
    console.log(seguir)
}

