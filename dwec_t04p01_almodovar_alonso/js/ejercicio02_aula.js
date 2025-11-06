function Aula(nMaxAlumnos, id, descripcion, curso) {
    this._alumnos = []; // Rellenar en el programa
    // this.nAlumnos;
    this.nMaxAlumnos = nMaxAlumnos;
    this.id = id;
    this.descripcion = descripcion;
    this.curso = curso;
}

Object.defineProperty(Aula.prototype, "alumnos", {
    get: function () {
        return this._alumnos;
    },
});

Object.defineProperty(Aula.prototype, "nAlumnos", {
    get: function () {
        return this.alumnos.length;
    },
});

Object.defineProperty(Aula.prototype, "nMaxAlumnos", {
    get: function () {
        return this._nMaxAlumnos;
    },
    set: function (value) {
        if (Number.isInteger(value)) {
            this._nMaxAlumnos = value;
        } else {
            console.log(
                "El número máximo de alumnos tiene que ser un número entero positivo"
            );
            this._nMaxAlumnos = "ERROR";
        }
    },
});

Object.defineProperty(Aula.prototype, "id", {
    get: function () {
        return this._id;
    },
    set: function (value) {
        if (Number.isInteger(value)) {
            this._id = value;
        } else {
            console.log("El id de la clase tiene que ser un número entero positivo");
            this._id = "ERROR";
        }
    },
});

Object.defineProperty(Aula.prototype, "descripcion", {
    get: function () {
        return this._descripcion;
    },
    set: function (value) {
        if (value.trim() !== "") {
            this._descripcion = value.trim();
        } else {
            console.log("La descripción debe tener contenido");
            this._descripcion = "ERROR";
        }
    },
});

Object.defineProperty(Aula.prototype, "curso", {
    get: function () {
        return this._curso;
    },
    set: function (value) {
        if (!isNaN(value) && value >= 1 && value <= 4) {
            this._curso = value;
        } else {
            console.log("El curso solo puede estar entre 1º y 4º");
            this._curso = "ERROR";
        }
    },
});

Aula.defineProperty(Aula, "nombreGrupos", {
    value: new Set(["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4", "Grupo 5", "Grupo 6", "Grupo 7", "Grupo 8", "Grupo 9", "Grupo 10"]),
})

Aula.prototype.insertarGrupos = function () {
    const nombresGrupos = []
    for (const nombre of this.nombreGrupos){
        nombresGrupos.push(nombre)
    }
    const grupos = new Map();
    for (let i = 0; i < nombresGrupos.length; i++){
        grupos.set(nombresGrupos[i], [])
    }
    return grupos;
}

Aula.prototype.haySitioAlumnos = function () {
    return this.nAlumnos < this.nMaxAlumnos;
};

Aula.prototype.hayAlumnos = function () {
    return this.nAlumnos > 0;
};

Aula.prototype.obtenerSitiosAlumnos = function () {
    return this.nMaxAlumnos - this.nAlumnos;
};

Aula.prototype.pedirDatosUnAlumno = function () {
    let nombre = validarEntradaString(
        "Dame el nombre y los apellidos del alumno"
    );
    let dni = validarDni(
        "Dame el DNI de " + nombre + " siguiendo este formato: (12345678V)"
    );
    let fecha = validarFecha(
        "Dame la fecha de nacimiento de " +
        nombre +
        " en este formato: (DD-MM-AAAA)"
    );
    let notasTrimestres = [];
    for (let i = 0; i < 3; i++) {
        let notaTrim = validarNumeroConLimites(
            `Dame la nota del Trimestre ${i + 1} de ${nombre}`,
            0,
            10.01
        );
        notasTrimestres.push(notaTrim);
    }
    let sexo = validarSexo("Dame el sexo de " + nombre);
    const nuevoAlumno = new Alumno(
        dni,
        nombre,
        fecha,
        notasTrimestres[0],
        notasTrimestres[1],
        notasTrimestres[2],
        sexo
    );
    return nuevoAlumno;
};

Aula.prototype.pedirDatos = function () {
    let nAlumnosAdd = validarNumeroConLimites("Dime el número de alumnos que quieres matricular en el aula", 1, this.nMaxAlumnos);
    const arrayAlumnos = [];
    if (nAlumnosAdd + this.nAlumnos <= this.nMaxAlumnos) {
        for (let i = 0; i < nAlumnosAdd; i++) {
            const alumno = this.pedirDatosUnAlumno();
            arrayAlumnos.push(alumno);
        }
    } else {
        console.log("No hay suficiente espacio en el aula para añadir tantos alumnos")
    }
    return arrayAlumnos;
};

Aula.prototype.insertarAlumnos = function (array) {
    if (array.length <= this.obtenerSitiosAlumnos()) {
        array.forEach((alumno) => {
            this.alumnos.push(alumno);
        });
    }
};

Aula.prototype.mostrarDatos = function () {
    let mensaje =
        "Estos son los alumnos que pertenecen al aula " + this.id + "\n=====";
    this.alumnos.forEach((alumno) => {
        mensaje += alumno.mostrarInformacion() + `\n`;
    });
    console.log(mensaje);
};

Aula.prototype.mediasNota = function () {
    let mediaAlumnos = 0;
    this.alumnos.forEach((alumno) => {
        mediaAlumnos += alumno.notaFinal;
    });
    let mediaClase = mediaAlumnos / this.nAlumnos;
    return mediaClase.toFixed(2);
};

Aula.prototype.mejorNota = function () {
    let mejorNota = 0;
    const matriculasHonor = [];
    if (this.alumnos.length > 0) {
        this.alumnos.forEach(alumno => {
            if (alumno.notaFinal > mejorNota) {
                mejorNota = alumno.notaFinal;
            }
        });
        for (let i = 0; i < this.nAlumnos; i++) {
            if (mejorNota === this.alumnos[i].notaFinal) {
                matriculasHonor.push(this.alumnos[i])
            }
        }
    }
    return matriculasHonor;
};

Aula.prototype.porcentajeSuspensos = function () {
    let suspensos = 0;
    this.alumnos.forEach((alumno) => {
        if (alumno.notaFinal < 5) {
            suspensos++;
        }
    });
    let porcentajeSuspensos = (suspensos / this.nAlumnos) * 100;
    return porcentajeSuspensos;
};

Aula.prototype.mostrarSuspensosAprobados = function () {
    let porcentajeSuspensos = this.porcentajeSuspensos();
    let porcentajeAprobados = 100 - porcentajeSuspensos;
    let mensaje =
        "Porcentaje de Aprobados y Suspensos: \n Aprobados --> " +
        porcentajeAprobados.toFixed(2) +
        "%\n Suspensos --> " +
        porcentajeSuspensos.toFixed(2) +
        "%\n";
    return mensaje;
};

// ¿Quitar de aquí?

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
    return entrada;
}

function validarSexo(mensaje) {
    let continuar = "h";
    let esValido = true;
    do {
        continuar = prompt(mensaje);
        if (
            continuar == null ||
            continuar == "" ||
            (continuar.toLowerCase() != "h" && continuar.toLowerCase() != "m")
        ) {
            console.log("Sólo puede valer h (hombre) o m (mujer)");
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return continuar;
}

function validarNumeroConLimites(mensaje, min, max) {
    let esValido = true;
    let numero;
    do {
        numero = parseFloat(prompt(mensaje));
        if (isNaN(numero) || numero < min || numero > max) {
            console.log(
                `El número tiene que ser positivo en el intervalo del ${min} al ${max}`
            );
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return numero;
}

function validarNumero(mensaje) {
    let esValido = true;
    let numero;
    do {
        numero = parseInt(prompt(mensaje));
        if (!Number.isInteger(numero) || numero < 0) {
            console.log(`El número tiene que ser entero positivo`);
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return numero;
}

function validarDni(mensaje) {
    let esValido = true;
    let dni;
    const regex = /^[0-9]{8}[A-Z]$/;
    do {
        dni = prompt(mensaje);
        if (!regex.test(dni)) {
            console.log(`El dni tiene que contener 8 dígitos y una letra al final`);
            esValido = false;
        } else {
            esValido = true;
        }
    } while (!esValido);
    return dni;
}

function validarFecha(mensaje) {
    let esValido = true;
    let dateObj;
    let fecha;
    do {
        fecha = prompt(mensaje);
        arrayFecha = fecha.split("");

        if (
            arrayFecha[2] != "-" ||
            arrayFecha[5] != "-" ||
            arrayFecha.length != 10
        ) {
            console.log(
                "No has puesto la fecha en este formato: DD-MM-YYYY. Vuelve a hacerlo "
            );
            continue;
        }
        const fechas = fecha.split("-").map(Number);
        dateObj = new Date(fechas[2], fechas[1] - 1, fechas[0]);
        if (
            dateObj.getFullYear() === fechas[2] &&
            dateObj.getMonth() === fechas[1] - 1 &&
            dateObj.getDate() === fechas[0]
        ) {
            esValido = true;
        } else {
            esValido = false;
            console.log("La fecha no existe. Inténtalo de nuevo.");
        }
    } while (!esValido);
    return fecha;
}
