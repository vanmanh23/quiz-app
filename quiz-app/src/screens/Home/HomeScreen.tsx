import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HomeCard } from "./components";
import { HomeScreenProps } from "../types";
import { Heading, SafeAreaBox } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingIndicator } from "../Test/components";
import { HeaderCard } from "./components/HomeCard";
import * as SecureStore from 'expo-secure-store';

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [data, setData] = useState([]);
  const [isLoading, setInLoading] = useState(false);
  const [webToken, setWebToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    // Fetch data from the API
    axios.get('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/test')
      .then(response => {
        setData(response.data.testNames);
        setInLoading(true);
      })
      .catch(error => {
        throw error;
      });
        
        const checkToken = async () => {
          const scuretoken =  await SecureStore.getItemAsync('secure_token');
          if(scuretoken){
            setIsLogin(true);
          }
        }
        checkToken();
  }, [data, isLoading, isLogin]);
  // 
  const onRegister = () => {
    navigation.navigate("Register");
  }
  const onSignIn = async () => {
    navigation.navigate("Login");
  }
  const onSignOut = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setIsLogin(false);
  }
  const onAchievement = () => {
    navigation.navigate("Achievement");
  }
  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setIsLogin(true);
    } else {
      console.log('No values stored under that key.');
    }
  }
  getValueFor('secure_token');
  return (
    <SafeAreaBox>
      <ScrollView>
        <View style={homeScreen.rootContainer}>
          <View style={{zIndex: 1}}>
          <HeaderCard onRegister={onRegister} onSignIn={onSignIn} isLogin={isLogin} onSignOut={onSignOut} onAchievement={onAchievement}/>
          </View>
          <WelcomeCard />

          <Text style={homeScreen.title}>Tests</Text>
          {
            !isLoading && <View style={homeScreen.isload}><LoadingIndicator /></View>
          }
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            data={data}
            renderItem={({ item, index }) => (
              <HomeCard
                title={item.title}
                image={item.image}
                numOfQuestions={item.numOfQuestions}
                duration={item.duration}
                index={index}
                onPress={() => {
                  if(isLogin){
                    navigation.navigate("Test", {
                      title: item.title,
                      testName: item.testName,
                    });
                  }else{
                    // alert.t("Please login to continue");
                    Alert.alert(
                      "Please login to continue",
                      "",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        { text: "OK", onPress: () => onSignIn() },
                      ],
                      { cancelable: false }
                    )
                  }
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaBox>
  );
}

function WelcomeCard() {
  return (
    <View style={welcomeCard.root}>
      <Heading text="Quiz App" fontSize={24} color="#fafafa" />
      <Text style={welcomeCard.text}>
        Welcome to the Quiz App! Get ready to test your knowledge!
      </Text>
    </View>
  );
}

const homeScreen = StyleSheet.create({
  rootContainer: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#525252",
  },
  isload: {
    top: 150
  }
});

const welcomeCard = StyleSheet.create({
  root: {
    backgroundColor: "#9c88ff",
    gap: 16,
    borderRadius: 24,
    padding: 24,
  },
  heading: {
    color: "#fafafa",
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    color: "#fafafa",
    fontWeight: "500",
  },
});
