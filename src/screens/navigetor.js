import { Text,Platform,View } from "react-native";
import{GameList,AccountInfo,AddGame,GameNews,FavoriteGame} from '../screens';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons,FontAwesome,Octicons,MaterialCommunityIcons,MaterialIcons    } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const screenOptions ={
    tabBarStyle:{
        tabBarShowLabel:false,
        headerShown:false,
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        elevation:0,
        height:80,
        background:'#fff'
    }
}


export const AppTab = () => {
    return(
        <Tab.Navigator screenOptions={screenOptions} >
            <Tab.Screen name="Game Search" component={GameList} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',
                    justifyContent: 'center' ,
                    backgroundColor: '#59A5D8',
                    width: Platform.OS == "ios" ? 45 : 50,
                    height: Platform.OS == 'ios' ? 40 : 50,
                    top: Platform.OS == 'ios' ? -10 : -20,
                    borderRadius: Platform.OS == 'ios' ? 25 : 30,
                    }}>
                        <Ionicons name={focused ? "game-controller" : "game-controller-outline"} size={24} color={focused ? "#000000" : "#000000"} />
                    </View>
                    )
                }
            }}/>
            <Tab.Screen name="Game News" component={GameNews} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',justifyContent:'center' }}>
                        <Ionicons name={focused ?"newspaper":"newspaper-outline"} size={24} color={focused ? "#386FA4" : "#000000"} />
                    </View>
                    )
                }
            }}/>
            <Tab.Screen name="Add Game" component={AddGame} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',justifyContent:'center' }}>
                        <Octicons name="diff-added" size={24} color={focused ? "#386FA4" : "#000000"} />
                    </View>
                    )
                }
            }}/>
            <Tab.Screen name="Favorite Game" component={FavoriteGame} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',justifyContent:'center' }}>
                        <MaterialIcons name={focused ? "favorite" : "favorite-outline"} size={24} color={focused ? "#386FA4" : "#000000"} />
                    </View>
                    )
                }
            }}/>
            <Tab.Screen name="Account" component={AccountInfo} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',justifyContent:'center' }}>
                        <MaterialCommunityIcons name={focused ?"account-details":"account-details-outline"} size={24} color={focused ? "#386FA4" : "#000000"} />
                    </View>
                    )
                }
            }}
            />
        </Tab.Navigator>
    )
}


