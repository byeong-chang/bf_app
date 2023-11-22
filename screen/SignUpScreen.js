import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import api_post from "../api/api_post";

export default function SingUp({ navigation, route }) {
  const [hobby, setHobby] = useState(null);
  const [locationCategory, setLocationCategory] = useState(null);
  const [disabledCategory, setDisabledCategory] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const [disabledValidate, setDisabledValidate] = useState(null);
  const token = route.params ? route.params.token : "no token";

  const [checkPw, setCheckPw] = useState("no");

  const disableData = [
    { key: "1", value: "지체장애" },
    { key: "2", value: "뇌형변장애" },
    { key: "3", value: "시각장애" },
    { key: "4", value: "청각장애" },
    { key: "5", value: "언어장애" },
    { key: "6", value: "안면장애" },
    { key: "7", value: "내부기관의 장애" },
    { key: "8", value: "발달장애" },
    { key: "9", value: "정신장애" }
  ];

  const hobbyData = [
    { key: "1", value: "영화/연극/공연" },
    { key: "2", value: "전시/기념관" },
    { key: "3", value: "체육/운동" },
    { key: "4", value: "레저" },
    { key: "5", value: "관광" },
    { key: "6", value: "산책" },
    { key: "7", value: "명승지" }
  ];
  const loactionData = [{ key: "1", value: "종로구" }];

  const handleSignUp = async () => {
    if (
      token &&
      hobby &&
      locationCategory &&
      disabledCategory &&
      username &&
      email &&
      userId &&
      passwd &&
      checkPw
    ) {
      const data = {
        hobby,
        locationCategory,
        disabledCategory,
        username,
        email,
        userId,
        passwd,
        disabledValidate,
        token
      };
      // console.log("---> data : " + JSON.stringify(data));
      const res = await api_post.signUp(data);
      console.log(res);
      navigation.pop();
      return;
    }
    alert("회원정보를 모두 입력하세요");
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {/* token */}
      <Text style={{ padding: 5 }}>{token}</Text>

      {/* id */}
      <TextInput
        placeholder="아이디를 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setUserId}
      />
      <Text>{userId ? "아이디 : " + userId : "no id"}</Text>

      {/* pw */}
      <TextInput
        placeholder="비밀번호를 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setPasswd}
        secureTextEntry={true}
      />
      <Text>{passwd ? "비밀번호 : " + passwd : "no passwd"}</Text>

      {/* check pwd */}
      <TextInput
        placeholder="비밀번호를 한번더 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setCheckPw}
        secureTextEntry={true}
      />
      <Text style={passwd === checkPw ? { color: "blue" } : { color: "red" }}>
        {passwd === checkPw
          ? "비밀번호가 일치합니다"
          : "비밀번호를 다시 확인하세요"}
      </Text>

      {/* email */}
      <TextInput
        placeholder="이메일을 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setEmail}
      />
      <Text>{email ? "이메일 : " + email : "no email"}</Text>

      {/* username */}
      <TextInput
        placeholder="닉네임을 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setUsername}
      />
      <Text>{username ? "닉네임 : " + username : "no username"}</Text>

      {/* hobby */}
      <View width="70%">
        <SelectList
          placeholder="취미를 선택해 주세요"
          searchPlaceholder="취미"
          setSelected={(val) => {
            const index = hobbyData.findIndex((key) => key.value == val) + 1;
            console.log(val + "의 키값은 : " + index);
            setHobby(index);
          }}
          data={hobbyData}
          save="value"
          dropdownShown={false}
        />
      </View>
      <Text>{hobby}</Text>

      {/* disableData */}
      <View width="70%">
        <SelectList
          placeholder="가지고 계신 장애를 선택해주세요"
          searchPlaceholder="장애 유형"
          setSelected={(val) => {
            const index = disableData.findIndex((key) => key.value == val) + 1;
            console.log(val + "의 키값은 : " + index);
            setDisabledValidate(index);
            setDisabledCategory(val);
          }}
          data={disableData}
          save="value"
          dropdownShown={false}
        />
      </View>
      <Text>{disabledCategory}</Text>

      {/* locationCategory */}
      <View width="70%">
        <SelectList
          placeholder="거주 지역을 선택해주세요"
          searchPlaceholder="거주 지역"
          setSelected={(val) => {
            const index = loactionData.findIndex((key) => key.value == val) + 1;
            console.log(val + "의 키값은 : " + index);
            setLocationCategory(val);
          }}
          data={loactionData}
          save="value"
          dropdownShown={false}
        />
      </View>
      <Text>{locationCategory}</Text>
      <Button title="회원가입" width={"50%"} onPress={handleSignUp}></Button>
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
