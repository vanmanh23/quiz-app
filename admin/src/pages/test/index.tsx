import React, { useState, useContext } from 'react'
import TestForm from './_components/TestForm'
import { TestsContext } from '../../../utils/testContext';
import { numberOfQuestionContextShape } from '../../../utils/durationContext'
import QuestionsForm from './_components/QuestionsForm';

export default function Component() {
  const { test } = useContext(TestsContext);
  console.log("test in index file", test);

  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(1);
  const handlenumberChange  = (numberOfQuestions: number) => {
    setNumberOfQuestion(numberOfQuestions);
  }
  return (
    <numberOfQuestionContextShape.Provider value={{numberOfQuestion, handlenumberChange}}>
    <div className=''>
        {
          !test && <TestForm />
        }
        {
          test && <QuestionsForm />
        }
    </div>
    </numberOfQuestionContextShape.Provider>
  )
}
