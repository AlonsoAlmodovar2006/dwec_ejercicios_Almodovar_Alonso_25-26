console.log("T02 - Ejercicio 04");
/* Realizar un programa que determine si el número introducido por el usuario es primo o no.
Antes de calcular, comprobar que el usuario introduce realmente un número (Number.isInteger). */
let numero;

do {
    numero = parseInt(prompt("Introduce un número entero"));
    if (!Number.isInteger(numero)) {
        alert("No has puesto un número entero");
    }
} while (!Number.isInteger(numero));

console.log(numero);

if (numero < 2) {
    alert(`${numero} no es primo`);
} else if (numero == 2) {
    alert(`${numero} es primo`);
} else if (numero % 2 == 0) {
    alert(`${numero} no es primo`);
} else {
    let esPrimo = true;
    for (let i = 3; i <= Math.sqrt(numero); i++) {
        if (numero % i == 0) {
            esPrimo = false;
        }
    }
    if (esPrimo) {
        alert(`${numero} es primo`);
    } else {
        alert(`${numero} no es primo`);
    }
}
