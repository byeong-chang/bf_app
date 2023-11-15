import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Button } from "react-native";
import * as Update from "expo-updates";
const MainScreen = ({ route, navigation }) => {
  const userId = route.params.token ? route.params.token : route.params.value;
  const userInfo = route.params.user;
  console.log("user token is ----> : " + userId);

  const handleLogout = async () => {
    console.log("logout id : " + userId);
    try {
      AsyncStorage.clear();
      await Update.reloadAsync();
    } catch (error) {
      console.log(error);
    }
    // navigation.navigate("Login");
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: "black",
          fontWeight: "bold"
        }}
      >
        {userId}
      </Text>
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: "black",
          fontWeight: "bold"
        }}
      >
        {userInfo.username}
      </Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
};

export default MainScreen;
