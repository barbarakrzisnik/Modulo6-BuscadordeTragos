
//Elementos HTML
const contenedorPrincipalTarjetas = document.querySelector(".contenedor-conjunto-tarjetas")
const contenedorTarjetaTrago = document.querySelector(".contenedor-tarjeta-trago")
const formularioBusquedaNombre = document.querySelector(".formulario-busqueda-nombre")
const formularioBusquedaIngrediente = document.querySelector(".formulario-busqueda-ingrediente")
const formularioFiltro = document.querySelector(".formulario-filtro")
const contenedorSinResultado = document.querySelector(".contenedor-sin-resultados")
const contenedorBotonesPaginado = document.querySelector(".contenedor-botones-paginado")
const bodyDarkMode = document.querySelector("body")


const inputBusquedaNombre = document.querySelector("#input-busqueda-nombre")
const inputBusquedaIngrediente = document.querySelector("#input-busqueda-ingrediente")


const checkboxAlcohol = document.querySelector("#checkbox-alcohol")
const checkboxNoAlcohol = document.querySelector("#checkbox-no-alcohol")
// Esta variable nunca se usa
const checkboxAll = document.querySelector("#checkbox-all")

const botonTragoAleatorio = document.querySelector("#boton-trago-aleatorio")
const botonHome = document.querySelector(".boton-home")
const botonError = document.querySelector(".boton-error")
const botonDarkMode = document.querySelector("#boton-dark-mode")

const botonBuscar = document.querySelector("#boton-buscar")


const numeroPagina = document.querySelector(".numero-pagina")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")


///////////////// Funcionamiento

// Tarjetas menu principal

const armarInicio = (pagina) => {
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
.then((res) =>  res.json())
.then((data) => {
    // falta un const aqui
    arrayCortado = data.drinks.slice(pagina, pagina + 12)
    htmlConjuntoTarjetas(arrayCortado)
    formularioFiltro.style.display="flex"
})
}

  // Todo el codigo que se ejecuta apenas carga la pagina, ponelo al final de todo
  // Asi es mas facil entender el flujo de ejecución
armarInicio(0)


const htmlConjuntoTarjetas = (data) => {
    const html = data.reduce((acc, curr) => {
        // Agrega el titulo del trago al alt de la imagen asi es mas claro aun . No es necesario 
        // aclarar que es una imagen (eso ya lo hace el lector de pantalla)
       return acc + `
           <div class="tarjeta">
               <div class="imagen-tarjeta"><img src="${curr.strDrinkThumb}" alt="Drink image"></div>
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
    console.log(data)
// La API aca es totalmente ridicula y deberia devolverte un array. De eso no hay discusión.
// Pero lo que no me convence de esto es que cuando son diez ingredientes, no se muestran, porque 
// solo tenes lugar para 4. Y si son solo dos, vemos "null" en la web
// Podemos crear una funcion que recorra y retorne los ingredientes correctamente, y ejecutarla
// debajo del h3:
// const showIngredients = (data) => {
//     const ingredients = [
//         data.strIngredient1, data.strIngredient2, data.strIngredient3, 
//         data.strIngredient4, data.strIngredient5, data.strIngredient6,
//         data.strIngredient7, data.strIngredient8, data.strIngredient9,
//         data.strIngredient10, data.strIngredient11, data.strIngredient12,
//         data.strIngredient13, data.strIngredient14, data.strIngredient15
//     ]
//     const html = ""
//     for (let i = 0; i < ingredients.length; i++) {
//         if (ingredients[i]) {// si el ingrediente no es null
//             html += `<li>${data.strIngredient[i]}</li>`
//         }
//     }
//     return html
// } 
// Y luego en el html lo ejecutas asi:
// showIngredients(data)

    contenedorTarjetaTrago.style.display = "flex"
    const html = `
        <div class="tarjeta-info-trago">
            <img src="${data.strDrinkThumb}" alt="Drink image">
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
            <button class="boton-volver" aria-label="Go back to homepage">Go back</button>
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
        // ojo con el tabulado aca
        // se podria decir asi: if (data.drinks) {
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
    // no necesitas prevenir el default en un boton
    e.preventDefault()
    buscarTrago()
    // porque el ingrediente esta vacio cuando se ejecuta la funcion buscarIngrediente
    // tenes que obtener el value del campo en la funcion, no antes
    buscarIngrediente() // No funciona buscar ingrediente a traves del boton search, solo on submit
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
// estas variables globales deben ir arriba de todo
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





