import React from 'react';
import styles from './survey-item.module.scss';
import { Survey } from '@/domain/models';
import { formatDate } from '@/helpers';

type SurveyItemCardProps = {
  survey: Survey.Model;
}

export function SurveyItemCard({ survey, ...props }: SurveyItemCardProps) {
  const didAnswerClassName = survey.didAnswer ? styles.answeredStatusSuccess : '';
  
  return (
    <li className={styles.questionWrapper} {...props}>
      <div data-testid='question-data' className={[styles.questionData, didAnswerClassName].join(' ')}>
        <time data-testid='date'>
          <span>Em </span>
          {formatDate(survey.date)}
        </time>
        <h3 data-testid='question'>{survey.question}</h3>
        <ul data-testid='answers' className={styles.questionAnswers}>
          {survey.answers.map(({ answer }) => (
            <li key={answer}>
              <span>{answer}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <button>Ver resultados</button>
      </footer>
    </li>
  );
}
