function arrancarPrograma() {
    functionPrueba3();
}

function functionPrueba3() {
    const aulas = agregarAulas();
    let cabecera = `--- GESTIÓN DE LA UCLM ---\n`;
    let opciones =
        "¿Qué quieres hacer? \n=====\n1. Añadir Alumnos \n2. Asignar Asignatura a Profesor \n3. Consultar Alumnado de Asignatura\n4. Insertar Nota por Profesor y Asignatura \n5. % de Aprobados en Aula \n0. Salir";
    // 5. % --> 1º Elegir Aula, 2º Mostrar el listado de alumnos suspensos y aprobados con su nota media y porcentajes de aprobados del aula (console.log?)
    let mensaje = cabecera + opciones;
    let menu;
    const asignaturas = listarAsignaturas();
    const profesores = listarProfesores();
    do {
        menu = validarNumberConLimites(mensaje, 0, 5);
        switch (menu) {
            case 1:
                caso1(aulas, asignaturas);
                break;
            case 2:
                caso2(asignaturas, profesores);
                break;
            case 3:
                caso3(profesores, aulas);
                break;
            case 4:
                caso4(profesores, aulas)
                break;
            case 5:
                console.log("Hola");
                break;
            case 0:
                console.log("¡Adiós!");
                break;
            default:
                console.log(`¿Qué ha pasado? La variable no debería de valer ${menu}`);
        }
    } while (menu != 0);
}

function caso1(aulas, asignaturas) {
    const miAula = elegir(aulas, "Aula", "id"); // 1º Elegir Aula

    const alumnos = agregarAlumnosaAula(miAula); // 2º Añadir Alumnos al Aula

    matricularAlumnos(alumnos, asignaturas, miAula.curso); // 3º Matricular Alumnos en Asignaturas (Obligatorias y Optativas)
}

function caso2(asignaturas, profesores) {
    const miProfe = elegir(profesores, "Profesor", "nombre"); // 1º Elegir Profe

    // 2º Elegir asignatura que no tenga profe asignado y Asignar Asignatura a Profe
    const asignaturasSinProfe = [];
    const asignaturasConProfe = [];
    for (const profe of profesores) {
        if (profe.asignaturas.length > 0) {
            for (let i = 0; i < profe.asignaturas.length; i++) {
                asignaturasConProfe.push(profe.asignaturas[i]);
            }
        }
    }
    for (let i = 0; i < asignaturas.length; i++) {
        if (!asignaturasConProfe.includes(asignaturas[i].nombre)) {
            asignaturasSinProfe.push(asignaturas[i].nombre)
        }
    }
    let mensaje2 = mostrar(asignaturasSinProfe, "Elige una asignatura", " ");
    let opcion2 = validarNumberConLimites(mensaje2, 1, asignaturasSinProfe.length);
    const asignar = asignarAsignatura.bind(miProfe);
    asignar(opcion2, asignaturasSinProfe);
    console.log(miProfe);
}

function caso3(profesores, aulas) {
    const miProfe = elegir(profesores, "Profesor", "nombre"); // 1º Elegir Profe

    const asignatura = elegir(miProfe.asignaturas, "Asignatura", " "); // 2º Elegir asignatura del profe 

    // 3º Mostrar Alumnado Matriculado
    const alumnosMatriculados = alumnoMatriculado(aulas, asignatura)
    let mensaje = "Estos son los alumnos que pertenecen a la asignatura " + asignatura.nombre + "\n=====";
    let contador = 0
    alumnosMatriculados.forEach((alumno) => {
        mensaje += "\n" + ++contador + ". " + alumno.nombre;
    });
    console.log(mensaje);
}

function caso4(profesores, aulas) {
    const miProfe = elegir(profesores, "Profesor", "nombre"); // 1º Elegir Profe

    const asignatura = elegir(miProfe.asignaturas, "Asignatura", " "); // 2º Elegir asignatura del profe 

    const alumnado = alumnoMatriculado(aulas, asignatura); //  3º Mostrar Alumnado Matriculado 
    const miAlumno = elegir(alumnado, "Alumno", "nombre"); // 4º Elegir Alumno

    // 5º Poner nota
    const nota = validarNumberConLimites("¿Qué nota tiene " + miAlumno.nombre + "?", 0, 10);
    miAlumno.insertarNota(asignatura, nota);
    console.log(miAlumno)
}

function elegir(array, tipo, propiedad) {
    let mensaje = mostrar(array, "Elige un " + tipo, propiedad);
    let opcion = validarNumberConLimites(mensaje, 1, array.length);
    return array[opcion - 1];
}

function agregarAlumnosaAula(aula) {
    const alumnos = aula.pedirDatos();
    aula.insertarAlumnos(alumnos);
    return alumnos
}

function matricularAlumnos(alumnos, asignaturas, curso) {
    for (const alumno of alumnos) {
        const optativas = [];
        for (const asig of asignaturas) {
            if (asig.tipo == "Optativa" && asig.curso == curso) {
                optativas.push(asig);
            }
        }
        alumno.insertarAsignaturas(curso, asignaturas);
        for (let i = 0; i < 2; i++) {
            let mensaje2 = mostrar(
                optativas,
                "Elige una asignatura para: " + alumno.nombre,
                "nombre"
            );
            let opcion2 = validarNumberConLimites(mensaje2, 1, optativas.length);
            alumno.insertarAsignaturaOptativa(opcion2, optativas);
            optativas.splice(opcion2 - 1, 1);
        }
    }
}

function alumnoMatriculado(aulas, asignatura) {
    const elAula = aulas[asignatura.curso - 1];
    const alumnos = [];
    for (const alumno of elAula.alumnos) {
        for (const [clave, valor] of alumno.notas) {
            if (clave == asignatura.nombre) {
                alumnos.push(alumno);
            }
        }
    }
    return alumnos
}

function agregarAulas() {
    const aula1 = new Aula("AU01", "Aula de Primero", 40, 1);
    const aula2 = new Aula("AU02", "Aula de Segundo", 30, 2);
    const aula3 = new Aula("AU03", "Aula de Tercero", 30, 3);
    const aula4 = new Aula("AU04", "Aula de Cuarto", 30, 4);

    const aulas = [aula1, aula2, aula3, aula4];

    return aulas;
}

function mostrar(array, mensaje, propiedad) {
    let mensajeAMostrar = mensaje + "\n";
    let contador = 0;
    if (propiedad != " ") {
        array.forEach((element) => {
            mensajeAMostrar += ++contador + ". " + element[propiedad] + "\n";
        });
    } else {
        array.forEach((element) => {
            mensajeAMostrar += ++contador + ". " + element + "\n";
        });
    }

    return mensajeAMostrar;
}

function validarNumberConLimites(mensaje, min, max) {
    let esValido = true;
    let menu;
    do {
        menu = parseInt(prompt(mensaje));
        if (!Number.isInteger(menu) || menu < min || menu > max) {
            console.log(
                `El número tiene que ser entero positivo en el intervalo del ${min} al ${max}`
            );
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return menu;
}