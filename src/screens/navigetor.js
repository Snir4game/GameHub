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
        height:70,
        background:'#fff'
    }
}
export default function App(){
return(
    <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions} >
            <Tab.Screen name="Game Search" component={GameList} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',
                    justifyContent: 'center' ,
                    backgroundColor: '#F2AF29',
                    width: Platform.OS == "ios" ? 40 : 50,
                    height: Platform.OS == 'ios' ? 40 : 50,
                    top: Platform.OS == 'ios' ? -10 : -20,
                    borderRadius: Platform.OS == 'ios' ? 25 : 30,
                    }}>
                        <Ionicons name="game-controller-outline" size={24} color={focused ? "#AD343E" : "#000000"} />
                    </View>
                    )
                }
            }}/>
            <Tab.Screen name="Game News" component={GameNews} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',justifyContent:'center' }}>
                        <FontAwesome name="newspaper-o" size={24} color={focused ? "#AD343E" : "#000000"} />
                    </View>
                    )
                }
            }}/>
            <Tab.Screen name="Add Game" component={AddGame} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',justifyContent:'center' }}>
                        <Octicons name="diff-added" size={24} color={focused ? "#AD343E" : "#000000"} />
                    </View>
                    )
                }
            }}/>
            <Tab.Screen name="Favorite Game" component={FavoriteGame} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',justifyContent:'center' }}>
                        <MaterialIcons name="favorite-outline" size={24} color={focused ? "#AD343E" : "#000000"} />
                    </View>
                    )
                }
            }}/>
            <Tab.Screen name="Account" component={AccountInfo} options={{
                tabBarIcon:({focused}) => {
                    return(
                    <View style={{alignItems:'center',justifyContent:'center' }}>
                        <MaterialCommunityIcons name="account-details-outline" size={24} color={focused ? "#AD343E" : "#000000"} />
                    </View>
                    )
                }
            }}
            />
        </Tab.Navigator>
    </NavigationContainer>
)}