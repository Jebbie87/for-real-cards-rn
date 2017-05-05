import React from 'react';
import {
  Animated, Button,
  Text,
} from 'react-native';
import Meteor from 'react-native-meteor';
import { StackNavigator } from 'react-navigation';
import Login from './features/start/login';
import Register from './features/start/register';
import View = Animated.View;
import {ReduxPackages} from './redux-packages';

export interface Props {
  navigation:any;
}
export interface State { }

class HomeScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
<View>
  <Text>Hello, Navigation!</Text>
  <Button
    onPress={() => navigate('Login')}
    title="Login"
  />
</View>

    );
  }
}

export const App = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login },
  Register: {screen: Register }
});
Meteor.connect('ws://localhost:3000/websocket');//do this only once

export let reduxPackages = new ReduxPackages();