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
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     data: data,
  //
  //   }
  //
  //   console.log(this.state.data)
  //   //console.log(this.item)
  //   console.log(item.selected)
  //
  // }

  state={
    data: [
      {name: 'Gin', selected: false}, {name: 'Vodka', selected: false}, {name: 'Whiskey', selected: false}, {name: 'White Rum', selected: false}, {name: 'Dark Rum', selected: false}, {name: 'Tequila', selected: false},
      {name: 'White Wine', selected: false}, {name: 'Red Wine', selected: false}, {name: 'Blue Wine', selected: false}, {name: 'Schnaps', selected: false},
      {name: 'Absinthe', selected: false},
      {name: 'Rose Wine', selected: false}
    ],
    isHighlighted: [],
  }

_keyExtractor = (item, index) => item.name;


  // onBtnClickSelect(item, index) {
  //   item.selected = true;
  //   this.setState({})
  //   console.log(item.selected)
  // };

  renderItem = ({ item, index }) => {
    return (

      <TouchableHighlight style={styles.item} onPress={ () => { this.setState({ this.state.data[index].selected: true}) ) } }
      >
        <Text style={styles.itemText}> {item.name} </Text>
      </TouchableHighlight>
      </Switch>
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
            extraData={this.state.isHighlighted}
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
