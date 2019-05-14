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

class MyFavoriteDrinkscreen extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      vodkaIMG: ""
    };
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
        <View style={styles.headerBox}>
          <Text style={styles.headline}>My Favorites</Text>
        </View>

          <ScrollView>
          <View style={styles.drinkContainer}>
            <TouchableOpacity
              style={styles.buttonDrink}
              onPress={() => this.props.navigation.navigate("SpecDrinks")}
            >
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

  headline: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 25
  },
  headerBox: {
    height: 40,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd"
  },
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
  }
});
