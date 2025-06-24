const listaProductos = document.querySelector('#listaProductos');
const contentProducts = document.querySelector('#contentProducts')

let productsArray = [];

document.addEventListener('DOMContentLoaded', function () {
    eventListeners();

});

function eventListeners() { //funcion que llama los eventos
    listaProductos.addEventListener('click', getDataElements);
}

function updateCaertCount() { //contador, suma la cantidad de productos en el carrito
    const cartCount = document.querySelector('#cartCount')
    cartCount.textContent = productsArray.length;
}

function updateTotal() {
    const total = document.querySelector('#total')
    let totalProducto = productsArray.reduce((total, prod) => total + prod.price * prod.quantity, 0);
    total.textContent = `$${totalProducto.toFixed(2)}`;
}


function getDataElements(e) {//funcion que selecciona elementos del DOM (La e llama a el evento)
    if (e.target.classList.contains('boton-tarjeta')) {
        const elementHTML = e.target.parentElement; //con parentElement podemos seleccionar los elementos del DOM dando clic al boton "añadir al carrito"
        selectData(elementHTML); //seleciona los datos del elementHTML que estan en la tarjeta
    }
}

function selectData(prod) { //llama a la funcion que selleciona los datos del elementHTML
    const productObj = {//crea el objeto que contiene la info del producto
        img: prod.querySelector('img').src,
        title: prod.querySelector('h2').textContent,
        price: parseFloat(prod.querySelector('#precio').textContent.replace('$', '')),
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10), //la base 10 asegura de que siempre sea un entero
        quantity: 1
    }
    //validar que un producto no se repita dentro del carrito
    const exists = productsArray.some(prod => prod.id === productObj.id) //.someeste metodo se utiliza en arrays para verificar si almenos un elemento cumple con una condicion, retorna true o false

    if (exists) {
        showAlert('El producto ya existe en el carrito', 'error')
        return;
    }

    productsArray = [...productsArray, productObj] //copia la lista de productsArray y obtiene productObj
    showAlert('El producto fue agregado exitosamente', 'success');
    productsHtml();
    updateCaertCount(); //contador
    updateTotal();

}

function productsHtml() {
    cleanHtml();
    productsArray.forEach(prod => {
        const { img, title, price, quantity, id } = prod; //destructuracion del objeto

        const tr = document.createElement('tr'); //crea el html

        const tdImg = document.createElement('td');
        const prodImg = document.createElement('img');
        prodImg.src = img;
        prodImg.alt = 'image product'
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement('td');
        const prodTitle = document.createElement('p');
        prodTitle.textContent = title;
        tdTitle.appendChild(prodTitle);

        const tdPrice = document.createElement('td');
        const prodPrice = document.createElement('p');
        prodPrice.textContent = `$${price.toFixed(2) * quantity}`;
        tdPrice.appendChild(prodPrice);

        const tdQuantity = document.createElement('td');
        const prodQuantity = document.createElement('input');
        prodQuantity.type = 'number';
        prodQuantity.min = '1';
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        prodQuantity.oninput = updateQuantity;
        tdQuantity.appendChild(prodQuantity);

        const tdDelete = document.createElement('td');
        const prodDelete = document.createElement('button');
        prodDelete.type = 'button';
        prodDelete.textContent = 'X';
        prodDelete.onclick = () => destroyProduct(id);
        tdDelete.appendChild(prodDelete)



        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);

        contentProducts.appendChild(tr);
    });
}

function updateQuantity(e) {
    const newQuantity = parseInt(e.target.value, 10);
    const idProd = parseInt(e.target.dataset.id, 10);

    const product = productsArray.find(prod => prod.id === idProd); //array metho para buscar el primer elemento en un arrau, que cumple con una condicion especifica
    if (product && newQuantity > 0) { //actualiza la cnatidad
        product.quantity = newQuantity;
    }

    productsHtml();
    updateTotal();
}

//FUNCION PARA ELIMINAR PRODUCTOS
function destroyProduct(idProd) {
    productsArray = productsArray.filter(prod => prod.id !== idProd);
    showAlert('El producto fue eliminado con éxito', 'success');
    productsHtml();
    updateCaertCount();
    updateTotal();
}

//limpiar el html despues de agregar los productos

function cleanHtml() {
    contentProducts.innerHTML = '';
}

//mensaje de alert

function showAlert(message, type) {
    const nonRepeatAlert = document.querySelector('alert');//selecciona el div del alert y con la funcion nonReapeatAlert, no permite que se repita
    if (nonRepeatAlert) nonRepeatAlert.remove();
    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;

    document.body.appendChild(div); //introducir alert al body

    setTimeout(() => div.remove(), 5000); //eliminar alert
}



//FUNCION PARA CONSUMO DE API

const url = "https://fakestoreapi.com/products";
let bolsa = [];
const metodo = { method: "GET" };
fetch(url, metodo)
    .then(data => { return data.json() })
    .then(data1 => { bolsa = data1; })
    .catch(error => console.log(error))

setTimeout(() => {
    console.log(bolsa);

}, 3000);


function tarjetaProductos(categoria) {
    const contenedorProductos = document.getElementById("listaProductos");
    contenedorProductos.innerHTML = "";
    bolsa.forEach(producto => {
        if (producto.category == categoria) {
            let tarjetita = document.createElement("div");
            tarjetita.classList.add("contenedor-tarjeta");
            tarjetita.innerHTML = `
            <h2 class="titulo-tarjeta">${producto.title}</h2>
          <img class="imagen-tarjeta" src=${producto.image}>
          <p class="parrafo-tarjeta" id="precio">${producto.price}</p>
          <p class="parrafo-tarjeta" id="descripcion">${producto.description.slice(0,400)}...</p>
          <button class="boton-tarjeta" type="button" data-id= ${producto.id} ="">añadir al carrito</button>
            `
            contenedorProductos.appendChild(tarjetita);
        }
    })
}

const categoriaContenedor = document.getElementsByClassName("stones-container")[0];
categoriaContenedor.addEventListener("click", () => {
    const clickeado = event.target.id;
    switch (clickeado) {
        case "men's clothing":
            tarjetaProductos(clickeado);
            break;
        case "women's clothing":
            tarjetaProductos(clickeado);
            break;
        case "jewelery":
            tarjetaProductos(clickeado);
            break;
        case "electronics":
            tarjetaProductos(clickeado);
            break;

        default:
            break;
    }
})