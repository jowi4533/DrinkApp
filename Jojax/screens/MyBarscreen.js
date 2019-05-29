import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  ScrollView,
  Dimensions,
  Switch,
  NativeModules
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
import one from "../pictures/mybarSpirits/dark_rum_bottle.png";
import two from "../pictures/mybarSpirits/amaretto_bottle.png";
import three from "../pictures/mybarSpirits/ginger_beer_bottle.png";
import four from "../pictures/mybarSpirits/blue_curacao_liqueur_bottle.png";
import five from "../pictures/mybarSpirits/brandy_bottle.png";
import six from "../pictures/mybarSpirits/champange_bottle.png";
import seven from "../pictures/mybarSpirits/coconut_liqueur_bottle.png";
import eight from "../pictures/mybarSpirits/coffe_liqueur_bottle.png";
import nine from "../pictures/mybarSpirits/cointreau_bottle.png";
import ten from "../pictures/mybarSpirits/golden_rum_bottle.png";
import eleven from "../pictures/mybarSpirits/grand_marnier_bottle.png";
import twelve from "../pictures/mybarSpirits/melon_liqueur_bottle.jpg";
import thirteen from "../pictures/mybarSpirits/red_vermouth_bottle.png";
import fourteen from "../pictures/mybarSpirits/red_wine_bottle.png";
import fiveteen from "../pictures/mybarSpirits/sparkling_wine_bottle.png";
import sixteen from "../pictures/mybarSpirits/tequila_bottle.png";
import seventeen from "../pictures/mybarSpirits/triple_sec_bottle.png";
import eighteen from "../pictures/mybarSpirits/vodka_bottle.png";
import nineteen from "../pictures/mybarSpirits/whiskey_bottle.png";
import twenty from "../pictures/mybarSpirits/white_rum_bottle.png";
import twentyone from "../pictures/mybarSpirits/white_vermouth_bottle.png";
import twentytwo from "../pictures/mybarSpirits/white_wine_bottle.png";

import bgImage from "../pictures/236.jpg";
import ginBottle from "../pictures/ginBottle.jpg";
import {colors} from "../assets/colors.js";


// const formatData = (data, numColumns) => {
//   const numberOfFullRows = Math.floor(data.length / numColumns);
//
//   let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
//   while (numberOfElementsLastRow !== numColumns &&  numberOfElementsLastRow !== 0) {
//     data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
//     numberOfElementsLastRow = numberOfElementsLastRow + 1;
//   }
//
//   return data;
// };


const numColumns = 3;

class MyBarscreen extends Component {
  static navigationOptions = {
    title: 'My Bar',
    headerLayoutPreset: 'center',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };
  constructor(props) {
    super(props)

    this.state = {
      data: [{name:"Amaretto",selected: false, img:require("../pictures/mybarSpirits/dark_rum_bottle.png")}, {name:"Blue Curacau Liqueur",selected: false, img:require("../pictures/mybarSpirits/amaretto_bottle.png")},{name:"Brandy",selected: false, img:require("../pictures/mybarSpirits/ginger_beer_bottle.png")},{name:"Champange",selected: false, img:require("../pictures/mybarSpirits/blue_curacao_liqueur_bottle.png")},
      {name:"Coconut Liqueur",selected: false, img:require("../pictures/mybarSpirits/brandy_bottle.png")},
      {name:"Coffe Liqueur",selected: false, img:require("../pictures/mybarSpirits/champange_bottle.png")},
      {name:"Cointreau",selected: false, img:require("../pictures/mybarSpirits/coconut_liqueur_bottle.png")},
      {name:"Dark Rum",selected: false, img:require("../pictures/mybarSpirits/coffe_liqueur_bottle.png")},
      {name:"White Rum",selected: false, img:require("../pictures/mybarSpirits/cointreau_bottle.png")},
      {name:"Golden Rum",selected: false, img:require("../pictures/mybarSpirits/golden_rum_bottle.png")},
      {name:"Ginger Beer",selected: false, img:require("../pictures/mybarSpirits/grand_marnier_bottle.png")},
      {name:"Grand Marnier",selected: false, img:require("../pictures/mybarSpirits/melon_liqueur_bottle.jpg")},
      {name:"Melon Liqueur",selected: false, img:require("../pictures/mybarSpirits/red_vermouth_bottle.png")},
      {name:"Red Vermouth",selected: false, img:require("../pictures/mybarSpirits/red_wine_bottle.png")},
      {name:"White Vemouth",selected: false, img:require("../pictures/mybarSpirits/sparkling_wine_bottle.png")},
      {name:"Red Wine",selected: false, img:require("../pictures/mybarSpirits/tequila_bottle.png")},
      {name:"White Wine",selected: false, img:require("../pictures/mybarSpirits/triple_sec_bottle.png")},
      {name:"Sparkling Wine",selected: false, img:require("../pictures/mybarSpirits/vodka_bottle.png")},
      {name:"Tequila",selected: false, img:require("../pictures/mybarSpirits/whiskey_bottle.png")},
      {name:"Triple Sec",selected: false, img:require("../pictures/mybarSpirits/white_rum_bottle.png")},
      {name:"Vodka",selected: false, img:require("../pictures/mybarSpirits/white_vermouth_bottle.png")},
      {name:"Whiskey",selected: false, img:require("../pictures/mybarSpirits/white_wine_bottle.png")}],

      isHighlighted: [],
    }
  }

  _onButtonPress = item => {
      if (item.selected !== true) {
        this._addToArray(item);
        this.setState(state => {
        item.selected = true;
        return {item}
        })
      }
      else {
        this._removeFromArray(item);
        this.setState(state => {
        item.selected = false;
        return {item}
      })
      }
  }

_addToArray(item) {
  var array = this.state.isHighlighted;
  array.push(item.name);
  this.setState(state => {
  state.isHighlighted = array;
  })

}

_removeFromArray(item) {
  var array = this.state.isHighlighted;
  var search_term = item.name;

  for (var i = array.length-1; i >= 0; i--) {
    if (array[i] === search_term) {
      array.splice(i, 1);
    }
  }

  this.setState(state => {
  state.isHighlighted = array;
  })

}



_keyExtractor = (item, index) => item.name;

  renderItem = ({ item, index }) => {
    if (item.selected === true) {
      return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.itemSelected} onPress={ () => { this._onButtonPress(item) } }>
          <View style={styles.borderView}>
            <ImageBackground source={item.img} style={styles.itemPicture}>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}> {item.name} </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>

      );
    }

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} onPress={ () => { this._onButtonPress(item) } }>
          <View style={styles.itemPictureContainer}>
            <ImageBackground source={item.img} style={styles.itemPicture}>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}> {item.name} </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.informationTextContainer}>
          <Text style={styles.informationText}>Select the ingredients you have at home to see what drinks you can make</Text>
        </View>

          <FlatList
            data={this.state.data}
            extraData={this.state}
            style={styles.container}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={numColumns}
          >
        </FlatList>

      </ImageBackground>
    );
  }
}

export default MyBarscreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginVertical: 1,
  },

  informationTextContainer: {
    width: WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    },

  informationText: {
    color: "rgba(108, 122, 137, 1)",
    fontSize: 18,
    //fontWeight: 'bold',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  itemContainer: {
    flex: 1,
    elevation: 20,
  },

  item: {
    elevation: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(189, 195, 199, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 15,
    height: Dimensions.get('window').width / numColumns,
  },

  itemSelected: {
    elevation: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(218, 223, 225, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 15,
    height: Dimensions.get('window').width / numColumns,
  },

  itemPicture: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',

  },

  itemTextContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(108, 122, 137, 0.5)',
    opacity: 1,
    width: '100%',
    borderRadius: 8,
  },

  itemTextContainer2: {
    alignItems: 'center',
    backgroundColor: 'rgba(108, 122, 137, 0.5)',
    opacity: 1,
    width: '100%',
    borderRadius: 10,
  },

  itemText: {
    fontSize: 18,
    color: 'white',
  },

  borderView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height:'100%',
    width: '100%',
    borderWidth: 2,
    borderColor: 'rgba(240, 52, 52, 1)',
    flex: 1,

  },

  itemPictureContainer: {
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    width: '100%',


  },

});
