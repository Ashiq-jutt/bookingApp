import React from "react";
import {
  View,
  FlatList,
  Pressable,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { mvs } from "../config/metraces";

const SearchResults = ({ data, input, setInput }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.place.toLowerCase().includes(input.toLowerCase())) {
            if (input === "") {
              return null;
            }
            return (
              <Pressable
                onPress={() => {
                  setInput(item.place);
                  navigation.navigate("Home", {
                    input: item.place,
                  });
                }}
                style={styles.listItemContainer}
              >
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.placeImage }}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.placeName}>{item.place}</Text>
                  <Text style={styles.shortDescription}>
                    {item.shortDescription}
                  </Text>
                  <Text style={styles.propertyCount}>
                    {item.properties.length} Properties
                  </Text>
                </View>
              </Pressable>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    padding: mvs(10),
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: mvs(10),
  },
  image: {
    width: mvs(70),
    height: mvs(70),
  },
  textContainer: {
    marginLeft: mvs(10),
  },
  placeName: {
    fontSize: mvs(15),
    fontWeight: "500",
  },
  shortDescription: {
    marginVertical: mvs(4),
  },
  propertyCount: {
    color: "gray",
    fontSize: mvs(15),
  },
});
