import { useEffect, useRef, useState } from "react";
import { Heading } from "../../../../components";
import { Question as QuestionType } from "../../../../data/types";
import { Options } from "./components";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native";

interface Props {
  question: QuestionType;
  onAnswered: (correct: boolean) => void;
  duration: number;
}

export function Question({ question, onAnswered,duration }: Props) {
  const [time, setTime] = useState<number>(600); // 10 phút = 600 giây
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timework = duration * 60;

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (!isRunning || time <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(600); // Đặt lại thời gian về 10 phút
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <ScrollView>
      <View style={questionStyle.root}>
        <Heading text={question.question} fontSize={20} />
        {question.image ? (
          <View style={[questionStyle.aspectRatio]}>
            <Image
              style={questionStyle.image}
              source={{
                uri: question.image?.uri,
              }}
              alt={question.image?.alt}
            />
          </View>
        ) : null}
        <Options
          options={question.options}
          description={question.answerDescription}
          onAnswered={onAnswered}
        />
      </View>
      
      <View >
      <Text style={{ textAlign: "center" }}>{formatTime(time)}</Text>
      <Button title={isRunning ? 'Dừng' : 'Bắt đầu'} onPress={isRunning ? stopTimer : startTimer} />
    </View>
    </ScrollView>
  );
}

const questionStyle = StyleSheet.create({
  root: {
    padding: 16,
    gap: 8,
  },
  aspectRatio: {
    aspectRatio: 2 / 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 12,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
});
