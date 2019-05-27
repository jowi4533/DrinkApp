import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const DeleteNoteButton =( { onPress } ) => {

  return(
<TouchableOpacity onPress= {onPress} style = {styles.DeleteNoteContainer}>
  <FontAwesome
    name={'trash-o'}
    size={40}
    color={'rgb(105,105,105)'}
    />

</TouchableOpacity>


  );

  }
  export default DeleteNoteButton;



const styles = StyleSheet.create({
  DeleteNoteContainer:{
    padding: 10,
    paddingBottom: -10,
    marginRight: 10
  }



});
