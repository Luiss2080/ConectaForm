import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="icon-btn modal-close" onClick={onClose} aria-label="Cerrar modal">
          <X size={20} />
        </button>
        {title && <h2 className="title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</h2>}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
