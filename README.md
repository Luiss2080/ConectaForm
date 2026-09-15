<div align="center">
  
  # 🚀 LeadGen Pro (Enterprise Edition)
  
  **Transformando contactos simples en experiencias extraordinarias.**
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Recharts](https://img.shields.io/badge/Recharts-22b3e8?style=for-the-badge&logo=react&logoColor=white)](https://recharts.org/)
  [![Vitest](https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
  
  <p align="center">
    Un sistema de HelpDesk y CRM ligero (SPA) desarrollado con arquitectura moderna, animaciones Glassmorphism, formularios tipo Wizard y dashboards de métricas en tiempo real.
  </p>
  
  ---
</div>

## ✨ Características Principales

### 🎯 Experiencia del Cliente (Portal Público)
* **Multi-step Wizard:** El formulario tradicional se dividió en 3 pasos interactivos con barras de progreso fluidas y validación por etapas.
* **Diseño Glassmorphism Premium:** Uso exhaustivo de efectos de cristal, sombras dinámicas y bordes brillantes.
* **Smart UI/UX:** Notificaciones emergentes (Toasts) nativas, micro-animaciones en botones (Ripple effect) y soporte total para **Dark/Light Mode**.
* **Iconografía Rica:** Botones dinámicos e inputs enriquecidos gracias a `lucide-react`.

### 🛡️ Portal de Administración (Admin Panel)
* **Arquitectura de Layouts:** Separación estricta entre la UI del cliente (`/`) y el portal interno (`/admin/*`).
* **Sidebar Dinámico:** Menú lateral expansible/colapsable para la navegación administrativa.
* **Dashboard DataGrid:** Tabla de datos interactiva para gestionar el estado de los leads simulados en `localStorage`.
* **Analytics en Tiempo Real:** Integración con **Recharts** para mostrar gráficos de barras y "donuts" sobre la distribución y estado de los tickets de soporte y ventas.
* **Panel de Configuración:** Modales de usuario y ajustes de seguridad interactivos.

## 🛠️ Stack Tecnológico
- **Core:** React 18
- **Bundler:** Vite (con compilación ultra rápida ~200kB minificado gzip)
- **Estilos:** Vanilla CSS Avanzado (Variables globales, CSS Grid, Flexbox, Keyframes)
- **Routing:** React Router v6
- **Gráficos:** Recharts
- **Testing:** Vitest + React Testing Library (Pruebas unitarias e integración de flujos Wizard)

---

## 🚦 Primeros Pasos (Quickstart)

> [!TIP]
> Sigue estas instrucciones para desplegar rápidamente el proyecto de manera local.

1. **Clonar el repositorio y entrar al directorio:**
   \`\`\`bash
   # Posiciónate en la carpeta del proyecto
   cd ruta/al/proyecto
   \`\`\`

2. **Instalar dependencias:**
   Asegúrate de tener Node.js instalado (v16+).
   \`\`\`bash
   npm install
   \`\`\`

3. **Arrancar el servidor de desarrollo:**
   \`\`\`bash
   npm run dev
   \`\`\`
   > 🌐 Visita `http://localhost:5173` en tu navegador. 

## 🏗️ Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el entorno de desarrollo con Hot Module Replacement (HMR). |
| `npm run build` | Compila y minifica el código para producción en la carpeta `/dist`. |
| `npm run preview` | Pre-visualiza localmente el build de producción. |
| `npm run test` | Ejecuta de manera rápida (con jsdom) la suite de pruebas unitarias y de integración del formulario Wizard. |

## 📁 Estructura del Proyecto

\`\`\`text
src/
├── assets/         # Recursos estáticos 
├── components/     # Componentes reutilizables (Layout, Toast, Modal)
├── layouts/        # Estructuras de vista principales (AdminLayout con Sidebar)
├── pages/          # Vistas rutables (Home, Dashboard, Analytics, Settings)
├── services/       # Lógica de datos (mockApi.js simula llamadas async)
├── utils/          # Utilidades (validaciones aisladas)
├── __tests__/      # Tests unitarios y de integración con Vitest
├── App.jsx         # Enrutador principal de React Router
└── index.css       # Sistema de diseño de variables y utilidades globales
\`\`\`

---

## 📖 Manual Adicional
Para entender a profundidad los flujos y cómo el administrador interactúa con la plataforma a nivel de usuario, consulta el [MANUAL DE USO](./MANUAL_DE_USO.md).

<div align="center">
  <br />
  <i>Desarrollado bajo principios y metodologías SDD de alta escalabilidad y calidad técnica.</i>
</div>
