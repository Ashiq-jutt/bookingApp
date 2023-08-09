import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { mvs } from "../config/metraces";

const BookingScreen = () => {
  const bookings = useSelector((state) => state.booking.booking);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Bookings",
      headerTitleStyle: styles.headerTitle,
      headerStyle: styles.header,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {bookings.length > 0 &&
        bookings.map((item, index) => (
          <Pressable style={styles.bookingItem} key={index}>
            <View>
              <Text style={styles.hotelName}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="stars" size={mvs(24)} color="green" />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.ratingDot}>•</Text>
                <View style={styles.geniusLevelContainer}>
                  <Text style={styles.geniusLevelText}>Genius Level</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#003580",
    height: mvs(110),
    borderBottomColor: "transparent",
    shadowColor: "transparent",
  },
  headerTitle: {
    fontSize: mvs(20),
    fontWeight: "bold",
    color: "white",
    marginLeft: mvs(130),
  },
  bookingItem: {
    backgroundColor: "white",
    marginVertical: mvs(10),
    marginHorizontal: mvs(20),
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: mvs(14),
    borderRadius: mvs(6),
  },
  hotelName: {
    fontSize: mvs(24),
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: mvs(7),
  },
  ratingText: {
    marginLeft: mvs(3),
    fontSize: mvs(15),
    fontWeight: "400",
  },
  ratingDot: {
    marginLeft: mvs(3),
  },
  geniusLevelContainer: {
    padding: mvs(6),
    borderRadius: mvs(4),
    width: mvs(100),
    backgroundColor: "#0039a6",
    marginLeft: mvs(4),
    borderRadius: mvs(5),
  },
  geniusLevelText: {
    textAlign: "center",
    color: "white",
    fontSize: mvs(13),
    fontWeight: "400",
  },
});

export default BookingScreen;
