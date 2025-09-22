console.log("T03 - Ejercicio 02");
/*¿Qué diferencia hay entre el método slice(), el método substr() y el método substring().
Haz un ejemplo donde se aprecie la diferencia entre dichos métodos. */
// Dada la cadena de texto: let cadena = "JavaScript";
// Utiliza los métodos slice(), substr() y substring() para extraer las subcadenas que se indican a continuación y observa las diferencias en los resultados:
// Extrae los primeros 4 caracteres.
// Extrae los últimos 4 caracteres.
// Extrae los caracteres del índice 4 al 7.
// Extrae los caracteres del índice 7 al 4.
let cadena = "JavaScript";
console.log("Extrae los primeros 4 carácteres --> " + cadena.slice(0,4)); // Los 3 iguales
console.log("Extrae los últimos 4 caracteres --> " + cadena.substring(6)); // Los otros con -4
console.log("Extrae los caracteres del índice 4 al 7 --> " + cadena.substr(4,4)); // Los otros con (4,8)
console.log("Extrae los caracteres del índice 7 al 4 --> " + cadena.substring(7,4)); // Los 3 iguales