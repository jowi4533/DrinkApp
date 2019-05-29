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
  Image
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
      vodkaIMG: "",

      userAuth : props.screenProps.userAuth,
      loggedIn : null
    };

    this.setUpNavigationListener()
    this.initiateListener()
  }

  static navigationOptions = {
    title: 'My Favorites',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };

  setUpNavigationListener() {
    this.props.navigation.addListener('didFocus', () => {
      this.checkUserLoggedIn()
      // get your new data here and then set state it will rerender
      console.log("In navigationlistener (MyFavoritesScreen)")
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

  renderItem = item => {
    <View style={styles.drinkContainer}>
      <TouchableOpacity style={styles.buttonDrink}>
        <Image source={{ uri: item.image }} style={styles.imageDrink} />
      </TouchableOpacity>
    </View>;
  };


  render() {
    return (
        <View>

          <ScrollView>
          <View style={styles.drinkContainer}>
            <TouchableOpacity
              style={styles.buttonDrink}
              onPress={() => this.props.navigation.navigate("SpecDrinks")}
            >
            <View style = {styles.addToFavoriteButton}>
              <SmallFavoriteButton>
              </SmallFavoriteButton>
            </View>
              <View>
                <Image
                  source={{ uri: this.state.vodkaIMG }}
                  style={styles.imageDrink}
                />
              </View>
              <View style={styles.textBoxContainer}>
                <Text style={styles.textDrinkName}>Long Island Ice Tea</Text>
                <Text style={styles.textDrinkIngredients}>
                  Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon
                  Juice, Cola, Ice
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default MyFavoriteDrinkscreen;

const styles = StyleSheet.create({

  drinkContainer: {
    height: 105,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    flexDirection: "row"
  },
  buttonDrink: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row"
  },
  imageDrink: {
    height: 105,
    width: 105
  },
  textDrinkName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 15,
    color: "rgba(46, 49, 49, 1)",
    marginRight: 10
  },
  textDrinkIngredients: {
    fontSize: 14,
    marginLeft: 15,
    marginTop: 15,
    color: "rgba(108, 122, 137, 1)"
  },
  textBoxContainer: {
    width: WIDTH - 105
  },
  addToFavoriteButton:{
    position: 'absolute',
    right:12,
    top:7,
    zIndex:2
  }
});
