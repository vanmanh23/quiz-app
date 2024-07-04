import { createContext } from 'react';
type numberOfQuestionContextShape = {
    numberOfQuestion: number;
    handlenumberChange:  (numberOfQuestion: number) => void;
  };
export const numberOfQuestionContextShape = createContext({} as numberOfQuestionContextShape);