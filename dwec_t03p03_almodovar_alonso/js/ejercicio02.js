console.log("T03 - Ejercicio 02");
/* Desarrolla un script que pida al usuario cuántos números va a introducir. 
Se comprobará que el número sea un número y que sea mayor que cero. En caso contrario se volverá a pedir el número de elementos hasta que el usuario introduzca un número mayor que cero.

Después el script le pedirá números al usuario uno a uno y los almacenará en un array. Finalmente el script dirá cuántos números son superiores a la media y el array original. Usa las siguientes funciones:
-    	pedirDatos() => Recibe: nada. Devuelve: array.
-    	calcularMedia() => Recibe: array. Devuelve: media.
-    	calcuarlSuperioresMedia() => Recibe: array y media. Devuelve: un array con los números superiores a la media.
-   	ordenarArray => Recibe: array y orden (asc, desc). Devuelve: un array ordenado usando el método de "ordenación por inserción" programado por ti de forma manual.
-    	mostrarArray() => Recibe: array. Devuelve: nada.
-      mostrarArrayOrdenado() => Recibe: array. Devuelve: nada. */
const arrayNumeros = pedirDatos();

mostrarArray(arrayNumeros);

let media = calcularMedia(arrayNumeros);
console.log(`La media de tu array es: ${media}`);
alert(`La media de tu array es: ${media}`);

let superiores = calcularSuperioresMedia(arrayNumeros, media);
console.log(`Estos son los números superiores a la media de tu array: ${superiores}`);
alert(`Estos son los números superiores a la media de tu array: ${superiores}`);

let orden = "asc";
const arrayOrdenado = ordenarArray(arrayNumeros,orden)
mostrarArrayOrdenado(arrayOrdenado)

function pedirDatos() {
    let nNumeros;
    let numero;
    do {
        nNumeros = parseInt(prompt("Dime cuántos números quieres introducir"));
        if (!Number.isInteger(nNumeros) || nNumeros < 1) {
            alert("Tiene que ser un número entero positivo");
        }
    } while (!Number.isInteger(nNumeros) || nNumeros < 1);

    let array = [];
    for (let i = 0; i < nNumeros; i++) {
        numero = Number(prompt(`Dame el número ${i + 1} de tu array`));
        array.push(numero);
    }
    return array;
}

function calcularMedia(array) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
        suma += array[i];
    }
    return suma / array.length;
}

function calcularSuperioresMedia(array,media){
    let miArray = [];
    array.forEach(element => {
        if (element > media){
            miArray.push(element)
        }
    });
    return miArray;
}

function ordenarArray(array,orden){
    if (orden == "asc"){
        for (let i = 1; i<array.length; i++){
            let key = array[i];
            let j = i - 1
            while (j >= 0 && array[j] > key){
                array[j+1] = array[j]
                j = j-1
            }
            array[j+1] = key
        }
        return array
    } else if (orden == "desc"){
        for (let i = 1; i<array.length; i++){
            let key = array[i];
            let j = i - 1
            while (j >= 0 && array[j] < key){
                array[j+1] = array[j]
                j = j-1
            }
            array[j+1] = key
        }
        return array
    } else{
        console.log("¿Qué ha pasado? Orden no debería de valer eso");
        alert("¿Qué ha pasado? Orden no debería de valer eso");
    }
}

function mostrarArray(array){
    let frase = "Este es el array --> [" + array + "]";
    alert(frase);
    console.log(frase);
}

function mostrarArrayOrdenado(array){
    let frase = "Este es el array ordenado --> [" + array + "]";
    alert(frase);
    console.log(frase);
}