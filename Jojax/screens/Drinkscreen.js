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
      filteredDrinks: []


    };

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
    this.setState(state => {
      state.isHighlighted = [];

    })
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


//----------------    END  Filter button -------------


//----------------      Choose drinks to Display -------------

  displayDrinks(searchBarText){
    this.setState({searchBarText: searchBarText})
    this.loopOverDrinks(searchBarText.toLowerCase())
  }

  loopOverDrinks(searchBarCharacters){
    drinksToDisplay = []
    for(let i = 0; i < this.state.filteredDrinks.length; i++){
      let drinkName = this.state.filteredDrinks[i].name.toLowerCase()

      if(drinkName.includes(searchBarCharacters)){
        drinksToDisplay.push(this.state.filteredDrinks[i])
      }
    }
    if(searchBarCharacters === "Search"){
      if(this.state.isHighlighted.length === 0){
        this.setState({drinksDisplayed: this.state.filteredDrinks})
      }
      this.filterDrinks()
    } else{

      this.setState({drinksDisplayed: drinksToDisplay})

    }
  }

  filterDrinks(){
    //Filters drinks
    filteredDrinks = []
    for (let i = 0; i < this.state.drinks.length; i++){
      let ingredientsInDrink = 0
      for(let j = 0; j < this.state.isHighlighted.length; j++){
        if(this.state.drinks[i].ingredients.hasOwnProperty(this.state.isHighlighted[j])){
          ingredientsInDrink++
        }
      }
      if(ingredientsInDrink === this.state.isHighlighted.length){
        filteredDrinks.push(this.state.drinks[i])
      }
    }

    if(filteredDrinks.length === 0){
      if(this.state.isHighlighted.length !== 0){
        this.setState({filteredDrinks: []})
        this.setState({drinksDisplayed: []})
      }
      else{
        this.setState({filteredDrinks: this.state.drinks})
        this.setState({drinksDisplayed: this.state.drinks})
      }
    } else{
      this.setState({filteredDrinks : filteredDrinks})
      this.setState({drinksDisplayed: filteredDrinks})

    }
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
  renderItemIngredients = ({ item, index }) => {
    return (
      <View>
        <Text style={styles.textDrinkIngredients}>{item}, </Text>
      </View>
    );
  };

  renderItem1 = ({item, index}) => {
    return (
      <View style={styles.drinkContainer}>
        <TouchableOpacity
          style={styles.buttonDrink}
          onPress={() => this.props.navigation.navigate("SpecDrinks", {drink:item})}
        >
          <View style={styles.addToFavoriteButton}>
            <SmallFavoriteButton />
          </View>
          <View>
            <Image
              source={{ uri: item.url }}
              style={styles.imageDrink}
            />
          </View>
          <View style={styles.textBoxContainer}>
            <Text style={styles.textDrinkName}>{item.name}</Text>
            <FlatList
            data={Object.keys(item.ingredients)}
            renderItem={this.renderItemIngredients}
            keyExtractor={item => item.name}
            horizontal= {true}
            extraData={this.state}
          />


          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <View style={styles.innerSearchBox}>
            <EvilIcons name="search" size={30} />
            <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText = {(text) => this.displayDrinks(text)}
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
                  RESET
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
  searchBox: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    backgroundColor: "rgba(236, 236, 236, 1)",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerSearchBox: {
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: 5,
    flexDirection: "row",
    marginRight: '4%',
    borderRadius: 5,
  },
  searchInput: {
    backgroundColor: "white",
    width: WIDTH - WIDTH / 2.9,
    fontSize: 24,
    marginLeft: 10
  },
  buttonFilter: {
    backgroundColor: "white",
    height: 40,
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  textFilterButton: {
    color: "rgba(0,0,0,0.9)",
    fontSize: 14,
    textAlign: "center"
  },
  drinkContainer: {
    height: 105,
    width: WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    flexDirection: "row"
  },
  buttonDrink: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row"
  },
  imageDrink: {
    height: 105,
    width: 105,
  },
  textDrinkName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 15,
    color: "rgba(46, 49, 49, 1)",
    marginRight: 10
  },
  textDrinkIngredients: {
    fontSize: 14,
    marginTop: 15,
    color: "rgba(108, 122, 137, 1)"
  },
  textBoxContainer: {
    width: WIDTH - 105
  },
  addToFavoriteButton:{
    position: 'absolute',
    right:12,
    top:7,
    zIndex:2
  },

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
    backgroundColor: 'white',
    opacity: 0.95,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },

  modalHeadingTextContainer: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
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
    backgroundColor: 'rgba(52, 152, 219, 1)',
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
    backgroundColor: 'green',
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
    color: 'white',
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
    backgroundColor: 'lightgrey',
    height: 35,
    width: 55,
    borderRadius: 8,
  },

  resetButtonText: {
    fontSize: 12,
  },

  okButtonContainer: {
    marginRight: 10,
    marginBottom: 10,
  },

  okButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: 35,
    width: 55,
    borderRadius: 8,
  },

  okButtonText: {
    fontSize: 12,
  },

});
