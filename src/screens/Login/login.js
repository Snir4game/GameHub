import React ,{useState,useEffect}from "react";
import {StyleSheet,Text,View,Alert} from 'react-native';
import {Button,TextInput,ActivityIndicator,MD2Colors} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../utilis/Firebase-Config";



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
        setErrMessage(null);
        try {
            const user = await createUserWithEmailAndPassword(auth,email,password);
        } catch (error) {
            setErrMessage(error.message)
        }
    }
    const signIn = async() =>{
        setErrMessage(null);
        try {
            const user = await signInWithEmailAndPassword(email,password);
            AsyncStorage.setItem('Account',JSON.stringify({
            useEmail:user.user.email,
            use_uid:user.user.uid,
            use_token:user.user.stsTokenManger.accessToken
            })) 
        } 
        catch (error) {
        setErrMessage(error.message);
        }
    }
        return(
            <View style={styles.main}>
                <View style={styles.gamehubView}>
                    <Text style={styles.gameHubTxt}>Welcome to GameHub</Text>
                </View>
                {
                    loginView?(
                    <View style={styles.main2}>
                        <Text style={{fontSize:32,margin:10}}>Sign In</Text>
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
                                    onPress={register}
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
                        <Text style={{fontSize:32,margin:10}}>Register</Text>
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
        backgroundColor:'#FABC3C',
        alignItems:'center',
        justifyContent:'center',
        
    },
    main2:{
        borderColor:'#000000',
        borderBottomStartRadius:24,
        borderTopRightRadius:24,
        marginTop:130,
        marginBottom:200,
        flex:1,
        width:'90%',
        height:'90%',
        backgroundColor:'#FFB238',
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
    btnView:{
        
    }

})

export default login;