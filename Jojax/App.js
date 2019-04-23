import React, { Component} from 'react';
import { Ionicons,FontAwesome,Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Drinks from './screens/Drinks'
import Explore from './screens/Explore'
import More from './screens/More'
import MyPage from './screens/MyPage'
import  { Asset, Font } from 'expo';


const TabOptions = createBottomTabNavigator({
  Explore:{
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: ({tintColor}) => (
        <FontAwesome name='wpexplorer' color={tintColor} size={28}>
        </FontAwesome>
      )
    }
  },
  Drinks:{
    screen: Drinks,
    navigationOptions: {
      tabBarLabel: 'DRINKS',
      tabBarIcon: ({tintColor}) => (
        <Entypo name='drink' color={tintColor} size={28}>
        </Entypo>
      )
    }
  },
  MyPage:{
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: 'MYPAGE',
      tabBarIcon: ({tintColor}) => (
        <FontAwesome name='user-circle-o' color={tintColor} size={28}>
        </FontAwesome>
      )
    }
  },
  More:{
    screen: More,
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

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      fontLoaded: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Amazonas': require('./assets/fonts/Amazonas.ttf')
    }).then(() => {
      this.setState({fontLoaded: true})
    })

  }

  render(){
    return (
      <View style={{flex: 1}}>
      { this.state.fontLoaded == true ? (
        <Text style={{textAlign: 'center', marginTop: 100}}> bajbajbajsbjasdb </Text>
      ) : (<Text> Loading... </Text>)
      }

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Amazonas',
  },
  headline: {
    marginTop: 10,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 25,

  },
  headerbox:{
    backgroundColor: 'white',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'

  },
  loadingText:{
    margin: 24,
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e'


  }
});
