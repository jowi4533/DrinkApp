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
import bgImage from '../pictures/236.jpg'
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

      <View style = {styles.ingredientsContainer}>
      <ImageBackground source={bgImage} style= {styles.backgroundContainer}>
      <View style = {styles.ingredientSheet}>

      </View>

      <View style ={styles.preparationSheet}>

      </View>

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
    flex: 1,
    backgroundColor: 'grey',
    alignSelf: 'stretch'
  },

  imageDrink: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  },
  ingredientsContainer:{
    flex:60
  },
  backgroundContainer:{
    flex:1,
    width: null,
    height: null,
    alignItems:'center'
  },
  ingredientSheet:{
    backgroundColor:'white',
    height:HEIGHT/2,
    width:WIDTH -20,
    margin:10,
    border: 2
  },
  preparationSheet:{

  }



});
