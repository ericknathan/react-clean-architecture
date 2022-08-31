import React from 'react';
import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';

describe('SurveyList Page', () => {
  it('should present four empty items on start', () => {
    render(<SurveyList />);
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});
