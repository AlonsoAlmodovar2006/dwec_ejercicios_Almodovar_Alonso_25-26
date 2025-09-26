console.log("T03 - Ejercicio 14");
/* Crea un script que pida al usuario la fecha de su nacimiento (para saber su cumpleaños) y le indique su edad actual. */
let fecha = prompt("Dame la fecha de tu nacimiento. Separado en espacios");
let arrayFecha = fecha.split(" ");

let miFecha = new Date();

let dia = miFecha.getDate() - arrayFecha[0];
let mes = (miFecha.getMonth()+1) - arrayFecha[1];
let year = miFecha.getFullYear() - arrayFecha[2];

console.log(miFecha.getMonth())
console.log(dia)
console.log(mes)
console.log(year)

if (mes < 0 || dia < 0){
    year--;
}

alert(`Actualmente tienes: ${year} años`);
