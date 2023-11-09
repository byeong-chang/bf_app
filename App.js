import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screen/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "./screen/Root";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Root" component={Root} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
