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

function PostingBox({ title, location, id, date, content }) {
  return (
    <View
      style={{
        borderRadius: 20,
        padding: 8,
        backgroundColor: "white",
        margin: 4
      }}
    >
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
        {title}
      </Text>
      <Text style={{ textAlign: "right" }}>요청자: {id}</Text>
      <Text style={{ textAlign: "center" }}>
        {location} / {date}
      </Text>
      <Text>{content}</Text>
    </View>
  );
}

export default function RecruitScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [reservationDate, setReservationDate] = useState(null);
  const [content, setContent] = useState(null);
  const userInfo = route.params.user;

  const dummy = {
    title: "dummmy",
    locationId: 1113,
    userId: 2,
    reservationDate: "2023-11-29",
    content: "사람 구함"
  };

  useEffect(() => {
    const getData = async () => {
      const postingData = await api_get.recruitmentAll();
      setData(() => postingData);
    };
    getData();
  }, []);
  const postings = data.map((po) => (
    <PostingBox
      key={`postingbox-${po.id}`}
      title={po.title}
      location={po.location.locationName}
      id={po.user.id}
      date={po.reservationDate}
      content={po.content}
    />
  ));

  const handleUpload = async () => {
    if (title && locationId && reservationDate && content) {
      const data = {
        title: title,
        locationId: locationId,
        userId: userInfo.userId,
        reservationDate: reservationDate,
        content: content
      };
      const res = await api_post.upload(data);
      console.log(res);
      this.textInput.clear();
      return;
    }
    alert("게시글 정보를 모두 입력하세요");
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="올리기" onPress={handleUpload} />
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: "black",
          fontWeight: "bold"
        }}
      >
        아이디: {userInfo.username}
      </Text>
      <TextInput
        placeholder="title"
        placeholderTextColor={"black"}
        maxLength={100}
        style={styles.textInput}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="locationId"
        placeholderTextColor={"black"}
        maxLength={100}
        style={styles.textInput}
        onChangeText={setLocationId}
      />
      <TextInput
        placeholder="0000-00-00"
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
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: "black",
          fontWeight: "bold"
        }}
      ></Text>
      <Text>{content}</Text>
      <ScrollView>{postings}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  textInput: {
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "white",
    height: 30,
    width: "100%",
    textAlign: "center"
  },
  contentInput: {
    fontSize: 15,
    backgroundColor: "white",
    height: "auto",
    width: "100%",
    textAlignVertical: "top",
    flexShrink: 1
  },
  postingBox: {
    margin: "10px"
  }
});
