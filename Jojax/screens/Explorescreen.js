import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  FlatList

} from "react-native";

import drImage from "../pictures/long_isle.png";
import bgImage from "../pictures/236.jpg";
import aperol from "../pictures/aperol_spritz.png"

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const data = [
  { id: 1, name: "Long Isle Ice Tea", image: require("../pictures/long_isle.png") },
  { id: 2, name: "Aperol Spritz", image: require("../pictures/aperol_spritz.png") },
  { id: 3,name: "Long Isle Ice Tea", image: require("../pictures/long_isle.png") },
  { id: 4,name: "Aperol Spritz", image: require("../pictures/aperol_spritz.png") },
  { id: 5,name: "Long Isle Ice Tea", image: require("../pictures/long_isle.png") },
  { id: 6,name: "Aperol Spritz", image: require("../pictures/aperol_spritz.png") },
  { id: 7,name: "Long Isle Ice Tea", image: require("../pictures/long_isle.png") }
];

class Explorescreen extends Component {
  constructor(props){
    super(props)

  }

  renderItem1 = ({ item, index }) => {

    return (
      <View style={{paddingRight:5}}>
      <Image style ={styles.drinkImage} source={item.image}>
      </Image>
      <View style={styles.drinkNameTextContainer}>
        <Text style={styles.drinkNameText}>
          {item.name}
        </Text>
      </View>
      </View>

    );
  };
  render(){
    return (
          <SafeAreaView>
            <ImageBackground source ={bgImage} style ={styles.backgroundContainer}>

            <View style={styles.headerBox}>
              <Text style={styles.headline}>
              Explore
              </Text>
            </View>

          <ScrollView>
          <View style= {styles.discoverWeeklyContainer}>
            <View>
              <Text style= {styles.discoverWeeklyText}>
                Discover Weekly
              </Text>
            </View>
          <ScrollView
            horizontal= {true}
            showsVerticalScrollIndicator={false}
            >
          <View style={styles.scrollviewContainer}>
            <FlatList
              data={data}
              renderItem={this.renderItem1}
              keyExtractor={item => item.id}
              horizontal = {true}
              showsVerticalScrollIndicator={false}
            />
          </View>
          </ScrollView>

          </View>
          <View style={styles.seasonalDrinksContainer}>
            <Text style={styles.seasonalDrinksText}>
              Seasonal Drinks
            </Text>
          </View>
          </ScrollView>
          </ImageBackground>
          </SafeAreaView>

    );
  }
}
export default Explorescreen;

const styles = StyleSheet.create({

  headline: {
      marginTop:10,
      textAlign: 'center', // <-- the magic
      fontWeight: 'bold',
      fontSize: 25,

   },
   headerBox:{
     height: 70,
     width:WIDTH,
     borderBottomWidth: 1,
     borderBottomColor: '#dddddd'

   },
   discoverWeeklyContainer:{

   },
   discoverWeeklyText:{
     fontSize:25,
     fontWeight: 'bold',
     marginTop:10,
     marginLeft:10,
     marginBottom:10,

   },
   drinkImage:{
     height: WIDTH/2.6,
     width: WIDTH/2.6,


   },
   drinkNameText:{
     fontSize:16,
     margin:5,
     fontWeight: 'bold'
     //paddingLeft:5,
     //paddingTop:5

   },
   drinkNameTextContainer:{
     width: WIDTH/2.6
   },
   scrollviewContainer:{
     marginLeft:5,
     marginRight:5
   },
   backgroundContainer: {
     width: null,
     height: null,
     alignItems: "center"
   },
   seasonalDrinksText:{
     fontSize:25,
     fontWeight: 'bold',
     marginTop:10,
     marginLeft:10,
     marginBottom:10,
   }

});
