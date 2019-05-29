import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import {colors} from "../assets/colors.js";

const NoteStatusButton =( { onPress, noteStatus} ) => {

  return(
<TouchableOpacity onPress= {onPress} style = {styles.noteStatusButtonContainer}>
<View style={styles.noteIconContainer}>
  <MaterialCommunityIcons
    name={"checkbox-blank-circle"}
    size={45}
    color={noteStatus}
    raised={true}
  />
</View>
</TouchableOpacity>


  );

  }
  export default NoteStatusButton;



const styles = StyleSheet.create({
  noteIconContainer: {
    justifyContent: "center",
    marginHorizontal: 10
  },
  noteStatusButtonContainer:{

  }



});
