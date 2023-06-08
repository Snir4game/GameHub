import React ,{useState,useEffect,useRef}from "react";
import {StyleSheet,Text,View,Alert,Image} from 'react-native';
import {Button,TextInput,ActivityIndicator,MD2Colors} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {auth} from '../../utilis/Firebase-Config';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
//import lottie
import LottieView from 'lottie-react-native';
//mix colors
import { LinearGradient } from 'expo-linear-gradient';



const login = () =>{

    
    const [email,setEmail] = useState ("");
    const [password,setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errMessage,setErrMessage] = useState(null);
    const [loginView,setLoginView] = useState(true);
    const[isLoading, setIsLoading] = useState(false);


const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };



    useEffect(()=>{
        if(errMessage!=null)
            Alert.alert(errMessage);
    },[errMessage])

    const animation =useRef(null);
    useEffect(()=>{
        animation.current?.play(1)
    },[])

    const register = async() =>{
        setErrMessage(null);
        try {
            const user = await createUserWithEmailAndPassword(auth,email,password);
        } catch (error) {
            setErrMessage(error.message)
        }
    }
    const signIn = async() =>{
        setIsLoading(true)
        try {
            const user = await signInWithEmailAndPassword(auth,email,password)
            setIsLoading(false)
        } catch (error) {
            setErrMessage(error.errMessage);
            setIsLoading(false)
        }
        
    }
        return(
            <LinearGradient style={{width:'100%',height:'100%'}} colors={["#ffffff",'#a2aebb','#a2aebb','#071013','#000000']}>
            <View style={styles.main}>
                <View style={styles.gamehubView}>
                    <Text style={styles.gameHubTxt}>Welcome to GameHub</Text>
                    <LottieView
                    ref={animation}
                    style={{width:200,height:200}}
                    source={require('../../../Pics/121990-game.json')}
                    loop={false}
                    duration={3000}
                    />
                </View>
                {
                    loginView?(
                        <View style={styles.main2}>
                            <Text style={styles.subTitle}>Sign In</Text>
                    <TextInput 
                        keyboardType='email-address'
                        autoCapitalize="none"
                        style={styles.txtInput}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                        />
                    <TextInput 
                        label="Password"
                        keyboardType='default'
                        secureTextEntry={true}
                        style={styles.txtInput}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        right = {<TextInput.Icon icon={passwordVisible ? 'eye' : 'eye-off'}
                            onPress={togglePasswordVisibility}
                            onTouchEnd={() => {
                            if (passwordVisible) {
                                setPasswordVisible();
                                }
                            }
                        }
                        />}
                    />
                        <View style={styles.main3}>
                            <View style={styles.btnView}>    
                                {
                                    isLoading? (<ActivityIndicator size='large' color={MD2Colors.blueA100} />) : (
                                        <Button
                                    onPress={signIn}
                                    mode='contained-tonal'
                                    icon='account'
                                    buttonColor="#ffffff"
                                    style={styles.Btn}
                                    >Sign In</Button>
                                    )
                                }
                                <Button
                                    onPress={() => setLoginView(!loginView)}
                                    mode='contained-tonal'
                                    icon=''
                                    buttonColor="#FFFFFF"
                                    style={styles.Btn}
                                >Register</Button>
                            </View>
                        </View>
                    </View>
                    ):(
                        <View style={styles.main2}>
                        <Text style={styles.subTitle}>Register</Text>
                    <TextInput 
                        keyboardType='email-address'
                        autoCapitalize="none"
                        style={styles.txtInput}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                        />
                    <TextInput 
                        label="Password"
                        keyboardType='default'
                        secureTextEntry={true}
                        style={styles.txtInput}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        right = {<TextInput.Icon icon={passwordVisible ? 'eye' : 'eye-off'}
                        onPress={togglePasswordVisibility}
                        onTouchEnd={() => {
                            if (passwordVisible) {
                                setPasswordVisible();
                                }
                            }
                        }
                        />}
                    />
                        <View style={styles.main3}>
                            <View style={styles.btnView}>    
                                <Button
                                    onPress={() => setLoginView(!loginView)}
                                    mode='contained-tonal'
                                    icon='account'
                                    buttonColor="#ffffff"
                                    style={styles.Btn}
                                    >Sign In</Button>
                                <Button
                                    onPress={register}
                                    mode='contained-tonal'
                                    icon=''
                                    buttonColor="#FFFFFF"
                                    style={styles.Btn}
                                >Register</Button>
                            </View>
                        </View>
                    </View> 
                    )
                }
                    
            </View>
            </LinearGradient>

        )
}
const styles =  StyleSheet.create({
    main:{
        flex:1,
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        
    },
    main2:{
        borderColor:'#000000',
        borderBottomStartRadius:24,
        borderTopRightRadius:24,
        flex:1,
        width:'90%',
        height:'100%',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        borderWidth:2,

        
    },
    main3:{
        margin:10,
    },
    txtInput:{
        backgroundColor:'#ffffff',
        width:'80%',
        height:40,
        margin:12,
        borderWidth:1
    },
    gameHubTxt:{
        fontSize:32,
        fontWeight:'bold'
    },
    gamehubView:{
        marginTop:100,
        justifyContent:'center',
        alignItems:'center'
    },
    Btn:{
        margin:3,
        borderWidth:0.5,
        borderColor:'#000000',
    },
    subTitle:{
        fontSize:32,
        margin:10,
        fontWeight:'bold'
    },
    btnView:{
        flexDirection:'row'
    }

})

export default login;