export namespace Survey {
  export type Model = {
    id: string;
    question: string;
    answers: Answer[];
    date: Date;
    didAnswer: boolean;
  }
  
  export type Answer = {
    image?: string;
    answer: string;
  }
}