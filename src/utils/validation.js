export const validateEmail = (email) => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateForm = (formData) => {
  const errors = {};
  if (!formData.name?.trim()) errors.name = 'El nombre es obligatorio';
  if (!validateEmail(formData.email)) errors.email = 'Ingresa un email válido';
  if (!formData.message || formData.message.trim().length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres';
  if (!formData.terms) errors.terms = 'Debes aceptar los términos y condiciones';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
