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


      drinks: props.screenProps.drinks,
      userAuth : props.screenProps.userAuth,
      loggedIn : true,
      favoriteDrinkArray: [],

      drinks: props.screenProps.drinks,
      allFavourites: {},

      usersDB: props.screenProps.usersDB,
      users: props.screenProps.users,
    };
    console.log(this.state.usersDB)
    this.setUpNavigationListener()
    this.initiateListener()
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

  setUpNavigationListener() {
    this.props.navigation.addListener('didFocus', () => {
      this.checkUserLoggedIn()
      // get your new data here and then set state it will rerender
      console.log("In navigationlistener (MyFavoritesScreen)")
    });
  }

  initiateListener(){
    this.state.userAuth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("In listener, user online (MyFavoritesScreen)")
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
      } else {
        console.log("In listener, user offline (MyFavoritesScreen)")
      }
    });
  }
  getIngredients = (data) => {
    var string = data.toString();
    string = string.replace(/,/g, ", ");
    return (string)
  };

  renderItem1 = ({item, index}) => {
    return (
      <View style={styles.drinkContainer}>
        <TouchableOpacity
          style={styles.buttonDrink}
          onPress={() => this.props.navigation.navigate("SpecDrinks", {drink:item})}
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
                  myFavourites = {this.state.allFavourites}
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
  updateFavourites = (drinkData, favourited) => {
    this.state.allFavourites[drinkData.name] = drinkData
    if(this.state.loggedIn){
    if(favourited){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{

        let currentUser = loggedInUser.val()
        let myFavouritesRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites")

        myFavouritesRef.set(this.state.allFavourites)
        })
    }
      else{
        this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
          (loggedInUser) =>{

          let currentUser = loggedInUser.val()
          let removeFavouriteRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites").child(drinkData.name)
          removeFavouriteRef.remove()
          delete this.state.allFavourites[drinkData.name]
          })
    }
    }
  }

  render() {
    return (
          <View>
          <ScrollView>
            <FlatList
            data={this.state.favoriteDrinkArray}
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
