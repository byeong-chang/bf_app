import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import api_get from "../api/api_get";
import * as Linking from "expo-linking";

export default function LocationDetailScreen({ route, navigation }) {
  const [user, setUser] = useState(
    route.params.user ? route.params.user : null
  );
  const [location, setLocation] = useState(
    route.params.location ? route.params.location : null
  );
  const [review, setReview] = useState();
  // console.log(location);
  // console.log(location.id);
  // console.log(location.hobbyCategory);
  useEffect(() => {
    navigation.setOptions({
      title: `${location.locationName}`
    });
    const getReview = async () => {
      const getReviewData = await api_get.getLocationReview(location.id);
      setReview(getReviewData);
    };
    getReview();
  }, []);

  const handleURL = async () => {
    // console.log(location.homepage);
    await Linking.openURL(`http://${location.homepage}`, {
      forceWebView: false,
      showAppsToOpen: true
    });
  };
  return (
    <View style={{ alignItems: "center" }}>
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
        장애인 전용 주차장 여부 : {location.parkForDisabled ? "제공" : "없음"}
      </Text>
      <Text>전화번호 : {location.phoneNumber}</Text>
      <Text>운영시간 : {location.runtime}</Text>
      <Text>별점 : {location.starRating}</Text>
      <Text>
        장애인 전용 화장실 : {location.toiletForDisabled ? "제공" : "없음"}
      </Text>
      <Text>
        휠체어 대여 여부 : {location.wheelchairRental ? "가능" : "불가"}
      </Text>

      <Text>{JSON.stringify(review)}</Text>
      <Button title={location.homepage} onPress={handleURL} />
    </View>
  );
}
