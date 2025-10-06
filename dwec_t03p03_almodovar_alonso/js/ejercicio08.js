console.log("T03 - Ejercicio 08");
/* Desarrolla un script que reciba dos matrices de cualquier dimensión y te indique si se pueden sumar o no. 
Si se pueden sumar, dicho script mostrará la suma de ambas. 
Deberás definir una función que realice la operación de la suma y otra que compruebe que si se pueden sumar o no. */
const matriz1 = rellenarMatriz();
const matriz2 = rellenarMatriz();

mostrarDatos(matriz1);
mostrarDatos(matriz2);

if (comprobarsuma(matriz1, matriz2)){
    const sumaMatrices = realizarSuma(matriz1,matriz2);
    mostrarDatos(sumaMatrices)
}else{
    console.log("No se pueden sumar las dos matrices porque no tienen las mismas dimensiones");
}


function rellenarMatriz(){
    const matriz = []
    let filas = 1 //Math.floor(Math.random() *5) +1;
    let columnas = 1 //Math.floor(Math.random() *5) +1;
    for (let i = 0; i < filas; i++){
        matriz[i] = [];
        for (let j = 0; j < columnas; j++){
            const dato = Math.floor(Math.random() *10);
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
    console.log(mensaje);
    console.log("---");
}

function comprobarsuma(matriz1,matriz2){
    if(matriz1.length == matriz2.length && matriz1[0].length == matriz2[0].length){
        return true;
    } else{
        return false;
    }
}

function realizarSuma(matriz1,matriz2){
    const matriz = [];
    let filas = matriz1.length;
    let columnas = matriz1[0].length;
    for (let i = 0; i < filas; i++){
        matriz[i] = [];
        for (let j = 0; j < columnas; j++){
            const suma = matriz1[i][j] + matriz2[i][j]
            matriz[i][j] = suma;
        }
    }
    return matriz;
}