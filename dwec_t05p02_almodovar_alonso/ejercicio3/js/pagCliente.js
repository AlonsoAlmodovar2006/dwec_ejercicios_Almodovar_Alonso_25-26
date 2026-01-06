document.addEventListener('DOMContentLoaded', () => {
    const tienda = Tienda.getInstancia("Badulaque");
    pintarTabla(tienda.mostrarClientes());

    const form = document.querySelector("form");
    const inputDNI = document.getElementById("dni");
    const inputNombre = document.getElementById("nombre");
    const inputDireccion = document.getElementById("direccion");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const cliente = tienda.pedirYCrearCliente(inputDNI.value.trim(), inputNombre.value.trim(), inputDireccion.value.trim());

        if (cliente === null) {
            inputDNI.setCustomValidity("El DNI ya está registrado");
            form.classList.add("was-validated");
            return;
        }

        inputDNI.setCustomValidity("");
        pintarTabla(tienda.mostrarClientes());

        form.reset();
        form.classList.remove("was-validated");
    });
});

function pintarTabla(clientes) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    clientes.forEach(cliente => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${cliente.dni}</td>
            <td class="fw-semibold">${cliente.nombre}</td>
            <td>${cliente.direccion}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-eye-fill"></i>
                </button>
            </td>
        `;

        fila.querySelector("button").addEventListener("click", () => mostrarCards(cliente));

        tbody.appendChild(fila);
    });
}

function mostrarCards(cliente) {
    const divCards = document.getElementById("cards");
    divCards.innerHTML = `<h4> Pedidos de ${cliente.nombre}</h4>`;
    const pedidos = cliente.listaPedidos;
    console.log(pedidos);
    if (pedidos.length === 0) {
        const h6 = document.createElement("h6");
        h6.innerHTML = `No hay Pedidos todavía`;
        divCards.appendChild(h6);
    }
    pedidos.forEach(pedido => {
        const div = document.createElement("div");
        let tipoEnvio = "";
        if (pedido.tipoEnvioPedido == null) {
            tipoEnvio = "Sin envío";
        } else {
            tipoEnvio = pedido.tipoEnvioPedido.nombre;
        }
        div.innerHTML =
            `<div class="card shadow-sm">
                <div class="card-body">
                    <h6 class="card-title">Pedido ${pedido.id} - ${pedido.fecha.toLocaleDateString("es-ES")}</h6>
                        <p class="card-text text-muted">
                            Tipo Envío --> ${tipoEnvio}
                        </p>
                        <p class="card-text text-muted">
                            Precio --> ${pedido.precioTotalConEnvioConIVA.toFixed(2)} €
                        </p>
                </div>
            </div>`
        divCards.appendChild(div);
    })
}