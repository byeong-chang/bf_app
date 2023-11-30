import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecruitScreen from "./RecruitmentScreen";
import MainScreen from "./MainScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import LikeLocationScreen from "./LikeLocationListScreen";
import { Fontisto } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function MainTab({ route }) {
  const token = route.params.token ? route.params.token : route.params.value;
  const user = route.params.user;
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen
        name="Recruit"
        component={RecruitScreen}
        initialParams={{ user: user, token: token }}
        options={{
          title: "매칭",
          tabBarIcon: () => <Ionicons name="link" size={24} />,
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
          title: "메인",
          tabBarIcon: () => <Ionicons name="ios-home" size={24} />,
          // headerTitleAlign: 'flex-start',
          headerStyle: {
            borderBottomColor: "black",
            borderBottomWidth: 1,
            backgroundColor: "steelblue"
          }
        }}
      />
      <Tab.Screen
        name="LikeLocation"
        component={LikeLocationScreen}
        initialParams={{ user: user, token: token }}
        options={{
          title: "즐겨찾기",
          tabBarIcon: () => (
            <Fontisto name="favorite" size={24} color="black" />
          ),
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
