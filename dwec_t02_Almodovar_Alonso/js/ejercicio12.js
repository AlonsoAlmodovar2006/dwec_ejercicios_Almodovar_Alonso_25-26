console.log("T02 - Ejercicio 12");
/*Escribir un programa que pregunte al usuario una cantidad a invertir, 
el interés anual y el número de años, y muestre por pantalla el capital obtenido en la inversión.*/
let cantidadEuros;
let interesAnual;
let nAnios;

do {
    cantidadEuros = Number(prompt("Dame la cantidad de € a invertir"));
    if (isNaN(cantidadEuros) || cantidadEuros < 0){
        alert("No me lo has dado bien. Tiene que ser un número real positivo");
    }
} while (isNaN(cantidadEuros) || cantidadEuros < 0)

do {
    interesAnual = parseInt(prompt("Dame el % de interés anual"))
    if (!Number.isInteger(interesAnual) || interesAnual < 0){
        alert("No me lo has dado bien. Tiene que ser entero y positivo")
    }
    if(interesAnual > 100){
        alert("Es demasiado raro que sea mayor de 100. ¿Te están estafando?");
    }
} while (!Number.isInteger(interesAnual) || interesAnual < 0)

do {
    nAnios = parseInt(prompt("Dame el número de años"))
    if (!Number.isInteger(nAnios) || nAnios < 0){
        alert("No me lo has dado bien. Tiene que ser entero y positivo")
    }
    if(nAnios > 100){
        alert("Te vas a morir sin saber nada sobre ese dinero. ¿Merece la pena?");
    }
} while (!Number.isInteger(nAnios) || nAnios < 0)

let porcentaje = interesAnual/100;
let formula = cantidadEuros * (nAnios*porcentaje);
let capitalObtenido = (formula + cantidadEuros) - cantidadEuros;

alert(`En ${nAnios} habrás obtenido de beneficio, ${capitalObtenido} €`);
console.log(`En ${nAnios} años habrás obtenido de beneficio, ${capitalObtenido} €`);