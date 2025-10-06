console.log("T03 - Ejercicio 06");
/* Desarrolla un script que cree dos arrays de 10 elementos. 
El primer array tendrá los nombres de 10 personas y 
el segundo array tendrá los teléfonos móviles de esas 10 personas, 
de forma que la persona que ocupa la posición 4 del primer array tendrá su número de teléfono en la posición 4 del segundo array.
El script pedirá el nombre de una persona y mostrará el teléfono de dicha persona. 
Puede ocurrir que no exista esa persona o que haya dos personas con el mismo nombre. 
En ese caso se mostrarán los dos teléfonos. */

const arrayNombres = ["alberto" , "alonso", "victor" , "orwin" , "carmen" , "luis" , "dani", "ana" , "miguel", "mikel"];
const arrayTelefonos = [695554740, 695554741, 695554742, 695554743, 695554744, 695554745, 695554746, 695554747, 695554748, 695554749];
let nombre = null;
let telefono = null;

let consola = prompt("Dame un nombre").toLowerCase();
arrayNombres.forEach((element, indice) => {
    if (element == consola) {
        nombre = element;
        telefono = arrayTelefonos[indice];
    }
});

if (nombre !== null){
    alert(`El número de teléfono de ${nombre} es --> ${telefono}`);
    console.log(`El número de teléfono de ${nombre} es --> ${telefono}`);
}else{
    alert("No se ha encontrado ese nombre en la lista")
    console.log("No se ha encontrado ese nombre en la lista")
}
