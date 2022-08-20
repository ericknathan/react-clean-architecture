import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '@/presentation/components';

describe('Input Component', () => {
  test('should begin with empty error', () => {
    const { getByTitle } = render(<Input name="field" />);
    const input = getByTitle('');
    expect(input).toBeTruthy();
  });
});
