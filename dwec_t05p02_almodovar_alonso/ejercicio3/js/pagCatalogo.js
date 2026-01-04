console.log("T05 - Ejercicio 03 - Catálogo");

document.addEventListener('DOMContentLoaded', () => {
    const tienda = Tienda.getInstancia("Badulaque");
    pintarTabla(tienda);

    const form = document.querySelector("form");
    const inputBuscar = document.getElementById("buscar");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        filtrarLibros(tienda, inputBuscar.value.trim().toLowerCase());
    });
});

function pintarTabla(tienda) {
    pintarTablaDesdeArray(tienda.mostrarCatalogoLibrosDisponibles());
}

function filtrarLibros(tienda, textoInput) {
    const libros = tienda.mostrarCatalogoLibrosDisponibles();
    const input = document.getElementById("buscar");

    const resultado = libros.filter(libro => {
        const titulo = libro.titulo.toLowerCase();
        const genero = libro.generoLiterario.toLowerCase();
        const autores = libro.autor.map(a => a.nombre.toLowerCase()).join(" ");

        return titulo.includes(textoInput) || genero.includes(textoInput) || autores.includes(textoInput);
    });

    if (resultado.length === 0) {
        input.setCustomValidity("No hay coincidencias");
        pintarTablaDesdeArray([]);
    } else {
        input.setCustomValidity("");
        pintarTablaDesdeArray(resultado);
    }
    input.form.classList.add("was-validated");
}

function pintarTablaDesdeArray(libros) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    libros.forEach(libro => {
        let tipo = libro instanceof Ebook ? "Ebook" : "Papel";
        let stock = libro.stock;
        if (stock == undefined) {
            stock = `<i class="bi bi-infinity"></i>`
        }
        let autores = libro.autor.map(a => a.nombre).join(", ");

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${libro.isbn}</td>
            <td class="fw-semibold">${libro.titulo}</td>
            <td>${autores}</td>
            <td><span class="badge bg-secondary">${libro.generoLiterario}</span></td>
            <td>${libro.precio} €</td>
            <td>${tipo}</td>
            <td>
                <span class="badge ${libro.stock !== undefined && libro.stock < 10 ? 'bg-danger' : 'bg-success'}">
                    ${stock}
                </span>
            </td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-eye-fill"></i>
                </button>
            </td>
        `;

        fila.querySelector("button").addEventListener("click", () => abrirModal(libro));

        tbody.appendChild(fila);
    });
}

function abrirModal(libro, autores) {
    if (libro instanceof Ebook) {
        document.getElementById("modalCuerpo").innerHTML = `
        <p><strong>ISBN:</strong> ${libro.isbn}</p>
        <p><strong>Autor/es:</strong> ${autores}</p>
        <p><strong>Género:</strong> ${libro.generoLiterario}</p>
        <p><strong>Precio:</strong> ${libro.precio} €</p>
        <p><strong>Tipo:</strong> ${"Ebook"}</p>
        <p><strong>Tamaño:</strong> ${libro.tamanoArchivo} MiB</p>
        <p><strong>Formato:</strong> .${libro.formato}</p>
    `;
    }
    if (libro instanceof LibroPapel) {
        document.getElementById("modalCuerpo").innerHTML = `
        <p><strong>ISBN:</strong> ${libro.isbn}</p>
        <p><strong>Autor/es:</strong> ${autores}</p>
        <p><strong>Género:</strong> ${libro.generoLiterario}</p>
        <p><strong>Precio:</strong> ${libro.precio} €</p>
        <p><strong>Tipo:</strong> ${"Papel"}</p>
        <p><strong>Stock:</strong> ${libro.stock} libros</p>
        <p><strong>Peso:</strong> ${libro.peso} g</p>
        <p><strong>Dimensiones:</strong> ${libro.dimensiones} cm</p>`;
    }
    document.getElementById("modalTitulo").textContent = libro.titulo;

    const modal = new bootstrap.Modal(document.getElementById("detalleLibroModal"));
    modal.show();
}
