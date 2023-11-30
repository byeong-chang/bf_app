import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import api_get from "../api/api_get";
import MapView, { Marker, Callout } from "react-native-maps";

export default function LikeLocationScreen({ route }) {
  const [token, setToken] = useState(
    route.params.token ? route.params.token : route.params.value
  );
  const [user, setUser] = useState(route.params.user);
  console.log(user);
  const [locations, setLocations] = useState();

  const likeLocations = async () => {
    const res = await api_get.showAllLikeLocation(user.token);
    setLocations(res);
  };
  useEffect(() => {
    likeLocations();
  }, [route]);

  const renderLocationDetail = (location) => (
    <Marker
      key={location.locationId}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude
      }}
    >
      <Callout>
        <View>
          <Text onPress={() => console.log(location.locationName)}>
            {location.locationName}
          </Text>
        </View>
      </Callout>
    </Marker>
  );
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        {locations ? (
          <MapView style={{ width: "100%", height: 500 }}>
            {locations.map(renderLocationDetail)}
          </MapView>
        ) : (
          <Text>No Locations</Text>
        )}
      </ScrollView>
    </View>
  );
}
