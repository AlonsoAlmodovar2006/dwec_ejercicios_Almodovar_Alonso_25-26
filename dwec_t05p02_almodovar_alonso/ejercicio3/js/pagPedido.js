let htmlOriginal = "";
let libroEncontrado = null;
const compra = [null, null, []]; // TipoEnvio, Cliente, ListaLibros
const tienda = Tienda.getInstancia("Badulaque");

document.addEventListener('DOMContentLoaded', () => {
    htmlOriginal = document.querySelector("main").innerHTML;
    inicializarPagina();
});

function inicializarPagina() {
    pintarTiposEnvio(tienda.mostrarTiposEnvio());

    compra[0] = null;
    compra[1] = null;
    compra[2] = [];

    const formCliente = document.getElementById("formCliente");
    formCliente.addEventListener("submit", (e) => {
        e.preventDefault();
        buscarCliente(formCliente);
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
        buscarLibro();
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

    const btnPagar = document.getElementById("btnPagarPedido");
    btnPagar.addEventListener("click", () => {
        enviarPedido();
    });

    pintarResumen();
}

function buscarCliente(form) {
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

function buscarLibro() {
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
            inputCant.max = libro.stock;
        }
    } else {
        inputISBN.setCustomValidity("Ese ISBN no está registrado");
        document.getElementById("formOperacionLibro").classList.add("was-validated");
        divAnadirLibro.classList.add("d-none");
        libroEncontrado = null;
    }
}

function anadirLibroALaLista() {
    let soloEbooks = true;
    if (libroEncontrado != null) {
        const unidades = parseInt(document.getElementById("inputUnidades").value);
        if (libroEncontrado instanceof LibroPapel) {
            soloEbooks = false;
        }
        compra[2].push({
            libro: libroEncontrado,
            cantidad: unidades
        });
        if (!soloEbooks) {
            document.getElementById("btnAccordeonEnvio").disabled = false;
        }

        pintarResumen();
    }
}

function insertarTipoEnvio() {
    const selectTipoEnvio = document.getElementById("selectTipoEnvio");
    let envio = null;
    for (const option of selectTipoEnvio.options) {
        if (option.selected) {
            envio = tienda.buscarEnvio(option.value);
        }
    }
    compra[0] = envio;

    pintarResumen();
}

function pintarResumen() {
    const datosCliente = document.getElementById("datosCliente");
    const datosEnvio = document.getElementById("datosEnvio");
    const resumenVacio = document.getElementById("resumenVacio");
    const tbody = document.querySelector("table tbody");
    const tablaResumen = document.getElementById("tablaResumen");
    const btnPagar = document.getElementById("btnPagarPedido");
    let soloEbooks = true;
    if (compra[1] != null) {
        resumenVacio.classList.add("d-none");
        datosCliente.innerHTML = `${compra[1].nombre}`;
        btnPagar.disabled = false;
    }
    if (compra[2].length > 0) {
        tablaResumen.classList.remove("d-none");
        tbody.innerHTML = "";

        compra[2].forEach(item => {
            if (item.libro instanceof LibroPapel) {
                soloEbooks = false;
            }
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

    if (soloEbooks) {
        const envio = tienda.buscarEnvio("Sin Envío");
        compra[0] = envio;
    }
    if (compra[0] != null) {
        datosEnvio.innerHTML = `${compra[0].nombre}`;
    }
}

function enviarPedido() {
    let pagar = true;
    for (const item of compra) {
        if (item == null || item.length == 0) {
            pagar = false;
        }
    }

    if (pagar) {
        const pedido = tienda.hacerPedidoPorCliente(compra);
        console.log(pedido);
        resetear();
    }
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