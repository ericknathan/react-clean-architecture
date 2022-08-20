import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '@/presentation/components';

describe('Button Component', () => {
  test('should begin with empty className', () => {
    const { getByTestId } = render(<Button>example</Button>);
    const button = getByTestId('button');
    expect(button.className).not.toContain('undefined');
  });
});
