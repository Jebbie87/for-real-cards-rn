import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'

import StartGame from '../startGame'
import JoinGame from '../joinGame'
import HomeScreen from '../home'
import Login from '../login'
import Register from '../register'
import EditProfile from '../editProfile'
import ImageBrowser from '../imageBrowser'

const StartOrJoinGameTabsRouter = {
  StartGame: { screen: StartGame },
  joinGame: { screen: JoinGame },
}

const StartOrJoinGameTabsConfig = {
  tabBarPosition: 'top',
  backBehavior: 'none',
  tabBarOptions: {
    labelStyle: {
      fontSize: 20,
      justifyContent: 'center',
      marginBottom: 13,
    }
  }
}

const EditProfileScreen = StackNavigator({
  Edit: { screen: EditProfile },
  ImageBrowser: { screen: ImageBrowser },
})

export const StartOrJoinGameTabs = TabNavigator(
  StartOrJoinGameTabsRouter,
  StartOrJoinGameTabsConfig
)

export const Navigator = StackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: Register },
  StartGame: { screen: StartGame },
  JoinGame: { screen: JoinGame },
  StartOrJoinGame: { screen: StartOrJoinGameTabs },
  EditProfileScreen: { screen: EditProfileScreen },
});
  // Login: { screen: Login },