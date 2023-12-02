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

const WriteScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [content, setContent] = useState(null);
  const userInfo = route.params.user;

  const handleUpload = async () => {
    const dateYear = parseInt(year);
    const dateMonth = parseInt(month);
    const dateDay = parseInt(day);
    console.log(`${dateYear}-${dateMonth}-${dateDay}`);
    if(isNaN(dateYear)) {
      alert('wrong year');
      return;
    }
    else if(isNaN(dateMonth)) {
      alert('wrong month');
      return;
    }
    else if(isNaN(dateDay)) {
      alert('wrong day');
      return;
    }
    else if (title && locationId && content) {
      const data = {
        title: title,
        locationId: locationId,
        userId: userInfo.id,
        reservationDate: `${dateYear}-${dateMonth}-${dateDay}`,
        content: content
      };
      const res = await api_post.upload(data)
      .catch((err) => {
        alert('작성 실패. 입력 형태를 맞춰주세요');
      });

      if(res.error) {
        alert('작성 실패. 입력 형태를 맞춰주세요');
        return;
      }
      console.log(res);
      alert('게시 요청 완료');
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
        maxLength={30}
        style={styles.textInput}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="장소ID"
        maxLength={10}
        style={styles.textInput}
        onChangeText={setLocationId}
      />
      <View style={{flexDirection: "row"}}>
      <Text style={styles.dateText}>날짜:  </Text>
        <TextInput
          placeholder="0000"
          maxLength={4}
          style={styles.numInput}
          onChangeText={setYear}
        />
        <Text style={styles.dateText}> - </Text>
        <TextInput 
          placeholder="00" 
          maxLength={2}
          style={styles.numInput}
          onChangeText={setMonth}
        />
        <Text style={styles.dateText}> - </Text>
        <TextInput
          placeholder="00" 
          maxLength={2}
          style={styles.numInput}
          onChangeText={setDay}
        />
      </View>
      <TextInput
        placeholder="게시글 내용(최대 100자)"
        placeholderTextColor={"black"}
        maxLength={100}
        style={styles.contentInput}
        onChangeText={setContent}
        multiline={true}
      />
      <Button title="올리기" onPress={handleUpload} />
      <Text style={{ marginLeft: 15 }}>
        * 날짜 형태는 반드시 0000-00-00를 맞춰주셔야 합니다. {'\n'}
        * 장소 ID는 장소 안내 페이지에서 확인하실 수 있습니다.
      </Text>
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
    margin: 5
  },
  dateText: {
    backgroundColor: "white",
    fontSize: 15,
  },
  numInput: {
    backgroundColor: "white",
    backgroundColor: "white",
    fontSize: 15,
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
