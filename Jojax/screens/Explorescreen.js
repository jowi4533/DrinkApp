import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from "react-native";

import drImage from "../pictures/long_isle.png";
import bgImage from "../pictures/236.jpg";
import aperol from "../pictures/aperol_spritz.png";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const data = [
  {
    id: 1,
    name: "Long Isle Ice Tea",
    image: require("../pictures/long_isle.png")
  },
  {
    id: 2,
    name: "Aperol Spritz",
    image: require("../pictures/aperol_spritz.png")
  },
  {
    id: 3,
    name: "Long Isle Ice Tea",
    image: require("../pictures/long_isle.png")
  },
  {
    id: 4,
    name: "Aperol Spritz",
    image: require("../pictures/aperol_spritz.png")
  },
  {
    id: 5,
    name: "Long Isle Ice Tea",
    image: require("../pictures/long_isle.png")
  },
  {
    id: 6,
    name: "Aperol Spritz",
    image: require("../pictures/aperol_spritz.png")
  },
  {
    id: 7,
    name: "Long Isle Ice Tea",
    image: require("../pictures/long_isle.png")
  }
];

const data2 = [
  {
    id: 1,
    name: "Cranberry Sangria",
    category: "Fall",
    image: require("../pictures/cranberry_sangria.png")
  },
  {
    id: 2,
    name: "Lavender Lemonade Mojito",
    category: "Spring",
    image: require("../pictures/lavendel.png")
  },
  {
    id: 3,
    name: "Pear Mojito",
    category: "Summer",
    image: require("../pictures/pear_mojito.png")
  },
  {
    id: 4,
    name: "Very Merry Bourbon Alexander",
    category: "Winter",
    image: require("../pictures/very_merry_bourbon_alexander.png")
  }
];

class Explorescreen extends Component {

  constructor(props) {
    super(props);

  }


  renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.discoverWeeklyBox}>
        <Image style={styles.drinkImage} source={item.image} />
        <View style={styles.drinkNameTextContainer}>
          <Text style={styles.drinkNameText}>{item.name}</Text>
        </View>
      </View>
    );
  };
  renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.seasonalBox}
        onPress={() =>
          this.props.navigation.navigate("DrinkCategory", item.category)
        }
      >
        <Image style={styles.seasonalImage} source={item.image} />
        <View style={styles.drinkNameTextContainer}>
          <Text style={styles.seasonalText}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderItem3 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.seasonalBox}
        onPress={() =>
          this.props.navigation.navigate("DrinkCategory", item.category)
        }
      >
        <Image style={styles.baseSpiritImage} source={item.image} />
        <View style={styles.baseSpiritTextContainer}>
          <Text style={styles.baseSpiritsText}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.headline}>Explore</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.discoverWeeklyContainer}>
            <View>
              <Text style={styles.discoverWeeklyText}>Discover Weekly</Text>
            </View>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              <View style={styles.scrollviewContainer}>
                <FlatList
                  data={data}
                  renderItem={this.renderItem1}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.seasonalDrinksContainer}>
            <Text style={styles.seasonalDrinksText}>Seasonal Drinks</Text>

            <View>
              <FlatList
                data={data2}
                renderItem={this.renderItem2}
                keyExtractor={item => item.id}
                numColumns= {2}
              />
            </View>
          </View>
          <View style={styles.classicDrinksContainer}>
            <View>
              <Text style={styles.classicDrinksText}>Classic Drinks</Text>
            </View>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              <View style={styles.scrollviewContainer}>
                <FlatList
                  data={data}
                  renderItem={this.renderItem1}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.seasonalDrinksContainer}>
            <Text style={styles.seasonalDrinksText}>Base Spirits</Text>

            <View>
              <FlatList
                data={data2}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
export default Explorescreen;

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
  discoverWeeklyContainer: {},
  discoverWeeklyBox: {
    backgroundColor: "white",
    marginHorizontal: 5,
    borderRadius: 5
  },
  discoverWeeklyText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  drinkImage: {
    height: WIDTH / 2.6,
    width: WIDTH / 2.6,
    margin: 5
  },
  drinkNameText: {
    fontSize: 16,
    margin: 5,
    fontWeight: "bold"
  },
  drinkNameTextContainer: {
    width: WIDTH / 2.6
  },
  scrollviewContainer: {
    marginLeft: 5,
    marginRight: 5
  },
  backgroundContainer: {
    width: null,
    height: null,
    alignItems: "center"
  },
  seasonalDrinksText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  seasonalImage: {
    width: (WIDTH - 40) / 2,
    height: (WIDTH - 40) / 2,
    margin: 5
  },
  seasonalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 40
  },
  seasonalBox: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 5
  },
  contentContainer: {
    paddingBottom: 40
  },
  classicDrinksContainer: {},
  classicDrinksText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  baseSpiritImage: {
    width: (WIDTH - 40) / 2,
    height: (WIDTH - 40) / 2,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8
  },
  baseSpiritTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  baseSpiritsText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    opacity: 1
  }
});
