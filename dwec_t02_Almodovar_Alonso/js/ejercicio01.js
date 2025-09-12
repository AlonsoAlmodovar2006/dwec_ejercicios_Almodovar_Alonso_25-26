console.log("T02 - Ejercicio 01");
/*Desarrolla un script que pida 3 números reales al usuario y calcule su media aritmética 
e indique la calificación del alumno usando la siguiente notación: 
SUSPENSO (Menos de 5), APROBADO (entre 5 y 7), NOTABLE (entre 7 y 8.5), SOBRESALIENTE (entre 8,5 y 10).*/ 
let notas = 0;  
let calificacion = "";    
for (let i=1; i<4; i++) {  
    let nota = parseFloat(prompt(`Dame tu nota del trimestre ${i}`));
    while (nota > 10 || nota < 0 || isNaN(nota)){
        alert("Tu nota tiene que ser un número mayor de 1 y menor de 10");
        nota = parseFloat(prompt(`Dame tu nota del trimestre ${i}`));
    }
    notas+= nota;
}
let media = (notas)/3;
if (media < 5){
    calificacion = "SUSPENSO";
} else if (media >= 5 && media < 7){
    calificacion = "APROBADO";
} else if (media >= 7 && media < 8.5){
    calificacion = "NOTABLE";
} else if (media >= 8.5 && media < 10){
    calificacion = "SOBRESALIENTE";
} else {
    calificacion = "ERROR";
}
alert(`Tu calificación final es: ${calificacion}`)
console.log(calificacion)