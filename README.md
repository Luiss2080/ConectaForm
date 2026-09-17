<div align="center">

# 📬 ConectaForm

**Un formulario de contacto tipo wizard, con un panel de administración de demostración para revisar lo que llega.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

</div>

ConectaForm es una SPA de React que resuelve un caso concreto: capturar un
mensaje de contacto en 3 pasos con validación real, y darle a quien
administra el sitio un lugar donde ver esos mensajes sin tener que montar un
backend. **No es una plantilla vanilla JS/HTML/CSS para copiar y pegar en
una landing existente** — es una aplicación completa de React + Vite con
enrutamiento propio (`react-router-dom`), pensada para usarse tal cual o
como base para conectar un backend real.

## ✨ Características

### Formulario público (`/`)
- **Wizard de 3 pasos** (identidad → motivo de contacto → mensaje y
  confirmación) con barra de progreso. El paso 1 bloquea avanzar si el
  nombre está vacío o el email no tiene formato válido; el paso final
  vuelve a validar todo (incluyendo el checkbox de Términos y Condiciones)
  antes de permitir el envío — no es posible enviar el formulario saltando
  la validación.
- **Validación en cliente** (`src/utils/validation.js`): nombre obligatorio,
  email con formato válido, mensaje con un mínimo de 10 caracteres. Los
  errores se muestran junto a cada campo, no en un cartel genérico.
- **Modal reutilizable** (`src/components/Modal.jsx`) para los Términos y
  Condiciones y la información del sistema, con cierre al hacer clic fuera
  o con la tecla Escape.
- **Notificaciones toast** de éxito/error que se cierran solas tras el envío.
- **Modo oscuro/claro** con un botón de alternancia (nota: es estado de
  React, no se guarda en `localStorage`, así que vuelve a modo oscuro al
  recargar la página o al pasar del sitio público al panel de admin).

### Panel de administración de demostración (`/admin/*`)
- **Dashboard**: tabla de las consultas recibidas (nombre, tipo, mensaje,
  fecha, estado), con acciones para marcarlas como resueltas o eliminarlas.
- **Analytics**: un gráfico de barras (consultas por tipo) y un gráfico de
  dona (pendientes vs. resueltas) hechos con `recharts`.
- **Settings**: un panel de ejemplo con un switch de notificaciones (no
  persiste ni tiene efecto real, es solo de interfaz).
- **Importante — es una demo, no un backend real:** `/admin/*` no tiene
  ninguna autenticación; cualquiera que abra la URL puede verlo. Todos los
  datos se generan y se guardan en el `localStorage` del propio navegador
  vía `src/services/mockApi.js` (con un `setTimeout` simulando latencia de
  red), así que no hay persistencia real ni se comparte entre navegadores o
  dispositivos.

## 🚀 Cómo usar

1. Un visitante completa el wizard de contacto en `/` y lo envía.
2. El mensaje queda guardado en el `localStorage` del navegador (simulando
   una llamada a una API).
3. Quien administra puede entrar a `/admin/dashboard` en ese mismo
   navegador para ver el mensaje, marcarlo como resuelto o eliminarlo, y
   revisar las métricas agregadas en `/admin/analytics`.

## 🛠️ Instalación y uso local

Requiere Node.js (probado con Node 22 y 24).

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (Vite, con HMR) → http://localhost:5173
npm run dev

# Ejecutar la suite de pruebas (Vitest)
npm test

# Build de producción → carpeta /dist
npm run build

# Previsualizar el build de producción localmente
npm run preview

# Linter (oxlint)
npm run lint
```

## 🧱 Tecnologías

- **Core:** React 19, React Router 7
- **Bundler:** Vite 8
- **Estilos:** CSS plano (variables globales, Flexbox/Grid, glassmorphism
  con `backdrop-filter`), sin framework de estilos
- **Gráficos:** Recharts
- **Iconos:** lucide-react
- **Testing:** Vitest + React Testing Library + jsdom
- **Linting:** oxlint

## ✅ Tests

```bash
npm test
```

Cubre la lógica de validación pura (`src/utils/validation.js`) y el flujo
del wizard de contacto (`src/pages/Home.jsx`): renderizado del paso 1,
bloqueo de avance con campos inválidos, y navegación entre pasos con datos
válidos.

## 📁 Estructura del proyecto

```text
src/
├── assets/         # Recursos estáticos
├── components/     # Componentes reutilizables (Layout, Toast, Modal)
├── layouts/        # AdminLayout (sidebar + topbar del panel de admin)
├── pages/          # Vistas rutables (Home, Dashboard, Analytics, Settings)
├── services/       # mockApi.js: simula un backend con localStorage
├── utils/          # validation.js: validaciones puras y testeables
├── __tests__/      # Tests con Vitest
├── App.jsx         # Rutas (React Router): "/" pública, "/admin/*" interna
└── index.css       # Variables de diseño y estilos globales
```

## 📖 Manual adicional

Para el detalle de cómo interactúa cada rol (usuario final y
administrador) con la interfaz, consulta el
[Manual de Uso](./MANUAL_DE_USO.md).

## 📄 Licencia

Este repositorio no incluye un archivo `LICENSE`. Si vas a reutilizarlo o
distribuirlo, agrega uno o confirma los términos con quien lo mantiene.
