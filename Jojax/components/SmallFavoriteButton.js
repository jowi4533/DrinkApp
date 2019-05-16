import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class SmallFavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {addedToFavorite: false};
    this.addToFavorite = this.addToFavorite.bind(this);
  }
addToFavorite(){
  this.setState({
    addedToFavorite: !this.state.addedToFavorite
  });

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
  selectedColor: {
    position: 'absolute',
    left: 0,
    top: 0,
  },


});
