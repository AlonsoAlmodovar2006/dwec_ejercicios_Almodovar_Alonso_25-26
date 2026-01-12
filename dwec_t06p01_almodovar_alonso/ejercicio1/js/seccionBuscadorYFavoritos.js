console.log("T06 - Ejercicio 01 - Buscador y Favoritos");
// COSAS A HACER
// 
// Errores HTTP (la API responde, pero con error: 404, 500, etc.)
// Búsquedas sin resultados (la API devuelve un array vacío)
// Errores de uso por parte del usuario (input vacío)

const main = document.querySelector("main");
document.addEventListener('DOMContentLoaded', async () => {
    const favoritos = [];
    cookies();
    const formBuscador = document.getElementById("formBuscador");
    const inputPersonaje = document.getElementById("inputPersonaje");

    const datosAPI = await cargarAPI();
    if (datosAPI) {
        inputPersonaje.addEventListener("input", () => {
            pintarPersonaje(formBuscador, datosAPI, inputPersonaje.value, favoritos);
        });

        formBuscador.addEventListener("submit", (e) => {
            e.preventDefault();
            pintarPersonaje(formBuscador, datosAPI, inputPersonaje.value.toLowerCase(), favoritos);
            formBuscador.reset();
        });

        rellenarFavoritos(favoritos);
    } else {
        main.innerHTML = `<p>ERROR la API no funciona</p>`
    }
});

function pintarPersonaje(form, datosAPI, nombrePersonaje, favoritos) {
    const tabla = document.getElementById("tablaPersonajes")
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = "";
    if (nombrePersonaje) {
        let personajes = [];
        for (const casa of datosAPI) {
            personajes.push(...casa.filter((p) => p.name.toLowerCase().includes(nombrePersonaje)));
        }

        if (personajes.length > 0) {
            personajes.forEach(personaje => {
                let esFavorito = false;

                const fila = document.createElement("tr");

                const tdName = document.createElement("td");
                tdName.classList.add("fw-semibold");
                tdName.textContent = personaje.name;
                fila.appendChild(tdName);

                const tdHouse = document.createElement("td");
                tdHouse.textContent = personaje.house;
                fila.appendChild(tdHouse);

                const tdDate = document.createElement("td");
                tdDate.classList.add("text-center");
                tdDate.textContent = personaje.dateOfBirth;
                fila.appendChild(tdDate);

                const tdSpecies = document.createElement("td");
                tdSpecies.textContent = personaje.species;
                fila.appendChild(tdSpecies);

                const tdImage = document.createElement("td");
                const img = document.createElement("img");
                img.src = personaje.image;
                img.alt = personaje.name;
                img.width = 50;
                tdImage.appendChild(img);
                fila.appendChild(tdImage);

                const tdBtn = document.createElement("td");
                tdBtn.classList.add("text-center");
                const btnFav = document.createElement("button");
                btnFav.classList.add("btn", "btn-sm", "btn-outline-primary");
                const icon = document.createElement("i");
                if (favoritos.length > 0) {
                    for (const favorito of favoritos) {
                        if (personaje.name == favorito.name) {
                            icon.classList.remove("bi", "bi-star");
                            icon.classList.add("bi", "bi-star-fill");
                            esFavorito = true;
                        } else {
                            icon.classList.remove("bi", "bi-star-fill");
                            icon.classList.add("bi", "bi-star");
                        }
                    }
                } else {
                    icon.classList.add("bi", "bi-star");
                }
                btnFav.appendChild(icon);
                tdBtn.appendChild(btnFav);
                fila.appendChild(tdBtn);

                btnFav.addEventListener("click", () => {
                    if (esFavorito) {
                        icon.classList.remove("bi", "bi-star-fill");
                        icon.classList.add("bi", "bi-star");
                        const personajeIndex = favoritos.findIndex((p) => p.name == personaje.name);
                        if (personajeIndex !== -1) {
                            favoritos.splice(personajeIndex, 1);
                        } else {
                            console.log("Algo raro ha pasado aquí" + index);
                        }
                    } else {
                        icon.classList.remove("bi", "bi-star");
                        icon.classList.add("bi", "bi-star-fill");
                        favoritos.push(personaje);
                    }
                    esFavorito = !esFavorito;
                    rellenarFavoritos(favoritos);
                });

                tbody.appendChild(fila);
                tabla.classList.remove("d-none");
                form.classList.remove("was-validated");
            });
        } else {
            form.classList.add("was-validated");
            tabla.classList.add("d-none");
        }
    } else {
        form.classList.add("was-validated");
        tabla.classList.add("d-none");
    }
}

async function cargarAPI() {
    let api = null;
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        api = data;
    }
    catch (error) {
        console.error("Error en la petición:", error);
    }
    return api;
}

function cookies() {
    const cookie = sessionStorage.getItem("cookie");
    if (!cookie) {
        while (!confirm("¿Aceptas las cookies de esta página?")) {
            sessionStorage.setItem('cookie', 'Alonso');
        }
    }
}

function rellenarFavoritos(favoritos) {
    localStorage.setItem('misObjetos', JSON.stringify(favoritos));
    const objetosRecuperados = JSON.parse(localStorage.getItem('misObjetos'));
    console.log('Objetos guardados:', objetosRecuperados);
    const tabla = document.getElementById("tablaFavoritos");
    const tbody = tabla.querySelector('tbody');
    const pFavorito = document.getElementById("sinFavorito");
    tbody.innerHTML = "";
    if (objetosRecuperados.length > 0) {
        objetosRecuperados.forEach(personaje => {
            const fila = document.createElement("tr");

            const tdName = document.createElement("td");
            tdName.classList.add("fw-semibold");
            tdName.textContent = personaje.name;
            fila.appendChild(tdName);

            const tdHouse = document.createElement("td");
            tdHouse.textContent = personaje.house;
            fila.appendChild(tdHouse);

            const tdDate = document.createElement("td");
            tdDate.classList.add("text-center");
            tdDate.textContent = personaje.dateOfBirth;
            fila.appendChild(tdDate);

            const tdSpecies = document.createElement("td");
            tdSpecies.textContent = personaje.species;
            fila.appendChild(tdSpecies);

            const tdImage = document.createElement("td");
            const img = document.createElement("img");
            img.src = personaje.image;
            img.alt = personaje.name;
            img.width = 50;
            tdImage.appendChild(img);
            fila.appendChild(tdImage);

            tbody.appendChild(fila);
            tabla.classList.remove("d-none");
            pFavorito.classList.add("d-none");
        });
    } else {
        tabla.classList.add("d-none");
        pFavorito.classList.remove("d-none");
    }
}
