import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import api_get from "../api/api_get";
import * as Linking from "expo-linking";
import uuid from "react-native-uuid";
import { SelectList } from "react-native-dropdown-select-list";
import api_post from "../api/api_post";
export default function LocationDetailScreen({ route, navigation }) {
  const [user, setUser] = useState(
    route.params.user ? route.params.user : null
  );

  const [location, setLocation] = useState(
    route.params.location ? route.params.location : null
  );
  const [review, setReview] = useState();
  const [showReview, setShowReview] = useState(false);
  const [writeReview, setWriteReview] = useState();
  const [starRank, setStarRank] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: `${location.locationName}`
    });
    const getReview = async () => {
      const getReviewData = await api_get.getLocationReview(location.id);
      if (getReviewData.length > 0) {
        setReview(getReviewData.reverse());
        setShowReview(true);
      }
    };
    const getLocationDto = async () => {
      const getLocationData = await api_get.getLocation(location.id);
      setLocation(getLocationData.location);
    };
    getReview();
    getLocationDto();
  }, [result, user]);

  const handleURL = async () => {
    // console.log(location.homepage);
    await Linking.openURL(`http://${location.homepage}`, {
      forceWebView: false,
      showAppsToOpen: true
    });
  };

  const handleWriteReview = async () => {
    // console.log(writeReview);
    setStarRank(parseFloat(starRank));
    if (!starRank || 5 < starRank || 0 > starRank) {
      alert("0에서 5사이의 점수를 입력해주세요");
      setStarRank();
      return;
    }
    const writeReviewData = {
      locationId: location.id,
      userToken: user.token,
      starRating: starRank,
      content: writeReview
    };
    const resultData = await api_post.writeReview(writeReviewData);
    setResult(resultData);
  };
  const handleFavorite = async () => {
    setUser(await api_get.tokenLogin(user.token));
    console.log(user.likeLocation);
    if (user.likeLocation.includes(location.id)) {
      alert("이미 즐겨찾기 되어있습니다.");
      return;
    }
    const data = {
      token: user.token,
      locationId: location.id
    };
    const res = await api_post.likeLocation(data);
    console.log("즐겨찾기 : ", res);
    setUser(await api_get.tokenLogin(user.token));
    alert("즐겨찾기에 추가하였습니다.");
  };
  const renderReview = (review) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderTopWidth: 1,
          borderColor: "lightblack"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 5
          }}
        >
          <Text style={{ paddingRight: 10 }}>
            이름 : {review.item.userName}
          </Text>
          <Text style={{}}>별점 : {review.item.starRating}</Text>
        </View>
        <Text style={{}}>{review.item.content}</Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView>
      <View style={{ alignItems: "center" }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>{location.address}</Text>
          <Text>오디오 가이드 : {location.audioGuide ? "제공" : "없음"}</Text>
          <Text>대형주차장 : {location.bigPark ? "제공" : "없음"}</Text>
          <Text>점자 가이드 : {location.brailleGuide ? "제공" : "없음"}</Text>
          <Text>휴무일 : {location.closedDay}</Text>
          <Text>
            장애인용 출입문 : {location.doorForDisabled ? "제공" : "없음"}
          </Text>
          <Text>무료주차 : {location.freePark ? "가능" : "불가"}</Text>
          <Text>
            시각장애인 안내견 동반 가능 여부 :{" "}
            {location.guideDogPermitted ? "가능" : "불가"}
          </Text>
          <Text>유료주차 : {location.paidPark ? "가능" : "불가"}</Text>
          <Text>
            장애인 전용 주차장 여부 :{" "}
            {location.parkForDisabled ? "제공" : "없음"}
          </Text>
          <Text>전화번호 : {location.phoneNumber}</Text>
          <Text>운영시간 : {location.runtime}</Text>
          <Text>별점 : {location.starRating.toFixed(2)}</Text>
          <Text>
            장애인 전용 화장실 : {location.toiletForDisabled ? "제공" : "없음"}
          </Text>
          <Text>
            휠체어 대여 여부 : {location.wheelchairRental ? "가능" : "불가"}
          </Text>
        </View>
        {location.homepage == "정보없음" ? (
          <Button title={location.homepage} />
        ) : (
          <Button title={location.homepage} onPress={handleURL} />
        )}
        <Button title="즐겨찾기" onPress={handleFavorite} />
        {showReview ? (
          <ScrollView
            style={{
              backgroundColor: "lightgray",
              borderRadius: 10,
              width: "100%",
              height: "22%"
            }}
          >
            <FlatList
              data={review}
              renderItem={renderReview}
              keyExtractor={() => uuid.v4()}
              scrollEnabled={false}
            />
          </ScrollView>
        ) : (
          <Text>리뷰가 없습니다.</Text>
        )}
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "ivory",
              borderWidth: 1,
              borderRadius: 10,
              width: "100%"
            }}
          >
            <TextInput
              placeholder="별점"
              textAlign="center"
              placeholderTextColor={"black"}
              style={{
                height: 50,

                flex: 0.2,
                borderRightWidth: 1
              }}
              maxLength={3}
              onChangeText={setStarRank}
            />
            <TextInput
              placeholder="리뷰를 입력해주세요"
              textAlign="center"
              placeholderTextColor={"black"}
              style={{
                height: 50,
                flex: 1,
                borderRightWidth: 1
              }}
              maxLength={50}
              onChangeText={setWriteReview}
            />

            <Button title="입력" onPress={handleWriteReview} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
