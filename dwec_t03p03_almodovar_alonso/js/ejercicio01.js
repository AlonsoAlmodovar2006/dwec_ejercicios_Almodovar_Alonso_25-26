console.log("T03 - Ejercicio 01");
/* Desarrolla un script que pregunte al usuario si quiere borrar el último elemento de un array o el primero, 
ambos o ninguno o deshacer al último estado. 
Se empieza con un array inicial definido.

Si el usuario contesta que ninguno, el script mostrará el array. 
Si el usuario contesta que quiere borrar el último o el primero, 
el script mostrará el array sin el último elemento o sin el primero 
y volverá a preguntar si se quiere borrar el último elemento o el primero o ninguno. 
También se puede indicar ambos, en ese caso se elimina el primero y el último (si hay al menos dos elementos). 
Esto se repetirá mientras el usuario conteste que quiere borrar algún elemento o hasta que no queden más elementos en el array.

Es necesario guardar el estado del array antes de borrar por si el usuario contesta deshacer. 
Solo se guarda un estado.
Asegúrate de que la eliminación no deje huecos en el array (undefined). */

let menu =
    "¿Cuál de estas acciones quieres hacer sobre el array? \n 1. Borrar el último elemento \n 2. Borrar el primer elemento \n 3. Ambos \n 4. Deshacer el último cambio \n 5. Salir";
let arrayInicial = [1, 2, 3, 4, 5];
let nuevoArray = []; //Mucho mejor hacerlo sin copia
let opcion = 0;

while (opcion != 5) {
    do {
        opcion = parseInt(prompt(menu));
        if (!Number.isInteger(opcion) || opcion < 1 || opcion > 5) {
            alert(
                "Tiene que ser un número entre 1 y 5 para que el programa funcione"
            );
        }
    } while (!Number.isInteger(opcion) || opcion < 1 || opcion > 5);
    switch (opcion) {
        case 1:
            if (arrayInicial.length > 0) {
                nuevoArray = arrayInicial.slice();
                arrayInicial.pop();
                imprimirArray(arrayInicial);
            } else {
                console.log("No hay datos suficientes para hacerlo")
                alert("No hay datos suficientes para hacerlo")
            }
            break;
        case 2:
            if (arrayInicial.length > 0) {
                nuevoArray = arrayInicial.slice();
                arrayInicial.shift();
                imprimirArray(arrayInicial);
            } else {
                console.log("No hay datos suficientes para hacerlo")
                alert("No hay datos suficientes para hacerlo")
            }
            break;
        case 3:
            nuevoArray = arrayInicial.slice();
            borrarAmbos(arrayInicial);
            imprimirArray(arrayInicial);
            break;
        case 4:
            arrayInicial = nuevoArray.slice();
            imprimirArray(arrayInicial);
            break;
        case 5:
            alert("¡Adiós!");
            console.log("¡Adiós!");
            break;
        default:
            console.log("¿Qué ha pasado? Opción no debería de valer eso");
            alert("¿Qué ha pasado? Opción no debería de valer eso");
    }
}

function imprimirArray(array) {
    let frase = "Este es el array actual --> [" + array + "]";
    alert(frase);
    console.log(frase);
}

function borrarAmbos(array) {
    if (array.length >= 2) {
        array.pop();
        array.shift();
    } else {
        console.log(
            "No se pueden borrar ambos porque la longitud del array es menor de 2"
        );
        alert(
            "No se pueden borrar ambos porque la longitud del array es menor de 2"
        );
    }
}
