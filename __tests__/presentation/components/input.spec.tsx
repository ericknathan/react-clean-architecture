import { expect } from '@jest/globals';
import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '@/presentation/components';

const makeSut = () => render(<Input name="field" />);

describe('Input Component', () => {
  it('should begin with empty error', () => {
    const { getByTitle } = makeSut();
    const input = getByTitle('');
    expect(input).toBeTruthy();
  });
});
