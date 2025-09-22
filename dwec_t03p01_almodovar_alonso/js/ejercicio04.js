console.log("T03 - Ejercicio 04");
/*  Elabora un script que lea una frase del usuario y una palabra. 
Después mostrará las veces que aparece dicha palabra en esa frase. 
Debes hacer uso de uno de los métodos del objeto String. 
Si la palabra no existe se mostrará un error. */
let frase = prompt("Dame una frase");
let palabra = prompt("Dame una palabra");
if (frase.includes(palabra)){
    let cadenaPalabra = frase.matchAll(palabra) 
    alert(Array.from(cadenaPalabra));
} else{
    alert("ERROR. Tu palabra no está dentro de la frase");
}