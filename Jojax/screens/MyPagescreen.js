import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Icon,
  ImageBackground,
  SafeAreaView,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";
import bgImage from "../pictures/236.jpg";
import myBarImage from "../pictures/myBarPic.jpg";
import myFavoritesImage from "../pictures/myFavoritesPic.png";
import myBarIcon from "../pictures/myBarImage.jpg";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

class MyPagescreen extends Component {
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerbox}>
            <Text style={styles.headline}>MyPage</Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.textLoginButton}> Go to log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.myBarButton}
              onPress={() => this.props.navigation.navigate("MyBar")}
            >

              <Text style={styles.textMyBarButton}>My Bar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.myFavoritesButton}
              onPress={() => this.props.navigation.navigate("MyFavoriteDrinks")}
            >
              <Text style={styles.textMyFavoritesButton}>My Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.myNotesButton}
              onPress={() => this.props.navigation.navigate("MyNotes")}
            >
              <Text style={styles.textMyNotesButton}>My Notes</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headline: {
    marginTop: 10,
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 25
  },
  headerbox: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd"
  },

  loginButton: {
    width: WIDTH - 55,
    height: 40,
    borderRadius: 25,
    marginTop: 35,
    justifyContent: "center",
    backgroundColor: "rgba(245, 171, 53, 1)"
  },

  textLoginButton: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    textAlign: "center"
  },

  buttonContainer: {
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    flex: 1,
    marginBottom: 10,
    justifyContent: "center"
    // alignItems: 'center',
  },

  // myBarImage: {
  //   blurRadius: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   height: '100%',
  //   // opacity: 0.6,
  // },
  myBarIcon: {
    paddingLeft: 10,
    flex: 1,
    aspectRatio: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center"
  },

  myBarButton: {
    width: WIDTH - 55,
    height: 60,
    borderRadius: 25,
    backgroundColor: "#07757D",
    justifyContent: "center",
    marginTop: 20,
    // flexDirection: "row"
  },

  textMyBarButton: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    textAlign: "center"
  },

  // myFavoritesImage: {
  //   blurRadius: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   height: '100%',
  //   // opacity: 0.6,
  // },

  myFavoritesButton: {
    width: WIDTH - 55,
    height: 60,
    borderRadius: 25,
    backgroundColor: "#07757D",
    justifyContent: "center",
    marginTop: 20
  },

  textMyFavoritesButton: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    textAlign: "center"
  },

  myNotesButton: {
    width: WIDTH - 55,
    height: 60,
    borderRadius: 25,
    backgroundColor: "#07757D",
    justifyContent: "center",
    marginTop: 20
  },

  textMyNotesButton: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    textAlign: "center"
  }
});
