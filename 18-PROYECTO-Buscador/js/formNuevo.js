import { añadirCochesLocalStorage, traerCochesLocalStorage } from "./localStorage.js";

document.addEventListener("DOMContentLoaded", ()=> {
    const cocheOBJ = {
        marca: '',
		modelo: '',
		year: 0,
		precio: 0,
		puertas: 0,
		color: '',
		transmision: ''
    }


    const form = document.querySelector("#formulario")

    const divPrecio = document.querySelector("#divPrecio")
    
    const marca = document.querySelector("#marca")
    marca.value = ""
    const modelo = document.querySelector("#modelo")
    modelo.value = ""
    const year = document.querySelector("#año")
    year.value = ""
    const precio = document.querySelector("#precio")
    precio.value = ""
    const puertas = document.querySelector("#puertas")
    puertas.value = ""
    const color = document.querySelector("#color")
    color.value = ""
    const transmision = document.querySelector("#transmision")
    transmision.value = ""

    const btnSubmit = document.querySelector("#añadirCoche")
    
    marca.addEventListener("change", (e)=> {
        cocheOBJ.marca = marca.value
        console.log(cocheOBJ)
    })
    modelo.addEventListener("blur", (e)=> {
        cocheOBJ.modelo = modelo.value
        validar(e)
        console.log(cocheOBJ)
    })
    year.addEventListener("change", (e)=> {
        cocheOBJ.year = parseInt(year.value)
        console.log(cocheOBJ)
    })
    precio.addEventListener("blur", (e)=> {
        cocheOBJ.precio = parseInt(precio.value)
        validar(e)
        console.log(cocheOBJ)
    })
    puertas.addEventListener("change", (e)=> {
        cocheOBJ.puertas = parseInt(puertas.value)
        console.log(cocheOBJ)
    })
    color.addEventListener("change", (e)=> {
        cocheOBJ.color = color.value
        console.log(cocheOBJ)
    })
    transmision.addEventListener("change", (e)=> {
        cocheOBJ.transmision = transmision.value
        console.log(cocheOBJ)
    })
    

    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        comprobarCampos()
    })

    var pErrorCreado = false
    function comprobarCampos() {
        if ( Object.values(cocheOBJ).some(valor => valor === '' || valor === 0 || valor === null) ) {
            if ( !pErrorCreado ) {
                const pError = document.createElement("p")
                pError.textContent = "TIENES QUE RELLENAR TODOS LOS CAMPOS DEL FORMULARIO"
                form.appendChild(pError)
                pErrorCreado = true
            }
        } else {
            if ( pErrorCreado ) {
                form.lastElementChild.remove()
                pErrorCreado = false
            }
            console.log("formulario listo")
            // Enviar a LocalStorage
            const todosCochesLocalStorage = traerCochesLocalStorage("coches")
            console.log(todosCochesLocalStorage)
            todosCochesLocalStorage.push(cocheOBJ)
            añadirCochesLocalStorage(todosCochesLocalStorage, "coches")
            marca.value = ""
            modelo.value = ""
            year.value = ""
            precio.value = ""
            puertas.value = ""
            color.value = ""
            transmision.value = ""
        }
    }
    

    function validar(e) {
        const campo = e.target
        const valor = e.target.value
        if ( campo.id === "precio" ) {
            // Validar precio
            if ( valor === "" ) {
                cocheOBJ.precio = null
                const pError = document.createElement("p")
                pError.id = "error"
                pError.textContent = "ESE NO ES UN PRECIO VÁLIDO"
                if (e.target.parentElement.lastElementChild.id !== "error") {
                    divPrecio.appendChild(pError)
                }
                
            } else {
                console.log("numero valido");
                if (e.target.parentElement.lastElementChild.id === "error") {
                    e.target.parentElement.lastElementChild.remove()
                }
            }
        }
    }

/*
    email.addEventListener("blur", validar)
    asunto.addEventListener("blur", validar)
    mensaje.addEventListener("blur", validar)
    btnReset.addEventListener("click", (e)=> {
        e.preventDefault()
        resetForm()
    })

    function validar(e) {
        const elementoPadre = e.target.parentElement

        if (e.target.value.trim() === "") {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, elementoPadre)
            emailOBJ[e.target.name] = ""
            comprobarFormulario()
            return 
        }
        if (!validarEmail(e.target.value) && e.target.id === "email") {
            mostrarAlerta("El email no es válido", elementoPadre)
            emailOBJ[e.target.name] = ""
            comprobarFormulario()
            return
        }

        limpiarAlerta(elementoPadre)
        emailOBJ[e.target.name] = e.target.value.trim().toLowerCase()
        comprobarFormulario(emailOBJ)
    }

    function comprobarFormulario() {
        const values = Object.values(emailOBJ)
        if (values .includes("")) {
            btnSubmit.classList.add("opacity-50")
            btnSubmit.disabled = true
            return
        }
        btnSubmit.classList.remove("opacity-50")
        btnSubmit.disabled = false
    }
    
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".bg-red-600")
        if (alerta) {
            alerta.remove()
        }
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia)

        const error = document.createElement("p")
        error.textContent = mensaje
        error.classList.add("bg-red-600", "text-center", "text-white", "p-2")
        referencia.appendChild(error)
    }

    function validarEmail(email) {
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        resultado = regex.test(email)
        return resultado
    }


    function resetForm() {
        emailOBJ.email = ""
        emailOBJ.asunto = ""
        emailOBJ.mensaje = ""
        formulario.reset()
        comprobarFormulario()
    }



    const spinner = document.querySelector("#spinner")
    btnSubmit.addEventListener("click", (e)=> {
        e.preventDefault()
        spinner.classList.remove("hidden")
        setTimeout(()=> {
            spinner.classList.add("hidden")

            resetForm()
    
            const alerta = document.createElement("p")
            alerta.classList.add("bg-green-500", "text-white", "text-center", "rounded-lg", "mt-10", "text-sm")
            alerta.textContent = "El mensaje se ha enviado con éxito"
            formulario.append(alerta)

            setTimeout(()=> {
                alerta.remove()
            }, 2000)
        }, 3000)
    })*/
})