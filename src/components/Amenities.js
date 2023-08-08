import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { mvs } from "../config/metraces";

const Amenities = () => {
  const services = [
    {
      id: "0",
      name: "room service",
    },
    {
      id: "2",
      name: "free wifi",
    },
    {
      id: "3",
      name: "Family rooms",
    },
    {
      id: "4",
      name: "Free Parking",
    },
    {
      id: "5",
      name: "swimming pool",
    },
    {
      id: "6",
      name: "Restaurant",
    },
    {
      id: "7",
      name: "Fitness center",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.mostPopularText}>Most Popular Facilities</Text>
      <View style={styles.mapContaner}>
        {services.map((item, index) => (
          <View style={styles.itemContaner} key={index}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({
  container: { padding: mvs(10) },
  mostPopularText: { fontSize: 17, fontWeight: "600" },
  mapContaner: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  itemContaner: {
    margin: 10,
    backgroundColor: "#007FFF",
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 25,
  },
  itemName: { textAlign: "center", color: "white" },
});
