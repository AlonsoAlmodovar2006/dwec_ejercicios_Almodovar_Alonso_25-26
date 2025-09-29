console.log("T03 - Ejercicio 25");
/* Desarrolla un script que pida al usuario una cadena y una letra e indique cuántas veces aparece dicha letra en esa cadena. 
Si la letra no existe se indicará un error. Debes hacer uso del método match() del objeto String usando expresiones regulares. */

let frase = prompt("Dame una frase");
let letra = prompt("Dame una letra");

let comprobacion = frase.match(new RegExp(letra, "gi"));

if (comprobacion == null){
    alert("ERROR. La letra no existe en la frase")
} else {
    alert(`La letra aparece en la frase ${comprobacion.length} veces`)
}