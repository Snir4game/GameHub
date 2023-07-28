import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import {
  Button,
  TextInput,
  ActivityIndicator,
  MD2Colors,
  shadow,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../utilis/Firebase-Config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
//import lottie
import LottieView from "lottie-react-native";
//mix colors
import { LinearGradient } from "expo-linear-gradient";
//Data for account
import { database, collection, addDoc } from "../../utilis/Firebase-Config";
//fonts
import * as Font from "expo-font";

import AppLoading from "expo-app-loading";
import { SafeAreaView } from "react-native-safe-area-context";


//admin@gamehub.com
const login = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("sniramsalem1995@gmail.com");
  const [password, setPassword] = useState("asd123asd");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [errMessage, setErrMessage] = useState();
  const [loginView, setLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [FontLoaded, setFontLoaded] = useState(false);
  const [isLoadingReg, setIsLoadingReg] = useState(false);

  // Reset Password with Email
  const ChangePassword = () => {
    try {
      sendPasswordResetEmail(auth, email);
      Alert.alert("We have Send you a mail to Reset the Password");
      setPassword("");
    } catch (error) {
      Alert.alert("Somethings Wrong with your email");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (errMessage != null) Alert.alert(errMessage);
  }, [errMessage]);
  //Animetion gif
  const animation = useRef(null);
  useEffect(() => {
    animation.current?.play(1);
  }, []);

  //Register
  const register = async () => {
    setErrMessage(null);
    setIsLoadingReg(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const UserInfo = await addDoc(collection(database, "UserInfo"), {
        id: user.user.uid,
        FirstName: fName,
        LastName: lName,
        Email: email,
      });
      setIsLoadingReg(true);
    } catch (error) {
      setErrMessage(error.message);
      setIsLoadingReg(false);
    }
  };

  //SignIn mathod
  const signIn = async () => {
    setErrMessage(null);
    setIsLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      AsyncStorage.setItem("User", "New Age");
      Alert.alert("Welcome to GameHub");
      setIsLoading(true);
    } catch (error) {
      setErrMessage(
        "Opps something is Worng Check again your Email or Password"
      );
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  //Custom Fonts
  const fetchFont = () => {
    return Font.loadAsync({
      "Orbitron-Regular": require("../../../assets/Fonts/Orbitron-Regular.ttf"),
      "Orbitron-Medium": require("../../../assets/Fonts/Orbitron-Medium.ttf"),
    });
  };
  if (!FontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <LinearGradient
      style={{ width: "100%", height: "100%" }}
      colors={[
        "#000000",
        "#ffffff",
        "#a2aebb",
        "#a2aebb",
        "#000000",
        "#000000",
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <View style={styles.gamehubView}>
            <Text style={styles.gameHubTxt}>Welcome to GameHub</Text>
            <LottieView
              ref={animation}
              style={{ width: 200, height: 200, bottom: 35 }}
              source={require("../../../Pics/121990-game.json")}
              loop={false}
              duration={5000}
            />
          </View>
          {loginView ? (
            <View style={styles.main2}>
              <Text style={styles.subTitle}>Sign In</Text>
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.txtInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
              />
              <TextInput
                label="Password"
                keyboardType="default"
                secureTextEntry={!passwordVisible}
                style={styles.txtInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye" : "eye-off"}
                    onPress={togglePasswordVisibility}
                  />
                }
                onTouchEnd={() => {
                  if (passwordVisible) {
                    togglePasswordVisibility();
                  }
                }}
              />
              <View style={styles.main3}>
                <View style={styles.btnView}>
                  {isLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={MD2Colors.blueA100}
                    />
                  ) : (
                    <Button
                      textColor="#000000"
                      onPress={signIn}
                      mode="outlined"
                      icon="account"
                      buttonColor="#ffffff"
                      style={styles.Btn}
                    >
                      Sign In
                    </Button>
                  )}
                  <Button
                    textColor="#000000"
                    onPress={() => setLoginView(!loginView)}
                    mode="outlined"
                    icon=""
                    buttonColor="#FFFFFF"
                    style={styles.Btn}
                  >
                    Register
                  </Button>
                </View>
                <Button
                  textColor="#000000"
                  onPress={ChangePassword}
                  mode="outlined"
                  buttonColor="#FFFFFF"
                  style={styles.Btn}
                >
                  Forget Password?
                </Button>
              </View>
            </View>
          ) : (
            <View style={styles.main2}>
              <Text style={styles.subTitle}>Register</Text>
              <TextInput
                keyboardType="default"
                autoCapitalize="none"
                style={styles.txtInput}
                value={fName}
                onChangeText={(text) => setFname(text)}
                placeholder="First Name"
              />
              <TextInput
                keyboardType="default"
                autoCapitalize="none"
                style={styles.txtInput}
                value={lName}
                onChangeText={(text) => setLname(text)}
                placeholder="Last Name"
              />
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.txtInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
              />
              <TextInput
                label="Password"
                keyboardType="default"
                secureTextEntry={true}
                style={styles.txtInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                right={
                  <TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} />
                }
              />
              <View style={styles.main3}>
                <View style={styles.btnView}>
                  <Button
                    textColor="#000000"
                    onPress={() => setLoginView(!loginView)}
                    mode="outlined"
                    icon="account"
                    buttonColor="#ffffff"
                    style={styles.Btn}
                  >
                    Sign In
                  </Button>
                  {isLoadingReg ? (
                    <ActivityIndicator
                      size="large"
                      color={MD2Colors.blueA100}
                    />
                  ) : (
                    <Button
                      textColor="#000000"
                      onPress={register}
                      mode="outlined"
                      icon=""
                      buttonColor="#FFFFFF"
                      style={styles.Btn}
                    >
                      Register
                    </Button>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  main2: {
    borderColor: "#000000",
    borderBottomStartRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    width: "90%",
    height: "60%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderWidth: 2,
    bottom: 120,
  },
  main3: {
    margin: 10,
  },
  txtInput: {
    backgroundColor: "#ffffff",
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  gameHubTxt: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Orbitron-Medium",
    bottom: 40,
  },
  gamehubView: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  Btn: {
    margin: 3,
    borderWidth: 0.5,
    borderColor: "#000000",
  },
  subTitle: {
    fontSize: 40,
    margin: 10,
    fontWeight: "bold",
    fontFamily: "Orbitron-Regular",
  },
  btnView: {
    flexDirection: "row",
  },
});

export default login;
