console.log("T03 - Ejercicio 23");
/* Desarrolla un script que determine si el formato usado en una fecha dada por el usuario es válido o no. 
Los formatos de fechas válidos son DD-MM-YYYY, DD-MM-YY, DD/MM/YYYY y DD/MM/YY. 
Deberás hacer uso del objeto ExpReg y crear una función que se denomine "validarFormatoFecha()" que reciba la cadena introducida por el usuario y devuelva un booleano. 
La expresión regular debes crear usando el método: 
Puedes usar una IA para generar el patrón, entendiendo dicho patrón.
Después tienes que crear un objeto de tipo Date y determinar si la fecha es correcta. */

let consola = prompt("Dame una fecha");
if (validarFormatoFecha(consola)) {
    const partes = consola.split(/[\/|-]/);
    let dia = parseInt(partes[0], 10);
    let mes = parseInt(partes[1], 10) - 1;
    let anio = parseInt(partes[2], 10);

    if (partes[2].length === 2) {
        anio = 2000 + anio;
    }

    const fecha = new Date(anio, mes, dia);
    if (
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes &&
        fecha.getDate() === dia
    ) {
        alert("Has puesto una fecha válida");
    } else {
        alert("Has puesto una fecha inválida");
    }
} else {
    alert("Has puesto una fecha inválida");
}

function validarFormatoFecha(cadena) {
    const regex = new RegExp(
        /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{2}|\d{4})$/
    );
    return regex.test(cadena);
}
