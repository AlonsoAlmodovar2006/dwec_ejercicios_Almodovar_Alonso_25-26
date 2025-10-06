console.log("T03 - Ejercicio 07");
/* Desarrolla un script que pida el número de filas y columnas de una matriz. 
Dichos valores deben ser mayores de 0 y confiamos en que el usuario los introduce de forma correcta. 
Después se pedirán los valores de dicha matriz. 
Finalmente se mostrarán los datos por pantalla. Usa las siguientes funciones:
-    	pedirDatos() -Recibe: filas y columnas. Devuelve: matriz.
-    	mostrarDatos() - Recibe: matriz. Devuelve: nada. */
let filas;
let columnas;
let esValido = true;
do {
    filas = parseInt(prompt("Dime cuántas filas quieres introducir en tu matriz"));
    if (!Number.isInteger(filas) || filas < 1) {
        alert("Tiene que ser un número entero positivo");
        esValido = false;
    }
} while (!esValido);

do {
    columnas = parseInt(prompt("Dime cuántas columnas quieres introducir en tu matriz"));
    if (!Number.isInteger(columnas) || columnas < 1) {
        alert("Tiene que ser un número entero positivo");
        esValido = false;
    }
} while (!esValido);

const matriz = pedirDatos(filas,columnas);
mostrarDatos(matriz);

function pedirDatos(filas, columnas){
    const matriz = []
    
    for (let i = 0; i < filas; i++){
        matriz[i] = [];
        for (let j = 0; j < columnas; j++){
            const dato = prompt(`Introduce el valor de la posición [${i+1},${j+1}] de tu matriz`)
            matriz[i][j] = dato;
        }
    }
    return matriz
}

function mostrarDatos(matriz){
    let mensaje = "El valor de tu matriz es:";
    for (let i = 0; i < matriz.length; i++){
        mensaje += "\n" + matriz[i];
    }
    alert(mensaje)
    console.log(mensaje);
}
