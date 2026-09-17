import { useState, useEffect } from 'react';
import { Moon, Sun, LayoutDashboard, BarChart3, Settings as SettingsIcon, LogOut, Menu, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Modal from '../components/Modal';

export default function AdminLayout({ children }) {
  const [theme, setTheme] = useState('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {isSidebarOpen && <span className="brand-name">ConectaForm</span>}
          <button className="icon-btn" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
        </div>
        
        <div className="sidebar-nav">
          <Link to="/admin/dashboard" className={`nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link to="/admin/analytics" className={`nav-item ${location.pathname === '/admin/analytics' ? 'active' : ''}`}>
            <BarChart3 size={20} />
            {isSidebarOpen && <span>Analytics</span>}
          </Link>
          <Link to="/admin/settings" className={`nav-item ${location.pathname === '/admin/settings' ? 'active' : ''}`}>
            <SettingsIcon size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </Link>
        </div>

        <div className="sidebar-footer">
          <Link to="/" className="nav-item">
            <LogOut size={20} />
            {isSidebarOpen && <span>Salir a Home</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              {location.pathname === '/admin/dashboard' ? 'Dashboard' : 
               location.pathname === '/admin/analytics' ? 'Analytics' : 'Configuración'}
            </h2>
          </div>
          <div className="topbar-actions">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Cambiar tema">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="icon-btn profile-btn" onClick={() => setIsProfileOpen(true)}>
              <UserCircle size={24} />
            </button>
          </div>
        </header>

        <main className="admin-content-area">
          {children}
        </main>
      </div>

      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} title="Perfil de Administrador">
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <UserCircle size={64} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
          <h3>Admin Principal</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>admin@conectaform.demo</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <span className="badge badge-resolved">Rol: Administrador</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
