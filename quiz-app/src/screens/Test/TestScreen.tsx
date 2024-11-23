import { memo, useContext, useEffect, useRef, useState } from "react";
import {
  Header,
  LoadingIndicator,
  Question as QuestionComponent,
} from "./components";
import PagerView from "react-native-pager-view";
import { TestScreenProps } from "../types";

import { View, Text } from "react-native";
import { shuffleArray } from "./shuffle";
// import { Question } from "../../data/types";
import axios from "axios";
import { DataContext } from "../../lib/DataContext";

export function TestScreen({ navigation, route }: TestScreenProps) {
  const category = route.params.testName;
  // const [time, setTime] = useState(0);
  // const [isRunning, setIsRunning] = useState(false);
  // const intervalRef = useRef<any>(null);
  // const [questions, setQuestions] = useState<Question[]>([]);
  const [questions, setQuestions] = useState([]);
  const [testQuestionId, setTestQuestionId] = useState<string>("");
  const startTimeRef = useRef<number>(Date.now());
  const pagerViewRef = useRef<PagerView>(null);

  // States needed for the header
  const [correctIndexes, setCorrectIndexes] = useState<number[]>([]);
  const [incorrectIndexes, setIncorrectIndexes] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const dataContext = useContext(DataContext);
  if(!dataContext){
    throw new Error('DataContext not found');
  }
  const { duration, handleDurationChange } = dataContext;
  // Only run on intial render to load the questions
  useEffect(() => {
    // if (isRunning) {
    //   intervalRef.current = setInterval(() => {
    //     setTime(prevTime => prevTime + 1);
    //   }, 1000);
    // }else if (!isRunning && time !== 0) {
    //   clearInterval(intervalRef.current);
    // }
      const fetchData = async () => {
        try{
          const responseTestId  = await axios.get(`https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/test?name=${category}`);
          const testId = responseTestId .data.testName.id;
          setTestQuestionId(testId);
          handleDurationChange(responseTestId .data.testName.duration)
          const responseQuestions = await axios.get(`https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/questions/question?id=${testId}`)         
          setQuestions(shuffleArray(responseQuestions.data.questions.question));
        }catch(error){
          console.log(error);
          throw error;
        }
      }
      fetchData();
  }, [category]);
  // Effect run to update the header
  useEffect(() => {
    if (questions.length > 0) {
      navigation.setOptions({
        header: () => (
          <Header
            current={currentQuestionIndex}
            numOfQuestions={questions.length}
            correct={correctIndexes}
            incorrect={incorrectIndexes}
            onQuestionTouch={(index) => {
              pagerViewRef.current?.setPage(index);
            }}
            onBackPress={navigation.goBack}
          />
        ),
      });
    }
    console.log("useEffect: update header");
  }, [
    navigation,
    currentQuestionIndex,
    correctIndexes,
    incorrectIndexes,
    questions.length,
    pagerViewRef,
  ]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  // Effect run to determine if the user has answered all questions
  useEffect(() => {
    if (
      questions.length > 0 &&
      questions.length === correctIndexes.length + incorrectIndexes.length
    ) {
      navigation.push("Result", {
        testsId: testQuestionId,
        correctAnswers: correctIndexes.length,
        totalQuestions: questions.length,
        timeTaken: Date.now() - startTimeRef.current,
      });
    }
    console.log("useEffect: check if test is done");
  }, [
    navigation,
    questions.length,
    correctIndexes.length,
    incorrectIndexes.length,
    startTimeRef,
  ]);

  console.log("TestScreen");
  // useEffect(() => {
  //   if (isRunning) {
  //     intervalRef.current = setInterval(() => {
  //       setTime(prevTime => prevTime + 1);
  //     }, 1000);
  //   } else if (!isRunning && time !== 0) {
  //     clearInterval(intervalRef.current);
  //   }
  //   return () => clearInterval(intervalRef.current);
  // }, [isRunning]);
  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  // };
  // console.log("isRunning: ", formatTime(10));
  if (questions.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <MemoizedPagerView
      questions={questions}
      durations = {duration}
      pagerViewRef={pagerViewRef}
      onAnswered={(index, answer) => {
        if (answer) {
          setCorrectIndexes((prev) => [...prev, index]);
        } else {
          setIncorrectIndexes((prev) => [...prev, index]);
        }
      }}
      onPageSelected={setCurrentQuestionIndex}
    />
  );
}

interface PagerViewComponentProps {
  // questions: Question[];
  questions: [];
  pagerViewRef: React.RefObject<PagerView>;
  onAnswered: (index: number, answer: boolean) => void;
  onPageSelected: (index: number) => void;
}

const MemoizedPagerView = memo(
  function PagerViewComponent({
    questions,
    pagerViewRef,
    onAnswered,
    onPageSelected,
    durations,
  }: PagerViewComponentProps) {
    console.log("MemoizedPagerView");
    return (
      <PagerView
        ref={pagerViewRef}
        style={{
          flex: 1,
        }}
        initialPage={0}
        onPageSelected={({ nativeEvent }) => {
          onPageSelected(nativeEvent.position);
        }}>
        {questions.map((question, index) => {
          return (
            <View key={question.id}>
              <QuestionComponent
                question={question}
                onAnswered={(correct) => onAnswered(index, correct)}
                duration= {durations}
              />
            </View>
          );
        })}
      </PagerView>
    );
  },
  // We don't compare functions because they are recreated on every render (this would make them unequal all the time)
  // We could use useCallback but I believe this is better
  (prevProps, curProps) =>
    prevProps.questions.length === curProps.questions.length &&
    prevProps.pagerViewRef === curProps.pagerViewRef
);
