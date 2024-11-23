import { View, StyleSheet,  ScrollView, FlatList, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../Result/components'
import { AchievementScreenProps, RegisterScreenProps } from '../types'
import { SafeAreaBox } from '../../components';
import { AchievementCard } from './components/AchievementCard';
import { getTestByUserId } from '../../api/testCompleted';
import { DataContext } from '../../lib/DataContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { LoadingIndicator } from '../Test/components';

export function AchievementScreen({ navigation, route }: AchievementScreenProps) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dataContext = useContext(DataContext);
  if(!dataContext){
    throw new Error("dataContext not found");
  }
  const { userId, handleUserIdChange } = dataContext;
  console.log("catchuserId in file chievement screen: ",userId);
  useEffect(() => {
    const fetchdata = async() => {
      try{
        const datas = await getTestByUserId(userId);
        // setData(datas?.getUser.tests);
        if (!datas) {
          // throw new Error("No data returned from getTestByUserId");
          console.log("No data returned from getTestByUserId");
      }
      const user = datas.getUser;
      if (!user) {
          // throw new Error("User data is missing in the response");
          console.log("User data is missing in the response");
      }
      handleUserIdChange(user.id)
      setData(user.tests);
      setIsLoading(true);
      }catch(error){
        console.log(error);
      }
    }
    fetchdata();
  }, [data ,isLoading]) 
  return (
    <SafeAreaBox>
      <ScrollView style={styles.root}>
    <View style={styles.container}>
    <View style={styles.header}>
      <Icon name="left" size={35}  color="#525252" onPress={() => navigation.goBack()}/>
    <Text style={styles.title}>achivements</Text>
    </View>
    { !isLoading && <View style={styles.isload}><LoadingIndicator /></View>}
    <FlatList
    scrollEnabled={false}
    numColumns={2}
    data={data}
    renderItem={({ item, index }) => (
      <AchievementCard
        userName={item.user.userName}
        testName={item.testName.title}
        score={item.score}
        timeDuration={item.timeTaken}
        dayfinished={item.day}
      />
    )}
    // keyExtractor={(item) => item.id}
  />
    </View>
    </ScrollView>
    </SafeAreaBox>
  )
}
// Styles for the components 
const styles = StyleSheet.create({ 
  root: {
    backgroundColor: "#edefff",
  },
  container: { 
      flex: 1, 
      padding: 16, 
      justifyContent: 'center', 
  }, 
  header: {
    flexDirection: 'row',
  },
  isload: {
    marginTop: 250,
  },
  button: { 
      backgroundColor: 'green', 
      borderRadius: 8, 
      paddingVertical: 10, 
      alignItems: 'center', 
      marginTop: 16, 
      marginBottom: 12, 
  }, 
  buttonText: { 
      color: '#fff', 
      fontWeight: 'bold', 
      fontSize: 16, 
  }, 
  error: { 
      color: 'red', 
      fontSize: 20, 
      marginBottom: 12, 
  }, 
  title: {
    fontSize: 32,
    color: '#525252',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 20
  },
}); 
