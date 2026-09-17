export const MIN_MESSAGE_LENGTH = 10;
export const MAX_MESSAGE_LENGTH = 500;

export const validateEmail = (email) => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateForm = (formData) => {
  const errors = {};
  if (!formData.name?.trim()) errors.name = 'El nombre es obligatorio';
  if (!validateEmail(formData.email)) errors.email = 'Ingresa un email válido';

  const message = formData.message?.trim() ?? '';
  if (!message || message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres`;
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres`;
  }

  if (!formData.terms) errors.terms = 'Debes aceptar los términos y condiciones';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
