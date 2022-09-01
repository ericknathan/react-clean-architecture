import React from 'react';
import { expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';
import { LoadSurveyList } from '@/domain/usecases';
import { mockSurveyListModel } from '@/mocks/domain';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();
  
  loadAll(): Promise<LoadSurveyList.Result> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);

  return { 
    loadSurveyListSpy
  };
};

describe('SurveyList Page', () => {
  it('should present four empty items on start', async () => {
    makeSut();

    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
    await waitFor(() => surveyList);
  });

  it('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });

  it('should render SurveyItems on success', async () => {
    const { loadSurveyListSpy } = makeSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() => surveyList);
    setTimeout(() =>
      expect(surveyList.querySelectorAll('li.questionWrapper:not(:empty)').length).toBe(loadSurveyListSpy.surveys.length)
    , 1000);
  });
});
