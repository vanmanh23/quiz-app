import { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataContext } from '../../../../lib/DataContext';

interface Props {
  timeTaken?: number;
}

export function TimeSpentCard({ timeTaken }: Props) {
  const dataContext = useContext(DataContext);
  if(!dataContext){
    throw new Error("dataContex not found");
  }
  const { handleTimeDuringChange } = dataContext;
  if (!timeTaken) return;

  const totalSeconds = Math.floor(timeTaken / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');
  useEffect(() => {
    handleTimeDuringChange(`${mm}:${ss}`);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <View style={timeSpentCard.root}>
      <Text style={timeSpentCard.timeSpentLabel}>Time spent (mm:ss):</Text>
      <Text style={timeSpentCard.timeSpentText}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}

const timeSpentCard = StyleSheet.create({
  root: {
    width: '100%',
    gap: 16,
    padding: 16,
    borderRadius: 24,
    borderColor: '#cbd2d9',
    borderWidth: 1,
    alignSelf: 'center',
  },
  timeSpentLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#737373',
  },
  timeSpentText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
