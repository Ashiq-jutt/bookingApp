import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { mvs } from "../config/metraces";

const Header = () => {
  const [item, setItem] = useState(0);
  const headerOptions = [
    { icon: "bed", text: "Stays" },
    { icon: "ios-airplane", text: "Flights" },
    { icon: "car", text: "Car Rental" },
    { icon: "uber", text: "Taxi" },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {headerOptions.map((option, index) => (
          <Pressable
            onPress={() => setItem(index)}
            key={index}
            style={[
              styles.optionContainer,
              { borderColor: index === item ? "#fff" : "transparent" },
            ]}
          >
            {option.icon.startsWith("ios") || option.icon.startsWith("md") ? (
              <Ionicons
                name={option.icon}
                size={mvs(26)}
                color="white"
                style={styles.optionIcon}
              />
            ) : (
              <FontAwesome5
                name={option.icon}
                size={mvs(26)}
                color="white"
                style={styles.optionIcon}
              />
            )}
            <Text style={styles.optionText}>{option.text}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003580",
    height: mvs(65),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: mvs(2),
    padding: mvs(8),
    borderRadius: mvs(25),
  },
  optionIcon: {
    marginRight: mvs(2),
  },
  optionText: {
    marginLeft: mvs(8),
    fontWeight: "bold",
    color: "white",
    fontSize: mvs(15),
  },
});

export default Header;
