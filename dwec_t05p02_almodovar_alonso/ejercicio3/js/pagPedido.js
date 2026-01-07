let htmlOriginal = "";
let libroEncontrado = null;
const compra = [null, null, []]; // TipoEnvio, Cliente, ListaLibros
document.addEventListener('DOMContentLoaded', () => {
    htmlOriginal = document.querySelector("main").innerHTML;
    inicializarPagina();
});

function inicializarPagina() {
    const tienda = Tienda.getInstancia("Badulaque");

    pintarTiposEnvio(tienda.mostrarTiposEnvio());

    compra[0] = null;
    compra[1] = null;
    compra[2] = [];

    const formCliente = document.getElementById("formCliente");
    formCliente.addEventListener("submit", (e) => {
        e.preventDefault();
        buscarCliente(formCliente, tienda);
        formCliente.reset();
        formCliente.classList.remove("was-validated");
    });

    const btnDeseleccionar = document.getElementById("btnDeseleccionarCliente");
    btnDeseleccionar.addEventListener("click", () => {
        resetear();
    });

    const btnCancelarPedido = document.getElementById("btnCancelarPedido");
    btnCancelarPedido.addEventListener("click", () => {
        resetear();
    });

    const btnBuscarLibro = document.getElementById("btnBuscarLibro");
    btnBuscarLibro.addEventListener("click", () => {
        buscarLibro(tienda);
    });

    const formOperacionLibro = document.getElementById("formOperacionLibro");
    formOperacionLibro.addEventListener("submit", (e) => {
        e.preventDefault();
        anadirLibroALaLista();
        formOperacionLibro.reset();
        formOperacionLibro.classList.remove("was-validated");
        document.getElementById("anadirLibro").classList.add("d-none");
        libroEncontrado = null;
    });

    const formEnvio = document.getElementById("formEnvio");
    formEnvio.addEventListener("submit", (e) => {
        e.preventDefault();
        insertarTipoEnvio();
        formEnvio.reset();
        formEnvio.classList.remove("was-validated");
    });

    pintarResumen();
}

function buscarCliente(form, tienda) {
    const inputDNI = document.getElementById("dni");
    const divInfoCliente = document.getElementById("infoClienteSeleccionado");
    const btnBuscarCliente = document.getElementById("btnBuscarCliente");
    const cliente = tienda.buscarCliente(inputDNI.value.trim());
    if (cliente != null) {
        divInfoCliente.classList.remove("d-none");
        document.getElementById("nombreClienteSeleccionado").innerHTML = cliente.nombre;
        btnBuscarCliente.disabled = true;
        compra[1] = cliente;
        document.getElementById("btnAccordeonLibro").disabled = false;
    } else {
        inputDNI.setCustomValidity("El DNI no está registrado");
        form.classList.add("was-validated");
        return;
    }
    pintarResumen();
}

function buscarLibro(tienda) {
    const inputISBN = document.getElementById("isbn");
    const divAnadirLibro = document.getElementById("anadirLibro");
    const libro = tienda.buscarLibro(inputISBN.value.trim());

    if (libro != null) {
        libroEncontrado = libro;
        inputISBN.setCustomValidity("");
        divAnadirLibro.classList.remove("d-none");
        document.getElementById("tituloLibroSeleccionado").innerHTML = libro.titulo;

        const inputCant = document.getElementById("inputUnidades");
        if (libro instanceof Ebook) {
            inputCant.max = 1;
            document.getElementById("tituloLibroSeleccionado").innerHTML += " (Ebook)";
        } else {
            inputCant.max = 9999999;
        }
        document.getElementById("btnAccordeonEnvio").disabled = false;
    } else {
        inputISBN.setCustomValidity("Ese ISBN no está registrado");
        document.getElementById("formOperacionLibro").classList.add("was-validated");
        divAnadirLibro.classList.add("d-none");
        libroEncontrado = null;
    }
}

function anadirLibroALaLista() {
    if (libroEncontrado != null) {
        const unidades = parseInt(document.getElementById("inputUnidades").value);

        compra[2].push({
            libro: libroEncontrado,
            cantidad: unidades
        });

        console.log("Cesta de la compra:", compra);
        document.getElementById("btnAccordeonEnvio").disabled = false;

        pintarResumen();
    }
}

function insertarTipoEnvio() {
    let soloEbooks = true;

    if (!soloEbooks) {
        
    }
}

function pintarResumen() {
    const datosCliente = document.getElementById("datosCliente");
    const resumenVacio = document.getElementById("resumenVacio");
    const tbody = document.querySelector("table tbody");
    const tablaResumen = document.getElementById("tablaResumen")
    if (compra[1] != null) {
        resumenVacio.classList.add("d-none");
        datosCliente.innerHTML = `${compra[1].nombre}`
    }
    if (compra[2].length > 0) {
        tablaResumen.classList.remove("d-none");
        tbody.innerHTML = "";

        compra[2].forEach(item => {
            const fila = document.createElement("tr");

            const totalLinea = (item.libro.precio * item.cantidad).toFixed(2);
            fila.innerHTML = `
            <td class="fw-semibold">${item.libro.titulo}</td>
            <td>${item.cantidad}</td>
            <td>${totalLinea} €</td>
        `;

            tbody.appendChild(fila);
        });
    };
}

function pintarTiposEnvio(tiposEnvios) {
    const selectTipoEnvio = document.getElementById("selectTipoEnvio");
    selectTipoEnvio.innerHTML = `<option value="" selected disabled>Seleccione tipo de envío...</option>`
    tiposEnvios.forEach(tipoEnvio => {
        const opcion = document.createElement("option");
        opcion.innerHTML += `${tipoEnvio}`;
        selectTipoEnvio.appendChild(opcion);
    })
}

function resetear() {
    document.querySelector("main").innerHTML = htmlOriginal;
    inicializarPagina();
}