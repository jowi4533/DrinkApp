import React, { Component} from "react";
import { Ionicons,FontAwesome,Entypo,EvilIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground

} from "react-native";
import drImage from '../pictures/gin_drink.jpg'
const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');

class Drinkscreen extends Component {
  render(){
    return (
      <SafeAreaView style={styles.container}>

      <View style = {styles.imageDrinkContainer}>
      <ImageBackground style={styles.imageDrink}
          source={drImage}
        >
       </ImageBackground>
      </View>



      </SafeAreaView>
    );
  }
}
export default Drinkscreen;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  imageDrinkContainer: {
    height: HEIGHT * 0.35,
    backgroundColor: 'grey',
  },

  imageDrink: {
  flex: 1,
   width: null,
   height: null,
   resizeMode: 'contain'

  }



});
