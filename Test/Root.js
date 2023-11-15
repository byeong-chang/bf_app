import { View, Text, NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import React from "react";
import api_post from "../api/api_post";

export default function Root({ route }) {
  api_post.signTest({
    hobby: "1",
    locationCategory: "종로구",
    disabledCategory: "지체장애",
    username: "local",
    email: "abc@abc.com",
    userId: "root",
    passwd: "qwer1234",
    disabledValidate: 0,
    token: `${route.params.id}`
  });
  return (
    <View>
      <Text>{route.params.id}</Text>

      <StatusBar style="auto" />
    </View>
  );
}
