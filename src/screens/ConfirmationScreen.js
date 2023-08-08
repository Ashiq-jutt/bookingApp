import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
// import { useDispatch } from "react-redux";
// import { savedPlaces } from "../SavedReducer";
// import { setDoc, doc } from "firebase/firestore";
// import { auth, db } from "../firebase";
import { mvs } from "../config/metraces";

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Confirmation",
      headerTitleStyle: styles.headerTitle,
      headerStyle: styles.headerStyle,
    });
  }, []);

  //   const dispatch = useDispatch();
  //   const uid = auth.currentUser.uid;

  const confirmBooking = async () => {
    // dispatch(savedPlaces(route.params));

    // await setDoc(
    //   doc(db, "users", `${uid}`),
    //   {
    //     bookingDetails: { ...route.params },
    //   },
    //   {
    //     merge: true,
    //   }
    // );

    // navigation.navigate("Main");
    console.log("🚀 ~ file: ConfirmationScreen.js:40 ~ confirmBooking ~ Main:");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>
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
            <Text style={styles.sustainableBadgeText}>Travel sustainable</Text>
          </View>
        </View>

        <View style={styles.checkInOutContainer}>
          <View style={styles.checkInOutItem}>
            <Text style={styles.checkInOutLabel}>Check In</Text>
            <Text style={styles.checkInOutDate}>{route.params.startDate}</Text>
          </View>

          <View style={styles.checkInOutItem}>
            <Text style={styles.checkInOutLabel}>Check Out</Text>
            <Text style={styles.checkInOutDate}>{route.params.endDate}</Text>
          </View>
        </View>

        <View style={styles.roomsGuestsContainer}>
          <Text style={styles.roomsGuestsLabel}>Rooms and Guests</Text>
          <Text style={styles.roomsGuestsText}>
            {route.params.rooms} rooms {route.params.adults} adults{" "}
            {route.params.children} children
          </Text>
        </View>

        <Pressable onPress={confirmBooking} style={styles.bookNowButton}>
          <Text style={styles.bookNowButtonText}>Book Now</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    margin: mvs(10),
    padding: mvs(10),
  },
  cardContent: {
    marginHorizontal: mvs(12),
    marginTop: mvs(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  hotelInfo: {},
  hotelName: {
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
  bookNowButton: {
    backgroundColor: "#003580",
    width: mvs(120),
    padding: mvs(5),
    marginHorizontal: mvs(12),
    marginBottom: mvs(20),
    borderRadius: mvs(4),
  },
  bookNowButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: mvs(15),
    fontWeight: "bold",
  },
});

export default ConfirmationScreen;
