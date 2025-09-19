console.log("T02 - Ejercicio 07");
/* Desarrolla un script que pida parejas de números enteros hasta que sean iguales o uno de ellos sea cero. */
let condicion = true;
while (condicion) {
    let numero1;
    let numero2;

    do {
        numero1 = parseInt(prompt("Introduce el primer número entero"));
        if (isNaN(numero1)) {
            alert("No has puesto un número");
        }
    } while (isNaN(numero1));

    do {
        numero2 = parseInt(prompt("Introduce el segundo número entero"));
        if (isNaN(numero2)) {
            alert("No has puesto un número");
        }
    } while (isNaN(numero2));

    if (numero1 == numero2 || numero1 == 0 || numero2 == 0) {
        condicion = false;
        console.log("Fin");
    }
}
