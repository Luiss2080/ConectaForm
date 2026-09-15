# Manual de Uso - LeadGen Portal Pro

Bienvenido al manual de uso del portal de generación de leads y contacto. Este documento explica cómo interactuar con el sistema tanto desde la perspectiva del usuario final como para futuros administradores.

## 1. Para Usuarios Finales

El portal está diseñado para ser altamente intuitivo:

- **Modo Oscuro/Claro:** En la esquina superior derecha, encontrarás un icono de Sol/Luna. Haz clic para cambiar el tema visual de la aplicación según tu preferencia. El sistema recordará esto mientras la sesión esté activa (expandible con `localStorage`).
- **Tipos de Consulta:** Selecciona rápidamente si necesitas ayuda técnica (Soporte), si deseas contratar (Ventas), o dejar un comentario (Sugerencias). Los iconos (Auriculares, Maletín, Corazón) te guiarán.
- **Campos Dinámicos:** Si seleccionas "Soporte", aparecerá automáticamente un selector de "Prioridad". Esto ayuda a nuestro equipo técnico a clasificar la urgencia de tu petición.
- **Micro-interacciones:** Notarás que al hacer clic en los campos de texto, el borde brilla y el icono cambia de color para indicar que está activo (focus).
- **Toggle de Newsletter:** Hemos incluido un interruptor (switch) animado tipo iOS para que te suscribas cómodamente a nuestro boletín.
- **Términos y Condiciones:** Para poder enviar el formulario, debes marcar la casilla. Puedes hacer clic en el enlace azul de "Términos y Condiciones" para abrir una ventana flotante (Modal) y leerlos sin perder los datos que ya has rellenado.
- **Envío:** Al pulsar "Enviar", el botón mostrará un círculo de carga (spinner). Evita hacer doble clic. Una vez terminado, verás una pantalla de confirmación animada.

## 2. Para Desarrolladores / Administradores

La arquitectura de la aplicación está dividida en componentes reutilizables (React + Vite):

### Componente Modal (`src/components/Modal.jsx`)
Puedes usar este componente en cualquier parte de la aplicación para mostrar información. Soporta:
- Cierre al hacer clic fuera del contenido (en el overlay).
- Cierre usando la tecla `Escape`.

### Componente Layout (`src/components/Layout.jsx`)
Gestiona la envoltura (wrapper) de la aplicación, proporcionando la barra de navegación (Navbar) y el control de temas (Light/Dark mode) a través del atributo `data-theme` en el `<html>` (inyectado vía useEffect).

### Extender las opciones de contacto
Para añadir nuevas categorías, ve a `src/App.jsx`, añade un nuevo botón en la sección `.type-selector` y asegúrate de actualizar la validación en `validateForm()` si el nuevo tipo requiere campos específicos adicionales.
