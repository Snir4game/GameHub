import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import {  database,
    updateDoc,
    doc,
    deleteDoc,} from '../../utilis/Firebase-Config';

const GameView =(props)=> {
  return (
    <View style={styles.Row}>
      <Text style={styles.GameInfo}>{props.GameName.GameName}</Text>
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

    }
})
export default GameView;