import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/Home';

vi.mock('../services/mockApi', () => ({
  api: {
    saveLead: vi.fn().mockResolvedValue(true)
  }
}));

describe('Home Wizard Component', () => {
  it('renders the first step correctly', () => {
    render(<Home />);
    
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeDefined();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeDefined();
  });

  it('shows validation errors when trying to proceed from step 1 empty', async () => {
    render(<Home />);
    
    const nextButton = screen.getByRole('button', { name: /Siguiente/i });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeDefined();
      expect(screen.getByText('Ingresa un email válido')).toBeDefined();
    });
  });

  it('can navigate through steps if filled correctly', async () => {
    render(<Home />);

    const nameInput = screen.getByLabelText(/Nombre Completo/i);
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });

    const nextButton = screen.getByRole('button', { name: /Siguiente/i });
    fireEvent.click(nextButton);

    // Step 2 should now be visible (¿Cuál es el motivo?)
    await waitFor(() => {
      expect(screen.getByText('¿Cuál es el motivo?')).toBeDefined();
    });
  });

  it('blocks advancing past step 1 with an invalid email, even if a name is present', async () => {
    render(<Home />);

    const nameInput = screen.getByLabelText(/Nombre Completo/i);
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });

    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));

    await waitFor(() => {
      expect(screen.getByText('Ingresa un email válido')).toBeDefined();
    });
    // Still on step 1: the step-2 heading must not be present.
    expect(screen.queryByText('¿Cuál es el motivo?')).toBeNull();
  });

  it('allows navigating back from step 2 to step 1 with the "Atrás" button', async () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'jane@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));

    await waitFor(() => {
      expect(screen.getByText('¿Cuál es el motivo?')).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /Atrás/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Nombre Completo/i)).toBeDefined();
    });
    // The data entered on step 1 should be preserved.
    expect(screen.getByLabelText(/Nombre Completo/i).value).toBe('Jane Doe');
  });

  it('blocks final submission when step 3 fields (message/terms) are invalid, without calling the API', async () => {
    const { api } = await import('../services/mockApi');
    render(<Home />);

    // Step 1
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'jane@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));

    // Step 2 (default reason is already selected)
    await waitFor(() => screen.getByText('¿Cuál es el motivo?'));
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));

    // Step 3: leave message empty and terms unchecked, then try to submit.
    await waitFor(() => screen.getByLabelText(/Mensaje/i));
    fireEvent.click(screen.getByRole('button', { name: /Confirmar y Enviar/i }));

    await waitFor(() => {
      expect(screen.getByText('El mensaje debe tener al menos 10 caracteres')).toBeDefined();
      expect(screen.getByText('Debes aceptar los términos y condiciones')).toBeDefined();
    });
    expect(api.saveLead).not.toHaveBeenCalled();
  });
});
