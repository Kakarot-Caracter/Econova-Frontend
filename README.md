<div align="center">
  <br />
  <h1>Econova Frontend</h1>
  <p>
    Frontend profesional para una tienda de comercio electrónico de productos ecológicos, construido con Next.js, TypeScript y Tailwind CSS.
  </p>
</div>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js"/>
  <img alt="React" src="https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css"/>
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-5.x-orange?style=for-the-badge"/>
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query"/>
</p>

---

## ✨ Características

- **Autenticación Completa**: Flujo de registro e inicio de sesión para usuarios.
- **Rutas Protegidas**: Uso de hooks y lógica en cliente para proteger las páginas que requieren autenticación (perfil, dashboard).
- **Dashboard de Administración**: Gestión completa (CRUD) para Productos, Usuarios y Órdenes.
- **Perfil de Usuario**: Secciones para ver y gestionar datos de perfil, direcciones, pedidos y productos favoritos.
- **Carrito de Compras**: Estado global del carrito de compras manejado con Zustand.
- **Fetching de Datos Moderno**: Uso de TanStack Query (React Query) para un fetching, cacheo y sincronización de datos eficiente con el backend.
- **UI Moderna y Responsiva**: Componentes reutilizables construidos con Shadcn UI y estilizados con Tailwind CSS.
- **Formularios Validados**: Manejo de formularios robusto con validaciones gracias a `react-hook-form` y `zod`.

---

## 🛠️ Stack de Tecnologías

- **Framework**: [Next.js](https://nextjs.org/)
- **Librería UI**: [React](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos CSS**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Shadcn UI](https://ui.shadcn.com/)
- **Manejo de Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Fetching de Datos**: [TanStack Query](https://tanstack.com/query/latest)
- **Manejo de Formularios**: [React Hook Form](https://react-hook-form.com/)
- **Validación de Esquemas**: [Zod](https://zod.dev/)
- **Linting y Formateo**: [Biome](https://biomejs.dev/)

---

## 🚀 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto funcionando localmente.

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v20+ recomendado)
- [npm](https://www.npmjs.com/) o un gestor de paquetes compatible

### 1. Clona el Repositorio

```bash
git clone https://github.com/tu-usuario/econova-frontend-refactor.git
cd econova-frontend-refactor
```

### 2. Configura las Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade las URLs necesarias para conectar con tu API backend. Puedes usar el siguiente template:

```env
# Ejemplo de URL del backend
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 3. Instala las Dependencias

```bash
npm install
```

### 4. ¡Inicia la Aplicación!

```bash
# Inicia el servidor en modo de desarrollo
npm run dev
```

¡Listo! La aplicación estará disponible en `http://localhost:3000`.

---

## 📂 Estructura del Proyecto

El proyecto sigue la convención del `App Router` de Next.js, organizando el código de manera modular y escalable.

```
/app
├── (rutas)/            # Directorios para las rutas principales (productos, perfil, etc.)
├── components/         # Componentes globales de la aplicación (Navbar, Footer, etc.)
├── dashboard/          # Ruta y componentes exclusivos para el panel de administración
├── hooks/              # Hooks personalizados para fetching de datos con TanStack Query
├── stores/             # Stores de Zustand para manejo de estado (auth, cart, etc.)
├── shared/             # Lógica compartida (interfaces, helpers, etc.)
├── layout.tsx          # Layout principal de la aplicación
└── page.tsx            # Página de inicio (landing page)

/components/ui/         # Componentes de UI de Shadcn (Button, Card, Input, etc.)

/lib/                   # Funciones de utilidad generales (ej. cn para clases)
```

---

## ⚙️ Scripts Útiles

| Script            | Descripción                                        |
| :---------------- | :------------------------------------------------- |
| `npm run dev`     | Inicia la app en modo desarrollo.                  |
| `npm run build`   | Compila el proyecto para producción.               |
| `npm run start`   | Inicia la app en modo producción (requiere `build`). |
| `npm run lint`    | Analiza el código con Biome en busca de errores.   |
| `npm run format`  | Formatea todo el código del proyecto con Biome.    |

---

## 📄 Licencia

Este proyecto es de código privado y no tiene una licencia de código abierto.

UNLICENSED