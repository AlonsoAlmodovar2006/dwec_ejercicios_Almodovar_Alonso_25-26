console.log("T03 - Ejercicio 05");
/* Dada una cadena de texto usando el siguiente formato: "1, 2, 3, 4". 
Primero elimina todos los espacios en blanco, después convierte la cadena de texto en un array de números. 
El separador usado será la ",". Debes hacer uso de uno de los métodos del objeto String. */
let cadena = "1, 2, 3, 4";
let cadenaSinEspacios = cadena.replaceAll(" ", "");
let arrayNumeros = cadenaSinEspacios.split(",").map(Number);
console.log(arrayNumeros);