import React, { Component } from "react";
import { Ionicons, FontAwesome, Entypo, EvilIcons } from "@expo/vector-icons";
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
  FlatList,
  Button
} from "react-native";
import drImage from "../pictures/long_isle.png";
import bgImage from "../pictures/236.jpg";
import FavoriteButton from "../components/FavoriteButton.js";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const data2 = {
  id: 1,
  Discover_Weekly: true,
  Seasonal_Drink: "summer",
  name: "Cranberry Sangria",
  image:
    "https://firebasestorage.googleapis.com/v0/b/drinknic-e6779.appspot.com/o/Drinkpictures%2Faperol_spritz.png?alt=media&token=e2cd3c18-bc9f-4c8f-aa3d-e18502a5f5b6",
  keywords: { strong: true, ingredients: "Aperol,Spritz,Water,Juice," },
  instruc:
    "1.Fill a long glass with ice.,2.Add all ingredients except Coca Cola.,3.Top with a splash of Cola and stir.,4.Garnish with a lemon wedge.,"
};
class SpecificDrinkscreen extends Component {

  constructor(props){
  super(props);

  this.state = {
    specificDrink : this.props.navigation.state.params.drink,
    instructions: [],

  }
  this.loadServings()
}
  loadServings(){
    console.log(this.state.specificDrink.ingredients)
  }


  modifyString(data) {
    const data3 = data;

    let sentence = "";
    const newPrep = [];
    for (var i = 0; i < data3.length; i++) {
      if (data3[i] !== "," || data3[i] !== " ") {
        sentence = sentence + data3[i];
      } else {
        newPrep.push({ eachItem: sentence });
        sentence = "";
      }
    }
    return newPrep;
  }
  //renders ingredients
  renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.oneIngredientBox}>
        <Text style={styles.eachIngredientText}>{item}</Text>
      </View>
    );
  };

  //Renders servings together with 4
  renderItem2 = ({ item, index }) => {
    console.log(item)
    return <Text style={styles.eachIngredientText}>{item}</Text>;
  };

  //renders preparationinstructions
  renderItem3 = ({ item, index }) => {
    return <Text style={styles.eachIngredientText}>{item}</Text>;
  };


  render() {
    return (
      <ScrollView>
        <View style={{ height: HEIGHT / 2.6 }}>
          <View style={styles.drinkImageContainer}>
            <View style={styles.addToFavoriteButton}>
              <FavoriteButton />
            </View>

            <ImageBackground style={styles.drinkImage} source={{ uri: this.state.specificDrink.url }}>
              <View style={styles.drinkNameContainer}>
                <View style={{ opacity: 1 }}>
                  <Text style={styles.drinkNameText}>{this.state.specificDrink.name}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.ingredientsAndPreparationContainer}>
          <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.ingredientSheet}>
              <Text style={styles.ingredientsText}>Ingredients</Text>
              <View style={styles.ingredientInnerContainer}>
                <View style={styles.ingredientOverviewBox}>
                  <FlatList
                    contentContainerStyle={styles.ingredientBox}
                    data={Object.keys(this.state.specificDrink.ingredients)}
                    renderItem={this.renderItem1}
                    keyExtractor={item => item.eachItem}
                  />
                </View>
                <View style={styles.servingsContainer}>
                  <Text style={styles.servingsText}>Servings</Text>
                  <View style={styles.servingsBox}>
                    <Text style={styles.twoDrinksText}>2 Drinks</Text>
                    <FlatList
                      data={Object.keys(this.state.specificDrink.ingredients)}
                      renderItem={this.renderItem2}
                      keyExtractor={item => item.eachItem}
                    />
                    <FlatList
                      data={Object.values(this.state.specificDrink.ingredients)}
                      renderItem={this.renderItem2}
                      keyExtractor={item => item.eachItem}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.preparationSheet}>
              <Text style={styles.preparationText}>Preparation</Text>
              <FlatList
                contentContainerStyle={styles.prepBox}
                data={Object.values(this.state.specificDrink.instructions)}
                renderItem={this.renderItem3}
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}
export default SpecificDrinkscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drinkImageContainer: {
    flex: 1,
    backgroundColor: "grey",
    alignSelf: "stretch"
  },

  drinkImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
    justifyContent: "flex-end"
  },
  ingredientsAndPreparationContainer: {
    flex: 60
    //borderWidth: 1,
    //borderColor: "red"
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center"
  },
  ingredientSheet: {
    backgroundColor: "white",
    //height:HEIGHT/2,
    width: WIDTH - 20,
    margin: 10
  },

  ingredientsText: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    paddingVertical: 5
  },
  twoDrinksText: {
    fontSize: 20,
    paddingBottom: 12
  },
  ingredientInnerContainer: {
    marginBottom: 10
    //marginLeft: 15,
    //borderBottomWidth: 3,
    //borderBottomColor: "green"
  },
  eachIngredientText: {
    fontSize: 18
  },
  ingredientBox: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  oneIngredientBox: {
    marginLeft: 5,
    borderRadius: 25,
    backgroundColor: "rgb(208,208,208)",
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    marginBottom: 3
  },
  textOneIngredient: {
    fontSize: 20
  },
  ingredientOverviewBox: {
    //borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10
    //borderBottomColor: "rgb(208,208,208)"
  },
  servingsContainer: {},
  servingsBox: {
    marginLeft: 15
  },
  servingsText: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    paddingVertical: 5
  },
  preparationSheet: {
    backgroundColor: "white",
    //height:HEIGHT/2,
    width: WIDTH - 20,
    margin: 10,
    paddingBottom: 15
    //borderColor:'purple',
    //borderBottomWidth:3
  },
  preparationText: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    paddingVertical: 5
  },
  prepBox: {
    marginTop: 10,
    marginLeft: 20
  },
  drinkNameText: {
    opacity: 1,
    paddingVertical: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28,
    color: "black"
  },
  drinkNameContainer: {
    backgroundColor: "rgba(189, 195, 199, 0.5)"
  },
  addToFavoriteButton: {
    position: "absolute",
    right: 12,
    top: 7,
    zIndex: 2
  }
});
