console.log("T06 - Ejercicio 01 - Buscador");
// COSAS A HACER
// 
// Errores HTTP (la API responde, pero con error: 404, 500, etc.)
// Búsquedas sin resultados (la API devuelve un array vacío)
// Errores de uso por parte del usuario (input vacío)

const main = document.querySelector("main");
document.addEventListener('DOMContentLoaded', async () => {
    const formBuscador = document.getElementById("formBuscador");
    const inputPersonaje = document.getElementById("inputPersonaje");

    const datosAPI = await cargarAPI();
    if (datosAPI) {
        inputPersonaje.addEventListener("input", () => {
            pintarPersonaje(formBuscador, datosAPI, inputPersonaje.value);
        });

        formBuscador.addEventListener("submit", (e) => {
            e.preventDefault();
            pintarPersonaje(formBuscador, datosAPI, inputPersonaje.value);
            formBuscador.reset();
        })
    } else {
        main.innerHTML = `<p>ERROR la API no funciona</p>`
    }
});

function pintarPersonaje(form, datosAPI, nombrePersonaje) {
    const tabla = document.getElementById("tablaPersonajes")
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = "";
    if (nombrePersonaje != "") {
        const personajes = datosAPI.filter((p) => p.name.toLowerCase().includes(nombrePersonaje.toLowerCase()));

        if (personajes.length > 0) {
            personajes.forEach(personaje => {
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
                const btn = document.createElement("button");
                btn.classList.add("btn", "btn-sm", "btn-outline-primary");
                const icon = document.createElement("i");
                icon.classList.add("bi", "bi-star-fill");
                btn.appendChild(icon);
                tdBtn.appendChild(btn);
                fila.appendChild(tdBtn);

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
