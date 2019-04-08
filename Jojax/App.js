
import React from 'react';
import { Ionicons,FontAwesome,Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Drinks from './screens/Drinks'
import Explore from './screens/Explore'
import More from './screens/More'
import MyPage from './screens/MyPage'


const TabOptions = createBottomTabNavigator({
  Explore:{
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: ({tintColor}) => (
        <FontAwesome name='wpexplorer' color={tintColor} size={32}>
        </FontAwesome>
      )
    }
  },
  Drinks:{
    screen: Drinks,
    navigationOptions: {
      tabBarLabel: 'DRINKS',
      tabBarIcon: ({tintColor}) => (
        <Entypo name='drink' color={tintColor} size={32}>
        </Entypo>
      )
    }
  },
  MyPage:{
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: 'MYPAGE',
      tabBarIcon: ({tintColor}) => (
        <FontAwesome name='user-circle-o' color={tintColor} size={32}>
        </FontAwesome>
      )
    }
  },
  More:{
    screen: More,
    navigationOptions: {
      tabBarLabel: 'MORE',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name='md-more' color={tintColor} size={32}>
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

// const TabBarOptions1 = {
//   tabBarOptions: {
//     activeTintColor:'red',
//     inactiveTintColor:'grey'
//   }


const AppContainer = createAppContainer(TabOptions);
export default AppContainer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
