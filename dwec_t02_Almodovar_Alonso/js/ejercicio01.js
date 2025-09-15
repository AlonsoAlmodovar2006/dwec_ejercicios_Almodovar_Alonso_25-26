console.log("T02 - Ejercicio 01");
/*Desarrolla un script que pida 3 números reales al usuario y calcule su media aritmética 
e indique la calificación del alumno usando la siguiente notación: 
SUSPENSO (Menos de 5), APROBADO (entre 5 y 7), NOTABLE (entre 7 y 8.5), SOBRESALIENTE (entre 8,5 y 10).*/
let sumaNotas = 0;
let notaFinal;

for (let i = 1; i <= 3; i++) {
    let nota;
    do {
        nota = parseFloat(prompt(`Dame tu nota del trimestre ${i}`));
        if (nota > 10 || nota < 0 || isNaN(nota)) {
            alert("Tu nota tiene que ser entre 0 y 10");
        }
    } while (nota > 10 || nota < 0 || isNaN(nota));
    sumaNotas += nota;
}

let media = sumaNotas / 3;

if (media < 5) {
    notaFinal = "SUSPENSO";
} else if (media < 7) {
    notaFinal = "APROBADO";
} else if (media < 8.5) {
    notaFinal = "NOTABLE";
} else if (media <= 10) {
    notaFinal = "SOBRESALIENTE";
} else {
    notaFinal = "ERROR";
}

alert(`Tu calificación final es: ${notaFinal}`);
console.log(notaFinal);
