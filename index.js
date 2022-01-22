
//Elementos HTML
const contenedorPrincipalTarjetas = document.querySelector(".contenedor-conjunto-tarjetas")
const contenedorTarjetaTrago = document.querySelector(".contenedor-tarjeta-trago")
const formularioBusquedaNombre = document.querySelector(".formulario-busqueda-nombre")
const formularioBusquedaIngrediente = document.querySelector(".formulario-busqueda-ingrediente")
const formularioFiltro = document.querySelector(".formulario-filtro")
const contenedorSinResultado = document.querySelector(".contenedor-sin-resultados")
const contenedorBotonesPaginado = document.querySelector(".contenedor-botones-paginado")


const inputBusquedaNombre = document.querySelector("#input-busqueda-nombre")
const inputBusquedaIngrediente = document.querySelector("#input-busqueda-ingrediente")
const botonTragoAleatorio = document.querySelector("#boton-trago-aleatorio")

const checkboxAlcohol = document.querySelector("#checkbox-alcohol")
const checkboxNoAlcohol = document.querySelector("#checkbox-no-alcohol")
const checkboxAll = document.querySelector("#checkbox-all")

const botonHome = document.querySelector(".boton-home")
const botonError = document.querySelector(".boton-error")
const botonDarkMode = document.querySelector("#boton-dark-mode")
const bodyDarkMode = document.querySelector("body")
const botonBuscar = document.querySelector("#boton-buscar")


const numeroPagina = document.querySelector(".numero-pagina")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")


// Funciones

// Tarjetas menu principal

const armarInicio = (pagina) => {
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
.then((res) =>  res.json())
.then((data) => {
    arrayCortado = data.drinks.slice(pagina, pagina + 12)
    htmlConjuntoTarjetas(arrayCortado)
    formularioFiltro.style.display="flex"
})
}
armarInicio(0)


const htmlConjuntoTarjetas = (data) => {
    const html = data.reduce((acc, curr) => {
       return acc + `
           <div class="tarjeta">
               <div class="imagen-tarjeta"><img src="${curr.strDrinkThumb}"></div>
               <h2>${curr.strDrink}</h2>
               <button class="boton-ver-mas" data-id=${curr.idDrink}>More info</button>
           </div>
       `
     }, "")
     contenedorPrincipalTarjetas.innerHTML = html
     botonVerMas()
   }

const botonVerMas = () => {
    const botonesVerMas = document.querySelectorAll(".boton-ver-mas")
    for (let i = 0; i < botonesVerMas.length; i++) {
        botonesVerMas[i].onclick = () => {
       const idTrago = botonesVerMas[i].dataset.id
       mostrarTrago(idTrago)
}}}


// Tarjeta individual

const htmlTarjetaTrago = (data) => {

    contenedorTarjetaTrago.style.display = "flex"
    const html = `
        <div class="tarjeta-info-trago">
            <img src="${data.strDrinkThumb}">
            <div>
                <h2>${data.strDrink}</h2>
                <h3>Category: ${data.strCategory}</h3>
                <h3>Glass: ${data.strGlass}</h3>
                <ul>
                    <h3>Ingredients</h3>
                    <li>${data.strIngredient1}</li>
                    <li>${data.strIngredient2}</li>
                    <li>${data.strIngredient3}</li>
                    <li>${data.strIngredient4}</li>
                </ul>
                <h3>Instructions</h3>
                <p>${data.strInstructions}</p>
            <button class="boton-volver">Volver</button>
            </div>
        </div>
    `

    contenedorTarjetaTrago.innerHTML = html

    const botonVolver = document.querySelector(".boton-volver")

    botonVolver.onclick = () => {
     contenedorTarjetaTrago.style.display = "none"
     contenedorPrincipalTarjetas.style.display = "flex"
     
     contenedorBotonesPaginado.style.display = "flex"
     armarInicio(0)
    }
}

const mostrarTrago = (id) => {
    contenedorPrincipalTarjetas.style.display = "none"
    contenedorBotonesPaginado.style.display = "none"

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) =>  res.json())
    .then((data) => {
    htmlTarjetaTrago(data.drinks[0])
    formularioFiltro.style.display="none"
    contenedorSinResultado.style.display = "none"
    })
}


// Formulario de busqueda

const buscarTrago = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputBusquedaNombre.value}`)
    .then((res) =>  res.json())
    .then((data) => {
        if(data.drinks != null) {
            htmlConjuntoTarjetas(data.drinks)
            contenedorSinResultado.style.display = "none"
            contenedorBotonesPaginado.style.display = "none"
        }
        else {
            contenedorSinResultado.style.display = "block"
            contenedorPrincipalTarjetas.style.display = "none"
            contenedorBotonesPaginado.style.display = "none"
        }
    })

    contenedorTarjetaTrago.style.display = "none"
    contenedorPrincipalTarjetas.style.display = "flex"
    contenedorBotonesPaginado.style.display = "flex"
    formularioFiltro.style.display="flex"
    inputBusquedaNombre.value = ""
    inputBusquedaIngrediente.value = ""

}


const buscarIngrediente = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputBusquedaIngrediente.value}`)
    .then((res) =>  res.json())
    .then((data) => {
    if(data.drinks != null) {
        htmlConjuntoTarjetas(data.drinks)
        contenedorSinResultado.style.display = "none"
        contenedorBotonesPaginado.style.display = "none"
    }
    else {
        contenedorSinResultado.style.display = "block"
        contenedorPrincipalTarjetas.style.display = "none"
        contenedorBotonesPaginado.style.display = "none"
    }
    
    })

    contenedorTarjetaTrago.style.display = "none"
    contenedorPrincipalTarjetas.style.display = "flex"
    contenedorBotonesPaginado.style.display = "flex"
    formularioFiltro.style.display="flex"
    inputBusquedaIngrediente.value = ""
    inputBusquedaNombre.value = ""
}

formularioBusquedaNombre.onsubmit = (e) => {
    e.preventDefault()
    buscarTrago() 
}

formularioBusquedaIngrediente.onsubmit = (e) => {
    e.preventDefault()
    buscarIngrediente()
    
}

botonBuscar.onclick = (e) => {
    e.preventDefault()
    buscarTrago()
    buscarIngrediente()
}

// Botones navbar

botonTragoAleatorio.onclick = () => {
  
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) =>  res.json())
    .then((data) => {
    mostrarTrago(data.drinks[0].idDrink)
    })
}

botonHome.onclick = () => {
    contenedorTarjetaTrago.style.display = "none"
    contenedorPrincipalTarjetas.style.display = "flex"
    contenedorBotonesPaginado.style.display = "flex"
    contenedorSinResultado.style.display = "none"
    armarInicio(0)
}

botonError.onclick = () => {
    contenedorTarjetaTrago.style.display = "none"
    contenedorPrincipalTarjetas.style.display = "flex"
    contenedorBotonesPaginado.style.display = "flex"
    contenedorSinResultado.style.display = "none"
    armarInicio(0)
}


// Filtros 

checkboxAlcohol.onchange = () => {
    if (checkboxAlcohol.checked) {
            fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
            .then((res) =>  res.json())
            .then((data) => {
                htmlConjuntoTarjetas(data.drinks)
            })
            }
    else {
        armarInicio(0)
    }
}

checkboxNoAlcohol.onchange = () => {
    if (checkboxNoAlcohol.checked) {
            fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
            .then((res) =>  res.json())
            .then((data) => {
                htmlConjuntoTarjetas(data.drinks)
            })
            }
    else {
        armarInicio(0)
    }
}



// Paginado

let paginaActual = 0

 next.onclick = () => {

     paginaActual = paginaActual + 1
     numeroPagina.textContent = `Page ${paginaActual + 1}`
     armarInicio(paginaActual * 10)
     if(paginaActual === 9) {
         next.disabled = true
     }

 }

 prev.onclick = () => {
     paginaActual = paginaActual - 1
     numeroPagina.textContent = `Page ${paginaActual + 1}`
     armarInicio(paginaActual * 10)

 }


// Modo oscuro

botonDarkMode.onclick = () => {
    botonDarkMode.classList.toggle("dark-mode-botones")
    bodyDarkMode.classList.toggle("dark-mode")
}





