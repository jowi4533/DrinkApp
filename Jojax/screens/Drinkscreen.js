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
import ginBottle from "../pictures/ginBottle.jpg";

const data1 = [
  {
    name: "Bloody Mary",
    ingredients:
      "Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice"
  },
  {
    name: "Long Isle Ice Tea",
    ingredients:
      "Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice"
  },
  {
    name: "Gin Tonic",
    ingredients:
      "Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice"
  },
  {
    name: "Dry Martini",
    ingredients:
      "Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice"
  },
  {
    name: "Sex On the Beach",
    ingredients:
      "Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice"
  },
  {
    name: "Mojito",
    ingredients:
      "Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice"
  },
  {
    name: "Pear Mojito",
    ingredients:
      "Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice"
  },
  {
    name: "Aperol Spritz",
    ingredients:
      "Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon Juice, Cola, Ice"
  }
];



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
      modalVisible: false,
      dataSource: [],

      allDrinkKeys: props.screenProps.allDrinkKeys,
      allDrinkItems: props.screenProps.allDrinkItems,

      //Images later to be loaded
      drinkImages: [],
      drinkNames: [],

      drinks: [
      ],

    };

  }


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

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
        //console.log(error);
      });

  }

  componentWillMount(){
    //Loads the image, takes time to fetch from database
    this.loadImages()


  }

  loadImages(){
    //var aperol = this.state.allDrinkKeys[0];
    //var cranberrySangria = this.state.allDrinkKeys[1];
    let allDrinks = []
    for (let i = 0; i < this.state.allDrinkKeys.length; i++){
      let k = this.state.allDrinkKeys[i];

      let drink = {
        name: this.state.allDrinkItems[k].name,
        url: this.state.allDrinkItems[k].URL
      }
      allDrinks.push(drink)
    }
    this.setState({drinks: allDrinks})

  }

  pageContent() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.textHeader}> Drinks </Text>
        </View>
        <View style={styles.searchBox}>
          <View style={styles.innerSearchBox}>
            <EvilIcons name="search" size={30} />
            <TextInput placeholder="Search" style={styles.searchInput} />
            <TouchableOpacity style={styles.buttonFilter}>
              <Text style={styles.textFilterButton}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView scrollEventThrottle={16}>
          <View style={styles.drinkContainer}>
            <TouchableOpacity
              style={styles.buttonDrink}
              onPress={() => this.props.navigation.navigate("SpecDrinks")}
            >
              <View>
                <Image
                  source={{ uri: this.state.drinkImages[0] }}
                  style={styles.imageDrink}
                />
              </View>
              <View style={styles.textBoxContainer}>
                <Text style={styles.textDrinkName}>Long Island Ice Tea</Text>
                <Text style={styles.textDrinkIngredients}>
                  Gin, White Rum, Tequila, Triple Sec, Vodka, Syrup, Lemon
                  Juice, Cola, Ice
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }


  renderItem1 = ({item, index}) => {

    return (
      <View style={styles.drinkContainer}>
        <TouchableOpacity
          style={styles.buttonDrink}
          onPress={() => this.props.navigation.navigate("SpecDrinks")}
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
            <TextInput placeholder="Search" style={styles.searchInput} />
          </View>
          <TouchableOpacity
            style={styles.buttonFilter}
            onPress={() => { this.setModalVisible(true); }}
          >
            <Text style={styles.textFilterButton}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style= {{paddingBottom: 70}}>
          <FlatList
            data={this.state.drinks}
            renderItem={this.renderItem1}
            keyExtractor={item => item.name}
            extraData={this.state}
          />
        </View>

        <View style={styles.modalContainer}>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <View style={styles.modalContent}>
              <Text>Hello World!</Text>

              <TouchableHighlight style={styles.hideModalButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
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
    marginLeft: 15,
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
    height: '60%',
    width: '80%',
    backgroundColor: 'white',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },

  hideModalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
  },
});
