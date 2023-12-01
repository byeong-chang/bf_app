import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import api_post from "../api/api_post";
import api_get from "../api/api_get";

const WriteScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [reservationDate, setReservationDate] = useState(null);
  const [content, setContent] = useState(null);
  const userInfo = route.params.user;

  const handleUpload = async () => {
    if (title && locationId && reservationDate && content) {
      const data = {
        title: title,
        locationId: locationId,
        userId: userInfo.id,
        reservationDate: reservationDate,
        content: content
      };
      const res = await api_post.upload(data);
      console.log(res);
      return;
    }
    alert("게시글 정보를 모두 입력하세요");
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 15,
          color: "black",
          fontWeight: "bold"
        }}
      >
        아이디: {userInfo.username}
      </Text>
      <TextInput
        placeholder="제목"
        placeholderTextColor={"black"}
        maxLength={30}
        style={styles.textInput}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="장소ID"
        placeholderTextColor={"black"}
        maxLength={10}
        style={styles.textInput}
        onChangeText={setLocationId}
      />
      <TextInput
        placeholder="날짜(0000-00-00)"
        placeholderTextColor={"black"}
        maxLength={10}
        style={styles.textInput}
        onChangeText={setReservationDate}
      />
      <TextInput
        placeholder="게시글 내용(최대 100자)"
        placeholderTextColor={"black"}
        maxLength={100}
        style={styles.contentInput}
        onChangeText={setContent}
        multiline={true}
      />
      <Button title="올리기" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  input: {
    fontWeight: "bold",
    fontSize: 15,
    width: "100%",
    margin: 5
  },
  textInput: {
    backgroundColor: "white",
    height: 30,
    fontSize: 15,
    width: "100%",
    margin: 5
  },
  contentInput: {
    fontSize: 15,
    backgroundColor: "white",
    width: "100%",
    height: 200,
    textAlignVertical: "top",
    margin: 5,
    padding: 5
  },
  postingBox: {
    margin: "10px"
  }
});

export default WriteScreen;
