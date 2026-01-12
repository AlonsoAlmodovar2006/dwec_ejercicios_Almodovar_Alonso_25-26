document.addEventListener('DOMContentLoaded', async () => {
    mostrarInstituto();
    // mostrarUbicacionUsuario();
});

function mostrarInstituto() {
    var map = L.map('mapInstituto').setView([38.773794066452595, -3.396903870799203], 18.17);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([38.773794066452595, -3.396903870799203]).addTo(map)
        .bindPopup('¡Desde aquí se ha desarrollado el proyecto!')
        .openPopup();
}

// function mostrarUbicacionUsuario() {
//     var map = L.map('mapInstituto').setView([0, 0], 2);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);

    
// }