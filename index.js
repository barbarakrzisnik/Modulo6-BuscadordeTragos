
//Elementos HTML
const contenedorPrincipalTarjetas = document.querySelector(".contenedor-conjunto-tarjetas")
const contenedorTarjetaTrago = document.querySelector(".contenedor-tarjeta-trago")
const formularioBusquedaNombre = document.querySelector(".formulario-busqueda-nombre")
const formularioBusquedaIngrediente = document.querySelector(".formulario-busqueda-ingrediente")
const formularioFiltro = document.querySelector(".formulario-filtro")

const inputBusquedaNombre = document.querySelector("#input-busqueda-nombre")
const inputBusquedaIngrediente = document.querySelector("#input-busqueda-ingrediente")
const botonTragoAleatorio = document.querySelector("#boton-trago-aleatorio")


// Funciones

// Tarjetas menu principal

fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
.then((res) =>  res.json())
.then((data) => {
    console.log(data.drinks)
    htmlConjuntoTarjetas(data.drinks)
})


const htmlConjuntoTarjetas = (data) => {
    const html = data.reduce((acc, curr) => {
       return acc + `
           <div class="tarjeta">
               <h2>${curr.strDrink}</h2>
               <div class="imagen-tarjeta"><img src="${curr.strDrinkThumb}"></div>
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
       console.log(idTrago)
       mostrarTrago(idTrago)
}}}


// Tarjeta individual

const htmlTarjetaTrago = (data) => {

    contenedorTarjetaTrago.style.display = "block"
    console.log(data)
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
     contenedorPrincipalTarjetas.style.display = "block"
    }
}

const mostrarTrago = (id) => {
    contenedorPrincipalTarjetas.style.display = "none"

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) =>  res.json())
    .then((data) => {
    console.log(data)
    htmlTarjetaTrago(data.drinks[0])
    })
}


// Formulario de busqueda

formularioBusquedaNombre.onsubmit = (e) => {
    e.preventDefault()

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputBusquedaNombre.value}`)
    .then((res) =>  res.json())
    .then((data) => {
    console.log(data.drinks)
    htmlConjuntoTarjetas(data.drinks)
    })
}



formularioBusquedaIngrediente.onsubmit = (e) => {
    e.preventDefault()

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputBusquedaIngrediente.value}`)
    .then((res) =>  res.json())
    .then((data) => {
    console.log(data.drinks)
    htmlConjuntoTarjetas(data.drinks)
    })
}

botonTragoAleatorio.onclick = () => {
  
    fetch()
    .then((res) =>  res.json())
    .then((data) => {
    console.log(data.drinks)
    htmlConjuntoTarjetas(data.drinks)
    })

}

