console.log("T03 - Ejercicio 09");
/* Desarrolla un script que dada una matriz te devuelva su transpuesta. ¿Qué es la transpuesta de una matriz? Define las funciones pertinentes. */
const matriz1 = rellenarMatriz();
mostrarDatos(matriz1);
const transpuesta = sacarTranspuesta(matriz1);
mostrarDatos(transpuesta);

function rellenarMatriz(){
    const matriz = []
    let filas = 2 //Math.floor(Math.random() *5) +1;
    let columnas = 3 //Math.floor(Math.random() *5) +1;
    for (let i = 0; i < filas; i++){
        matriz[i] = [];
        for (let j = 0; j < columnas; j++){
            const dato = Math.floor(Math.random() *10);
            matriz[i][j] = dato;
        }
    }
    return matriz
}

function sacarTranspuesta(matriz){
    const transpuesta = []
    for (let i = 0; matriz.length-1; i++){
        transpuesta[i] = []
        for (let j = 0; matriz[i].length-1; j++){
            console.log(matriz[i][j])
            transpuesta[j][i] = matriz[i][j]
        }
    }
    return transpuesta;
}

function mostrarDatos(matriz){
    let mensaje = "El valor de tu matriz es:";
    for (let i = 0; i < matriz.length; i++){
        mensaje += "\n" + matriz[i];
    }
    console.log(mensaje);
    console.log("---");
}