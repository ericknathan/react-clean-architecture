import React from 'react';
import styles from './survey-item.module.scss';

export function SurveyItemCardSkeleton() {
  return (
    <>
      <li className={styles.questionWrapper} />
      <li className={styles.questionWrapper} />
      <li className={styles.questionWrapper} />
      <li className={styles.questionWrapper} />
    </>
  );
}
