import { View,StyleSheet,FlatList,Alert } from "react-native";
import React,{useState,useEffect} from "react";

const AppNews = (props) =>{
return(

<View style={styles.container}>
<View style={styles.ColAppNews}>
    <Text>{props.Update}</Text>
</View>
</View>
)
}

export default AppNews;
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        padding:12,
        width:'100%',
        height:160,
        backgroundColor:"#ffffff",
        marginBottom:12,
        borderRadius:12,
        shadowColor:"#000000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.3,
        shadowRadius:4,
        elevation:5,
    },
    ColAppNews:{
        justifyContent:'space-between',
        height:'100%',
        flexDirection:'row'
    },
})