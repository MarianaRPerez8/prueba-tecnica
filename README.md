# AdminStore — Panel Administrativo de E-commerce

Panel de control para la gestión del catálogo de productos de una tienda en línea. Permite a los administradores realizar operaciones CRUD completas sobre el inventario.

## 🚀 Funcionalidades

- **Autenticación simulada** con LocalStorage (cualquier usuario/PIN)
- **Protección de rutas** — el panel no es accesible sin sesión activa
- **Inventario en grid** con tarjetas de producto
- **Búsqueda y filtro** por nombre, categoría o ambos en tiempo real
- **Crear producto** con validación de formulario
- **Editar producto** — actualiza todos los campos
- **Eliminar producto** con confirmación vía SweetAlert2
- **Estados de carga** con spinners en peticiones asíncronas
- **Diseño responsivo** — funciona en móvil, tablet y escritorio

## 🛠 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| react-router-dom v6 | Enrutamiento SPA |
| Tailwind CSS v3 | Estilos utilitarios |
| SweetAlert2 | Alertas de confirmación y éxito |
| MockAPI.io | API REST simulada |
| LocalStorage | Persistencia de sesión |

## 🌐 API

**Base URL:** `6a162f391b90031f81b0c0db.mockapi.io/productos`

**Entidad Producto:**
```json
{
  "id": "1",
  "nombre": "Camiseta básica",
  "precio": 35000,
  "categoria": "Ropa",
  "stock": 15,
  "imagen": "https://picsum.photos/seed/1/400/300"
}
```



```
src/
├── components/
│   ├── ProductCard.jsx     # Tarjeta individual de producto
│   ├── ProductForm.jsx     # Formulario reutilizable (crear/editar)
│   ├── ProtectedRoute.jsx  # HOC para protección de rutas
│   └── Spinner.jsx         # Indicador de carga
├── layouts/
│   └── DashboardLayout.jsx # Layout con navbar para el panel
├── pages/
│   ├── LoginPage.jsx       # Página de autenticación
│   ├── ProductsPage.jsx    # Inventario con búsqueda y filtros
│   ├── AddProductPage.jsx  # Crear nuevo producto
│   └── EditProductPage.jsx # Editar producto existente
├── services/
│   ├── authService.js      # Lógica de autenticación (LocalStorage)
│   └── productService.js   # Peticiones HTTP a la API
├── App.jsx                 # Rutas principales
└── main.jsx                # Punto de entrada
```

## ⚡ Instalación y uso

```bash

git clone https://github.com/MarianaRPerez8/prueba-tecnica
cd prueba-tecnica


npm install


npm run dev
```

Luego abrimos [http://localhost:5173](http://localhost:5173) en el navegador

> **Acceso:** 

## 🌍 Demo en producción

🔗 [Ver aplicación desplegada](https://prueba-tecnica-giig5v3yb-mariana13.vercel.app/login)

## 🔀 Flujo de Git

```
main          ← solo código listo para producción
└── develop   ← rama de integración
    ├── feature/auth-system
    ├── feature/product-crud
    ├── feature/product-card
    ├── feature/search-filter
    └── feature/api-integration
```
