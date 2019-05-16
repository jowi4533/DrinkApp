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
import bgImage from "../pictures/236.jpg";
import ginBottle from "../pictures/ginBottle.jpg";


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
  constructor(props) {
    super(props)

    this.state = {
      data: [
        {name: 'Gin', selected: false}, {name: 'Vodka', selected: false}, {name: 'Whiskey', selected: false}, {name: 'White Rum', selected: false}, {name: 'Dark Rum', selected: false}, {name: 'Tequila', selected: false},
        {name: 'White Wine', selected: false}, {name: 'Red Wine', selected: false}, {name: 'Blue Wine', selected: false}, {name: 'Schnaps', selected: false},
        {name: 'Absinthe', selected: false},
        {name: 'Rose Wine', selected: false}
      ],
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
  console.log(this.state.isHighlighted)
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
  console.log(this.state.isHighlighted)
}



_keyExtractor = (item, index) => item.name;

  renderItem = ({ item, index }) => {
    if (item.selected === true) {
      return (

        <TouchableOpacity style={styles.itemSelected} onPress={ () => { this._onButtonPress(item) } }>
          <View style={styles.borderView}>
            <ImageBackground source={ginBottle} style={styles.itemPicture}>
              <Text style={styles.itemText}> {item.name} </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>

      );
    }

    return (

        <TouchableOpacity style={styles.item} onPress={ () => { this._onButtonPress(item) } }>
          <View style={styles.itemPictureContainer}>
            <ImageBackground source={ginBottle} style={styles.itemPicture}>
              <Text style={styles.itemText}> {item.name} </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>

    );
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={styles.headerbox}>
            <Text style={styles.headline}>MyBar</Text>
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
  headline: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 25
  },
  headerbox: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd"
  },

  container: {
    flex: 1,
    marginVertical: 1,
  },

  item: {
    activeOpacity: 0,
    borderRadius: 10,
    // underlayColor: 'transparent',
    // onHideUnderlay: 'transparent',
    // activeOpacity: 1,
    backgroundColor: 'rgba(52, 152, 219, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    opacity: 1,
    height: Dimensions.get('window').width / numColumns,
  },

  itemPicture: {
    blurRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',

  },

  itemText: {
    fontSize: 18,
    color: 'black',
  },

  itemSelected: {

    borderRadius: 10,
    backgroundColor: 'rgba(107, 185, 240, 1)',

    //borderWidth: 1,
    //borderColor: 'rgba(240, 52, 52, 1)',

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / numColumns,
  },

  borderView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height:'99.5%',
    width: '99.5%',
    borderWidth: 2,
    borderColor: 'rgba(240, 52, 52, 1)',
    flex: 1,

  },

  itemPictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    width: '100%',


  },

});
