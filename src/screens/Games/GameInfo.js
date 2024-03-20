import {ScrollView, StyleSheet,} from 'react-native'
import * as React from 'react';
import {Card,Text,TextInput,Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

// game information page
const GameInfo =(props) =>{
  const game = props.route.params.game;

  const [Comment,setComment] = useState('');
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
    <TextInput 
    style={styles.InputText}
    placeholder='Add a Comment about the game'
    keyboardType='default'
    onChangeText={(text) => setComment(text)}
    value={Comment}
    ></TextInput>
    <Button style={styles.addComment}>Add Comment</Button>
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
  },
  InputText:{
    backgroundColor: "#ffffff",
    width: "99%",
    height: 50,
    padding:3,
    borderBottomRightRadius: 24,
    justifyContent:'flex-start',
    margin:2
  },
  addComment:{
    borderWidth:1,
    borderColor:'#000000',
    width:180,
    backgroundColor:'#F8E16C',
    margin:2,
  }
})

export default GameInfo;


