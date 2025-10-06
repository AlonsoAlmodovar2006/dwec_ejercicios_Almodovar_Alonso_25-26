console.log("T03 - Ejercicio 05");
/* Desarrolla un script que dado un array de números los ordene de forma ascendente o descendente 
(según indique el usuario) usando un método del objeto Array diseñado para ello. */
const miArray = [1, 3, 2, 4, 6, 5];
let mensaje =
    "¿Qué quieres hacer con este array -> [" + miArray + "] ?\n¿Ordenarlo de forma ascendente o descendente? Pon (asc o desc)";
let tipo;
do {
    tipo = prompt(mensaje);
    if (tipo != "asc" && tipo != "desc") {
        alert("Tienes que poner asc o desc si no, no vale.");
    }
} while (tipo != "asc" && tipo != "desc");

if (tipo == "asc") {
    miArray.sort(function (a, b) {
        return a - b;
    });
} else if (tipo == "desc") {
    miArray.sort(function (a, b) {
        return b - a;
    });
} else {
    console.log("¿Qué ha pasado? Tipo no debería de valer otra cosa");
    alert("¿Qué ha pasado? Tipo no debería de valer otra cosa");
}

mensaje = "Este es el array ordenado de forma " + tipo + "endente --> [" + miArray + "]";
alert(mensaje)
console.log(mensaje)