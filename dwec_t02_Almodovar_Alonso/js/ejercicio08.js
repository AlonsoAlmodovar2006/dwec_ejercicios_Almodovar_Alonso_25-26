console.log("T02 - Ejercicio 08");
/* Desarrolla un script que pida dos números enteros. 
El programa determinará cuál es el menor y mostrará todos los número que hay entre ellos y cuantos hay. 
El script tendrá una función para calcular cual es el menor de los dos: calcular_menor.
Usa console.table() para mostrar listas de números. */
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

let menor = calcular_menor(numero1,numero2);
let mayor = menor === numero1 ? numero2 : numero1;
alert(`${menor} es el menor`);
console.log(`${menor} es el menor`);
console.log(mayor)
let recorrido = [];

for (let i = menor+1; i < mayor; i++){
    recorrido.push(i);
}
console.log(`Hay ${recorrido.length} números entre ${menor} y ${mayor}.`);
alert(`Hay ${recorrido.length} números entre ${menor} y ${mayor}.`);
console.table(recorrido);


function calcular_menor(n1,n2){
    if (n1 > n2){
        return n2;
    } else if (n1 < n2){
        return n1;
    } else{
        return n1;
    }

    // Solución más eficiente: return n1 < n2 ? n1 : n2;
}