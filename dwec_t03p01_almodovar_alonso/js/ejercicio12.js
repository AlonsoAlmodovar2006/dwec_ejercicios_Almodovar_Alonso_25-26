console.log("T03 - Ejercicio 12");
/* Elabora un script que simule el sorteo del cupón diario de la once sin número de serie. 
El número premiado se obtiene de cinco bombos: unidades, decenas, centenas, unidades de millar y decenas de millar. 
Cada bombo dará un número entero entre 0 y 9. 
Haz uso del método "random()" del objeto Math. 
Define la función: "generar_numeros_entre_0_9()" que no recibe nada y devuelve un número entre 0 y 9.
 */

let unidades = generar_numeros_entre_0_9().toString();
let decenas = generar_numeros_entre_0_9().toString();
let centenas = generar_numeros_entre_0_9().toString();
let unidadesMillar = generar_numeros_entre_0_9().toString();
let decenasMillar = generar_numeros_entre_0_9().toString();

let cadena = unidades + decenas + centenas + unidadesMillar + decenasMillar;
console.log(cadena);

// Directamente se podría hacer con un for y concatenando la cadena

function generar_numeros_entre_0_9() {
    return Math.floor(Math.random() * 10);
}