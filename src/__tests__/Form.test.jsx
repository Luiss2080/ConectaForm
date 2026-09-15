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
});
