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

const data = [
  {key: 'Gin', selected: false}, {key: 'Vodka', selected: false}, {key: 'Whiskey', selected: false}, {key: 'White Rum', selected: false}, {key: 'Dark Rum', selected: false}, {key: 'Tequila', selected: false},
  {key: 'White Wine', selected: false}, {key: 'Red Wine', selected: false}, {key: 'Blue Wine', selected: false}, {key: 'Schnaps', selected: false},
  {key: 'Absinthe', selected: false},
  {key: 'Rose Wine', selected: false},
];

const numColumns = 3;

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


class MyBarscreen extends Component {

  onBtnClickSelect(item) {
    console.log('inside method')
    this.selected === true;
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
        <Text style={styles.itemText}> {item.key} </Text>
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
            data={data}
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
    marginTop: 10,
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
    underlayColor: 'rgba(253, 227, 167, 1)',
    activeOpacity: 0.75,
    borderRadius: 10,
    backgroundColor: 'rgba(250, 190, 88, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns,
  },

  itemText: {
    fontSize: 18,
    color: 'black',
  },

  itemSelected: {
    underlayColor: 'rgba(253, 227, 167, 1)',
    activeOpacity: 0.75,
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
