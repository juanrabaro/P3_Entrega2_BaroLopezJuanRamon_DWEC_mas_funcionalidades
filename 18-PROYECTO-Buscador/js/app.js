import { coches } from "./db.js";
import { añadirCochesLocalStorage, borrarLocalStorage, traerCochesLocalStorage } from "./localStorage.js";


const marca = document.querySelector("#marca")
const year = document.querySelector("#year")
// const minimo = document.querySelector("#minimo")
const rangoMinimo = document.querySelector("#rangoMinimo")
const pRangoMinimo = document.querySelector("#pRangoMinimo")
// const maximo = document.querySelector("#maximo")
const rangoMaximo = document.querySelector("#rangoMaximo")
const pRangoMaximo = document.querySelector("#pRangoMaximo")
const puertas = document.querySelector("#puertas")
const transmision = document.querySelector("#transmision")
const color = document.querySelector("#color")

const aVerFavoritos = document.querySelector("#enlaceFav")
const btnForm = document.querySelector("#enlaceNuevoCoche")

const contenedor = document.querySelector("#resultado")

var listaCochesDB = traerCochesLocalStorage("coches")
if ( listaCochesDB.length === 0 ) {
    console.log("localStorage vacio")
    listaCochesDB = coches
    añadirCochesLocalStorage(listaCochesDB, "coches")
}
listaCochesDB = traerCochesLocalStorage("coches")

const listaCochesFavoritos = traerCochesLocalStorage("cochesFavoritos")

const datosBusqueda = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: ""
}

const max = new Date().getFullYear()
const min = max - 10

for (var i = max; i > min; i--) {
    const option = document.createElement("option")
    option.value = i
    option.textContent = i
    year.appendChild(option)
}

document.addEventListener("DOMContentLoaded", () => {
    //borrarLocalStorage()
    mostrarCoches(listaCochesDB)
})

marca.addEventListener("input", (e) => {
    datosBusqueda.marca = e.target.value
    filtrarCoches()
})
year.addEventListener("input", (e) => {
    datosBusqueda.year = parseInt(e.target.value)
    filtrarCoches()
})
rangoMinimo.addEventListener("input", (e) => {
    datosBusqueda.minimo = parseInt(e.target.value)
    pRangoMinimo.textContent = e.target.value + "€"
    filtrarCoches()
})
rangoMaximo.addEventListener("input", (e) => {
    datosBusqueda.maximo = parseInt(e.target.value)
    pRangoMaximo.textContent = e.target.value + "€"
    filtrarCoches()
})
puertas.addEventListener("input", (e) => {
    datosBusqueda.puertas = parseInt(e.target.value)
    filtrarCoches()
})
color.addEventListener("input", (e) => {
    datosBusqueda.color = e.target.value
    filtrarCoches()
})
transmision.addEventListener("input", (e) => {
    datosBusqueda.transmision = e.target.value
    filtrarCoches()
})

function limpiarHTML() {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}

function mostrarCoches(coches) {
    limpiarHTML()
    coches.forEach(coche => {
        const btnGuardarCoche = document.createElement("button")
        btnGuardarCoche.textContent = "Guardar coche"
        const pCocheHTML = document.createElement("p")
        if ( repetido(listaCochesFavoritos, coche) ) {
            pCocheHTML.innerHTML =
            `
            <p>
            ${coche.marca} - ${coche.modelo} - ${coche.year} - ${coche.precio} - ${coche.puertas} - ${coche.color} - ${coche.transmision}
            </p>
            <button class="btnGuardar" style="background-color: green; color: white;">
            Coche guardado
            </button>
            `
        } else {
            pCocheHTML.innerHTML =
            `
            <p>
            ${coche.marca} - ${coche.modelo} - ${coche.year} - ${coche.precio} - ${coche.puertas} - ${coche.color} - ${coche.transmision}
            </p>
            <button class="btnGuardar">
            Guardar coche
            </button>
            `
        }

        contenedor.appendChild(pCocheHTML)
    })

    añadirCocheFav()

}


function filtrarCoches() {
    const resultado = listaCochesDB
        .filter(filtraMarca)
        .filter(filtraYear)
        .filter(filtraMinimo)
        .filter(filtraMaximo)
        .filter(filtraPuertas)
        .filter(filtraTransmision)
        .filter(filtraColor)
    
    if (resultado.length) {
        mostrarCoches(resultado)
    } else {
        noResultado()
    }
}

function noResultado() {
    limpiarHTML()
    const noResultado = document.createElement("div")
    noResultado.classList.add("alerta", "error")
    noResultado.textContent = "No hay resultados"
    contenedor.appendChild(noResultado)
}

function filtraMarca(coche) {
    if (datosBusqueda.marca) {
        return coche.marca === datosBusqueda.marca
    }
    return coche
}
function filtraYear(coche) {
    if (datosBusqueda.year) {
        return coche.year === datosBusqueda.year
    }
    return coche
}
function filtraMinimo(coche) {
    if (datosBusqueda.minimo) {
        return coche.precio >= datosBusqueda.minimo
    }
    return coche
}
function filtraMaximo(coche) {
    if (datosBusqueda.maximo) {
        return coche.precio <= datosBusqueda.maximo
    }
    return coche
}
function filtraPuertas(coche) {
    if (datosBusqueda.puertas) {
        return coche.puertas === datosBusqueda.puertas
    }
    return coche
}
function filtraTransmision(coche) {
    if (datosBusqueda.transmision) {
        return coche.transmision === datosBusqueda.transmision
    }
    return coche
}
function filtraColor(coche) {
    if (datosBusqueda.color) {
        return coche.color === datosBusqueda.color
    }
    return coche
}



function añadirCocheFav() {
    const btnGuardarCoche = document.querySelectorAll(".btnGuardar")
    const arrayBotones = Array.from(btnGuardarCoche)
    btnGuardarCoche.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if ( !repetido(listaCochesFavoritos, listaCochesDB[arrayBotones.indexOf(boton)]) ) {
                listaCochesFavoritos.push(listaCochesDB[arrayBotones.indexOf(boton)])
                e.target.style = "background-color: green; color: white;"
                e.target.textContent = "Coche guardado"
                console.log(listaCochesFavoritos)
                añadirCochesLocalStorage(listaCochesFavoritos, "cochesFavoritos")
            }
        })
    })
}

function repetido(listaCochesFavoritos, cocheConcreto) {
    var bandera = false
    listaCochesFavoritos.forEach(coche => {
        if ( JSON.stringify(listaCochesFavoritos[listaCochesFavoritos.indexOf(coche)]) === JSON.stringify(cocheConcreto) ) {
            bandera = true
        }
    })
    return bandera
}

aVerFavoritos.addEventListener("click", (e) => {
    window.location.href = "./verFav.html"
})