import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
  ImageBackground,
  Icon,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import bgImage from "../pictures/236.jpg";
import barIcon from "../pictures/barIcon.png";
import heartIcon from "../pictures/heartIcon.png";
import notesIcon from "../pictures/notesIcon.png";
import {colors} from "../assets/colors.js";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

class MyPagescreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      userAuth : props.screenProps.userAuth,
      loggedIn : null,
    }

    this.setUpNavigationListener()
    this.initiateListener()
  }

  static navigationOptions = {
    title: 'My Page',
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
      console.log("In navigationlistener (MYPAGESCREEN)")
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
        console.log("In listener, user online (MYPAGESCREEN)")
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
      } else {
        console.log("In listener, user offline (MYPAGESCREEN)")
      }
    });
  }

  logOutUser(){
    this.state.userAuth.signOut()
    this.setState({loggedIn: false})
  }

  loadUserFramework(){
    if(this.state.loggedIn){
      return(
        <View>
        <Text> sup bish ur logged in as {this.state.userAuth.currentUser.email} </Text>
        <TouchableOpacity
        onPress= {this.logOutUser.bind(this)}>
        <Text>SIGN OUT</Text>
        </TouchableOpacity>
        </View>
      )
    } else{
      return (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}> Log in or Register to sync your data </Text>
        </TouchableOpacity>
      )
    }
  }

  render() {

    return (
      <ImageBackground style={styles.backgroundContainer}>
        <View style={styles.loginButtonContainer}>
        {this.loadUserFramework()}
        </View>

        <View style={styles.container}>

          <View style={styles.myBarButtonContainer}>
            <TouchableOpacity
              style={styles.myBarButton}
              onPress={() => this.props.navigation.navigate("MyBar")}
            >
              <View style={styles.myBarButtonImageContainer}>
                <Image
                  source={barIcon}
                  style={styles.myBarButtonImage}
                />
              </View>
              <View style={styles.myBarButtonTextContainer}>
                <Text style={styles.myBarButtonTextHeading}>My Bar</Text>
                <Text style={styles.myBarButtonTextBody}>Select ingredients that you have at home to see what drinks you can make</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.myFavoritesButtonContainer}>
            <TouchableOpacity
              style={styles.myFavoritesButton}
              onPress={() => this.props.navigation.navigate("MyFavoriteDrinks")}
            >
              <View style={styles.myFavoritesButtonImageContainer}>
                <Image
                  source={heartIcon}
                  style={styles.myFavoritesButtonImage}
                />
              </View>
              <View style={styles.myFavoritesButtonTextContainer}>
                <Text style={styles.myFavoritesButtonTextHeading}>My Favorites</Text>
                <Text style={styles.myFavoritesButtonTextBody}>Mark your favorite drinks with a heart and you will find them here</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.myNotesButtonContainer}>
            <TouchableOpacity
              style={styles.myNotesButton}
              onPress={() => this.props.navigation.navigate("MyNotes")}
            >
              <View style={styles.myNotesButtonImageContainer}>
                <Image
                  source={notesIcon}
                  style={styles.myNotesButtonImage}
                />
              </View>
              <View style={styles.myNotesButtonTextContainer}>
                <Text style={styles.myNotesButtonTextHeading}>My Notes</Text>
                <Text style={styles.myNotesButtonTextBody}>Create notes to make you remember buying that last ingredient for example </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default MyPagescreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },

  loginButtonContainer: {
    width: WIDTH,
    backgroundColor: colors.darkgreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
  },

  loginButton: {
    elevation: 10,
    width: WIDTH/1.1,
    height: 45,
    borderRadius: 10,
    //marginTop:  35,
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  loginButtonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"
  },

  container: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center"
  },

  myBarButtonContainer: {
    height: 135,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: colors.midgray,
    //flexDirection: "row"
  },

  myBarButton: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "row"
  },

  myBarButtonImageContainer: {
    justifyContent: 'center',
  },

  myBarButtonImage: {
    elevation: 20,
    height: 95,
    width: 95,
  },

  myBarButtonTextContainer: {
    width: WIDTH - 165,
    justifyContent: 'center',
  },

  myBarButtonTextHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    //marginTop:  12,
    marginRight: 10,
    color: colors.black,
  },

  myBarButtonTextBody: {
    fontSize: 14,
    marginLeft: 15,
    //marginTop:  8,
    color: colors.darkgray,
  },


  myFavoritesButtonContainer: {
    height: 135,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: colors.midgray,
    //flexDirection: "row"
  },

  myFavoritesButton: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "row"
  },

  myFavoritesButtonImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  myFavoritesButtonImage: {
    elevation: 20,
    //marginLeft: 5,
    //alignSelf: 'center',
    height: 95,
    width: 95,
  },

  myFavoritesButtonTextContainer: {
    //marginLeft: 10,
    width: WIDTH - 165,
    justifyContent: 'center',
  },

  myFavoritesButtonTextHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    //marginTop:  12,
    marginRight: 10,
    color: colors.black,
  },

  myFavoritesButtonTextBody: {
    fontSize: 14,
    marginLeft: 15,
    //marginTop:  8,
    color: colors.darkgray
  },


  myNotesButtonContainer: {
    height: 135,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: colors.midgray,
    //flexDirection: "row"
  },

  myNotesButton: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "row"
  },

  myNotesButtonImageContainer: {
    justifyContent: 'center',
  },

  myNotesButtonImage: {
    elevation: 20,
    height: 95,
    width: 95,
  },

  myNotesButtonTextContainer: {
    width: WIDTH - 165,
    justifyContent: 'center',
  },

  myNotesButtonTextHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    //marginTop:  12,
    marginRight: 10,
    color: colors.black
  },

  myNotesButtonTextBody: {
    fontSize: 14,
    marginLeft: 15,
    //marginTop:  8,
    color: colors.darkgray,
  },

});
