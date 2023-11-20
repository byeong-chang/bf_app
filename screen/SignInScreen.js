import { Text, View } from "native-base";
import { Button } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import api_post from "../api/api_post";
import api_get from "../api/api_get";

export default function SingIn({ navigation }) {
  const [inputId, setInputId] = useState("");
  const [inputPw, setPw] = useState("");
  const [token, setToken] = useState("");

  const storeData = async (value) => {
    console.log("store uid : " + value);
    setToken(value);
    await AsyncStorage.setItem("userToken", value);
  };

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem("userToken");
      console.log("기기토큰 ---> : " + value);
      if (value !== null) {
        setToken(value);
        const user = await api_get.tokenLogin(value);
        if (user.username) {
          console.log("해당기기 토큰 사용자가 있어 자동로그인 됩니다.");
          // navigation.replace("Main", { value, user });
          navigation.navigate("MainTab", { value, user });
        } else {
          console.log("error is ---> : " + user.message);
        }
      } else {
        await storeData(uuid.v4());
      }
    };
    getData();
  }, []);

  const signInHandle = async () => {
    // console.log("---> id: " + inputId);
    // console.log("---> pw: " + inputPw);
    console.log("---> token: " + token);
    const data = {
      userId: inputId,
      passwd: inputPw,
      token: token
    };
    const user = await api_post.login(data);
    console.log("-----로그인 진행중------");
    if (user.error) {
      console.log(user.message);
      alert("해당 사용자가 없습니다. 회원가입을 해주세요.");
      return;
    }
    navigation.replace("Main", { token, user });
  };

  const signUpHandle = async () => {
    console.log("회원가입 만들기");
    navigation.navigate("SignUp", { token });
  };

  return (
    <View style={{}}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 30,
            paddingTop: 20
          }}
        >
          BFSearcher
        </Text>
        <Text style={{ fontSize: 20, padding: 10 }}>소프트웨어 공학 10조</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <TextInput
          placeholder="아이디를 입력해주세요"
          placeholderTextColor={"black"}
          maxLength={20}
          style={styles.textInput}
          onChangeText={setInputId}
        />
        <Text>{inputId ? inputId : "no input email"}</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요"
          placeholderTextColor={"black"}
          secureTextEntry={true}
          maxLength={20}
          style={styles.textInput}
          onChangeText={setPw}
        />
        <Text>{inputPw ? inputPw : "no input password"}</Text>
      </View>
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <Button title="회원가입" width={"50%"} onPress={signUpHandle}></Button>
        <Button title="로그인" width={"50%"} onPress={signInHandle}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  textInput: {
    borderRadius: 100,
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "gray",
    height: 30,
    width: "70%",
    textAlign: "center"
  }
});
