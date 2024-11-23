import React, { createContext, useState, ReactNode } from 'react';

interface DataContextType {
  timeDuring: string;
  handleTimeDuringChange: (timeDuring: string) => void;
  userId: string;
  handleUserIdChange: (userId: string) => void;
  score: number;
  handleScoreChange: (score: number) => void;
  duration: number;
  handleDurationChange: (score: number) => void;
}

// Tạo Context
export const DataContext = createContext<DataContextType | undefined>(undefined);
interface DataProviderProps {
  children: ReactNode;
}
// Tạo Provider
export const DataProvider : React.FC<DataProviderProps> = ({ children }) => {
  const [timeDuring, setTimeDuring] = useState<string>('');
  const handleTimeDuringChange  = (timeDuring: string) => {
    setTimeDuring(timeDuring);
  }
  const [duration, setDuration] = useState(Number);
  const handleDurationChange  = (duration: number) => {
    setDuration(duration);
  }
  const [userId, setUserId] = useState<string>('');
  const handleUserIdChange  = (userId: string) => {
    setUserId(userId);
  }
  const [score, setScore] = useState(Number);
  const handleScoreChange  = (score: number) => {
    setScore(score);
  }

  return (
    <DataContext.Provider value={{ duration, handleDurationChange, timeDuring, handleTimeDuringChange, userId, handleUserIdChange, score, handleScoreChange }}>
      {children}
    </DataContext.Provider>
  );
};
