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

import SpecificDrinkscreen from './screens/SpecificDrinkscreen'


const config = {
  apiKey: "AIzaSyA5TqttcjP9G88qkAEenf1rfDe0B1E9v3E",
  authDomain: "drinknic-e6779.firebaseapp.com",
  databaseURL: "https://drinknic-e6779.firebaseio.com",
  projectId: "drinknic-e6779",
  storageBucket: "drinknic-e6779.appspot.com",
  messagingSenderId: "210609393019"
};

if(!firebase.apps.length){
    firebase.initializeApp(config);
}

const database = firebase.database();
const usersDB = database.ref('Users');
export {usersDB};


const MyPageStack = createStackNavigator(
  {
  MyPage: {screen: MyPagescreen},
  MyBar: {screen: MyBarscreen},
  MyFavoriteDrinks: {screen: MyFavoriteDrinksscreen},
  MyNotes: {screen: MyNotesscreen},
  Register: {screen: Registerscreen},
  Login: {screen: Loginscreen},
  }
);
const DrinkStack = createStackNavigator(
  {
    Drink: {screen:Drinkscreen},
    SpecDrinks: {screen:SpecificDrinkscreen }
}
);

const TabNavigator = createBottomTabNavigator({
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
    screen: DrinkStack,
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
const AppContainer = createAppContainer(TabNavigator);
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      addUserListener: this.initailizeListener(),
      keys: null
    }
  }

  initailizeListener = () => {
    usersDB.on("value", this.retrieveUserKeys, this.errData);
  }

  retrieveUserKeys = (data) => {
    this.setState({keys: Object.keys(data.val())});
    console.log(this.state.keys);
    console.log("hej hora")
  }

  errData = (err) =>{
    console.log('Error!');
    console.log(err);
  }

  render(){
    return (
      <AppContainer users = {this.state.keys}>
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
