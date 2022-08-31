import React from 'react';
import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';
import { LoadSurveyList } from '@/domain/usecases';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  
  loadAll(): Promise<LoadSurveyList.Result> {
    this.callsCount++;
    return null!;
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
  it('should present four empty items on start', () => {
    makeSut();

    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });

  it('should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
