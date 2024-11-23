import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TestName } from "../data/types";

export type BottomTabParamList = {
  HomeTab: undefined;
  SavedTab: undefined;
  StatsTab: undefined;
  SettingsTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Test: {
    title: string;
    // testName: TestName;
    testName: string;
  };
  Result: {
    testsId: string;
    correctAnswers: number;
    totalQuestions: number;
    timeTaken: number;
  };
  Register: undefined;
  Login: undefined;
  Achievement: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "Home"
>;
export type TestScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "Test"
>;
export type ResultScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "Result"
>;
export type RegisterScreenProps = NativeStackScreenProps<
HomeStackParamList,
"Register"
>;
export type LoginScreenProps = NativeStackScreenProps<
HomeStackParamList,
"Login"
>;
export type AchievementScreenProps = NativeStackScreenProps<
HomeStackParamList,
"Achievement"
>;
