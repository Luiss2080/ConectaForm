import { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { Users, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await api.getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    await api.updateLeadStatus(id, status);
    fetchLeads();
  };

  const pendingCount = leads.filter(l => l.status === 'pending').length;
  const resolvedCount = leads.filter(l => l.status === 'resolved').length;

  return (
    <div className="dashboard-container" style={{ width: '100%', maxWidth: '900px' }}>
      <h1 className="title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Dashboard de Leads</h1>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon"><Users size={24} /></div>
          <div className="metric-content">
            <p>Total Leads</p>
            <h3>{leads.length}</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{ color: 'var(--error-color)' }}><AlertTriangle size={24} /></div>
          <div className="metric-content">
            <p>Pendientes</p>
            <h3>{pendingCount}</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{ color: 'var(--success-color)' }}><CheckCircle2 size={24} /></div>
          <div className="metric-content">
            <p>Resueltos</p>
            <h3>{resolvedCount}</h3>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Últimas Consultas</h2>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando datos...</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Mensaje</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id}>
                    <td>
                      <div><strong>{lead.name}</strong></div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lead.email}</div>
                    </td>
                    <td><span className={`badge badge-${lead.type}`}>{lead.type}</span></td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lead.message}
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{new Date(lead.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge badge-${lead.status}`}>{lead.status === 'pending' ? 'Pendiente' : 'Resuelto'}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {lead.status === 'pending' && (
                          <button className="icon-btn" onClick={() => handleStatus(lead.id, 'resolved')} title="Marcar Resuelto" style={{ color: 'var(--success-color)' }}>
                            <CheckCircle2 size={18} />
                          </button>
                        )}
                        <button className="icon-btn" onClick={() => handleStatus(lead.id, 'deleted')} title="Eliminar" style={{ color: 'var(--error-color)' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leads.length === 0 && <p style={{ textAlign: 'center', padding: '1rem' }}>No hay leads registrados.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
