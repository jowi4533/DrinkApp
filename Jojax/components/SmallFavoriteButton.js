import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors} from "../assets/colors.js";

export default class SmallFavoriteButton extends Component {
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
  return(
<TouchableOpacity
  onPress={this.addToFavorite}
  style= {styles.favoriteButton}>
  <View>
    <FontAwesome
      name={this.state.addedToFavorite ? 'heart': "heart-o"}
      size={24}
      color={this.state.addedToFavorite ? "rgba(207, 0, 15, 1)": "rgba(207, 0, 15, 1)"}
    />
  </View>
</TouchableOpacity>
  );
}
  }

const styles = StyleSheet.create({
  favoriteButton:{
    marginTop:3,
    paddingLeft:12,
    paddingRight:12,
    paddingTop:12,
    paddingBottom: 6,
  }


});
