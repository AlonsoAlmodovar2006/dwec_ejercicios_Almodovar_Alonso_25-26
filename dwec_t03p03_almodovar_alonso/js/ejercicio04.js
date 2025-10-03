console.log("T03 - Ejercicio 04");
/* Desarrolla un script que ordene un array de cadenas alfabéticamente usando un método del objeto Array que permite hacerlo de forma directa. 
Se pueden ordenar de forma ascendente o descendente a decisión del usuario. */
const miArray = ["Alonso", "victor", "Alberto", "mikel", "Mari Carmen"];
let tipo = "";
let mensaje = "¿Cómo quieres ordenar este array --> \n["+ miArray + "] \nde forma ascendente o descendente? (asc o desc)"
do {
    tipo = prompt(mensaje);
    if (tipo != "asc" && tipo != "desc"){
        alert("Tienes que poner asc o desc si no, no vale.");
    }
}while (tipo != "asc" && tipo != "desc")

if (tipo == "asc") {
    miArray.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
} else {
    miArray.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    miArray.reverse();
}

mensaje = "["+ miArray + "]" 
console.log(mensaje);