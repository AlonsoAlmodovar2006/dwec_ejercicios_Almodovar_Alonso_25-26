console.log("T03 - Ejercicio 22");
/* Busca en internet dos expresiones regulares. 
Una que permita validar un DNI y otra que permita validar un CIF. 
Crea script que pida al usuario una cadena y determine si es DNI o CIF válido. 
Es necesario que definas una función que se denomine "validarDNIyCIF()" que reciba una cadena y devuelva un booleano.
Después, busca el algoritmo que permite comprobar si el DNI o el CIF son correctos (es decir, si corresponde la letra al número)
Puedes usar una IA para generar el patrón y el segundo algoritmo de comprobación, entiendo el código dado. */

let consola = prompt("Dame un DNI o un CIF válido");

if (validarDNIyCIF(consola)) {
    if (isValidDniNIEStrict(consola)){
        alert("Has puesto un DNI válido");
    } else if(!isValidDniNIEStrict(consola)){
        alert("Has puesto un DNI inválido")
    } else if (isValidCIF(consola)){
        alert("Has puesto un CIF válido");
    } else if (!isValidCIF(consola)){
        alert("Has puesto un CIF inválido");
    }
    
} else {
    alert("Has puesto un número inválido. Fíjate lo mal que está que no sé si es DNI o CIF");
}

function validarDNIyCIF(cadena) {
    if (/^[0-9]{8}[A-Z]$/.test(cadena) || /^[XYZ][0-9]{7}[A-Z]$/.test(cadena) || /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/.test(cadena)) {
        return true
    } else {
        return false;
    }
}

function isValidCIF(cif) {
    if (typeof cif !== "string") return false;

    // Formato: letra inicial + 7 dígitos + dígito de control
    const cifRegex = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/;

    if (!cifRegex.test(cif)) return false; // Formato inválido

    const letraInicial  = cif.charAt(0);
    const digitos = cif.slice(1, 8);
    const controlFinal = cif.charAt(8);

    // Suma de posiciones pares e impares según regla
    let sumPar = 0;
    let sumImpar = 0;

    for (let i = 0; i < digitos.length; i++) {
        const num = parseInt(digitos.charAt(i), 10);
        if ((i + 1) % 2 === 0) {
            sumPar += num; // posiciones pares
        } else {
            let temp = num * 2;
            if (temp > 9) temp = Math.floor(temp / 10) + (temp % 10); // sumar dígitos
            sumImpar += temp;
        }
    }

    const total = sumPar + sumImpar;
    const remainder = total % 10;
    const calcularCode = (10 - remainder) % 10; // dígito de control

    let esValido = false;
    if (letraInicial === 'X' || letraInicial === 'P') {
        const letraEsperada = String.fromCharCode(64 + calcularCode);
        esValido = controlFinal === letraEsperada;
    }
    // Si controlFinal es número
    else if (!isNaN(controlFinal)) {
        esValido = parseInt(controlFinal, 10) === calcularCode;
    }
    // Si controlFinal es letra
    else if (/[A-J]/.test(controlFinal)) {
        const tablaLetras = ["A","B","C","D","E","F","G","H","I","J"];
        esValido = controlFinal === tablaLetras[calcularCode - 1];
    }

    return esValido;
}

function isValidDniNIEStrict(input) {
    if (typeof input !== "string") return false;

    // Formato: DNI -> 8 dígitos + letra mayúscula, NIE -> [XYZ] + 7 dígitos + letra mayúscula
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;

    if (!dniRegex.test(input) && !nieRegex.test(input)) {
        return false; // Formato inválido (minúscula o caracteres extra)
    }

    // Tabla de letras para la comprobación
    const letters = "TRWAGMYFPDXBNJZSQVHLCKE";

    // Extraer parte numérica
    let numberPart;
    if (nieRegex.test(input)) {
        const first = input.charAt(0);
        const rest = input.slice(1, 8);
        const firstMap = {
            X: "0",
            Y: "1",
            Z: "2",
        }[first];
        numberPart = firstMap + rest;
    } else {
        numberPart = input.slice(0, 8);
    }

    const num = parseInt(numberPart, 10);
    const expectedLetter = letters.charAt(num % 23);

    // Letra dada
    const givenLetter = input.charAt(input.length - 1);

    return expectedLetter === givenLetter;
}