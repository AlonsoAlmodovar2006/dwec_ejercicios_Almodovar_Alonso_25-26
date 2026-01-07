document.addEventListener('DOMContentLoaded', () => {
    const tienda = Tienda.getInstancia("Badulaque");
    pintarAutores(tienda.mostrarAutores());
    pintarGeneros(tienda.mostrarGeneros());
    pintarFormatos(tienda.mostrarFormatos());

    const form = document.querySelector("form");
    activarYDesactivarRadio();
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        crearLibro(form, tienda);
    });
});

function crearLibro(form, tienda) {
    const inputISBN = document.getElementById("isbn");
    const inputTitulo = document.getElementById("titulo");
    const selectGenero = document.getElementById("genero");
    const inputPrecio = document.getElementById("precio");
    const selectAutor = document.getElementById("autoresSelect");
    const inputAutor = document.getElementById("inputAutor");
    const radioTipo = form.tipo.value;
    const inputTamano = document.getElementById("tamano");
    const selectFormatos = document.getElementById("formato");
    const inputPeso = document.getElementById("peso");
    const inputDimensiones = document.getElementById("dimensiones");
    const inputStock = document.getElementById("stock");

    let autoresFinales = [];
    const autoresSeleccionados = [];
    for (const option of selectAutor.options) {
        if (option.selected) {
            autoresSeleccionados.push(option.value);
        }
    }
    if (autoresSeleccionados.length > 0) {
        autoresFinales = autoresSeleccionados;
    } else if (inputAutor.value !== "") {
        autoresFinales = [inputAutor.value];
    } else {
        inputAutor.setCustomValidity("Debe indicar al menos un autor");
        form.classList.add("was-validated");
        return;
    }
    inputAutor.setCustomValidity("");

    let libro = null;
    if (radioTipo == "Papel") {
        libro = tienda.pedirYCrearLibro(inputISBN.value.trim(), inputTitulo.value.trim(), selectGenero.value.trim(), autoresFinales, inputPrecio.value.trim(), radioTipo, null, null, inputPeso.value.trim(), inputDimensiones.value.trim(), inputStock.value.trim());
    } else if (radioTipo == "Ebook") {
        libro = tienda.pedirYCrearLibro(inputISBN.value.trim(), inputTitulo.value.trim(), selectGenero.value.trim(), autoresFinales, inputPrecio.value.trim(), radioTipo, inputTamano.value.trim(), selectFormatos.value.trim());
    }

    if (libro === null) {
        inputISBN.setCustomValidity("El ISBN ya está registrado");
        form.classList.add("was-validated");
        return;
    }
    inputISBN.setCustomValidity("");

    console.log("Libro creado", libro);

    form.reset();
    form.classList.remove("was-validated");
}

function pintarAutores(autores) {
    const selectAutores = document.getElementById("autoresSelect");
    selectAutores.innerHTML = "";

    autores.forEach(autor => {
        const opcion = document.createElement("option");
        opcion.innerHTML = `${autor.nombre}`;
        selectAutores.appendChild(opcion);
    });
}

function pintarGeneros(generos) {
    const selectGeneros = document.getElementById("genero");
    selectGeneros.innerHTML = `<option selected disabled value="">
                                    - Géneros disponibles -
                                </option>`;
    generos.forEach(genero => {
        const opcion = document.createElement("option");
        opcion.innerHTML += `${genero}`;
        selectGeneros.appendChild(opcion);
    });
}

function pintarFormatos(formatos) {
    const selectFormatos = document.getElementById("formato");
    selectFormatos.innerHTML = `<option selected disabled value=""> - Formatos Disponibles - </option>`
    formatos.forEach(formato => {
        const opcion = document.createElement("option");
        opcion.innerHTML += `${formato}`;
        selectFormatos.appendChild(opcion);
    })
}

function activarYDesactivarRadio() {
    const radios = document.querySelectorAll('input[name="tipo"]');
    const grupoEbook = document.getElementById("campos-ebook");
    const grupoPapel = document.getElementById("campos-papel");
    const inputTamano = document.getElementById("tamano");
    const inputFormato = document.getElementById("formato");
    const inputPeso = document.getElementById("peso");
    const inputDimensiones = document.getElementById("dimensiones");
    const inputStock = document.getElementById("stock");

    const gestionarCambio = () => {
        const seleccionado = document.querySelector('input[name="tipo"]:checked');
        if (seleccionado && seleccionado.value === "Ebook") {
            grupoEbook.classList.remove("d-none");
            grupoPapel.classList.add("d-none");
            activarEbook(inputTamano, inputFormato, inputPeso, inputDimensiones, inputStock);
        } else if (seleccionado && seleccionado.value === "Papel") {
            grupoPapel.classList.remove("d-none");
            grupoEbook.classList.add("d-none");
            activarPapel(inputPeso, inputDimensiones, inputStock, inputTamano, inputFormato);
        }
    };

    radios.forEach(radio => {
        radio.addEventListener('change', gestionarCambio);
    });
}

function activarEbook(tamano, formato, peso, dimensiones, stock) {
    tamano.disabled = false;
    formato.disabled = false;
    desactivarPapel(peso, dimensiones, stock);
}

function activarPapel(peso, dimensiones, stock, tamano, formato) {
    peso.disabled = false;
    dimensiones.disabled = false;
    stock.disabled = false;
    desactivarEbook(tamano, formato);
}

function desactivarEbook(tamano, formato) {
    tamano.disabled = true;
    formato.disabled = true;
    tamano.value = "";
    formato.value = "";
    tamano.setCustomValidity("");
    formato.setCustomValidity("");
}

function desactivarPapel(peso, dimensiones, stock) {
    peso.disabled = true;
    dimensiones.disabled = true;
    stock.disabled = true;
    peso.value = "";
    dimensiones.value = "";
    stock.value = "";
    peso.setCustomValidity("");
    dimensiones.setCustomValidity("");
    stock.setCustomValidity("");
}