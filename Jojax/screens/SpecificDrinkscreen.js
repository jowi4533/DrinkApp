import React, { Component} from "react";
import { Ionicons,FontAwesome,Entypo,EvilIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Alert,
  Button

} from "react-native";
import drImage from '../pictures/vodka_drink.jpg'
import bgImage from '../pictures/236.jpg'
const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');

const data = [
  {name: 'Tequila', units:'4cl'},
  {name: 'Rom', units:'4cl'},
  {name: 'Gin', units:'4cl'},
  {name: 'Cointreau', units:'4cl'},
  {name: 'Lemon Juice', units:'4cl'},
  {name: 'Coca Cola', units:''},
  {name: 'Ice', units:''},
  {name: 'Lemon' , units:''}
];
const data2 =  [
  {instruc: '1.Fill a long glass with ice.,2.Add all ingredients except Coca Cola.,3.Top with a splash of Cola and stir.,4.Garnish with a lemon wedge.'},
  {instruc: '1.Fill a long glass with poop.,2.Add all ingredients except Coca poop.,3.Top with a splash of Cola and poop.,4.Garnish with a lemon poop.'}
];

class Drinkscreen extends Component {
  modifyPreparations(){
    const data2 =  [
      {instruc: '1.Fill a long glass with ice.,2.Add all ingredients except Coca Cola.,3.Top with a splash of Cola and stir.,4.Garnish with a lemon wedge.'},
      {instruc: '1.Fill a long glass with poop.,2.Add all ingredients except Coca poop.,3.Top with a splash of Cola and poop.,4.Garnish with a lemon poop.'}
    ]
    ;
    const data3 = data2[1].instruc;
    let sentence = "";
    const newPrep = [];
    for (var i = 0; i < data3.length; i++) {
      if (data3[i]!=','){
        sentence = sentence + data3[i];
      }
      else{
        newPrep.push({inst: sentence});
        sentence = "";
      }
    }
    console.log(newPrep)
    return(newPrep)
  }


  renderItem1 = ({ item, index}) => {
    return (
      <View style = {styles.oneIngredientBox}>
      <Text style = {styles.textEachIngredient}>
      {item.name}
      </Text>
      </View>
    )
  };
  renderItem2 = ({ item, index}) => {
    return (
      <Text style = {styles.textEachIngredient}>
      {item.units} {item.name}
      </Text>
    )
  };
  renderItem3 = ({ item, index}) => {
    return (
      <Text style = {styles.textEachIngredient}>
      {item.inst}
      </Text>
    )
  };



  render(){
    return (
      <SafeAreaView style={styles.container}>
      <View style = {{flex:40}}>
      <View style = {styles.imageDrinkContainer}>
      <ImageBackground style={styles.imageDrink}
      source={drImage}
      >
      </ImageBackground>
      </View>
      </View>
      <View style = {styles.ingredientsAndPreparationContainer}>
        <ImageBackground source={bgImage} style= {styles.backgroundContainer}>
          <View style = {styles.ingredientSheet}>
            <Text style = {styles.ingredientsText}>
              Ingredients
            </Text>
            <View style = {styles.ingredientInnerContainer}>
                <View style = {styles.ingredientOverviewBox}>
                  <FlatList
                    contentContainerStyle={styles.ingredientBox}
                    data={data}
                    renderItem={this.renderItem1}
                    />
                </View>
                <View style= {styles.servingsContainer}>
                  <Text style ={styles.servingsText}>
                    Servings
                  </Text>
                  <Text style = {styles.twoDrinksText}>
                    2 Drinks
                  </Text>
                  <View style = {styles.servingsBox}>
                    <FlatList
                      data={data}
                      renderItem ={this.renderItem2}
                    />
                  </View>
                </View>

            </View>
          </View>
      <View style ={styles.preparationSheet}>
        <Text style = {styles.preparationText}>
        Preparation
        </Text>

        <FlatList
          contentContainerStyle={styles.prepBox}
          data={this.modifyPreparations()}
          renderItem={this.renderItem3}
          />

      </View>
      </ImageBackground>
      </View>
      </SafeAreaView>
    );
  }
}
export default Drinkscreen;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  imageDrinkContainer: {
    flex: 1,
    backgroundColor: 'grey',
    alignSelf: 'stretch'
  },

  imageDrink: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  },
  ingredientsAndPreparationContainer:{
    flex:60,
    borderWidth:1,
    borderColor:'red'
  },
  backgroundContainer:{
    flex:1,
    width: null,
    height: null,
    alignItems:'center'
  },
  ingredientSheet:{
    backgroundColor:'white',
    //height:HEIGHT/2,
    width:WIDTH -20,
    margin:10,
  },

  ingredientsText:{
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical:5
  },
  twoDrinksText:{
    fontSize:18,
    paddingBottom:12,

  },
  ingredientInnerContainer:{
    margintop:5,
    marginLeft:15,
    borderBottomWidth:3,
    borderBottomColor:'green'
  },
  textEachIngredient:{
    fontSize:16
  },
  ingredientBox:{
    flexDirection: 'row',
    flexWrap: 'wrap'

  },
  oneIngredientBox:{
    marginLeft:5,
    borderRadius:25,
    backgroundColor: 'rgb(208,208,208)',
    alignSelf: 'flex-start',
    paddingHorizontal:5,
    marginBottom:3
  },
  textOneIngredient:{
    fontSize:18,

  },
  ingredientOverviewBox:{
    borderBottomWidth: 1,
    marginRight:15,
    paddingBottom:10,
    borderBottomColor:'rgb(208,208,208)'
  },
  servingsContainer:{

  },
  servingsText:{
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical:5
  },
  preparationSheet:{
    backgroundColor:'white',
    //height:HEIGHT/2,
    width:WIDTH -20,
    margin:10,
  },
  preparationText:{
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical:5
  },
  prepBox:{
    marginTop:10,
    marginLeft:20
  }


});
