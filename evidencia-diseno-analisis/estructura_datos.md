# 📦 Estructura de Datos - Tienda LoV 🛍️

Este documento explica cómo se estructuran, almacenan y manipulan los datos dentro del proyecto de tienda online **LoV**.

---

## 🛒 Carrito de Compras

### 📌 Estructura:
El carrito se representa como un array de objetos:

```js
[
  {
    id: 1,
    title: "Camiseta Rosa",
    price: 29.99,
    quantity: 2,
    img: "url_imagen"
  },
  ...
]
```

### 📥 Almacenamiento:
- Se guarda en `localStorage` bajo la clave `"products"`.
- Se actualiza al agregar productos, modificar cantidades o eliminar elementos.
- Se carga automáticamente al iniciar la página (`DOMContentLoaded`).

### 📈 Funcionalidades:
- Agrega productos sin repetir (validación por `id`).
- Permite modificar cantidades manualmente.
- Calcula el total general dinámicamente.
- Actualiza el contador total de productos en el ícono del carrito.

---

## 📁 Productos

### 📌 Fuente de Datos:
- Se consumen desde la API pública [FakeStoreAPI](https://fakestoreapi.com/products).
- Se guardan en la variable global `bolsa`.

### 📥 Estructura de cada producto:

```js
{
  id: 4,
  title: "Collar de perlas",
  price: 89.99,
  description: "...",
  category: "jewelery",
  image: "url"
}
```

### 🧠 Uso:
- Renderizados como tarjetas dinámicas.
- Pueden filtrarse por categoría, precio o búsqueda por título.

---

## 🧾 Historial de Compras

### 📌 Estructura:
Cada compra se guarda como un objeto con productos, fecha y total:

```js
{
  productos: [ ...arrayDeProductos ],
  fecha: "25/06/2025, 11:02:15 AM",
  total: 150.25
}
```

- Todo el historial es un array de compras y se guarda en `localStorage` bajo la clave `"historialCompras"`.

### 📈 Funcionalidades:
- Visualización de compras anteriores en un modal.
- Botón para borrar todo el historial con confirmación.

---

## 🔍 Filtros y Búsqueda

### 🎯 Estructura:
- Los filtros por precio se aplican al array `bolsa` con `.filter()`.
- La búsqueda se realiza con `.includes()` sobre `title.toLowerCase()`.

### 💡 Ejemplo:
```js
bolsa.filter(producto => producto.price < 50); // Filtro por precio
bolsa.filter(producto => producto.title.toLowerCase().includes('blusa')); // Búsqueda
```

---

## 📌 Conclusión

La estructura de datos en **LoV** está pensada para ser clara, eficiente y fácil de mantener. Cada funcionalidad principal (carrito, productos, historial, filtros) está respaldada por estructuras simples y bien organizadas, haciendo el proyecto accesible.
