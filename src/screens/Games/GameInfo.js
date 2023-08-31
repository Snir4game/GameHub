import {ScrollView, StyleSheet,} from 'react-native'
import * as React from 'react';
import {Card,Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// game information page
const GameInfo =(props) =>{
  const game = props.route.params.game;

    return (
        <LinearGradient style={{width:'100%',height:'100%'}} colors={["#D0DB97","#69B578","#3A7D44","#69B578"]}>
      <ScrollView alwaysBounceHorizontal={false} > 
      <Card style={styles.GameinfoPage}>
      <LinearGradient style={{width:'100%',height:'100%'}} colors={["#D0DB97","#69B578","#3A7D44","#69B578"]}>

    <Card.Cover source={{uri:game.GameImage}} />
    <Text style={styles.GameTextSize}>{game.GameName}</Text>
    <Card.Content style={{padding:30}}>
    <Text style={styles.subTextwhite}>Price: <Text style={styles.txt}>{game.price}</Text></Text>
    <Text style={styles.subTextwhite}>Console: <Text style={styles.txt}>{game.Console}</Text></Text>
    <Text style={styles.subTextwhite}>Release date: <Text style={styles.txt}>{game.GameRelease}</Text></Text>
    <Text style={styles.subTextwhite}>Developer: <Text style={styles.txt}>{game.Developer}</Text></Text>
    <Text style={styles.subTextwhite}>Genre: <Text style={styles.txt}>{game.Genre}</Text></Text>
    <Text style={styles.subTextwhite}>Players: <Text style={styles.txt}>{game.Players}</Text></Text>
    <Text style={styles.subTextwhite}>Summary: <Text style={styles.txt}>{game.Summary}</Text></Text>
    </Card.Content>
    </LinearGradient>
    </Card>
    </ScrollView>
    </LinearGradient>
    )
  }

const styles = StyleSheet.create({
  GameTextSize:{
    fontSize:40,
    color:'#ffffff',
    margin:10
  },
  subText:{
    fontSize:23,fontWeight:"600"
  },
  subTextwhite:{
    fontSize:23,fontWeight:"600",
    color:'#ffffff'
  },
  txt:{
    fontSize:20,
    color:'#ffffff'
  },
  GameinfoPage:{
    width:'100%',
    height:'100%',
  }
})

export default GameInfo;


