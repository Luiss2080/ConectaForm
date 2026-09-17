import { X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ isOpen, onClose, title, children }) {
  const contentRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const titleId = useId();

  // Close on Escape key, trap Tab focus inside the dialog while open.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !contentRef.current) return;

      const focusable = contentRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Move focus into the dialog on open, and restore it to whatever was
  // focused before opening once the dialog closes (standard dialog pattern).
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement;
      const focusable = contentRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      (focusable?.[0] ?? contentRef.current)?.focus();
    } else if (previouslyFocusedRef.current instanceof HTMLElement) {
      previouslyFocusedRef.current.focus();
      previouslyFocusedRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        <button className="icon-btn modal-close" onClick={onClose} aria-label="Cerrar modal">
          <X size={20} />
        </button>
        {title && <h2 id={titleId} className="title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</h2>}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
