import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Searchbar } from 'react-native-paper';

const GameList = ()=> {

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View>
          <Searchbar
                placeholder="Search "
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{borderTopLeftRadius:0,borderTopRightRadius:0}}
              />
    </View>
  )
}

export default GameList;