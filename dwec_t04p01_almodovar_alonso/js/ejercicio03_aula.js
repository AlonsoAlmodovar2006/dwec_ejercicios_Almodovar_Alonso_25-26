function Aula(id, descripcion, nMaxAlumnos, curso) {
    this._alumnos = [];
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
        this._id = value;
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
    const nuevoAlumno = new Alumno(
        nombre,
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
        mensaje += alumno.mostrarInformacion();
    });
    console.log(mensaje);
    return mensaje;
};

Aula.prototype.mediasNota = function () {
    // Función incorrecta con las nuevas funciones
    let mediaAlumnos = 0;
    this.alumnos.forEach((alumno) => {
        mediaAlumnos += alumno.notaFinal;
    });
    let mediaClase = mediaAlumnos / this.nAlumnos;
    return mediaClase.toFixed(2);
};

Aula.prototype.mejorNota = function () {
    // Función incorrecta con las nuevas funciones
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
    // Función incorrecta con las nuevas funciones
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