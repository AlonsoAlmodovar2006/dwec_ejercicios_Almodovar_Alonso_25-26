console.log("T02 - Ejercicio 15");
let nHoras;
let turno; 
let trabajador = true;
let salariosAbonados = 0;

do {
    nHoras = parseInt(prompt("Dame el número de horas del trabajador: "));
    // No seguir al pie de la letra el enunciado sino tratar de hacer un programa consistente
    if (!Number.isInteger(nHoras) || nHoras < 0) {
        continue;
    }
    turno = prompt("Dame el turno del trabajador: \n - Mañanas (M o m),\n - Tardes (T o t), \n - Noches (N o n)");
    if (turno.toLowerCase() != "m" && turno.toLowerCase() != "t" && turno.toLowerCase() != "n"){
        continue;
    }
        let salarioBruto= calcularSalarioBruto (turno, nHoras);

        let salarioNeto = calcularSalarioNeto(salarioBruto);

        mostrarMensaje(salarioNeto);

        salariosAbonados += salarioBruto;

        trabajador = confirm("¿Deseas añadir otro trabajador?");
    
} while (trabajador);

alert(`El importe total de salarios abonados es: ${salariosAbonados.toFixed(2)} €`);

function calcularSalarioBruto(turno, nHoras){
    let salarioHoraM = 45.00;
    let salarioHoraT = 47.00;
    let salarioHoraN = 50.00;

    let salariobruto;
    switch (turno.toLowerCase()) {
        case "n":
            salariobruto = nHoras * salarioHoraN;
            break;
        case "t":
            salariobruto = nHoras * salarioHoraT;
            break;
        case "m":
            salariobruto = nHoras * salarioHoraM;
            break;
        default:
            console.error("¿Qué ha pasado?");
            break;
    }
    return salariobruto
}

function calcularSalarioNeto(salariobruto){
    let salarioneto;
    if (salariobruto < 600.00){
        salarioneto = salariobruto - (salariobruto * 0.08);
    } else if(salariobruto >= 600.00 && salariobruto <= 1000.00){
        salarioneto = salariobruto - (salariobruto * 0.10);
    } else {
        salarioneto = salariobruto - (salariobruto * 0.12);
    }
    return salarioneto
}

function mostrarMensaje(salarioneto){
    alert(`El salario del trabajador es: ${salarioneto.toFixed(2)} €`);
    console.log(`El salario del trabajador es: ${salarioneto.toFixed(2)} €`);
}
