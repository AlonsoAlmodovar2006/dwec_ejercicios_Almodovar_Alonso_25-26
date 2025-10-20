console.log("T03 - Ejercicio 12");

const setEstados = new Set(["toDo", "done"]);
// [Categoría [nombreTarea, estado]]
// const arrayCategorias = [["compra"], ["libro", ["leer", "done"], ["escribir", "toDo"]]];
const arrayCategorias = [];

if (arrayCategorias.length == 0) {
    addPrimeraCategoria(arrayCategorias);
    let menu2 = validarMenu("¿Qué quieres hacer? \n1. Añadir tarea \n2. Crear otra categoria", 1, 2);
    switch (menu2) {
        case 1:
            addTarea(arrayCategorias[0]);
            break;
        case 2:
            addCategoria(arrayCategorias);
            break;
        default:
            console.log(`¿Qué ha pasado? La variable no debería de valer ${menu2}`);
    }
}
let menu1 = validarMenu("Menú 1 \n===== \n1. Listar categorías \n2. Añadir nueva categoría \n3. Borrar categoría \n4. Salir", 1, 4);
do {
    switch (menu1) {
        case 1:
            listarCategoria(arrayCategorias);
            break;
        case 2:
            addCategoria(arrayCategorias);
            break;
        case 3:
            borrarCategoria(arrayCategorias);
            break;
        case 4:
            console.log("¡Adiós!");
            break;
        default:
            console.log(`¿Qué ha pasado? La variable no debería de valer ${menu1}`);
    }
    if (menu1 != 4) {
        menu1 = validarMenu("Menú 1 \n===== \n1. Listar categorías \n2. Añadir nueva categoría \n3. Borrar categoría \n4. Salir", 1, 4);
    }
} while (menu1 != 4)
console.log(arrayCategorias);

function listarCategoria(matriz) {
    let mensaje = "Menú 2\n====\n";
    let numero = 0;
    for (let i = 0; i < matriz.length; i++) {
        mensaje += `    ${++numero}. ` + matriz[i][0] + "\n";
    }
    mensaje += `    ${++numero}. Atrás` + "\n";
    if (numero > 1) {
        let menu = validarMenu(mensaje, 1, matriz.length + 1);
        if (menu != matriz.length + 1) {
            categoriaSeleccionada(menu, matriz);
        }
    } else {
        console.log("No hay categorías en tu listado")
    }
}

function categoriaSeleccionada(menu, matriz) {
    const categoriaActual = matriz[menu - 1];
    let seleccionUsuario;
    do {
        let mensaje = `Menú 3. Categoría ${categoriaActual[0]}\n======\n`;
        let indice = 0;
        for (let i = 1; i < categoriaActual.length; i++) {
            mensaje += `    ${++indice}. ` + categoriaActual[i][0] + ` (${categoriaActual[i][1]})\n`;
        }
        mensaje += `    ${++indice}. Añadir nueva tarea\n    ${++indice}. Borrar tarea\n    ${++indice}. Atrás`;

        seleccionUsuario = validarEntradaString(mensaje);
        // validarMenu(mensaje, 1, indice); 
        if (seleccionUsuario.includes(",")) {
            pasarADone(categoriaActual, seleccionUsuario)
        } else {
            const opcionNumerica = parseInt(seleccionUsuario);
            const min = 1;
            const max = categoriaActual.length + 2;

            if (!Number.isInteger(opcionNumerica) || opcionNumerica < min || opcionNumerica > max) {
                console.log(`El número tiene que ser entero en el intervalo del ${min} al ${max}`);
            } else {
                if (seleccionUsuario < categoriaActual.length) {
                    pasarADone(categoriaActual, opcionNumerica.toString());
                } else if (seleccionUsuario == categoriaActual.length) {
                    addTarea(categoriaActual);
                } else if (seleccionUsuario == categoriaActual.length + 1) {
                    borrarTarea(categoriaActual);
                } else if (seleccionUsuario == categoriaActual.length + 2) {
                    console.log("¡Adiós!");
                } else {
                    console.log(`¿Qué ha pasado? La variable no debería de valer ${seleccionUsuario}`);
                }
            }
        }
    } while (parseInt(seleccionUsuario) != categoriaActual.length + 2);

    listarCategoria(matriz);
}

function addPrimeraCategoria(matriz) {
    let categoria = validarEntradaString("Dame la categoría que quieras añadir");
    return matriz.push([categoria]);
}

function addCategoria(matriz) {
    let continuar;
    do {
        let esValido = true;
        let categoria = validarEntradaString("Dame la categoría que quieras añadir");

        for (let i = 0; i < matriz.length; i++) {
            if (matriz[i][0].toLowerCase() == categoria.toLowerCase()) {
                console.log("Esta categoría ya existe. Repítela de nuevo");
                esValido = false;
                break;
            }
        }
        if (esValido) {
            matriz.push([categoria]);
            continuar = validarEntradaConfirmaciones("Quieres añadir más categorías? (s o n)");
        } else {
            continuar = "s";
        }
    } while (continuar.toLowerCase() == "s");
}

function borrarCategoria(matriz) {
    let hayElemento = false;
    let borrable = true;
    let categoria;
    let menu;
    if (matriz.length == 0) {
        console.log("No hay categorías en tu listado")
    } else {
        do {
            let mensaje = 'Categorías \n';
            let numero = 0;
            for (let i = 0; i < matriz.length; i++) {
                mensaje += `    ${++numero}. ` + matriz[i][0] + "\n";
            }
            menu = validarMenu(mensaje, 1, matriz.length)
            categoria = matriz[menu - 1][0]

            for (let i = 0; i < matriz.length; i++) {
                if (matriz[i][0].toLowerCase() == categoria.toLowerCase()) {
                    hayElemento = true;
                    break;
                }
            }

            if (!hayElemento) {
                console.log("El valor dado no es una categoría. Repítelo");
            }
        } while (!hayElemento);

        for (let i = 0; i < matriz.length; i++) {
            if (matriz[i][0].toLowerCase() == categoria.toLowerCase()) {
                if (matriz[i].length == 1) {
                    break;
                }
                for (let j = 1; j < matriz[i].length; j++) {
                    if (matriz[i][j][1].includes("toDo")) {
                        borrable = false;
                    }
                }
                break;
            }
        }

        if (borrable) {
            let continuar = validarEntradaConfirmaciones("¿Confirmamos el borrado de la categoría? (s o n)");
            if (continuar == "s") {
                for (let i = 0; i < matriz.length; i++) {
                    if (matriz[i][0].toLowerCase() == categoria.toLowerCase()) {
                        matriz.splice(i, 1);
                    }
                }
            }
        } else {
            console.log("No se puede borrar porque hay tareas por hacer");
        }
    }
}

function addTarea(categoria) {
    let continuar;
    do {
        let tarea = validarEntradaString("Dame la tarea que quieras añadir");
        categoria.splice(categoria.length, 0, [tarea, "toDo"]);
        continuar = validarEntradaConfirmaciones("Quieres añadir más tareas? (s o n)");
    } while (continuar.toLowerCase() == "s");
}

function borrarTarea(categoria) {
    let hayElemento = false;
    let tarea;
    console.log(categoria)
    if (categoria.length == 1) {
        console.log("No hay tareas en tu listado")
    } else {
        do {
            let mensaje = 'Categorías \n';
            let numero = 0;
            let menu;
            for (let i = 1; i < categoria.length; i++) {
                mensaje += `    ${++numero}. ` + categoria[i][0] + "\n";
            }
            menu = validarMenu(mensaje, 1, categoria.length - 1);
            tarea = categoria[menu][0];

            for (let i = 1; i < categoria.length; i++) {
                if (categoria[i][0].toLowerCase() == tarea.toLowerCase()) {
                    hayElemento = true;
                    break;
                }
            }

            if (!hayElemento) {
                console.log("El valor dado no es una tarea añadida. Repítelo");
            }
        } while (!hayElemento);

        let continuar = validarEntradaConfirmaciones("¿Confirmamos el borrado de la tarea? (s o n)");
        if (continuar == "s") {
            for (let i = 1; i < categoria.length; i++) {
                if (categoria[i][0].toLowerCase() == tarea.toLowerCase()) {
                    categoria.splice(i, 1);
                }
            }
        }
    }
}

function pasarADone(categoria, numeros) {
    const arrayNumeros = numeros.split(",");
    for (let i = 0; i < arrayNumeros.length; i++) {
        const indiceStr = arrayNumeros[i];
        const indiceTarea = parseInt(indiceStr.trim());

        if (!isNan(indiceTarea) && indiceTarea > 0 && indiceTarea < categoria.length) {
            if (categoria[indiceTarea][1] !== "done") {
                categoria[indiceTarea][1] = "done";
                console.log(`Tarea ${indiceTarea} ("${categoria[indiceTarea][0]}") marcada como completada.`);
            } else {
                console.log(`La tarea ${indiceTarea} ya estaba completada.`);
            }
        } else {
            console.log(`El número de tarea '${indiceStr}' no es válido.`);
        }
    }
}

function validarMenu(mensaje, min, max) {
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

function validarEntradaConfirmaciones(mensaje) {
    let continuar = "s";
    let esValido = true;
    do {
        continuar = prompt(mensaje);
        if (
            continuar == null ||
            continuar == "" ||
            (continuar.toLowerCase() != "s" && continuar.toLowerCase() != "n")
        ) {
            console.log("Sólo puede valer s (sí) o n (no)");
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return continuar
}

function validarEntradaString(mensaje) {
    let esValido = true;
    let entrada;
    do {
        entrada = prompt(mensaje);
        if (entrada == null || entrada == "") {
            console.log("Tienes que añadir un valor");
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return entrada
}