console.log("T02 - Ejercicio 10");
/*Haz un script que pida un número entero al usuario y muestre por pantalla el factorial de dicho número. 
El script definirá la función "factorial" que recibe un número entero y devuelve el factorial de dicho número. 
La solución se deberá hacer de forma NO recursiva.
Recuerda: El factorial de un número n es el producto de todos los números naturales desde 1 hasta n inclusive. 
Así, factorial de 5 (5!) es: 5! = 5 x 4 x 3 x 2 x 1 = 120.
Contempla qué debe ocurrir si el número es 0 o 1 y qué debe ocurrir si el número es negativo.*/
let numero;
do {
    numero = Number(prompt("Introduce un número entero positivo"));
    if (isNaN(numero) || numero < 0) {
        alert("No has puesto un número entero positivo");
    }
} while (!Number.isInteger(numero) || numero < 0);

let factorial = calcularFactorial(numero);

console.log(`El factorial de ${numero} es ${factorial}`);
alert(`El factorial de ${numero} es ${factorial}`);

// Meter para que calcule a partir del !170 (bigInt)
function calcularFactorial(numero){
    let factorial = 1;
    for (let i = 1; i <= numero; i++){
        factorial *= i;
    }
    return factorial;
}