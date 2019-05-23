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
import aperolpic from "../pictures/aperol_spritz.png";
import bgImage from "../pictures/236.jpg";
import myBarImage from "../pictures/myBarPic.jpg";
import myFavoritesImage from "../pictures/myFavoritesPic.png";
import myBarIcon from "../pictures/myBarImage.jpg";
import transparentBar from "../pictures/transparentBar.png";
import transparentBarIcon from "../pictures/transparentBarIcon.png";
import bar1 from "../pictures/bar1.png";
import bar2 from "../pictures/bar2.jpg";
import heart2 from "../pictures/heart2.png";
import notes1 from "../pictures/notes1.png";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

class MyPagescreen extends Component {
  static navigationOptions = {
    title: 'My Page',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };
  constructor(props){
    super(props)
  }
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}> Log in or Register to sync your data </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.container}>

          <View style={styles.myBarButtonContainer}>
            <TouchableOpacity
              style={styles.myBarButton}
              onPress={() => this.props.navigation.navigate("MyBar")}
            >
              <View style={styles.myBarButtonImageContainer}>
                <Image
                  source={transparentBar}
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
                  source={heart2}
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
                  source={notes1}
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
    elevation: 20,
    width: WIDTH,
    backgroundColor: 'rgba(245, 171, 53, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    marginBottom: 8,

  },

  loginButton: {
    width: WIDTH/1.1,
    height: 45,
    borderRadius: 10,
    ////marginTop:  35,
    justifyContent: "center",
    backgroundColor: "white",
  },

  loginButtonText: {
    color: "black",
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
    borderBottomColor: 'lightgrey',
    //flexDirection: "row"
  },

  myBarButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: "row"
  },

  myBarButtonImageContainer: {
    justifyContent: 'center',
  },

  myBarButtonImage: {
    height: 105,
    width: 105,
  },

  myBarButtonTextContainer: {
    width: WIDTH - 175,
    justifyContent: 'center',
  },

  myBarButtonTextHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    //marginTop:  12,
    marginRight: 10,
    color: "rgba(46, 49, 49, 1)",
  },

  myBarButtonTextBody: {
    fontSize: 14,
    marginLeft: 15,
    //marginTop:  8,
    color: "rgba(108, 122, 137, 1)"
  },


  myFavoritesButtonContainer: {
    height: 135,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    //flexDirection: "row"
  },

  myFavoritesButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: "row"
  },

  myFavoritesButtonImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  myFavoritesButtonImage: {
    marginLeft: 5,
    alignSelf: 'center',
    height: 95,
    width: 95,
  },

  myFavoritesButtonTextContainer: {
    marginLeft: 10,
    width: WIDTH - 175,
    justifyContent: 'center',
  },

  myFavoritesButtonTextHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    //marginTop:  12,
    marginRight: 10,
    color: "rgba(46, 49, 49, 1)",
  },

  myFavoritesButtonTextBody: {
    fontSize: 14,
    marginLeft: 15,
    //marginTop:  8,
    color: "rgba(108, 122, 137, 1)"
  },


  myNotesButtonContainer: {
    height: 135,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    //flexDirection: "row"
  },

  myNotesButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: "row"
  },

  myNotesButtonImageContainer: {
    justifyContent: 'center',
  },

  myNotesButtonImage: {
    height: 105,
    width: 105,
  },

  myNotesButtonTextContainer: {
    width: WIDTH - 175,
    justifyContent: 'center',
  },

  myNotesButtonTextHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    //marginTop:  12,
    marginRight: 10,
    color: "rgba(46, 49, 49, 1)",
  },

  myNotesButtonTextBody: {
    fontSize: 14,
    marginLeft: 15,
    //marginTop:  8,
    color: "rgba(108, 122, 137, 1)"
  },






  myBarIcon: {
    paddingLeft: 10,
    flex: 1,
    aspectRatio: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center"
  },

});
