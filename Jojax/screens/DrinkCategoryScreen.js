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

const data2 = [
  {
    id: 1,
    name: "Cranberry Sangria",
    category: "Fall",
    image: require("../pictures/cranberry_sangria.png") },
  {
    id: 2,
    name: "Lavender Lemonade Mojito",
    category: "Spring",
    image: require("../pictures/lavendel_2.png") },
  {
    id: 3,
    name: "Pear Mojito",
    category: "Summer",
    image: require("../pictures/pear_mojito.png") },
  {
    id: 4,
    name: "Very Merry Bourbon Alexander",
    category: "Winter",
    image: require("../pictures/very_merry_bourbon_alexander.png") },
    {
      id: 5,
      name: "Pear Mojito",
      category: "Summer",
      image: require("../pictures/pear_mojito.png") },
    {
      id: 6,
      name: "Very Merry Bourbon Alexander",
      category: "Winter",
      image: require("../pictures/very_merry_bourbon_alexander.png") },
      {
        id: 7,
        name: "Cranberry Sangria",
        category: "Fall",
        image: require("../pictures/cranberry_sangria.png") },
      {
        id: 8,
        name: "Lavender Lemonade Mojito",
        category: "Spring",
        image: require("../pictures/lavendel_2.png") }
];

class DrinkCategoryscreen extends Component {



  renderItem1 = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.seasonalBox}
        onPress={() => this.props.navigation.navigate("")}
        >
        <Image style={styles.seasonalImage} source={item.image} />
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
          <View style={styles.headerbox}>
            <Text style={styles.headline}>{data2[0].category}</Text>
          </View>
          <FlatList
            data={data2}
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
