import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import SingIn from "./screen/SignInScreen";
import SingUp from "./screen/SignUpScreen";
import MainTab from "./screen/MainTab";
import RecruitScreen from "./screen/RecruitmentScreen";
import MainScreen from "./screen/MainScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SingIn} />
          <Stack.Screen name="SignUp" component={SingUp} />
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Recruit" component={RecruitScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
