import React from 'react';
import styles from './survey-item.module.scss';
import { Survey } from '@/domain/models';
import { formatDate } from '@/helpers';
import { SurveyItem } from '.';

type SurveyItemCardProps = {
  survey?: Survey.Model | null;
}

export function SurveyItemCard({ survey }: SurveyItemCardProps) {
  if(!survey) return <SurveyItem.Skeleton />;

  const didAnswerClassName = survey.didAnswer ? styles.answeredStatusSuccess : '';
  
  return (
    <li className={styles.questionWrapper}>
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
