import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from "react-native";

import bgImage from "../pictures/236.jpg";
import {colors} from "../assets/colors.js";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

class Explorescreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drinks: props.screenProps.drinks,
      loggedIn: null,
      usersDB: props.screenProps.usersDB,
      userAuth: props.screenProps.userAuth,

      //All the categories in which drinks are placed
      allFavourites: {},
      discoverWeekly: [],
      classicDrinks: [],
      editorsChoice: [],
      spiritCategory : props.screenProps.spirits,
      seasonCategory: props.screenProps.seasons,
      tasteCategory: props.screenProps.tastes,
    }
      this.checkUserLoggedIn()
      this.userListener()
      this.setUpMyFavourites()
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

  loopClassicDrinks(){
    let classicDrinks = []
    for(let i = 0; i < this.state.drinks.length; i++){
      if(this.state.drinks[i].categories.Classic === true){
        classicDrinks.push(this.state.drinks[i])
      }
    }
    this.setState({classicDrinks: classicDrinks})
  }

  loopDiscoverWeekly(){
    let weeklyDrinks = []
    for(let i = 0; i < this.state.drinks.length; i++){
      if(this.state.drinks[i].categories.Discover_Weekly === true){
        weeklyDrinks.push(this.state.drinks[i])
      }
    }
    this.setState({discoverWeekly: weeklyDrinks})
  }
  loopEditorsChoice(){
    let editorsDrinks = []
    for(let i = 0; i < this.state.drinks.length; i++){
      if(this.state.drinks[i].categories.Editors_Choice === true){
        editorsDrinks.push(this.state.drinks[i])
      }
    }
    this.setState({editorsChoice: editorsDrinks})
  }

  setUpMyFavourites(loggedInUser){
    if(this.state.userAuth.currentUser !== null){
    this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
      (loggedInUser) =>{
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

        this.setState(this.state)
    })
  }
  }


  componentWillMount(){
    this.loopDiscoverWeekly()
    this.loopClassicDrinks()
    this.loopEditorsChoice()
  }

  static navigationOptions = {
    title: 'Explore',
    headerTitleStyle: {
      width: '100%',
      fontFamily: "Quicksand-Medium",
      fontSize: 25,
      color: colors.black
    },
  };
  //Discoverweekly + classic drinks atm
  renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.discoverWeeklyBox}>
        <TouchableOpacity
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
        <Image
          source={{ uri: item.url }}
          style={styles.drinkImage}
        />
        <View style={styles.drinkNameTextContainer}>
          <Text style={styles.drinkNameText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  };
  //Drink Categories ( not used atm ) -- text below image
  renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.seasonalBox}
        onPress={() =>
          this.props.navigation.navigate("DrinkCategory",
          {
            title: item.category,
            drink : item,
            myFavourites : this.state.allFavourites,
            loggedIn : this.state.loggedIn,
            usersDB: this.state.usersDB
          })
        }
      >
        <ImageBackground style={styles.baseSpiritImage} source={item.img }>
          <View style={styles.baseSpiritImageContainer}>
        <View style={styles.baseSpiritTextContainer}>
          <Text style={styles.baseSpiritsText}>{item.category}</Text>
        </View>
        </View>
      </ImageBackground>

      </TouchableOpacity>
    );
  };
  //category boxes -- text ontop of image + opacity
  renderItem3 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.seasonalBox}
        onPress={() =>
          this.props.navigation.navigate("DrinkCategory",
          {
            title: item.name,
            drink : item,
            myFavourites : this.state.allFavourites,
            loggedIn : this.state.loggedIn
          })
        }
      >
        <ImageBackground style={styles.baseSpiritImage} source={{ uri: item.img }}>
          <View style={styles.baseSpiritImageContainer}>
        <View style={styles.baseSpiritTextContainer}>
          <Text style={styles.baseSpiritsText}>{item.name}</Text>
        </View>
        </View>
      </ImageBackground>

      </TouchableOpacity>
    );
  };

  render() {

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.horizontalCategoryContainer}>
            <View>
              <Text style={styles.categoryHeadingText}>Discover Weekly</Text>
            </View>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              <View style={styles.scrollviewContainer}>
                <FlatList
                  data={this.state.discoverWeekly}
                  renderItem={this.renderItem1}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.gridItemContainer}>
            <Text style={styles.gridHeadingText}>Seasonal Drinks</Text>
            <View style={styles.categoryGrid}>
              <FlatList
                data={this.state.seasonCategory}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns= {2}
              />
            </View>
          </View>
          <View style={styles.horizontalCategoryContainer}>
            <View>
              <Text style={styles.classicDrinksText}>Classic Drinks</Text>
            </View>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              <View style={styles.scrollviewContainer}>
                <FlatList
                  data={this.state.classicDrinks}
                  renderItem={this.renderItem1}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.gridItemContainer}>
            <Text style={styles.gridHeadingText}>Base Spirits</Text>
            <View style={styles.categoryGrid}>
              <FlatList
                data={this.state.spiritCategory}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </View>
          </View>
          <View style={styles.horizontalCategoryContainer}>
            <View>
              <Text style={styles.categoryHeadingText}>Editors Choice</Text>
            </View>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              <View style={styles.scrollviewContainer}>
                <FlatList
                  data={this.state.editorsChoice}
                  renderItem={this.renderItem1}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.gridItemContainer}>
            <Text style={styles.gridHeadingText}>Tastes</Text>
            <View style={styles.categoryGrid}>
              <FlatList
                data={this.state.tasteCategory}
                renderItem={this.renderItem3}
                keyExtractor={item => item.id}
                numColumns= {2}
              />
            </View>
          </View>

        </ScrollView>
      </ImageBackground>
    );
  }
}
export default Explorescreen;

const styles = StyleSheet.create({
  horizontalCategoryContainer: {
  },
  discoverWeeklyBox: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  categoryHeadingText: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 26,
    marginTop: 15,
  },
  drinkImage: {
    height: WIDTH / 2.6,
    width: WIDTH / 2.6,
    margin: 5
  },
  drinkNameText: {
    color: colors.black,
    textAlign:'center',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold'
  },
  drinkNameTextContainer: {
    width: WIDTH / 2.6,
    marginLeft:5,
    paddingLeft:5,
    paddingBottom:5,
    paddingRight:5
  },
  scrollviewContainer: {
    marginTop: 10,
  },
  backgroundContainer: {
    width: null,
    height: null,
    alignItems: "center"
  },
  gridItemContainer: {

  },
  gridHeadingText: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 26,
    marginTop: 15,
    marginBottom: 5,

  },
  categoryGrid:  {

  },
  seasonalImage: {
    width: (WIDTH - 40) / 2,
    height: (WIDTH - 40) / 2,
    margin: 5
  },
  seasonalText: {
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    paddingLeft: 40,
    fontFamily: 'Quicksand-Bold',
  },
  seasonalBox: {
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 5
  },
  contentContainer: {
    paddingBottom: 10,
  },
  classicDrinksContainer: {},
  classicDrinksText: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Quicksand-Bold',
    fontSize: 26,
    marginTop: 10,
  },
  baseSpiritImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: '100%',
    height: '100%',
  },
  baseSpiritImage: {
    width: (WIDTH - 40) / 2,
    height: (WIDTH - 40) / 2,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  baseSpiritTextContainer: {
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
  },
  baseSpiritsText: {
    textAlign: 'center',
    width: '90%',
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    color: colors.white,
    opacity: 1
  }
});
