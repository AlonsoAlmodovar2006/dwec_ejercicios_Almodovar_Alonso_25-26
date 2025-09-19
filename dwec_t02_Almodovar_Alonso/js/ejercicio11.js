console.log("T02 - Ejercicio 11");
/* Realizar un programa en javascript que calcule el factorial impar de un número entero. 
El factorial impar de un número n es el producto de todos los números naturales impares desde el 1 hasta n o n-1, 
dependiendo de si n es par o impar.  
Ejemplos: 5! = 5 x 3 x 1 = 15, 10! = 9 x 7 x 5 x 3 x 1 = 945
La solución se deberá hacer de forma recursiva. */
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

function calcularFactorial(numero){
    if (numero <= 1){
        return 1;
    } 

    if (numero % 2 === 0){
        numero--;
    } 

    return numero * calcularFactorial(numero-2);
}