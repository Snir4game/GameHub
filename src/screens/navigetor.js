import { Text, Platform, View } from "react-native";
import {
  GameList,
  AccountInfo,
  AddGame,
  GameNews,
  FavoriteGame,
  GameInfo,
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

// Botton Navigator Tabs
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarStyle: {
    tabBarShowLabel: false,
    headerShown: false,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 80,
    background: "#000000",
  },
};

const GameStackNavigator = createNativeStackNavigator();
export const GameStack = () => {
  return (
    <GameStackNavigator.Navigator>
      <GameStackNavigator.Screen
        name="Game List"
        component={GameList}
        options={{ title: ""}}
        
      />
      <GameStackNavigator.Screen name="Game Info" component={GameInfo} />
    </GameStackNavigator.Navigator>
  );
};

export const AppTab = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Game Search"
        component={GameStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0f52ba",
                  width: Platform.OS == "ios" ? 45 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                }}
              >
                <Ionicons
                  name={focused ? "game-controller" : "game-controller-outline"}
                  size={25}
                  color={focused ? "#000000" : "#000000"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="App News"
        component={GameNews}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name={focused ? "newspaper" : "newspaper-outline"}
                  size={25}
                  color={focused ? "#000000" : "#000000"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Add Game"
        component={AddGame}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Octicons
                  name="diff-added"
                  size={25}
                  color={focused ? "#000000" : "#000000"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite Game"
        component={FavoriteGame}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name={focused ? "favorite" : "favorite-outline"}
                  size={25}
                  color={focused ? "#E0115F" : "#000000"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountInfo}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name={focused ? "account-details" : "account-details-outline"}
                  size={25}
                  color={focused ? "#4FC978" : "#000000"}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
