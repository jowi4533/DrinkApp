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
      userAuth: props.userAuth,
      usersDB: props.usersDB,
      users: props.users,
      drink: props.drink,
    };

    this.addToFavorite = this.addToFavorite.bind(this);
  }
addToFavorite(){
  this.setState({addedToFavorite: !this.state.addedToFavorite});

  this.state.usersDB.orderByChild("email").equalTo(this.state.userAuth.currentUser.email).on("child_added",
    (loggedInUser) =>{

      if(loggedInUser.myFavourites === undefined){
        let myFavourites = [this.state.drink]
//        this.state.usersDB.child(loggedInUser.key).push(
//          {myFavourites: myFravourites})
      }
      else {
        console.log("finns redan, hora")
      }

    }
  )

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
      size={24}
      color={addedToFavorite ? "rgba(207, 0, 15, 1)": "rgba(207, 0, 15, 1)"}
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
