import { View, Text,StyleSheet,FlatList,Alert,RefreshControl,SafeAreaView,
  ScrollView } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import { Searchbar } from 'react-native-paper';
import {  database,
  doc,getDocs,collection,
} from '../../utilis/Firebase-Config';
  import GameView from './GameView';

const GameList = (props)=> {

  const [searchQuery, setSearchQuery] = useState('');
  const [gameList,setGameList] = useState([]);

  const onChangeSearch = query => setSearchQuery(getGameList(query));

  // Refresh List
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getGameList();
    }, 2000);
  }, []);
  
  //Read all Data from FireBase 
  const getGameList = async(query) =>{
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
          renderItem={({item}) => 
          
          <GameView 
            onPress={() => {props.navigation.navigate('Game Info', {game: item})}}
            GameName={item}
            reload={getGameList}
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