console.log("T02 - Ejercicio 02");
/*Desarrolla un script que pida un número e indique si es múltiplo de 2, de 5 o de ambos.
Antes de calcular, comprobar que el usuario introduce realmente un número (usando isNaN). */
let numero;

do {
    numero = parseInt(prompt("Dame un número"));
    if (isNaN(numero)) {
        alert("No has puesto un número");
    }
} while (isNaN(numero));

if (numero % 2 == 0 && numero % 5 == 0) {
    alert(`${numero} es múltiplo de 2 y de 5`);
    console.log(`${numero} es múltiplo de 2 y de 5`);
} else if (numero % 2 == 0) {
    alert(`${numero} es múltiplo de 2`);
    console.log(`${numero} es múltiplo de 2`);
} else if (numero % 5 == 0) {
    alert(`${numero} es múltiplo de 5`);
    console.log(`${numero} es múltiplo de 5`);
} else {
    alert(`${numero} no es múltiplo ni de 2 ni de 5`);
    console.log(`${numero} no es múltiplo ni de 2 ni de 5`);
}
