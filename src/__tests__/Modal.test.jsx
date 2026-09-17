import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

function TestHarness({ initialOpen = false }) {
  // A minimal harness with a trigger button so we can assert focus
  // restoration back to the element that opened the modal.
  const [open, setOpen] = useState(initialOpen);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Abrir</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Título de prueba">
        <button>Acción interna</button>
      </Modal>
    </div>
  );
}

describe('Modal accessibility', () => {
  it('is not rendered when closed', () => {
    render(<Modal isOpen={false} onClose={() => {}} title="Oculto">contenido</Modal>);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('exposes dialog semantics and labels itself with the title', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Términos y Condiciones">contenido</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy)?.textContent).toBe('Términos y Condiciones');
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose} title="Test">contenido</Modal>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the overlay but not when clicking the content', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <button>Interno</button>
      </Modal>
    );
    fireEvent.click(screen.getByText('Interno'));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog').parentElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('moves focus into the dialog on open and restores it to the trigger on close', () => {
    render(<TestHarness />);

    const trigger = screen.getByRole('button', { name: 'Abrir' });
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    // First focusable element inside the dialog is the close button.
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Cerrar modal');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.activeElement).toBe(trigger);
  });
});
