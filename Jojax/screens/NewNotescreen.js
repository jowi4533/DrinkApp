import React, { Component } from "react";
import { AntDesign, MaterialCommunityIcons,SimpleLineIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  ScrollView
} from "react-native";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
import SaveNoteButton from "../components/SaveNoteButton.js";

class NewNotescreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      text: "" ,
      myID: this.props.navigation.state.params.prevID +1

    }
    this.props.navigation.setParams({
      handleSaveNotepress: this.handleSaveNotepress
    });

  }
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'New Note',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25,
      color: 'black'
    },
    headerTintColor: 'rgb(205,133,63)',
    headerRight:
    <SaveNoteButton
      onPress={navigation.getParam('handleSaveNotepress')
    }>
  </SaveNoteButton>,
  headerBackTitleStyle:{
    fontSize: 18
  }


  };
};
handleSaveNotepress = () =>{
  if (/\S/.test(this.state.text)){
    this.props.navigation.state.params.returnNote(this.state.myID, this.state.text);
    this.props.navigation.goBack();
  }
  else{
    this.props.navigation.goBack();
  }

}
   componentWillMount() {
     this.props.navigation.setParams({ createNote: this.createNote });
   }


  render() {

    return (
      <View style={styles.container}>
        <ScrollView>

        <View style = {styles.textInputContainer}>
        <TextInput
          multiline = {true}
          style = {styles.textInputSize}
          maxLength = {250}
          placeholder = "Type your text here"
          value = {this.state.text}
          onChangeText = { (typedText) => {
            this.setState({text: typedText});
          }
          }>

        </TextInput>
        </View>
         </ScrollView>
        <View style = {styles.wordCountTextBox}>
        <Text style = {styles.wordCountText}>
          Characters:  {this.state.text.length}/250
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
    width: WIDTH,
    padding: 10
  },
  textInputSize:{
    fontSize: 20,
    fontFamily: 'Quicksand-Medium'
  },
  wordCountText:{
    color: 'rgba(108, 122, 137, 1)',
    fontFamily: 'Quicksand-Medium'
  },
  wordCountTextBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0

  }

});
