import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mvs = (value) => value * (Dimensions.get("window").height / 1000);

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Detials",
        "Please enter all the credentials",
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
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials._tokenResponse.email;
        const uid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${uid}`), {
          email: user,
          phone: phone,
        });
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Create an Account</Text>
        </View>

        <View style={styles.formContainer}>
          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email id"
              placeholderTextColor={"black"}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={"black"}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Enter your Phone No"
              placeholderTextColor={"black"}
              style={styles.input}
            />
          </View>
        </View>

        <Pressable onPress={register} style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.signInLink}
        >
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: mvs(10),
    alignItems: "center",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: mvs(100),
  },
  title: {
    color: "#003580",
    fontSize: mvs(17),
    fontWeight: "700",
  },
  subtitle: {
    marginTop: mvs(15),
    fontSize: mvs(18),
    fontWeight: "500",
  },
  formContainer: {
    marginTop: mvs(50),
  },
  inputLabel: {
    fontSize: mvs(18),
    fontWeight: "600",
    color: "gray",
  },
  inputContainer: {
    marginTop: mvs(15),
  },
  input: {
    fontSize: mvs(18),
    borderBottomColor: "gray",
    borderBottomWidth: mvs(1),
    marginVertical: mvs(10),
    width: mvs(300),
  },
  registerButton: {
    width: mvs(200),
    backgroundColor: "#003580",
    padding: mvs(15),
    borderRadius: mvs(7),
    marginTop: mvs(50),
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: mvs(17),
    fontWeight: "bold",
  },
  signInLink: {
    marginTop: mvs(20),
  },
  signInText: {
    textAlign: "center",
    color: "gray",
    fontSize: mvs(17),
  },
});

export default RegisterScreen;
