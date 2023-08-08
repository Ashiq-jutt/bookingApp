import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { mvs } from "../config/metraces";

const MapScreen = () => {
  const route = useRoute();
  const mapView = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (route?.params?.searchResults) {
      const coords = route?.params?.searchResults?.map((item) =>
        item?.properties?.map((prop) => ({
          latitude: Number(prop?.latitude),
          longitude: Number(prop?.longitude),
        }))
      );
      // Flatten the array of arrays to a single array of coordinates
      const flatCoordinates = [].concat(...coords);
      setCoordinates(flatCoordinates);

      // Fit the map to the coordinates once they are populated
      mapView.current.fitToCoordinates(flatCoordinates, {
        edgePadding: {
          top: mvs(190),
          left: mvs(190),
          bottom: mvs(190),
          right: mvs(190),
        },
      });
    }
  }, [route?.params?.searchResults]);

  return (
    <View style={styles.mapViewContainer}>
      <MapView ref={mapView} style={styles.mapView}>
        {route?.params?.searchResults?.map((item, index1) =>
          item?.properties?.map((property, index) => (
            <Marker
              key={index}
              title={property?.name}
              coordinate={{
                latitude: Number(property?.latitude),
                longitude: Number(property?.longitude),
              }}
            >
              <Pressable style={styles.markerPressable}>
                <Image
                  style={styles.markerImage}
                  source={{
                    uri: property?.image,
                  }}
                />

                {/* Uncomment the following line to check if property?.newPrice is causing any issues */}
                {/* <Text style={styles.markerText}>{property?.newPrice}</Text> */}
              </Pressable>
            </Marker>
          ))
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapViewContainer: {
    flex: 1,
  },
  mapView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  markerPressable: {
    backgroundColor: "#003580",
    paddingHorizontal: mvs(7),
    paddingVertical: mvs(4),
    borderRadius: mvs(4),
  },
  markerImage: {
    width: mvs(90),
    height: mvs(50),
  },
  // Uncomment the following style if property?.newPrice causes any issues
  // markerText: {
  //   fontSize: mvs(15),
  //   color: "white",
  //   textAlign: "center",
  //   fontWeight: "bold",
  // },
});

export default MapScreen;
