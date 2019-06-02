import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors} from "../assets/colors.js";

export default class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedToFavorite: false,
      myFavourites: props.myFavourites,
      drink: props.drink,
      loggedIn: props.loggedIn,
    };

    this.addToFavorite = this.addToFavorite.bind(this);

    this.userFavorited()
  }

  componentWillReceiveProps(nextProps){
  this.userFavorited()
  }

  addToFavorite(){
  this.setState({addedToFavorite: !this.state.addedToFavorite});
  this.props.updateFavourites(this.state.drink, !this.state.addedToFavorite)
  }

  userFavorited(){
    this.state.addedToFavorite = false
    for(let drinkKey in this.state.myFavourites){
      let aDrink = this.state.myFavourites[drinkKey]
      if(aDrink.name === this.state.drink.name){
        console.log("Drink is preFavorited:  " + aDrink.name)
        this.state.addedToFavorite = true
      }
    }
  }
render(){
  const {addedToFavorite} = this.state
  return(
<TouchableOpacity
  onPress={this.addToFavorite}
  style= {styles.favoriteButton}>
  <View>
    <FontAwesome
      name={addedToFavorite ? 'heart': "heart-o"}
      size={34}
      color={addedToFavorite ? "rgba(207, 0, 15, 1)": "rgba(207, 0, 15, 1)"}
    />
  </View>
</TouchableOpacity>


  );
}
  }



const styles = StyleSheet.create({
  selectedColor: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  favoriteButton:{
    padding: 15
  }


});
