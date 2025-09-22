console.log("T03 - Ejercicio 03");
// Crea un script que pida al usuario una cadena y diga cuántas palabras tiene esa cadena. 
// Después mostrará cada una de las palabras que constituyen la cadena. 
// Suponemos que una palabra está formada por uno o más caracteres distintos al espacio y al tabulador.
// No puedes usar patrones.
let frase = prompt("Dame una frase");
let cadena = frase.split(" ")
alert("La cantidad de palabras en la frase que has puesto es: "+cadena.length);
for (let i = 0; i < cadena.length; i++){
    alert(`Palabra ${i+1} de la frase: ${cadena[i]}`);
}