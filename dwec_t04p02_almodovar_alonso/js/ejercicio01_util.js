console.log("T04 - Ejercicio 01 - Util");
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

    static validarCadenaNoVacia(cadena) {
        if (typeof cadena !== "string") return false;
        return cadena.trim().length >= 1;
    }

    static validarCadenaFecha(cadenaFecha) {
        if (typeof cadenaFecha !== "string") return false;
        cadenaFecha = cadenaFecha.trim();
        // D-M-YYYY, DD-MM-YYYY, YYYY-M-D, YYYY-MM-DD
        const formatoDMY = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
        const formatoYMD = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        return formatoDMY.test(cadenaFecha) || formatoYMD.test(cadenaFecha);
    }

    static validarConvertirFecha(cadenaFecha) {
        if (!Util.validarCadenaFecha(cadenaFecha)) return null;
        let dia, mes, anio;
        const partes = cadenaFecha.trim().split("-");
        // D-M-YYYY o DD-MM-YYYY
        if (partes[0].length <= 2) {
            dia = Number(partes[0]);
            mes = Number(partes[1]) - 1;
            anio = Number(partes[2]);
        }
        // YYYY-M-D o YYYY-MM-DD
        else {
            anio = Number(partes[0]);
            mes = Number(partes[1]) - 1;
            dia = Number(partes[2]);
        }
        const fecha = new Date(anio, mes, dia);
        // Validar coincidencia real
        if (
            fecha.getFullYear() !== anio ||
            fecha.getMonth() !== mes ||
            fecha.getDate() !== dia
        ) {
            return null;
        }
        return fecha;
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
        return numRealPositivo(precio);
    }

    static validarTamanoArchivo(tamanoArchivo) {
        return numRealPositivo(tamanoArchivo);
    }

    static validarPeso(peso) {
        return numEnteroPositivo(peso);
    }

    static validarStock(stock) {
        return numEnteroPositivo(stock);
    }

    static validarDimensiones(dimensiones) {
        const regex = /^\d+x\d+x\d+$/; //Tres números enteros positivos separados por x
        return (typeof dimensiones === 'string' && regex.test(dimensiones.trim()));
    }

    static esMesPromocion(fecha, array_meses_promocion) {
        if (this.validarConvertirFecha(fecha)) {
            const partes = fecha.split("-");
            const mes = parseInt(partes[1]);
            return array_meses_promocion.includes(mes);
        } else {
            return false;
        }
    }

    static validarFormato(formatoLeido, setFormatosValidos) {
        return (typeof formatoLeido === 'string' && setFormatosValidos.has(formatoLeido.trim()));
    }

    static validarGenero(generoLeido, setGenerosValidos) {
        return (typeof generoLeido === 'string' && setGenerosValidos.has(generoLeido.trim()));
    }

    static validarPorcentaje(porcentaje) {
        return numRealPositivo(porcentaje) && porcentaje < 100;
    }

    static validarDiasEnvio(dias) {
        return numEnteroPositivo(dias);
    }

    // Aquellas otras validaciones que consideréis que son fundamentales

    static validarConvertirEntero(valor) {
        if (!Util.validarEntero(valor)) {
            return null;
        }
        return Number(valor);
    }

    static validarConvertirReal(valor) {
        if (!Util.validarReal(valor)) {
            return null;
        }
        return Number(valor);
    }

    static validarConvertirEnteroGenerica(valor, fnValidacionEnt) {
        const convertido = Util.validarConvertirEntero(valor);
        if (convertido === null) {
            return null;
        }
        return fnValidacionEnt(convertido) ? convertido : null;
    }

    static validarConvertirRealGenerica(valor, fnValidacionReal) {
        const convertido = Util.validarConvertirReal(valor);
        if (convertido === null) {
            return null;
        }
        return fnValidacionReal(convertido) ? convertido : null;
    }

    static validarCadenaNoVaciaGenerica(cad, fnValidacionCad) {
        if (!Util.validarCadenaNoVacia(cad)) {
            return null;
        }
        return fnValidacionCad(cad) ? cad : null;
    }
    // Cálculo del IVA
    // Cálculo con Fechas
}

function numEnteroPositivo(numero) {
    return Util.validarEntero(numero) && numero > 0;
}

function numRealPositivo(numero) {
    return Util.validarReal(numero) && numero >= 0;
}
