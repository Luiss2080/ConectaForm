import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, User, Mail, MessageSquare, Briefcase, Heart, Headset } from 'lucide-react';
import Layout from './components/Layout';
import Modal from './components/Modal';

export default function App() {
  const [formType, setFormType] = useState('support');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    priority: 'low',
    newsletter: false,
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
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
    if (!formData.terms) newErrors.terms = 'Debes aceptar los términos y condiciones';
    
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
    setFormData({ name: '', email: '', message: '', priority: 'low', newsletter: false, terms: false });
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="app-container">
          <div className="glass-panel">
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle2 size={64} />
              </div>
              <h2 className="success-title">¡Mensaje Enviado!</h2>
              <p className="success-text">Hemos recibido tu consulta. Nos pondremos en contacto contigo pronto.</p>
              <button 
                className="submit-btn" 
                onClick={() => setIsSuccess(false)}
              >
                Enviar otro mensaje
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
              <Headset size={16} /> Soporte
            </button>
            <button 
              type="button"
              className={`type-btn ${formType === 'sales' ? 'active' : ''}`}
              onClick={() => setFormType('sales')}
            >
              <Briefcase size={16} /> Ventas
            </button>
            <button 
              type="button"
              className={`type-btn ${formType === 'feedback' ? 'active' : ''}`}
              onClick={() => setFormType('feedback')}
            >
              <Heart size={16} /> Sugerencias
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nombre Completo</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? 'error' : ''}`}
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  placeholder="juan@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
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
                  style={{ paddingLeft: '1rem' }}
                >
                  <option value="low">Baja - Consulta general</option>
                  <option value="medium">Media - Problema parcial</option>
                  <option value="high">Alta - Sistema caído</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message" className="form-label">Mensaje</label>
              <div className="input-wrapper" style={{ alignItems: 'flex-start' }}>
                <MessageSquare className="input-icon" size={18} style={{ top: '12px' }} />
                <textarea
                  id="message"
                  name="message"
                  className={`form-control ${errors.message ? 'error' : ''}`}
                  placeholder="Describe tu consulta aquí..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{ paddingLeft: '3rem' }}
                />
              </div>
              {errors.message && (
                <div className="error-message">
                  <AlertCircle size={14} />
                  <span>{errors.message}</span>
                </div>
              )}
            </div>

            {/* Newsletter Toggle */}
            <div className="toggle-wrapper">
              <div className="toggle-label">
                <Mail size={16} /> Suscribirme al Newsletter
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Terms Checkbox */}
            <label className="checkbox-wrapper">
              <input 
                type="checkbox" 
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <div className="checkmark"></div>
              <span className="checkbox-text">
                Acepto los <a href="#" onClick={(e) => { e.preventDefault(); setIsTermsModalOpen(true); }}>Términos y Condiciones</a> y la Política de Privacidad.
              </span>
            </label>
            {errors.terms && (
              <div className="error-message" style={{ marginTop: '-1rem', marginBottom: '1.5rem' }}>
                <AlertCircle size={14} />
                <span>{errors.terms}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="spinner" size={20} />
                  Procesando...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Enviar Consulta
                </>
              )}
            </button>
          </form>
        </div>

        <Modal 
          isOpen={isTermsModalOpen} 
          onClose={() => setIsTermsModalOpen(false)}
          title="Términos y Condiciones"
        >
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>1. Aceptación de los términos</strong><br/>
              Al utilizar este formulario de contacto, aceptas que tus datos sean procesados con el fin de resolver tu consulta.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>2. Uso de la información</strong><br/>
              Tus datos no serán compartidos con terceros sin tu consentimiento expreso. Si optaste por el newsletter, recibirás correos promocionales ocasionales.
            </p>
            <p>
              <strong>3. Derechos del usuario</strong><br/>
              Puedes solicitar la eliminación de tus datos en cualquier momento respondiendo a cualquiera de nuestros correos.
            </p>
          </div>
          <button 
            className="submit-btn" 
            style={{ marginTop: '1.5rem' }}
            onClick={() => setIsTermsModalOpen(false)}
          >
            Entendido
          </button>
        </Modal>
      </div>
    </Layout>
  );
}
