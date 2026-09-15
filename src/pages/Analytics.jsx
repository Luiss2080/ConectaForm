import { useState, useEffect } from 'react';
import { api } from '../services/mockApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Activity } from 'lucide-react';

export default function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const leads = await api.getLeads();
      setData(leads);
      setLoading(false);
    }
    fetchData();
  }, []);

  const getStatusData = () => {
    const pending = data.filter(d => d.status === 'pending').length;
    const resolved = data.filter(d => d.status === 'resolved').length;
    return [
      { name: 'Pendientes', value: pending },
      { name: 'Resueltos', value: resolved }
    ];
  };

  const getTypeData = () => {
    const support = data.filter(d => d.type === 'support').length;
    const sales = data.filter(d => d.type === 'sales').length;
    const feedback = data.filter(d => d.type === 'feedback').length;
    return [
      { name: 'Soporte', count: support },
      { name: 'Ventas', count: sales },
      { name: 'Sugerencias', count: feedback }
    ];
  };

  const COLORS = ['#ef4444', '#10b981'];

  return (
    <div className="dashboard-container" style={{ width: '100%', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Activity size={28} color="var(--accent-color)" />
        <h1 className="title" style={{ textAlign: 'left', margin: 0 }}>Análisis de Rendimiento</h1>
      </div>
      
      {loading ? (
        <p>Cargando gráficos...</p>
      ) : (
        <div className="metrics-grid">
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Distribución por Tipo</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getTypeData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip cursor={{ fill: 'var(--surface-color)' }} contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--surface-border)', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Estado Global</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getStatusData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {getStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--surface-border)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
