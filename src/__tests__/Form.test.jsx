import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/Home';

// Mock the API service
vi.mock('../services/mockApi', () => ({
  api: {
    saveLead: vi.fn().mockResolvedValue(true)
  }
}));

describe('Home Form Component', () => {
  it('renders the form fields correctly', () => {
    render(<Home />);
    
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeDefined();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeDefined();
    expect(screen.getByLabelText(/Mensaje/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Enviar Consulta/i })).toBeDefined();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<Home />);
    
    const submitButton = screen.getByRole('button', { name: /Enviar Consulta/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeDefined();
      expect(screen.getByText('Ingresa un email válido')).toBeDefined();
      expect(screen.getByText('El mensaje debe tener al menos 10 caracteres')).toBeDefined();
      expect(screen.getByText('Debes aceptar los términos y condiciones')).toBeDefined();
    });
  });

  it('updates form fields on change', () => {
    render(<Home />);
    
    const nameInput = screen.getByLabelText(/Nombre Completo/i);
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    
    expect(nameInput.value).toBe('Jane Doe');
  });
});
