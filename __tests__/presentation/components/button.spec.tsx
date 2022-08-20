import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '@/presentation/components';

const makeSut = () => render(<Button>example</Button>);

describe('Button Component', () => {
  test('should begin with empty className', () => {
    const { getByTestId } = makeSut();
    const button = getByTestId('button');
    expect(button.className).not.toContain('undefined');
  });
});
