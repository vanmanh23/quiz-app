import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./src/screens/types";
import { HomeScreen, ResultScreen, TestScreen, RegisterScreen, LoginScreen } from "./src/screens";
import axios from "axios";
import { AchievementScreen } from "./src/screens/Achievement";
import { DataProvider } from "./src/lib/DataContext";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function App() {
  // const [data, setData] = React.useState([]);
  // React.useEffect(() => {
  //   axios.get(
  //     "https://quiz-app-api-one.vercel.app/api/categories/6"
  //   ).then((res) => {
  //     setData(res.data.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // },[])
  //   console.log("data fetching: ", data)
  return (
    <DataProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{
            headerShown: true,
            header: () => null,
          }}
        />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Achievement" component={AchievementScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </DataProvider>
  );
}
