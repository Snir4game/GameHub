import { StyleSheet, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Alert,Title,TextInput,Text } from 'react-native-paper';
import {  database,collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,} from '../../utilis/Firebase-Config';

const AddGame = () => {

  const [game,setGame] = useState('');
  const saveGame = async() => {
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.list}></View>
      <View style={styles.input}>

        <TextInput style={styles.inputText}
            placeholder='Enter your Game'
            keyboardType='default'
            onChangeText={(text) => setGame(text)}
            onSubmitEditing={saveGame}
            value={game}
        />
      </View>
      
    </View>
  )
}

export default AddGame

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#386FA4',
    paddingBottom:70

  },
  header:{width:'100%', height:'15%',backgroundColor:'#2A2D34'},
  list:{width:'100%', height:'70%'},
  input:{width:'100%', height:'15%',backgroundColor:'#ebebeb',padding:10},
  inputText:{width:"100%",height:60,backgroundColor:'#ffffff',fontSize:22,paddingHorizontal:1}
})