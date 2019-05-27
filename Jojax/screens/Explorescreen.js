import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from "react-native";

import drImage from "../pictures/long_isle.png";
import bgImage from "../pictures/236.jpg";
import aperol from "../pictures/aperol_spritz.png";
import {colors} from "../assets/colors.js";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");


const data2 = [
  {
    id: 1,
    name: "Cranberry Sangria",
    category: "Fall",
    image: require("../pictures/cranberry_sangria.png")
  },
  {
    id: 2,
    name: "Lavender Lemonade Mojito",
    category: "Spring",
    image: require("../pictures/lavendel.png")
  },
  {
    id: 3,
    name: "Pear Mojito",
    category: "Summer",
    image: require("../pictures/pear_mojito.png")
  },
  {
    id: 4,
    name: "Very Merry Bourbon Alexander",
    category: "Winter",
    image: require("../pictures/very_merry_bourbon_alexander.png")
  }
];



class Explorescreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drinks: props.screenProps.drinks,

      //All the categories in which drinks are placed
      drinksDisplayed: [],
      discoverWeekly: [],
      seasonalDrinks: [],
      classicDrinks: [],
      baseSpirits: []
    }
  }

  loopSeasonalDrinks(){
    let drinksToDisplay = []
    for(let i = 0; i < this.state.drinks.length; i++){
      if(this.state.drinks[i].Seasonal_Drink === "spring"){
        this.seasonalDrinks[0]
      }
      if(this.state.drinks[i].Seasonal_Drink === "summer"){

      }
      if(this.state.drinks[i].Seasonal_Drink === "fall"){

      }
      if(this.state.drinks[i].Seasonal_Drink === "winter"){

      }
    }
  }

  loopClassicDrinks(){
    let classicDrinks = []
    for(let i = 0; i < this.state.drinks.length; i++){
      if(this.state.drinks[i].categories.classic === true){
        classicDrinks.push(this.state.drinks[i])
      }
    }
    this.setState({classicDrinks: classicDrinks})
  }

  loopDiscoverWeekly(){
    let weeklyDrinks = []
    for(let i = 0; i < this.state.drinks.length; i++){
      if(this.state.drinks[i].categories.Discover_Weekly === true){
        weeklyDrinks.push(this.state.drinks[i])
      }
    }
    this.setState({discoverWeekly: weeklyDrinks})
  }

  componentWillMount(){
    this.loopDiscoverWeekly()
    this.loopClassicDrinks()
  }

  static navigationOptions = {
    title: 'Explore',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };
  //Discoverweekly + classic drinks atm
  renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.discoverWeeklyBox}>
        <Image
          source={{ uri: item.url }}
          style={styles.drinkImage}
        />
        <View style={styles.drinkNameTextContainer}>
          <Text style={styles.drinkNameText}>{item.name}</Text>
        </View>
      </View>
    );
  };
  //Drink Categories ( not used atm ) -- text below image
  renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.seasonalBox}
        onPress={() => this.props.navigation.navigate('DrinkCategory', {title: item.category})
      }
      >
        <Image style={styles.seasonalImage} source={item.image} />
        <View style={styles.drinkNameTextContainer}>
          <Text style={styles.seasonalText}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  //category boxes -- text ontop of image + opacity
  renderItem3 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.seasonalBox}
        onPress={() =>
          this.props.navigation.navigate("DrinkCategory", {title: item.category})
        }
      >

        <ImageBackground style={styles.baseSpiritImage} source={item.image}>
          <View style={styles.baseSpiritImageContainer}>
        <View style={styles.baseSpiritTextContainer}>
          <Text style={styles.baseSpiritsText}>{item.category}</Text>
        </View>
        </View>
      </ImageBackground>

      </TouchableOpacity>
    );
  };

  render() {

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.discoverWeeklyContainer}>
            <View>
              <Text style={styles.discoverWeeklyText}>Discover Weekly</Text>
            </View>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              <View style={styles.scrollviewContainer}>
                <FlatList
                  data={this.state.discoverWeekly}
                  renderItem={this.renderItem1}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.seasonalDrinksContainer}>
            <Text style={styles.seasonalDrinksText}>Seasonal Drinks</Text>

            <View>
              <FlatList
                data={data2}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns= {2}
              />
            </View>
          </View>
          <View style={styles.classicDrinksContainer}>
            <View>
              <Text style={styles.classicDrinksText}>Classic Drinks</Text>
            </View>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              <View style={styles.scrollviewContainer}>
                <FlatList
                  data={this.state.classicDrinks}
                  renderItem={this.renderItem1}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.seasonalDrinksContainer}>
            <Text style={styles.seasonalDrinksText}>Base Spirits</Text>

            <View>
              <FlatList
                data={data2}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
export default Explorescreen;

const styles = StyleSheet.create({
  discoverWeeklyContainer: {},
  discoverWeeklyBox: {
    backgroundColor: "white",
    marginHorizontal: 5,
    borderRadius: 5
  },
  discoverWeeklyText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  drinkImage: {
    height: WIDTH / 2.6,
    width: WIDTH / 2.6,
    margin: 5
  },
  drinkNameText: {
    textAlign:'center',
    fontSize: 16,
    fontWeight: "bold"
  },
  drinkNameTextContainer: {
    //backgroundColor: 'blue',
    width: WIDTH / 2.6,
    marginLeft:5,
    paddingLeft:5,
    paddingBottom:5,
    paddingRight:5
  },
  scrollviewContainer: {
    marginLeft: 5,
    marginRight: 5
  },
  backgroundContainer: {
    width: null,
    height: null,
    alignItems: "center"
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 40
  },
  seasonalBox: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 5
  },
  contentContainer: {
    paddingBottom: 40
  },
  classicDrinksContainer: {},
  classicDrinksText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },

  baseSpiritImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: '100%',
    height: '100%',

  },

  baseSpiritImage: {
    width: (WIDTH - 40) / 2,
    height: (WIDTH - 40) / 2,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    //opacity: 0.8,
  },
  baseSpiritTextContainer: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
    //opacity: 1,
  },
  baseSpiritsText: {
    textAlign: 'center',
    width: '90%',
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    opacity: 1
  }
});
