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
  Dimensions
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
  instance() {
    const data = [
      {name: 'Gin', selected: false}, {name: 'Vodka', selected: false}, {name: 'Whiskey', selected: false}, {name: 'White Rum', selected: false}, {name: 'Dark Rum', selected: false}, {name: 'Tequila', selected: false},
      {name: 'White Wine', selected: false}, {name: 'Red Wine', selected: false}, {name: 'Blue Wine', selected: false}, {name: 'Schnaps', selected: false},
      {name: 'Absinthe', selected: false},
      {name: 'Rose Wine', selected: false},
    ];


    return data;
  }

  onBtnClickSelect(item) {
    console.log('inside method')
    instance(item).selected === true;
    console.log('after item.selected == true')
    console.log(item.selected)
  };

  renderItem = ({ item, index }) => {
    if (item.selected === true) {
      return <TouchableHighlight style={styles.item, styles.itemSelected}>
      </TouchableHighlight>;
    }
    return (
      <TouchableHighlight style={styles.item} onPress={ () => { this.onBtnClickSelect(this.item) }}
      >
        <Text style={styles.itemText}> {item.name} </Text>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={styles.headerbox}>
            <Text style={styles.headline}>MyBar</Text>
          </View>

          <FlatList
            data={this.instance()}
            style={styles.container}
            renderItem={this.renderItem}
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
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd"
  },

  container: {
    flex: 1,
    marginVertical: 1,
  },

  item: {
    borderRadius: 10,
    backgroundColor: '#07757D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / numColumns,
  },

  itemText: {
    fontSize: 18,
    color: 'black',
  },

  itemSelected: {
    borderRadius: 10,
    backgroundColor: 'rgba(250, 190, 88, 1)',

    opacity: 0.8,
    borderWidth: 2,
    borderColor: 'rgba(240, 52, 52, 1)',

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns,
  },
});
