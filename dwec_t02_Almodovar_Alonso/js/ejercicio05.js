console.log("T02 - Ejercicio 05");
/* Desarrolla un script que pida cinco números y muestre los que sean mayores que la media. 
Sin usar arrays. Suponemos que siempre se introducen números.
El mensaje de salida será: "Los siguientes números introducidos son superiores a la media (VALORMEDIA): NUM1, NUMX….*/
alert("Te voy a pedir 5 números");
let numero1 = parseInt(prompt("Introduce el primero"));
let numero2 = parseInt(prompt("Introduce el segundo"));
let numero3 = parseInt(prompt("Introduce el tercero"));
let numero4 = parseInt(prompt("Introduce el cuarto"));
let numero5 = parseInt(prompt("Introduce el quinto"));

let media = (numero1 + numero2 + numero3 + numero4 + numero5) / 5; 

let cadena = `Los siguientes números introducidos son superiores a la media (${media}):`;
if (numero1 > media){
    cadena = cadena + ` ${numero1}`;
}
if (numero2 > media){
    cadena = cadena + ` ${numero2}`;
}
if (numero3 > media){
    cadena = cadena + ` ${numero3}`;
}
if (numero4 > media){
    cadena = cadena + ` ${numero4}`;
}
if (numero5 > media){
    cadena = cadena + ` ${numero5}`;
}

console.log(cadena);
alert(cadena)

