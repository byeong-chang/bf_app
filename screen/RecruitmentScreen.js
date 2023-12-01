import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import api_get from "../api/api_get";

const RecruitScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const postingData = await api_get.recruitmentAll();
      setData(() => postingData);
    };
    getData();
  }, [route, navigation]);

  function PostingBox({ title, location, userId, recruitId, date }) {

    const handlePostingDetail = () => {
      navigation.navigate("Match", {
        recruitId: recruitId,
        token: route.params.token ? route.params.token : route.params.value
      });
    }
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
        <Text style={{ textAlign: "right" }}>요청자: {userId}</Text>
        <Text style={{ textAlign: "center" }}>
          {location} / {date}
        </Text>
        <Button title='자세히보기' onPress={handlePostingDetail} />
      </View>
    );
  }

  const postings = data.map((po) => (
    <PostingBox
      key={`postingbox-${po.id}`}
      title={po.title}
      location={po.location.locationName}
      userId={po.user.userId}
      recruitId={po.id}
      date={po.reservationDate}
      content={po.content}
    />
  ));

  const handleWrite = async () => {
    navigation.navigate("Write", {
      user: route.params.user
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="게시글 작성" onPress={handleWrite} />
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

export default RecruitScreen;
