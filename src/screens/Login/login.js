import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Alert} from "react-native";
import {
  Button,
  TextInput,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../utilis/Firebase-Config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
//import lottie
import LottieView from "lottie-react-native";
//mix colors
import { LinearGradient } from "expo-linear-gradient";
//Data for account
import { database, collection, addDoc } from "../../utilis/Firebase-Config";
//fonts

import { doc, setDoc } from "firebase/firestore";



const login = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar,setAvatar] = useState("../../../Pics/istockphoto-1290933921-612x612.jpg")
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [loginView, setLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReg, setIsLoadingReg] = useState(false);
  const [emailVerified,setEmailVerified] = useState(false);
  const [age,setAge]=useState("");
  const [phone,setPhone]= useState("");

  // Reset Password with Email
  // פונקציה זו שולחת הודעת מייל למשתמש שרשום בטקסט של המייל ושולח לו מייל שנותן לו אפשרות לשנות סיסמה 
  const ChangePassword = () => {
    try {
      sendPasswordResetEmail(auth, email);
      Alert.alert("We have Send you a mail to Reset the Password");
    } catch (error) {
      Alert.alert("Somethings Wrong with your email");
    }
  };
  // password Visibility 
  // תצוגה של הסיסמה האם היא ניתנת לראות אותה או לא 
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
  // הרשמה לאפליקציה 
  const register = async () => {
    setErrMessage(null);
    setIsLoadingReg(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const UserInfo = await setDoc(doc(database, "UserInfo",user.user.uid), {
        id: user.user.uid,
        FirstName: fName,
        LastName: lName,
        Email: email,
        Picture:avatar,
        emailVerified:emailVerified,
        isAdmin:false,
        FavoriteGames:[],
        Age:age,
        Phone:phone
      });
      Alert.alert("Welcome to GameHub "+fName);
      setIsLoadingReg(true);
    } catch (error) {
      if(email==''||password==''){
        Alert.alert("Please fill an Email or password");
      }
      else{
        Alert.alert("Email already Registered try other one "+email);
      }
      setIsLoadingReg(false);
    }
  };

  //SignIn method
  // התחברות עם משתמש 
  const signIn = async () => {
    setErrMessage(null);
    setIsLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Welcome to GameHub "+fName);
      AsyncStorage.getItem("User");
      setIsLoading(true);
    } catch (error) {
      if(email==''||password==''){
        Alert.alert('please fill the email input or the password input')
      }
      else{
      Alert.alert("something is Wrong Check again your Email or Password");
      }
      setIsLoading(false);
      setPassword("");
    }
  };
  
  return (
    <LinearGradient
      style={{ width: "100%", height: "100%" }}
      colors={[
        "#D0DB97","#69B578","#3A7D44","#69B578","#254D32"
      ]}
    >
        <View style={styles.main}>
          <View style={styles.gamehubView}>
            <Text style={styles.gameHubTxt}>Welcome to GameHub</Text>
            <LottieView
              ref={animation}
              style={{ width: 200, height: 250 ,bottom:25}}
              source={require("../../../Pics/121990-game.json")}
              loop={false}
              duration={5000}
            />
          </View>
          {loginView ? (
            <View style={styles.sighInView}>
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
            <View style={styles.registerView}>
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
                keyboardType='number-pad'
                autoCapitalize="none"
                style={styles.txtInput}
                value={age}
                onChangeText={(text) => setAge(text)}
                placeholder="Age"
              />
              <TextInput
                keyboardType='name-phone-pad'
                autoCapitalize="none"
                style={styles.txtInput}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone"
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
                secureTextEntry={!passwordVisible}
                style={styles.txtInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                right={
                  <TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} 
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
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  main: {
    flex:1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  sighInView: {
    borderColor: "#000000",
    borderBottomStartRadius: 24,
    borderTopRightRadius: 24,
    width: "80%",
    height: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    bottom: 110,
  },
  registerView:{
    borderColor:'#000000',
    width:'85%',
    height:'70%',
    borderWidth:2,
    borderBottomStartRadius: 24,
    borderTopRightRadius: 24,
    justifyContent:'center',
    alignItems:'center',
    bottom:90,
  },
  main3: {
    margin: 10,
  },
  txtInput: {
    backgroundColor: "#ffffff",
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  gameHubTxt: {
    fontSize: 32,
    fontWeight: "bold",
    bottom: 1,
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
    justifyContent:'flex-start',
  },
  btnView: {
    flexDirection: "row",
  },
});

export default login;
