import { useState } from 'react';
import { Send, AlertCircle, Loader2, User, Mail, MessageSquare, Briefcase, Heart, Headset, ChevronRight, ChevronLeft } from 'lucide-react';
import { api } from '../services/mockApi';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { validateForm } from '../utils/validation';

export default function Home() {
  const [step, setStep] = useState(1);
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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const nextStep = () => {
    // Validate current step
    let currentErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) currentErrors.name = 'El nombre es obligatorio';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) currentErrors.email = 'Ingresa un email válido';
    } else if (step === 2) {
      // Step 2 is just selecting type, handled by state mostly, but we ensure something is picked
      if (!formType) currentErrors.type = 'Selecciona un motivo';
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    
    setErrors({});
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await api.saveLead({ ...formData, type: formType });
      setToast({ message: '¡Consulta enviada con éxito!', type: 'success' });
      setFormData({ name: '', email: '', message: '', priority: 'low', newsletter: false, terms: false });
      setStep(1);
    } catch (err) {
      setToast({ message: 'Error al enviar la consulta. Intenta de nuevo.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <div className="glass-panel">
        <div className="header" style={{ marginBottom: '1rem' }}>
          <h1 className="title">Portal de Contacto</h1>
          <p className="subtitle">Nos pondremos en contacto contigo</p>
        </div>

        {/* Wizard Progress */}
        <div className="wizard-progress">
          <div className={`step-indicator ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`}>1</div>
          <div className={`step-indicator ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}`}>2</div>
          <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* STEP 1: Identidad */}
          {step === 1 && (
            <div className="wizard-step-content">
              <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>¿Quién eres?</h3>
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
                  <div className="error-message"><AlertCircle size={14} /><span>{errors.name}</span></div>
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
                  <div className="error-message"><AlertCircle size={14} /><span>{errors.email}</span></div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Motivo */}
          {step === 2 && (
            <div className="wizard-step-content">
              <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>¿Cuál es el motivo?</h3>
              <div className="type-selector" style={{ flexDirection: 'column' }}>
                <button 
                  type="button"
                  className={`type-btn ${formType === 'support' ? 'active' : ''}`}
                  onClick={() => setFormType('support')}
                  style={{ padding: '1rem', justifyContent: 'flex-start' }}
                >
                  <Headset size={20} style={{ color: 'var(--accent-color)' }} /> 
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600', fontSize: '1rem' }}>Soporte Técnico</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tengo un problema con el sistema</div>
                  </div>
                </button>
                <button 
                  type="button"
                  className={`type-btn ${formType === 'sales' ? 'active' : ''}`}
                  onClick={() => setFormType('sales')}
                  style={{ padding: '1rem', justifyContent: 'flex-start' }}
                >
                  <Briefcase size={20} style={{ color: '#10b981' }} /> 
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600', fontSize: '1rem' }}>Ventas</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quiero contratar un plan</div>
                  </div>
                </button>
                <button 
                  type="button"
                  className={`type-btn ${formType === 'feedback' ? 'active' : ''}`}
                  onClick={() => setFormType('feedback')}
                  style={{ padding: '1rem', justifyContent: 'flex-start' }}
                >
                  <Heart size={20} style={{ color: '#f59e0b' }} /> 
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600', fontSize: '1rem' }}>Sugerencias</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tengo una idea de mejora</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Mensaje y Confirmación */}
          {step === 3 && (
            <div className="wizard-step-content">
              <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Detalles</h3>
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
                  <div className="error-message"><AlertCircle size={14} /><span>{errors.message}</span></div>
                )}
              </div>

              <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Resumen:</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Enviando como <strong>{formData.name}</strong> ({formData.email}) al departamento de <strong>{formType}</strong>.
                </p>
              </div>

              <div className="toggle-wrapper">
                <div className="toggle-label"><Mail size={16} /> Suscribirme al Newsletter</div>
                <label className="switch">
                  <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
                  <span className="slider"></span>
                </label>
              </div>

              <label className="checkbox-wrapper">
                <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
                <div className="checkmark"></div>
                <span className="checkbox-text">
                  Acepto los <a href="#" onClick={(e) => { e.preventDefault(); setIsTermsModalOpen(true); }}>Términos y Condiciones</a>.
                </span>
              </label>
              {errors.terms && (
                <div className="error-message" style={{ marginTop: '-1rem', marginBottom: '1.5rem' }}><AlertCircle size={14} /><span>{errors.terms}</span></div>
              )}
            </div>
          )}

          <div className="wizard-actions">
            {step > 1 ? (
              <button type="button" className="btn-secondary" onClick={prevStep}>
                <ChevronLeft size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }} /> Atrás
              </button>
            ) : <div></div>}
            
            {step < 3 ? (
              <button type="button" className="submit-btn" style={{ width: 'auto' }} onClick={nextStep}>
                Siguiente <ChevronRight size={20} />
              </button>
            ) : (
              <button type="submit" className="submit-btn" style={{ width: 'auto', flex: 1, marginLeft: '1rem' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="spinner" size={20} /> Enviando...</>
                ) : (
                  <><Send size={20} /> Confirmar y Enviar</>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      <Modal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} title="Términos y Condiciones">
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxHeight: '300px', overflowY: 'auto' }}>
          <p style={{ marginBottom: '1rem' }}><strong>1. Aceptación</strong><br/>Al utilizar este formulario de contacto, aceptas que tus datos sean procesados.</p>
        </div>
        <button className="submit-btn" style={{ marginTop: '1.5rem' }} onClick={() => setIsTermsModalOpen(false)}>Entendido</button>
      </Modal>
    </div>
  );
}
