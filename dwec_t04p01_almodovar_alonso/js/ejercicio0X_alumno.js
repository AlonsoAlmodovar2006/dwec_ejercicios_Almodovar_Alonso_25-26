function Alumno(dni, nombre, fechaNacimiento, notaTrim1, notaTrim2, notaTrim3, sexo) {
    this.dni = dni;
    this.nombre = nombre;
    this.fechaNacimiento = fechaNacimiento;
    this.notaTrim1 = notaTrim1;
    this.notaTrim2 = notaTrim2;
    this.notaTrim3 = notaTrim3;
    this.sexo = sexo;

    this.calcularEdad = function () {
        const arrayFecha = this.fechaNacimiento.split("-");
        let miFecha = new Date();

        let dia = miFecha.getDate() - arrayFecha[0];
        let mes = miFecha.getMonth() + 1 - arrayFecha[1];
        let year = miFecha.getFullYear() - arrayFecha[2];

        if (mes < 0 || dia < 0) {
            year--;
        }

        if (isNaN(year)) {
            year = "ERROR";
        }

        return year;
    };

    this.calcularNota = function () {
        let media = (this.notaTrim1 + this.notaTrim2 + this.notaTrim3) / 3;
        if (isNaN(media)) {
            media = "ERROR";
        }
        return parseFloat(media.toFixed(2))
    };

    this.edad;
    this.notaFinal;

    this.cambiarNota = function (nota1, nota2, nota3) {
        this.notaTrim1 = nota1;
        this.notaTrim2 = nota2;
        this.notaTrim3 = nota3;
        this.notaFinal = this.calcularNota()
    }

    this.estaAprobado = function () {
        if (this.notaFinal > 5) {
            return true;
        } else {
            return false
        }
    }

    this.comparar = function (objeto) {
        if (this.notaFinal > objeto.notaFinal) {
            return 1;
        } else if (this.notaFinal < objeto.notaFinal) {
            return -1;
        } else {
            return 0;
        }
    }

    this.mostrarInformacion = function () {
        console.log(`\n${this.nombre} ('${this.sexo}'), con DNI ${this.dni}, nacido el ${this.fechaNacimiento}, que tiene ${this.edad} años, ha sacado un ${this.notaFinal} de media. 
La nota de sus trimestres, ordenados, respectivamente, ha sido de: (${this.notaTrim1}, ${this.notaTrim2}, ${this.notaTrim3})`);
    };
}

Object.defineProperty(Alumno.prototype, "dni", {
    get: function () {
        return this._dni;
    },
    set: function (value) {
        const regex = /^[0-9]{8}[A-Z]$/;
        if (regex.test(value)) {
            this._dni = value;
        } else {
            console.log("El dni tiene que contener 8 dígitos y una letra al final");
            this._dni = "ERROR";
        }
    }
});

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
    }
});

Object.defineProperty(Alumno.prototype, "fechaNacimiento", {
    get: function () {
        return this._fechaNacimiento;
    },
    set: function (value) {
        let esValido = true;
        const arrayFecha = value.split("-");
        if (arrayFecha.length !== 3) {
            esValido = false;
        }
        const dia = parseInt(arrayFecha[0]);
        const mes = parseInt(arrayFecha[1]) - 1;
        const year = parseInt(arrayFecha[2]);
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            esValido = false;
        }
        if (isNaN(mes) || mes < 0 || mes > 11) {
            esValido = false;
        }
        if (isNaN(dia) || dia < 1 || dia > 31) {
            esValido = false;
        }
        if (!esValido) {
            console.log("La fecha está mal formada");
            this._fechaNacimiento = "ERROR";
        } else {
            this._fechaNacimiento = dia + "-" + (mes + 1) + "-" + year;
        }
    }
});

Object.defineProperty(Alumno.prototype, "notaTrim1", {
    get: function () {
        return this._notaTrim1;
    },
    set: function (value) {
        if (!isNaN(value) && value < 10 && value > 0) {
            this._notaTrim1 = value
        } else {
            console.log("La nota del Trimestre 1 está mal formada. Tiene que ser un número menor de 10 y con decimales");
            this._notaTrim1 = "ERROR";
        }
    }
});

Object.defineProperty(Alumno.prototype, "notaTrim2", {
    get: function () {
        return this._notaTrim2;
    },
    set: function (value) {
        if (!isNaN(value) && value < 10 && value > 0) {
            this._notaTrim2 = value
        } else {
            console.log("La nota del Trimestre 2 está mal formada. Tiene que ser un número menor de 10 y con decimales");
            this._notaTrim2 = "ERROR";
        }
    }
});

Object.defineProperty(Alumno.prototype, "notaTrim3", {
    get: function () {
        return this._notaTrim3;
    },
    set: function (value) {
        if (!isNaN(value) && value < 10 && value > 0) {
            this._notaTrim3 = value
        } else {
            console.log("La nota del Trimestre 3 está mal formada. Tiene que ser un número menor de 10 y con decimales");
            this._notaTrim3 = "ERROR";
        }
    }
});

Object.defineProperty(Alumno.prototype, "notaFinal", {
    get: function () {
        return this._notaFinal = this.calcularNota();
    },
});

Object.defineProperty(Alumno.prototype, "edad", {
    get: function () {
        return this._edad = this.calcularEdad();
    },
});

Object.defineProperty(Alumno.prototype, "sexo", {
    get: function () {
        return this._sexo;
    },
    /* set: function (value) {
        const valor = value.toLowerCase();
        if (valor === "h" || valor === "m" || valor === "o") {
            this._sexo = valor;
        } else {
            console.log("El sexo sólo puede ser 'h', 'm' u 'o'");
            this._sexo = "ERROR";
        }
    }*/
});

/* const yo = new Alumno(
    "71371622V",
    "Alonso Almodóvar Delgado",
    "09-10-2006",
    9.01,
    7.66,
    8.75,
    "h"
);
yo.mostrarInformacion(); */