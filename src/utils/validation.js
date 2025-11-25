import validator from 'validator';

/**
 * Valida un indirizzo email
 * @param {string} email - Email da validare
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email obbligatoria' };
  }

  if (!validator.isEmail(email)) {
    return { valid: false, error: 'Email non valida' };
  }

  // Lunghezza massima ragionevole
  if (email.length > 254) {
    return { valid: false, error: 'Email troppo lunga' };
  }

  return { valid: true, error: '' };
};

/**
 * Valida un nome (persona o azienda)
 * @param {string} name - Nome da validare
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'Nome obbligatorio' };
  }

  const trimmedName = name.trim();

  // Lunghezza minima
  if (trimmedName.length < 2) {
    return { valid: false, error: 'Nome troppo corto (minimo 2 caratteri)' };
  }

  // Lunghezza massima
  if (trimmedName.length > 100) {
    return { valid: false, error: 'Nome troppo lungo (massimo 100 caratteri)' };
  }

  // ✅ FIX: Rimosso backslash inutile davanti al punto
  // Caratteri permessi: lettere, spazi, apostrofi, trattini, punti
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'\-.\u0400-\u04FF]+$/;
  
  if (!nameRegex.test(trimmedName)) {
    return { valid: false, error: 'Nome contiene caratteri non validi' };
  }

  return { valid: true, error: '' };
};

/**
 * Valida un messaggio
 * @param {string} message - Messaggio da validare
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateMessage = (message) => {
  if (!message || message.trim() === '') {
    return { valid: false, error: 'Messaggio obbligatorio' };
  }

  const trimmedMessage = message.trim();

  // Lunghezza minima
  if (trimmedMessage.length < 10) {
    return { valid: false, error: 'Messaggio troppo corto (minimo 10 caratteri)' };
  }

  // Lunghezza massima
  if (trimmedMessage.length > 2000) {
    return { valid: false, error: 'Messaggio troppo lungo (massimo 2000 caratteri)' };
  }

  return { valid: true, error: '' };
};

/**
 * Valida un intero form di contatto
 * @param {object} formData - { name, email, message }
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validateContactForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Valida nome
  const nameValidation = validateName(formData.name);
  if (!nameValidation.valid) {
    errors.name = nameValidation.error;
    isValid = false;
  }

  // Valida email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.error;
    isValid = false;
  }

  // Valida messaggio
  const messageValidation = validateMessage(formData.message);
  if (!messageValidation.valid) {
    errors.message = messageValidation.error;
    isValid = false;
  }

  return {
    valid: isValid,
    errors
  };
};

/**
 * Sanitizza input utente per prevenire XSS
 * @param {string} input - Stringa da sanitizzare
 * @returns {string} - Stringa sanitizzata
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  // ✅ FIX: Rimossi backslash inutili davanti a ( ) .
  // Trim whitespace e escape HTML
  let sanitized = validator.trim(input);
  sanitized = validator.escape(sanitized);

  return sanitized;
};

/**
 * Valida un numero di telefono italiano (opzionale)
 * @param {string} phone - Numero di telefono
 * @returns {object} - { valid: boolean, error: string }
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    // Telefono opzionale
    return { valid: true, error: '' };
  }

  // Rimuovi spazi, trattini, parentesi
  const cleanPhone = phone.replace(/[\s\-()]/g, '');

  // Formato italiano: +39 seguito da 9-10 cifre, oppure 10 cifre senza prefisso
  const phoneRegex = /^(\+39)?[0-9]{9,10}$/;

  if (!phoneRegex.test(cleanPhone)) {
    return { valid: false, error: 'Numero di telefono non valido' };
  }

  return { valid: true, error: '' };
};