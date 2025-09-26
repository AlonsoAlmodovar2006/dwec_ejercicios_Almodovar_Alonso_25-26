console.log("T03 - Ejercicio 15");
/* Repite el ejercicio verificando si la fecha es correcta sin usar expresiones regulares 
(la fecha solo será correcta con este formato: DD/MM/YYYY):  */
let arrayFecha = [];
let fecha;
do {
    fecha = prompt("Dame la fecha de tu nacimiento. Separado así: DD/MM/YYYY");
    arrayFecha = fecha.split("");
    if (arrayFecha[2] != "/" || arrayFecha[5] != "/") {
        alert(
            "No has puesto la fecha en este formato: DD/MM/YYYY. Vuelve a hacerlo "
        );
    }
} while (arrayFecha[2] != "/" || arrayFecha[5] != "/");

let miFecha = new Date();
arrayFecha = fecha.split("/")

let dia = miFecha.getDate() - arrayFecha[0];
let mes = miFecha.getMonth() + 1 - arrayFecha[1];
let year = miFecha.getFullYear() - arrayFecha[2];

console.log(miFecha.getMonth());
console.log(dia);
console.log(mes);
console.log(year);

if (mes < 0 || dia < 0) {
    year--;
}

alert(`Actualmente tienes: ${year} años`);
