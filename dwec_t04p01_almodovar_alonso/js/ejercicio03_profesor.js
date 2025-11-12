// En uno de los métodos tengo que utilizar bind

const prof1 = {
    _nombre: "Alberto Montoro",
    _correo: "amg@uni.com",
    _asignaturas: [],
    mostrarProfesor: function () {
        return this.nombre + " - " + this.correo;
    },
};

const prof2 = {
    _nombre: "Paula Cruz",
    _correo: "pco@uni.com",
    _asignaturas: [],
};

const prof3 = {
    _nombre: "Diego Córdoba",
    _correo: "dca@uni.com",
    _asignaturas: [],
};

const prof4 = {
    _nombre: "Juanma Porrero",
    _correo: "jpa@uni.com",
    _asignaturas: [],
};

function addGetters(obj) {
    Object.defineProperty(obj, "nombre", {
        get: function () {
            return this._nombre;
        },
        enumerable: true,
        configurable: true,
    });

    Object.defineProperty(obj, "correo", {
        get: function () {
            return this._correo;
        },
        enumerable: true,
        configurable: true,
    });

    Object.defineProperty(obj, "asignaturas", {
        get: function () {
            return this._asignaturas;
        },
        enumerable: true,
        configurable: true,
    });
}

[prof1, prof2, prof3, prof4].forEach(addGetters);

function listarProfesores() {
    const profesores = [prof1, prof2, prof3, prof4];
    return profesores;
}

function crearBind() {
    const profesores = listarProfesores();
    const profesoresBind = [];
    for (let i = 1; i < profesores.length; i++) {
        const funcionBind = prof1.mostrarProfesor.bind(profesores[i])
        profesoresBind.push(funcionBind);
    }
    return profesoresBind;
}

function asignarAsignatura(opcion, asignaturas) {
    if (this.asignaturas.length < 2){
        this.asignaturas.push(asignaturas[opcion-1])
    } else {
        console.log("No se le añade porque ya tiene las 2 asignaturas correspondientes")
    }
    
}
