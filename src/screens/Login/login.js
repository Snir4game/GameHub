import React ,{useState,useEffect}from "react";
import {StyleSheet,Text,View,Alert,Image} from 'react-native';
import {Button,TextInput,ActivityIndicator,MD2Colors} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {auth} from '../../utilis/Firebase-Config';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';




const login = () =>{

    const [email,setEmail] = useState ("");
    const [password,setPassword] = useState("");
    const [errMessage,setErrMessage] = useState(null);
    const [loginView,setLoginView] = useState(true);

    useEffect(()=>{
        if(errMessage!=null)
            Alert.alert(errMessage);
    },[errMessage])


    const register = async() =>{
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email,password)
    .then((userReg)=>{
        const user =userReg.user;
    }
    )
    .catch((err)=>{
        setErrMessage(err.message)
    })
    }
    const signIn = async() =>{
        await signInWithEmailAndPassword(auth,email,password)
        .then((userSignIn) => {
         const user = userSignIn.user;   
        }).catch((err) => {
            setErrMessage(err.message)
        });
        
    }
        return(
            <View style={styles.main}>
                <View style={styles.gamehubView}>
                    <Text style={styles.gameHubTxt}>Welcome to GameHub</Text>
                    <Image source={{uri:"https://raw.githubusercontent.com/GameHub88/.github/main/profile/logo.png"}} style={styles.logoPic} />
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
                        right = {<TextInput.Icon icon="eye"/>}
                    />
                        <View style={styles.main3}>
                            <View style={styles.btnView}>    
                                <Button
                                    onPress={signIn}
                                    mode='contained-tonal'
                                    icon='account'
                                    buttonColor="#ffffff"
                                    style={styles.Btn}
                                    >Sigh In</Button>
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
                        right = {<TextInput.Icon icon="eye"/>}
                    />
                        <View style={styles.main3}>
                            <View style={styles.btnView}>    
                                <Button
                                    onPress={() => setLoginView(!loginView)}
                                    mode='contained-tonal'
                                    icon='account'
                                    buttonColor="#ffffff"
                                    style={styles.Btn}
                                    >Sigh In</Button>
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
        )
}
const styles =  StyleSheet.create({
    main:{
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff',
        alignItems:'center',
        justifyContent:'center',
        
    },
    main2:{
        borderColor:'#000000',
        borderBottomStartRadius:24,
        borderTopRightRadius:24,
        marginTop:10,
        marginBottom:200,
        flex:1,
        width:'90%',
        height:'90%',
        backgroundColor:'#BFD7EA',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1
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
        marginTop:3,
        borderWidth:0.5,
        borderColor:'#000000'
    },
    logoPic:{
        width:100,
        height:100
    },
    subTitle:{

        fontSize:32,
        margin:10,
        fontWeight:'bold'
    }

})

export default login;