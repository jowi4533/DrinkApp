import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import {colors} from "../assets/colors.js";

const SaveNoteButton =( { onPress } ) => {

  return(
<TouchableOpacity style={{marginRight:10}} onPress= {onPress}>
  <View>
  <Text style= {styles.saveText}>
    Save
  </Text>
  </View>

</TouchableOpacity>


  );

  }
  export default SaveNoteButton;



const styles = StyleSheet.create({
saveText:{
  fontSize: 20,
  color: colors.black
}


});
