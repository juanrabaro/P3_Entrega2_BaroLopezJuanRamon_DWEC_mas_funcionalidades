//localStorage.removeItem('receta')
//localStorage.setItem('receta', JSON.stringify(lista))
//const listaRecetasFavoritas2 = JSON.parse(localStorage.getItem('receta') || [])

export function borrarLocalStorage() {
    localStorage.removeItem('cochesFavoritos')
}

export function borrarCocheLocalStorage(id, listaCoches) {
    console.log(listaCoches[id])
    return listaCoches.filter(function(coche) {
        return coche !== listaCoches[id]
    })
}

export function añadirCochesLocalStorage(listaCoches, destinoLocalStorage) {
    localStorage.setItem(destinoLocalStorage, JSON.stringify(listaCoches))
}

export function traerCochesLocalStorage(nombreLocalStorage) {
    return JSON.parse(localStorage.getItem(nombreLocalStorage)) || []
}