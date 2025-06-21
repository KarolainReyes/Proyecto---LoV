const listaProductos = document.querySelector('#listaProductos');

let productsArray = [];

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();

});

function eventListeners () { //funcion que llama los eventos
    listaProductos.addEventListener('click', getDataElements);
}

function getDataElements (e) {//funcion que selecciona elementos del DOM (La e llama a el evento)
   if (e.target.classList.contains('boton-tarjeta')) {
    const elementHTML = e.target.parentElement; //con parentElement podemos seleccionar los elementos del DOM dando clic al boton "añadir al carrito"
    selectData(elementHTML); //seleciona los datos del elementHTML que estan en la tarjeta
    }
}

function selectData (prod) { //llama a la funcion que selleciona los datos del elementHTML
    const productObj = {//crea el objeto que contiene la info del producto
        img: prod.querySelector('img').src,
        title: prod.querySelector('h2').textContent,
        price: parseFloat(prod.querySelector('#precio').textContent.replace('$','')),
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10), //la base 10 asegura de que siempre sea un entero
        quantity: 1
    }

    productsArray = [...productsArray, productObj] //copia la lista de productsArray y obtiene productObj
    
    productsHtml();

}

