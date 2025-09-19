console.log("T02 - Ejercicio 06");
/*Desarrolla un script que pida dos números enteros y los multiplique usando sumas sucesivas.
Se tiene que comprobar si el usuario ha introducido o no números válidos. 
En el caso de que alguno de los números no sea válido, se le volverá a pedir el número hasta que lo introduzca correctamente.
Se pueden multiplicar números negativos. */
let numero1;
let numero2;

do {
    numero1 = Number(prompt("Introduce el primer número entero"));
    if (isNaN(numero1)) {
        alert("No has puesto un número");
    }
} while (!Number.isInteger(numero1));

do {
    numero2 = Number(prompt("Introduce el segundo número entero"));
    if (isNaN(numero2)) {
        alert("No has puesto un número");
    }
} while (!Number.isInteger(numero1));

let resultado = 0;
for (let i = 0; i < Math.abs(numero2); i++) {
    resultado += numero1;
}

if (numero2 < 0) {
    resultado = -resultado;
}

console.log(resultado);
alert(resultado);
