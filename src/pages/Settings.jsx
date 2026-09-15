import { Settings as SettingsIcon, Bell, Shield, PaintBucket } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="dashboard-container" style={{ width: '100%', maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <SettingsIcon size={28} color="var(--text-secondary)" />
        <h1 className="title" style={{ textAlign: 'left', margin: 0 }}>Configuración</h1>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
          <Bell size={20} /> Notificaciones
        </h3>
        <div className="toggle-wrapper" style={{ background: 'transparent', padding: '0', border: 'none', marginBottom: '2rem' }}>
          <div className="toggle-label" style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Recibir alertas por nuevos leads
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
          <Shield size={20} /> Seguridad
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Tu cuenta está protegida. La última sesión fue iniciada hoy.</p>
        <button className="btn-secondary">Cambiar Contraseña</button>
      </div>
    </div>
  );
}
