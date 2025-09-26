console.log("T03 - Ejercicio 17");
/* Crea un script que pida al usuario dos fechas e indique los meses que hay entre ambas fechas. 
El script debe determinar qué fecha es la mayor. */
let fecha1 = prompt("Dame una fecha");
let arrayFecha1 = fecha1.split(" ");
let fecha2 = prompt("Dame otra fecha");
let arrayFecha2 = fecha2.split(" ");

let dia = Number(arrayFecha1[0]) - Number(arrayFecha2[0]);
let mes = Number(arrayFecha1[1]) - Number(arrayFecha2[1]);
let year = Number(arrayFecha1[2]) - Number(arrayFecha2[2]);

if (year < 0 || (year == 0 && mes < 0) || (year==0 && mes == 0 && dia < 0)){
    mes = arrayFecha2[1] - arrayFecha1[1];
    year = arrayFecha2[2] - arrayFecha1[2];
}

let meses = year * 12 + mes;

if (arrayFecha2[0] < arrayFecha1[0]) { 
    meses--;
}

alert(`Entre una fecha y otra hay ${meses} meses`);

// Con el objeto Date se puede hacer más fácil