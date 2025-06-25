# Estructura de Datos

## 🛒 Carrito

- Representado como un array de objetos, almacenado en `localStorage` bajo la clave `"carrito"`.
- Cada objeto contiene:

```js
{
  id: 1,
  nombre: "Producto ejemplo",
  precio: 49.99,
  cantidad: 2,
  imagen: "url_del_producto"
}
```

- Al agregar un producto, se verifica si ya existe en el carrito. Si es así, se incrementa la cantidad.

## 🛍️ Productos

- Los productos se obtienen con `fetch()` desde la API: https://fakestoreapi.com/products.
- Se almacenan en una variable global (`productos`) para luego filtrarlos, ordenarlos o mostrarlos en tarjetas HTML dinámicamente.

## 🧾 Historial de compras

- Cada compra finalizada se guarda como un objeto en el array `historialCompras` dentro de `localStorage`, con:
  - fecha de compra
  - total
  - productos comprados

## 👤 Login simulado

- El nombre de usuario se guarda como string en `localStorage` bajo la clave `"usuario"`.
