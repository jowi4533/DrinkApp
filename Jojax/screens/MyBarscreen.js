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
  TouchableNativeFeedback,
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


const numColumns = 2;

class MyBarscreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [{name:"Amaretto",selected: false, img:require("../pictures/systembolagetPics/1.png")},
      {name:"Blue Curacau",selected: false, img:require("../pictures/systembolagetPics/2.jpg")},
      {name:"Brandy",selected: false, img:require("../pictures/systembolagetPics/3.jpg")},
      {name:"Champange",selected: false, img:require("../pictures/systembolagetPics/4.jpg")},
      {name:"Coconut Liqueur",selected: false, img:require("../pictures/systembolagetPics/5.jpg")},
      {name:"Coffe Liqueur",selected: false, img:require("../pictures/systembolagetPics/6.jpg")},
      {name:"Cointreau",selected: false, img:require("../pictures/systembolagetPics/7.jpg")},
      {name:"Dark Rum",selected: false, img:require("../pictures/systembolagetPics/8.jpg")},
      {name:"White Rum",selected: false, img:require("../pictures/systembolagetPics/9.jpg")},
      {name:"Golden Rum",selected: false, img:require("../pictures/systembolagetPics/10.jpg")},
      {name:"Ginger Beer",selected: false, img:require("../pictures/systembolagetPics/11.jpg")},
      {name:"Grand Marnier",selected: false, img:require("../pictures/systembolagetPics/12.jpg")},
      {name:"Melon Liqueur",selected: false, img:require("../pictures/systembolagetPics/13.jpg")},
      {name:"Red Vermouth",selected: false, img:require("../pictures/systembolagetPics/14.jpg")},
      {name:"White Vemouth",selected: false, img:require("../pictures/systembolagetPics/15.jpg")},
      {name:"Red Wine",selected: false, img:require("../pictures/systembolagetPics/16.jpg")},
      {name:"White Wine",selected: false, img:require("../pictures/systembolagetPics/17.jpg")},
      {name:"Sparkling Wine",selected: false, img:require("../pictures/systembolagetPics/18.jpg")},
      {name:"Tequila",selected: false, img:require("../pictures/systembolagetPics/19.jpg")},
      {name:"Triple Sec",selected: false, img:require("../pictures/systembolagetPics/20.jpg")},
      {name:"Vodka",selected: false, img:require("../pictures/systembolagetPics/21.jpg")},
      {name:"Whiskey",selected: false, img:require("../pictures/systembolagetPics/22.jpg")},
      {name:"Gin",selected: false, img:require("../pictures/systembolagetPics/23.jpg")},
      {name:"Kiss",selected: false, img:require("../pictures/systembolagetPics/23.jpg")}],

      isHighlighted:[],
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
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item} onPress={ () => { this._onButtonPress(item) } }>
          <View style={[item.selected ? styles.borderViewSelected : styles.borderView]}>
            <View style={styles.itemPictureContainer}>
            <ImageBackground resizeMode='contain' source={item.img} style={styles.itemPicture}>
            </ImageBackground>
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}> {item.name} </Text>
            </View>
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 15,
    //height: HEIGHT/3,
    height: Dimensions.get('window').width / numColumns, //.width can be changed to .height
  },

  borderView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
  },

  borderViewSelected: {
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
    flex: 1,
    width: '100%',
  },

  itemPicture: {
    paddingTop: 2,
    justifyContent: 'flex-end',
    //borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    // width: '100%',
    // height: '100%',
    resizeMode: 'stretch',
  },

  itemTextContainer: {
    alignItems: 'center',
    backgroundColor: 'dimgray',
    opacity: 1,
    width: '100%',
    borderRadius: 8,
  },

  itemText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },

});
