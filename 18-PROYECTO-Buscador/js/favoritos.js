import { traerCochesLocalStorage, borrarCocheLocalStorage, añadirCochesLocalStorage } from "./localStorage.js";

const divResultadoFav = document.querySelector("#resultadoFav")

document.addEventListener("DOMContentLoaded", (e) => {
    const listaCoches = traerCochesLocalStorage("cochesFavoritos")
    noFavoritosGuardados(listaCoches)
    cargarHTML(listaCoches)
})

function cargarHTML(listaCoches) {
    console.log(listaCoches)

    const ulCoche = document.createElement("ul")
    listaCoches.forEach(coche => {
        const btnBorrarFav = document.createElement("button")
        btnBorrarFav.textContent = "Borrar de favoritos"
        btnBorrarFav.onclick = function() {
            listaCoches = borrarCocheLocalStorage(listaCoches.indexOf(coche), listaCoches)
            añadirCochesLocalStorage(listaCoches, "cochesFavoritos")
            limpiarHTML(divResultadoFav)
            noFavoritosGuardados(listaCoches)
            cargarHTML(listaCoches)
        }
        const liCoche = document.createElement("li")
        liCoche.textContent = 
        `
        ${coche.marca} - ${coche.modelo} - ${coche.year} - ${coche.precio} - ${coche.puertas} - ${coche.color} - ${coche.transmision}
        `
        ulCoche.appendChild(liCoche)
        ulCoche.appendChild(btnBorrarFav)
    })
    divResultadoFav.appendChild(ulCoche)
}

function limpiarHTML(div) {
    while ( div.firstElementChild ) {
        div.firstElementChild.remove()
    }
}

function noFavoritosGuardados(listaCoches) {
    if ( listaCoches.length === 0 ) {
        const pNoFav = document.createElement("p")
        pNoFav.textContent = "No tienes coches guardados"
        divResultadoFav.appendChild(pNoFav)
    }
}