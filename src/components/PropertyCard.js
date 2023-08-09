import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { mvs } from "../config/metraces";

const PropertyCard = ({
  rooms,
  children,
  property,
  adults,
  selectedDates,
  availableRooms,
}) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate("Info", {
            name: property.name,
            rating: property.rating,
            oldPrice: property.oldPrice,
            newPrice: property.newPrice,
            photos: property.photos,
            availableRooms: property.rooms,
            adults: adults,
            children: children,
            rooms: rooms,
            selectedDates: selectedDates,
          })
        }
        style={styles.container}
      >
        <View>
          <Image style={styles.image} source={{ uri: property.image }} />
        </View>

        <View style={styles.propertyInfoContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.propertyName}>
              {property.name.length > 24
                ? property.name.slice(0, 24) + "..."
                : property.name}
            </Text>
            <AntDesign name="hearto" size={mvs(24)} color="red" />
          </View>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="stars" size={mvs(24)} color="green" />
            <Text>{property.rating}</Text>
            <View style={styles.geniusLevelContainer}>
              <Text style={styles.geniusLevelText}>Genius Level</Text>
            </View>
          </View>

          <Text style={styles.addressText}>
            {property.address.length > 50
              ? property.address.substr(0, 50)
              : property.address}
          </Text>

          <Text style={styles.priceText}>
            Price for 1 Night and {adults} adults
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPriceText}>
              {property.oldPrice * adults}
            </Text>
            <Text style={styles.newPriceText}>
              Rs {property.newPrice * adults}
            </Text>
          </View>

          <View style={styles.roomInfoContainer}>
            <Text style={styles.roomTypeText}>Deluxe Room</Text>
            <Text style={styles.bedInfoText}>Hotel Room : 1 bed</Text>
          </View>

          <View style={styles.dealContainer}>
            <Text style={styles.dealText}>Limited Time deal</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: mvs(15),
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: mvs(20),
    overflow: "hidden",
  },
  image: { height: mvs(233), width: mvs(100) },
  propertyInfoContainer: {
    padding: mvs(10),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  propertyName: {
    width: "65%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(6),
    marginTop: mvs(7),
  },
  geniusLevelContainer: {
    backgroundColor: "#6CB4EE",
    paddingVertical: mvs(3),
    borderRadius: mvs(5),
    width: mvs(100),
  },
  geniusLevelText: {
    textAlign: "center",
    color: "white",
    fontSize: mvs(15),
  },
  addressText: {
    width: "75%",
    marginTop: mvs(6),
    color: "gray",
    fontWeight: "bold",
  },
  priceText: {
    marginTop: mvs(4),
    fontSize: mvs(15),
    fontWeight: "500",
  },
  priceContainer: {
    marginTop: mvs(5),
    flexDirection: "row",
    alignItems: "center",
    gap: mvs(8),
  },
  oldPriceText: {
    color: "red",
    fontSize: mvs(18),
    textDecorationLine: "line-through",
  },
  newPriceText: {
    fontSize: mvs(18),
  },
  roomInfoContainer: {
    marginTop: mvs(6),
  },
  roomTypeText: {
    fontSize: mvs(16),
    color: "gray",
  },
  bedInfoText: {
    fontSize: mvs(16),
    color: "gray",
  },
  dealContainer: {
    backgroundColor: "#6082B6",
    paddingVertical: mvs(2),
    marginTop: mvs(2),
    borderRadius: mvs(5),
    width: mvs(150),
    paddingHorizontal: mvs(3),
  },
  dealText: {
    textAlign: "center",
    color: "white",
  },
});

export default PropertyCard;
