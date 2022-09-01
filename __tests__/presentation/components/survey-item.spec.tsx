import React from 'react';
import { expect } from '@jest/globals';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { render, screen } from '@testing-library/react';
import { mockSurveyModel } from '@/mocks/domain';
import { formatDate } from '@/helpers';
import { Survey } from '@/domain/models';

type SutTypes = {
  survey: Survey.Model;
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  render(<SurveyItem.Card survey={survey} />);
  return { survey };
};

describe('SurveyItem Component', () => {
  it('should render with correct values', () => {
    const { survey } = makeSut();

    const questionWrapperClass = screen.getByTestId('question-data').className;
    if(survey.didAnswer) expect(questionWrapperClass).toContain('answeredStatusSuccess');
    else expect(questionWrapperClass).not.toContain('answeredStatusSuccess');
    
    expect(screen.getByTestId('question').textContent).toEqual(survey.question);
    expect(screen.getByTestId('date').textContent).toEqual(`Em ${formatDate(survey.date)}`);
    expect(screen.getByTestId('answers').textContent).toEqual(survey.answers.map(({ answer }) => answer).join(''));
  });
});
