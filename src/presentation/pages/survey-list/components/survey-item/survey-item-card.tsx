import React from 'react';
import styles from './survey-item.module.scss';

export function SurveyItemCard() {
  return (
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
  );
}
