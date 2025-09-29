console.log("T03 - Ejercicio 27");
/* Crea un script que pida al usuario una cadena y diga cuántas palabras tiene esa cadena. 
Suponemos que una palabra está formada por uno o más caracteres distintos al espacio y al tabulador. 
Usa expresiones regulares. */

let frase = prompt("Dame una frase");
// let arrayFrase = frase.split(" ");
let arrayFrase = frase.match(/\S+/g);
alert(`La frase tiene ${arrayFrase.length} palabras`);