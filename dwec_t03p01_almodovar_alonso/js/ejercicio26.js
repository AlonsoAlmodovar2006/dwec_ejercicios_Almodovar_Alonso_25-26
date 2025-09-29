console.log("T03 - Ejercicio 26");
/* Elabora un script que pida al usuario una cadena y dos letras. Después reemplazará una letra por otra. 
Si la primera letra no existe se indicará un error. Debes resolverlo usando el método replace() del objeto String usando expresiones regulares. 
No debe distinguir entre mayúsculas y minúsculas. Controla esto desde la expresión regular. */

let frase = prompt("Dame una frase");
let letra = prompt("Dame dos letras, juntas (xy)");

let reemplazo = frase.replace(new RegExp(letra.charAt(0), "gi"), letra.charAt(1));

if (frase == reemplazo){
    alert("ERROR. No se ha reemplazado nada porque la 1ª letra no existe");
} else {
    alert(`Esta es la nueva frase con la letra reemplazada: ${reemplazo}`);
}