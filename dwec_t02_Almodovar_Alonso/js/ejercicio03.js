console.log("T02 - Ejercicio 03");
/* Desarrolla un script que pida un año al usuario e indique si es bisiesto o no. 
Se debe verificar que el número introducido esté entre 0 y el año actual.
Después el script preguntará si es necesario comprobar otro año o salir. */
let noEsBisiesto = false;
let year = parseInt(prompt("Dame un año"));
while (isNaN(year) || year < 0){
    year = parseInt(prompt("No me has dado un año. Dame un año"));
}

while (!noEsBisiesto) {
    if (year % 4 == 0){
        noEsBisiesto = true;
        break;
    }
    if (year % 100 == 0 && year % 400 == 0){
        noEsBisiesto = true;
        break;
    } 
    if (year % 400 == 0) {
        noEsBisiesto = true;
        break;
    }
}

if (!noEsBisiesto){
    alert(`${year} no es bisiesto`);
    console.log(`${year} no es bisiesto`);
} else {
    alert(`${year} es bisiesto`);
    console.log(`${year} es bisiesto`);
}

