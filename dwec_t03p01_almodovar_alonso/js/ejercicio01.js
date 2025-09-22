console.log("T03 - Ejercicio 01");
/* Investiga los métodos toFixed() y toPrecision() del objeto Number.
¿Qué diferencia hay entre ellos? Úsalos en un ejemplo con diferentes parámetros de entrada. */

// El precio del maíz para cada almud es de $5.6825 dime cuántos almudes de maíz quieres 
// y te daré dos precios: el exacto y el decimal con 2.
alert("El precio del maíz para cada almud es de $5.6825. Dime cuántos almudes de maíz quieres y te daré dos precios: el exacto y el decimal con 2.")
let nAlmud;
const precioMaiz = 5.6825;
do{
    nAlmud = parseInt(prompt("Dame el número"));
    if (!Number.isInteger(nAlmud) || nAlmud < 0){
        alert("No has puesto un número entero positivo")
    }
}while (!Number.isInteger(nAlmud) || nAlmud < 0);

let resultado = nAlmud * precioMaiz;

let resultadoString = resultado.toString();

alert(`Exacto es: ${resultado.toPrecision(resultadoString.length)} € \nEn 2 decimales es: ${resultado.toFixed(2)} €`);