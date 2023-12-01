import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import SingIn from "./screen/SignInScreen";
import SingUp from "./screen/SignUpScreen";
import MainTab from "./screen/MainTab";
import RecruitScreen from "./screen/RecruitmentScreen";
import MainScreen from "./screen/MainScreen";
import LocationDetailScreen from "./screen/LocationDetailScreen";
import LikeLocationScreen from "./screen/LikeLocationListScreen";
import SearchLocationScreen from "./screen/SearchLocationScreen";
import MatchScreen from "./screen/MatchScreen";
import WriteScreen from "./screen/WriteScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SingIn}
            options={{
              headerTintColor: "black",
              headerStyle: {
                borderBottomColor: "black",
                borderBottomWidth: 1,
                backgroundColor: "steelblue"
              }
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SingUp}
            options={{
              headerTintColor: "black",
              headerStyle: {
                borderBottomColor: "black",
                borderBottomWidth: 1,
                backgroundColor: "steelblue"
              }
            }}
          />
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Recruit" component={RecruitScreen} />
          <Stack.Screen
            name="LocationDetail"
            component={LocationDetailScreen}
            options={{
              headerTintColor: "black",
              headerStyle: {
                borderBottomColor: "black",
                borderBottomWidth: 1,
                backgroundColor: "steelblue"
              }
            }}
          />
          <Stack.Screen name="LikeLocation" component={LikeLocationScreen} />
          <Stack.Screen
            name="SearchLocation"
            component={SearchLocationScreen}
          />

          <Stack.Screen
            name="Write"
            component={WriteScreen}
            options={{
              headerTintColor: "black",
              headerStyle: {
                borderBottomColor: "black",
                borderBottomWidth: 1,
                backgroundColor: "steelblue"
              }
            }}
          />
          <Stack.Screen
            name="Match"
            component={MatchScreen}
            options={{
              headerTintColor: "black",
              headerStyle: {
                borderBottomColor: "black",
                borderBottomWidth: 1,
                backgroundColor: "steelblue"
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
