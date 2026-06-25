# MegaStore - E-Commerce React

Proyecto final de la materia. Es una tienda online hecha con React que permite navegar productos, agregarlos al carrito, buscar, filtrar por categoría, simular login/registro y ver el perfil de usuario.

## Stack utilizado

- React 18
- Vite
- React Router DOM v6
- Material UI
- Context API
- Custom Hooks
- Fetch API nativa

## API

Se utiliza la [Platzi Fake Store API](https://fakeapi.platzi.com/) para obtener productos y categorías.

## Cómo correr el proyecto

1. Clonar el repositorio
2. Instalar las dependencias:

```bash
npm install
```

3. Levantar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador la URL que muestra la consola (por defecto `http://localhost:5173`)

## Páginas y rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Productos destacados aleatorios |
| `/productos` | Productos | Listado completo con buscador y filtro por categoría |
| `/producto/:id` | Detalle de producto | Información completa de un producto |
| `/login` | Login | Inicio de sesión simulado |
| `/registro` | Registro | Registro de usuario simulado |
| `/carrito` | Carrito | Productos agregados, total y finalizar compra |
| `/perfil` | Perfil | Datos del usuario logueado |
| `/contacto` | Contacto | Formulario de contacto |
| `*` | 404 | Página no encontrada |

## Estructura de carpetas
src/
components/   -> Header y Footer
pages/        -> Una pagina por ruta
contexts/     -> CartContext y UserContext
hooks/        -> useProducts y useCategories
services/     -> Llamadas a la API y traductor de titulos
routes/       -> Configuracion de React Router
theme/        -> Tema personalizado de Material UI
assets/       -> Imagenes

## Funcionalidades principales
- **Carrito de compras**: agregar, eliminar, vaciar y calcular total (CartContext)
- **Usuario simulado**: login y registro sin backend real, persistencia con localStorage (UserContext)
- **Búsqueda y filtros**: por nombre de producto y por categoría
- **Paginado**: en el listado de productos
- **Manejo de errores**: estados de loading y error en las llamadas a la API