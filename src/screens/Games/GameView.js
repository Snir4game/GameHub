import { View, Text,StyleSheet } from 'react-native';
import {  database,
    updateDoc,
    doc,
    deleteDoc,} from '../../utilis/Firebase-Config';
import React,{useState,useEffect} from 'react';
import { Searchbar } from 'react-native-paper';

    
    const GameView =(props)=> {
      
  return (
    <View style={styles.Row}>
      <View style={styles.ColGameInfo}>
      <Text style={styles.GameInfo}>{props.GameName.GameName}</Text>
      <Text style={styles.littletxt}>Release Date: {props.releaseDate.GameRelease} </Text>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    Row:{
        flexDirection:'row',
        padding:10,
        width:'100%',
        height:60,
        backgroundColor:"#fff",
        marginBottom:12,
        borderRadius:12,
        shadowColor:"#000000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.3,
        shadowRadius:4,
        elevation:5
    },
    GameInfo:{
        fontSize:22,

    },
    littletxt:{
      fontSize:14,
    },
    ColGameInfo:{
      flexDirection:'column',
      height:'100%',
      width:'100%'
    }
})
export default GameView;