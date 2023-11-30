import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import * as Update from "expo-updates";
import * as Location from "expo-location";
import api_post from "../api/api_post";

import uuid from "react-native-uuid";

const MainScreen = ({ route, navigation }) => {
  console.log("-----------Main----------");
  const token = route.params.token ? route.params.token : route.params.value;
  const userInfo = route.params.user;
  const [userLocation, setUserLocation] = useState({
    latitude: "",
    longitude: ""
  });
  const [locationData, setLocationData] = useState({});
  const [randomLocationData, setLandomLD] = useState({});
  const [distanceLocationData, setDistanceLD] = useState({});
  const [reviewLocationData, setReviewLD] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("user token is ----> : " + token);

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      setUserLocation({ latitude, longitude });
      try {
        const data = { token, latitude, longitude };
        const locations = await api_post.recommendLocation(data);
        setLocationData(locations);
        setLandomLD(locations.slice(0, 2));
        setDistanceLD(locations.slice(2, 4));
        setReviewLD(locations.slice(4));
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      Alert.alert("위치정보를 가져올 수 없습니다.");
    }
  };
  useEffect(() => {
    getLocation();
    setLoading(false);
  }, [route, navigation]);

  const handleLogout = async () => {
    console.log("logout id : " + token);
    try {
      AsyncStorage.clear();
      await Update.reloadAsync();
    } catch (error) {}
  };

  const renderLocation = (location) => {
    const handleLocationDetail = async () => {
      navigation.navigate("LocationDetail", {
        user: userInfo,
        location: location.item
      });
    };

    const renderSearchLocation = () => {
      console.log(location);
    };

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: 15,
          padding: 10,
          // 범위 살펴보기 위해 설정, 최종시 삭제
          borderWidth: 1
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {location.item.locationName}
        </Text>
        <Button
          title="자세히 보기"
          borderWidth="3"
          onPress={handleLocationDetail}
        ></Button>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "whitesmoke" }}>
          <View>
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                marginTop: 10
              }}
            >
              환영합니다 {userInfo.username}님!
            </Text>
            <Button title="로그아웃" onPress={handleLogout} />
          </View>

          {/* recommend location view */}
          {loading ? (
            <View style={{ padding: 10 }}>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "mistyrose",
                  borderRadius: 50,
                  margin: 2
                }}
              >
                <Text style={styles.recommendTitle}>랜덤추천</Text>
                <FlatList
                  data={randomLocationData}
                  renderItem={renderLocation}
                  keyExtractor={() => uuid.v4()}
                  scrollEnabled={false}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "lavender",
                  borderRadius: 50,
                  margin: 2
                }}
              >
                <Text style={styles.recommendTitle}>거리 기반 추천</Text>
                <FlatList
                  data={distanceLocationData}
                  renderItem={renderLocation}
                  keyExtractor={() => uuid.v4()}
                  scrollEnabled={false}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "moccasin",
                  borderRadius: 50,
                  margin: 2
                }}
              >
                <Text style={styles.recommendTitle}>평점 기반 추천</Text>
                <FlatList
                  data={reviewLocationData}
                  renderItem={renderLocation}
                  keyExtractor={() => uuid.v4()}
                  scrollEnabled={false}
                />
              </View>
            </View>
          ) : (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  recommendTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    marginTop: 10
  }
});
export default MainScreen;
