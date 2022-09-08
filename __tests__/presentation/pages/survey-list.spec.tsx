import React from 'react';
import { expect } from '@jest/globals';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { SurveyList } from '@/presentation/pages';
import { LoadSurveyList } from '@/domain/usecases';
import { mockSurveyListModel } from '@/mocks/domain';
import { UnexpectedError } from '@/domain/errors';
import { ApiContext } from '@/presentation/contexts';

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

const history = createMemoryHistory({ initialEntries: ['/'] });
const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn() }}>
      <Router location={history.location} navigator={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  );

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
  
  it('should present error on LoadSurveyList failure', async () => {
    const error = new UnexpectedError();
    const { loadSurveyListSpy } = makeSut();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);
    await waitFor(() => screen.getByRole('heading'));
    setTimeout(() => {
      expect(screen.getByTestId('survey-list')).toBeFalsy();
      expect(screen.getByTestId('survey-list-error').textContent).toBe(error.message);
    }, 1000);
  });
  
  it('should call LoadSurveyList on reload', async () => {
    const { loadSurveyListSpy } = makeSut();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError());
    await waitFor(() => screen.getByRole('heading'));
    setTimeout(async () => {
      expect(screen.getByTestId('survey-list')).toBeFalsy();
      fireEvent.click(screen.getByTestId('survey-list-reload-button'));
      expect(loadSurveyListSpy.callsCount).toBe(1);
      await waitFor(() => screen.getByRole('heading'));
    }, 1000);
  });
});
