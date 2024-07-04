import { createContext } from 'react';
type testContextShape = {
    test: string;
    handleTestChange:  (testname: string) => void;
  };
export const TestsContext = createContext({} as testContextShape);