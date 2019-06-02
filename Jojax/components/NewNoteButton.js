import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors} from "../assets/colors.js";

const NewNoteButton =( { onPress } ) => {

  return(
<TouchableOpacity style={{marginRight:10}} onPress= {onPress}>
  <View>
    <SimpleLineIcons
      name={'note'}
      size={28}
      color={colors.black}
    />
  </View>
</TouchableOpacity>


  );

  }
  export default NewNoteButton;



const styles = StyleSheet.create({



});
