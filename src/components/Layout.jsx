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
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Menu size={24} className="icon-btn" style={{ padding: 0 }} />
            <span>ConectaForm</span>
          </Link>
          <div style={{ marginLeft: '1rem', display: 'flex', gap: '0.5rem' }}>
            <Link to="/" className="icon-btn" title="Formulario"><Home size={20} /></Link>
            <Link to="/dashboard" className="icon-btn" title="Dashboard"><LayoutDashboard size={20} /></Link>
          </div>
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
          ConectaForm es un formulario de contacto tipo wizard (3 pasos) con un panel de
          administración de demostración para revisar las consultas recibidas. Incluye
          modo oscuro/claro, validación en cliente y un diseño glassmorphism responsivo.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          Tecnología: React + Vite + CSS
        </p>
      </Modal>
    </div>
  );
}
