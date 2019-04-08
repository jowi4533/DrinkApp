import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Drinks from './screens/Drinks'
import Explore from './screens/Explore'
import More from './screens/More'
import MyPage from './screens/MyPage'

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//           <Text>hej kevin</Text>
//       </View>
//     );
//   }
// }
const TabOptions = createBottomTabNavigator({
  Explore:{
    screen: Explore
  },
  Drinks:{
    screen: Drinks
  },
  MyPage:{
    screen: MyPage
  },
  More:{
    screen: More
  }

})

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
