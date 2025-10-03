console.log("T03 - Ejercicio 03");
/* Desarrolla un script que cambie el orden de los elementos de un array, es decir que el primero será el último, el segundo será el penúltimo y así sucesivamente hasta que el último sea el primero. 
Lo harás definiendo dos funciones. 
La primera función lo resolverá de forma "manual" y la segunda lo resolverá usando uno de los métodos del objeto Array que permite cambiar el orden de forma directa. 
¿Qué método es ese?*/
const miArray = [1,2,3,4,5];
const arrayManual = manual(miArray);
const arrayFuncion = miArray.reverse();
console.log(`Array invertido manualmente: ${arrayManual}`);
console.log(`Array invertido con .reverse(): ${arrayFuncion} `);

function manual (array){
    for (let i = 0; i< array.length; i++){
        for (let j = i - (array.length-1); j > 0; j--){
            array[i] = array[j]
        }
    }
    return array;
}