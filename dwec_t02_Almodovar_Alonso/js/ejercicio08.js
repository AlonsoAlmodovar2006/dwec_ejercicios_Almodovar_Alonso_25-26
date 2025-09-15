console.log("T0X - Ejercicio 0X");
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
} while (isNaN(numero1));

let menor = calcular_menor(numero1,numero2);
let mayor = !menor ? numero1 : numero2;
console.log(mayor)
let recorrido = [];

for (i = menor; i < mayor; menor++){
    recorrido.push(i);
}
console.table(recorrido)


function calcular_menor(n1,n2){
    let menor; 
    let mayor;
    if (n1 > n2){
        menor = n2;
        mayor = n1;
        alert(`${n2} es el menor`);
        console.log(`${n2} es el menor`);
        return n2;
    } else if (n1 < n2){
        menor = n1;
        mayor = n2;
        alert(`${n1} es el menor`);
        console.log(`${n1} es el menor`);
        return n1;
    } else{
        alert("Los dos números son iguales");
        console.log("Los dos números son iguales");
        menor = n1;
        mayor = n2;
        return n1;
    }
}