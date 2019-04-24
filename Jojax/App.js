import React, { Component} from 'react';
import { Ionicons,FontAwesome,Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Drinkscreen from './screens/Drinkscreen'
import Explorescreen from './screens/Explorescreen'
import Morescreen from './screens/Morescreen'
import  { Asset, Font } from 'expo';

import MyPagescreen from './screens/MyPagescreen'
import MyBarscreen from './screens/MyBarscreen'
import MyFavoriteDrinksscreen from './screens/MyFavoriteDrinksscreen'
import MyNotesscreen from './screens/MyNotesscreen'
import Registerscreen from './screens/Registerscreen'
import Loginscreen from './screens/Loginscreen'

const MyPageStack = createStackNavigator({
  MyPage: MyPagescreen,
  MyBar: MyBarscreen,
  MyFavoriteDrinks: MyFavoriteDrinksscreen,
  MyNotes: MyNotesscreen,
  Register: Registerscreen,
  Login: Loginscreen,


});

const TabOptions = createBottomTabNavigator({
  Explore:{
    screen: Explorescreen,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: ({tintColor}) => (
        <FontAwesome name='wpexplorer' color={tintColor} size={28}>
        </FontAwesome>
      )
    }
  },
  Drinks:{
    screen: Drinkscreen,
    navigationOptions: {
      tabBarLabel: 'DRINKS',
      tabBarIcon: ({tintColor}) => (
        <Entypo name='drink' color={tintColor} size={28}>
        </Entypo>
      )
    }
  },
  MyPageStack:{
    screen: MyPageStack,
    navigationOptions: {
      tabBarLabel: 'MYPAGE',
      tabBarIcon: ({tintColor}) => (
        <FontAwesome name='user-circle-o' color={tintColor} size={28}>
        </FontAwesome>
      )
    }
  },
  More:{
    screen: Morescreen,
    navigationOptions: {
      tabBarLabel: 'MORE',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name='md-more' color={tintColor} size={28}>
        </Ionicons>
      )
    }
  }},
  {
    tabBarOptions: {
      activeTintColor:'red',
      inactiveTintColor:'grey',
      labelStyle:{
        fontSize: 13,
      } ,
      style: {
        borderTopWidth: 1,
        height: 64,
      }
    }
  }
)
const AppContainer = createAppContainer(TabOptions);
class App extends Component {
  render(){
    return (
        <AppContainer>
        </AppContainer>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
