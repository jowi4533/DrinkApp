import React, { Component } from "react";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Drinkscreen from "./screens/Drinkscreen";
import Explorescreen from "./screens/Explorescreen";
import Morescreen from "./screens/Morescreen";
import { Asset, Font } from "expo";

import MyNotesscreen from "./screens/MyNotesscreen";
import MyPagescreen from "./screens/MyPagescreen";
import MyBarscreen from "./screens/MyBarscreen";
import DrinkCategoryScreen from "./screens/DrinkCategoryScreen";
import MyFavoriteDrinksscreen from "./screens/MyFavoriteDrinksscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import SpecificDrinkscreen from "./screens/SpecificDrinkscreen";
import NewNotescreen from "./screens/NewNotescreen";
import EditNotescreen from "./screens/EditNotescreen";

import firebase from "firebase";
//-------------------------------//
//Firebase stuff
const config = {
  apiKey: "AIzaSyA5TqttcjP9G88qkAEenf1rfDe0B1E9v3E",
  authDomain: "drinknic-e6779.firebaseapp.com",
  databaseURL: "https://drinknic-e6779.firebaseio.com",
  projectId: "drinknic-e6779",
  storageBucket: "drinknic-e6779.appspot.com",
  messagingSenderId: "210609393019"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//Everything database related (text, passwords, users etc)
let database = firebase.database();
let drinksDB = database.ref("Drinks");
let usersDB = database.ref("Users");
let categoriesDB = database.ref("Explorecategories");
let barSpiritsDB = database.ref("Barspirits");

//Everything user related
const userAuth = firebase.auth();
//-------------------------------//

const MyPageStack = createStackNavigator(
  {
    MyPage: { screen: MyPagescreen },
    MyBar: { screen: MyBarscreen },
    MyFavoriteDrinks: { screen: MyFavoriteDrinksscreen },
    MyNotes: { screen: MyNotesscreen },
    Register: { screen: Registerscreen },
    Login: { screen: Loginscreen },
    SpecDrinks: { screen: SpecificDrinkscreen },
    NewNote: { screen: NewNotescreen },
    EditNote: { screen: EditNotescreen }
  },
  {
    headerLayoutPreset: "center"
  }
);
const DrinkStack = createStackNavigator(
  {
    AllDrinks: { screen: Drinkscreen },
    SpecDrinks: { screen: SpecificDrinkscreen }
  },
  {
    headerLayoutPreset: "center"
  }
);
const ExploreStack = createStackNavigator(
  {
    Explore: { screen: Explorescreen },
    SpecDrinks: { screen: SpecificDrinkscreen },
    DrinkCategory: { screen: DrinkCategoryScreen }
  },
  {
    headerLayoutPreset: "center"
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreStack,
      navigationOptions: {
        tabBarLabel: "EXPLORE",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="wpexplorer" color={tintColor} size={28} />
        )
      }
    },
    Drinks: {
      screen: DrinkStack,
      navigationOptions: {
        tabBarLabel: "DRINKS",
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="drink" color={tintColor} size={28} />
        )
      }
    },
    MyPageStack: {
      screen: MyPageStack,
      navigationOptions: {
        tabBarLabel: "MYPAGE",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user-circle-o" color={tintColor} size={28} />
        )
      }
    },
    More: {
      screen: Morescreen,
      navigationOptions: {
        title: "More",
        tabBarLabel: "MORE",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-more" color={tintColor} size={28} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey",
      labelStyle: {
        fontSize: 13
      },
      style: {
        borderTopWidth: 1,
        height: 64
      }
    }
  }
);
const AppContainer = createAppContainer(TabNavigator);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuth: userAuth,
      usersDB: usersDB,

      allUsers: null,
      allUserKeys: null,
      allDrinkItems: null,
      allDrinkKeys: null,
      allExploreCategories: null,
      allExploreCategoriesKeys: null,

      spiritCategories: null,
      spiritCategoriesKeys: null,

      seasonCategories: null,
      seasonCategoriesKeys: null,

      tasteCategories: null,
      tasteCategoriesKeys: null,

      barSpirits: null,
      barSpiritsKeys: null,

      allBarSpirits: [],
      spirits: [],
      seasons: [],
      tastes: [],
      drinks: [],
      users: [],
      loaded: false,

      fontLoaded: false
    };
    this.loadResources();
    console.log(this.state.allBarSpirits)
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Quicksand-Bold": require("./fonts/Quicksand-Bold.ttf"),
      "Quicksand-Light": require("./fonts/Quicksand-Light.ttf"),
      "Quicksand-Medium": require("./fonts/Quicksand-Medium.ttf"),
      "Quicksand-Regular": require("./fonts/Quicksand-Regular.ttf"),


    }).then(() => {
      this.setState({ fontLoaded: true });
    });
  }

  loadResources() {
    this.initailizeListener();
  }

  initailizeListener() {
    usersDB.on("value", this.retrieveUsers.bind(this), this.errData);
    categoriesDB.once(
      "value",
      this.retrieveExploreCategories.bind(this),
      this.errData
    );
    drinksDB.once("value", this.retrieveDrinkItems.bind(this), this.errData);
    barSpiritsDB.once("value", this.retrieveBarSpirits.bind(this), this.errData);
  }

  retrieveBarSpirits(data) {
    this.setState({ barSpirits: data.val() });
    this.setState({ barSpiritsKeys: Object.keys(data.val()) });
    //console.log('inuti retrieve, här är this.state.barSpirits: ')
    //console.log(this.state.barSpirits)
    this.loadBarSpirits();
  }

  retrieveDrinkItems(data) {
    this.setState({ allDrinkItems: data.val() });
    this.setState({ allDrinkKeys: Object.keys(data.val()) });
    this.loadDrinks();
    this.setState({ loaded: true });
  }
  retrieveExploreCategories(data) {
    this.setState({ spiritCategories: data.val().Spirits });
    this.setState({ tasteCategories: data.val().Tastes });
    this.setState({ seasonCategories: data.val().Seasons });
    //console.log(this.state.allExploreCategories)
    this.setState({ spiritCategoriesKeys: Object.keys(data.val().Spirits) });
    this.setState({ tasteCategoriesKeys: Object.keys(data.val().Tastes) });
    this.setState({ seasonCategoriesKeys: Object.keys(data.val().Seasons) });
    //console.log(this.state.allExploreCategorieskeys)
    this.loadCategories("Spirits");
    this.loadCategories("Tastes");
    this.loadCategories("Seasons");
  }

  retrieveUsers(data) {
    this.state.allUsers = data.val();
    this.state.allUserKeys = Object.keys(data.val());
    this.loadUsers();
  }

  errData = err => {
    console.log("Error!");
    console.log(err);
  };

  loadUsers() {
    let allUsers = [];

    for (let i = 0; i < this.state.allUserKeys.length; i++) {
      let k = this.state.allUserKeys[i];

      let user = {
        email: this.state.allUsers[k].email,
        password: this.state.allUsers[k].password,
        myFavourites: this.state.allUsers[k].myFavourites
      };
      allUsers.push(user);
    }
    this.state.users = allUsers;
  }

  loadDrinks() {
    let allDrinks = [];
    for (let i = 0; i < this.state.allDrinkKeys.length; i++) {
      let k = this.state.allDrinkKeys[i];

      let drink = {
        name: this.state.allDrinkItems[k].name,
        url: this.state.allDrinkItems[k].URL,
        spirits: this.state.allDrinkItems[k].Ingredients.spirits,
        otherIngredients: this.state.allDrinkItems[k].Ingredients
          .otherIngredients,
        allIngredients: Object.assign(
          {},
          this.state.allDrinkItems[k].Ingredients.spirits,
          this.state.allDrinkItems[k].Ingredients.otherIngredients
        ),
        categories: this.state.allDrinkItems[k].Categories,
        instructions: this.state.allDrinkItems[k].Preparation_instructions,
        id: this.state.allDrinkItems[k].id
      };
      allDrinks.push(drink);
    }
    this.state.drinks = allDrinks;
  }

  loadBarSpirits() {
    let allBarSpirits = [];
    for (let i = 0; i < this.state.barSpiritsKeys.length; i++) {
      let k = this.state.barSpiritsKeys[i];
      console.log('barspiritskeys är : ')
      console.log(k)
      console.log('inuti for-loop i loadBarSpirits()')
      let barSpirit = {
        name: this.state.barSpirits[k].name,
        img: this.state.barSpirits[k].img,
        id: this.state.barSpirits[k].id
      };
      console.log('precis före jag pushar saker till allbarspirits, här är barSpirit: ' + barSpirit)
      allBarSpirits.push(barSpirit);
    }
    this.state.allBarSpirits = allBarSpirits;
  }

  loadCategories(category) {
    if (category == "Spirits") {
      let Allspirits = this.state.spiritCategories;
      let spiritarray = [];
      for (let i = 0; i < this.state.spiritCategoriesKeys.length; i++) {
        let k = this.state.spiritCategoriesKeys[i];
        let categoryItem = {
          name: Allspirits[k].name,
          img: Allspirits[k].img,
          id: Allspirits[k].id
        };
        spiritarray.push(categoryItem);
      }
      this.state.spirits = spiritarray;
    }
    else if(category =="Seasons"){
      let Allseasons = this.state.seasonCategories;
      let seasonsarray = [];
      for (let i = 0; i < this.state.seasonCategoriesKeys.length; i++) {
        let k = this.state.seasonCategoriesKeys[i];
        let categoryItem = {
          name: Allseasons[k].name,
          img: Allseasons[k].img,
          id: Allseasons[k].id
        };
        seasonsarray.push(categoryItem);
      }
      this.state.seasons = seasonsarray;

    }
    else if(category =="Tastes"){
      let Alltastes = this.state.tasteCategories;
      let tastesarray = [];
      for (let i = 0; i < this.state.tasteCategoriesKeys.length; i++) {
        let k = this.state.tasteCategoriesKeys[i];
        let categoryItem = {
          name: Alltastes[k].name,
          img: Alltastes[k].img,
          id: Alltastes[k].id
        };
        tastesarray.push(categoryItem);
      }

      this.state.tastes = tastesarray;

    }
    else{
      console.log("No category was found // loadCategories()")
    }


  }

  render() {
    if (this.state.loaded === true) {
      return <AppContainer screenProps={this.state} />;
    } else {
      return null;
    }
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
