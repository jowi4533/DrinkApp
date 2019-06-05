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
import { colors } from "../assets/colors.js";
import SmallFavoriteButton from "../components/SmallFavoriteButton.js";

const numColumns = 2;

class MyBarscreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      drinks: props.screenProps.drinks,
      allFavourites: {},

      userAuth: props.screenProps.userAuth,
      usersDB: props.screenProps.usersDB,
      users: props.screenProps.users,
      barSpirits: props.screenProps.allBarSpirits,
      userBar: [],
      myBarDrinks: [],
      userBarObjects: {},

      currentUser: null,
      loggedIn: true,
      possibleDrinksCount: null,
    };
    this.loadResources()


  }

  loadResources(){
    this.setUpDatabaseListeners();
    this.setUpNavigationListener();
    this.userListener();
  }

  static navigationOptions = {
    title: "My Bar",
    headerLayoutPreset: "center",
    headerTitleStyle: {
      width: "100%",
      fontFamily: "Quicksand-Medium",
      fontSize: 25,
      color: colors.black
    }
  };
  setUpDatabaseListeners(){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{


       let currentUser = loggedInUser.val()
       let myBarRef = this.state.usersDB.child(loggedInUser.key).child("myBar")
       let myUserBar = []
       let myUserBarObjects = {}

       myBarRef.on("child_added", (barSpirit, prevChildKey) =>{
         let aBarSpirit = barSpirit.val()

         myUserBar.push(aBarSpirit)
         myUserBarObjects[aBarSpirit.name] = aBarSpirit

         this.state.userBar = myUserBar
         this.state.userBarObjects = myUserBarObjects

         this.createMyBarDrinks()
         this.setState(this.state)
       })

       myBarRef.on("child_removed", (barSpirit) => {
         let aBarSpirit = barSpirit.val()

         for(let i = 0; i < myUserBar.length; i++){
           if(myUserBar[i].name === aBarSpirit.name){
             myUserBar.splice(i, 1)
             this.state.userBar = myUserBar
           }
         }
        delete this.state.userBarObjects[aBarSpirit.name]
        this.createMyBarDrinks()

       })

       this.setUpMyFavourites(loggedInUser)

       this.setState(this.state)
      })
  }

  setUpMyFavourites(loggedInUser){
    let myFavouritesRef = this.state.usersDB.child(loggedInUser.key).child("myFavourites")
    let myFavouriteObject = this.state.allFavourites

    myFavouritesRef.on("child_added", (aDrink) =>{
      let drink = aDrink.val()

      this.state.allFavourites[drink.name] = drink
      this.setState(this.state)
    })

    myFavouritesRef.on("child_removed", (aDrink) => {
      let drink = aDrink.val()

      delete this.state.allFavourites[drink.name]
    })
  }

  setUpNavigationListener() {
    this.props.navigation.addListener("didFocus", () => {
      console.log("In navigationlistener (MYBARSCREEN)");

      this.setState(this.state)
    });
  }

  createMyBarDrinks(){
    possibleDrinks = []
    for(let i = 0; i < this.state.drinks.length; i++){
      let ingredientInBar = 0;
      for(let j = 0; j < this.state.userBar.length; j++){
        if(this.state.userBar[j].name in this.state.drinks[i].spirits){
          ingredientInBar++;

        }
      }
      if(ingredientInBar === Object.keys(this.state.drinks[i].spirits).length){
        possibleDrinks.push(this.state.drinks[i])
      }
    }
    this.state.myBarDrinks = possibleDrinks


  }

  checkUserLoggedIn(){
    if(this.state.userAuth.currentUser === null){
      this.state.loggedIn = false
    } else{
      this.state.loggedIn = true
    }
  }

  userListener() {
    this.state.userAuth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("In listener, user online (MYBARSCREEN)");
      } else {
        console.log("In listener, user offline (MYBARSCREEN)");
      }
    });
  }

  handleGoToBar() {
    this.setState({ activeIndex: 0 });
  }
  handleGoTodrinks() {
    this.setState({ activeIndex: 1 });
  }

  _keyExtractor = (item, index) => item.name;

  getIngredients = data => {
    var string = data.toString();
    string = string.replace(/,/g, ", ");
    return string;
  };

  updateFavourites = (drinkData, favourited) => {
    this.state.allFavourites[drinkData.name] = drinkData
    if(this.state.loggedIn){
    if(favourited){
      this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
        (loggedInUser) =>{

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
  }

  updateUserBar = item => {
    this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
      (loggedInUser) =>{

        let barSpirit = item
        let userBarObjects = this.state.userBarObjects
        let currentUser = loggedInUser.val()
        if (barSpirit.name in this.state.userBarObjects ){
          let removeMyBarRef = this.state.usersDB.child(loggedInUser.key).child("myBar").child(barSpirit.name)
          removeMyBarRef.remove()
          this.setState(this.state)
        }
        else {
          userBarObjects[barSpirit.name] = barSpirit
          let myBarRef = this.state.usersDB.child(loggedInUser.key).child("myBar")
          myBarRef.set(userBarObjects)
        }
      })
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.98}
          onPress={() => {
            this.updateUserBar(item);
          }}
        >
          <View
            style={[
              item.name in this.state.userBarObjects ? styles.borderViewSelected : styles.borderView
            ]}
          >
            <View style={styles.itemPictureContainer}>
              <ImageBackground
                resizeMode="contain"
                source={{ uri: item.img }}
                style={styles.itemPicture}
              />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}> {item.name} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  // --- this is all the drinks the user can make with their ingredients-- //
  renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.drinkContainer}>
        <TouchableOpacity
          style={styles.buttonDrink}
          onPress={() =>
            this.props.navigation.navigate("SpecDrinks",
            {
              drink: item,
              myFavourites: this.state.allFavourites,
              loggedIn: this.state.loggedIn,
              usersDB: this.state.usersDB,
            })
          }
        >
          <View>
            <Image source={{ uri: item.url }} style={styles.imageDrink} />
          </View>
          <View style = {{backgroundColor: 'white'}}>
            <View style={styles.textHeadingContainer}>
              <Text style={styles.textDrinkName}>{item.name}</Text>
              <View style={styles.SmallFavoriteButtonContainer}>
                {this.state.loggedIn ? (
                <SmallFavoriteButton
                drink = {item}
                myFavourites = {this.state.allFavourites}
                loggedIn = {this.state.loggedIn}
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
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              this.state.activeIndex == 0
                ? styles.tabButtonActivated
                : styles.tabButtonInactive
            ]}
            onPress={() => this.handleGoToBar()}
          >
            <Text style={styles.tabText}>Bar</Text>
            <View style = {styles.barCounterTextContainer}>
               <Text style= {styles.barCounterText}>{this.state.userBar.length}
               </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state.activeIndex == 1
                ? styles.tabButtonActivated
                : styles.tabButtonInactive
            ]}
            onPress={() => this.handleGoTodrinks()}
          >
            <Text style={styles.tabText}>Drinks</Text>
              <View style = {styles.barCounterTextContainer}>
                 <Text style= {styles.barCounterText}>{this.state.myBarDrinks.length}
                 </Text>
              </View>
          </TouchableOpacity>
        </View>
        {this.state.activeIndex == 0 ? (
          <View style = {{flex:1}}>
            <View style={styles.informationTextContainer}>
              <Text style={styles.informationText}>
                Select the ingredients you have at home to see what drinks you
                can make
              </Text>
            </View>
            <FlatList
              data={this.state.barSpirits}
              extraData={this.state}
              style={styles.container}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
              numColumns={numColumns}
            />
        </View>
        ):(
          <View style= {{flex:1,backgroundColor: 'white'}}>
            <FlatList
              data={this.state.myBarDrinks}
              renderItem={this.renderItem1}
              keyExtractor={item => item.id}
              extraData={this.state}
            />
          </View>
        )}
      </ImageBackground>
    );
  }
}

export default MyBarscreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    marginVertical: 1
  },

  informationTextContainer: {
    width: WIDTH,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },

  informationText: {
    color: colors.darkgray,
    fontSize: 18,
    fontFamily: "Quicksand-Regular",
    paddingVertical: 10,
    paddingHorizontal: 20
  },

  itemContainer: {
    flex: 1,
    elevation: 20
  },

  item: {
    elevation: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 15,
    //height: HEIGHT/3,
    height: Dimensions.get("window").width / numColumns //.width can be changed to .height
  },

  borderView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: "100%",
    width: "100%",
    borderWidth: 2,
    borderColor: "transparent",
    flex: 1
  },

  borderViewSelected: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: "100%",
    width: "100%",
    borderWidth: 2,
    borderColor: "rgba(240, 52, 52, 1)",
    flex: 1
  },

  itemPictureContainer: {
    flex: 1,
    width: "100%"
  },

  itemPicture: {
    paddingTop: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    resizeMode: "stretch"
  },
  itemTextContainer: {
    alignItems: "center",
    backgroundColor: "dimgray",
    opacity: 1,
    width: "100%",
    borderRadius: 8
  },
  itemText: {
    fontFamily: "Quicksand-Regular",
    textAlign: "center",
    fontSize: 18,
    color: "white"
  },
  tabContainer: {
    flexDirection: "row"
  },
  tabButtonActivated: {
    width: WIDTH / 2,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
    borderBottomColor: colors.midblue ,
    borderBottomWidth: 2,
    flexDirection: 'row'
  },
  tabButtonInactive: {
    width: WIDTH / 2,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    backgroundColor: colors.white,
    flexDirection: 'row'
  },
  tabText: {
      color:colors.black,
    fontFamily: "Quicksand-Medium",
    fontSize: 18,
  },
  barCounterTextContainer:{
    marginLeft: 5,
    //height: 20,
    width: 37,
    backgroundColor: colors.lightgreen,
    borderRadius: 10,
    textAlign: 'center',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },
  barCounterText: {
    paddingHorizontal: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
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
    textTransform: "capitalize",
    fontSize: 14,
    color: colors.darkgray
  },
});
