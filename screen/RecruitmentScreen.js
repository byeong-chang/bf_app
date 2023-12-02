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
  const [re, setRe] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const postingData = await api_get.recruitmentAll();
      setData(() => postingData);
    };
    getData();
  }, [route, navigation, re]);

  function PostingBox(props) {

    const handlePostingDetail = () => {
      navigation.navigate("Match", {
        recruitId: props.recruitId,
        user: route.params.user,
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
          {props.title}
        </Text>
        <Text style={{ textAlign: "right" }}>{props.flag?'매칭완료':'매칭대기'}</Text>
        <Text style={{ textAlign: "right" }}>요청자: {props.userId}</Text>
        <Text style={{ textAlign: "center" }}>
          {props.location} / {props.date[0]}년{props.date[1]}월{props.date[2]}일
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
      flag={po.flag}
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
      <Button title="새로고침" onPress={() => {setRe((p) => (!p))}} 
        style={{ width: "50%"}}
      />
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
