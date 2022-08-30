import { Footer, Header } from '@/presentation/components';
import React from 'react';
import styles from './survey-list.module.scss';

export function SurveyList() {
  return (
    <div className={styles.surveyListWrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul className={styles.surveyList}>
          <li className={styles.questionWrapper}>
            <div className={styles.questionData}>
              <time>
                <span>Em </span>
                18/03/2022
              </time>
              <h3>O que você usa para desenvolver aplicativos?</h3>
              <ul className={styles.questionAnswers}>
                <li>Flutter</li>
                <li>Nativo</li>
                <li>Ionic</li>
                <li>Native Script</li>
                <li>Phonegap</li>
                <li>Titanium</li>
                <li>Xamarin</li>
              </ul>
            </div>
            <footer>
              <button>Ver resultados</button>
            </footer>
          </li>
          <li className={styles.questionWrapper} />
        </ul>
      </div>
      <Footer />
    </div>
  );
}
