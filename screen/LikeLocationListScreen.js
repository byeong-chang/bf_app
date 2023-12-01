import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import api_get from "../api/api_get";
import MapView, { Marker, Callout } from "react-native-maps";

export default function LikeLocationScreen({ route, navigation }) {
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

  const renderLocationDetail = (location) => {
    const handleClick = async () => {
      const locationData = await api_get.getLocation(location.locationId);
      navigation.navigate("LocationDetail", {
        user: user,
        location: locationData.location
      });
    };
    return (
      <Marker
        key={location.locationId}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
        }}
      >
        <Callout style={{}}>
          <View>
            <Text onPress={handleClick}>{location.locationName}</Text>
            {/* <Button title={location.locationName} /> */}
          </View>
        </Callout>
      </Marker>
    );
  };

  return (
    <ScrollView style={{ width: "100%", height: "100%" }}>
      {locations ? (
        <MapView style={{ width: "100%", height: 700 }}>
          {locations.map(renderLocationDetail)}
        </MapView>
      ) : (
        <Text>No Locations</Text>
      )}
    </ScrollView>
  );
}
