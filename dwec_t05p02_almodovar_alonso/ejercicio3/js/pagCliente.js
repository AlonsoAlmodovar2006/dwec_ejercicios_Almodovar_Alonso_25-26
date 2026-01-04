document.addEventListener('DOMContentLoaded', () => {
    const tienda = Tienda.getInstancia("Badulaque");
    pintarTabla(tienda);

    const form = document.querySelector("form");
    const inputDNI = document.getElementById("dni");
    const inputNombre = document.getElementById("nombre");
    const inputDireccion = document.getElementById("direccion");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        insertarCliente(tienda, inputDNI.value.trim(), inputNombre.value.trim(), inputDireccion.value.trim());
    });
});

function pintarTabla(tienda) {
    pintarTablaDesdeArray(tienda.mostrarClientes());
}

function pintarTablaDesdeArray(clientes) {
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

    const pedidos = cliente.listaPedidos;
    pedidos.forEach(pedido => {
        const div = document.createElement("div");
        let tipoEnvio = "";
        if (pedido.tipoEnvioPedido == null) {
            tipoEnvio = "Sin envío";
        } else {
            tipoEnvio = pedido.tipoEnvioPedido.nombre;
        }
        div.innerHTML =
            `<h4> Pedidos de ${pedido.cliente.nombre}</h4>
            <div class="card shadow-sm">
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