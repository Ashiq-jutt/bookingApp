import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Amenities from "../components/Amenities";
import { mvs } from "../config/metraces";

const RoomsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Available Rooms",
      headerTitleStyle: styles.headerTitle,
      headerStyle: styles.headerStyle,
    });
  }, []);

  const [selected, setSelected] = useState([]);

  const handleSelectRoom = (roomName) => {
    setSelected(selected.includes(roomName) ? [] : [roomName]);
  };

  const handleReserve = () => {
    if (selected.length > 0) {
      navigation.navigate("User", {
        oldPrice: route.params.oldPrice,
        newPrice: route.params.newPrice,
        name: route.params.name,
        children: route.params.children,
        adults: route.params.adults,
        rating: route.params.rating,
        startDate: route.params.startDate,
        endDate: route.params.endDate,
      });
    }
  };

  return (
    <>
      <ScrollView>
        {route.params.rooms.map((item, index) => (
          <Pressable
            style={styles.roomContainer}
            key={index}
            onPress={() => handleSelectRoom(item.name)}
          >
            <View style={styles.roomHeader}>
              <Text style={styles.roomName}>{item.name}</Text>
              <AntDesign name="infocirlceo" size={mvs(24)} color="#007FFF" />
            </View>
            <Text style={styles.roomDetail}>pay at the property</Text>
            <Text style={styles.roomDetailGreen}>
              Free cancellation Available
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.oldPrice}>{route.params.oldPrice}</Text>
              <Text style={styles.newPrice}>Rs {route.params.newPrice}</Text>
            </View>
            <Amenities />

            {selected.includes(item.name) ? (
              <Pressable
                style={styles.selectedButton}
                onPress={() => setSelected([])}
              >
                <Text style={styles.selectedButtonText}>SELECTED</Text>
                <Entypo name="circle-with-cross" size={mvs(24)} color="red" />
              </Pressable>
            ) : (
              <Pressable
                style={styles.selectButton}
                onPress={() => handleSelectRoom(item.name)}
              >
                <Text style={styles.selectButtonText}>SELECT</Text>
              </Pressable>
            )}
          </Pressable>
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <Pressable onPress={handleReserve} style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </Pressable>
      )}
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
  roomContainer: {
    margin: mvs(10),
    backgroundColor: "white",
    padding: mvs(10),
  },
  roomHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roomName: {
    color: "#007FFF",
    fontSize: mvs(17),
    fontWeight: "500",
  },
  roomDetail: {
    marginTop: mvs(3),
    fontSize: mvs(16),
  },
  roomDetailGreen: {
    marginTop: mvs(3),
    color: "green",
    fontSize: mvs(16),
  },
  priceContainer: {
    marginTop: mvs(4),
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(10),
  },
  oldPrice: {
    fontSize: mvs(18),
    color: "red",
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: mvs(18),
  },
  selectButton: {
    borderColor: "#007FFF",
    borderWidth: mvs(2),
    borderRadius: mvs(5),
    padding: mvs(10),
  },
  selectButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: mvs(16),
    color: "#007FFF",
  },
  selectedButton: {
    borderColor: "#318CE7",
    backgroundColor: "#F0F8FF",
    borderWidth: mvs(2),
    width: "100%",
    padding: mvs(10),
    borderRadius: mvs(5),
    flexDirection: "row",
    alignItems: "center",
  },
  selectedButtonText: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#318CE7",
    fontWeight: "bold",
    fontSize: mvs(16),
  },
  reserveButton: {
    backgroundColor: "#007FFF",
    padding: mvs(8),
    marginBottom: mvs(30),
    borderRadius: mvs(3),
    marginHorizontal: mvs(15),
  },
  reserveButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: mvs(16),
  },
});

export default RoomsScreen;
