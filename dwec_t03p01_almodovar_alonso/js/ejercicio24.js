console.log("T03 - Ejercicio 24");
/* Desarrolla un script que pida al usuario una cadena de texto y una palabra. 
El script deberá buscar la palabra en la cadena e indicar si está presente. 
Si se encuentra, mostrará un mensaje con la posición en la que empieza la palabra. 
Si no está, el script ofrecerá la opción de realizar otra búsqueda (esto puede ser en bucle). 
El método search() se usará con una expresión regular para evitar distinguir entre mayúsculas y minúsculas. */

let encontrada = false;

do {
    let frase = prompt("Dame una frase");
    let palabra = prompt("Dame una palabra (puede ser de la frase)");

    let posicion = frase.search(new RegExp(palabra, "i"));
    if (posicion != -1) {
        encontrada = true;
        alert(`La palabra que has puesto en la frase empieza en la posición : ${posicion}`);
    }
} while (!encontrada)
