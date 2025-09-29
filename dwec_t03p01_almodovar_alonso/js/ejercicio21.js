console.log("T03 - Ejercicio 21");

/* Elabora un script que determine si un usuario ha introducido un número nacional fijo o móvil válido. 
Suponer que los números fijos válidos empiezan por 8 o 9 y que constan de 9 dígitos. 
Asimismo, un número móvil válido empieza por 6 o 7 y constan también de 9 dígitos. 
Deberás hacer uso del objeto RegExp y crear una función que se denomine "validarTelefono()" que reciba la cadena introducida por el usuario y devuelva un booleano.
Puedes usar una IA para generar el patrón, entendiendo dicho patrón.
Hecho esto, definirás una función que se llame validarPrefijoTeléfonoEsp() que permita validar si un teléfono introducido tiene el prefijo +34. 
Y para terminar harás una función llamada validarTelefonoConSin() que invoque a las dos funciones anteriores, según sea conveniente. */

let consola = prompt("Dame un número de teléfono fijo o móvil");
if (validarTelefonoConSin(consola)) {
    alert("Has puesto un número válido");
} else {
    alert(
        "Has puesto un número inválido. Revisa por si lo has puesto con espacios"
    );
}
function validarTelefono(cadena) {
    let patt = new RegExp(/^[6789]\d{8}$/);
    return patt.test(cadena);
}

function validarPrefijoTeléfonoEsp(cadena) {
    let patt = new RegExp(/^\+34[6789]\d{8}$/);
    return patt.test(cadena);
}

function validarTelefonoConSin(cadena) {
    if (cadena.length == 12) {
        return validarPrefijoTeléfonoEsp(cadena);
    } else if (cadena.length == 9) {
        return validarTelefono(cadena);
    } else {
        return false;
    }
}
