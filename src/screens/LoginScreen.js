import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { mvs } from "../config/metraces";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log("user details", user);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Main");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.signInText}>Sign In</Text>
          <Text style={styles.signInDescription}>Sign In to Your Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="enter your email id"
              placeholderTextColor={"black"}
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={"black"}
              style={styles.textInput}
            />
          </View>
        </View>

        <Pressable onPress={login} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.signUpTextContainer}
        >
          <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
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
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: mvs(100),
  },
  signInText: {
    color: "#003580",
    fontSize: mvs(17),
    fontWeight: "700",
  },
  signInDescription: {
    marginTop: mvs(15),
    fontSize: mvs(18),
    fontWeight: "500",
  },
  inputContainer: {
    marginTop: mvs(50),
  },
  inputItem: {
    marginBottom: mvs(15),
  },
  inputLabel: {
    fontSize: mvs(18),
    fontWeight: "600",
    color: "gray",
  },
  textInput: {
    fontSize: mvs(18),
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: mvs(10),
    width: mvs(300),
  },
  loginButton: {
    width: mvs(200),
    backgroundColor: "#003580",
    padding: mvs(15),
    borderRadius: mvs(7),
    marginTop: mvs(50),
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: mvs(17),
    fontWeight: "bold",
  },
  signUpTextContainer: {
    marginTop: mvs(20),
  },
  signUpText: {
    textAlign: "center",
    color: "gray",
    fontSize: mvs(17),
  },
});

export default LoginScreen;
