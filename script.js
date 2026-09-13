const form = document.getElementById('form-contacto');
const mensajeOk = document.getElementById('mensaje-ok');

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function mostrarError(campo, texto) {
  document.getElementById(`error-${campo}`).textContent = texto;
  document.getElementById(campo).setAttribute('aria-invalid', String(Boolean(texto)));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  mensajeOk.hidden = true;

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  let valido = true;
  mostrarError('nombre', ''); mostrarError('email', ''); mostrarError('mensaje', '');

  if (!nombre) { mostrarError('nombre', 'El nombre es obligatorio'); valido = false; }
  if (!validarEmail(email)) { mostrarError('email', 'Ingresá un email válido'); valido = false; }
  if (mensaje.length < 10) { mostrarError('mensaje', 'Escribí al menos 10 caracteres'); valido = false; }

  if (!valido) return;

  // Acá conectás tu servicio de envío real (Formspree, EmailJS, tu propio backend...)
  // Este template solo valida y confirma en el cliente.
  mensajeOk.hidden = false;
  form.reset();
});
