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

      userAuth : props.screenProps.userAuth,
      loggedIn : null
    }

    this.setUpNavigationListener()
    this.initiateListener()
  }

  static navigationOptions = {
    title: 'My Bar',
    headerLayoutPreset: 'center',
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
      console.log("In navigationlistener (MYBARSCREEN)")
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
        console.log("In listener, user online (MYBARSCREEN)")
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
      } else {
        console.log("In listener, user offline (MYBARSCREEN)")
      }
    });
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
            <ImageBackground source={ginBottle} style={styles.itemPicture}>
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
            <ImageBackground source={ginBottle} style={styles.itemPicture}>
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
