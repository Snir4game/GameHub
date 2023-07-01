import { View, Text,StyleSheet,FlatList,Alert, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Searchbar } from 'react-native-paper';
import {  database,
  updateDoc,
  doc,getDocs,collection,
  deleteDoc,} from '../../utilis/Firebase-Config';
  import GameView from './GameView';

const GameList = (props)=> {

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [gameList,setGameList] = useState([]);
  
  //Read all Data from FireBase 
  const getGameList = async() =>{
    try {
      const query = await getDocs(collection(database,'GameSearch'));
      
      setGameList(
        query.docs.map((doc) =>({
          ...doc.data(),
          id: doc.id
          
        }))
      )
    } catch (error) {
      Alert.alert(error);
    }
  }

  useEffect(()=> {
    getGameList();
  
  },[]);

  return (
    <View>
          <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{borderTopLeftRadius:0,borderTopRightRadius:0,backgroundColor:'#ffffff'}}
              />
              <View style={styles.list}>
        {
          gameList.length > 0 ?( <FlatList 
          data={gameList}
          keyExtractor={item =>item.id}
          renderItem={({item}) => <GameView GameName={item}
          releaseDate={item}
          Developer={item}
          Players={item}
          Console={item}
          GameImage={item}
          Genre={item}
          price={item}
          />}
          
          />):(
            <Text>No Data</Text>
          )
        }
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  list:{width:'100%', height:'90%',
}
})

export default GameList;