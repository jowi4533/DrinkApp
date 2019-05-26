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
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");


class DrinkCategoryscreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      drinks: props.screenProps.drinks,
      title: this.props.navigation.state.params.title.toLowerCase(),
      drinksDisplayed: []
    }

  }
  static navigationOptions = ({ navigation }) => ({
   title: `${navigation.state.params.title}`,
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25,
    },
  });

  componentWillMount(){
    let drinksToRender = []

    for(let i = 0; i < this.state.drinks.length; i++){
      if(this.state.drinks[i].categories.hasOwnProperty(this.state.title)){
        drinksToRender.push(this.state.drinks[i])
      }
    }
    this.setState({drinksDisplayed: drinksToRender})


  }

  renderItem1 = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.seasonalBox}
        onPress={() => this.props.navigation.navigate("")}
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
      <View style={{paddingBottom:40}}>
          <FlatList
            data={this.state.drinksDisplayed}
            renderItem={this.renderItem1}
            keyExtractor={item => item.id}
            numColumns={2}
          />

        <ImageBackground
          style={[styles.fixed, styles.containter, {zIndex: -1}]}
          source={bgImage}
              />
          </View>

    );
  }
}
export default DrinkCategoryscreen;

const styles = StyleSheet.create({
  containter: {
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
 seasonalDrinksText: {
   fontSize: 25,
   fontWeight: "bold",
   marginTop: 10,
   marginLeft: 10,
   marginBottom: 10
 },
 seasonalImage: {
   width: (WIDTH - 40) / 2,
   height: (WIDTH - 40) / 2,
   margin: 5
 },
 seasonalText: {
   fontSize: 18,
   fontWeight: "bold",
   marginLeft:5
 },
 seasonalBox: {
   backgroundColor: "white",
   margin: 5
 },
 drinkNameTextContainer:{
   width: (WIDTH - 40) / 2,
   paddingRight: 5,
 },
 headline: {
   textAlign: "center", // <-- the magic
   fontWeight: "bold",
   fontSize: 25
 },
 headerbox: {
   height: 40,
   borderBottomWidth: 1,
   borderBottomColor: "#dddddd"
 }

});
