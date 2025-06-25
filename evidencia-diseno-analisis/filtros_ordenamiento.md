# 🧠 Justificación de Filtros y Ordenamientos - Tienda LoV

Este documento explica las decisiones detrás de los **filtros por precio**, **búsqueda por texto** y **ordenamiento por categoría** implementados en la tienda online **LoV**, desde una perspectiva de **usabilidad y experiencia de usuario (UX)**.

---

## 🎯 Objetivo General

Facilitar al usuario la **navegación**, **exploración** y **selección** de productos, brindando mecanismos intuitivos para encontrar lo que busca sin perder tiempo o sentirse abrumado por la cantidad de productos.

---

## 💰 Filtro por Precio

### 🎨 Interfaz:
Se implementó un `<select>` con las siguientes opciones:

- Menor a $50
- Entre $50 y $100
- Mayor a $100

### 👩‍💻 Funcionalidad:
Filtra dinámicamente el array `bolsa` según el rango de precio seleccionado usando `.filter()`:

```js
bolsa.filter(producto => producto.price < 50);
```

### ✅ Justificación UX:
- El precio es una de las variables más importantes para decidir una compra.
- Se agrupan en rangos reconocibles y útiles para el usuario promedio.
- Permite explorar productos según su presupuesto sin necesidad de recargar la página.

---

## 🔍 Búsqueda por Título

### 🎨 Interfaz:
Un `input` de tipo texto filtra en tiempo real mientras el usuario escribe.

### 👩‍💻 Funcionalidad:
Usa `.includes()` para comparar el texto ingresado con el `title` de cada producto:

```js
producto.title.toLowerCase().includes(texto);
```

### ✅ Justificación UX:
- Mejora la eficiencia en la búsqueda específica.
- Respuesta inmediata sin botón de "buscar".
- Ayuda a usuarios que ya saben lo que quieren o recuerdan el nombre de un producto.

---

## 🧩 Filtro por Categorías

### 🎨 Interfaz:
Se usan botones (o áreas clicables) por categoría con `id` representando:

- `"men's clothing"`
- `"women's clothing"`
- `"jewelery"`
- `"electronics"`

### 👩‍💻 Funcionalidad:
Un `switch` evalúa el `id` del clic y filtra el array `bolsa`:

```js
if (producto.category == categoria) { ... }
```

### ✅ Justificación UX:
- Categorizar productos reduce la carga cognitiva.
- Es una forma natural de exploración en tiendas online.
- Facilita la comparación entre productos similares.

---

## ⚡ Combinación y rendimiento

Todos los filtros trabajan sobre el mismo array (`bolsa`) y actualizan el DOM dinámicamente, ofreciendo una experiencia rápida, fluida y sin recargas.

---

## 📌 Conclusión

Los filtros y ordenamientos en **LoV** no solo cumplen una función técnica, sino que están pensados para ayudar al usuario a encontrar productos más fácilmente, mejorar la navegación, reducir frustraciones y generar una experiencia de compra más agradable.
