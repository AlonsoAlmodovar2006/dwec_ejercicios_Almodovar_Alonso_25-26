let contador = 0;
function Alumno(nombre) {
    this.id = ++contador;
    this.nombre = nombre;
    // Ahora tienen una nota final por asignatura. Solo una nota, pero por asignatura.
    this._notas = new Map() /* asignatura: nota*/;
}

Object.defineProperty(Alumno.prototype, "nombre", {
    get: function () {
        return this._nombre;
    },
    set: function (value) {
        if (value.trim() !== "") {
            this._nombre = value.trim();
        } else {
            console.log("El nombre tiene que tener datos");
            this._nombre = "ERROR";
        }
    },
});

Alumno.prototype.mostrarInformacion = function () {
    let mensaje = `\n${this.id} - ${this.nombre} `;
    return mensaje;
};

Object.defineProperty(Alumno.prototype, "notas", {
    get: function () {
        return this._notas;
    },
});

Alumno.prototype.insertarAsignaturas = function (curso, asignaturas) {
    const nombresAsignaturas = [];
    for (const asignatura of asignaturas) {
        if (asignatura.curso == curso && asignatura.tipo == "Obligatoria") {
            nombresAsignaturas.push(asignatura.nombre);
        }
    }
    for (let i = 0; i < nombresAsignaturas.length; i++) {
        this.notas.set(nombresAsignaturas[i], undefined);
    }
};

Alumno.prototype.insertarAsignaturaOptativa = function (opcion, optativas) {
    if (this.notas.size < 4) {
        this.notas.set(optativas[opcion - 1].nombre, undefined);
    }
};

Alumno.prototype.insertarNota = function (asignatura, nota) {
    for (const [clave, valor] of this.notas) {
        if (clave == asignatura.nombre) {
            this.notas.set(asignatura.nombre, nota)
            break;
        }
    }
}