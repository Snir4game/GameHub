import {StyleSheet, View } from 'react-native'
import * as React from 'react';
import { Avatar, Button, Card,Text } from 'react-native-paper';
// game information page
const GameInfo =(props) =>{


  const game = props.route.params.game;

    return (
        <Card>
    <Text style={styles.GameTextSize}>{game.GameName}</Text>
    <Card.Content>
    <Text style={styles.subText}>Price: {game.price}</Text>
    <Text style={styles.subText}>Console: {game.Console}</Text>
    <Text style={styles.subText}>Release date : {game.GameRelease}</Text>
    <Text style={styles.subText}>Game Developer: {game.Developer}</Text>
    <Text style={styles.subText}>Genre: {game.Genre}</Text>
    <Text style={styles.subText}>Players :{game.Players}</Text>
    <Text style={styles.subText}>Summary: {game.Summary}</Text>
    </Card.Content>
    <Button>Edit</Button>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    </Card>
    )
  }

const styles = StyleSheet.create({
  GameTextSize:{
    fontSize:40
  },
  subText:{
    fontSize:20
  }
})

export default GameInfo;


