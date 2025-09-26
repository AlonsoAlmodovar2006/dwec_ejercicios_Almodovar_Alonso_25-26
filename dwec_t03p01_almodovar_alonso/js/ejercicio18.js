console.log("T03 - Ejercicio 18");
/* Crea un script que pida al usuario la fecha de su nacimiento (para saber su cumpleaños). 
El script mostrará si hoy es su cumpleaños y su edad. 
Si hoy no es su cumpleaños mostrará los días que quedan para su próximo cumpleaños.
Hay que verificar previamente si la fecha es correcta sin usar expresiones regulares 
(la fecha solo será correcta con este formato: DD/MM/YYYY).*/
let arrayFecha = [];
let fecha;

do {
    fecha = prompt("Dame la fecha de tu nacimiento. Separado así: DD/MM/YYYY");
    arrayFecha = fecha.split("");
    if (arrayFecha[2] != "/" || arrayFecha[5] != "/" || !arrayFecha.includes(arrayFecha[9])) {
        alert(
            "No has puesto la fecha en este formato: DD/MM/YYYY. Vuelve a hacerlo "
        );
    }
} while (arrayFecha[2] != "/" || arrayFecha[5] != "/"|| !arrayFecha.includes(arrayFecha[9]));

let miFecha = new Date();
arrayFecha = fecha.split("/");

let dia = miFecha.getDate() - arrayFecha[0];
let mes = miFecha.getMonth() + 1 - arrayFecha[1];
let year = miFecha.getFullYear() - arrayFecha[2];

let calculoDias = 0;

if (dia == 0 && mes == 0){
    alert(`Felicidades!!!!! Has cumplido ${year} años`);
}

if (mes < 0 || (mes == 0 && dia < 0)){
    calculoDias = (Math.abs(mes) -1)* 30 + dia;
    alert(`Quedan ${calculoDias} días, para tu próximo cumpleaños`);
}

if (mes > 0){
    calculoDias = (12 - mes) * 30 + dia;
    alert(`Quedan ${calculoDias} días, para tu próximo cumpleaños`);
}