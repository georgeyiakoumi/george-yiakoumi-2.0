import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toBe('text-red-500 bg-blue-500');
  });

  it('should handle conditional class names', () => {
    const result = cn('base-class', false && 'hidden', 'visible');
    expect(result).toBe('base-class visible');
  });

  it('should merge conflicting Tailwind classes correctly', () => {
    // tailwind-merge should keep the last conflicting class
    const result = cn('p-4', 'p-8');
    expect(result).toBe('p-8');
  });

  it('should handle undefined and null values', () => {
    const result = cn('base', undefined, null, 'end');
    expect(result).toBe('base end');
  });

  it('should work with arrays', () => {
    const result = cn(['text-sm', 'font-bold'], 'text-gray-500');
    expect(result).toBe('text-sm font-bold text-gray-500');
  });
});
