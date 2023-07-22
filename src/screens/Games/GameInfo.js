import {ScrollView, StyleSheet, View } from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card,Text } from 'react-native-paper';
// game informetion page
const GameInfo =(props) =>{
  const game = props.route.params.game;



  // Update Game Informetion 
  const UpdateGame = async() =>({

  })

    return (
        <Card style={styles.GameinfoPage}>
          <ScrollView>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Text style={styles.GameTextSize}>{game.GameName}</Text>
    <Card.Content>
    <Text style={styles.subText}>Price:<Text style={styles.txt}>{game.price}</Text></Text>
    <Text style={styles.subText}>Console:<Text style={styles.txt}>{game.Console}</Text></Text>
    <Text style={styles.subText}>Release date : <Text style={styles.txt}>{game.GameRelease}</Text></Text>
    <Text style={styles.subText}>Developer: <Text style={styles.txt}>{game.Developer}</Text></Text>
    <Text style={styles.subText}>Genre: <Text style={styles.txt}>{game.Genre}</Text></Text>
    <Text style={styles.subText}>Players <Text style={styles.txt}>{game.Players}</Text>:</Text>
    <Text style={styles.subText}>Summary: <Text style={styles.txt}>{game.Summary}</Text></Text>
    </Card.Content>
    <Button>Edit</Button>
    </ScrollView>
    </Card>
    )
  }

const styles = StyleSheet.create({
  GameTextSize:{
    fontSize:40,
  },
  subText:{
    fontSize:23,fontWeight:"600"
  },
  txt:{
    fontSize:20
  },
  GameinfoPage:{
    width:'100%',
    height:'90%'
  }
})

export default GameInfo;


