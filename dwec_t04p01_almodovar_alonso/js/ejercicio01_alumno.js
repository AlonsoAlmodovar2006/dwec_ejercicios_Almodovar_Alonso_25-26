console.log("T04 - Ejercicio 01");
function Alumno(dni,nombre,fechaNacimiento,notaTrim1,notaTrim2,notaTrim3,sexo) {
    this.dni = dni;
    this._nombre = nombre;
    this.edad = function () {
        const arrayFecha = this._fechaNacimiento.split("-");
        let miFecha = new Date();

        let dia = miFecha.getDate() - arrayFecha[0];
        let mes = miFecha.getMonth() + 1 - arrayFecha[1];
        let year = miFecha.getFullYear() - arrayFecha[2];

        if (mes < 0 || dia < 0) {
            year--;
        }

        return year;
    };
    this._fechaNacimiento = fechaNacimiento;
    this.notaFinal = function () {
        let nota = (this._notaTrim1 + this._notaTrim2 + this._notaTrim3) / 3;
        return nota.toFixed(2);
    };
    this._notaTrim1 = notaTrim1;
    this._notaTrim2 = notaTrim2;
    this._notaTrim3 = notaTrim3;
    this._sexo = sexo;

    this.mostrarInformacion = function () {
        console.log(`${this._nombre} ('${this._sexo}'), con DNI ${this.dni}, nacido el ${this._fechaNacimiento}, que tiene ${this.edad()} años, ha sacado un ${this.notaFinal()} de media. 
La nota de sus trimestres, ordenados, respectivamente, ha sido de: (${this._notaTrim1}, ${this._notaTrim2}, ${this._notaTrim3})`);
    };
}

Object.defineProperty(Alumno.prototype, "dni", {
    get: function() {
        return this._dni;
    }, 
    set: function (value) {
        const regex = /^[0-9]{8}[A-Z]$/;
        if (regex.test(value)){
            this._dni = value;
        } else {
            console.log("El dni tiene que contener 8 dígitos y una letra al final")
        }
    }
});

const yo = new Alumno(
    "7137162",
    "Alonso Almodóvar Delgado",
    "09-10-2006",
    9.76,
    7.66,
    8.75,
    "h"
);
yo.mostrarInformacion();
