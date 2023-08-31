import { Text, Platform, View ,StyleSheet} from "react-native";
import {
  GameList,
  AccountInfo,
  AddGame,
  GameNews,
  FavoriteGame,
  GameInfo,
  FavoriteGameList
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome,
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../utilis/Firebase-Config";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "../utilis/Firebase-Config";

// Bottom Navigator Tabs
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarStyle: {
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 71,
    backgroundColor: "#69B578",
  },
};

// Stack tab in navigator
const GameStackNavigator = createNativeStackNavigator();
export const GameStack = (props) => {
  return (
    <GameStackNavigator.Navigator>
      <GameStackNavigator.Screen name="Game List" component={GameList} options={{headerStyle:{backgroundColor:'#D0DB97'}}}/>
      <GameStackNavigator.Screen name='Your Favorite Games' component={FavoriteGameList} options={{ headerShown:false}} />
      <GameStackNavigator.Screen name='Favorite Game' component={FavoriteGame} options={{ headerShown:false}}/>
      <GameStackNavigator.Screen name="Game Info" component={GameInfo} options={{headerStyle:{backgroundColor:'#D0DB97'}}}/>
    </GameStackNavigator.Navigator>
  );
};


export const AppTab = () => {
  
  const [isAdmin,setIsAdmin] = useState(false)


  //check his admin status
  //1. As soon as user logs in, grab the user's doc id.
  //2. Test his admin status.
  //3. Populate the admin state accordingly.
  const adminTest = async () => {
    
    const userRef = collection(database, "UserInfo");
    const q = query(userRef, where("id", "==", auth.currentUser.uid));
    const user = await getDocs(q)
    const userDoc = user.docs.map((x) => x.data());
    setIsAdmin(userDoc[0].isAdmin)

  }

  useEffect(() =>{
    adminTest();
  },[])


  return (
    <Tab.Navigator screenOptions={screenOptions}>
      
          <Tab.Screen
        name="Game Search"
        component={GameStack}
        options={{headerShown:false,tabBarActiveTintColor:'#19647E',tabBarInactiveTintColor:'#000000',        tabBarLabelStyle:{fontWeight:'bold'},
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#3A7D44",
                  width: Platform.OS == "ios" ? 45 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                }}
              >
                <Ionicons
                  name={focused ? "game-controller" : "game-controller-outline"}
                  size={35}
                  color={focused ? "#ecd444" : "#ffffff"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="App News"
        component={GameNews}
        options={{headerStyle:{backgroundColor:'#D0DB97'}
        ,tabBarActiveTintColor:'#19647E',
        tabBarInactiveTintColor:'#000000',
        tabBarLabelStyle:{fontWeight:'bold'},
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name={focused ? "newspaper" : "newspaper-outline"}
                  size={30}
                  color={focused ? "#ecd444" : "#ffffff"}
                />
              </View>
            );
          },
        }}
      />
      {
        isAdmin &&
        <Tab.Screen
        name="Add Game"
        component={AddGame}
        options={{headerStyle:{backgroundColor:'#D0DB97'},
        tabBarActiveTintColor:'#19647E',
        tabBarInactiveTintColor:'#000000',
        tabBarLabelStyle:{fontWeight:'bold'},
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Octicons
                  name="diff-added"
                  size={30}
                  color={focused ? "#ecd444" : "#ffffff"}
                />
              </View>
            );
          },
        }}
      />
      }
      
      <Tab.Screen
        name="Favorite Game"
        component={FavoriteGame}
        options={{headerStyle:{backgroundColor:'#D0DB97'},
        tabBarActiveTintColor:'#19647E',
        tabBarInactiveTintColor:'#000000',
        tabBarLabelStyle:{fontWeight:'bold'},
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name={focused ? "favorite" : "favorite-outline"}
                  size={30}
                  color={focused ? "#ecd444" : "#ffffff"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountInfo}
        options={{ headerStyle:{backgroundColor:'#D0DB97'},
        tabBarActiveTintColor:'#19647E',
        tabBarInactiveTintColor:'#000000',
        tabBarLabelStyle:{fontWeight:'bold'},
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name={focused ? "account-details" : "account-details-outline"}
                  size={30}
                  color={focused ? "#ecd444" : "#ffffff"}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
