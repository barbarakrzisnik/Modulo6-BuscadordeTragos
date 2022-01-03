
//Elementos HTML
const contenedorPrincipalTarjetas = document.querySelector(".contenedor-conjunto-tarjetas")


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
    //    mostrarTrago(idTrago)
}}}

fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
.then((res) =>  res.json())
.then((data) => {
    console.log(data.drinks)
})
