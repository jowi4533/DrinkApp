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
    img: require("../pictures/cranberry_sangria.png")
  },
  {
    id: 2,
    name: "Lavender Lemonade Mojito",
    category: "Spring",
    img: require("../pictures/lavendel.png")
  },
  {
    id: 3,
    name: "Pear Mojito",
    category: "Summer",
    img: require("../pictures/pear_mojito.png")
  },
  {
    id: 4,
    name: "Very Merry Bourbon Alexander",
    category: "Winter",
    img: require("../pictures/very_merry_bourbon_alexander.png")
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
      baseSpirits: [],
      spiritCategory : props.screenProps.spirits,
      seasonCategory: props.screenProps.seasons,
      tasteCategory: props.screenProps.tastes
    }
    console.log(this.state.seasonCategory)
    console.log(this.state.spiritCategory)
    console.log(this.state.tasteCategory)

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
  //componentDidMount(){
    //this.setState({ loaded: true });

  //}

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
        onPress={() =>
          this.props.navigation.navigate("DrinkCategory", {title: item.category})
        }
      >
        <ImageBackground style={styles.baseSpiritImage} source={item.img }>
          <View style={styles.baseSpiritImageContainer}>
        <View style={styles.baseSpiritTextContainer}>
          <Text style={styles.baseSpiritsText}>{item.category}</Text>
        </View>
        </View>
      </ImageBackground>

      </TouchableOpacity>
    );
  };
  //category boxes -- text ontop of image + opacity
  renderItem3 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.seasonalBox}
        onPress={() =>
          this.props.navigation.navigate("DrinkCategory", {title: item.name})
        }
      >
        <ImageBackground style={styles.baseSpiritImage} source={{ uri: item.img }}>
          <View style={styles.baseSpiritImageContainer}>
        <View style={styles.baseSpiritTextContainer}>
          <Text style={styles.baseSpiritsText}>{item.name}</Text>
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
          <View style={styles.horizontalCategoryContainer}>
            <View>
              <Text style={styles.categoryHeadingText}>Discover Weekly</Text>
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
          <View style={styles.gridItemContainer}>
            <Text style={styles.gridHeadingText}>Seasonal Drinks</Text>
            <View style={styles.categoryGrid}>
              <FlatList
                data={this.state.seasonCategory}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns= {2}
              />
            </View>
          </View>
          <View style={styles.horizontalCategoryContainer}>
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
          <View style={styles.gridItemContainer}>
            <Text style={styles.gridHeadingText}>Base Spirits</Text>
            <View style={styles.categoryGrid}>
              <FlatList
                data={this.state.spiritCategory}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </View>
          </View>
          <View style={styles.horizontalCategoryContainer}>
            <View>
              <Text style={styles.categoryHeadingText}>Editors Choice</Text>
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
          <View style={styles.gridItemContainer}>
            <Text style={styles.gridHeadingText}>Tastes</Text>
            <View style={styles.categoryGrid}>
              <FlatList
                data={this.state.tasteCategory}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns= {2}
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
  horizontalCategoryContainer: {
  },
  discoverWeeklyBox: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  categoryHeadingText: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 26,
    //fontWeight: "bold",
    marginTop: 15,
    //marginBottom: 5,
    //marginLeft: 10,

  },
  drinkImage: {
    height: WIDTH / 2.6,
    width: WIDTH / 2.6,
    margin: 5
  },
  drinkNameText: {
    color: colors.black,
    textAlign:'center',
    fontSize: 16,
    //fontWeight: "bold",
    fontFamily: 'Quicksand-Bold'
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
    marginTop: 10,
  },
  backgroundContainer: {
    width: null,
    height: null,
    alignItems: "center"
  },
  gridItemContainer: {

  },
  gridHeadingText: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 26,
    //fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    //marginLeft: 10,
  },
  categoryGrid:  {

  },
  seasonalImage: {
    width: (WIDTH - 40) / 2,
    height: (WIDTH - 40) / 2,
    margin: 5
  },
  seasonalText: {
    color: colors.black,
    fontSize: 20,
    //fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 40,
    fontFamily: 'Quicksand-Bold',
  },
  seasonalBox: {
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 5
  },
  contentContainer: {
    paddingBottom: 10,
  },
  classicDrinksContainer: {},
  classicDrinksText: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 26,
    //fontWeight: "bold",
    marginTop: 10,
    //marginLeft: 10,
    //marginBottom: 5,
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
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    //fontWeight: "bold",
    color: colors.white,
    opacity: 1
  }
});
