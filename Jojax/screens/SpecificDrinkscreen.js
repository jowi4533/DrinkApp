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
import drImage from '../pictures/vodka_drink.jpg'
const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');


console.log(WIDTH)
class Drinkscreen extends Component {
  testIT(){
    console.log(WIDTH)
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>

      <View style = {{flex:40}}>
      <View style = {styles.imageDrinkContainer}>
      <ImageBackground style={styles.imageDrink}
          source={drImage}
        >
       </ImageBackground>
       </View>
      </View>

      <View style = {{flex:60}}>
      <TouchableOpacity style = {{width:50,height:50}} onPress={() => this.testIT()}>
      </TouchableOpacity>

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
    flex: 1,
    backgroundColor: 'grey',
    alignSelf: 'stretch'
  },

  imageDrink: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'


  }



});
