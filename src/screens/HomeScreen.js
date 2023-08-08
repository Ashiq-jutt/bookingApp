import React, { useLayoutEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import {
  BottomModal,
  ModalFooter,
  ModalButton,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";
import { mvs } from "../config/metraces";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState();
  const route = useRoute();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [item, setItem] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const discountData = [
    {
      text: "Genius",
      description: "You are at genius level one in our loyalty program",
    },
    {
      text: "15% Discounts",
      description: "Complete 5 stays to unlock level 2",
    },
    {
      text: "10% Discounts",
      description: "Enjoy Discounts at participating properties worldwide",
    },
  ];
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking.com",
      headerTitleStyle: {
        fontSize: mvs(20),
        fontWeight: "bold",
        color: "#fff",
        marginLeft: mvs(120),
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: mvs(110),
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#fff"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const customButton = (onConfirm) => (
    <Button
      onPress={onConfirm}
      style={{
        container: { width: "80%", marginHorizontal: "3%" },
        text: { fontSize: 20 },
      }}
      primary
      title="Submit"
    />
  );

  const searchPlaces = (place) => {
    if (!route.params || !selectedDates) {
      Alert.alert(
        "Invalid Details",
        "Please enter all the details",
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

    if (route.params && selectedDates) {
      navigation.navigate("Places", {
        rooms,
        adults,
        children,
        selectedDates,
        place,
      });
    }
  };

  return (
    <>
      <View>
        <Header />

        <ScrollView>
          <View style={styles.container}>
            {/* Destination */}
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={styles.destinationContainer}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholderTextColor="black"
                placeholder={
                  route?.params ? route.params.input : "Enter Your Destination"
                }
              />
            </Pressable>

            {/* Selected Dates */}
            <Pressable style={styles.datesContainer}>
              <Feather name="calendar" size={24} color="black" />
              <DatePicker
                style={styles.datePicker}
                customStyles={styles.datePickerCustom}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(startDate, endDate) =>
                  setSelectedDates(startDate, endDate)
                }
                allowFontScaling={false}
                placeholder={"Select Your Dates"}
                mode={"range"}
              />
            </Pressable>

            {/* Rooms and Guests */}
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.guestsContainer}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholderTextColor="red"
                placeholder={` ${rooms} room • ${adults} adults • ${children} Children`}
              />
            </Pressable>

            {/* Search Button */}
            <Pressable
              onPress={() => searchPlaces(route?.params?.input)}
              style={styles.searchButton}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </View>

          <Text style={styles.travelMoreText}>Travel More spend less</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {discountData.map((data, index) => (
              <Pressable
                onPress={() => setItem(index)}
                key={index}
                style={[
                  styles.discountContainer,
                  {
                    backgroundColor: index === item ? "#003580" : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.discountText,
                    { color: index === item ? "#fff" : "#000" },
                  ]}
                >
                  {data.text}
                </Text>
                <Text
                  style={[
                    styles.discountDescription,
                    { color: index === item ? "#fff" : "#000" },
                  ]}
                >
                  {data.description}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoImage}
              source={{
                uri: "https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png",
              }}
            />
          </View>
        </ScrollView>
      </View>

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["left", "right"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
        style={styles.bottomModal} // Add this style for the BottomModal component
      >
        <ModalContent style={styles.modalContent}>
          <View style={styles.roomsContainer}>
            <Text style={styles.modalText}>Rooms</Text>
            <View style={styles.counterContainer}>
              <Pressable
                onPress={() => setRooms(Math.max(1, rooms - 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>-</Text>
              </Pressable>

              <Text style={styles.counterText}>{rooms}</Text>

              <Pressable
                onPress={() => setRooms((c) => c + 1)}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>+</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.roomsContainer}>
            <Text style={styles.modalText}>Adults</Text>
            <View style={styles.counterContainer}>
              <Pressable
                onPress={() => setAdults(Math.max(1, adults - 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>-</Text>
              </Pressable>

              <Text style={styles.counterText}>{adults}</Text>

              <Pressable
                onPress={() => setAdults((c) => c + 1)}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>+</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.roomsContainer}>
            <Text style={styles.modalText}>Children</Text>
            <View style={styles.counterContainer}>
              <Pressable
                onPress={() => setChildren(Math.max(0, children - 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>-</Text>
              </Pressable>

              <Text style={styles.counterText}>{children}</Text>

              <Pressable
                onPress={() => setChildren((c) => c + 1)}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>+</Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: mvs(20),
    borderColor: "#FFC72C",
    borderWidth: mvs(3),
    borderRadius: mvs(6),
  },
  destinationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(10),
    paddingHorizontal: mvs(10),
    borderColor: "#FFC72C",
    borderWidth: mvs(2),
    paddingVertical: mvs(15),
  },
  datesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(10),
    paddingHorizontal: mvs(10),
    borderColor: "#FFC72C",
    borderWidth: mvs(2),
    paddingVertical: mvs(15),
  },
  datePicker: {
    width: mvs(350),
    height: mvs(30),
    borderRadius: mvs(0),
    borderWidth: mvs(0),
    borderColor: "transparent",
  },
  datePickerCustom: {
    placeholderText: {
      fontSize: mvs(15),
      flexDirection: "row",
      alignItems: "center",
      marginRight: "auto",
    },
    headerStyle: {
      backgroundColor: "#003580",
    },
    contentText: {
      fontSize: mvs(15),
      flexDirection: "row",
      alignItems: "center",
      marginRight: "auto",
    },
  },
  guestsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(10),
    paddingHorizontal: mvs(10),
    borderColor: "#FFC72C",
    borderWidth: mvs(2),
    paddingVertical: mvs(15),
  },
  searchButton: {
    paddingHorizontal: mvs(10),
    borderColor: "#FFC72C",
    borderWidth: mvs(2),
    paddingVertical: mvs(15),
    backgroundColor: "#2a52be",
  },
  searchButtonText: {
    textAlign: "center",
    fontSize: mvs(15),
    fontWeight: "500",
    color: "#fff",
  },
  travelMoreText: {
    marginHorizontal: mvs(20),
    fontSize: mvs(17),
    fontWeight: "500",
  },
  geniusContainer: {
    width: mvs(200),
    height: mvs(150),
    marginTop: mvs(10),
    backgroundColor: "#003580",
    borderRadius: mvs(10),
    padding: mvs(20),
    marginHorizontal: mvs(20),
  },
  geniusText: {
    color: "#fff",
    fontSize: mvs(15),
    fontWeight: "bold",
    marginVertical: mvs(7),
  },
  geniusDescription: {
    color: "#fff",
    fontSize: mvs(15),
    fontWeight: "500",
  },
  discountContainer: {
    width: mvs(200),
    height: mvs(150),
    marginTop: mvs(10),
    borderColor: "#E0E0E0",
    borderWidth: mvs(2),
    borderRadius: mvs(10),
    padding: mvs(20),
    marginHorizontal: mvs(10),
  },
  discountText: {
    fontSize: mvs(15),
    fontWeight: "bold",
    marginVertical: mvs(7),
  },
  discountDescription: {
    fontSize: mvs(15),
    fontWeight: "500",
  },
  logoContainer: {
    marginTop: mvs(40),
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: mvs(200),
    height: mvs(40),
    resizeMode: "cover",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    width: "100%",
    height: mvs(310),
    backgroundColor: "#fff",
    padding: mvs(20),
  },
  roomsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: mvs(15),
  },
  modalButton: {
    marginBottom: mvs(10),
    color: "#fff",
    backgroundColor: "#003580",
  },
  modalText: {
    fontSize: mvs(16),
    color: "#000",
    fontWeight: "500",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(10),
  },
  counterButton: {
    width: mvs(26),
    height: mvs(26),
    borderRadius: mvs(13),
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
  },
  counterText: {
    textAlign: "center",
    fontSize: mvs(20),
    fontWeight: "600",
    paddingHorizontal: mvs(6),
  },
});

export default HomeScreen;
