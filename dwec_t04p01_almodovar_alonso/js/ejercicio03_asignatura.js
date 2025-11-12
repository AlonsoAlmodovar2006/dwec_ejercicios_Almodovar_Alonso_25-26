const asignaturaCall = {
    mostrarAsignatura: function () {
        return this.nombre + " " + this.curso + " " + this.tipo;
    }
}

const asig1 = {
    _curso: 2,
    _nombre: "Ética I",
    _tipo: "Obligatoria",
}

const asig2 = {
    _curso: 2,
    _nombre: "Filosofía de la Naturaleza",
    _tipo: "Obligatoria"
}

const asig3 = {
    _curso: 1,
    _nombre: "Estética",
    _tipo: "Obligatoria"
}

const asig4 = {
    _curso: 1,
    _nombre: "Psicología básica",
    _tipo: "Obligatoria"
}

const asig5 = {
    _curso: 2,
    _nombre: "Filosofía de la Religión",
    _tipo: "Optativa"
}

const asig6 = {
    _curso: 2,
    _nombre: "Bioética",
    _tipo: "Optativa"
}

const asig7 = {
    _curso: 2,
    _nombre: "Lógica I",
    _tipo: "Optativa"
}

const asig8 = {
    _curso: 2,
    _nombre: "Historia de la Filosofía Medieval",
    _tipo: "Optativa"
}

function addGetters(obj) {
    Object.defineProperty(obj, "nombre", {
        get: function () {
            return this._nombre;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(obj, "curso", {
        get: function () {
            return this._curso;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(obj, "tipo", {
        get: function () {
            return this._tipo;
        },
        enumerable: true,
        configurable: true
    });
}

function listarAsignaturas() {
    const asignaturas = [asig1, asig2, asig3, asig4, asig5, asig6, asig7, asig8]
    return asignaturas
}

function call() {
    const asignaturas = listarAsignaturas();
    for (let i = 1; i < asignaturaCall.length; i++) {
        asignaturaCall.mostrarAsignatura.call(asignaturas[i])
        console.log(asignaturas[i])
    }
}

const asignaturas = listarAsignaturas();
asignaturas.forEach(addGetters);