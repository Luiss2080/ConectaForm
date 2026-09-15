import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [formType, setFormType] = useState('support');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    priority: 'low'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!validateEmail(formData.email)) newErrors.email = 'Ingresa un email válido';
    if (formData.message.trim().length < 10) newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '', priority: 'low' });
  };

  if (isSuccess) {
    return (
      <div className="app-container">
        <div className="glass-panel">
          <div className="success-message">
            <div className="success-icon">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="success-title">¡Mensaje Enviado!</h2>
            <p className="success-text">Hemos recibido tu consulta de {formType === 'sales' ? 'ventas' : formType === 'support' ? 'soporte técnico' : 'sugerencias'}. Nos pondremos en contacto contigo pronto.</p>
            <button 
              className="submit-btn" 
              onClick={() => setIsSuccess(false)}
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="glass-panel">
        <div className="header">
          <h1 className="title">Portal de Contacto</h1>
          <p className="subtitle">¿En qué podemos ayudarte hoy?</p>
        </div>

        <div className="type-selector">
          <button 
            type="button"
            className={`type-btn ${formType === 'support' ? 'active' : ''}`}
            onClick={() => setFormType('support')}
          >
            Soporte
          </button>
          <button 
            type="button"
            className={`type-btn ${formType === 'sales' ? 'active' : ''}`}
            onClick={() => setFormType('sales')}
          >
            Ventas
          </button>
          <button 
            type="button"
            className={`type-btn ${formType === 'feedback' ? 'active' : ''}`}
            onClick={() => setFormType('feedback')}
          >
            Sugerencias
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? 'error' : ''}`}
              placeholder="Juan Pérez"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="error-message">
                <AlertCircle size={14} />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="juan@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="error-message">
                <AlertCircle size={14} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {formType === 'support' && (
            <div className="form-group">
              <label htmlFor="priority" className="form-label">Prioridad del Problema</label>
              <select 
                id="priority"
                name="priority" 
                className="form-control"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Baja - Consulta general</option>
                <option value="medium">Media - Problema parcial</option>
                <option value="high">Alta - Sistema caído</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="message" className="form-label">Mensaje</label>
            <textarea
              id="message"
              name="message"
              className={`form-control ${errors.message ? 'error' : ''}`}
              placeholder="Describe tu consulta aquí..."
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <div className="error-message">
                <AlertCircle size={14} />
                <span>{errors.message}</span>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="spinner" size={20} />
                Enviando...
              </>
            ) : (
              <>
                <Send size={20} />
                Enviar Mensaje
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
