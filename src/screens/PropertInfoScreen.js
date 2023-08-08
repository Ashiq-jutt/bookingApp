import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { mvs } from "../config/metraces";
import Amenities from "../components/Amenities";

const PropertyInfoScreen = () => {
  const [more, setMore] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${route.params.name}`,
      headerTitleStyle: styles.headerTitle,
      headerStyle: styles.headerStyle,
    });
  }, []);
  const difference = route.params.oldPrice - route.params.newPrice;
  const offerPrice = (Math.abs(difference) / route.params.oldPrice) * 100;
  return (
    <>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable style={styles.photoContainer}>
            {more
              ? route?.params?.photos.map((photo) => (
                  <View style={styles.photoItem} key={photo.id}>
                    <Image
                      style={styles.photoImage}
                      source={{ uri: photo.image }}
                    />
                  </View>
                ))
              : route?.params?.photos.slice(0, 5).map((photo) => (
                  <View style={styles.photoItem} key={photo.id}>
                    <Image
                      style={styles.photoImage}
                      source={{ uri: photo.image }}
                    />
                  </View>
                ))}
            <Pressable
              onPress={() => setMore(!more)}
              style={styles.showMoreButton}
            >
              <Text style={styles.showMoreButtonText}>
                {more ? "Show Less" : "Show More"}
              </Text>
            </Pressable>
          </Pressable>

          <View style={styles.propertyInfoContainer}>
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyName}>
                {route.params.name.slice(0, 20)}
              </Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="stars" size={24} color="green" />
                <Text style={styles.ratingText}>{route.params.rating}</Text>
                <View style={styles.geniusBadge}>
                  <Text style={styles.geniusBadgeText}>Genius Level</Text>
                </View>
              </View>
            </View>

            <View style={styles.sustainableBadge}>
              <Text style={styles.sustainableBadgeText}>
                Travel sustainable
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          <Text style={styles.priceLabel}>
            Price for 1 Night and {route.params.adults} adults
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>
              {route.params.oldPrice * route.params.adults}
            </Text>
            <Text style={styles.newPrice}>
              Rs {route.params.newPrice * route.params.adults}
            </Text>
          </View>
          <View style={styles.offerBadge}>
            <Text style={styles.offerBadgeText}>
              {offerPrice.toFixed(0)} % OFF
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.checkInOutContainer}>
            <View style={styles.checkInOutItem}>
              <Text style={styles.checkInOutLabel}>Check In</Text>
              <Text style={styles.checkInOutDate}>
                {route.params.selectedDates.startDate}
              </Text>
            </View>

            <View style={styles.checkInOutItem}>
              <Text style={styles.checkInOutLabel}>Check Out</Text>
              <Text style={styles.checkInOutDate}>
                {route.params.selectedDates.endDate}
              </Text>
            </View>
          </View>
          <View style={styles.roomsGuestsContainer}>
            <Text style={styles.roomsGuestsLabel}>Rooms and Guests</Text>
            <Text style={styles.roomsGuestsText}>
              {route.params.rooms} rooms {route.params.adults} adults{" "}
              {route.params.children} children
            </Text>
          </View>

          <View style={styles.separator} />

          <Amenities />

          <View style={styles.separator} />
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={() =>
          navigation.navigate("Rooms", {
            rooms: route?.params?.availableRooms,
            oldPrice: route?.params?.oldPrice,
            newPrice: route?.params?.newPrice,
            name: route?.params?.name,
            children: route?.params?.children,
            adults: route?.params?.adults,
            rating: route?.params?.rating,
            startDate: route?.params?.selectedDates?.startDate,
            endDate: route?.params?.selectedDates?.endDate,
          })
        }
        style={styles.selectAvailabilityButton}
      >
        <Text style={styles.selectAvailabilityButtonText}>
          Select Availability
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#003580",
    height: mvs(110),
    borderBottomColor: "transparent",
    shadowColor: "transparent",
  },
  headerTitle: {
    fontSize: mvs(20),
    fontWeight: "bold",
    color: "white",
  },
  photoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: mvs(10),
  },
  photoItem: {
    margin: mvs(6),
  },
  photoImage: {
    width: mvs(107),
    height: mvs(90),
    borderRadius: mvs(4),
  },
  showMoreButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  showMoreButtonText: {
    textAlign: "center",
    marginLeft: mvs(20),
  },
  propertyInfoContainer: {
    marginHorizontal: mvs(12),
    marginTop: mvs(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  propertyInfo: {},
  propertyName: {
    fontSize: mvs(25),
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(6),
    marginTop: mvs(7),
  },
  ratingText: {},
  geniusBadge: {
    backgroundColor: "#003580",
    paddingVertical: mvs(3),
    borderRadius: mvs(5),
    width: mvs(100),
  },
  geniusBadgeText: {
    textAlign: "center",
    color: "white",
    fontSize: mvs(15),
  },
  sustainableBadge: {
    backgroundColor: "#17B169",
    paddingHorizontal: mvs(6),
    paddingVertical: mvs(4),
    borderRadius: mvs(6),
  },
  sustainableBadgeText: {
    color: "white",
    fontSize: mvs(13),
  },
  separator: {
    borderColor: "#E0E0E0",
    borderWidth: mvs(3),
    height: mvs(1),
    marginTop: mvs(15),
  },
  priceLabel: {
    marginTop: mvs(10),
    fontSize: mvs(17),
    fontWeight: "500",
    marginHorizontal: mvs(12),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: mvs(12),
    marginTop: mvs(4),
    gap: mvs(8),
  },
  oldPrice: {
    color: "red",
    fontSize: mvs(20),
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: mvs(20),
  },
  offerBadge: {
    marginHorizontal: mvs(12),
    marginTop: mvs(7),
    backgroundColor: "green",
    paddingHorizontal: mvs(4),
    paddingVertical: mvs(5),
    width: mvs(78),
    borderRadius: mvs(4),
  },
  offerBadgeText: {
    textAlign: "center",
    color: "white",
  },
  checkInOutContainer: {
    margin: mvs(12),
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(60),
  },
  checkInOutItem: {},
  checkInOutLabel: {
    fontSize: mvs(16),
    fontWeight: "600",
    marginBottom: mvs(3),
  },
  checkInOutDate: {
    fontSize: mvs(16),
    fontWeight: "bold",
    color: "#007FFF",
  },
  roomsGuestsContainer: {
    margin: mvs(12),
  },
  roomsGuestsLabel: {
    fontSize: mvs(16),
    fontWeight: "600",
    marginBottom: mvs(3),
  },
  roomsGuestsText: {
    fontSize: mvs(16),
    fontWeight: "bold",
    color: "#007FFF",
  },
  selectAvailabilityButton: {
    backgroundColor: "#003580",
    // backgroundColor: "#6CB4EE",
    borderRadius: mvs(4),
    position: "absolute",
    bottom: mvs(20),
    padding: mvs(15),
    width: "95%",
    marginHorizontal: mvs(10),
  },
  selectAvailabilityButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: mvs(17),
  },
});

export default PropertyInfoScreen;
