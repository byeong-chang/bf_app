import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecruitScreen from "./RecruitmentScreen";
import MainScreen from "./MainScreen";

const Tab = createBottomTabNavigator();

export default function MainTab({ route }) {
  const token = route.params.token ? route.params.token : route.params.value;
  const user = route.params.user;
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen
        name="Recrui"
        component={RecruitScreen}
        initialParams={{ user: user, token: token }}
        options={{
          title: "매칭",
          // headerTitleAlign: 'flex-start',
          headerStyle: {
            borderBottomColor: "black",
            borderBottomWidth: 1
          }
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        initialParams={{ user: user, token: token }}
        options={{
          title: "BF Searcher",
          // headerTitleAlign: 'flex-start',
          headerStyle: {
            borderBottomColor: "black",
            borderBottomWidth: 1,
            backgroundColor: "steelblue"
          }
        }}
      />
    </Tab.Navigator>
  );
}
