import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { mvs } from "../config/metraces";

const UserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "User Details",
      headerTitleStyle: styles.headerTitle,
      headerStyle: styles.headerStyle,
    });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const finalStep = () => {
    if (!firstName || !lastName || !email || !phoneNo) {
      Alert.alert(
        "Invalid Details",
        "Please enter all the fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    if (firstName && lastName && email && phoneNo) {
      navigation.navigate("Confirmation", {
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone no</Text>
        <TextInput
          value={phoneNo}
          onChangeText={(text) => setPhoneNo(text)}
          style={styles.input}
        />
      </View>

      <Pressable style={styles.buttonContainer} onPress={finalStep}>
        <View style={styles.priceInfo}>
          <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>
              {route.params.oldPrice * route.params.adults}
            </Text>
            <Text style={styles.newPrice}>
              Rs {route.params.newPrice * route.params.adults}
            </Text>
          </View>
          <Text style={styles.savings}>
            You Saved {route.params.oldPrice - route.params.newPrice} rupees
          </Text>
        </View>
        <View style={styles.finalStepButton}>
          <Text style={styles.finalStepButtonText}>Final Step</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: mvs(20),
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
  inputContainer: {
    flexDirection: "column",
    gap: mvs(10),
    marginTop: mvs(10),
  },
  inputLabel: {
    fontSize: mvs(16),
  },
  input: {
    padding: mvs(10),
    borderColor: "gray",
    borderWidth: 1,
  },
  buttonContainer: {
    backgroundColor: "white",
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: mvs(40),
    padding: mvs(10),
  },
  priceInfo: {
    flex: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
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
  savings: {
    fontSize: mvs(16),
  },
  finalStepButton: {
    backgroundColor: "#007FFF",
    padding: mvs(10),
    borderRadius: mvs(5),
  },
  finalStepButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: mvs(15),
  },
});

export default UserScreen;
