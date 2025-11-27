console.log("T04 - Ejercicio 01");
// Validaciones de los datos de Libros, Envíos y Pedidos
class Util {
    static validarEntero(valor) {
        if (valor === null || typeof valor === "boolean" || String(valor).trim() === "") {
            return false;
        }

        const numero = Number(valor);
        return Number.isInteger(numero);
    }

    static validarReal(valor) {
        if (valor === null || typeof valor === "boolean" || String(valor).trim() === "") {
            return false;
        }

        const numero = Number(valor);
        return !Number.isNaN(numero);
    }

    static validarCadenaFecha(valor) {
        const formato1 = /^\d{4}-\d{1,2}-\d{1,2}$/; // YYYY-M-D o YYYY-MM-DD
        const formato2 = /^\d{1,2}-\d{1,2}-\d{4}$/; // D-M-YYYY o DD-MM-YYYY
        return formato1.test(valor) || formato2.test(valor);
    }

    static validarFecha(valor) {
        if (this.validarCadenaFecha(valor)) {
            const fechaSinValidar = devolverDiaMesyAnio(valor); // Año, Mes y dia
            const fecha = new Date(fechaSinValidar[0], fechaSinValidar[1] - 1, fechaSinValidar[2]);
            if (fecha.getFullYear() !== fechaSinValidar[0] || fecha.getMonth() !== fechaSinValidar[1] - 1 || fecha.getDate() !== fechaSinValidar[2]) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    static validarEntrada(valor, longitud = 1) { // Anterior validarTitulo(valor)
        return (typeof valor === 'string' && valor.trim().length >= longitud);
    }

    static validarNombrePersona(nombre) {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,}( [A-Za-zÁÉÍÓÚáéíóúÑñ]{3,})*$/;
        return (typeof nombre === 'string' && regex.test(nombre.trim()));
    }

    static validarDireccion(direccion) {
        return (typeof direccion === 'string' && direccion.trim().length > 3);
    }

    static validarPrecio(precio) {
        return this.numRealPositivo(precio);
    }

    static validarTamanoArchivo(tamanoArchivo) {
        return this.numEnteroPositivo(tamanoArchivo);
    }

    static validarPeso(peso) {
        return this.numEnteroPositivo(peso);
    }

    static validarStock(stock) {
        return this.numEnteroPositivo(stock);
    }

    static validarDimensiones(dimensiones) {
        const regex = /^\d+x\d+x\d+$/; //Tres números enteros positivos separados por x
        return (typeof dimensiones === 'string' && regex.test(dimensiones.trim()));
    }

    static esMesPromocion(fecha, array_meses_promocion) {
        if (this.validarFecha(fecha)) {
            const partes = fecha.split("-");
            const mes = parseInt(partes[1]);
            return array_meses_promocion.includes(mes);
        } else {
            return false;
        }
    }

    static validarFormato(formatoLeido, setFormatosValidos) {
        return (typeof formatoLeido === 'string' && setFormatosValidos.includes(formatoLeido.trim()));
    }

    static validarGenero(generoLeido, setGenerosValidos) {
        return (typeof generoLeido === 'string' && setGenerosValidos.includes(generoLeido.trim()));
    }

    static validarPorcentaje(porcentaje) {
        return this.numRealPositivo(porcentaje) && porcentaje < 100;
    }

    static validarDiasEnvio(dias) {
        return this.numEnteroPositivo(dias);
    }

    // Aquellas otras validaciones que consideréis que son fundamentales

    // Cálculo del IVA
    // Cálculo con Fechas
}

function devolverDiaMesyAnio(valor) {
    const partes = valor.split("-");
    let anio, mes, dia;
    if (partes[0].length === 4) /* YYYY-MM-DD o YYYY-M-D */ {
        anio = parseInt(partes[0]);
        mes = parseInt(partes[1]);
        dia = parseInt(partes[2]);
    } else /* D-M-YYYY o DD-MM-YYYY */ {
        dia = parseInt(partes[0]);
        mes = parseInt(partes[1]);
        anio = parseInt(partes[2]);
    }
    const laFecha = [anio, mes, dia];
    return laFecha;
}

function numEnteroPositivo(numero) {
    return Util.validarEntero(numero) && numero > 0;
}

function numRealPositivo(numero) {
    return Util.validarReal(numero) && numero >= 0;
}
