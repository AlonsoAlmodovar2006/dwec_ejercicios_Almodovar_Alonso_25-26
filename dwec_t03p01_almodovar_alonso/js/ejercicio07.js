console.log("T03 - Ejercicio 07");
/* Un usuario puede darte una hora usando los siguientes formatos: "HH:MM", "HH-MM" o "HH.MM". 
Determina qué separador ha usado el usuario y crea un objeto Date con la hora introducida por el usuario. 
Después verifica si la hora es válida. */
let horaConsola = prompt("Dame una hora (HH-MM)");
let separador;
let esValida = true;
let fecha;

if (horaConsola.includes("-")) {
    separador = "-";
} else if (horaConsola.includes("/")) {
    separador = "/";
} else if (horaConsola.includes(".")) {
    separador = ".";
} else {
    esValida = false;
}

if (esValida) {
    let partes = horaConsola.split(separador);
    if (partes.length !== 2) {
        esValida = false;
    }

    const hora = Number(partes[0]);
    const minutos = Number(partes[1]);

    if (isNaN(hora) || isNaN(minutos)) {
        esValida = false;
    } else if (hora > 23 || minutos > 59) {
        esValida = false;
    } else {
        fecha = new Date(4, 12, 25, hora, minutos);
        if (fecha.getHours() !== hora || fecha.getMinutes() !== minutos) {
            esValida = false;
        }
    }
}
if (esValida){
    alert("La hora que has puesto es válida");
} else {
    alert("La hora que has puesto no es válida");
}
