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
  FlatList,
  ActivityIndicator
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

import FavoriteButton from "../components/FavoriteButton.js";
import SmallFavoriteButton from "../components/SmallFavoriteButton.js";
import {colors} from "../assets/colors.js";

class MyFavoriteDrinkscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],

      userAuth : props.screenProps.userAuth,
      usersDB: props.screenProps.usersDB,

      loggedIn : true,
      allFavourites: {},

      favoriteDrinkArray: [],
      drinks: props.screenProps.drinks,
      favoriteDrinksArray: []

    };

    this.loadResources()
  }

  static navigationOptions = {
    title: 'My Favorites',
    headerTitleStyle: {
      width: '100%',
      fontFamily: "Quicksand-Medium",
      fontSize: 25,
      color:colors.black
    },
  };

  loadResources(){
    this.setUpDatabaseListeners()
    this.setUpNavigationListener()
    this.initiateListener()
  }


  setUpDatabaseListeners(){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{

        let allDrinks = []
        let currentUser = loggedInUser.val()
        let myFavouritesRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites")

        myFavouritesRef.on("child_added", (aDrink, prevChildKey) =>{
          let drink = aDrink.val()
          allDrinks.push(drink)

          this.state.allFavourites[drink.name] = drink
          this.state.favoriteDrinksArray = allDrinks
          this.setState(this.state)
        })

        myFavouritesRef.on("child_removed", (aDrink) => {
          let drink = aDrink.val()

          for(let i = 0; i < allDrinks.length; i++){
            if(allDrinks[i].name === drink.name){
              console.log("getting spliced  " + drink.name)
              allDrinks.splice(i, 1)
              this.setState({favoriteDrinksArray: allDrinks})
            }
          }
          delete this.state.allFavourites[drink.name]
        })
      })
  }

  setUpNavigationListener() {
    this.props.navigation.addListener('didFocus', () => {
      this.setState(this.state)
      // get your new data here and then set state it will rerender
      console.log("In navigationlistener (MyFavoritesScreen)")
    });
  }
  // setUpDatabaseListeners(){
  //     this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
  //       (loggedInUser) =>{
  //       let currentUser = loggedInUser.val()
  //       this.state.currentUser = currentUser;
  //       let myFavouritesRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites")
  //       let value = this.state.currentUser.myFavourites;
  //       myFavouritesRef.on("child_added", (aDrink, prevChildKey) =>{
  //         let drink = aDrink.val()
  //
  //         this.state.allFavourites[drink.name] = drink
  //       })
  //         if (typeof(value) !== 'undefined' || value != null) {
  //        this.state.favoriteDrinkArray = Object.values(this.state.currentUser.myFavourites);
  //      } else {
  //        console.log('Undefined or Null')
  //      }
  //     })
  //    }

  initiateListener(){
    this.state.userAuth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("In listener, user online (MyFavoritesScreen)")

          this.setUpDatabaseListeners()
      } else {
        console.log("In listener, user offline (MyFavoritesScreen)")
      }
    });
  }

  updateFavourites = (drinkData, favourited) => {

    if(!favourited){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{


        let currentUser = loggedInUser.val()
        let removeFavouriteRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites").child(drinkData.name)
        removeFavouriteRef.remove()
        })
    }
  }

  getIngredients = (data) => {
    var string = data.toString();
    string = string.replace(/,/g, ", ");
    return (string)
  };

  updateFavourites = (drinkData, favourited) => {
    if(!favourited){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{

        for(let i = 0; i < this.state.favoriteDrinkArray.length; i++){
          if(this.state.favoriteDrinkArray[i].name === drinkData.name ){
            this.state.favoriteDrinkArray.splice(i, 1)
          }
        }
        let currentUser = loggedInUser.val()
        let removeFavouriteRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites").child(drinkData.name)
        removeFavouriteRef.remove()
        this.setState(this.state)
        })
    }
  }

  renderItem1 = ({item, index}) => {
    return (
      <View style={styles.drinkContainer}>
        <TouchableOpacity
          style={styles.buttonDrink}
          onPress={() =>
            this.props.navigation.navigate("SpecDrinks",
            {
              drink: item,
              myFavourites: this.state.allFavourites,
              loggedIn: this.state.loggedIn,
              usersDB: this.state.usersDB,
            })
          }
        >
          <View>
            <Image
              source={{ uri: item.url }}
              style={styles.imageDrink}
            />
          </View>
          <View style={styles.itemTextContainer}>
            <View style={styles.textHeadingContainer}>
              <Text style={styles.textDrinkName}>{item.name}</Text>
              <View style={styles.SmallFavoriteButtonContainer}>
                <SmallFavoriteButton
                  drink = {item}
                  myFavourites = {this.state.favoriteDrinksArray}
                  loggedIn = {this.state.loggedIn}
                  updateFavourites = {this.updateFavourites}
                />
              </View>
            </View>
            <View style={styles.ingredientsTextContainer}>
              <Text style={styles.ingredientsText}>
                {this.getIngredients(Object.keys(item.allIngredients))}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
          <View>
          <ScrollView>
            <FlatList
            data={this.state.favoriteDrinksArray}
            renderItem={this.renderItem1}
            keyExtractor={item => item.id}
            extraData={this.state}
          />
        </ScrollView>
        </View>

    );
  }
}
export default MyFavoriteDrinkscreen;

const styles = StyleSheet.create({
  drinkContainer: {
    height: 105.8,
    width: WIDTH,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.midgray,
    flexDirection: "row"
  },
  buttonDrink: {
    flex: 1,
    flexDirection: "row"
  },
  imageDrink: {
    height: 105,
    width: 105,
  },
  textDrinkName: {
    width: '78%',
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    marginLeft: 15,
    marginTop: 15,
    color: colors.black,
  },

  textHeadingContainer: {
    width: WIDTH - 105,
    flexDirection: "row",
    justifyContent: 'space-between',
  },

  ingredientsTextContainer: {
    marginLeft: 15,
    width: '80%',
  },

  ingredientsText: {
    textTransform: 'capitalize',
    fontSize: 14,
    color: colors.darkgray,
    fontFamily: "Quicksand-Regular"
  },


});
