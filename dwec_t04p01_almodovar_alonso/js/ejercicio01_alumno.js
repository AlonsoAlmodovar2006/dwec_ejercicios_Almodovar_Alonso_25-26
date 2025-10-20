console.log("T04 - Ejercicio 01");
function alumno (dni, nombre, fechaNacimiento, notaTrim1, notaTrim2, notaTrim3, sexo){
    this.dni = dni;
    this.nombre = nombre;
    this.edad = function(){
        return this.fechaNacimiento;
    }
    this.fechaNacimiento = fechaNacimiento;
    this.notaFinal = function(){
        return (this.notaTrim1 + this.notaTrim2 + this.notaTrim3) /3;
    }
    this.notaTrim1 = notaTrim1;
    this.notaTrim2 = notaTrim2;
    this.notaTrim3 = notaTrim3;
    this.sexo = sexo;
}
