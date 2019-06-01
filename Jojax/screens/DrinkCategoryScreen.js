import React, { Component } from "react";
import { Ionicons, FontAwesome, Entypo, EvilIcons } from "@expo/vector-icons";
import { firebaseStorage } from "../App";
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
  ImageBackground,
  FlatList
} from "react-native";
import bgImage from "../pictures/236.jpg";
import {colors} from "../assets/colors.js";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");


class DrinkCategoryscreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      drinks: props.screenProps.drinks,
      title: this.props.navigation.state.params.title,
      drinksDisplayed: []
    }

  }
  static navigationOptions = ({ navigation }) => ({
   title: `${navigation.state.params.title}`,
    headerTitleStyle: {
      width: '100%',
      fontFamily: "Quicksand-Medium",
      fontSize: 25,
      color: colors.black
    },
  });
  categoryIsSpirit(spirit){
    var spiritArr = ["Gin","Rum","Tequila","Vodka"];
  return spiritArr.includes(spirit);
}

  componentWillMount(){
    console.log(this.state.title);
    let drinksToRender = []
    if(this.categoryIsSpirit(this.state.title)==true){
      if(this.state.title == "Rum"){
        for(let i = 0; i < this.state.drinks.length; i++){
          if (this.state.drinks[i].spirits.hasOwnProperty("White Rum")){
            drinksToRender.push(this.state.drinks[i])
          }
          if (this.state.drinks[i].spirits.hasOwnProperty("Dark Rum")){
            drinksToRender.push(this.state.drinks[i])
          }
      }
      this.setState({drinksDisplayed: drinksToRender})
      }
      else{
      for(let i = 0; i < this.state.drinks.length; i++){
        if (this.state.drinks[i].spirits.hasOwnProperty(this.state.title)){
          drinksToRender.push(this.state.drinks[i])
        }
    }
    this.setState({drinksDisplayed: drinksToRender})
  }
  }
    else{
    for(let i = 0; i < this.state.drinks.length; i++){
      if(this.state.drinks[i].categories.hasOwnProperty(this.state.title)){
        drinksToRender.push(this.state.drinks[i])
      }
    }
    this.setState({drinksDisplayed: drinksToRender})
  }
  }

  renderItem1 = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.seasonalBox}
        onPress={() => this.props.navigation.navigate("SpecDrinks", { drink: item })}
        >
        <Image style={styles.seasonalImage} source={{uri : item.url}} />
        <View style={styles.drinkNameTextContainer}>
          <Text style={styles.seasonalText}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
          <FlatList
            data={this.state.drinksDisplayed}
            renderItem={this.renderItem1}
            keyExtractor={item => item.id}
            numColumns={2}
          />

        <ImageBackground
          style={[styles.fixed, styles.container, {zIndex: -1}]}
          source={bgImage}
              />
          </View>

    );
  }
}
export default DrinkCategoryscreen;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
 scrollview: {
   backgroundColor: 'transparent'
 },

 seasonalImage: {
   width: (WIDTH - 40) / 2,
   height: (WIDTH - 40) / 2,
   margin: 5
 },
 seasonalText: {
   textAlign: 'center',
   fontSize: 18,
   fontFamily: "Quicksand-Bold",
   marginLeft:10,
   color: colors.black,
 },
 seasonalBox: {
   borderRadius: 5,
   backgroundColor: colors.white,
   margin: 5
 },
 drinkNameTextContainer:{
   marginLeft:5,
   marginBottom:5,
   width: (WIDTH - 40) / 2,
 },
});
