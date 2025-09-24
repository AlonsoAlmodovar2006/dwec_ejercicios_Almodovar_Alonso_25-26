console.log("T03 - Ejercicio 09");
/*Haz un script que pida al usuario cuántos números quiere introducir, 
después los introducirá en un array y finalmente mostrará el menor y el mayor. 
Para mostrar el menor y el mayor deberás hacer uso de los métodos "max()" y "min()" del objeto Math. */
let nNumeros;
do {
    nNumeros = parseInt(prompt("¿Cuántos números quieres introducir?"));
    if (!Number.isInteger(nNumeros) || nNumeros < 0) {
        alert("No es un número entero positivo. Inténtalo de nuevo.");
    }
} while (!Number.isInteger(nNumeros)  || nNumeros < 0);
let arrayNumeros = [];
let consola;
for (let i = 0; i < nNumeros; i++) {
    do {
        consola = Number(prompt(`Dame el número ${i + 1}`));
        if (isNaN(consola)) {
            alert("No es un número válido. Inténtalo de nuevo.");
        }
    } while (isNaN(consola));
    arrayNumeros[i] = consola;
}
alert(`El número menor de los que has puesto es: ${Math.min(...arrayNumeros)}`);
console.log(`El número menor de los que has puesto es: ${Math.min(...arrayNumeros)}`)
alert(`El número mayor de los que has puesto es: ${Math.max(...arrayNumeros)}`)
console.log(`El número mayor de los que has puesto es: ${Math.max(...arrayNumeros)}`)


