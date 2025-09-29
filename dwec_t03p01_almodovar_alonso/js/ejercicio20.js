console.log("T03 - Ejercicio 20");
/* Desarrolla un script que determine si el precio de venta de un artículo dado por un usuario es válido. 
El precio no puede tener más de 6 dígitos en la parte entera y sólo podrá tener dos decimales. Los decimales podrán estar indicados por “.” ó “,”. 
Deberás hacer uso del objeto RegExp y crear una función 
que se denomine "validaMiReal()" que reciba la cadena introducida por el usuario y devuelva un booleano.
Si el precio es válido, el número se convertirá en un real válido para JS. 
Para ello, define la función convertirMiReal() que recibe un precio válido y devuelve un Number. 
Por tanto, si el precio válido es 123,34; se convertirá en 123.34
Puedes usar una IA para generar el patrón, entendiendo dicho patrón. */
let consola = prompt("Dame el precio de venta de un artículo");
let esValido = validaMiReal(consola);
if (esValido) {
    alert("El precio de venta que me has dado es válido");
    let precio = convertirMiReal(consola);
    alert(`El precio es: ${precio}`)
} else {
    alert("El precio de venta que me has dado no es válido");
}

function validaMiReal(cadena) {
    var patt = new RegExp(/^\d{1,6}([.,]\d{1,2})?$/);
    return patt.test(cadena);
}

function convertirMiReal(precio) {
    if (precio.includes(",")){
        precio = precio.replace(",", ".");
    }
    return Number(precio);
}
