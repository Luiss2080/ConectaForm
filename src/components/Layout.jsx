import { useState, useEffect } from 'react';
import { Moon, Sun, Info, Menu, LayoutDashboard, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('dark');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="nav-brand">
          <Menu size={24} className="icon-btn" style={{ padding: 0 }} />
          <span>LeadGen Pro</span>
        </div>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Cambiar tema" title="Cambiar tema">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="icon-btn" onClick={() => setIsConfigOpen(true)} aria-label="Información" title="Información">
            <Info size={20} />
          </button>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <Modal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)}
        title="Información del Sistema"
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Este es un portal avanzado de soporte y generación de leads. Cuenta con un diseño glassmorphism responsivo, 
          modo oscuro/claro, validación estricta y elementos interactivos fluidos.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          Versión: 2.0.0 Pro<br/>
          Tecnología: React + Vite + Vanilla CSS
        </p>
      </Modal>
    </div>
  );
}
