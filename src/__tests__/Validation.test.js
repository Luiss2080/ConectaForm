import { describe, it, expect } from 'vitest';
import { validateEmail, validateForm } from '../utils/validation';

describe('Validation Utils', () => {
  it('validates correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
  });

  it('rejects incorrect email addresses', () => {
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('test@example')).toBe(false);
    expect(validateEmail('test.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });

  it('validates a complete form data correctly', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message',
      terms: true
    };
    const result = validateForm(validData);
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
