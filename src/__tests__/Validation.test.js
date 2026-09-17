import { describe, it, expect } from 'vitest';
import { validateEmail, validateForm, MIN_MESSAGE_LENGTH, MAX_MESSAGE_LENGTH } from '../utils/validation';

const baseValidData = () => ({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'This is a test message',
  terms: true
});

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    it('accepts unicode/accented local parts', () => {
      expect(validateEmail('josé@ejemplo.com')).toBe(true);
    });

    it('rejects incorrect email addresses', () => {
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('test@example')).toBe(false);
      expect(validateEmail('test.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });

    it('rejects emails with a space or a repeated @', () => {
      expect(validateEmail('test @example.com')).toBe(false);
      expect(validateEmail('test@@example.com')).toBe(false);
    });

    it('has a known limitation: does not reject consecutive dots in the domain', () => {
      // Documented gap, not a fix: the regex only checks for "something@something.something"
      // and does not validate domain structure beyond that.
      expect(validateEmail('test@example..com')).toBe(true);
    });

    it('rejects null/undefined email', () => {
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
    });
  });

  describe('validateForm - name', () => {
    it('rejects an empty name', () => {
      const result = validateForm({ ...baseValidData(), name: '' });
      expect(result.errors.name).toBeDefined();
    });

    it('rejects a whitespace-only name', () => {
      const result = validateForm({ ...baseValidData(), name: '   ' });
      expect(result.errors.name).toBeDefined();
    });

    it('accepts a unicode name', () => {
      const result = validateForm({ ...baseValidData(), name: 'José Ñáñez' });
      expect(result.errors.name).toBeUndefined();
    });
  });

  describe('validateForm - message length', () => {
    it('rejects a message shorter than the minimum', () => {
      const result = validateForm({ ...baseValidData(), message: 'short' });
      expect(result.errors.message).toBeDefined();
    });

    it('rejects an empty message', () => {
      const result = validateForm({ ...baseValidData(), message: '' });
      expect(result.errors.message).toBeDefined();
    });

    it('rejects a whitespace-only message even if long enough in raw length', () => {
      const result = validateForm({ ...baseValidData(), message: ' '.repeat(20) });
      expect(result.errors.message).toBeDefined();
    });

    it('accepts a message exactly at the minimum length', () => {
      const result = validateForm({ ...baseValidData(), message: 'a'.repeat(MIN_MESSAGE_LENGTH) });
      expect(result.errors.message).toBeUndefined();
    });

    it('accepts a message exactly at the maximum length', () => {
      const result = validateForm({ ...baseValidData(), message: 'a'.repeat(MAX_MESSAGE_LENGTH) });
      expect(result.errors.message).toBeUndefined();
    });

    it('rejects a message one character over the maximum length', () => {
      const result = validateForm({ ...baseValidData(), message: 'a'.repeat(MAX_MESSAGE_LENGTH + 1) });
      expect(result.errors.message).toBeDefined();
    });

    it('trims surrounding whitespace before measuring length', () => {
      const padded = `  ${'a'.repeat(MIN_MESSAGE_LENGTH)}  `;
      const result = validateForm({ ...baseValidData(), message: padded });
      expect(result.errors.message).toBeUndefined();
    });

    it('accepts unicode characters (e.g. emoji) in the message', () => {
      const result = validateForm({ ...baseValidData(), message: '¡Hola! 👋 Necesito ayuda con mi cuenta, por favor.' });
      expect(result.errors.message).toBeUndefined();
    });
  });

  describe('validateForm - terms', () => {
    it('rejects when terms are not accepted', () => {
      const result = validateForm({ ...baseValidData(), terms: false });
      expect(result.errors.terms).toBeDefined();
    });
  });

  it('validates a complete form data correctly', () => {
    const result = validateForm(baseValidData());
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('identifies missing fields in form data', () => {
    const invalidData = {
      name: '',
      email: 'invalid',
      message: 'short',
      terms: false
    };
    const result = validateForm(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
    expect(result.errors.terms).toBeDefined();
  });
});
