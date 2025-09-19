console.log("T02 - Ejercicio 09");
/* Desarrolla un script que pida un número y a continuación muestre el siguiente menú:
Menú
----
1. Calcular si es múltiplo de 2.
2. Calcular si es múltiplo de 3.
3. Calcular si es múltiplo de 5.
0. Salir
El programa mostrará el resultado en función de la opción elegida. 
Deberás crear tres funciones para resolver cada una de las opciones. */
let numero;
do {
    numero = parseInt(prompt("Dame un número"));
    if (isNaN(numero)) {
        alert("No has puesto un número");
    }
} while (isNaN(numero));

// Se puede mejorar la lógica de pedirMenu para pedirlo menos veces
let menu = pedirMenu();

while (menu == 1 || menu == 2 || menu == 3) { 
    switch (menu){
        case 1:
            multiplo2(numero);
            menu = pedirMenu();
            break;
        case 2:
            multiplo3(numero);
            menu = pedirMenu();
            break;
        case 3: 
            multiplo5(numero);
            menu = pedirMenu();
            break;
        default:
            console.log("¿Qué ha pasado?");
    }
}

function multiplo2(numero) {
    if (numero % 2 == 0) {
        alert(`${numero} es múltiplo de 2`);
        console.log(`${numero} es múltiplo de 2`);
    } else {
        alert(`${numero} no es múltiplo de 2`);
        console.log(`${numero} no es múltiplo de 2`);
    }
}

function multiplo3(numero) {
    if (numero % 3 == 0) {
        alert(`${numero} es múltiplo de 3`);
        console.log(`${numero} es múltiplo de 3`);
    } else {
        alert(`${numero} no es múltiplo de 3`);
        console.log(`${numero} no es múltiplo de 3`);
    }
}

function multiplo5(numero) {
    if (numero % 5 == 0) {
        alert(`${numero} es múltiplo de 5`);
        console.log(`${numero} es múltiplo de 5`);
    } else {
        alert(`${numero} no es múltiplo de 5`);
        console.log(`${numero} no es múltiplo de 5`);
    }
}

function pedirMenu() {
    alert("Menú \n---- \n1. Calcular si es múltiplo de 2. \n2. Calcular si es múltiplo de 3. \n3. Calcular si es múltiplo de 5. \n0. Salir");
    let menu;
    do {
        menu = parseInt(prompt("Dame un número entre el 0 y 3"));
        if (isNaN(menu) || menu < 0 || menu > 3) {
            alert("No has puesto un número entre 0 y 3");
        }
    } while (isNaN(menu) || menu < 0 || menu > 3);
    return menu;
}