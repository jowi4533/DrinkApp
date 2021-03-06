import React, { Component } from "react";
import { Ionicons, FontAwesome, Entypo, EvilIcons } from "@expo/vector-icons";
import { StackActions } from "react-navigation";
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
import { colors } from "../assets/colors.js";

class Drinkscreen extends Component {
  static navigationOptions = {
    title: "Drinks",
    headerTitleStyle: {
      width: "100%",
      fontFamily: "Quicksand-Medium",
      fontSize: 25,
      color: colors.black
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Gin", selected: false },
        { name: "Vodka", selected: false },
        { name: "Whiskey", selected: false },
        { name: "White Rum", selected: false },
        { name: "Dark Rum", selected: false },
        { name: "Tequila", selected: false },
        { name: "White Wine", selected: false },
        { name: "Red Wine", selected: false },
        { name: "Blue Wine", selected: false },
        { name: "Schnaps", selected: false },
        { name: "Absinthe", selected: false },

      ],
      isHighlighted: [],
      modalVisible: false,
      dataSource: [],
      searchBarText: "",
      searchBarCharacters: "",

      drinks: props.screenProps.drinks,
      drinksDisplayed: [],
      filteredDrinks: [],
      searchBarDrinks: [],
      allFavourites: {},

      userAuth: props.screenProps.userAuth,
      usersDB: props.screenProps.usersDB,
      loggedIn: null
    };
    this.state.drinksDisplayed = this.state.drinks
    this.state.filteredDrinks = this.state.drinks
    this.loadResources()
  }

  loadResources(){
    this.checkUserLoggedIn()
    this.setUpDatabaseListeners()
    this.userListener()
    this.setUpNavigationListener()
  }

  setUpDatabaseListeners(){
    if(this.state.userAuth.currentUser !== null){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{

        let currentUser = loggedInUser.val()
        let myFavouritesRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites")

        myFavouritesRef.on("child_added", (aDrink, prevChildKey) =>{
          let drink = aDrink.val()

          this.state.allFavourites[drink.name] = drink
        })
        myFavouritesRef.on("child_removed", (aDrink) => {
          let drink = aDrink.val()
          delete this.state.allFavourites[drink.name]
        })
      })
    }
  }

  setUpNavigationListener() {
    this.props.navigation.addListener('didFocus', () => {

      this.setState(this.state)
      console.log("In navigationlistener (DRINKSCREEN)")
    });
  }

  checkUserLoggedIn(){
    if(this.state.userAuth.currentUser === null){
      this.state.loggedIn = false
    } else{
      this.state.loggedIn = true
    }
  }

  userListener(){
    this.state.userAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("In listener, user online (DRINKSCREEN)")

        this.setUpDatabaseListeners()
        this.setState({loggedIn : true})

      } else {
        this.setState({loggedIn: false})
        console.log("In listener, user offline (DRINKSCREEN)")
      }
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  //----------------      Filter button -------------
  addToArray(item) {
    var array = this.state.isHighlighted;
    array.push(item.name);
    this.setState(state => {
      state.isHighlighted = array;
    });
  }

  removeFromArray(item) {
    let array = this.state.isHighlighted;

    for (let i = 0; i < this.state.isHighlighted.length; i++) {
      if (this.state.isHighlighted[i] === item.name) {
        array.splice(i, 1);
      }
    }
    this.setState({ isHighlighted: array });
  }

  resetSelected = selected => {
    this.setState(oldState => {
      return {
        // create a new item object with the new key
        data: oldState.data.map((item, index) =>
          Object.assign({}, item, {
            selected: false
          })
        )
      };
    });
    this.state.isHighlighted = [];
    this.filterDrinks();
  };

  _keyExtractor = (item, index) => item.name;

  componentDidMount() {
    const url = "";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          dataSource: responseJson.book_array
        });
      })
      .catch(error => {

      });

  }
  _onButtonPress = item => {
    if (item.selected !== true) {
      this.addToArray(item);
      this.setState(state => {
        item.selected = true;
        return { item };
      });
    } else {
      this.removeFromArray(item);
      this.setState(state => {
        item.selected = false;
        return { item };
      });
    }

    this.filterDrinks()
}


  //----------------    END  Filter button -------------

  //----------------      Choose drinks to Display -------------

  displayDrinks() {
    drinksToDisplay = [];

    if (this.state.searchBarDrinks.length !== 0) {
      for (let i = 0; i < this.state.searchBarDrinks.length; i++) {
        if (this.state.filteredDrinks.length === 0) {
          this.setState({ drinksDisplayed: this.state.searchBarDrinks });
        } else {
          for (let j = 0; j < this.state.filteredDrinks.length; j++) {
            if (
              this.state.searchBarDrinks[i] === this.state.filteredDrinks[j]
            ) {
              drinksToDisplay.push(this.state.searchBarDrinks[i]);
            }
          }
          this.setState({ drinksDisplayed: drinksToDisplay });
        }
      }
    } else {
      if (this.state.searchBarCharacters.length !== 0) {
        this.setState({ drinksDisplayed: [] });
      } else {
        this.setState({ drinksDisplayed: this.state.filteredDrinks });
      }
    }
  }

  loopOverDrinks(searchBarCharacters) {
    searchBarDrinks = [];
    this.state.searchBarCharacters = searchBarCharacters;
    for (let i = 0; i < this.state.drinks.length; i++) {
      let drinkName = this.state.drinks[i].name.toLowerCase();

      if (drinkName.includes(searchBarCharacters)) {
        searchBarDrinks.push(this.state.drinks[i]);
      }
    }

    if (searchBarCharacters === "") {
      this.state.searchBarDrinks = this.state.drinks;
    } else {
      this.state.searchBarDrinks = searchBarDrinks;
    }
    this.displayDrinks();
  }

  filterDrinks() {
    //Filters drinks
    filteredDrinks = [];
    for (let i = 0; i < this.state.drinks.length; i++) {
      let ingredientsInDrink = 0;
      for (let j = 0; j < this.state.isHighlighted.length; j++) {
        if (
          this.state.drinks[i].allIngredients.hasOwnProperty(
            this.state.isHighlighted[j]
          )
        ) {
          if (filteredDrinks.includes(this.state.drinks[i])) {
          } else {
            filteredDrinks.push(this.state.drinks[i]);
          }
        }
      }
      if (ingredientsInDrink === this.state.isHighlighted.length) {
      }
    }

    if (filteredDrinks.length === 0) {
      if (this.state.isHighlighted.length !== 0) {
        this.state.filteredDrinks = [];
      } else {
        this.state.filteredDrinks = this.state.drinks;
      }
    } else {
      this.state.filteredDrinks = filteredDrinks;
    }
    this.displayDrinks();
  }

  updateFavourites = (drinkData, favourited) => {

    if(favourited){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{

        this.state.allFavourites[drinkData.name] = drinkData
        let currentUser = loggedInUser.val()
        let myFavouritesRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites")

        myFavouritesRef.set(this.state.allFavourites)
        })
    }
      else{
        this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
          (loggedInUser) =>{

          let currentUser = loggedInUser.val()
          let removeFavouriteRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites").child(drinkData.name)
          removeFavouriteRef.remove()
          })
    }
  }

  renderItem = ({ item, index }) => {
    if (item.selected === true) {
      return (
        <TouchableOpacity
          style={styles.modalItemSelected}
          onPress={() => {
            this._onButtonPress(item);
          }}
        >
          <View style={styles.modalItemContainer}>
            <Text style={styles.modalItemText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.modalItem}
        onPress={() => {
          this._onButtonPress(item);
        }}
      >
        <View style={styles.modalItemContainer}>
          <Text style={styles.modalItemText}> {item.name} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  getIngredients = data => {
    var string = data.toString();
    string = string.replace(/,/g, ", ");
    return string;
  };

  renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.drinkContainer}>
        <TouchableOpacity
          style={styles.buttonDrink}
          onPress={() =>
            this.props.navigation.navigate("SpecDrinks",
            { drink: item,
              myFavourites: this.state.allFavourites,
              loggedIn: this.state.loggedIn,
              usersDB: this.state.usersDB,
            })
          }
        >
          <View>
            <Image source={{ uri: item.url }} style={styles.imageDrink} />
          </View>
          <View style={styles.itemTextContainer}>
            <View style={styles.textHeadingContainer}>
              <Text style={styles.textDrinkName}>{item.name}</Text>
              <View style={styles.SmallFavoriteButtonContainer}>
                {this.state.loggedIn ? (
                <SmallFavoriteButton
                drink = {item}
                myFavourites = {this.state.allFavourites}
                updateFavourites = {this.updateFavourites}
                >
                </SmallFavoriteButton>
              ):(
                <View>
                </View>
              )
            }
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
        <View style={styles.searchAndFilterBackground}>
          <View style={styles.searchAndFilterContainer}>
          <View style={styles.searchContainer}>
            <EvilIcons name="search" size={30} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="darkgray"
              style={styles.searchInput}
              onChangeText={text => this.loopOverDrinks(text.toLowerCase())}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonFilter}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text style={styles.textFilterButton}> Filter </Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingBottom: 70 }}>
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
              Alert.alert("Modal has been closed.");
            }}
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeadingTextContainer}>
                <Text style={styles.modalHeadingText}>Ingredients</Text>
              </View>
              <View style={styles.modalFlatListContainer}>
                <FlatList
                  data={this.state.data}
                  extraData={this.state}
                  contentContainerStyle={styles.modalFlatList}
                  renderItem={this.renderItem}
                  keyExtractor={this._keyExtractor}
                />
              </View>
              <View style={styles.modalButtonContainer}>
                <View style={styles.resetButtonContainer}>
                  <TouchableHighlight
                    style={styles.resetButton}
                    onPress={() => {
                      this.resetSelected();
                    }}
                    renderItem={this.renderItem}
                  >
                    <Text style={styles.resetButtonText}>Reset</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.okButtonContainer}>
                  <TouchableHighlight
                    style={styles.okButton}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Text style={styles.okButtonText}>OK</Text>
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
  searchAndFilterBackground: {
    height: 75,
    //borderBottomWidth: 1,
    //borderBottomColor: colors.midgray,
    backgroundColor: colors.midblue,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  searchAndFilterContainer: {
    flexDirection: "row",
    width: WIDTH/1.1,
    justifyContent: 'space-between',
    alignItems: "center",
  },

  searchContainer: {
    elevation: 10,
    width: WIDTH * 0.7118,
    height: 45,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingLeft: 5,
    flexDirection: "row",
    borderRadius: 10
  },
  searchInput: {
    backgroundColor: colors.white,
    width: WIDTH * 0.58,
    fontSize: 20,
    marginLeft: 6,
    fontFamily: "Quicksand-Regular"
  },
  buttonFilter: {
    elevation: 10,
    backgroundColor: colors.white,
    height: 45,
    justifyContent: "center",
    padding: 10,
    borderRadius: 10
  },
  textFilterButton: {
    fontFamily: "Quicksand-Medium",
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
    width: 105
  },
  textDrinkName: {
    width: "78%",
    fontSize: 18,
    fontFamily: "Quicksand-Medium",
    marginLeft: 15,
    marginTop: 15,
    color: colors.black

  },

  textHeadingContainer: {
    width: WIDTH - 105,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  ingredientsTextContainer: {
    marginLeft: 15,
    width: "80%"
  },

  ingredientsText: {
    fontFamily: "Quicksand-Regular",
    textTransform: "capitalize",
    fontSize: 14,
    color: colors.darkgray
  },

  modalContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },

  modalContent: {
    top: "20%",
    elevation: 10,
    alignSelf: "center",
    height: "50%",
    width: "80%",
    backgroundColor: colors.white,
    opacity: 0.95,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkgray
  },

  modalHeadingTextContainer: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray
  },

  modalHeadingText: {
    fontSize: 18,
    fontWeight: "bold"
  },

  modalFlatList: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  modalFlatListContainer: {
    flex: 1
  },

  modalItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    borderRadius: 12,
    backgroundColor: colors.midblue,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginVertical: 5,
    width: WIDTH * 0.9 * 0.25
  },

  modalItemSelected: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    borderRadius: 12,
    backgroundColor: colors.darkgreen,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginVertical: 5,
    width: WIDTH * 0.9 * 0.25
  },

  modalItemContainer: {
    flexDirection: "row"
  },

  modalItemText: {
    flexDirection: "row",
    fontSize: 13,
    color: colors.white,
    paddingVertical: 8
  },

  modalButtonContainer: {
    //alignItems: 'flex-end',
    justifyContent: "space-between",
    flexDirection: "row"
  },

  resetButtonContainer: {
    marginLeft: 10,
    marginBottom: 10
  },

  resetButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.verylightred,
    height: 35,
    width: 55,
    borderRadius: 8
  },

  resetButtonText: {
    color: colors.black,
    fontSize: 12
  },

  okButtonContainer: {
    marginRight: 10,
    marginBottom: 10
  },

  okButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightgreen,
    height: 35,
    width: 55,
    borderRadius: 8
  },

  okButtonText: {
    color: colors.black,
    fontSize: 12
  },
  SmallFavoriteButtonContainer: {}
});
