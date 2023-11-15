import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Test/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "./Test/Root";
import { NativeBaseProvider } from "native-base";
import SingIn from "./screen/SignInScreen";
import MainScreen from "./Test/Main";
import SingUp from "./screen/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SingIn} />
          <Stack.Screen name="SignUp" component={SingUp} />
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
