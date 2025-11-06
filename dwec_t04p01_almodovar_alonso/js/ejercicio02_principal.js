function functionPrueba1() {
    const yo = new Alumno("71371662V", "Alonso Almodóvar Delgado", "09-10-2006", 9.76, 7.66, 8.75, 'h')
    const alterEgo = new Alumno("71371663H", "Alonso Almotróvar Del faro", "09-01-1996", 6.79, 6.67, 5.78, 'm')
    let mensaje1 = yo.mostrarInformacion();
    console.log(mensaje1)
    let mensaje2 = alterEgo.mostrarInformacion();
    console.log(mensaje2)
    const resultado = yo.comparar(alterEgo)
    switch (resultado) {
        case 1:
            console.log(yo.nombre + " es el que más nota ha sacado")
            break;
        case 0:
            console.log("Los dos (" + yo.nombre + ", " + alterEgo.nombre + ") han sacado lo mismo")
            break;
        case -1:
            console.log(alterEgo.nombre + " es el que más nota ha sacado")
            break;
    }
    alterEgo.cambiarNota(4.50, 4.80, 5.10);
    if (alterEgo.estaAprobado()) {
        console.log("Aprobado!!");
    } else {
        console.log("Suspenso. A recuperar")
    }
    let mensaje3 = alterEgo.mostrarInformacion();
    console.log(mensaje3)
} 

function funcionPrueba2() {
    let nMaxAlumnos = validarNumberConLimites("Dame el número máximo de alumnos que pueden caber en esta clase", 1, 900);
    const aula = new Aula(nMaxAlumnos, 1, "A113", 2);
    let cabecera = `--- GESTIÓN DEL AULA "${aula.descripcion}" (Curso: ${aula.curso}º) ---\n`;
    let opciones = "Menú Aula \n=====\n1. Matricular nuevos alumnos \n2. Mostrar todos los alumnos del aula \n3. Calcular la nota media del aula \n4. Encontrar alumno/s con la mejor nota \n5. Ver estadísticas de Aprobados/Suspensos \n6. Grupos Aulas \n7. Salir"
    let mensaje = cabecera + opciones;
    let menu;
    do {
        menu = validarNumberConLimites(mensaje, 1, 6);
        switch (menu) {
            case 1:
                const alumnosAnadidos = aula.pedirDatos()
                aula.insertarAlumnos(alumnosAnadidos);
                break;
            case 2:
                aula.mostrarDatos();
                break;
            case 3:
                let mediaClase = aula.mediasNota()
                console.log("La nota media del aula es --> " + mediaClase);
                break;
            case 4:
                const alumnosNota = aula.mejorNota();
                let mensaje = "La mejor nota de la clase la tienen: "
                for (let i = 0; i < alumnosNota.length; i++) {
                    mensaje += "\n - " + alumnosNota[i].nombre;
                }
                console.log(mensaje);
                break;
            case 5:
                let porcentaje = aula.mostrarSuspensosAprobados();
                console.log(porcentaje);
                break;
            case 6:
                console.log("¡Adiós!");
                break;
            default:
                console.log(`¿Qué ha pasado? La variable no debería de valer ${menu}`);
        }
    } while (menu != 6)
}

function funcionPrueba2ampliado(){

}

// functionPrueba1();
funcionPrueba2();

function validarNumberConLimites(mensaje, min, max) {
    let esValido = true;
    let menu;
    do {
        menu = parseInt(prompt(mensaje));
        if (!Number.isInteger(menu) || menu < min || menu > max) {
            console.log(`El número tiene que ser entero positivo en el intervalo del ${min} al ${max}`);
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return menu
}