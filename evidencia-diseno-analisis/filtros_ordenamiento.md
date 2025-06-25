# Filtros y Ordenamientos

## 🎯 Justificación de Usabilidad

- Se implementó un **filtro por precio** para facilitar la exploración de productos según el presupuesto:
  - Menor a $50
  - Entre $50 y $100
  - Mayor a $100

- Se agregó un sistema de **ordenamiento** (por precio o nombre) para mejorar la navegación y comparación entre productos.

- El diseño del filtro usa un `<select>` claro y accesible, sin necesidad de recargar la página.

## ⚙️ Detalles Técnicos

- El filtro por precio usa `.filter()` sobre el array de productos:
```js
productos.filter(p => p.price < 50)
```

- El ordenamiento usa `.sort()` según la opción elegida:
```js
productos.sort((a, b) => a.price - b.price) // menor a mayor
```

- Todo se ejecuta con `async/await` y se actualiza la vista de productos dinámicamente.
