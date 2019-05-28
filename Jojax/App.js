import React, { Component} from 'react';
import { Ionicons,FontAwesome,Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Drinkscreen from './screens/Drinkscreen'
import Explorescreen from './screens/Explorescreen'
import Morescreen from './screens/Morescreen'
import  { Asset, Font } from 'expo';

import MyNotesscreen from './screens/MyNotesscreen'
import MyPagescreen from './screens/MyPagescreen'
import MyBarscreen from './screens/MyBarscreen'
import DrinkCategoryScreen from './screens/DrinkCategoryScreen'
import MyFavoriteDrinksscreen from './screens/MyFavoriteDrinksscreen'
import Registerscreen from './screens/Registerscreen'
import Loginscreen from './screens/Loginscreen'
import SpecificDrinkscreen from './screens/SpecificDrinkscreen'
import NewNotescreen from './screens/NewNotescreen'
import EditNotescreen from './screens/EditNotescreen'

import firebase from 'firebase'
//-------------------------------//
//Firebase stuff
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

//Everything database related (text, passwords, users etc)

let database = firebase.database();
let drinksDB = database.ref('Drinks')
let usersDB = database.ref('Users');
export {usersDB};
//Everything Storage (Images) related

let firebaseStorage = firebase.storage();
let imagesRef = firebaseStorage.ref('Drinkpictures')

//-------------------------------//

const MyPageStack = createStackNavigator(
  {
  MyPage: {screen: MyPagescreen},
  MyBar: {screen: MyBarscreen},
  MyFavoriteDrinks: {screen: MyFavoriteDrinksscreen},
  MyNotes: {screen: MyNotesscreen },
  Register: {screen: Registerscreen},
  Login: {screen: Loginscreen},
  SpecDrinks: {screen: SpecificDrinkscreen},
  NewNote: {screen: NewNotescreen},
  EditNote: {screen: EditNotescreen}
  },
  {
  headerLayoutPreset: 'center'
  }
);
const DrinkStack = createStackNavigator({
  AllDrinks: {screen: Drinkscreen},
  SpecDrinks: {screen: SpecificDrinkscreen},
  },
  {
    headerLayoutPreset: 'center'
  }
);
const ExploreStack = createStackNavigator({
  Explore: {screen: Explorescreen},
  SpecDrinks: {screen: SpecificDrinkscreen},
  DrinkCategory: {screen: DrinkCategoryScreen}
  },
  {
    headerLayoutPreset: 'center'
  }
);

const TabNavigator = createBottomTabNavigator({
  Explore:{
    screen: ExploreStack,
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
      title: "More",
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
      fontLoaded: false,
      userKeys: null,
      usersDB: usersDB,

      allDrinkItems: null,
      allDrinkKeys: null,

      drinks: [],

      loaded: false,

    }
    this.loadResources()
  }

  async componentDidMount(){
  await Font.loadAsync({

    'Quicksand-Bold' : require('./fonts/Quicksand-Bold.ttf'),
      'Quicksand-Light' : require('./fonts/Quicksand-Light.ttf'),
        'Quicksand-Medium' : require('./fonts/Quicksand-Medium.ttf'),
         'Quicksand-Regular' : require('./fonts/Quicksand-Regular.ttf'),
  }).then(()=>{
        this.setState({ fontLoaded: true });
  })
};

  loadResources(){
    this.initailizeListener()
  }

  initailizeListener () {
    usersDB.once("value", this.retrieveUserKeys.bind(this), this.errData);
    drinksDB.once("value", this.retriveDrinkItems.bind(this), this.errData)
  }

  retriveDrinkItems (data)  {
    this.setState({allDrinkItems: data.val()});
    this.setState({allDrinkKeys: Object.keys(data.val())});

    this.loadDrinks()
    this.setState({loaded:true})

  }

  retrieveUserKeys  (data)  {
    this.setState({userKeys: Object.keys(data.val())});
    //console.log(this.state.keys);
    //console.log("testingkeys")
  }

  errData = (err) =>{
    console.log('Error!');
    console.log(err);
  }

  loadDrinks(){

    let allDrinks = []
    for (let i = 0; i < this.state.allDrinkKeys.length; i++){
      let k = this.state.allDrinkKeys[i];
      let drink = {
        name: this.state.allDrinkItems[k].name,
        url: this.state.allDrinkItems[k].URL,
        ingredients: this.state.allDrinkItems[k].Ingredients,
        categories: this.state.allDrinkItems[k].Categories,
        instructions: this.state.allDrinkItems[k].Preparation_instructions,
      }
      allDrinks.push(drink)
    }
    this.setState({drinks: allDrinks})
  }

  render(){
    if(this.state.loaded === true){
      return (

          <AppContainer screenProps ={this.state}>
          </AppContainer>
    

      );
    }
    else{
      return null
    }

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
