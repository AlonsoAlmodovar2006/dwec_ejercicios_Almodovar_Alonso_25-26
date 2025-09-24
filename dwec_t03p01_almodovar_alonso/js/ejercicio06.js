console.log("T03 - Ejercicio 06");
/* Un usuario puede darte una fecha usando los siguientes formatos: "DD-MM-YYYY", "DD/MM/YYYY" o "DD MM YYYY". 
Determina qué separador ha usado el usuario y crea un objeto Date con la fecha introducida por el usuario. 
Después verifica si la fecha es válida. */
let fechaConsola = prompt("Dame una fecha (DD-MM-YYYY)");
let separador;
let esValida = true;
let fecha;

if (fechaConsola.includes("-")) {
    separador = "-";
} else if (fechaConsola.includes("/")) {
    separador = "/";
} else if (fechaConsola.includes(" ")) {
    separador = " ";
} else {
    esValida = false;
}

if (esValida) {
    let partes = fechaConsola.split(separador);
    if (partes.length !== 3) {
        esValida = false;
    }

    const dia = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const anio = Number(partes[2]);

    if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
        esValida = false;
    } else {
        fecha = new Date(anio, mes, dia);
        if (fecha.getFullYear() !== anio || fecha.getMonth() !== mes || fecha.getDate() !== dia) {
            esValida = false;
        }
    }
}

if (esValida) {
    alert("La fecha que has puesto es válida");
} else {
    alert("La fecha que has puesto no es válida");
}

/*console.log(validarFecha("22-09-2020")); // {valida: true, fecha: Tue Sep 22 2020 ...}
console.log(validarFecha("22/09/2020")); // {valida: true, fecha: Tue Sep 22 2020 ...}
console.log(validarFecha("22 09 2020")); // {valida: true, fecha: Tue Sep 22 2020 ...}
console.log(validarFecha("31-02-2020")); // {valida: false, fecha: null}
console.log(validarFecha("22.09.2020")); // {valida: false, fecha: null}*/