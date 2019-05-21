import React, { Component } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

class NewNotescreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      id: "1",
      note: ""
    }
  }
  static navigationOptions = {
    title: 'New Note',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };
  goBack() {
      console.log("testing0")
      if (!(/\S/.test(this.state.note))){
        console.log("testing1")
        this.props.navigation.state.params.returnNote('123', 'this is note');
        this.props.navigation.goBack();
      }
   };


  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.textInputContainer}>
        <TextInput
          style = {styles.textInputSize}
          maxLength = {250}
          placeholder = "Type your text here"
          value = {this.state.note}
          onChangeText = { (typedText) => {
            this.setState({note: typedText});
          }
          }>

        </TextInput>
        </View>
        <Text style = {{margin: 25, fontSize : 30, fontWeight: 'bold'}}>
          {this.state.note}
        </Text>
        <View style = {styles.wordCountTextBox}>
        <Text style = {styles.wordCountText}>
          Characters:  {this.state.note.length}/250
        </Text>
          </View>
        </View>
    );
  }
}
export default NewNotescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputContainer:{
    padding: 10
  },
  textInputSize:{
    fontSize: 20
  },
  wordCountText:{
    color: 'rgba(108, 122, 137, 1)'
  },
  wordCountTextBox:{
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0

  }

});
