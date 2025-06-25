const listaProductos = document.querySelector('#listaProductos');
const contentProducts = document.querySelector('#contentProducts');
const finalizarCompra = document.querySelector('#finalizarCompra');

let productsArray = [];

document.addEventListener('DOMContentLoaded', function () {
    eventListeners();

});

function eventListeners() {
  // Recuperar carrito guardado del local storage
  const localProduct = localStorage.getItem('products');
  if (localProduct) {
    productsArray = JSON.parse(localProduct);
    productsHtml();
    updateCartCount();
    updateTotal();
  }

  listaProductos.addEventListener('click', getDataElements);

  const finalizarCompra = document.querySelector('#finalizarCompra');
  const modalResumen = document.getElementById('modalResumen');
  const listaResumen = document.getElementById('listaResumen');
  const totalResumen = document.getElementById('totalResumen');
  const confirmarCompra = document.getElementById('confirmarCompra');

  finalizarCompra.addEventListener('click', () => {
    if (productsArray.length === 0) {
      showAlert('Tu carrito está vacío 😥', 'error');
      return;
    }

    listaResumen.innerHTML = '';
    let total = 0;

    productsArray.forEach(producto => {
      const li = document.createElement('li');
      li.textContent = `${producto.title} x${producto.quantity} - $${(producto.price * producto.quantity).toFixed(2)}`;
      listaResumen.appendChild(li);
      total += producto.price * producto.quantity;
    });

    totalResumen.textContent = `$${total.toFixed(2)}`;
    modalResumen.style.display = 'flex';
  });
}


confirmarCompra.addEventListener('click', () => {
  const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
  const compra = {
    productos: [...productsArray],
    fecha: new Date().toLocaleString(),
    total: productsArray.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)
  };

  historial.push(compra);
  localStorage.setItem('historialCompras', JSON.stringify(historial));

  // Limpiar el carrito
  productsArray = [];
  productsHtml();
  updateTotal();
  updateCartCount();

  modalResumen.style.display = 'none';

  // Redirigir a la página de gracias
  window.location.href = 'gracias.html';
});


function updateCartCount() { //contador, suma la cantidad de productos en el carrito
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
    updateCartCount(); //contador
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

    saveLocalStorage();
}
//FUNCION PARA LOCAL STORAGE

function saveLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productsArray));
}


//FUNCION PARA ACTUALIZAR LA CANTIDAD
function updateQuantity(e) {
    const newQuantity = parseInt(e.target.value, 10);
    const idProd = parseInt(e.target.dataset.id, 10);

    const product = productsArray.find(prod => prod.id === idProd); //array metho para buscar el primer elemento en un arrau, que cumple con una condicion especifica
    if (product && newQuantity > 0) { //actualiza la cnatidad
        product.quantity = newQuantity;
    }

    productsHtml();
    updateTotal();
    saveLocalStorage();
}


//FUNCION PARA ELIMINAR PRODUCTOS
function destroyProduct(idProd) {
    productsArray = productsArray.filter(prod => prod.id !== idProd);
    showAlert('El producto fue eliminado con éxito', 'success');
    productsHtml();
    updateCartCount();
    updateTotal();
    saveLocalStorage();
}

//limpiar el html despues de agregar los productos

function cleanHtml() {
    contentProducts.innerHTML = '';
}

//mensaje de alert

function showAlert(message, type) {
    const nonRepeatAlert = document.querySelector('.alert');//selecciona el div del alert y con la funcion nonReapeatAlert, no permite que se repita
    if (nonRepeatAlert) nonRepeatAlert.remove();
    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;

    document.body.appendChild(div); //introducir alert al body

    setTimeout(() => div.remove(), 1000); //eliminar alert
}



//FUNCION PARA CONSUMO DE API

const url = "https://fakestoreapi.com/products";
let bolsa = [];

async function cargarProductos() {
    const mensaje = document.getElementById('mensajeCarga');
    try {
        mensaje.style.display = 'flex';
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error('Error al cargar productos');
        bolsa = await respuesta.json();
        tarjetaProductosTotal(); // llama la data cuando ya esta
    } catch (error) {
        mensaje.innerHTML = `<span style="color: red;">Error al cargar productos 😢</span>`;
        console.error('Error al obtener productos:', error.message);
    } finally {
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 1000)
    }
}

// Llamamos la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});


document.getElementById("filtroPrecio").addEventListener("change", async (e) => {
    const valor = e.target.value;
    let productosFiltrados = [];

    switch (valor) {
        case "menor50":
            productosFiltrados = bolsa.filter(producto => producto.price < 50);
            break;
        case "entre50y100":
            productosFiltrados = bolsa.filter(producto => producto.price >= 50 && producto.price <= 100);
            break;
        case "mayor100":
            productosFiltrados = bolsa.filter(producto => producto.price > 100);
            break;
        default:
            productosFiltrados = bolsa;
    }

    mostrarProductosFiltrados(productosFiltrados);
});



function tarjetaProductosTotal() {
    const contenedorProductos = document.getElementById("listaProductos");
    contenedorProductos.innerHTML = "";
    bolsa.forEach(producto => {
        let tarjetita = document.createElement("div");
        tarjetita.classList.add("contenedor-tarjeta");
        tarjetita.innerHTML = `
            <h2 class="titulo-tarjeta">${producto.title}</h2>
            <img class="imagen-tarjeta" src=${producto.image}>
            <p class="parrafo-tarjeta" id="precio">${producto.price}</p>
            <p class="parrafo-tarjeta" id="descripcion">${producto.description.slice(0, 400)}...</p>
            <button class="boton-tarjeta" type="button" data-id= ${producto.id} ="">añadir al carrito</button>
            `
        contenedorProductos.appendChild(tarjetita);
    }
    )
}



function mostrarProductosFiltrados(lista) {
    const contenedorProductos = document.getElementById("listaProductos");
    contenedorProductos.innerHTML = "";
    lista.forEach(producto => {
        let tarjetita = document.createElement("div");
        tarjetita.classList.add("contenedor-tarjeta");
        tarjetita.innerHTML = `
        <h2 class="titulo-tarjeta">${producto.title}</h2>
        <img class="imagen-tarjeta" src=${producto.image}>
        <p class="parrafo-tarjeta" id="precio">${producto.price}</p>
        <p class="parrafo-tarjeta" id="descripcion">${producto.description.slice(0, 400)}...</p>
        <button class="boton-tarjeta" type="button" data-id=${producto.id}>añadir al carrito</button>
    `;
        contenedorProductos.appendChild(tarjetita);
    });
}

const inputBusqueda = document.getElementById('buscador');

inputBusqueda.addEventListener('input', () => {
    const texto = inputBusqueda.value.toLowerCase().trim();

    if (texto === "") {
        tarjetaProductosTotal();
        return;
    }

    const productosFiltrados = bolsa.filter(producto =>
        producto.title.toLowerCase().includes(texto)
    );

    mostrarProductosFiltrados(productosFiltrados);
})


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
            <p class="parrafo-tarjeta" id="descripcion">${producto.description.slice(0, 400)}...</p>
            <button class="boton-tarjeta" type="button" data-id= ${producto.id} ="">añadir al carrito</button>
            `
            contenedorProductos.appendChild(tarjetita);
        }
    })
}

const categoriaContenedor = document.getElementsByClassName("stones-container")[0];
categoriaContenedor.addEventListener("click", (event) => {
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


const verHistorial = document.getElementById('verHistorial');
const contenidoHistorial = document.getElementById('contenidoHistorial');

verHistorial.addEventListener('click', () => {
  const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];

  if (historial.length === 0) {
    contenidoHistorial.innerHTML = '<p>No hay compras registradas aún.</p>';
  } else {
    contenidoHistorial.innerHTML = '';

    historial.forEach((compra, index) => {
      const divCompra = document.createElement('div');
      divCompra.classList.add('compra-item');
      divCompra.innerHTML = `
        <h4>Compra #${index + 1} - ${compra.fecha}</h4>
        <ul>
          ${compra.productos.map(p => `<li>${p.title} x${p.quantity} - $${(p.price * p.quantity).toFixed(2)}</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> $${compra.total.toFixed(2)}</p>
        <hr>
      `;
      contenidoHistorial.appendChild(divCompra);
    });
  }

  document.getElementById('modalHistorial').style.display = 'flex';
});

//BORRAR HISTORIAL

const borrarHistorial = document.getElementById('borrarHistorial');

borrarHistorial.addEventListener('click', () => {
  const confirmar = confirm('¿Estás seguro de que deseas borrar todo el historial de compras? Esta acción no se puede deshacer.');

  if (confirmar) {
    localStorage.removeItem('historialCompras');
    contenidoHistorial.innerHTML = '<p>El historial ha sido eliminado.</p>';
    showAlert('Historial de compras eliminado 🗑️', 'success');
  }
});
