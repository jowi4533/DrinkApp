import React, { Component } from "react";
import {SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
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
import DeleteNoteButton from "../components/DeleteNoteButton.js";

class EditNotescreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      text: this.props.navigation.state.params.text ,
      id: this.props.navigation.state.params.id

    }
    this.props.navigation.setParams({
      handleSaveNotepress: this.handleSaveNotepress,
      handleDeleteNotepress: this.handleDeleteNotepress,
      handleUpdateNotepress: this.handleUpdateNotepress
    });

  }
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Edit Note',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25,
      color: 'black'
    },
    headerTintColor: 'rgb(205,133,63)',
    headerRight:
    <SaveNoteButton
      onPress={navigation.getParam('handleUpdateNotepress')
    }>
  </SaveNoteButton>,
  headerBackTitleStyle:{
    fontSize: 18
  }


  };
};
handleSaveNotepress = () =>{
  if (/\S/.test(this.state.text)){
    this.props.navigation.state.params.returnNote(this.state.id, this.state.text);
    this.props.navigation.goBack();
  }
  else{
    this.props.navigation.goBack();
  }
}
handleUpdateNotepress = () =>{
  if (/\S/.test(this.state.text)){
    this.props.navigation.state.params.updateNote(this.state.id, this.state.text);
    this.props.navigation.goBack();
  }
  //ska ta bort noten nu
  else{
    this.props.navigation.state.params.removeNote(this.state.id);
    this.props.navigation.goBack();
  }

}

handleDeleteNotepress =() => {
  this.props.navigation.state.params.removeNote(this.state.id);
  this.props.navigation.goBack();
}
   componentWillMount() {
     this.props.navigation.setParams({ createNote: this.createNote });
   }


  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.textInputContainer}>
        <TextInput
          multiline = {true}
          style = {styles.textInputSize}
          maxLength = {500}
          value = {this.state.text}
          onChangeText = { (typedText) => {
            this.setState({text: typedText});
          }
          }>
        </TextInput>
        </View>
        <View style = {styles.wordCountTextBox}>
        <Text style = {styles.wordCountText}>
          Characters:  {this.state.text.length}/500
        </Text>
        <DeleteNoteButton
          onPress={this.props.navigation.getParam('handleDeleteNotepress')
        }>

        </DeleteNoteButton>
          </View>

        </View>
    );
  }
}
export default EditNotescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputContainer:{
    flex:1,
    width: WIDTH,
    padding: 10,
    marginBottom:65
  },
  textInputSize:{
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    flex:1
  },
  wordCountText:{
    color: 'rgba(108, 122, 137, 1)',
    fontFamily: 'Quicksand-Medium'
  },
  wordCountTextBox:{
    //backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
    paddingBottom:20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },


});
