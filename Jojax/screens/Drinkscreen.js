import React, { Component } from "react";
import { Ionicons, FontAwesome, Entypo, EvilIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
  Modal,
  Alert,
  FlatList
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

import SmallFavoriteButton from "../components/SmallFavoriteButton.js";
import {colors} from "../assets/colors.js";

class Drinkscreen extends Component {
  static navigationOptions = {
    title: 'Drinks',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Gin', selected: false}, {name: 'Vodka', selected: false}, {name: 'Whiskey', selected: false}, {name: 'White Rum', selected: false}, {name: 'Dark Rum', selected: false}, {name: 'Tequila', selected: false},
        {name: 'White Wine', selected: false}, {name: 'Red Wine', selected: false}, {name: 'Blue Wine', selected: false}, {name: 'Schnaps', selected: false},
        {name: 'Absinthe', selected: false},
        {name: 'Rose Wine', selected: false}
      ],
      isHighlighted: [],
      modalVisible: false,
      dataSource: [],
      searchBarText: "",

      drinks: props.screenProps.drinks,
      drinksDisplayed: [],
      filteredDrinks: [],
      searchBarDrinks: [],

      userAuth : props.screenProps.userAuth,
      loggedIn : null,

    };

    this.setUpNavigationListener()
    this.initiateListener()
  }

  setUpNavigationListener() {
    this.props.navigation.addListener('didFocus', () => {
      this.checkUserLoggedIn()
      // get your new data here and then set state it will rerender
      console.log("In navigationlistener (DRINKSCREEN)")
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

//----------------      Filter button -------------
  addToArray(item) {
    var array = this.state.isHighlighted;
    array.push(item.name.toLowerCase());
    this.setState(state => {
    state.isHighlighted = array;
    })
  }

  removeFromArray(item) {
    let array = this.state.isHighlighted;

    for (let i = 0; i < this.state.isHighlighted.length; i++) {
      if (this.state.isHighlighted[i] === item.name.toLowerCase()) {
        array.splice(i, 1);
      }
    }
    this.setState({isHighlighted: array})
  }

resetSelected = (selected) => {
    this.setState(oldState => {
        return {
          // create a new item object with the new key
          data: oldState.data.map((item, index) => Object.assign({}, item,    {
            selected: false
          }))
        }
    })
    this.state.isHighlighted = []
    this.filterDrinks()
}

_keyExtractor = (item, index) => item.name;

  componentDidMount() {
    this.setState({drinksDisplayed: this.state.drinks})
    this.setState({filteredDrinks: this.state.drinks})
    const url = "";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          dataSource: responseJson.book_array
        });
      })
      .catch(error => {
        //console.log(error);
      });

      this.checkUserLoggedIn()
  }
  _onButtonPress = item => {
    if (item.selected !== true) {
      this.addToArray(item);
      this.setState(state => {
      item.selected = true;
      return {item}
      })
    }
    else {

      this.removeFromArray(item);
      this.setState(state => {
      item.selected = false;
      return {item}
    })
    }

    this.filterDrinks()
}

//User related

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
      console.log("In listener, user online (DRINKSCREEN)")
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
    } else {
      console.log("In listener, user offline (DRINKSCREEN)")
    }
  });
}


//----------------    END  Filter button -------------


//----------------      Choose drinks to Display -------------

  displayDrinks(){
    drinksToDisplay = []

    if(this.state.searchBarDrinks.length !== 0){
      for(let i = 0; i < this.state.searchBarDrinks.length; i++){
        if(this.state.filteredDrinks.length === 0){
          this.setState({drinksDisplayed: this.state.searchBarDrinks})
        }
        else {
          for(let j = 0; j < this.state.filteredDrinks.length; j++){
            if(this.state.searchBarDrinks[i] === this.state.filteredDrinks[j]){
              drinksToDisplay.push(this.state.searchBarDrinks[i])
            }
          }
          this.setState({drinksDisplayed: drinksToDisplay})
        }
      }
    } else{
      this.setState({drinksDisplayed: this.state.filteredDrinks})

    }

  }

  loopOverDrinks(searchBarCharacters){
    searchBarDrinks = []
    for(let i = 0; i < this.state.drinks.length; i++){
      let drinkName = this.state.drinks[i].name.toLowerCase()

      if(drinkName.includes(searchBarCharacters)){
        searchBarDrinks.push(this.state.drinks[i])
      }
    }

    if(searchBarCharacters === ""){
        this.state.searchBarDrinks = this.state.drinks
    } else{
      this.state.searchBarDrinks = searchBarDrinks
    }
    this.displayDrinks()
  }

  filterDrinks(){
    //Filters drinks
    filteredDrinks = []
    for (let i = 0; i < this.state.drinks.length; i++){
      let ingredientsInDrink = 0
      for(let j = 0; j < this.state.isHighlighted.length; j++){
        if(this.state.drinks[i].allIngredients.hasOwnProperty(this.state.isHighlighted[j])){
          if(filteredDrinks.includes(this.state.drinks[i])){
          } else{
              filteredDrinks.push(this.state.drinks[i])
          }
        }
      }
      if(ingredientsInDrink === this.state.isHighlighted.length){

      }
    }

    if(filteredDrinks.length === 0){
      if(this.state.isHighlighted.length !== 0){
        this.state.filteredDrinks = []
      }
      else{
        this.state.filteredDrinks = this.state.drinks
      }
    } else{
      this.state.filteredDrinks = filteredDrinks
    }
    this.displayDrinks()
  }

  renderItem = ({ item, index }) => {
    if (item.selected === true) {
      return (
        <TouchableOpacity style={styles.modalItemSelected} onPress={ () => { this._onButtonPress(item) } }>
          <View style={styles.modalItemContainer}>
              <Text style={styles.modalItemText}> {item.name} </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
        <TouchableOpacity style={styles.modalItem} onPress={ () => { this._onButtonPress(item) } }>
          <View style={styles.modalItemContainer}>
              <Text style={styles.modalItemText}> {item.name} </Text>
          </View>
        </TouchableOpacity>
    );
  };

  // renderItemIngredients = ({ item, index }) => {
  //   return (
  //     <View>
  //       <Text style={styles.textDrinkIngredients}>{item}, </Text>
  //     </View>
  //   );
  // };

  getIngredients = (data) => {
    var string = data.toString();
    string = string.replace(/,/g, ", ");
    return (string)
  };

  renderItem1 = ({item, index}) => {
    return (
      <View style={styles.drinkContainer}>
        <TouchableOpacity
          style={styles.buttonDrink}
          onPress={() => this.props.navigation.navigate("SpecDrinks", {drink:item})}
        >
          <View>
            <Image
              source={{ uri: item.url }}
              style={styles.imageDrink}
            />
          </View>
          <View style={styles.itemTextContainer}>
            <View style={styles.textHeadingContainer}>
              <Text style={styles.textDrinkName}>{item.name}</Text>
              <View style={styles.SmallFavoriteButtonContainer}>
                <SmallFavoriteButton>
                </SmallFavoriteButton>
              </View>
            </View>

            <View style={styles.ingredientsTextContainer}>
              <Text style={styles.ingredientsText}>
                {this.getIngredients(Object.keys(item.allIngredients))}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchAndFilterContainer}>
          <View style={styles.searchContainer}>
            <EvilIcons name="search" size={30} />
            <TextInput
            placeholder="Search"
            placeholderTextColor='darkgray'
            style={styles.searchInput}
            onChangeText = {(text) => this.loopOverDrinks(text.toLowerCase())}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonFilter}
            onPress={() => { this.setModalVisible(true); }}
          >
            <Text style={styles.textFilterButton}> Filter </Text>
          </TouchableOpacity>
        </View>
        <View style= {{paddingBottom: 70}}>
          <FlatList
            data={this.state.drinksDisplayed}
            renderItem={this.renderItem1}
            keyExtractor={item => item.name}
            extraData={this.state}
          />
        </View>

        <View style={styles.modalContainer}>
        <Modal
          style={styles.modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeadingTextContainer}>
              <Text style={styles.modalHeadingText}>
                Ingredients
              </Text>
            </View>
              <View style={styles.modalFlatListContainer}>
                <FlatList
                  data={this.state.data}
                  extraData={this.state}
                  contentContainerStyle={styles.modalFlatList}
                  renderItem={this.renderItem}
                  keyExtractor={this._keyExtractor}
                >
                </FlatList>
              </View>
            <View style={styles.modalButtonContainer}>
              <View style={styles.resetButtonContainer}>
              <TouchableHighlight style={styles.resetButton}
                onPress={() => {
                  this.resetSelected();
                }}
                renderItem={this.renderItem}
              >
                <Text style={styles.resetButtonText}>
                  Reset
                </Text>
              </TouchableHighlight>
              </View>
              <View style={styles.okButtonContainer}>
              <TouchableHighlight style={styles.okButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.okButtonText}>
                  OK
                </Text>
              </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        </View>
      </View>
    );
  }
}
export default Drinkscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchAndFilterContainer: {
    height: 75,
    //borderBottomWidth: 1,
    //borderBottomColor: colors.midgray,
    backgroundColor: colors.midblue,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchContainer: {
    elevation: 10,
    width: WIDTH*0.7118,
    height: 45,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingLeft: 5,
    flexDirection: "row",
    marginRight: 12,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: colors.white,
    width: WIDTH*0.58,
    fontSize: 20,
    marginLeft: 6,
    //marginRight: 1.5,
  },
  buttonFilter: {
    elevation: 10,
    backgroundColor: colors.white,
    height: 45,
    justifyContent: "center",
    padding: 10,
    marginLeft: 12,
    borderRadius: 10,
  },
  textFilterButton: {
    fontFamily: 'Quicksand-Medium',
    color: colors.black,
    fontSize: 14,
    textAlign: "center"
  },
  drinkContainer: {
    height: 105.8,
    width: WIDTH,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.midgray,
    flexDirection: "row"
  },
  buttonDrink: {
    flex: 1,
    flexDirection: "row"
  },
  imageDrink: {
    height: 105,
    width: 105,
  },
  textDrinkName: {
    width: '78%',
    fontSize: 18,
    //fontWeight: "bold",
    fontFamily: 'Quicksand-Medium',
    marginLeft: 15,
    marginTop: 15,
    color: colors.black,
    //marginRight: 10,
  },
  // textDrinkIngredients: {
  //   fontSize: 14,
  //   fontFamily: 'Quicksand-Medium',
  //   color: colors.darkgray
  // },
  textHeadingContainer: {
    width: WIDTH - 105,
    flexDirection: "row",
    justifyContent: 'space-between',
  },

  ingredientsTextContainer: {
    marginLeft: 15,
    width: '80%',
  },

  ingredientsText: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: colors.darkgray,
  },
  //addToFavoriteButton:{
  //  position: 'absolute',
  //  right:12,
  //  top:7,
  //  zIndex:2
  //},

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    top: '20%',
    elevation: 10,
    alignSelf: 'center',
    height: '50%',
    width: '80%',
    backgroundColor: colors.white,
    opacity: 0.95,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkgray,
  },

  modalHeadingTextContainer: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
  },

  modalHeadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalFlatList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  modalFlatListContainer: {
    flex: 1,
  },

  modalItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: colors.midblue,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginVertical: 5,
    width: WIDTH*0.9*0.25,
  },

  modalItemSelected: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: colors.darkgreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginVertical: 5,
    width: WIDTH*0.9*0.25,
  },

  modalItemContainer: {
    flexDirection: 'row',
  },

  modalItemText: {
    flexDirection: 'row',
    fontSize: 13,
    color: colors.white,
    paddingVertical: 8,
  },

  modalButtonContainer: {
    //alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },

  resetButtonContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },

  resetButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.verylightred,
    height: 35,
    width: 55,
    borderRadius: 8,
  },

  resetButtonText: {
    color: colors.black,
    fontSize: 12,
  },

  okButtonContainer: {
    marginRight: 10,
    marginBottom: 10,
  },

  okButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightgreen,
    height: 35,
    width: 55,
    borderRadius: 8,
  },

  okButtonText: {
    color: colors.black,
    fontSize: 12,
  },
  SmallFavoriteButtonContainer:{
  },

});
