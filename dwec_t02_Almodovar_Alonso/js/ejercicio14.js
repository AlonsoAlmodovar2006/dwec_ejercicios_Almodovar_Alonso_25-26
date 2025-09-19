console.log("T02 - Ejercicio 14");
/* Determinar si un número entero positivo dado leído desde el teclado es abundante o no. 
Un número abundante es un número natural cuyos divisores (todos los divisores excepto el propio número) sumen más que dicho número. 
Ejemplo: 24 < 1 + 2 + 3 + 4 + 6 + 8 + 12 = 36.
Se tiene que comprobar si el usuario ha introducido un número entero mayor que 0. 
En el caso contrario, se le volverá a pedir el número hasta que lo introduzca correctamente.*/
let n;
do {
    n = parseInt(prompt("Dame un número"));
    if (!Number.isInteger(n) || n < 0) {
        alert("No me has dado un número entero positivo");
    }
} while (!Number.isInteger(n) || n < 0);

let nAbundante = 0;
let esAbundante = false;
for (let i = 0; i < n; i++) {
    if (n % i === 0) {
        nAbundante += i;
    }
}
if (nAbundante > n) {
    esAbundante = true;
}

if (esAbundante) {
    alert(`${n} es un número abundante`);
    console.log(`${n} es un número abundante`);
} else {
    alert(`${n} no es un número abundante`);
    console.log(`${n} no es un número abundante`);
}
