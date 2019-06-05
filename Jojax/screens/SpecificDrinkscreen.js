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
  Button,
  ActivityIndicator
} from "react-native";
import drImage from "../pictures/long_isle.png";
import bgImage from "../pictures/236.jpg";
import FavoriteButton from "../components/FavoriteButton.js";
import {colors} from "../assets/colors.js";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

class SpecificDrinkscreen extends Component {

  constructor(props){
  super(props);

  this.state = {
    instructions: [],
    ingredients: [],

    userAuth : props.screenProps.userAuth,
    usersDB: this.props.navigation.state.params.usersDB,
    specificDrink : this.props.navigation.state.params.drink,
    myFavourites: this.props.navigation.state.params.myFavourites,
    loggedIn: this.props.navigation.state.params.loggedIn,

  }
  this.setUpNavigationListener()
  //console.log(this.state.specificDrink.url)
  this.loadIngredients()
}
setUpNavigationListener() {
  this.props.navigation.addListener('didFocus', () => {
    this.checkUserLoggedIn()
    // get your new data here and then set state it will rerender
    console.log("In navigationlistener (DRINKSCREEN)")
  });
}

initiateListener(){
  this.state.userAuth.onAuthStateChanged(function(user) {
    if (user) {
      console.log("In listener, user online (DRINKSCREEN)")
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
    } else {
      console.log("In listener, user offline (DRINKSCREEN)")
    }
  });
}
checkUserLoggedIn(){
  if(this.state.userAuth.currentUser === null){
    //this.state.loggedIn = false
    this.setState({loggedIn: false})
  } else{
    //this.state.loggedIn = true
    this.setState({loggedIn: true})
  }
}

  loadIngredients(){
    allIngredientItems = Object.values(this.state.specificDrink.allIngredients)
    allIngredientKeys = Object.keys(this.state.specificDrink.allIngredients)

    ingredients = []
    for(let i = 0; i < allIngredientItems.length; i++){
      let ingredient = {
        [allIngredientKeys[i]]: allIngredientItems[i],
      }
      ingredients.push(ingredient)
    }
    this.state.ingredients = ingredients
    //console.log(this.state.ingredients)
  }

  updateFavourites = (drinkData, favourited) => {

    if(favourited){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{

        this.state.myFavourites[drinkData.name] = drinkData
        let currentUser = loggedInUser.val()
        let myFavouritesRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites")

        myFavouritesRef.set(this.state.myFavourites)
        })
    }
      else{
        this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
          (loggedInUser) =>{

          let currentUser = loggedInUser.val()
          let removeFavouriteRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites").child(drinkData.name)
          removeFavouriteRef.remove()
          })
    }
  }

  //renders ingredients
  renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.oneIngredientBox}>
        <Text style={styles.oneIngredientBoxText}>{item}</Text>
      </View>
    );
  };

  //Renders servings together with 4
  renderItem2 = ({ item, index }) => {
    //console.log(item)
    ingredientAmount = Object.values(item)
    ingredientName = Object.keys(item)

    return <Text style={styles.eachIngredientText}>{ingredientAmount}{ingredientName}</Text>;
  };

  //renders preparationinstructions
  renderItem3 = ({ item, index }) => {
    return <Text style={styles.eachIngredientText}>{item}</Text>;
  };


  render() {
    //console.log(this.state.specificDrink.ingredients)
    return (

      <ScrollView>
        <View>
        <View style={{ height: WIDTH }}>
          <View style={styles.drinkImageContainer}>
            <View style={styles.addToFavoriteButton}>
                {this.state.loggedIn ? (
              <FavoriteButton
                drink = {this.state.specificDrink}
                myFavourites = {this.state.myFavourites}
                loggedIn = {this.state.loggedIn}
                updateFavourites = {this.updateFavourites}
              >
              </FavoriteButton> ) :
                ( <View>
                </View>) }
            </View>
            <ImageBackground style={styles.drinkImage} source={{ uri: this.state.specificDrink.url }} >
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
                    data={Object.keys(this.state.specificDrink.allIngredients)}
                    renderItem={this.renderItem1}
                    keyExtractor={item => item.eachitem}
                  />
                </View>
                <View style={styles.servingsContainer}>
                  <Text style={styles.servingsText}>Servings</Text>
                  <View style={styles.servingsBox}>
                    <Text style={styles.twoDrinksText}>2 Drinks</Text>
                    <FlatList
                      data={this.state.ingredients}
                      renderItem={this.renderItem2}
                      keyExtractor={item => item}
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
                keyExtractor={item => item}
              />
            </View>
          </ImageBackground>
        </View>
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
    width: WIDTH,
    height: WIDTH,
    resizeMode: "contain",
    justifyContent: "flex-end"
  },
  ingredientsAndPreparationContainer: {
    flex: 60
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center"
  },
  ingredientSheet: {
    backgroundColor: colors.white,
    width: WIDTH - 20,
    margin: 10
  },

  ingredientsText: {
    color: colors.black,
    fontFamily:"Quicksand-Bold",
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 5
  },
  twoDrinksText: {
    fontFamily: "Quicksand-Medium",
    fontSize: 20,
    paddingBottom: 12
  },
  ingredientInnerContainer: {
    marginBottom: 10
  },
  eachIngredientText: {
    fontFamily:"Quicksand-Regular",
    fontSize: 18
  },
  ingredientBox: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  oneIngredientBox: {
    marginLeft: 5,
    borderRadius: 25,
    //backgroundColor: "rgb(208,208,208)",
    backgroundColor: colors.lightgray,
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    marginBottom: 3
  },
  textOneIngredient: {
    fontFamily:"Quicksand-Bold",
    fontSize: 22
  },
  ingredientOverviewBox: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10
  },
  servingsContainer: {},
  servingsBox: {
    marginLeft: 15
  },
  servingsText: {
    color: colors.black,
    fontFamily: "Quicksand-Bold",
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 5
  },
  preparationSheet: {
    backgroundColor: colors.white,
    width: WIDTH - 20,
    margin: 10,
    paddingBottom: 15
  },
  preparationText: {
    color: colors.black,
    fontFamily:"Quicksand-Bold",
    fontSize: 24,
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
    fontFamily: "Quicksand-Bold",
    fontSize: 32,
    color: colors.black
  },
  drinkNameContainer: {
    backgroundColor: "rgba(189, 195, 199, 0.5)"
  },
  addToFavoriteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2
  },
  oneIngredientBoxText:{
    fontFamily:"Quicksand-Regular",
    fontSize: 18,
    paddingHorizontal: 3

  }
});
