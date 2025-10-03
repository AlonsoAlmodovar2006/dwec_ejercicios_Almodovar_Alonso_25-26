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
const arrayInicial = [1, 2, 3, 4, 5];
let ultimaAccion = "";
const ultimoElementoBorrado = [];
let opcion = 0;

while (opcion != 5 && arrayInicial.length > 0) {
    imprimirArray(arrayInicial);
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
            ultimaAccion = "último";
            ultimoElementoBorrado[0] = arrayInicial.pop();
            ultimoElementoBorrado[1] = undefined;
            break;
        case 2:
            ultimaAccion = "primero";
            ultimoElementoBorrado[0] = arrayInicial.shift();
            ultimoElementoBorrado[1] = undefined;
            break;
        case 3:
            if (arrayInicial.length >= 2) {
                ultimaAccion = "ambos";
                ultimoElementoBorrado[0] = arrayInicial.pop();
                ultimoElementoBorrado[1] = arrayInicial.shift();
            } else {
                console.log("No se pueden borrar ambos porque la longitud del array es menor de 2");
                alert("No se pueden borrar ambos porque la longitud del array es menor de 2");
            }
            break;
        case 4:
            switch (ultimaAccion) {
                case "":
                    console.log("No hay nada que deshacer");
                    alert("No hay nada que deshacer");
                    break;
                case "primero":
                    arrayInicial.unshift(ultimoElementoBorrado[0]);
                    break;
                case "último":
                    arrayInicial.push(ultimoElementoBorrado[0]);
                    break;
                case "ambos":
                    arrayInicial.push(ultimoElementoBorrado[0]);
                    arrayInicial.unshift(ultimoElementoBorrado[1]);
                    break;
                default:
                    console.log("¿Qué ha pasado? Opción no debería de valer eso");
                    alert("¿Qué ha pasado? Opción no debería de valer eso");
            }
            ultimaAccion = "";
            ultimoElementoBorrado.splice(0, ultimoElementoBorrado.length);
            break;
        case 5:
            imprimirArray(arrayInicial);
            alert("¡Adiós!");
            console.log("¡Adiós!");
            break;
        default:
            console.log("¿Qué ha pasado? Opción no debería de valer eso");
            alert("¿Qué ha pasado? Opción no debería de valer eso");
    }
    if (arrayInicial.length < 0){
        console.log("No hay datos suficientes para continuar. ¡Adiós!");
        alert("No hay datos suficientes para continuar. ¡Adiós!");
    }
}

function imprimirArray(array) {
    let frase = "Este es el array actual --> [" + array + "]";
    alert(frase);
    console.log(frase);
}
