import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import api_get from "../api/api_get";

export default function LocationDetailScreen({ route, navigation }) {
  const [user, setUser] = useState(
    route.params.user ? route.params.user : null
  );
  const [location, setLocation] = useState(
    route.params.location ? route.params.location : null
  );
  const [review, setReview] = useState();
  useEffect(() => {
    navigation.setOptions({
      title: `${location.locationName}`
    });
    setReview(api_get.getLocationReview(location.id));
  }, []);

  return (
    <View>
      <Text>{user.token}</Text>
      <Text>{JSON.stringify(location.id)}</Text>
    </View>
  );
}
