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
  Alert,
  Button
} from "react-native";
import drImage from "../pictures/long_isle.png";
import bgImage from "../pictures/236.jpg";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const data = [
  { name: "Tequila", units: "4cl" },
  { name: "Rom", units: "4cl" },
  { name: "Gin", units: "4cl" },
  { name: "Cointreau", units: "4cl" },
  { name: "Lemon Juice", units: "4cl" },
  { name: "Coca Cola", units: "" },
  { name: "Ice", units: "" },
  { name: "Lemon", units: "" }
];
const data2 = [
  {
    instruc:
      "1.Fill a long glass with ice.,2.Add all ingredients except Coca Cola.,3.Top with a splash of Cola and stir.,4.Garnish with a lemon wedge."
  },
  {
    instruc:
      "1.Fill a long glass with poop.,2.Add all ingredients except Coca poop.,3.Top with a splash of Cola and poop.,4.Garnish with a lemon poop."
  }
];
const data3 = {name: "Long Island Ice Tea"};

class SpecificDrinkscreen extends Component {
  modifyPreparations() {
    const data2 = [
      {
        instruc:
          "1.Fill a long glass with ice.,2.Add all ingredients except Coca Cola.,3.Top with a splash of Cola and stir.,4.Garnish with a lemon wedge."
      },
      {
        instruc:
          "1.Fill a long glass with poop.,2.Add all ingredients except Coca poop.,3.Top with a splash of Cola and poop.,4.Garnish with a lemon poop."
      }
    ];
    const data3 = data2[0].instruc;
    let sentence = "";
    const newPrep = [];
    for (var i = 0; i < data3.length; i++) {
      if (data3[i] !== ",") {
        sentence = sentence + data3[i];
      } else {
        newPrep.push({ inst: sentence });
        sentence = "";
      }
    }
    console.log(newPrep);
    return newPrep;
  }

  renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.oneIngredientBox}>
        <Text style={styles.eachIngredientText}>{item.name}</Text>
      </View>
    );
  };
  renderItem2 = ({ item, index }) => {
    return (
      <Text style={styles.eachIngredientText}>
        {item.units} {item.name}
      </Text>
    );
  };
  renderItem3 = ({ item, index }) => {
    return <Text style={styles.eachIngredientText}>{item.inst}</Text>;
  };

  render() {
    return (
        <ScrollView>
        <View style={{ height:HEIGHT/2.6 }}>
          <View style={styles.drinkImageContainer}>

            <ImageBackground style={styles.drinkImage} source={drImage}>
              <View style ={styles.drinkNameContainer}>
                <View style={{opacity:1}}>

                  <Text style={styles.drinkNameText}>
                    {data3.name}
                  </Text>
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
                    data={data}
                    renderItem={this.renderItem1}
                    keyExtractor={item => item.name}
                  />
                </View>
                <View style={styles.servingsContainer}>
                  <Text style={styles.servingsText}>Servings</Text>
                  <View style={styles.servingsBox}>
                      <Text style={styles.twoDrinksText}>2 Drinks</Text>
                    <FlatList
                      data={data}
                      renderItem={this.renderItem2}
                      keyExtractor={item => item.name}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.preparationSheet}>
              <Text style={styles.preparationText}>Preparation</Text>
              <FlatList
                contentContainerStyle={styles.prepBox}
                data={this.modifyPreparations()}
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
    justifyContent: 'flex-end'
  },
  ingredientsAndPreparationContainer: {
    flex: 60,
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
    marginBottom:10,
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
    paddingBottom: 10,
    //borderBottomColor: "rgb(208,208,208)"
  },
  servingsContainer: {},
  servingsBox:{
    marginLeft: 15,
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
    paddingBottom:15,
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
  drinkNameText:{
    opacity:1,
    paddingVertical: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28,
    color:'black'
  },
  drinkNameContainer:{
    backgroundColor: 'rgba(189, 195, 199, 0.5)',


  }
});
